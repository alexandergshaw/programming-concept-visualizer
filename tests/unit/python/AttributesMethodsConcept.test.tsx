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

import AttributesMethodsConcept from '@/components/pageComponents/Python/AttributesMethodsConcept';

describe('AttributesMethodsConcept', () => {
  it('renders the title and key sections', () => {
    render(<AttributesMethodsConcept />);
    expect(screen.getAllByText('Attributes & Methods').length).toBeGreaterThan(0);
    expect(screen.getAllByText('The Constructor: __init__').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Instance vs\. Class Attributes/).length).toBeGreaterThan(0);
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
    expect(screen.getAllByText(/=\s*150/).length).toBeGreaterThan(0); // Alice 100 -> 150
    expect(screen.getAllByText(/=\s*50\b/).length).toBeGreaterThan(0); // Bob still 50
  });
});
