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

export default function StackConcept() {
  const [stack, setStack] = useState<Item[]>([
    { id: 1, value: '🍽️ 3' },
    { id: 2, value: '🍽️ 7' },
    { id: 3, value: '🍽️ 5' },
  ]);
  const [nextId, setNextId] = useState(4);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const push = () => {
    const value = input.trim() === '' ? String(Math.floor(Math.random() * 90) + 10) : input.trim();
    setStack((prev) => [...prev, { id: nextId, value: `🍽️ ${value}` }]);
    setNextId((n) => n + 1);
    setMessage(`push(${value}) — placed a new plate on top`);
    setInput('');
  };

  const pop = () => {
    if (stack.length === 0) {
      setMessage('pop() — the stack is empty, nothing to remove!');
      return;
    }
    const top = stack[stack.length - 1];
    setStack((prev) => prev.slice(0, -1));
    setMessage(`pop() → returned ${top.value.replace('🍽️ ', '')} (the top plate)`);
  };

  const peek = () => {
    if (stack.length === 0) {
      setMessage('peek() — the stack is empty!');
      return;
    }
    const top = stack[stack.length - 1];
    setMessage(`peek() → ${top.value.replace('🍽️ ', '')} (looks at the top without removing it)`);
  };

  // Render top-of-stack first (visually on top)
  const displayItems = [...stack].reverse();

  return (
    <ConceptWrapper
      title="Stacks"
      description="A stack is a Last-In, First-Out (LIFO) collection — the last thing you add is the first thing you take off."
    >
      <TableOfContents numbered>
        <Section title="Picture a Stack of Plates">
          <Typography variant="body2" paragraph>
            The easiest way to understand a stack is to picture a <strong>stack of plates</strong> in a cupboard. You always add a clean plate to the <em>top</em>, and when you need one, you take it from the <em>top</em> too. You never pull a plate out from the middle or the bottom.
          </Typography>

          <ConceptInfoCard>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              Last In, First Out (LIFO)
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2">
                <strong>🍽️ Plates in a cupboard:</strong> the last plate stacked is the first one grabbed
              </Typography>
              <Typography variant="body2">
                <strong>↩️ The Undo button:</strong> &quot;undo&quot; reverses your most recent action first
              </Typography>
              <Typography variant="body2">
                <strong>🌐 Browser back button:</strong> returns you to the page you visited most recently
              </Typography>
            </Box>
          </ConceptInfoCard>
        </Section>

        <Section title="Try It Yourself">
          <Typography variant="body2" paragraph>
            Use <strong>Push</strong> to add a plate to the top and <strong>Pop</strong> to take the top plate off. Watch how everything happens at the top — the bottom plates never move.
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
                <div className="stack-empty">The stack is empty — push something on!</div>
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
                      {idx === 0 && <span className="stack-top-tag">← TOP</span>}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="stack-base" />
            </div>
            <p className="ds-caption">The dark bar is the bottom of the stack. New plates land on top.</p>

            {message && <p className="ds-output">{message}</p>}
          </div>
        </Section>

        <Section title="The Core Operations">
          <ConceptInfoCard>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2">
                <strong>push(item)</strong> — add an item to the top of the stack
              </Typography>
              <Typography variant="body2">
                <strong>pop()</strong> — remove and return the top item
              </Typography>
              <Typography variant="body2">
                <strong>peek()</strong> — look at the top item without removing it
              </Typography>
              <Typography variant="body2">
                <strong>is_empty()</strong> — check whether there is anything left
              </Typography>
            </Box>
          </ConceptInfoCard>

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Because every operation happens at one end, push and pop are extremely fast — they take the same tiny amount of time no matter how tall the stack gets. (That&apos;s <strong>O(1)</strong>, which you can read about in Algorithm Analysis &amp; Design.)
            </Typography>
          </Alert>
        </Section>

        <Section title="Where Stacks Show Up">
          <ConceptInfoCard>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2">
                <strong>Function calls:</strong> the computer uses a &quot;call stack&quot; to remember where to return after each function finishes
              </Typography>
              <Typography variant="body2">
                <strong>Undo / redo:</strong> editors stack up your actions so the most recent can be reversed first
              </Typography>
              <Typography variant="body2">
                <strong>Matching brackets:</strong> compilers use a stack to check that every <code>(</code> has a matching <code>)</code>
              </Typography>
              <Typography variant="body2">
                <strong>Back navigation:</strong> your browser history behaves like a stack of pages
              </Typography>
            </Box>
          </ConceptInfoCard>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
