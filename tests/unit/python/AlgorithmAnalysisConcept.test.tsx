import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AlgorithmAnalysisConcept from '@/components/pageComponents/Python/AlgorithmAnalysisConcept';

describe('AlgorithmAnalysisConcept', () => {
  it('renders the title, big idea, and key sections', () => {
    render(<AlgorithmAnalysisConcept />);
    expect(screen.getAllByText('Algorithm Analysis & Design').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Gentle, or explode?').length).toBeGreaterThan(0);
    expect(screen.getAllByText('See the Shapes').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Why It Matters at Scale').length).toBeGreaterThan(0);
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
    expect(screen.getAllByText(/1,000,000,000,000/).length).toBeGreaterThan(0);
  });

  it('offers all four input-size presets', () => {
    render(<AlgorithmAnalysisConcept />);
    ['n = 10', 'n = 100', 'n = 10,000', 'n = 1,000,000'].forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });
  });
});
