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

import AttributesMethodsConcept from '@/components/pageComponents/Python/AttributesMethodsConcept';

describe('AttributesMethodsConcept', () => {
  it('renders the title and key sections', () => {
    render(<AttributesMethodsConcept />);
    expect(screen.getByText('Attributes & Methods')).toBeInTheDocument();
    expect(screen.getByText('The Constructor: __init__')).toBeInTheDocument();
    expect(screen.getByText(/Instance vs\. Class Attributes/)).toBeInTheDocument();
  });

  it('shows the shared class attribute on both accounts', () => {
    render(<AttributesMethodsConcept />);
    expect(screen.getAllByText(/PyBank/)).toHaveLength(2);
  });

  it('updates the shared class attribute on every instance at once', () => {
    render(<AttributesMethodsConcept />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'MyBank' } });
    expect(screen.getAllByText(/MyBank/)).toHaveLength(2);
  });

  it('deposits into one account without affecting the other', () => {
    render(<AttributesMethodsConcept />);
    const amounts = screen.getAllByRole('spinbutton');
    fireEvent.change(amounts[0], { target: { value: '50' } });
    fireEvent.click(screen.getAllByRole('button', { name: 'deposit()' })[0]);
    expect(screen.getByText(/=\s*150/)).toBeInTheDocument(); // Alice 100 -> 150
    expect(screen.getByText(/=\s*50\b/)).toBeInTheDocument(); // Bob still 50
  });
});
