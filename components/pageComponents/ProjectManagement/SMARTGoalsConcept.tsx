'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import CalloutBox from '../../common/CalloutBox';

const letters = [
  {
    letter: 'S',
    word: 'Specific',
    token: 'info',
    question: 'What exactly needs to be achieved?',
    tip: 'Replace vague words ("improve", "better", "more") with concrete verbs and nouns.',
    example: 'Reduce customer support ticket volume by 25%.',
  },
  {
    letter: 'M',
    word: 'Measurable',
    token: 'success',
    question: 'How will we know we have succeeded?',
    tip: 'Attach a number, percentage, rating, or observable state to every goal.',
    example: '25% fewer tickets means we can count tickets before and after.',
  },
  {
    letter: 'A',
    word: 'Achievable',
    token: 'feature',
    question: 'Is this realistic with our resources and constraints?',
    tip: 'Stretch goals are fine, but impossible goals demotivate teams. Validate against capacity.',
    example: '25% is ambitious but based on last year\'s data for a similar project.',
  },
  {
    letter: 'R',
    word: 'Relevant',
    token: 'warning',
    question: 'Does this matter to the organisation right now?',
    tip: 'Every goal should tie directly to a strategic priority. If you cannot explain the link, revisit it.',
    example: 'Fewer tickets reduces operational cost — a Q3 strategic priority.',
  },
  {
    letter: 'T',
    word: 'Time-bound',
    token: 'danger',
    question: 'By when must this be achieved?',
    tip: 'Without a deadline, goals drift. Set a specific date, not "as soon as possible".',
    example: 'By the end of Q3 (30 September).',
  },
];

export default function SMARTGoalsConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Writing SMART Project Goals
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <EmojiObjectsIcon sx={{ fontSize: 56, color: 'var(--warning)' }} />
      </Box>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        SMART is a widely-used framework that turns vague intentions into precise, actionable goals.
        Each letter represents a quality that a well-formed goal must have.
      </Typography>

      {/* Full example at top */}
      <Paper sx={{ p: 2.5, mb: 4, background: 'var(--success-bg)', border: '1px solid var(--success)', borderRadius: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--success)', mb: 0.5 }}>✔ A SMART goal in practice</Typography>
        <Typography variant="body1" sx={{ color: 'var(--ink)', lineHeight: 1.7 }}>
          &ldquo;Reduce customer support ticket volume by <strong>25%</strong> by <strong>30 September</strong>
          , by implementing a self-service knowledge base, without increasing staff headcount.&rdquo;
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        {letters.map((l) => (
          <Paper key={l.letter} elevation={2} sx={{ p: 2.5, borderRadius: 2, display: 'flex', gap: 2 }}>
            <Box
              sx={{
                width: 52, height: 52, borderRadius: 2,
                background: `var(--${l.token})`, color: 'var(--paper-raised)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: '1.6rem', flex: '0 0 auto',
              }}
            >
              {l.letter}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: `var(--${l.token})`, mb: 0.3 }}>{l.word}</Typography>
              <Typography variant="caption" sx={{ color: 'var(--ink-soft)', fontStyle: 'italic', display: 'block', mb: 0.8 }}>
                Ask: {l.question}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6, mb: 0.8 }}>{l.tip}</Typography>
              <Typography variant="caption" sx={{ color: `var(--${l.token})`, fontStyle: 'italic' }}>
                Example: {l.example}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="info" title="SMART is a starting point, not a straitjacket">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          Some practitioners extend SMART to SMARTER — adding Evaluated and Reviewed. The core
          principle remains the same: goals that are clear, measurable, and time-bound are far more
          likely to be achieved than goals that are not.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
