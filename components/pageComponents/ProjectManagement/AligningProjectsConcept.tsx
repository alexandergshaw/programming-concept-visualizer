'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import AlignHorizontalCenterIcon from '@mui/icons-material/AlignHorizontalCenter';
import CalloutBox from '../../common/CalloutBox';

const alignmentChecks = [
  { question: 'Does the project support a strategic goal?', hint: 'Map the project outcome directly to a named goal in the strategic plan.' },
  { question: 'Is the priority consistent with other portfolio projects?', hint: 'A high-priority project should receive proportionally more resources.' },
  { question: 'Are the success metrics linked to business outcomes?', hint: 'Project KPIs should roll up into organisational KPIs.' },
  { question: 'Does the project have executive sponsorship?', hint: 'A sponsor who champions the project indicates senior strategic buy-in.' },
  { question: 'Will the project be re-evaluated if strategy changes?', hint: 'Alignment is ongoing — a mid-year strategy pivot may require project changes.' },
];

const misalignmentRisks = [
  'Budget approval becomes harder — no clear business case',
  'Teams lose motivation without a visible link to bigger goals',
  'Project is cut when funding is reviewed',
  'Deliverables are technically complete but add no business value',
];

export default function AligningProjectsConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Aligning Projects with Organisational Goals
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <AlignHorizontalCenterIcon sx={{ fontSize: 56, color: 'var(--success)' }} />
      </Box>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        A project is only valuable if it moves the organisation in the right direction. Aligning
        projects with strategy ensures effort and money go to work that actually matters.
      </Typography>

      {/* Alignment checks */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)' }}>
        Alignment Checklist
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
        {alignmentChecks.map((item, i) => (
          <Paper key={i} elevation={2} sx={{ p: 2, borderRadius: 2, borderLeft: '4px solid var(--success)', display: 'flex', gap: 2 }}>
            <Box
              sx={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'var(--success-bg)', border: '2px solid var(--success)',
                color: 'var(--success)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem',
                flex: '0 0 auto', mt: 0.2,
              }}
            >
              ✓
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)' }}>{item.question}</Typography>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>{item.hint}</Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Risks of misalignment */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)' }}>
        Risks of Poor Alignment
      </Typography>
      <Paper elevation={2} sx={{ p: 2.5, borderRadius: 2, mb: 4, background: 'var(--danger-bg)', border: '1px solid var(--danger)' }}>
        {misalignmentRisks.map((r) => (
          <Typography key={r} variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>✖ {r}</Typography>
        ))}
      </Paper>

      <CalloutBox type="info" title="Re-align regularly">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          Organisational strategy can shift during a project — new competitors emerge, markets change,
          or priorities are reset. Periodic alignment reviews (often at phase gates) ensure the
          project is still worth continuing.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
