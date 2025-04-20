import { render, screen, fireEvent } from '@testing-library/react';
import ArrayConcept from '../../components/concepts/ArrayConcept';

describe('ArrayConcept Component', () => {
  it('renders the heading and input fields', () => {
    render(<ArrayConcept />);
    expect(screen.getByText('Array')).toBeTruthy();
    
  });

  it('parses raw input and updates array', () => {
    const mockCodeChange = jest.fn();
    render(<ArrayConcept onCodeChange={mockCodeChange} />);
    fireEvent.change(screen.getByLabelText(/Define your array/i), {
      target: { value: '5, 6, 7' },
    });
    expect(mockCodeChange).toHaveBeenCalledWith('let array = [5, 6, 7];');
  });

  it('displays correct operation description', () => {
    render(<ArrayConcept />);
    fireEvent.change(screen.getByLabelText(/Choose operation/i), {
      target: { value: 'slice' },
    });
    expect(screen.getByDisplayValue(/Copies part of the array/)).toBeTruthy();
  });

  it('shows value input for push', () => {
    render(<ArrayConcept />);
    expect(screen.getByLabelText('Value')).toBeTruthy();
  });

  it('shows index input for update operation', () => {
    render(<ArrayConcept />);
    fireEvent.change(screen.getByLabelText(/Choose operation/i), {
      target: { value: 'update' },
    });
    expect(screen.getByLabelText('Index')).toBeTruthy();
  });

  it('performs push operation', () => {
    render(<ArrayConcept />);
    fireEvent.change(screen.getByLabelText('Value'), { target: { value: '10' } });
    fireEvent.click(screen.getByText('Run'));
    expect(screen.getByText('10')).toBeTruthy();
  });

  it('performs pop operation', () => {
    render(<ArrayConcept />);
    fireEvent.change(screen.getByLabelText(/Choose operation/i), {
      target: { value: 'pop' },
    });
    fireEvent.click(screen.getByText('Run'));
    expect(screen.queryByText('3')).not.toBeTruthy();
  });

  it('performs unshift operation', () => {
    render(<ArrayConcept />);
    fireEvent.change(screen.getByLabelText(/Choose operation/i), {
      target: { value: 'unshift' },
    });
    fireEvent.change(screen.getByLabelText('Value'), { target: { value: '0' } });
    fireEvent.click(screen.getByText('Run'));
    expect(screen.getByText('0')).toBeTruthy();
  });

  it('performs splice operation', () => {
    render(<ArrayConcept />);
    fireEvent.change(screen.getByLabelText(/Choose operation/i), {
      target: { value: 'splice' },
    });
    fireEvent.change(screen.getByLabelText('Index'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Value'), { target: { value: '9' } });
    fireEvent.click(screen.getByText('Run'));
    expect(screen.getByText('9')).toBeTruthy();
  });

  it('performs slice and shows result in output', () => {
    render(<ArrayConcept />);
    fireEvent.change(screen.getByLabelText(/Choose operation/i), {
      target: { value: 'slice' },
    });
    fireEvent.change(screen.getByLabelText('Index'), { target: { value: '2' } });
    fireEvent.click(screen.getByText('Run'));
    expect(screen.getByText(/Sliced: \[1, 2\]/)).toBeTruthy();
  });

  it('performs indexOf operation', () => {
    render(<ArrayConcept />);
    fireEvent.change(screen.getByLabelText(/Choose operation/i), {
      target: { value: 'indexOf' },
    });
    fireEvent.change(screen.getByLabelText('Value'), { target: { value: '2' } });
    fireEvent.click(screen.getByText('Run'));
    expect(screen.getByText(/indexOf\(2\) → 1/)).toBeTruthy();
  });

  it('performs lastIndexOf operation', () => {
    render(<ArrayConcept />);
    fireEvent.change(screen.getByLabelText(/Define your array/i), {
      target: { value: '1, 2, 3, 2' },
    });
    fireEvent.change(screen.getByLabelText(/Choose operation/i), {
      target: { value: 'lastIndexOf' },
    });
    fireEvent.change(screen.getByLabelText('Value'), { target: { value: '2' } });
    fireEvent.click(screen.getByText('Run'));
    expect(screen.getByText(/lastIndexOf\(2\) → 3/)).toBeTruthy();
  });

  it('performs includes operation and shows true', () => {
    render(<ArrayConcept />);
    fireEvent.change(screen.getByLabelText(/Choose operation/i), {
      target: { value: 'includes' },
    });
    fireEvent.change(screen.getByLabelText('Value'), { target: { value: '2' } });
    fireEvent.click(screen.getByText('Run'));
    expect(screen.getByText(/includes\(2\) → true/)).toBeTruthy();
  });

  it('updates value at a valid index', () => {
    render(<ArrayConcept />);
    fireEvent.change(screen.getByLabelText(/Choose operation/i), {
      target: { value: 'update' },
    });
    fireEvent.change(screen.getByLabelText('Index'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Value'), { target: { value: '42' } });
    fireEvent.click(screen.getByText('Run'));
    expect(screen.getByText(/Updated index 1 to 42/)).toBeTruthy();
    expect(screen.getByText('42')).toBeTruthy();
  });

  it('shows out-of-bounds error for invalid update index', () => {
    render(<ArrayConcept />);
    fireEvent.change(screen.getByLabelText(/Choose operation/i), {
      target: { value: 'update' },
    });
    fireEvent.change(screen.getByLabelText('Index'), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText('Value'), { target: { value: '99' } });
    fireEvent.click(screen.getByText('Run'));
    expect(screen.getByText(/Index 10 is out of bounds/)).toBeTruthy();
  });

  it('ignores non-numeric input gracefully', () => {
    render(<ArrayConcept />);
    fireEvent.change(screen.getByLabelText('Value'), { target: { value: 'abc' } });
    fireEvent.click(screen.getByText('Run'));
    expect(screen.queryByText('abc')).not.toBeTruthy(); // nothing should happen
  });
});
