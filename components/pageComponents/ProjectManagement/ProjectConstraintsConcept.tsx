'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import CalloutBox from '../../common/CalloutBox';

const constraints = [
  {
    name: 'Scope',
    token: 'info',
    emoji: '📋',
    desc: 'What the project will and will not deliver. Defines the boundaries of the work.',
    example: 'The app will support iOS and Android but not web browsers.',
  },
  {
    name: 'Schedule',
    token: 'warning',
    emoji: '🗓️',
    desc: 'The time available to complete the project. Determines the deadline and milestones.',
    example: 'The product must launch before the annual conference in June.',
  },
  {
    name: 'Cost',
    token: 'success',
    emoji: '💰',
    desc: 'The budget approved for the project. Limits resources and staffing.',
    example: 'Total spend must not exceed £200,000.',
  },
  {
    name: 'Quality',
    token: 'feature',
    emoji: '✅',
    desc: 'The standards the deliverable must meet. Affects how much testing and rework is needed.',
    example: 'All critical bugs must be resolved before release.',
  },
  {
    name: 'Resources',
    token: 'danger',
    emoji: '👥',
    desc: 'People, equipment, and materials available. Limits what can be done in parallel.',
    example: 'Only two senior developers are available for this project.',
  },
  {
    name: 'Risk',
    token: 'warning',
    emoji: '⚠️',
    desc: 'Uncertainty that could help or harm the project. Must be identified and managed.',
    example: 'A key vendor might not deliver hardware on time.',
  },
];

export default function ProjectConstraintsConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Core Project Constraints
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <TuneIcon sx={{ fontSize: 56, color: 'var(--feature)' }} />
      </Box>

      <Typography variant="body1" sx={{ mb: 2, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        Every project is bound by a set of constraints. The classic three — scope, schedule, and cost —
        are often called the <strong>triple constraint</strong> or <em>iron triangle</em>. Modern
        frameworks extend this to include quality, resources, and risk.
      </Typography>

      <Paper sx={{ mb: 4, p: 2, background: 'var(--info-bg)', border: '1px solid var(--info)', borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="body1" sx={{ color: 'var(--ink)', fontStyle: 'italic' }}>
          "Fast, cheap, or good — pick two." — the iron triangle in plain English
        </Typography>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 2, mb: 4 }}>
        {constraints.map((c) => (
          <Paper key={c.name} elevation={3} sx={{ p: 2.5, borderRadius: 2, borderTop: `4px solid var(--${c.token})` }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)', mb: 0.5 }}>
              {c.emoji} {c.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6, mb: 1.5 }}>{c.desc}</Typography>
            <Typography variant="caption" sx={{ color: `var(--${c.token})`, fontStyle: 'italic' }}>
              {c.example}
            </Typography>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="warning" title="Constraints are interdependent">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          Changing one constraint almost always affects the others. Cutting the budget may force you
          to reduce scope. Compressing the schedule may increase cost. Recognising these trade-offs
          is central to making good decisions when things change.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
