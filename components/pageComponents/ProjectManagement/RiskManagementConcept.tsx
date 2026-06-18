'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalloutBox from '../../common/CalloutBox';

const likelihood = ['High', 'Medium', 'Low']; // top → bottom (rows)
const impact = ['Low', 'Medium', 'High']; // left → right (columns)

// Severity token from a likelihood row index (0=High) and impact col index (0=Low).
function severityToken(rowIdx: number, colIdx: number): string {
  const score = (3 - rowIdx) * (colIdx + 1); // 1..9
  if (score >= 6) return 'danger';
  if (score >= 3) return 'warning';
  return 'success';
}

const strategies = [
  {
    name: 'Avoid',
    token: 'info',
    icon: <BlockIcon sx={{ fontSize: 28, color: 'var(--info)' }} />,
    desc: 'Change the plan so the risk cannot happen at all — e.g. drop a risky feature or technology.',
  },
  {
    name: 'Mitigate',
    token: 'success',
    icon: <TrendingDownIcon sx={{ fontSize: 28, color: 'var(--success)' }} />,
    desc: 'Take action to reduce how likely the risk is, or how much it would hurt if it occurred.',
  },
  {
    name: 'Transfer',
    token: 'feature',
    icon: <SwapHorizIcon sx={{ fontSize: 28, color: 'var(--feature)' }} />,
    desc: 'Hand the risk to someone better placed to carry it — insurance, a vendor, or a contract.',
  },
  {
    name: 'Accept',
    token: 'warning',
    icon: <CheckCircleIcon sx={{ fontSize: 28, color: 'var(--warning)' }} />,
    desc: 'Decide the risk is small enough to live with, and simply keep an eye on it.',
  },
];

const register = [
  { risk: 'Key developer leaves', l: 'Medium', i: 'High', token: 'danger', response: 'Mitigate — document & pair' },
  { risk: 'Third-party API changes', l: 'Low', i: 'Medium', token: 'warning', response: 'Transfer — version pinning' },
  { risk: 'Scope creep', l: 'High', i: 'Medium', token: 'danger', response: 'Mitigate — change control' },
  { risk: 'Minor UI bug at launch', l: 'Low', i: 'Low', token: 'success', response: 'Accept — fix in patch' },
];

export default function RiskManagementConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Risk Management
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        A <strong>risk</strong> is anything uncertain that could affect the project. Risk management means
        spotting those things early, judging how serious each one is, and deciding what to do about it
        before it becomes a problem.
      </Typography>

      <Typography variant="h5" sx={{ mb: 1, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Scoring Risk: Likelihood × Impact
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: 'var(--ink-soft)', textAlign: 'center' }}>
        Each risk is rated on how likely it is and how bad it would be. Multiply the two to see how much
        attention it deserves.
      </Typography>

      {/* Risk matrix */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Box>
          <Box sx={{ display: 'flex' }}>
            {/* Y axis label */}
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
              Likelihood
            </Box>
            <Box>
              {likelihood.map((row, rowIdx) => (
                <Box key={row} sx={{ display: 'flex', alignItems: 'stretch' }}>
                  <Box
                    sx={{
                      width: 70,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      pr: 1,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--ink-soft)',
                    }}
                  >
                    {row}
                  </Box>
                  {impact.map((col, colIdx) => {
                    const token = severityToken(rowIdx, colIdx);
                    return (
                      <Box
                        key={col}
                        sx={{
                          width: { xs: 72, sm: 96 },
                          height: { xs: 56, sm: 64 },
                          m: 0.4,
                          borderRadius: 1,
                          background: `var(--${token}-bg)`,
                          border: `1px solid var(--${token})`,
                          color: `var(--${token})`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          textAlign: 'center',
                        }}
                      >
                        {token === 'danger' ? 'High' : token === 'warning' ? 'Medium' : 'Low'}
                      </Box>
                    );
                  })}
                </Box>
              ))}
              {/* X axis labels */}
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: 70 }} />
                {impact.map((col) => (
                  <Box
                    key={col}
                    sx={{
                      width: { xs: 72, sm: 96 },
                      m: 0.4,
                      textAlign: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--ink-soft)',
                    }}
                  >
                    {col}
                  </Box>
                ))}
              </Box>
              <Typography variant="subtitle2" sx={{ textAlign: 'center', fontWeight: 700, color: 'var(--ink)', mt: 0.5, ml: '70px' }}>
                Impact
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Four Ways to Respond
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
          gap: 2,
          mb: 4,
        }}
      >
        {strategies.map((s) => (
          <Paper
            key={s.name}
            elevation={3}
            sx={{ p: 2.5, borderRadius: 2, borderTop: `4px solid var(--${s.token})`, display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {s.icon}
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {s.name}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              {s.desc}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        A Simple Risk Register
      </Typography>

      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', background: 'var(--ink)', color: 'var(--paper)' }}>
          <Box sx={{ flex: 1, p: 1.5, fontWeight: 700 }}>Risk</Box>
          <Box sx={{ flex: '0 0 18%', p: 1.5, fontWeight: 700 }}>Likelihood</Box>
          <Box sx={{ flex: '0 0 14%', p: 1.5, fontWeight: 700 }}>Impact</Box>
          <Box sx={{ flex: '0 0 30%', p: 1.5, fontWeight: 700 }}>Response</Box>
        </Box>
        {register.map((row, i) => (
          <Box
            key={row.risk}
            sx={{ display: 'flex', alignItems: 'center', background: i % 2 === 0 ? 'var(--paper-raised)' : 'var(--paper-sunken)', borderTop: '1px solid var(--line)' }}
          >
            <Box sx={{ flex: 1, p: 1.5, fontWeight: 600, color: 'var(--ink)', fontSize: '0.9rem' }}>{row.risk}</Box>
            <Box sx={{ flex: '0 0 18%', p: 1.5, color: 'var(--ink-soft)', fontSize: '0.9rem' }}>{row.l}</Box>
            <Box sx={{ flex: '0 0 14%', p: 1.5 }}>
              <Box
                component="span"
                sx={{
                  px: 1,
                  py: 0.3,
                  borderRadius: 1,
                  background: `var(--${row.token}-bg)`,
                  color: `var(--${row.token})`,
                  fontWeight: 700,
                  fontSize: '0.75rem',
                }}
              >
                {row.i}
              </Box>
            </Box>
            <Box sx={{ flex: '0 0 30%', p: 1.5, color: 'var(--ink-soft)', fontSize: '0.85rem' }}>{row.response}</Box>
          </Box>
        ))}
      </Paper>

      <CalloutBox type="info" title="Review risks regularly">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          A risk register is not a one-off document. Revisit it throughout the project — new risks appear,
          old ones fade, and the scores change as you learn more. The aim is no surprises.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
