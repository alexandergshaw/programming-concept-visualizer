import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TreeConcept from '@/components/pageComponents/Python/TreeConcept';

describe('TreeConcept', () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('renders the title, sections, and the initial seven nodes', () => {
    const { container } = render(<TreeConcept />);
    expect(screen.getAllByText('Trees').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Build and Explore a Tree').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Where Trees Are Used').length).toBeGreaterThan(0);
    [50, 30, 70, 20, 40, 60, 80].forEach((v) => {
      expect(screen.getAllByText(String(v)).length).toBeGreaterThan(0);
    });
    expect(container.querySelectorAll('svg circle')).toHaveLength(7);
  });

  it('inserts a new value as a node', () => {
    const { container } = render(<TreeConcept />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '25' } });
    fireEvent.click(screen.getByRole('button', { name: 'Insert' }));
    expect(container.querySelectorAll('svg circle')).toHaveLength(8);
    expect(screen.getAllByText('25').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/insert\(25\)/).length).toBeGreaterThan(0);
  });

  it('reset restores the original tree', () => {
    const { container } = render(<TreeConcept />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '25' } });
    fireEvent.click(screen.getByRole('button', { name: 'Insert' }));
    expect(container.querySelectorAll('svg circle')).toHaveLength(8);
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(container.querySelectorAll('svg circle')).toHaveLength(7);
    expect(screen.queryByText('25')).not.toBeInTheDocument();
  });

  it('rejects a non-numeric insert', () => {
    render(<TreeConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Insert' }));
    expect(screen.getAllByText(/enter a whole number/i).length).toBeGreaterThan(0);
  });

  it('starts an in-order traversal when requested', () => {
    jest.useFakeTimers();
    render(<TreeConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'In-order' }));
    expect(screen.getAllByText('In-order:').length).toBeGreaterThan(0);
  });
});
