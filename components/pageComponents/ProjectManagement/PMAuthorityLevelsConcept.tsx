'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CalloutBox from '../../common/CalloutBox';

const levels = [
  {
    structure: 'Functional',
    token: 'warning',
    authorityLevel: 'Little or None',
    bar: 10,
    detail: [
      'Negotiates (but cannot demand) resources from functional managers',
      'May be called "project co-ordinator" or "project expeditor"',
      'Cannot approve project changes without department head sign-off',
      'Budget decisions rest with the functional manager',
    ],
  },
  {
    structure: 'Weak Matrix',
    token: 'warning',
    authorityLevel: 'Limited',
    bar: 25,
    detail: [
      'Some authority to prioritise tasks within the project',
      'Still relies on functional managers for resources',
      'Acts primarily as facilitator and communicator',
    ],
  },
  {
    structure: 'Balanced Matrix',
    token: 'info',
    authorityLevel: 'Moderate',
    bar: 50,
    detail: [
      'Shares authority equally with functional managers',
      'Controls the project schedule; functional manager controls staff assignments',
      'Regular negotiation with department heads required',
    ],
  },
  {
    structure: 'Strong Matrix',
    token: 'feature',
    authorityLevel: 'High',
    bar: 75,
    detail: [
      'Controls day-to-day work assignments and priorities',
      'Manages part of the budget directly',
      'Supported by a PM department; backed by executive authority',
    ],
  },
  {
    structure: 'Projectized',
    token: 'success',
    authorityLevel: 'Full',
    bar: 100,
    detail: [
      'Owns scope, schedule, budget, and team',
      'Hires and releases team members',
      'Approves all changes within delegated thresholds',
      'Reports directly to senior management or the sponsor',
    ],
  },
];

export default function PMAuthorityLevelsConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Project Manager Authority Levels
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <SupervisorAccountIcon sx={{ fontSize: 56, color: 'var(--feature)' }} />
      </Box>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        The amount of authority a project manager holds varies dramatically depending on how the
        organisation is structured. Understanding where you sit on this spectrum is critical before
        planning how you will manage resources and resolve conflicts.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        {levels.map((l) => (
          <Paper key={l.structure} elevation={2} sx={{ p: 2.5, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>{l.structure}</Typography>
              <Typography variant="caption" sx={{ fontWeight: 700, color: `var(--${l.token})`, px: 1.5, py: 0.5, borderRadius: 2, background: `var(--${l.token}-bg)` }}>
                {l.authorityLevel}
              </Typography>
            </Box>
            {/* Authority bar */}
            <Box sx={{ height: 8, borderRadius: 4, background: 'var(--line)', mb: 1.5, overflow: 'hidden' }}>
              <Box sx={{ height: '100%', width: `${l.bar}%`, background: `var(--${l.token})`, borderRadius: 4, transition: 'width 0.3s' }} />
            </Box>
            {l.detail.map((d) => (
              <Typography key={d} variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>• {d}</Typography>
            ))}
          </Paper>
        ))}
      </Box>

      <CalloutBox type="warning" title="Know your authority before you start">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          Assuming more authority than you actually have leads to resentment and conflict. Assuming
          less leads to slow decisions and missed deadlines. Clarify your authority level with the
          sponsor and key stakeholders at project kick-off.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
