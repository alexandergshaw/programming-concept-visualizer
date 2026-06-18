import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Use the synchronous framer-motion manual mock (see __mocks__/framer-motion.tsx).
jest.mock('framer-motion');

import StackConcept from '@/components/pageComponents/Python/StackConcept';

describe('StackConcept', () => {
  it('renders the title, big idea, and key section headings', () => {
    render(<StackConcept />);
    expect(screen.getAllByText('Stacks').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Last In, First Out (LIFO)').length).toBeGreaterThan(0);
    expect(screen.getAllByText('The Big Idea').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Interactive Stack').length).toBeGreaterThan(0);
    expect(screen.getAllByText('The Core Operations').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Where Stacks Are Used').length).toBeGreaterThan(0);
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
    expect(screen.getAllByText('42').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/push\(42\)/).length).toBeGreaterThan(0);
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
    expect(screen.getAllByText(/pop\(\) returned/).length).toBeGreaterThan(0);
  });

  it('peek leaves the stack unchanged', () => {
    const { container } = render(<StackConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Peek' }));
    expect(container.querySelectorAll('.stack-item')).toHaveLength(3);
    expect(screen.getAllByText(/peek\(\) returned/).length).toBeGreaterThan(0);
  });

  it('handles popping down to an empty stack', () => {
    const { container } = render(<StackConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Pop' }));
    fireEvent.click(screen.getByRole('button', { name: 'Pop' }));
    fireEvent.click(screen.getByRole('button', { name: 'Pop' }));
    expect(container.querySelectorAll('.stack-item')).toHaveLength(0);
    expect(screen.getAllByText(/stack is empty/i).length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('button', { name: 'Pop' }));
    expect(screen.getAllByText(/nothing to remove/i).length).toBeGreaterThan(0);
  });
});
