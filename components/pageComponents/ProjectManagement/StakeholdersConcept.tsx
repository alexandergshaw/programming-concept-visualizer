'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import CampaignIcon from '@mui/icons-material/Campaign';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalloutBox from '../../common/CalloutBox';

// 2x2 grid, rendered top row then bottom row.
const quadrants = [
  {
    title: 'Manage Closely',
    token: 'danger',
    icon: <HandshakeIcon sx={{ fontSize: 26, color: 'var(--danger)' }} />,
    power: 'High',
    interest: 'High',
    desc: 'Your most important players. Involve them in decisions and keep them fully engaged.',
    example: 'e.g. project sponsor, key client',
  },
  {
    title: 'Keep Satisfied',
    token: 'warning',
    icon: <SentimentSatisfiedAltIcon sx={{ fontSize: 26, color: 'var(--warning)' }} />,
    power: 'High',
    interest: 'Low',
    desc: 'Powerful but not very interested. Meet their needs without overwhelming them with detail.',
    example: 'e.g. senior exec, regulator',
  },
  {
    title: 'Keep Informed',
    token: 'info',
    icon: <CampaignIcon sx={{ fontSize: 26, color: 'var(--info)' }} />,
    power: 'Low',
    interest: 'High',
    desc: 'Keen but with little authority. Keep them in the loop — they can be great advocates.',
    example: 'e.g. end users, support team',
  },
  {
    title: 'Monitor',
    token: 'success',
    icon: <VisibilityIcon sx={{ fontSize: 26, color: 'var(--success)' }} />,
    power: 'Low',
    interest: 'Low',
    desc: 'Minimal effort. Keep a light eye on them in case their position changes.',
    example: 'e.g. unrelated departments',
  },
];

const steps = [
  { name: 'Identify', desc: 'List everyone affected by or able to affect the project.' },
  { name: 'Analyse', desc: 'Plot each one by their power and their interest.' },
  { name: 'Plan', desc: 'Decide the right level of communication for each group.' },
  { name: 'Engage', desc: 'Communicate, listen, and update the map as things change.' },
];

export default function StakeholdersConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Stakeholder Management
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        A <strong>stakeholder</strong> is anyone with a stake in the project — they affect it, or it
        affects them. Managing them well means giving each person the right amount of attention, based on
        how much power and interest they have.
      </Typography>

      <Typography variant="h5" sx={{ mb: 1, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        The Power / Interest Grid
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: 'var(--ink-soft)', textAlign: 'center' }}>
        Plot each stakeholder by how much power they hold and how interested they are.
      </Typography>

      {/* Grid with axes */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex' }}>
          {/* Y axis */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontWeight: 700,
              color: 'var(--ink)',
              pr: 1,
            }}
          >
            Power →
          </Box>
          <Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 1.5,
                maxWidth: 680,
              }}
            >
              {quadrants.map((q) => (
                <Paper
                  key={q.title}
                  elevation={3}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    borderTop: `4px solid var(--${q.token})`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.8,
                    minHeight: 150,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: `var(--${q.token}-bg)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: '0 0 auto',
                      }}
                    >
                      {q.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2 }}>
                        {q.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: `var(--${q.token})`, fontWeight: 700 }}>
                        {q.power} power · {q.interest} interest
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                    {q.desc}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'var(--ink-soft)', fontStyle: 'italic', mt: 'auto' }}>
                    {q.example}
                  </Typography>
                </Paper>
              ))}
            </Box>
            {/* X axis */}
            <Typography variant="subtitle2" sx={{ textAlign: 'center', fontWeight: 700, color: 'var(--ink)', mt: 1 }}>
              Interest →
            </Typography>
          </Box>
        </Box>
      </Box>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        The Process
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(4, 1fr)' },
          gap: 2,
          mb: 1,
        }}
      >
        {steps.map((s, i) => (
          <Paper key={s.name} elevation={2} sx={{ p: 2, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'var(--feature)',
                  color: 'var(--paper-raised)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  flex: '0 0 auto',
                }}
              >
                {i + 1}
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {s.name}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.5 }}>
              {s.desc}
            </Typography>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="info" title="People change positions">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          A stakeholder&apos;s power and interest shift as the project moves on. Someone uninterested today
          may become critical at launch. Revisit the grid regularly so nobody important slips through the
          cracks.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
