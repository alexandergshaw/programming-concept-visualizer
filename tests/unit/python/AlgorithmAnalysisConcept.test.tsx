import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AlgorithmAnalysisConcept from '@/components/pageComponents/Python/AlgorithmAnalysisConcept';

describe('AlgorithmAnalysisConcept', () => {
  it('renders the title, big idea, and key sections', () => {
    render(<AlgorithmAnalysisConcept />);
    expect(screen.getByText('Algorithm Analysis & Design')).toBeInTheDocument();
    expect(screen.getByText('Gentle, or explode?')).toBeInTheDocument();
    expect(screen.getByText('See the Shapes')).toBeInTheDocument();
    expect(screen.getByText('Why It Matters at Scale')).toBeInTheDocument();
  });

  it('lists the common Big-O growth rates', () => {
    render(<AlgorithmAnalysisConcept />);
    expect(screen.getAllByText('O(1)').length).toBeGreaterThan(0);
    expect(screen.getAllByText('O(log n)').length).toBeGreaterThan(0);
    expect(screen.getAllByText('O(n)').length).toBeGreaterThan(0);
    expect(screen.getAllByText('O(n log n)').length).toBeGreaterThan(0);
  });

  it('updates the at-scale step counts when a preset is chosen', () => {
    render(<AlgorithmAnalysisConcept />);
    fireEvent.click(screen.getByText('n = 1,000,000'));
    // O(n^2) at one million inputs is one trillion steps
    expect(screen.getByText(/1,000,000,000,000/)).toBeInTheDocument();
  });

  it('offers all four input-size presets', () => {
    render(<AlgorithmAnalysisConcept />);
    ['n = 10', 'n = 100', 'n = 10,000', 'n = 1,000,000'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
