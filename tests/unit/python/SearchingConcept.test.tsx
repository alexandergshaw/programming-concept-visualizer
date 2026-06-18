import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchingConcept from '@/components/pageComponents/Python/SearchingConcept';

describe('SearchingConcept', () => {
  it('renders the title, big idea, and key sections', () => {
    render(<SearchingConcept />);
    expect(screen.getAllByText('Searching').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Searching is elimination').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Rule Out One at a Time (Linear Search)').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Rule Out Half at a Time (Binary Search)').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Actually Use This/).length).toBeGreaterThan(0);
  });

  it('renders all eleven list cells', () => {
    const { container } = render(<SearchingConcept />);
    expect(container.querySelectorAll('.search-cell')).toHaveLength(11);
  });

  it('shows the scoreboard for the default target (linear needs 6 checks)', () => {
    render(<SearchingConcept />);
    expect(screen.getAllByText('6 checks').length).toBeGreaterThan(0);
  });

  it('steps through a linear search', () => {
    render(<SearchingConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Linear' }));
    expect(screen.getAllByText(/Step 1 \//).length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getAllByText(/Step 2 \//).length).toBeGreaterThan(0);
  });

  it('recomputes the scoreboard when the target changes', () => {
    render(<SearchingConcept />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '91' } });
    // 91 is the last item, so linear search needs 11 checks
    expect(screen.getAllByText('11 checks').length).toBeGreaterThan(0);
  });
});
