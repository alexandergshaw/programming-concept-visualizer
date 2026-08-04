'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import CalloutBox from '../../common/CalloutBox';

const components = [
  {
    name: 'Project Objectives',
    token: 'info',
    desc: 'What the project must achieve. Objectives should be specific and measurable.',
    example: 'Deliver a mobile check-out feature that reduces cart abandonment by 15%.',
  },
  {
    name: 'Deliverables',
    token: 'success',
    desc: 'The tangible outputs the project will produce — what gets handed over at the end.',
    example: 'Functional iOS and Android app, user documentation, and release notes.',
  },
  {
    name: 'Milestones',
    token: 'feature',
    desc: 'Significant points or events in the schedule that mark progress.',
    example: 'Design sign-off by Week 4; beta release by Week 12.',
  },
  {
    name: 'Technical Requirements',
    token: 'warning',
    desc: 'Specific standards, technologies, or performance criteria the deliverable must meet.',
    example: 'Must load in under 2 seconds on a 4G connection.',
  },
  {
    name: 'Exclusions',
    token: 'danger',
    desc: 'Explicit statement of what is out of scope. Prevents scope creep by setting boundaries.',
    example: 'Web browser support and tablet layouts are not in scope for this release.',
  },
  {
    name: 'Constraints & Assumptions',
    token: 'info',
    desc: 'Limitations on resources, time, or budget, and assumptions made during planning.',
    example: 'Budget capped at £150k. Assumes the payment gateway API is stable.',
  },
];

const process = [
  { step: 'Gather requirements', desc: 'Interview stakeholders, run workshops, and analyse existing documentation.' },
  { step: 'Document scope statement', desc: 'Write a clear, approved description of what is in and out of scope.' },
  { step: 'Create the WBS', desc: 'Decompose the scope into smaller, manageable work packages.' },
  { step: 'Get sign-off', desc: 'Obtain formal approval from the sponsor and key stakeholders.' },
  { step: 'Manage changes', desc: 'Use a change control process to evaluate and approve any scope changes.' },
];

export default function DefiningProjectScopeConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Defining the Project Scope
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <DescriptionIcon sx={{ fontSize: 56, color: 'var(--info)' }} />
      </Box>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        Project scope defines the boundaries of the project — what work will be done, what
        deliverables will be produced, and what is explicitly excluded. A clear scope is the
        foundation for every other planning activity.
      </Typography>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)' }}>Scope Statement Components</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 2, mb: 4 }}>
        {components.map((c) => (
          <Paper key={c.name} elevation={3} sx={{ p: 2.5, borderRadius: 2, borderTop: `4px solid var(--${c.token})` }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: `var(--${c.token})`, mb: 0.8 }}>{c.name}</Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6, mb: 1.5 }}>{c.desc}</Typography>
            <Typography variant="caption" sx={{ color: 'var(--ink-soft)', fontStyle: 'italic' }}>{c.example}</Typography>
          </Paper>
        ))}
      </Box>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)' }}>Scope Definition Process</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, mb: 4 }}>
        {process.map((s, i) => (
          <Paper key={s.step} elevation={2} sx={{ p: 2, borderRadius: 2, display: 'flex', gap: 2 }}>
            <Box sx={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--info)', color: 'var(--paper-raised)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flex: '0 0 auto' }}>
              {i + 1}
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)' }}>{s.step}</Typography>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>{s.desc}</Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="warning" title="Scope creep is the #1 project killer">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          Scope creep — uncontrolled additions to the project — happens when scope is poorly defined
          or when changes are approved informally. A formal scope statement and a change control
          process are your best defences.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
