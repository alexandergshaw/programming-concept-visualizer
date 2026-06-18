'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BuildIcon from '@mui/icons-material/Build';
import InsightsIcon from '@mui/icons-material/Insights';
import FlagIcon from '@mui/icons-material/Flag';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const phases = [
  {
    icon: <LightbulbIcon sx={{ fontSize: 40 }} />,
    color: 'var(--warning)',
    title: 'Initiation',
    summary: 'Define the goal',
    detail: 'Decide what the project is, why it matters, and whether it is worth doing. The output is a clear objective and the people who will own it.',
  },
  {
    icon: <EventNoteIcon sx={{ fontSize: 40 }} />,
    color: 'var(--info)',
    title: 'Planning',
    summary: 'Map out the work',
    detail: 'Break the goal into tasks, estimate effort, set a schedule and budget, and identify risks. This is the blueprint the team follows.',
  },
  {
    icon: <BuildIcon sx={{ fontSize: 40 }} />,
    color: 'var(--success)',
    title: 'Execution',
    summary: 'Build it',
    detail: 'The team does the actual work — writing code, designing screens, and producing the deliverables described in the plan.',
  },
  {
    icon: <InsightsIcon sx={{ fontSize: 40 }} />,
    color: 'var(--feature)',
    title: 'Monitoring',
    summary: 'Track & adjust',
    detail: 'Happens alongside execution. Progress is measured against the plan, and the team adjusts when things slip, change, or break.',
  },
  {
    icon: <FlagIcon sx={{ fontSize: 40 }} />,
    color: 'var(--danger)',
    title: 'Closure',
    summary: 'Wrap up',
    detail: 'Deliver the finished product, hand it over, review what went well and what didn’t, and formally close the project.',
  },
];

export default function ProjectLifecycleConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        The Project Lifecycle
      </Typography>

      <Typography variant="body1" sx={{ mb: 5, color: 'var(--ink-soft)', textAlign: 'center' }}>
        Almost every project moves through the same five phases, from a first idea to a finished product.
      </Typography>

      {/* Phase flow */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        {phases.map((phase, i) => (
          <React.Fragment key={phase.title}>
            <Paper
              elevation={3}
              sx={{
                width: 180,
                p: 2.5,
                borderRadius: 2,
                borderTop: `4px solid ${phase.color}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box sx={{ color: phase.color, mb: 1 }}>{phase.icon}</Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {phase.title}
              </Typography>
              <Typography variant="caption" sx={{ color: phase.color, fontWeight: 700, mb: 1.5 }}>
                {phase.summary}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)', fontSize: '0.8rem', lineHeight: 1.5 }}>
                {phase.detail}
              </Typography>
            </Paper>
            {i < phases.length - 1 && (
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'var(--line-strong)' }}>
                <ArrowForwardIcon sx={{ fontSize: 28 }} />
              </Box>
            )}
          </React.Fragment>
        ))}
      </Box>

      {/* Key takeaway */}
      <Paper
        sx={{
          mt: 5,
          p: 3,
          background: 'var(--success-bg)',
          border: '1px solid var(--success)',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: 'var(--ink)' }}>
          The phases aren&apos;t always a straight line
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'var(--ink-soft)' }}>
          In a traditional project the phases run once, in order. In modern software teams they often
          <strong> repeat in short cycles</strong> — a small slice is planned, built, monitored, and reviewed,
          then the team loops back and does it again. That looping idea is the heart of the{' '}
          <strong>Agile</strong> approach you&apos;ll see next.
        </Typography>
      </Paper>
    </Box>
  );
}
