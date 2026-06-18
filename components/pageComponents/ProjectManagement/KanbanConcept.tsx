'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';
import WavesIcon from '@mui/icons-material/Waves';
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import CalloutBox from '../../common/CalloutBox';

type Card = { title: string; token: string };

const columns: { name: string; wip?: number; cards: Card[] }[] = [
  {
    name: 'Backlog',
    cards: [
      { title: 'Export to CSV', token: 'info' },
      { title: 'Dark mode', token: 'feature' },
      { title: 'Email receipts', token: 'success' },
    ],
  },
  {
    name: 'To Do',
    cards: [
      { title: 'Reset password', token: 'warning' },
      { title: 'Search bar', token: 'info' },
    ],
  },
  {
    name: 'In Progress',
    wip: 2,
    cards: [
      { title: 'Login page', token: 'success' },
      { title: 'API rate limit', token: 'danger' },
    ],
  },
  {
    name: 'Review',
    wip: 1,
    cards: [{ title: 'Profile photo', token: 'feature' }],
  },
  {
    name: 'Done',
    cards: [
      { title: 'Sign-up form', token: 'success' },
      { title: 'Landing page', token: 'info' },
    ],
  },
];

const principles = [
  {
    name: 'Visualise the work',
    token: 'info',
    icon: <VisibilityIcon sx={{ fontSize: 28, color: 'var(--info)' }} />,
    desc: 'Every task is a card on a board, so the whole team can see the state of the work at a glance.',
  },
  {
    name: 'Limit work in progress',
    token: 'warning',
    icon: <VerticalAlignCenterIcon sx={{ fontSize: 28, color: 'var(--warning)' }} />,
    desc: 'Each column has a WIP cap. You cannot start new work until something finishes — this kills multitasking.',
  },
  {
    name: 'Manage flow',
    token: 'success',
    icon: <WavesIcon sx={{ fontSize: 28, color: 'var(--success)' }} />,
    desc: 'Watch how smoothly cards move left to right and fix the bottlenecks where they pile up.',
  },
  {
    name: 'Pull, don’t push',
    token: 'feature',
    icon: <SwipeLeftIcon sx={{ fontSize: 28, color: 'var(--feature)' }} />,
    desc: 'Work is pulled into a column only when there is capacity, instead of being dumped on people.',
  },
];

const comparison = [
  { aspect: 'Cadence', scrum: 'Fixed-length sprints', kanban: 'Continuous flow' },
  { aspect: 'Roles', scrum: 'Defined (PO, Scrum Master)', kanban: 'No required roles' },
  { aspect: 'Change', scrum: 'Wait for the next sprint', kanban: 'Add anytime there is capacity' },
  { aspect: 'Key metric', scrum: 'Velocity per sprint', kanban: 'Cycle time / throughput' },
];

export default function KanbanConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Kanban
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        <strong>Kanban</strong> is a way of managing work as a continuous flow. Instead of planning fixed
        sprints, the team pulls in new work only when they have capacity — keeping things moving steadily
        and exposing bottlenecks early.
      </Typography>

      {/* Board */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(5, 1fr)' },
          gap: 1.5,
          mb: 4,
        }}
      >
        {columns.map((col) => {
          const overWip = col.wip !== undefined && col.cards.length >= col.wip;
          return (
            <Paper key={col.name} elevation={2} sx={{ p: 1, borderRadius: 2, background: 'var(--paper-sunken)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, px: 0.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                  {col.name}
                </Typography>
                {col.wip !== undefined && (
                  <Box
                    sx={{
                      px: 0.8,
                      py: 0.2,
                      borderRadius: 1,
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: overWip ? 'var(--danger)' : 'var(--ink-soft)',
                      background: overWip ? 'var(--danger-bg)' : 'var(--paper-raised)',
                      border: '1px solid var(--line)',
                    }}
                  >
                    {col.cards.length}/{col.wip}
                  </Box>
                )}
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {col.cards.map((c) => (
                  <Box
                    key={c.title}
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      background: 'var(--paper-raised)',
                      borderLeft: `3px solid var(--${c.token})`,
                      fontSize: '0.78rem',
                      color: 'var(--ink)',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                    }}
                  >
                    {c.title}
                  </Box>
                ))}
              </Box>
            </Paper>
          );
        })}
      </Box>

      <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: 'var(--ink-soft)', mb: 4 }}>
        Notice the WIP limits on <strong>In Progress</strong> and <strong>Review</strong> — they are full,
        so nothing new can start until a card moves on.
      </Typography>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        The Four Core Principles
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2.5,
          mb: 4,
        }}
      >
        {principles.map((p) => (
          <Paper
            key={p.name}
            elevation={3}
            sx={{ p: 2.5, borderRadius: 2, borderTop: `4px solid var(--${p.token})`, display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: `var(--${p.token}-bg)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: '0 0 auto',
                }}
              >
                {p.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {p.name}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              {p.desc}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Kanban vs Scrum */}
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', background: 'var(--ink)', color: 'var(--paper)' }}>
          <Box sx={{ flex: '0 0 28%', p: 1.5, fontWeight: 700 }}>Aspect</Box>
          <Box sx={{ flex: 1, p: 1.5, fontWeight: 700 }}>Scrum</Box>
          <Box sx={{ flex: 1, p: 1.5, fontWeight: 700 }}>Kanban</Box>
        </Box>
        {comparison.map((row, i) => (
          <Box
            key={row.aspect}
            sx={{ display: 'flex', background: i % 2 === 0 ? 'var(--paper-raised)' : 'var(--paper-sunken)', borderTop: '1px solid var(--line)' }}
          >
            <Box sx={{ flex: '0 0 28%', p: 1.5, fontWeight: 600, color: 'var(--ink)' }}>{row.aspect}</Box>
            <Box sx={{ flex: 1, p: 1.5, color: 'var(--ink-soft)', fontSize: '0.9rem' }}>{row.scrum}</Box>
            <Box sx={{ flex: 1, p: 1.5, color: 'var(--ink-soft)', fontSize: '0.9rem' }}>{row.kanban}</Box>
          </Box>
        ))}
      </Paper>

      <CalloutBox type="info" title="When Kanban shines">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          Kanban suits teams with a steady stream of incoming work where priorities shift often — support,
          operations, or maintenance — and teams that want to improve flow without adopting the full
          ceremony of Scrum.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
