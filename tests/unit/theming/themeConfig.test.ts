import {
  THEMES,
  DEFAULT_THEME,
  THEME_KEY,
  THEME_COOKIE,
  normalizeTheme,
} from '@/components/common/themeConfig';

describe('themeConfig', () => {
  it('exposes exactly the four supported themes', () => {
    expect([...THEMES]).toEqual(['corporate', 'dark', 'academic', 'terminal']);
  });

  it('has a default theme that is one of the themes', () => {
    expect(DEFAULT_THEME).toBe('corporate');
    expect(THEMES).toContain(DEFAULT_THEME);
  });

  it('uses a localStorage key and a cookie-safe cookie name', () => {
    expect(THEME_KEY).toBe('pcv:theme');
    expect(THEME_COOKIE).toBe('pcv_theme');
    // Cookie names cannot contain ':'.
    expect(THEME_COOKIE).not.toContain(':');
  });

  describe('normalizeTheme', () => {
    it.each([...THEMES])('returns "%s" unchanged when valid', (theme) => {
      expect(normalizeTheme(theme)).toBe(theme);
    });

    it.each([
      ['unknown string', 'rainbow'],
      ['empty string', ''],
      ['null', null],
      ['undefined', undefined],
      ['wrong case', 'Dark'],
      ['near miss', 'terminal '],
    ])('falls back to the default for %s', (_label, value) => {
      expect(normalizeTheme(value as string | null | undefined)).toBe(DEFAULT_THEME);
    });
  });
});
