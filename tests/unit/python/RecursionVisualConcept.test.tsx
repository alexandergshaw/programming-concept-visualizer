import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// CodeSnippet spins up a Web Worker via import.meta; stub it for the unit test.
jest.mock('@/components/common/CodeSnippet', () => {
  const ReactLib = require('react');
  return {
    __esModule: true,
    default: ({ lines = [] }: { lines?: { code: string }[] }) =>
      ReactLib.createElement('pre', { 'data-testid': 'code-snippet' }, lines.map((l) => l.code).join('\n')),
  };
});

import RecursionVisualConcept from '@/components/pageComponents/Python/RecursionVisualConcept';

describe('RecursionVisualConcept', () => {
  it('renders the title, big idea, and key sections', () => {
    render(<RecursionVisualConcept />);
    expect(screen.getByText('Recursion')).toBeInTheDocument();
    expect(screen.getByText('Solve a smaller copy')).toBeInTheDocument();
    expect(screen.getByText('The Input Is What Shrinks')).toBeInTheDocument();
    expect(screen.getByText('Every Recursion Needs Two Things')).toBeInTheDocument();
    expect(screen.getByText(/Actually Use This/)).toBeInTheDocument();
  });

  it('frames n explicitly as the input', () => {
    render(<RecursionVisualConcept />);
    expect(screen.getByText('n = 4')).toBeInTheDocument();
  });

  it('steps through the call stack for factorial(4)', () => {
    render(<RecursionVisualConcept />);
    expect(screen.getByText(/Step 1 \/ 8/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText(/Step 2 \/ 8/)).toBeInTheDocument();
  });

  it('renders the factorial code', () => {
    render(<RecursionVisualConcept />);
    expect(screen.getByTestId('code-snippet')).toHaveTextContent('def factorial(n):');
  });

  it('connects the input idea to real nested data', () => {
    render(<RecursionVisualConcept />);
    expect(screen.getByText(/How big is this folder/)).toBeInTheDocument();
  });
});
