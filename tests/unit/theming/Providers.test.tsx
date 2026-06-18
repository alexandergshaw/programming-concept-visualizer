import { render, screen, act } from '@testing-library/react';
import { useTheme } from '@mui/material/styles';
import Providers from '@/components/common/Providers';
import { setThemePreference, type ThemePreference } from '@/components/common/settings';

// Exposes the active MUI theme so we can assert the palette wiring per theme.
function ThemeProbe() {
  const t = useTheme();
  return (
    <div
      data-testid="probe"
      data-mode={t.palette.mode}
      data-primary={t.palette.primary.main}
      data-bg-default={t.palette.background.default}
      data-bg-paper={t.palette.background.paper}
      data-text-primary={t.palette.text.primary}
      data-text-secondary={t.palette.text.secondary}
      data-divider={t.palette.divider}
      data-info={t.palette.info.main}
      data-success={t.palette.success.main}
      data-warning={t.palette.warning.main}
      data-error={t.palette.error.main}
    />
  );
}

function renderWith(theme: ThemePreference) {
  window.localStorage.setItem('pcv:theme', theme);
  return render(
    <Providers initialTheme={theme}>
      <ThemeProbe />
    </Providers>,
  );
}

beforeEach(() => {
  window.localStorage.clear();
  delete document.documentElement.dataset.theme;
});

describe('Providers', () => {
  it('renders its children', () => {
    renderWith('corporate');
    expect(screen.getByTestId('probe')).toBeInTheDocument();
  });

  it.each<[ThemePreference, 'light' | 'dark']>([
    ['corporate', 'light'],
    ['academic', 'light'],
    ['dark', 'dark'],
    ['terminal', 'dark'],
  ])('drives data-theme and the MUI palette mode for "%s"', (theme, mode) => {
    renderWith(theme);
    expect(document.documentElement.dataset.theme).toBe(theme);
    expect(screen.getByTestId('probe').dataset.mode).toBe(mode);
  });

  it.each<ThemePreference>(['corporate', 'academic', 'dark', 'terminal'])(
    'every MUI palette slot is populated for "%s"',
    (theme) => {
      renderWith(theme);
      const ds = screen.getByTestId('probe').dataset;
      const slots = [
        'primary', 'bgDefault', 'bgPaper', 'textPrimary',
        'textSecondary', 'divider', 'info', 'success', 'warning', 'error',
      ] as const;
      const empty = slots.filter((s) => !ds[s] || ds[s] === '');
      expect({ theme, empty }).toEqual({ theme, empty: [] });
    },
  );

  it('updates data-theme when the preference changes at runtime', () => {
    renderWith('corporate');
    expect(document.documentElement.dataset.theme).toBe('corporate');
    act(() => {
      setThemePreference('terminal');
    });
    expect(document.documentElement.dataset.theme).toBe('terminal');
    expect(screen.getByTestId('probe').dataset.mode).toBe('dark');
  });
});
