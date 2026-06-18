import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({ get: () => null }),
}));

// Avoid the Worker-backed CodeSnippet that some concept pages import.
jest.mock('../../../components/common/CodeSnippet', () => {
  const ReactLib = require('react');
  return {
    __esModule: true,
    default: () => ReactLib.createElement('pre', { 'data-testid': 'code-snippet' }),
  };
});

// Stack/Queue (imported transitively) use framer-motion; use the manual mock.
jest.mock('framer-motion');

import PythonPage from '@/components/pageComponents/Python/PythonPage';

describe('PythonPage navigation', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders the page title', () => {
    render(<PythonPage />);
    expect(screen.getAllByText('Python').length).toBeGreaterThan(0);
  });

  it('renders the new nav groups added today', () => {
    render(<PythonPage />);
    expect(screen.getAllByText('Object-Oriented Programming').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Data Structures').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Algorithms').length).toBeGreaterThan(0);
  });

  it('renders the new sub-topics', () => {
    render(<PythonPage />);
    ['Stacks', 'Queues', 'Trees', 'Searching', 'Sorting', 'Polymorphism', 'Abstraction'].forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });
  });

  it('shows a prompt before any topic is selected', () => {
    render(<PythonPage />);
    expect(screen.getAllByText(/select a topic/i).length).toBeGreaterThan(0);
  });

  it('navigates and renders content when a topic is chosen', () => {
    render(<PythonPage />);
    fireEvent.click(screen.getByText('Stacks'));
    expect(mockPush).toHaveBeenCalledWith('/languages/python?concept=stacks');
    expect(screen.getAllByText('Interactive Stack').length).toBeGreaterThan(0);
  });
});
