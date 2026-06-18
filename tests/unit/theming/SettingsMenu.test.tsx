import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsMenu from '@/components/common/SettingsMenu';

beforeEach(() => {
  window.localStorage.clear();
});

describe('SettingsMenu', () => {
  it('renders a settings button', () => {
    render(<SettingsMenu />);
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
  });

  it('opens a menu listing all four themes', async () => {
    const user = userEvent.setup();
    render(<SettingsMenu />);
    await user.click(screen.getByRole('button', { name: /settings/i }));

    for (const label of ['Light', 'Dark', 'Academic', 'Terminal']) {
      expect(await screen.findByRole('menuitem', { name: label })).toBeInTheDocument();
    }
    expect(screen.getByText('Theme')).toBeInTheDocument();
  });

  it('marks the current theme as selected (Light by default)', async () => {
    const user = userEvent.setup();
    render(<SettingsMenu />);
    await user.click(screen.getByRole('button', { name: /settings/i }));
    expect(await screen.findByRole('menuitem', { name: 'Light' })).toHaveClass('Mui-selected');
    expect(screen.getByRole('menuitem', { name: 'Dark' })).not.toHaveClass('Mui-selected');
  });

  it('persists the chosen theme and closes the menu', async () => {
    const user = userEvent.setup();
    render(<SettingsMenu />);
    await user.click(screen.getByRole('button', { name: /settings/i }));
    await user.click(await screen.findByRole('menuitem', { name: 'Dark' }));

    expect(window.localStorage.getItem('pcv:theme')).toBe('dark');
    // Selecting a theme closes the menu.
    await waitFor(() =>
      expect(screen.queryByRole('menuitem', { name: 'Dark' })).not.toBeInTheDocument(),
    );
  });

  it('reflects the new selection when reopened', async () => {
    const user = userEvent.setup();
    render(<SettingsMenu />);
    await user.click(screen.getByRole('button', { name: /settings/i }));
    await user.click(await screen.findByRole('menuitem', { name: 'Academic' }));
    await waitFor(() => expect(window.localStorage.getItem('pcv:theme')).toBe('academic'));

    await user.click(screen.getByRole('button', { name: /settings/i }));
    expect(await screen.findByRole('menuitem', { name: 'Academic' })).toHaveClass('Mui-selected');
  });
});
