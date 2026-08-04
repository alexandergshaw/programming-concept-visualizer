'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import CalloutBox from '../../common/CalloutBox';

const departments = ['Finance', 'Engineering', 'Marketing', 'HR', 'IT'];

const pros = [
  'Deep specialist expertise — people grow skills within a discipline',
  'Clear career ladder and professional development paths',
  'Easy resource sharing within the department',
  'Stable, predictable teams with low turnover',
];
const cons = [
  'Project manager has little to no formal authority',
  'Team loyalty is to the department head, not the project',
  'Cross-department communication is slow and bureaucratic',
  'Projects involving multiple departments face constant resource conflicts',
];

export default function FunctionalOrgConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Functional Organisational Structure
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <BusinessIcon sx={{ fontSize: 56, color: 'var(--info)' }} />
      </Box>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        The most traditional structure. The company is divided into departments based on business
        function. Projects live <em>inside</em> one department, and the department head controls
        the budget and resources.
      </Typography>

      {/* Org chart visual */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)' }}>Structure</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4, gap: 1 }}>
        <Paper elevation={3} sx={{ px: 4, py: 1.5, borderRadius: 2, background: 'var(--feature)', mb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--paper-raised)' }}>CEO / Director</Typography>
        </Paper>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          {departments.map((dept) => (
            <Box key={dept} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.8 }}>
              <Paper elevation={2} sx={{ px: 2.5, py: 1.5, borderRadius: 2, borderTop: '3px solid var(--info)', minWidth: 100, textAlign: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)' }}>{dept}</Typography>
                <Typography variant="caption" sx={{ color: 'var(--ink-soft)' }}>Manager</Typography>
              </Paper>
              <Paper elevation={1} sx={{ px: 2, py: 1, borderRadius: 2, background: 'var(--paper)', textAlign: 'center' }}>
                <Typography variant="caption" sx={{ color: 'var(--ink-soft)' }}>Team members</Typography>
              </Paper>
            </Box>
          ))}
        </Box>
        <Box sx={{ mt: 1.5, px: 2, py: 1, borderRadius: 1, background: 'var(--warning-bg)', border: '1px dashed var(--warning)', textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: 'var(--warning)', fontWeight: 700 }}>
            ⚠ PM has only coordinator role — no direct authority
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, mb: 4 }}>
        <Paper elevation={2} sx={{ p: 2.5, borderRadius: 2, background: 'var(--success-bg)', border: '1px solid var(--success)' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--success)', mb: 1 }}>✔ Advantages</Typography>
          {pros.map((p) => <Typography key={p} variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>• {p}</Typography>)}
        </Paper>
        <Paper elevation={2} sx={{ p: 2.5, borderRadius: 2, background: 'var(--danger-bg)', border: '1px solid var(--danger)' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--danger)', mb: 1 }}>✖ Disadvantages</Typography>
          {cons.map((c) => <Typography key={c} variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>• {c}</Typography>)}
        </Paper>
      </Box>

      <CalloutBox type="info" title="When does functional work well?">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          Functional structures suit organisations where most work stays within a single department —
          such as an IT department running its own infrastructure upgrades. It breaks down when
          projects require sustained collaboration across several departments.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
