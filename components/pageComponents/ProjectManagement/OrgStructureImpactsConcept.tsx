'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CalloutBox from '../../common/CalloutBox';

const impacts = [
  {
    dimension: 'PM Authority',
    functional: 'Little or none — requests resources from dept heads',
    matrix: 'Shared with functional managers',
    projectized: 'Full — owns budget and team',
    token: 'feature',
  },
  {
    dimension: 'Resource Availability',
    functional: 'Part-time; shared with BAU work',
    matrix: 'Part-time to full-time depending on matrix type',
    projectized: 'Full-time; dedicated to the project',
    token: 'info',
  },
  {
    dimension: 'Budget Control',
    functional: 'Functional manager holds the budget',
    matrix: 'Split between functional and PM',
    projectized: 'PM controls the entire budget',
    token: 'success',
  },
  {
    dimension: 'Communication',
    functional: 'Vertical within departments; horizontal is slow',
    matrix: 'Dual channels; risk of crossed messages',
    projectized: 'Direct within the project team; fast',
    token: 'warning',
  },
  {
    dimension: 'Team Loyalty',
    functional: 'To the department and functional manager',
    matrix: 'Divided between department and project',
    projectized: 'To the project and PM',
    token: 'danger',
  },
];

export default function OrgStructureImpactsConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1100, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Impacts of Organisational Structures
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <CompareArrowsIcon sx={{ fontSize: 56, color: 'var(--feature)' }} />
      </Box>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        The structure an organisation chooses has a direct and significant impact on how projects
        are managed, how much authority the PM holds, and how effectively teams can deliver.
      </Typography>

      {/* Comparison table */}
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden', mb: 4 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1.4fr 1.6fr 1.6fr 1.6fr', background: 'var(--feature)', p: 1.5 }}>
          {['Dimension', 'Functional', 'Matrix', 'Projectized'].map((h) => (
            <Typography key={h} variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--paper-raised)' }}>{h}</Typography>
          ))}
        </Box>
        {impacts.map((row, i) => (
          <Box
            key={row.dimension}
            sx={{
              display: 'grid', gridTemplateColumns: '1.4fr 1.6fr 1.6fr 1.6fr',
              p: 1.5, background: i % 2 === 0 ? 'var(--paper)' : 'var(--paper-raised)',
              borderTop: '1px solid var(--line)',
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700, color: `var(--${row.token})` }}>{row.dimension}</Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', pr: 1 }}>{row.functional}</Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', pr: 1 }}>{row.matrix}</Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>{row.projectized}</Typography>
          </Box>
        ))}
      </Paper>

      <CalloutBox type="info" title="Structure shapes culture">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          Beyond the practical impacts, the structure signals what the organisation values. A strong
          projectized structure says "delivery is our top priority." A functional structure says
          "deep expertise is what we are about." Choosing wisely means understanding your
          organisation&apos;s real priorities, not just its org chart.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
