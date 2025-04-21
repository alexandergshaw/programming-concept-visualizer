import { render, screen, fireEvent } from '@testing-library/react';
import ArrayConcept from '../../../../components/languages/JavaScript/ArrayConcept';
import userEvent from '@testing-library/user-event';

describe('ArrayConcept array operations', () => {
  const setInput = (label: string, value: string) => {
    fireEvent.change(screen.getByLabelText(label), { target: { value } });
  };

  const clickRun = () => {
    fireEvent.click(screen.getByText('Run'));
  };

  it('pushes value to the end', () => {
    render(<ArrayConcept />);
    setInput('Value', '10');
    clickRun();
    expect(screen.getByText('10')).toBeTruthy();
  });

  it('pops last value', async () => {
    const user = userEvent.setup();
    render(<ArrayConcept />);
  
    const combo = screen.getByLabelText(/Choose operation/i);
    await user.click(combo);

    await user.click(screen.getByText('pop'));
    clickRun();

    expect(screen.queryByText('3')).not.toBeTruthy();
  });
  

  it('unshifts value to the start', async () => {
    const user = userEvent.setup();
    render(<ArrayConcept />);

    const combo = screen.getByLabelText(/Choose operation/i);
    await user.click(combo);

    await user.click(screen.getByText('unshift'));
    setInput('Value', '0');
    clickRun();

    expect(screen.getAllByText('0')[0]).toBeTruthy(); // first element
  });

  it('splices value into index', async () => {
    const user = userEvent.setup();
    render(<ArrayConcept />);
    
    const combo = screen.getByLabelText(/Choose operation/i);
    await user.click(combo);
    
    await user.click(screen.getByText('splice'));
    setInput('Index', '1');
    setInput('Value', '9');
    clickRun();
    const arrayValues = screen.getAllByText(/Index \d/).map((_, i) =>
      screen.getAllByText(/Index \d/)[i].nextSibling?.textContent
    );
    expect(arrayValues).toContain('9');
  });

  it('slices array and shows output', async () => {
    const user = userEvent.setup();
    render(<ArrayConcept />);

    const combo = screen.getByLabelText(/Choose operation/i);
    await user.click(combo);
    
    await user.click(screen.getByText('slice'));
    setInput('Index', '2');
    clickRun();
    expect(screen.getByText(/Sliced: \[1, 2\]/)).toBeTruthy();
  });

  it('finds indexOf value', async () => {
    const user = userEvent.setup();
    render(<ArrayConcept />);

    const combo = screen.getByLabelText(/Choose operation/i);
    await user.click(combo);
    
    await user.click(screen.getByText('indexOf'));
    setInput('Value', '2');
    clickRun();
    expect(screen.getByText(/indexOf\(2\) → 1/)).toBeTruthy();
  });

  it('finds lastIndexOf value', async () => {
    const user = userEvent.setup();
    render(<ArrayConcept />);
    fireEvent.change(screen.getByLabelText(/Define your array/i), {
      target: { value: '1, 2, 3, 2' },
    });
    const combo = screen.getByLabelText(/Choose operation/i);
    await user.click(combo);
    
    await user.click(screen.getByText('lastIndexOf'));
    setInput('Value', '2');
    clickRun();
    expect(screen.getByText(/lastIndexOf\(2\) → 3/)).toBeTruthy();
  });

  it('checks if value is included', async () => {
    const user = userEvent.setup();
    render(<ArrayConcept />);

    const combo = screen.getByLabelText(/Choose operation/i);
    await user.click(combo);
    
    await user.click(screen.getByText('includes'));
    setInput('Value', '2');
    clickRun();
    expect(screen.getByText(/includes\(2\)/i)).toBeTruthy();
    expect(screen.getByText(/true/i)).toBeTruthy();
  });

  it('updates value at specific index (valid)', async () => {
    const user = userEvent.setup();
    render(<ArrayConcept />);

    const combo = screen.getByLabelText(/Choose operation/i);
    await user.click(combo);
    
    await user.click(screen.getByText('update'));
    setInput('Index', '1');
    setInput('Value', '42');
    clickRun();
    expect(screen.getByText('42')).toBeTruthy();
    expect(screen.getByText(/Updated index 1 to 42/)).toBeTruthy();
  });

  it('fails to update if index is out of bounds', async () => {
    const user = userEvent.setup();
    render(<ArrayConcept />);

    const combo = screen.getByLabelText(/Choose operation/i);
    await user.click(combo);
    
    await user.click(screen.getByText('update'));
    setInput('Index', '10');
    setInput('Value', '42');
    clickRun();
    expect(screen.getByText(/Index 10 is out of bounds/)).toBeTruthy();
  });
});
