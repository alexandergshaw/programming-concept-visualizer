'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CalloutBox from '../../common/CalloutBox';

const deliverableTypes = [
  {
    type: 'Product Deliverables',
    token: 'info',
    desc: 'Physical or digital outputs — the thing the project creates.',
    examples: ['Working software application', 'Hardware prototype', 'Configured system'],
  },
  {
    type: 'Process Deliverables',
    token: 'success',
    desc: 'Documentation and artefacts that support delivery or future use.',
    examples: ['Project plan', 'Risk register', 'Test reports'],
  },
  {
    type: 'Service Deliverables',
    token: 'feature',
    desc: 'Ongoing services or capabilities established by the project.',
    examples: ['Trained support team', 'Live monitoring dashboard', 'SLA agreement'],
  },
];

const attributes = [
  { label: 'Name', desc: 'A clear, unambiguous name for the deliverable.' },
  { label: 'Description', desc: 'What it is, what it contains, and how it is used.' },
  { label: 'Acceptance criteria', desc: 'How the customer or sponsor will judge it as complete.' },
  { label: 'Owner', desc: 'The person responsible for producing it.' },
  { label: 'Due date', desc: 'When it must be ready for review or hand-over.' },
  { label: 'Dependencies', desc: 'Other deliverables or tasks it relies on.' },
];

export default function ProjectDeliverablesConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Defining Project Deliverables
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Inventory2Icon sx={{ fontSize: 56, color: 'var(--success)' }} />
      </Box>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        A deliverable is any measurable, tangible, or verifiable outcome, result, or item that
        must be produced to complete the project or part of the project. Defining deliverables
        clearly prevents misunderstandings about what is expected.
      </Typography>

      {/* Deliverable types */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)' }}>Types of Deliverables</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2.5, mb: 4 }}>
        {deliverableTypes.map((d) => (
          <Paper key={d.type} elevation={3} sx={{ p: 2.5, borderRadius: 2, borderTop: `4px solid var(--${d.token})` }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: `var(--${d.token})`, mb: 0.8 }}>{d.type}</Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6, mb: 1.5 }}>{d.desc}</Typography>
            {d.examples.map((e) => (
              <Typography key={e} variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>• {e}</Typography>
            ))}
          </Paper>
        ))}
      </Box>

      {/* Attributes */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)' }}>Documenting a Deliverable</Typography>
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden', mb: 4 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', background: 'var(--feature)', p: 1.5 }}>
          {['Attribute', 'Description'].map((h) => (
            <Typography key={h} variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--paper-raised)' }}>{h}</Typography>
          ))}
        </Box>
        {attributes.map((a, i) => (
          <Box key={a.label} sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', p: 1.5, background: i % 2 === 0 ? 'var(--paper)' : 'var(--paper-raised)', borderTop: '1px solid var(--line)' }}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: 'var(--ink)' }}>{a.label}</Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>{a.desc}</Typography>
          </Box>
        ))}
      </Paper>

      <CalloutBox type="info" title="Deliverables drive the WBS">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          Each deliverable becomes a branch in the Work Breakdown Structure (WBS). Decomposing
          deliverables into smaller work packages makes them easier to assign, estimate, and track.
          Start with deliverables, then break them down — never the other way around.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
