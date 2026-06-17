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

export default function StackConcept() {
  const [stack, setStack] = useState<Item[]>([
    { id: 1, value: '3' },
    { id: 2, value: '7' },
    { id: 3, value: '5' },
  ]);
  const [nextId, setNextId] = useState(4);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const push = () => {
    const value = input.trim() === '' ? String(Math.floor(Math.random() * 90) + 10) : input.trim();
    setStack((prev) => [...prev, { id: nextId, value }]);
    setNextId((n) => n + 1);
    setMessage(`push(${value}) — a new item was placed on top.`);
    setInput('');
  };

  const pop = () => {
    if (stack.length === 0) {
      setMessage('pop() — the stack is empty, so there is nothing to remove.');
      return;
    }
    const top = stack[stack.length - 1];
    setStack((prev) => prev.slice(0, -1));
    setMessage(`pop() returned ${top.value} — the item that was on top.`);
  };

  const peek = () => {
    if (stack.length === 0) {
      setMessage('peek() — the stack is empty.');
      return;
    }
    const top = stack[stack.length - 1];
    setMessage(`peek() returned ${top.value} — the top item, which stays on the stack.`);
  };

  // Render top-of-stack first (visually on top)
  const displayItems = [...stack].reverse();

  return (
    <ConceptWrapper
      title="Stacks"
      description="A stack is a Last-In, First-Out (LIFO) collection: the most recently added item is the first one removed."
    >
      <TableOfContents numbered>
        {/* 1 ----------------------------------------------------------------- */}
        <Section title="The Big Idea">
          <Typography variant="body2" paragraph>
            The clearest way to picture a stack is a pile of plates in a cupboard. A clean plate is always added to the <em>top</em>, and when one is needed it is taken from the <em>top</em> as well. Plates are never removed from the middle or the bottom.
          </Typography>

          <CalloutBox title="Last In, First Out (LIFO)" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>A pile of plates:</strong> the last plate added is the first one taken.</Typography>
              <Typography variant="body2"><strong>The Undo command:</strong> &quot;undo&quot; reverses your most recent action first.</Typography>
              <Typography variant="body2"><strong>The browser back button:</strong> returns you to the page you visited most recently.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        {/* 2 ----------------------------------------------------------------- */}
        <Section title="Interactive Stack">
          <Typography variant="body2" paragraph>
            Use <strong>Push</strong> to add an item to the top and <strong>Pop</strong> to remove the top item. Note that every operation happens at the top — the lower items never move.
          </Typography>

          <div className="ds-viz">
            <div className="ds-controls">
              <TextField
                label="Value (optional)"
                size="small"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') push(); }}
                sx={{ width: 160 }}
              />
              <Button variant="contained" onClick={push}>Push</Button>
              <Button variant="outlined" onClick={pop}>Pop</Button>
              <Button variant="outlined" onClick={peek}>Peek</Button>
            </div>

            <div className="stack-area">
              {displayItems.length === 0 && (
                <div className="stack-empty">The stack is empty — push an item to begin.</div>
              )}
              <div className="stack-column">
                <AnimatePresence initial={false}>
                  {displayItems.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      className={`stack-item ${idx === 0 ? 'top' : ''}`}
                      layout
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.25 }}
                    >
                      {item.value}
                      {idx === 0 && <span className="stack-top-tag">&larr; top</span>}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="stack-base" />
            </div>
            <p className="ds-caption">The dark bar is the bottom of the stack. New items are added on top.</p>

            {message && <p className="ds-output">{message}</p>}
          </div>
        </Section>

        {/* 3 ----------------------------------------------------------------- */}
        <Section title="The Core Operations">
          <CalloutBox title="Every stack supports four operations" type="key-concepts">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>push(item)</strong> — add an item to the top of the stack.</Typography>
              <Typography variant="body2"><strong>pop()</strong> — remove and return the top item.</Typography>
              <Typography variant="body2"><strong>peek()</strong> — read the top item without removing it.</Typography>
              <Typography variant="body2"><strong>is_empty()</strong> — check whether any items remain.</Typography>
            </Box>
          </CalloutBox>

          <CalloutBox title="Performance" type="info">
            <Typography variant="body2">
              Because every operation happens at one end, push and pop are very fast — they take the same constant amount of time no matter how tall the stack becomes. This is <strong>O(1)</strong>, described further in <em>Algorithm Analysis &amp; Design</em>.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 4 ----------------------------------------------------------------- */}
        <Section title="Where Stacks Are Used">
          <CalloutBox title="Common applications" type="key-concepts">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Function calls:</strong> the computer uses a call stack to remember where to return after each function completes.</Typography>
              <Typography variant="body2"><strong>Undo and redo:</strong> editors stack recorded actions so the most recent can be reversed first.</Typography>
              <Typography variant="body2"><strong>Matching brackets:</strong> compilers use a stack to verify that every opening bracket has a matching closing bracket.</Typography>
              <Typography variant="body2"><strong>Back navigation:</strong> browser history behaves like a stack of visited pages.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        {/* 5 ----------------------------------------------------------------- */}
        <Section title="Key Takeaways">
          <CalloutBox title="Summary" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>A stack is Last-In, First-Out:</strong> the newest item is removed first.</Typography>
              <Typography variant="body2"><strong>All access happens at the top</strong> via push, pop, and peek.</Typography>
              <Typography variant="body2"><strong>Operations are O(1)</strong> and underpin function calls, undo systems, and more.</Typography>
            </Box>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
