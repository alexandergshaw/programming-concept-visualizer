import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import ClassesObjectsConcept from '@/components/pageComponents/Python/ClassesObjectsConcept';

describe('ClassesObjectsConcept', () => {
  it('renders the title and key sections', () => {
    render(<ClassesObjectsConcept />);
    expect(screen.getByText('Classes & Objects')).toBeInTheDocument();
    expect(screen.getByText('What is Object-Oriented Programming?')).toBeInTheDocument();
    expect(screen.getByText(/An Object Factory/)).toBeInTheDocument();
  });

  it('starts the factory with no objects', () => {
    const { container } = render(<ClassesObjectsConcept />);
    expect(container.querySelectorAll('.obj-card')).toHaveLength(0);
    expect(screen.getByText(/No objects yet/)).toBeInTheDocument();
  });

  it('creates an object from typed values', () => {
    const { container } = render(<ClassesObjectsConcept />);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'Rex' } });
    fireEvent.change(inputs[1], { target: { value: 'Beagle' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create Dog object' }));
    expect(container.querySelectorAll('.obj-card')).toHaveLength(1);
    expect(screen.getByText(/= "Rex"/)).toBeInTheDocument();
    expect(screen.getByText(/= "Beagle"/)).toBeInTheDocument();
  });

  it('defaults to Buddy / Mixed when no values are given', () => {
    render(<ClassesObjectsConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Create Dog object' }));
    expect(screen.getByText(/= "Buddy"/)).toBeInTheDocument();
    expect(screen.getByText(/= "Mixed"/)).toBeInTheDocument();
  });

  it('runs bark() and logs output', () => {
    const { container } = render(<ClassesObjectsConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Create Dog object' }));
    fireEvent.click(screen.getByRole('button', { name: 'call bark()' }));
    const panel = container.querySelector('.output-panel') as HTMLElement;
    expect(within(panel).getByText(/Buddy says Woof!/)).toBeInTheDocument();
  });

  it('clears all created objects', () => {
    const { container } = render(<ClassesObjectsConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Create Dog object' }));
    expect(container.querySelectorAll('.obj-card')).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(container.querySelectorAll('.obj-card')).toHaveLength(0);
  });
});
