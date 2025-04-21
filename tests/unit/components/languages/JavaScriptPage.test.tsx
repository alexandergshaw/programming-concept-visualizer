import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as nextNavigation from 'next/navigation';
import JavaScriptPage from '../../../../components/languages/JavaScript/JavaScriptPage';

// Mock concept components
jest.mock('../../../../components/languages/JavaScript/ArrayConcept', () => () => <div>ArrayComponentMock</div>);
jest.mock('../../../../components/languages/JavaScript/MapConcept', () => () => <div>MapComponentMock</div>);
jest.mock('../../../../components/languages/JavaScript/SetConcept', () => () => <div>SetComponentMock</div>);
jest.mock('../../../../components/languages/JavaScript/ObjectConcept', () => () => <div>ObjectComponentMock</div>);

// Global mock for useRouter and useSearchParams
const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: jest.fn(),
}));

// Helper to override search param for each test
const setSearchParamsMock = (concept: string | null) => {
  (nextNavigation.useSearchParams as jest.Mock).mockReturnValue({
    get: (key: string) => (key === 'concept' ? concept : null),
  });
};

describe('JavaScriptPage concept loading', () => {
  it('renders message when no concept is selected', () => {
    setSearchParamsMock(null);
    render(<JavaScriptPage />);
    expect(screen.getByText(/please select a topic/i)).toBeTruthy();
  });

  it('renders ArrayConcept when concept=arrays', () => {
    setSearchParamsMock('arrays');
    render(<JavaScriptPage />);
    expect(screen.getByText('ArrayComponentMock')).toBeTruthy();
  });

  it('renders MapConcept when concept=maps', () => {
    setSearchParamsMock('maps');
    render(<JavaScriptPage />);
    expect(screen.getByText('MapComponentMock')).toBeTruthy();
  });

  it('renders SetConcept when concept=sets', () => {
    setSearchParamsMock('sets');
    render(<JavaScriptPage />);
    expect(screen.getByText('SetComponentMock')).toBeTruthy();
  });

  it('renders ObjectConcept when concept=objects', () => {
    setSearchParamsMock('objects');
    render(<JavaScriptPage />);
    expect(screen.getByText('ObjectComponentMock')).toBeTruthy();
  });

  it('pushes correct query param when sidebar item is clicked', async () => {
    setSearchParamsMock(null); // No concept selected initially
    render(<JavaScriptPage />);
    const user = userEvent.setup();
    await user.click(screen.getByText('Arrays'));
    expect(mockPush).toHaveBeenCalledWith('/languages/javascript?concept=arrays');
  });

  it('does not show the Objects concept in the sidebar when excluded from navItems', () => {
    setSearchParamsMock(null);
    render(<JavaScriptPage />);

    // Confirm visible sidebar topics
    expect(screen.getByText('Arrays')).toBeTruthy();
    expect(screen.getByText('Sets')).toBeTruthy();
    expect(screen.getByText('Maps')).toBeTruthy();

    // Confirm excluded concept is not rendered
    expect(screen.queryByText('Objects')).not.toBeTruthy();
  });

  it('does not show the Classes concept in the sidebar when excluded from navItems', () => {
    setSearchParamsMock(null);
    render(<JavaScriptPage />);

    // Confirm visible sidebar topics
    expect(screen.getByText('Arrays')).toBeTruthy();
    expect(screen.getByText('Sets')).toBeTruthy();
    expect(screen.getByText('Maps')).toBeTruthy();

    // Confirm excluded concept is not rendered
    expect(screen.queryByText('Classes')).not.toBeTruthy();
  });
});
