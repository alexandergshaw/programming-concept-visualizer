import LandingPage from '@/src/app/page';
import { render, screen, fireEvent } from '@testing-library/react';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

// The landing page shows a Loader briefly before revealing the tiles, so the
// assertions wait for a tile to appear (findBy polls past the timeout).
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

  it('filters topic tiles as you type in the search box', async () => {
    render(<LandingPage />);
    await screen.findByText('Python', {}, FIND);
    fireEvent.change(screen.getByLabelText('Search topics and concepts'), {
      target: { value: 'python' },
    });
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.queryByText('Cybersecurity')).not.toBeInTheDocument();
  });

  it('finds concepts inside topics and navigates straight to them', async () => {
    render(<LandingPage />);
    await screen.findByText('Python', {}, FIND);
    fireEvent.change(screen.getByLabelText('Search topics and concepts'), {
      target: { value: 'recursion' },
    });
    // A "Concepts" result row points into the owning topic.
    const pythonHit = await screen.findByText('in Python', {}, FIND);
    fireEvent.click(pythonHit);
    expect(mockPush).toHaveBeenCalledWith('/languages/python?concept=recursion');
  });

  it('narrows the board to one category when a filter chip is clicked', async () => {
    render(<LandingPage />);
    await screen.findByText('Python', {}, FIND);
    // [0] is the filter chip; a later match would be the section heading.
    fireEvent.click(screen.getAllByText('Languages')[0]);
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.queryByText('SQL')).not.toBeInTheDocument();
  });
});
