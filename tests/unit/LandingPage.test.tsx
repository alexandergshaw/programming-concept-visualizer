import LandingPage from '@/src/app/page';
import { render, screen, fireEvent } from '@testing-library/react';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

// The landing page shows a Loader for ~2s before revealing the cards, so the
// assertions wait for a card to appear (findBy polls past the timeout).
const FIND = { timeout: 3000 } as const;

describe('LandingPage behavior', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the topic cards after loading', async () => {
    render(<LandingPage />);
    expect(await screen.findByText('Python', {}, FIND)).toBeInTheDocument();
    ['JavaScript', 'React', 'SQL', 'Databases', 'Programming Basics', 'Cybersecurity'].forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('navigates to a language page when a language card is clicked', async () => {
    render(<LandingPage />);
    fireEvent.click(await screen.findByText('JavaScript', {}, FIND));
    expect(mockPush).toHaveBeenCalledWith('/languages/javascript');
  });

  it('navigates to the SQL page (added recently)', async () => {
    render(<LandingPage />);
    fireEvent.click(await screen.findByText('SQL', {}, FIND));
    expect(mockPush).toHaveBeenCalledWith('/languages/sql');
  });

  it('navigates to a skill page when a skill card is clicked', async () => {
    render(<LandingPage />);
    fireEvent.click(await screen.findByText('Databases', {}, FIND));
    expect(mockPush).toHaveBeenCalledWith('/skills/databases');
  });
});
