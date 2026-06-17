import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('@/components/common/CodeSnippet', () => {
  const ReactLib = require('react');
  return {
    __esModule: true,
    default: ({ lines = [] }: { lines?: { code: string }[] }) =>
      ReactLib.createElement('pre', { 'data-testid': 'code-snippet' }, lines.map((l) => l.code).join('\n')),
  };
});

import EncapsulationConcept from '@/components/pageComponents/Python/EncapsulationConcept';

describe('EncapsulationConcept', () => {
  it('renders the title and key sections', () => {
    render(<EncapsulationConcept />);
    expect(screen.getByText('Encapsulation')).toBeInTheDocument();
    expect(screen.getByText('Public, Protected, and Private')).toBeInTheDocument();
    expect(screen.getByText(/A Guarded Account/)).toBeInTheDocument();
  });

  it('shows the starting balance', () => {
    render(<EncapsulationConcept />);
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('accepts a valid deposit', () => {
    render(<EncapsulationConcept />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '50' } });
    fireEvent.click(screen.getByRole('button', { name: 'deposit()' }));
    expect(screen.getByText('$150')).toBeInTheDocument();
  });

  it('rejects a negative deposit and keeps the balance', () => {
    render(<EncapsulationConcept />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '-10' } });
    fireEvent.click(screen.getByRole('button', { name: 'deposit()' }));
    expect(screen.getByText(/rejected/)).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('rejects an overdraw', () => {
    render(<EncapsulationConcept />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '999' } });
    fireEvent.click(screen.getByRole('button', { name: 'withdraw()' }));
    expect(screen.getByText(/cannot exceed/)).toBeInTheDocument();
  });
});
