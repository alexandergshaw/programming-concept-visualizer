'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ScrumBoard from '../../common/ScrumBoard';
import sprintBacklog from './data/SprintBacklog.json';

const roles = [
  {
    icon: <RecordVoiceOverIcon sx={{ fontSize: 36 }} />,
    color: 'var(--warning)',
    title: 'Product Owner',
    detail: 'Owns the backlog and decides what matters most. Speaks for the customer and sets priorities.',
  },
  {
    icon: <PersonIcon sx={{ fontSize: 36 }} />,
    color: 'var(--feature)',
    title: 'Scrum Master',
    detail: 'Keeps the process running smoothly, removes blockers, and protects the team from distractions.',
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 36 }} />,
    color: 'var(--success)',
    title: 'Development Team',
    detail: 'The people who design, build, and test the product during each sprint.',
  },
];

export default function ScrumConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1100, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Scrum &amp; the Scrum Board
      </Typography>

      <Typography variant="body1" sx={{ mb: 5, color: 'var(--ink-soft)', textAlign: 'center' }}>
        Scrum is the most popular way to do Agile. Work is delivered in short cycles called{' '}
        <strong>sprints</strong> (usually 1–2 weeks), and the team shares clear roles.
      </Typography>

      {/* Roles */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'var(--ink)' }}>
        The Three Roles
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 5 }}>
        {roles.map((role) => (
          <Paper
            key={role.title}
            elevation={2}
            sx={{ flex: '1 1 260px', p: 2.5, borderRadius: 2, borderLeft: `4px solid ${role.color}` }}
          >
            <Box sx={{ color: role.color, mb: 1 }}>{role.icon}</Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)', mb: 0.5 }}>
              {role.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              {role.detail}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* User stories explainer */}
      <Paper sx={{ p: 3, mb: 4, background: 'var(--paper-sunken)', border: '1px solid var(--line)', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: 'var(--ink)' }}>
          Work is written as user stories
        </Typography>
        <Typography variant="body1" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          Instead of vague tasks, Scrum teams describe work from the user&apos;s point of view using a simple
          template:
        </Typography>
        <Box
          sx={{
            mt: 2,
            p: 2,
            background: 'var(--code-bg)',
            color: 'var(--code-fg)',
            borderRadius: 1,
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            lineHeight: 1.7,
          }}
        >
          As a <Box component="span" sx={{ color: 'var(--warning)' }}>[type of user]</Box>, I want{' '}
          <Box component="span" sx={{ color: 'var(--success)' }}>[some goal]</Box>, so that{' '}
          <Box component="span" sx={{ color: 'var(--info)' }}>[some benefit]</Box>.
        </Box>
      </Paper>

      {/* Live Scrum board */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: 'var(--ink)' }}>
        The Scrum Board
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, color: 'var(--ink-soft)' }}>
        The board makes the sprint visible. Every story sits in one of three columns and moves to the right as
        the team makes progress — so anyone can see the state of the work at a glance.
      </Typography>

      <Paper elevation={1} sx={{ borderRadius: 2, background: 'var(--paper-sunken)' }}>
        <ScrumBoard
          userStories={sprintBacklog.userStories}
          showColumnHeaders
          scrumBoardLabel="Sprint 4 — Account Features"
        />
      </Paper>
    </Box>
  );
}
