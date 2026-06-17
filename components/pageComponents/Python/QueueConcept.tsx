'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import '../../../styles/dataStructures.css';

type Item = { id: number; value: string };

export default function QueueConcept() {
  const [queue, setQueue] = useState<Item[]>([
    { id: 1, value: 'Ann' },
    { id: 2, value: 'Ben' },
    { id: 3, value: 'Cara' },
  ]);
  const [nextId, setNextId] = useState(4);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const enqueue = () => {
    const names = ['Dia', 'Eli', 'Fay', 'Gus', 'Hana', 'Ivy', 'Jon'];
    const value = input.trim() === '' ? names[Math.floor(Math.random() * names.length)] : input.trim();
    setQueue((prev) => [...prev, { id: nextId, value }]);
    setNextId((n) => n + 1);
    setMessage(`enqueue(${value}) — added to the back of the line.`);
    setInput('');
  };

  const dequeue = () => {
    if (queue.length === 0) {
      setMessage('dequeue() — the queue is empty, so there is no one to serve.');
      return;
    }
    const front = queue[0];
    setQueue((prev) => prev.slice(1));
    setMessage(`dequeue() returned ${front.value} — the item that had waited longest.`);
  };

  const peek = () => {
    if (queue.length === 0) {
      setMessage('peek() — the queue is empty.');
      return;
    }
    setMessage(`peek() returned ${queue[0].value} — the item that will be served next.`);
  };

  return (
    <ConceptWrapper
      title="Queues"
      description="A queue is a First-In, First-Out (FIFO) collection: the item that has waited longest is the first one removed."
    >
      <TableOfContents numbered>
        {/* 1 ----------------------------------------------------------------- */}
        <Section title="The Big Idea">
          <Typography variant="body2" paragraph>
            A queue works exactly like a line of people at a checkout. New arrivals join at the <em>back</em>, and the person at the <em>front</em> is always served next. It is inherently fair: whoever has waited longest is handled first.
          </Typography>

          <CalloutBox title="First In, First Out (FIFO)" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>A checkout line:</strong> the first to arrive is the first to be served.</Typography>
              <Typography variant="body2"><strong>A printer queue:</strong> documents print in the order they were submitted.</Typography>
              <Typography variant="body2"><strong>Support tickets:</strong> requests are handled in the order they arrive.</Typography>
            </Box>
          </CalloutBox>

          <CalloutBox title="The opposite of a stack" type="key-concepts">
            <Typography variant="body2">
              A stack removes the <em>newest</em> item first (LIFO); a queue removes the <em>oldest</em> item first (FIFO).
            </Typography>
          </CalloutBox>
        </Section>

        {/* 2 ----------------------------------------------------------------- */}
        <Section title="Interactive Queue">
          <Typography variant="body2" paragraph>
            <strong>Enqueue</strong> adds an item to the back of the line; <strong>Dequeue</strong> serves the item at the front. Items enter at one end and leave from the other.
          </Typography>

          <div className="ds-viz">
            <div className="ds-controls">
              <TextField
                label="Name (optional)"
                size="small"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') enqueue(); }}
                sx={{ width: 160 }}
              />
              <Button variant="contained" onClick={enqueue}>Enqueue</Button>
              <Button variant="outlined" onClick={dequeue}>Dequeue</Button>
              <Button variant="outlined" onClick={peek}>Peek</Button>
            </div>

            <div className="queue-area">
              {queue.length === 0 ? (
                <span className="queue-empty">The queue is empty — enqueue an item to begin.</span>
              ) : (
                <AnimatePresence initial={false}>
                  {queue.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      className="queue-item"
                      layout
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.25 }}
                    >
                      {idx === 0 && <span className="queue-tag front">front</span>}
                      {idx === queue.length - 1 && queue.length > 1 && (
                        <span className="queue-tag back">back</span>
                      )}
                      <span className="queue-avatar" />
                      {item.value}
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
            <p className="ds-caption">Items join on the right (back) and are served from the left (front).</p>

            {message && <p className="ds-output">{message}</p>}
          </div>
        </Section>

        {/* 3 ----------------------------------------------------------------- */}
        <Section title="The Core Operations">
          <CalloutBox title="Every queue supports four operations" type="key-concepts">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>enqueue(item)</strong> — add an item to the back of the queue.</Typography>
              <Typography variant="body2"><strong>dequeue()</strong> — remove and return the front item.</Typography>
              <Typography variant="body2"><strong>peek()</strong> — read the front item without removing it.</Typography>
              <Typography variant="body2"><strong>is_empty()</strong> — check whether any items remain.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        {/* 4 ----------------------------------------------------------------- */}
        <Section title="Where Queues Are Used">
          <CalloutBox title="Common applications" type="key-concepts">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Task scheduling:</strong> operating systems line up jobs to run in order.</Typography>
              <Typography variant="body2"><strong>Printing:</strong> print jobs are handled on a first-come, first-served basis.</Typography>
              <Typography variant="body2"><strong>Breadth-first search:</strong> exploring a graph or tree level by level relies on a queue.</Typography>
              <Typography variant="body2"><strong>Messaging systems:</strong> messages wait in line to be processed in order.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        {/* 5 ----------------------------------------------------------------- */}
        <Section title="Key Takeaways">
          <CalloutBox title="Summary" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>A queue is First-In, First-Out:</strong> the oldest item is removed first.</Typography>
              <Typography variant="body2"><strong>Items enter at the back and leave from the front</strong> via enqueue and dequeue.</Typography>
              <Typography variant="body2"><strong>Queues model fair, in-order processing</strong> such as scheduling and printing.</Typography>
            </Box>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
