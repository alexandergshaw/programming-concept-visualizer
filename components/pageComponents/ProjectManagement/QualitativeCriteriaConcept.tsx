'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import CalloutBox from '../../common/CalloutBox';

const criteria = [
  {
    name: 'Strategic Fit',
    token: 'feature',
    desc: 'Does the project directly advance one or more of the organisation\'s stated strategic priorities?',
    questions: ['Which strategic goal does this support?', 'How strongly does it move the needle?'],
  },
  {
    name: 'Urgency',
    token: 'danger',
    desc: 'Is there a compelling reason to start now? Regulatory deadlines, competitive threats, or customer demand create urgency.',
    questions: ['What happens if we delay six months?', 'Is there a hard deadline?'],
  },
  {
    name: 'Stakeholder Support',
    token: 'success',
    desc: 'How much political and organisational support exists for the project? Projects with strong executive backing are more likely to succeed.',
    questions: ['Does the sponsor have real authority?', 'Are key departments on board?'],
  },
  {
    name: 'Risk and Feasibility',
    token: 'warning',
    desc: 'Is the project technically and organisationally achievable? High-risk projects need extra justification.',
    questions: ['Do we have the skills?', 'Have we done something similar before?'],
  },
  {
    name: 'Resource Availability',
    token: 'info',
    desc: 'Do we have (or can we obtain) the people, tools, and budget needed?',
    questions: ['Are key staff available or over-committed?', 'Can we fund this within the current budget cycle?'],
  },
  {
    name: 'Social and Environmental Impact',
    token: 'success',
    desc: 'How does the project affect communities, the environment, or the organisation\'s reputation?',
    questions: ['Are there sustainability implications?', 'Could this damage public trust?'],
  },
];

export default function QualitativeCriteriaConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Qualitative Project Selection Criteria
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <StarOutlineIcon sx={{ fontSize: 56, color: 'var(--feature)' }} />
      </Box>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        Not everything that matters can be put in a spreadsheet. Qualitative criteria capture the
        strategic, human, and contextual factors that financial models cannot easily measure.
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 2.5, mb: 4 }}>
        {criteria.map((c) => (
          <Paper key={c.name} elevation={3} sx={{ p: 2.5, borderRadius: 2, borderTop: `4px solid var(--${c.token})` }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: `var(--${c.token})`, mb: 1 }}>{c.name}</Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6, mb: 1.5 }}>{c.desc}</Typography>
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--ink)', display: 'block', mb: 0.5 }}>Ask:</Typography>
            {c.questions.map((q) => (
              <Typography key={q} variant="caption" sx={{ color: 'var(--ink-soft)', display: 'block', lineHeight: 1.7 }}>• {q}</Typography>
            ))}
          </Paper>
        ))}
      </Box>

      <CalloutBox type="info" title="Qualitative vs Quantitative">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          Qualitative criteria complement financial models. A project can have a strong NPV but fail
          because it lacks stakeholder support or clashes with brand values. The best selection
          processes weigh both dimensions and document the reasoning behind the final decision.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
