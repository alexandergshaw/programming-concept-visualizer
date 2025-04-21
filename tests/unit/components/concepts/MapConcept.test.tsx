import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MapConcept from '../../../../components/languages/JavaScript/MapConcept';

const MAP_DESCRIPTIONS: Record<string, string> = {
  set: 'Adds or updates a key-value pair in the map.',
  get: 'Retrieves the value associated with a key.',
  has: 'Checks if a key exists in the map.',
  delete: 'Removes a key and its value.',
  clear: 'Removes all key-value pairs.',
};

describe('MapConcept Component definitions', () => {
  it('contains definition(s)', () => {
    render(<MapConcept />);
    expect(screen.getByText('A data structure that stores key-value pairs. Keys can be any type.')).toBeTruthy();
  })

  it.each(Object.entries(MAP_DESCRIPTIONS))(
    'displays correct description for %s operation',
    async (operation, expectedDescription) => {
      render(<MapConcept />);
      const user = userEvent.setup();

      const combo = screen.getByRole('combobox', { name: /choose operation/i });
      await user.click(combo);
      await user.click(screen.getByText(operation));

      expect(screen.getByDisplayValue(expectedDescription)).toBeTruthy();
    }
  );
});

describe('MapConcept operations', () => {
  const user = userEvent.setup();

  const selectOperation = async (op: string) => {
    const combo = screen.getByLabelText(/Choose operation/i);
    await user.click(combo);
    await user.click(screen.getByText(op));
  };

  const setInput = (label: string, value: string) => {
    fireEvent.change(screen.getByLabelText(label), { target: { value } });
  };

  const clickRun = () => {
    fireEvent.click(screen.getByText('Run'));
  };

  it('performs set operation and updates map display', async () => {
    render(<MapConcept />);
    await selectOperation('set');
    setInput('Key', 'language');
    setInput('Value', 'JavaScript');
    clickRun();
    expect(screen.getByText('language')).toBeTruthy();
    expect(screen.getByText('JavaScript')).toBeTruthy();
    expect(screen.getByText(/set\("language", "JavaScript"\)/)).toBeTruthy();
  });

  it('performs get operation and shows output', async () => {
    render(<MapConcept />);
    await selectOperation('get');
    setInput('Key', 'name');
    clickRun();
    expect(screen.getByText(/get\("name"\) → "Alex"/)).toBeTruthy();
  });

  it('performs has operation for existing key', async () => {
    render(<MapConcept />);
    await selectOperation('has');
    setInput('Key', 'role');
    clickRun();
    expect(screen.getByText(/has\("role"\) → true/)).toBeTruthy();
  });

  it('performs delete operation and removes entry', async () => {
    render(<MapConcept />);
    await selectOperation('delete');
    setInput('Key', 'role');
    clickRun();
    expect(screen.getByText(/delete\("role"\) → true/)).toBeTruthy();
    expect(screen.queryByText('role')).not.toBeTruthy();
  });

  it('performs clear operation and empties map', async () => {
    render(<MapConcept />);
    await selectOperation('clear');
    clickRun();
    expect(screen.getByText('Map cleared')).toBeTruthy();
    expect(screen.queryByText('name')).not.toBeTruthy();
    expect(screen.queryByText('role')).not.toBeTruthy();
  });

  it('handles get operation for non-existent key', async () => {
    render(<MapConcept />);
    await selectOperation('get');
    setInput('Key', 'banana');
    clickRun();
    expect(screen.getByText(/get\("banana"\) → undefined/)).toBeTruthy();
  });

  it('handles has operation for non-existent key', async () => {
    render(<MapConcept />);
    await selectOperation('has');
    setInput('Key', 'banana');
    clickRun();
    expect(screen.getByText(/has\("banana"\) → false/)).toBeTruthy();
  });

  it('handles delete operation for non-existent key', async () => {
    render(<MapConcept />);
    await selectOperation('delete');
    setInput('Key', 'banana');
    clickRun();
    expect(screen.getByText(/delete\("banana"\) → false/)).toBeTruthy();
  });
});
