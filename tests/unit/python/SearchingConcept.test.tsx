import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchingConcept from '@/components/pageComponents/Python/SearchingConcept';

describe('SearchingConcept', () => {
  it('renders the title, big idea, and key sections', () => {
    render(<SearchingConcept />);
    expect(screen.getByText('Searching')).toBeInTheDocument();
    expect(screen.getByText('Searching is elimination')).toBeInTheDocument();
    expect(screen.getByText('Rule Out One at a Time (Linear Search)')).toBeInTheDocument();
    expect(screen.getByText('Rule Out Half at a Time (Binary Search)')).toBeInTheDocument();
    expect(screen.getByText(/Actually Use This/)).toBeInTheDocument();
  });

  it('renders all eleven list cells', () => {
    const { container } = render(<SearchingConcept />);
    expect(container.querySelectorAll('.search-cell')).toHaveLength(11);
  });

  it('shows the scoreboard for the default target (linear needs 6 checks)', () => {
    render(<SearchingConcept />);
    expect(screen.getByText('6 checks')).toBeInTheDocument();
  });

  it('steps through a linear search', () => {
    render(<SearchingConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Linear' }));
    expect(screen.getByText(/Step 1 \//)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText(/Step 2 \//)).toBeInTheDocument();
  });

  it('recomputes the scoreboard when the target changes', () => {
    render(<SearchingConcept />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '91' } });
    // 91 is the last item, so linear search needs 11 checks
    expect(screen.getByText('11 checks')).toBeInTheDocument();
  });
});
