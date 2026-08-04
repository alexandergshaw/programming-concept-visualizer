'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CalloutBox from '../../common/CalloutBox';

const models = [
  {
    name: 'Weighted Scoring Model',
    token: 'info',
    desc: 'Assign weights to criteria (strategic fit, cost, risk, etc.) and score each project against them. Multiply score × weight and sum for a total.',
    example: 'Strategic fit (40%) + ROI (35%) + Risk (25%) → Project A scores 82, Project B scores 68 → select Project A.',
    best: 'Comparing multiple projects against consistent criteria',
  },
  {
    name: 'Checklist Model',
    token: 'success',
    desc: 'A list of yes/no requirements. A project must pass all mandatory criteria before it can proceed.',
    example: 'Must comply with GDPR ✓, must be fundable within £500k ✓, must be deliverable in 12 months ✗ → rejected.',
    best: 'Quick initial filtering to eliminate non-starters',
  },
  {
    name: 'Analytic Hierarchy Process (AHP)',
    token: 'feature',
    desc: 'A structured technique that breaks the decision into a hierarchy of criteria, then uses pairwise comparisons to derive weights.',
    example: 'Comparing "cost vs schedule" and "schedule vs quality" in pairs to arrive at a rigorous weighting.',
    best: 'Complex decisions where criteria weightings are debated',
  },
  {
    name: 'Q-Sort',
    token: 'warning',
    desc: 'Stakeholders sort project cards into categories (high, medium, low priority) then discuss disagreements to reach consensus.',
    example: 'Ten stakeholders sort 15 project proposals independently; facilitator aggregates results and negotiates outliers.',
    best: 'Group consensus-building when opinions vary widely',
  },
];

export default function ScreeningModelsConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Project Screening Models
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <FilterAltIcon sx={{ fontSize: 56, color: 'var(--info)' }} />
      </Box>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        Screening models give decision-makers a structured way to evaluate and rank project proposals
        before committing resources. They range from simple checklists to weighted mathematical models.
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
        {models.map((m) => (
          <Paper key={m.name} elevation={3} sx={{ p: 2.5, borderRadius: 2, borderTop: `4px solid var(--${m.token})` }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: `var(--${m.token})`, mb: 1 }}>{m.name}</Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6, mb: 1.5 }}>{m.desc}</Typography>
            <Paper sx={{ p: 1.5, background: 'var(--paper)', borderRadius: 1, mb: 1.5 }}>
              <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'var(--ink-soft)' }}>Example: {m.example}</Typography>
            </Paper>
            <Typography variant="caption" sx={{ color: `var(--${m.token})`, fontWeight: 700 }}>
              Best for: {m.best}
            </Typography>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="info" title="Combine models for best results">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          In practice, organisations often use a checklist first (to eliminate clearly unsuitable
          projects), then a weighted scoring model to rank the remaining candidates. No single model
          is perfect — each reflects the biases of those who built it.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
