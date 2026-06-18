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

  it('renders the remaining nav groups', () => {
    render(<PythonPage />);
    expect(screen.getAllByText('Object-Oriented Programming').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Collections').length).toBeGreaterThan(0);
  });

  it('renders the remaining sub-topics', () => {
    render(<PythonPage />);
    ['Polymorphism', 'Abstraction', 'Lists', 'Variables'].forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });
  });

  it('no longer shows the Data Structures / Algorithms sections (moved away)', () => {
    render(<PythonPage />);
    expect(screen.queryByText('Data Structures')).toBeNull();
    expect(screen.queryByText('Algorithms')).toBeNull();
    expect(screen.queryByText('Stacks')).toBeNull();
  });

  it('shows a prompt before any topic is selected', () => {
    render(<PythonPage />);
    expect(screen.getAllByText(/select a topic/i).length).toBeGreaterThan(0);
  });

  it('navigates and renders content when a topic is chosen', () => {
    render(<PythonPage />);
    fireEvent.click(screen.getByText('Polymorphism'));
    expect(mockPush).toHaveBeenCalledWith('/languages/python?concept=polymorphism');
    expect(screen.queryByText(/select a topic/i)).toBeNull();
  });
});
