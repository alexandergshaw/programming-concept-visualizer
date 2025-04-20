import { render, screen, fireEvent } from '@testing-library/react';
import ArrayConcept from '../../components/concepts/ArrayConcept';

describe('ArrayConcept Component', () => {
  it('renders initial array and operations UI', () => {
    render(<ArrayConcept />);
    expect(screen.getByText('Array Visualization')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter array items')).toBeTruthy();
  });

  it('allows the user to push a new value into the array', () => {
    render(<ArrayConcept />);
    const input = screen.getByPlaceholderText('Enter array items') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '1, 2, 3' } });

    const pushButton = screen.getByText('Push');
    fireEvent.click(pushButton);

    expect(screen.getByText('[1, 2, 3, "new"]')).toBeTruthy(); // Adjust depending on how you append
  });
});
