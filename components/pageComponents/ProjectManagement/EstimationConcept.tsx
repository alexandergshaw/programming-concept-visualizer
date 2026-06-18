'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import StraightenIcon from '@mui/icons-material/Straighten';
import PsychologyIcon from '@mui/icons-material/Psychology';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CalloutBox from '../../common/CalloutBox';

const scale = [
  { points: 1, label: 'Trivial', token: 'success' },
  { points: 2, label: 'Easy', token: 'success' },
  { points: 3, label: 'Small', token: 'info' },
  { points: 5, label: 'Medium', token: 'info' },
  { points: 8, label: 'Large', token: 'warning' },
  { points: 13, label: 'Very large', token: 'warning' },
  { points: 21, label: 'Split it up!', token: 'danger' },
];

const factors = [
  {
    name: 'Effort',
    token: 'info',
    icon: <StraightenIcon sx={{ fontSize: 26, color: 'var(--info)' }} />,
    desc: 'How much work is there? A big form takes longer than a single button.',
  },
  {
    name: 'Complexity',
    token: 'feature',
    icon: <PsychologyIcon sx={{ fontSize: 26, color: 'var(--feature)' }} />,
    desc: 'How hard is it to get right? Tricky logic costs more than repetitive work.',
  },
  {
    name: 'Uncertainty',
    token: 'warning',
    icon: <HelpOutlineIcon sx={{ fontSize: 26, color: 'var(--warning)' }} />,
    desc: 'How much is unknown? New tech or vague requirements push the estimate up.',
  },
];

const velocityHistory = [
  { sprint: 'Sprint 1', points: 18 },
  { sprint: 'Sprint 2', points: 22 },
  { sprint: 'Sprint 3', points: 20 },
];

const avgVelocity = Math.round(
  velocityHistory.reduce((sum, s) => sum + s.points, 0) / velocityHistory.length,
);
const maxPoints = Math.max(...velocityHistory.map((s) => s.points));

export default function EstimationConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Estimation &amp; Planning
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        Teams are bad at guessing exact hours but good at comparing sizes. Agile estimation embraces that:
        instead of &quot;this will take 6 hours&quot;, we say &quot;this is about twice as big as that&quot;
        using <strong>story points</strong>.
      </Typography>

      {/* What goes into a point */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: 2,
          mb: 4,
        }}
      >
        {factors.map((f) => (
          <Paper
            key={f.name}
            elevation={2}
            sx={{ p: 2.5, borderRadius: 2, borderTop: `4px solid var(--${f.token})`, display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {f.icon}
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {f.name}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              {f.desc}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Typography variant="h5" sx={{ mb: 1, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        The Fibonacci Scale
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        The gaps grow on purpose. The bigger something is, the less precisely we can size it — so the
        numbers spread out to stop false precision.
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center', mb: 4 }}>
        {scale.map((s) => (
          <Box
            key={s.points}
            sx={{
              width: 96,
              p: 1.5,
              borderRadius: 2,
              textAlign: 'center',
              background: `var(--${s.token}-bg)`,
              border: `1px solid var(--${s.token})`,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800, color: `var(--${s.token})`, lineHeight: 1 }}>
              {s.points}
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--ink-soft)', fontWeight: 600 }}>
              {s.label}
            </Typography>
          </Box>
        ))}
      </Box>

      <Typography variant="h5" sx={{ mb: 1, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Velocity: Forecasting from History
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        <strong>Velocity</strong> is how many points a team actually completes per sprint. Average the last
        few sprints and you have a realistic forecast for the next one.
      </Typography>

      <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 180, justifyContent: 'center', mb: 2 }}>
          {velocityHistory.map((s) => (
            <Box key={s.sprint} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--info)' }}>
                {s.points}
              </Typography>
              <Box
                sx={{
                  width: { xs: 48, sm: 64 },
                  height: `${(s.points / maxPoints) * 130}px`,
                  background: 'var(--info)',
                  borderRadius: '6px 6px 0 0',
                }}
              />
              <Typography variant="caption" sx={{ color: 'var(--ink-soft)' }}>
                {s.sprint}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            background: 'var(--success-bg)',
            border: '1px solid var(--success)',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>
            Average velocity ={' '}
            <Box component="span" sx={{ fontWeight: 800, color: 'var(--success)' }}>
              ~{avgVelocity} points / sprint
            </Box>{' '}
            — so plan to pull in about {avgVelocity} points of work next sprint, not more.
          </Typography>
        </Box>
      </Paper>

      <CalloutBox type="warning" title="Estimates are not promises">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          Story points are a planning aid, not a contract. Don&apos;t compare velocity between teams (a
          team&apos;s points are relative to itself), and never use them to pressure people — that just
          teaches everyone to inflate their estimates.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
