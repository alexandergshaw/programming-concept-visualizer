import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Use the synchronous framer-motion manual mock (see __mocks__/framer-motion.tsx).
jest.mock('framer-motion');

import StackConcept from '@/components/pageComponents/Python/StackConcept';

describe('StackConcept', () => {
  it('renders the title, big idea, and key section headings', () => {
    render(<StackConcept />);
    expect(screen.getByText('Stacks')).toBeInTheDocument();
    expect(screen.getByText('Last In, First Out (LIFO)')).toBeInTheDocument();
    expect(screen.getByText('The Big Idea')).toBeInTheDocument();
    expect(screen.getByText('Interactive Stack')).toBeInTheDocument();
    expect(screen.getByText('The Core Operations')).toBeInTheDocument();
    expect(screen.getByText('Where Stacks Are Used')).toBeInTheDocument();
  });

  it('starts with three items and marks the top', () => {
    const { container } = render(<StackConcept />);
    expect(container.querySelectorAll('.stack-item')).toHaveLength(3);
    expect(container.querySelector('.stack-top-tag')).not.toBeNull();
  });

  it('push adds a typed value to the top', () => {
    const { container } = render(<StackConcept />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '42' } });
    fireEvent.click(screen.getByRole('button', { name: 'Push' }));
    expect(container.querySelectorAll('.stack-item')).toHaveLength(4);
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText(/push\(42\)/)).toBeInTheDocument();
  });

  it('push with no value still adds an item', () => {
    const { container } = render(<StackConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Push' }));
    expect(container.querySelectorAll('.stack-item')).toHaveLength(4);
  });

  it('pop removes the top item', () => {
    const { container } = render(<StackConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Pop' }));
    expect(container.querySelectorAll('.stack-item')).toHaveLength(2);
    expect(screen.getByText(/pop\(\) returned/)).toBeInTheDocument();
  });

  it('peek leaves the stack unchanged', () => {
    const { container } = render(<StackConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Peek' }));
    expect(container.querySelectorAll('.stack-item')).toHaveLength(3);
    expect(screen.getByText(/peek\(\) returned/)).toBeInTheDocument();
  });

  it('handles popping down to an empty stack', () => {
    const { container } = render(<StackConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Pop' }));
    fireEvent.click(screen.getByRole('button', { name: 'Pop' }));
    fireEvent.click(screen.getByRole('button', { name: 'Pop' }));
    expect(container.querySelectorAll('.stack-item')).toHaveLength(0);
    expect(screen.getByText(/stack is empty/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Pop' }));
    expect(screen.getByText(/nothing to remove/i)).toBeInTheDocument();
  });
});
