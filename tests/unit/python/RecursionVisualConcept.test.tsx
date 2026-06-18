import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// CodeSnippet spins up a Web Worker via import.meta; stub it for the unit test.
jest.mock('../../../components/common/CodeSnippet', () => {
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
    expect(screen.getAllByText('Recursion').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Solve a smaller copy').length).toBeGreaterThan(0);
    expect(screen.getAllByText('The Input Is What Shrinks').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Every Recursion Needs Two Things').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Actually Use This/).length).toBeGreaterThan(0);
  });

  it('frames n explicitly as the input', () => {
    render(<RecursionVisualConcept />);
    expect(screen.getAllByText('n = 4').length).toBeGreaterThan(0);
  });

  it('steps through the call stack for factorial(4)', () => {
    render(<RecursionVisualConcept />);
    expect(screen.getAllByText(/Step 1 \/ 8/).length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getAllByText(/Step 2 \/ 8/).length).toBeGreaterThan(0);
  });

  it('renders the factorial code', () => {
    render(<RecursionVisualConcept />);
    expect(screen.getByTestId('code-snippet')).toHaveTextContent('def factorial(n):');
  });

  it('connects the input idea to real nested data', () => {
    render(<RecursionVisualConcept />);
    expect(screen.getAllByText(/How big is this folder/).length).toBeGreaterThan(0);
  });
});
