'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CalloutBox from '../../common/CalloutBox';

const responsibilities = [
  { area: 'Scope', desc: 'Define what is (and is not) included in the project, and manage any changes to that boundary.' },
  { area: 'Schedule', desc: 'Build and maintain the project timeline, identify the critical path, and recover when tasks slip.' },
  { area: 'Cost', desc: 'Estimate the budget, track spending, and forecast the final cost at completion.' },
  { area: 'Quality', desc: 'Set quality standards, plan inspections, and ensure deliverables meet requirements.' },
  { area: 'Risk', desc: 'Identify threats and opportunities, analyse them, and put mitigation plans in place.' },
  { area: 'Communication', desc: 'Keep all stakeholders informed with the right information at the right time.' },
  { area: 'People', desc: 'Assemble the team, resolve conflicts, motivate individuals, and co-ordinate across departments.' },
];

const skills = [
  { label: 'Leadership', token: 'info' },
  { label: 'Communication', token: 'success' },
  { label: 'Negotiation', token: 'warning' },
  { label: 'Problem-solving', token: 'feature' },
  { label: 'Technical literacy', token: 'danger' },
  { label: 'Organisation', token: 'info' },
];

export default function ProjectManagerRoleConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        The Project Manager Role
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <ManageAccountsIcon sx={{ fontSize: 64, color: 'var(--feature)' }} />
      </Box>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        The project manager (PM) is the person accountable for delivering the project. They do not
        necessarily do all the technical work — instead they plan, co-ordinate, and steer so that the
        right things happen at the right time.
      </Typography>

      {/* Responsibilities */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)' }}>
        Core Responsibilities
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 4 }}>
        {responsibilities.map((r, i) => (
          <Paper key={r.area} elevation={2} sx={{ p: 2, borderRadius: 2, borderLeft: '4px solid var(--feature)', display: 'flex', gap: 1.5 }}>
            <Box
              sx={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'var(--feature)', color: 'var(--paper-raised)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.8rem', flex: '0 0 auto', mt: 0.2,
              }}
            >
              {i + 1}
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)' }}>{r.area}</Typography>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>{r.desc}</Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Skills */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)' }}>
        Key Skills
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 4 }}>
        {skills.map((s) => (
          <Paper
            key={s.label}
            elevation={2}
            sx={{
              px: 2.5, py: 1.2, borderRadius: 4,
              background: `var(--${s.token}-bg)`,
              border: `1px solid var(--${s.token})`,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700, color: `var(--${s.token})` }}>{s.label}</Typography>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="info" title="Manager vs Leader">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          A project manager manages tasks, budgets, and timelines. But they also lead people —
          motivating the team, building trust, and navigating conflict. The best PMs balance both
          dimensions rather than focusing solely on the plan.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
