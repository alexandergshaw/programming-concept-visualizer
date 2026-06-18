import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SortingConcept from '@/components/pageComponents/Python/SortingConcept';

describe('SortingConcept', () => {
  it('renders the title, big idea, and key sections', () => {
    render(<SortingConcept />);
    expect(screen.getAllByText('Sorting').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Sorting is fixing pairs').length).toBeGreaterThan(0);
    expect(screen.getAllByText('The One Move').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Actually Use This/).length).toBeGreaterThan(0);
  });

  it('renders one bar per value', () => {
    const { container } = render(<SortingConcept />);
    expect(container.querySelectorAll('.bar')).toHaveLength(8);
  });

  it('shows comparison and swap counters', () => {
    render(<SortingConcept />);
    expect(screen.getAllByText('Comparisons').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Swaps').length).toBeGreaterThan(0);
  });

  it('steps forward and resets', () => {
    render(<SortingConcept />);
    expect(screen.getAllByText(/Step 1 \//).length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getAllByText(/Step 2 \//).length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getAllByText(/Step 1 \//).length).toBeGreaterThan(0);
  });

  it('shuffles back to the start of a fresh run', () => {
    render(<SortingConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Shuffle' }));
    expect(screen.getAllByText(/Step 1 \//).length).toBeGreaterThan(0);
  });
});
