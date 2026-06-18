import { act, renderHook } from '@testing-library/react';
import {
  getThemePreference,
  setThemePreference,
  useThemePreference,
  loadOpenSections,
  saveOpenSections,
} from '@/components/common/settings';

function clearCookies() {
  for (const c of document.cookie.split(';')) {
    const name = c.split('=')[0].trim();
    if (name) document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}

beforeEach(() => {
  window.localStorage.clear();
  clearCookies();
});

describe('getThemePreference', () => {
  it('returns the default when nothing is stored', () => {
    expect(getThemePreference()).toBe('corporate');
  });

  it('reads a stored value', () => {
    window.localStorage.setItem('pcv:theme', 'dark');
    expect(getThemePreference()).toBe('dark');
  });

  it('normalizes a corrupt stored value to the default', () => {
    window.localStorage.setItem('pcv:theme', 'nonsense');
    expect(getThemePreference()).toBe('corporate');
  });
});

describe('setThemePreference', () => {
  it('persists to localStorage', () => {
    setThemePreference('academic');
    expect(window.localStorage.getItem('pcv:theme')).toBe('academic');
  });

  it('mirrors the choice to the pcv_theme cookie', () => {
    setThemePreference('terminal');
    expect(document.cookie).toContain('pcv_theme=terminal');
  });

  it('dispatches the settings-change event so subscribers update', () => {
    const handler = jest.fn();
    window.addEventListener('pcv:settingschange', handler);
    setThemePreference('dark');
    expect(handler).toHaveBeenCalledTimes(1);
    window.removeEventListener('pcv:settingschange', handler);
  });
});

describe('useThemePreference', () => {
  it('starts from the provided initial value', () => {
    window.localStorage.setItem('pcv:theme', 'dark');
    const { result } = renderHook(() => useThemePreference('dark'));
    expect(result.current[0]).toBe('dark');
  });

  it('updates every subscriber when the preference is set', () => {
    const a = renderHook(() => useThemePreference());
    const b = renderHook(() => useThemePreference());
    act(() => {
      a.result.current[1]('academic');
    });
    expect(a.result.current[0]).toBe('academic');
    expect(b.result.current[0]).toBe('academic');
  });

  it('syncs from a cross-tab storage event', () => {
    const { result } = renderHook(() => useThemePreference());
    act(() => {
      window.localStorage.setItem('pcv:theme', 'terminal');
      window.dispatchEvent(new StorageEvent('storage', { key: 'pcv:theme' }));
    });
    expect(result.current[0]).toBe('terminal');
  });

  it('returns the shared setter as the second tuple element', () => {
    const { result } = renderHook(() => useThemePreference());
    expect(result.current[1]).toBe(setThemePreference);
  });
});

describe('open-sections persistence', () => {
  it('returns null when nothing is saved', () => {
    expect(loadOpenSections('Python')).toBeNull();
  });

  it('round-trips a list of section values per topic', () => {
    saveOpenSections('Python', ['storing data', 'control flow']);
    expect(loadOpenSections('Python')).toEqual(['storing data', 'control flow']);
    // Scoped by topic title.
    expect(loadOpenSections('SQL')).toBeNull();
  });

  it('ignores malformed JSON', () => {
    window.localStorage.setItem('pcv:sections:Python', '{not json');
    expect(loadOpenSections('Python')).toBeNull();
  });

  it('filters out non-string entries', () => {
    window.localStorage.setItem('pcv:sections:Python', JSON.stringify(['ok', 3, null, 'fine']));
    expect(loadOpenSections('Python')).toEqual(['ok', 'fine']);
  });
});
