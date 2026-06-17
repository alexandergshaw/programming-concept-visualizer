import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SortingConcept from '@/components/pageComponents/Python/SortingConcept';

describe('SortingConcept', () => {
  it('renders the title, big idea, and key sections', () => {
    render(<SortingConcept />);
    expect(screen.getByText('Sorting')).toBeInTheDocument();
    expect(screen.getByText('Sorting is fixing pairs')).toBeInTheDocument();
    expect(screen.getByText('The One Move')).toBeInTheDocument();
    expect(screen.getByText(/Actually Use This/)).toBeInTheDocument();
  });

  it('renders one bar per value', () => {
    const { container } = render(<SortingConcept />);
    expect(container.querySelectorAll('.bar')).toHaveLength(8);
  });

  it('shows comparison and swap counters', () => {
    render(<SortingConcept />);
    expect(screen.getByText('Comparisons')).toBeInTheDocument();
    expect(screen.getByText('Swaps')).toBeInTheDocument();
  });

  it('steps forward and resets', () => {
    render(<SortingConcept />);
    expect(screen.getByText(/Step 1 \//)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText(/Step 2 \//)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getByText(/Step 1 \//)).toBeInTheDocument();
  });

  it('shuffles back to the start of a fresh run', () => {
    render(<SortingConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Shuffle' }));
    expect(screen.getByText(/Step 1 \//)).toBeInTheDocument();
  });
});
