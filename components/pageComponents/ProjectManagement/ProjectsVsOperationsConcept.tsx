'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import LoopIcon from '@mui/icons-material/Loop';
import CalloutBox from '../../common/CalloutBox';

const rows = [
  { aspect: 'Duration', project: 'Temporary — has a defined start and end', operation: 'Ongoing — runs indefinitely' },
  { aspect: 'Goal', project: 'Produce a unique output (product, service, result)', operation: 'Sustain or repeat a standard output' },
  { aspect: 'Resources', project: 'Assembled for the project, then released', operation: 'Permanent, dedicated team' },
  { aspect: 'Change', project: 'Drives change — creates something new', operation: 'Resists change — maintains the status quo' },
  { aspect: 'Success measure', project: 'On time, on budget, meets spec', operation: 'Efficiency, quality, cost per unit' },
];

export default function ProjectsVsOperationsConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Projects vs Ongoing Operations
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        Before you can manage a project you need to know what separates a project from the routine
        day-to-day work that keeps an organisation running.
      </Typography>

      {/* Icon cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3, borderTop: '4px solid var(--info)', borderRadius: 2, textAlign: 'center' }}>
          <RocketLaunchIcon sx={{ fontSize: 48, color: 'var(--info)', mb: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)', mb: 1 }}>Project</Typography>
          <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
            A <strong>temporary</strong> endeavour undertaken to create a unique product, service, or result.
            It has a clear beginning and end, and it changes once it is delivered.
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mt: 1.5, color: 'var(--info)', fontStyle: 'italic' }}>
            e.g. Building a new e-commerce website
          </Typography>
        </Paper>

        <Paper elevation={3} sx={{ p: 3, borderTop: '4px solid var(--success)', borderRadius: 2, textAlign: 'center' }}>
          <LoopIcon sx={{ fontSize: 48, color: 'var(--success)', mb: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)', mb: 1 }}>Ongoing Operation</Typography>
          <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
            A <strong>continuous</strong> set of repetitive activities that sustain an organisation.
            There is no defined end — the goal is stability and efficiency.
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mt: 1.5, color: 'var(--success)', fontStyle: 'italic' }}>
            e.g. Processing customer orders every day
          </Typography>
        </Paper>
      </Box>

      {/* Comparison table */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)' }}>
        Side-by-side comparison
      </Typography>
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden', mb: 4 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1.4fr 2fr 2fr', background: 'var(--feature)', p: 1.5 }}>
          {['Aspect', 'Project', 'Ongoing Operation'].map((h) => (
            <Typography key={h} variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--paper-raised)' }}>{h}</Typography>
          ))}
        </Box>
        {rows.map((row, i) => (
          <Box
            key={row.aspect}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 2fr 2fr',
              p: 1.5,
              background: i % 2 === 0 ? 'var(--paper)' : 'var(--paper-raised)',
              borderTop: '1px solid var(--line)',
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700, color: 'var(--ink)' }}>{row.aspect}</Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>{row.project}</Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>{row.operation}</Typography>
          </Box>
        ))}
      </Paper>

      <CalloutBox type="info" title="Why the distinction matters">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          Projects and operations often compete for the same resources — people, budget, and tools.
          Knowing the difference helps an organisation prioritise correctly and ensures project teams
          are not drawn into routine work before the project is complete.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
