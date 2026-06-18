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

import InheritanceConcept from '@/components/pageComponents/Python/InheritanceConcept';

describe('InheritanceConcept', () => {
  it('renders the title and key sections', () => {
    render(<InheritanceConcept />);
    expect(screen.getAllByText('Inheritance').length).toBeGreaterThan(0);
    expect(screen.getAllByText('What is Inheritance?').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Subclasses in Action/).length).toBeGreaterThan(0);
  });

  it('runs the default Dog subclass and logs an overridden speak()', () => {
    const { container } = render(<InheritanceConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Create & call speak()' }));
    const panel = container.querySelector('.output-panel') as HTMLElement;
    expect(within(panel).getByText(/Woof!/)).toBeInTheDocument();
    expect(within(panel).getByText(/inherited from Animal/)).toBeInTheDocument();
  });

  it('switches to the Cat subclass and logs its own speak()', () => {
    const { container } = render(<InheritanceConcept />);
    fireEvent.click(screen.getByText('Cat(Animal)'));
    fireEvent.click(screen.getByRole('button', { name: 'Create & call speak()' }));
    const panel = container.querySelector('.output-panel') as HTMLElement;
    expect(within(panel).getByText(/Meow!/)).toBeInTheDocument();
  });

  it('clears the output log', () => {
    const { container } = render(<InheritanceConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Create & call speak()' }));
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    const panel = container.querySelector('.output-panel') as HTMLElement;
    expect(within(panel).queryByText(/Woof!/)).not.toBeInTheDocument();
  });
});
