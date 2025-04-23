import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SetConcept from '../../../../../components/pageComponents/javaScript/SetConcept';

const SET_DESCRIPTIONS: Record<string, string> = {
  add: 'Adds a value to the set (if it is not already present).',
  delete: 'Removes a specific value from the set.',
  has: 'Checks whether a value exists in the set.',
  clear: 'Removes all values from the set.',
};

describe('SetConcept Component Descriptions', () => {
  it("contains correct definitions", () => {
    render(<SetConcept />);
    expect(screen.getByText('A data structure that stores unique values. You can add, remove, or check for existence.')).toBeTruthy();
  })

  it.each(Object.entries(SET_DESCRIPTIONS))(
    'displays correct description for %s operation',
    async (operation, expectedDescription) => {
      render(<SetConcept />);
      const user = userEvent.setup();

      const combo = screen.getByRole('combobox', { name: /choose operation/i });
      await user.click(combo);
      await user.click(screen.getByText(operation));

      expect(screen.getByDisplayValue(expectedDescription)).toBeTruthy();
    }
  );
});

describe('SetConcept operations', () => {
  const user = userEvent.setup();

  const selectOperation = async (op: string) => {
    const combo = screen.getByLabelText(/Choose operation/i);
    await user.click(combo);
    await user.click(screen.getByText(op));
  };

  const setValueInput = (value: string) => {
    fireEvent.change(screen.getByLabelText('Value'), { target: { value } });
  };

  const clickRun = () => {
    fireEvent.click(screen.getByText('Run'));
  };

  it('adds a value to the set', async () => {
    render(<SetConcept />);
    await selectOperation('add');
    setValueInput('10');
    clickRun();
    expect(screen.getByText('10')).toBeTruthy();
  });

  it('prevents adding a duplicate value', async () => {
    render(<SetConcept />);
    await selectOperation('add');
    setValueInput('1'); // already in initial set
    clickRun();
    expect(
      screen.getByText('The value 1 already exists in the Set and was not added.')
    ).toBeTruthy();
  });

  it('deletes a value from the set', async () => {
    render(<SetConcept />);
    await selectOperation('delete');
    setValueInput('2');
    clickRun();
    expect(screen.getByText(/delete\(2\) → true/)).toBeTruthy();
    expect(screen.queryByText('2')).not.toBeTruthy();
  });

  it('handles delete for missing value', async () => {
    render(<SetConcept />);
    await selectOperation('delete');
    setValueInput('999');
    clickRun();
    expect(screen.getByText(/delete\(999\) → false/)).toBeTruthy();
  });

  it('checks has for an existing value', async () => {
    render(<SetConcept />);
    await selectOperation('has');
    setValueInput('3');
    clickRun();
    expect(screen.getByText(/has\(3\) → true/)).toBeTruthy();
  });

  it('checks has for a missing value', async () => {
    render(<SetConcept />);
    await selectOperation('has');
    setValueInput('999');
    clickRun();
    expect(screen.getByText(/has\(999\) → false/)).toBeTruthy();
  });

  it('clears the entire set', async () => {
    render(<SetConcept />);
    await selectOperation('clear');
    clickRun();
    expect(screen.getByText('Set cleared')).toBeTruthy();
    expect(screen.queryByText('1')).not.toBeTruthy();
    expect(screen.queryByText('2')).not.toBeTruthy();
    expect(screen.queryByText('3')).not.toBeTruthy();
  });

  it('shows a warning for duplicates in raw input', () => {
    render(<SetConcept />);
    fireEvent.change(screen.getByLabelText(/Define your set/i), {
      target: { value: '1, 2, 2, 3, 3, 3' },
    });
    expect(screen.getByText(/Warning: Duplicate values detected: 2, 3/)).toBeTruthy();
  });
});
