'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import CalloutBox from '../../common/CalloutBox';

const steps = [
  { title: 'Environmental scan', desc: 'Analyse internal strengths and weaknesses (SWOT) and external opportunities and threats to understand the landscape.' },
  { title: 'Set strategic goals', desc: 'Define where the organisation wants to be in 3–5 years. These goals drive which projects are worth pursuing.' },
  { title: 'Identify opportunities', desc: 'Generate a list of potential projects — new products, process improvements, market expansions, compliance needs.' },
  { title: 'Screen and prioritise', desc: 'Apply selection criteria (financial, strategic fit, risk) to rank and filter opportunities into a shortlist.' },
  { title: 'Portfolio planning', desc: 'Allocate budget and resources across the approved projects to form the project portfolio.' },
  { title: 'Review and adapt', desc: 'Monitor results and revisit the portfolio regularly to stop, scale, or add projects as the environment changes.' },
];

export default function StrategicPlanningConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Strategic Planning and Project Selection
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <AltRouteIcon sx={{ fontSize: 56, color: 'var(--info)' }} />
      </Box>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        Organisations do not pursue every idea — resources are finite. Strategic planning provides a
        framework for choosing the <em>right</em> projects: those that advance long-term goals and
        offer the best return for the effort invested.
      </Typography>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)' }}>The Selection Process</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
        {steps.map((s, i) => (
          <Paper key={s.title} elevation={2} sx={{ p: 2, borderRadius: 2, display: 'flex', gap: 2 }}>
            <Box
              sx={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'var(--info)', color: 'var(--paper-raised)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, flex: '0 0 auto',
              }}
            >
              {i + 1}
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>{s.title}</Typography>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>{s.desc}</Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* SWOT mini-grid */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)' }}>SWOT at a Glance</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mb: 4, maxWidth: 600, mx: 'auto' }}>
        {[
          { label: 'Strengths', token: 'success', internal: true },
          { label: 'Weaknesses', token: 'danger', internal: true },
          { label: 'Opportunities', token: 'info', internal: false },
          { label: 'Threats', token: 'warning', internal: false },
        ].map((item) => (
          <Paper key={item.label} elevation={2} sx={{ p: 2, borderRadius: 2, borderTop: `3px solid var(--${item.token})`, textAlign: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: `var(--${item.token})` }}>{item.label}</Typography>
            <Typography variant="caption" sx={{ color: 'var(--ink-soft)' }}>{item.internal ? 'Internal' : 'External'}</Typography>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="info" title="Strategy drives the portfolio">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          Without strategic alignment, organisations end up running many disconnected projects that
          collectively do not move the business forward. Linking each project back to a strategic
          goal makes it easier to justify spending, measure success, and cut projects that no longer
          make sense.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
