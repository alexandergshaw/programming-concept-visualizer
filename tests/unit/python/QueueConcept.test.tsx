import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Use the synchronous framer-motion manual mock (see __mocks__/framer-motion.tsx).
jest.mock('framer-motion');

import QueueConcept from '@/components/pageComponents/Python/QueueConcept';

describe('QueueConcept', () => {
  it('renders the title, big idea, and key section headings', () => {
    render(<QueueConcept />);
    expect(screen.getByText('Queues')).toBeInTheDocument();
    expect(screen.getByText('First In, First Out (FIFO)')).toBeInTheDocument();
    expect(screen.getByText('Interactive Queue')).toBeInTheDocument();
    expect(screen.getByText('The Core Operations')).toBeInTheDocument();
    expect(screen.getByText('Where Queues Are Used')).toBeInTheDocument();
  });

  it('starts with three people and front/back markers', () => {
    const { container } = render(<QueueConcept />);
    expect(container.querySelectorAll('.queue-item')).toHaveLength(3);
    expect(container.querySelector('.queue-tag.front')).not.toBeNull();
    expect(container.querySelector('.queue-tag.back')).not.toBeNull();
    expect(container.querySelectorAll('.queue-avatar')).toHaveLength(3);
  });

  it('enqueue adds a typed value to the back', () => {
    const { container } = render(<QueueConcept />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Zoe' } });
    fireEvent.click(screen.getByRole('button', { name: 'Enqueue' }));
    expect(container.querySelectorAll('.queue-item')).toHaveLength(4);
    expect(screen.getByText('Zoe')).toBeInTheDocument();
    expect(screen.getByText(/enqueue\(Zoe\)/)).toBeInTheDocument();
  });

  it('dequeue removes the front item', () => {
    const { container } = render(<QueueConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Dequeue' }));
    expect(container.querySelectorAll('.queue-item')).toHaveLength(2);
    expect(screen.getByText(/dequeue\(\) returned Ann/)).toBeInTheDocument();
  });

  it('peek leaves the queue unchanged', () => {
    const { container } = render(<QueueConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Peek' }));
    expect(container.querySelectorAll('.queue-item')).toHaveLength(3);
    expect(screen.getByText(/peek\(\) returned Ann/)).toBeInTheDocument();
  });

  it('handles dequeuing down to an empty queue', () => {
    const { container } = render(<QueueConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Dequeue' }));
    fireEvent.click(screen.getByRole('button', { name: 'Dequeue' }));
    fireEvent.click(screen.getByRole('button', { name: 'Dequeue' }));
    expect(container.querySelectorAll('.queue-item')).toHaveLength(0);
    expect(screen.getByText(/queue is empty/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Dequeue' }));
    expect(screen.getByText(/no one to serve/i)).toBeInTheDocument();
  });
});
