'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import CalloutBox from '../../common/CalloutBox';

const variants = [
  {
    name: 'Weak Matrix',
    token: 'warning',
    pmAuthority: 'Low',
    pmRole: 'Co-ordinator / facilitator',
    resourceControl: 'Functional manager',
    pmTime: 'Part-time',
    desc: 'Closest to a functional structure. The PM mainly co-ordinates but does not control resources.',
  },
  {
    name: 'Balanced Matrix',
    token: 'info',
    pmAuthority: 'Moderate',
    pmRole: 'Project manager',
    resourceControl: 'Shared',
    pmTime: 'Full-time',
    desc: 'Authority is shared equally between PM and functional manager. Common but prone to conflict.',
  },
  {
    name: 'Strong Matrix',
    token: 'success',
    pmAuthority: 'High',
    pmRole: 'Project manager (with PM dept)',
    resourceControl: 'Project manager',
    pmTime: 'Full-time',
    desc: 'Closest to projectized. PM has most authority; a dedicated PM department supports multiple projects.',
  },
];

export default function MatrixOrgConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Matrix Organisational Structure
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <GridViewIcon sx={{ fontSize: 56, color: 'var(--feature)' }} />
      </Box>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        A matrix structure combines functional and projectized models. Team members have
        <strong> two managers</strong>: their functional department head and the project manager.
        This creates flexibility but requires careful management of authority.
      </Typography>

      {/* Dual-reporting visual */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)' }}>Dual Reporting</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ display: 'flex', gap: 6, justifyContent: 'center', mb: 2 }}>
            <Paper elevation={3} sx={{ px: 3, py: 1.5, borderRadius: 2, background: 'var(--info)', minWidth: 140, textAlign: 'center' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--paper-raised)' }}>Functional Manager</Typography>
            </Paper>
            <Paper elevation={3} sx={{ px: 3, py: 1.5, borderRadius: 2, background: 'var(--feature)', minWidth: 140, textAlign: 'center' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--paper-raised)' }}>Project Manager</Typography>
            </Paper>
          </Box>
          <Paper elevation={2} sx={{ px: 3, py: 1.5, borderRadius: 2, mx: 'auto', display: 'inline-block', border: '2px solid var(--line-strong)' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)' }}>Team Member</Typography>
            <Typography variant="caption" sx={{ color: 'var(--ink-soft)', display: 'block' }}>reports to both</Typography>
          </Paper>
        </Box>
      </Box>

      {/* Variants */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)' }}>Three Variants</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2.5, mb: 4 }}>
        {variants.map((v) => (
          <Paper key={v.name} elevation={3} sx={{ p: 2.5, borderRadius: 2, borderTop: `4px solid var(--${v.token})` }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: `var(--${v.token})`, mb: 1 }}>{v.name}</Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6, mb: 1.5 }}>{v.desc}</Typography>
            {[
              { label: 'PM Authority', val: v.pmAuthority },
              { label: 'PM Role', val: v.pmRole },
              { label: 'Resource Control', val: v.resourceControl },
              { label: 'PM Time', val: v.pmTime },
            ].map((row) => (
              <Box key={row.label} sx={{ display: 'flex', gap: 1, mb: 0.4 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--ink)', minWidth: 110 }}>{row.label}:</Typography>
                <Typography variant="caption" sx={{ color: 'var(--ink-soft)' }}>{row.val}</Typography>
              </Box>
            ))}
          </Paper>
        ))}
      </Box>

      <CalloutBox type="warning" title="The tension of two bosses">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          Matrix structures can cause confusion when functional and project priorities clash.
          Clear role definitions, agreed escalation paths, and strong communication between
          managers are essential to prevent team members from being pulled in opposite directions.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
