import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('../../../components/common/CodeSnippet', () => {
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
    expect(screen.getAllByText('Encapsulation').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Public, Protected, and Private').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/A Guarded Account/).length).toBeGreaterThan(0);
  });

  it('shows the starting balance', () => {
    render(<EncapsulationConcept />);
    expect(screen.getAllByText('$100').length).toBeGreaterThan(0);
  });

  it('accepts a valid deposit', () => {
    render(<EncapsulationConcept />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '50' } });
    fireEvent.click(screen.getByRole('button', { name: 'deposit()' }));
    expect(screen.getAllByText('$150').length).toBeGreaterThan(0);
  });

  it('rejects a negative deposit and keeps the balance', () => {
    render(<EncapsulationConcept />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '-10' } });
    fireEvent.click(screen.getByRole('button', { name: 'deposit()' }));
    expect(screen.getAllByText(/rejected/).length).toBeGreaterThan(0);
    expect(screen.getAllByText('$100').length).toBeGreaterThan(0);
  });

  it('rejects an overdraw', () => {
    render(<EncapsulationConcept />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '999' } });
    fireEvent.click(screen.getByRole('button', { name: 'withdraw()' }));
    expect(screen.getAllByText(/cannot exceed/).length).toBeGreaterThan(0);
  });
});
