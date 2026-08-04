'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CalloutBox from '../../common/CalloutBox';

const pros = [
  'PM has full authority over the team and budget',
  'Team has a single focus — the project',
  'Fast decision-making with no departmental politics',
  'Strong project identity and team cohesion',
];
const cons = [
  'Specialists are duplicated across projects — expensive',
  'Team members have no "home" department when the project ends',
  'Skills can atrophy if people are isolated from their discipline',
  'Resource conflicts between concurrent projects',
];

export default function ProjectizedOrgConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Projectized Organisational Structure
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <RocketLaunchIcon sx={{ fontSize: 56, color: 'var(--success)' }} />
      </Box>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        In a projectized structure the <strong>project is the primary organisational unit</strong>.
        Team members report directly to the project manager and are dedicated full-time to the
        project until it closes.
      </Typography>

      {/* Visual */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)' }}>Structure</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4, gap: 1 }}>
        <Paper elevation={3} sx={{ px: 4, py: 1.5, borderRadius: 2, background: 'var(--success)', mb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--paper-raised)' }}>Project Manager</Typography>
        </Paper>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Developer', 'Designer', 'Analyst', 'Tester', 'BA'].map((role) => (
            <Paper key={role} elevation={2} sx={{ px: 2.5, py: 1.5, borderRadius: 2, borderTop: '3px solid var(--success)', textAlign: 'center' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)' }}>{role}</Typography>
              <Typography variant="caption" sx={{ color: 'var(--ink-soft)' }}>dedicated</Typography>
            </Paper>
          ))}
        </Box>
        <Box sx={{ mt: 1.5, px: 2, py: 1, borderRadius: 1, background: 'var(--success-bg)', border: '1px dashed var(--success)', textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: 'var(--success)', fontWeight: 700 }}>
            ✔ PM has full authority — scope, schedule, budget, and team
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

      <CalloutBox type="info" title="Best for large, complex projects">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          Projectized structures shine in industries like construction, aerospace, and defence — where
          each project is a major, multi-year undertaking. Consulting and engineering firms that build
          their whole business around client projects also favour this model.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
