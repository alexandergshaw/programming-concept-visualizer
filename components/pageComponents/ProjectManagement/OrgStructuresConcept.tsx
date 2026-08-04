'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CalloutBox from '../../common/CalloutBox';

const structures = [
  {
    title: 'Functional',
    token: 'info',
    desc: 'Work is grouped by department (finance, engineering, marketing). Projects sit inside one department; the functional manager controls the team.',
    pros: ['Specialists are easy to find', 'Clear career paths', 'Resources are shared'],
    cons: ['PM has little authority', 'Slow cross-department decisions', 'Team loyalty is to the department, not the project'],
  },
  {
    title: 'Projectized',
    token: 'success',
    desc: 'The project is the primary unit. Team members report directly to the PM and are dedicated full-time to the project.',
    pros: ['PM has full authority', 'Fast decisions', 'Strong team identity'],
    cons: ['Resources may be duplicated', 'Team members have no "home" when project ends', 'More expensive'],
  },
  {
    title: 'Matrix',
    token: 'feature',
    desc: 'A hybrid. Team members have two bosses — their functional manager and the project manager — and split their time accordingly.',
    pros: ['Flexible resource use', 'PM has real authority', 'Specialists can serve multiple projects'],
    cons: ['Dual reporting causes confusion', 'Power struggles between managers', 'Complex to co-ordinate'],
  },
];

export default function OrgStructuresConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Project Management Organisational Structures
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <AccountTreeIcon sx={{ fontSize: 56, color: 'var(--feature)' }} />
      </Box>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        How an organisation is structured determines how much authority a project manager has,
        how resources are allocated, and how quickly decisions get made.
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {structures.map((s) => (
          <Paper key={s.title} elevation={3} sx={{ p: 2.5, borderRadius: 2, borderTop: `4px solid var(--${s.token})` }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: `var(--${s.token})`, mb: 1 }}>{s.title}</Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6, mb: 2 }}>{s.desc}</Typography>

            <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--success)', display: 'block', mb: 0.5 }}>✔ Pros</Typography>
            {s.pros.map((p) => (
              <Typography key={p} variant="body2" sx={{ color: 'var(--ink-soft)', pl: 1, lineHeight: 1.7 }}>• {p}</Typography>
            ))}

            <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--danger)', display: 'block', mt: 1.5, mb: 0.5 }}>✖ Cons</Typography>
            {s.cons.map((c) => (
              <Typography key={c} variant="body2" sx={{ color: 'var(--ink-soft)', pl: 1, lineHeight: 1.7 }}>• {c}</Typography>
            ))}
          </Paper>
        ))}
      </Box>

      <CalloutBox type="info" title="No single best structure">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          Most large organisations use a mix — different divisions may favour different structures.
          The right choice depends on how often the company runs projects, how specialised the work
          is, and how much cross-functional co-operation is needed.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
