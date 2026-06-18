import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';

jest.mock('../../../components/common/CodeSnippet', () => {
  const ReactLib = require('react');
  return {
    __esModule: true,
    default: ({ lines = [] }: { lines?: { code: string }[] }) =>
      ReactLib.createElement('pre', { 'data-testid': 'code-snippet' }, lines.map((l) => l.code).join('\n')),
  };
});

import AbstractionConcept from '@/components/pageComponents/Python/AbstractionConcept';

describe('AbstractionConcept', () => {
  it('renders the title and key sections', () => {
    render(<AbstractionConcept />);
    expect(screen.getAllByText('Abstraction').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Abstract Base Classes').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/One Contract, Many Implementations/).length).toBeGreaterThan(0);
  });

  it('checks out with the default credit card method', () => {
    const { container } = render(<AbstractionConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Run checkout()' }));
    const panel = container.querySelector('.output-panel') as HTMLElement;
    expect(within(panel).getByText(/Paid \$50 by credit card/)).toBeInTheDocument();
  });

  it('switches to PayPal and runs the same checkout()', () => {
    const { container } = render(<AbstractionConcept />);
    fireEvent.click(screen.getByText('PayPal'));
    fireEvent.click(screen.getByRole('button', { name: 'Run checkout()' }));
    const panel = container.querySelector('.output-panel') as HTMLElement;
    expect(within(panel).getByText(/via PayPal/)).toBeInTheDocument();
  });

  it('honors a changed amount', () => {
    const { container } = render(<AbstractionConcept />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '200' } });
    fireEvent.click(screen.getByRole('button', { name: 'Run checkout()' }));
    const panel = container.querySelector('.output-panel') as HTMLElement;
    expect(within(panel).getByText(/Paid \$200/)).toBeInTheDocument();
  });
});
