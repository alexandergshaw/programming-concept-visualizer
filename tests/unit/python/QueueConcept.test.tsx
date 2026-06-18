import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Use the synchronous framer-motion manual mock (see __mocks__/framer-motion.tsx).
jest.mock('framer-motion');

import QueueConcept from '@/components/pageComponents/Python/QueueConcept';

describe('QueueConcept', () => {
  it('renders the title, big idea, and key section headings', () => {
    render(<QueueConcept />);
    expect(screen.getAllByText('Queues').length).toBeGreaterThan(0);
    expect(screen.getAllByText('First In, First Out (FIFO)').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Interactive Queue').length).toBeGreaterThan(0);
    expect(screen.getAllByText('The Core Operations').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Where Queues Are Used').length).toBeGreaterThan(0);
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
    expect(screen.getAllByText('Zoe').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/enqueue\(Zoe\)/).length).toBeGreaterThan(0);
  });

  it('dequeue removes the front item', () => {
    const { container } = render(<QueueConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Dequeue' }));
    expect(container.querySelectorAll('.queue-item')).toHaveLength(2);
    expect(screen.getAllByText(/dequeue\(\) returned Ann/).length).toBeGreaterThan(0);
  });

  it('peek leaves the queue unchanged', () => {
    const { container } = render(<QueueConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Peek' }));
    expect(container.querySelectorAll('.queue-item')).toHaveLength(3);
    expect(screen.getAllByText(/peek\(\) returned Ann/).length).toBeGreaterThan(0);
  });

  it('handles dequeuing down to an empty queue', () => {
    const { container } = render(<QueueConcept />);
    fireEvent.click(screen.getByRole('button', { name: 'Dequeue' }));
    fireEvent.click(screen.getByRole('button', { name: 'Dequeue' }));
    fireEvent.click(screen.getByRole('button', { name: 'Dequeue' }));
    expect(container.querySelectorAll('.queue-item')).toHaveLength(0);
    expect(screen.getAllByText(/queue is empty/i).length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('button', { name: 'Dequeue' }));
    expect(screen.getAllByText(/no one to serve/i).length).toBeGreaterThan(0);
  });
});
