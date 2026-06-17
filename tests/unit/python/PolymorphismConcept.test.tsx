import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';

jest.mock('@/components/common/CodeSnippet', () => {
  const ReactLib = require('react');
  return {
    __esModule: true,
    default: ({ lines = [] }: { lines?: { code: string }[] }) =>
      ReactLib.createElement('pre', { 'data-testid': 'code-snippet' }, lines.map((l) => l.code).join('\n')),
  };
});

import PolymorphismConcept from '@/components/pageComponents/Python/PolymorphismConcept';

describe('PolymorphismConcept', () => {
  it('renders the title and key sections', () => {
    render(<PolymorphismConcept />);
    expect(screen.getByText('Polymorphism')).toBeInTheDocument();
    expect(screen.getByText('Duck Typing')).toBeInTheDocument();
    expect(screen.getByText(/One Call, Many Shapes/)).toBeInTheDocument();
  });

  it('runs area() across every shape with the default sizes', () => {
    const { container } = render(<PolymorphismConcept />);
    fireEvent.click(screen.getByRole('button', { name: /Run: shape\.area/ }));
    const panel = container.querySelector('.output-panel') as HTMLElement;
    expect(within(panel).getByText(/12\.57/)).toBeInTheDocument(); // circle r=2
    expect(within(panel).getByText(/9\.00/)).toBeInTheDocument(); // square s=3
    expect(within(panel).getByText(/10\.00/)).toBeInTheDocument(); // triangle 4x5
  });

  it('recomputes when a shape dimension changes', () => {
    const { container } = render(<PolymorphismConcept />);
    const dims = screen.getAllByRole('spinbutton'); // radius, side, base, height
    fireEvent.change(dims[0], { target: { value: '1' } });
    fireEvent.click(screen.getByRole('button', { name: /Run: shape\.area/ }));
    const panel = container.querySelector('.output-panel') as HTMLElement;
    expect(within(panel).getByText(/3\.14/)).toBeInTheDocument(); // circle r=1
  });
});
