'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import ConceptInfoCard from '../../common/ConceptInfoCard';
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
    setMessage(`enqueue(${value}) — joined the back of the line`);
    setInput('');
  };

  const dequeue = () => {
    if (queue.length === 0) {
      setMessage('dequeue() — the line is empty, no one to serve!');
      return;
    }
    const front = queue[0];
    setQueue((prev) => prev.slice(1));
    setMessage(`dequeue() → served ${front.value} (the person who waited longest)`);
  };

  const peek = () => {
    if (queue.length === 0) {
      setMessage('peek() — the line is empty!');
      return;
    }
    setMessage(`peek() → ${queue[0].value} is next to be served`);
  };

  return (
    <ConceptWrapper
      title="Queues"
      description="A queue is a First-In, First-Out (FIFO) collection — the first thing you add is the first thing you take out."
    >
      <TableOfContents numbered>
        <Section title="Picture a Line at the Store">
          <Typography variant="body2" paragraph>
            A queue works exactly like a <strong>line of people</strong> waiting at a checkout. New people join at the <em>back</em>, and the person at the <em>front</em> is always served next. It&apos;s fair: whoever has been waiting longest goes first.
          </Typography>

          <ConceptInfoCard>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              First In, First Out (FIFO)
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2">
                <strong>🧍 A checkout line:</strong> first to arrive is first to be served
              </Typography>
              <Typography variant="body2">
                <strong>🖨️ A printer queue:</strong> documents print in the order they were sent
              </Typography>
              <Typography variant="body2">
                <strong>🎫 Customer support tickets:</strong> handled in the order they came in
              </Typography>
            </Box>
          </ConceptInfoCard>

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              This is the opposite of a <strong>stack</strong>. A stack removes the <em>newest</em> item first (LIFO); a queue removes the <em>oldest</em> item first (FIFO).
            </Typography>
          </Alert>
        </Section>

        <Section title="Try It Yourself">
          <Typography variant="body2" paragraph>
            <strong>Enqueue</strong> adds a person to the back of the line. <strong>Dequeue</strong> serves the person at the front. Notice that things enter on one end and leave from the other.
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
                <span className="queue-empty">The line is empty — enqueue someone!</span>
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
                      {idx === 0 && <span className="queue-tag front">FRONT ↓</span>}
                      {idx === queue.length - 1 && queue.length > 1 && (
                        <span className="queue-tag back">BACK ↓</span>
                      )}
                      <span className="queue-emoji">🧍</span>
                      {item.value}
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
            <p className="ds-caption">People join on the right (back) and are served from the left (front).</p>

            {message && <p className="ds-output">{message}</p>}
          </div>
        </Section>

        <Section title="The Core Operations">
          <ConceptInfoCard>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2">
                <strong>enqueue(item)</strong> — add an item to the back of the queue
              </Typography>
              <Typography variant="body2">
                <strong>dequeue()</strong> — remove and return the front item
              </Typography>
              <Typography variant="body2">
                <strong>peek()</strong> — look at the front item without removing it
              </Typography>
              <Typography variant="body2">
                <strong>is_empty()</strong> — check whether anyone is still waiting
              </Typography>
            </Box>
          </ConceptInfoCard>
        </Section>

        <Section title="Where Queues Show Up">
          <ConceptInfoCard>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2">
                <strong>Task scheduling:</strong> operating systems line up jobs to run in order
              </Typography>
              <Typography variant="body2">
                <strong>Printing:</strong> print jobs are handled first-come, first-served
              </Typography>
              <Typography variant="body2">
                <strong>Breadth-first search:</strong> exploring a graph or tree level by level uses a queue
              </Typography>
              <Typography variant="body2">
                <strong>Messaging systems:</strong> messages wait in line to be processed fairly
              </Typography>
            </Box>
          </ConceptInfoCard>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
