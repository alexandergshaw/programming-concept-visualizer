'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import CalloutBox from '../../common/CalloutBox';

const qualities = [
  { label: 'Specific', token: 'info', desc: 'Clearly state what must be achieved. Avoid vague language.', bad: 'Improve the website', good: 'Increase the conversion rate on the checkout page' },
  { label: 'Measurable', token: 'success', desc: 'Define how success will be assessed — with a metric, quantity, or observable outcome.', bad: 'Faster load times', good: 'Reduce page load time to under 2 seconds' },
  { label: 'Achievable', token: 'feature', desc: 'The objective must be realistic given the available resources, skills, and time.', bad: 'Build a full social network in two weeks', good: 'Build a user profile and follow feature in Q1' },
  { label: 'Relevant', token: 'warning', desc: 'Link the objective to the project\'s purpose and the organisation\'s strategic goals.', bad: 'Add a dark mode', good: 'Increase accessibility compliance to WCAG AA to meet regulatory requirements' },
  { label: 'Time-bound', token: 'danger', desc: 'Set a deadline or timeframe.', bad: 'Complete the API integration', good: 'Complete the payment API integration by 15 March' },
];

export default function SettingObjectivesConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Setting Project Objectives
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <TrackChangesIcon sx={{ fontSize: 56, color: 'var(--info)' }} />
      </Box>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        Project objectives define exactly what the project must achieve. Well-written objectives
        align the team, guide decision-making, and provide a clear test of whether the project
        has succeeded.
      </Typography>

      <Paper sx={{ p: 2, mb: 4, background: 'var(--feature-bg)', border: '1px solid var(--feature)', borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="body1" sx={{ color: 'var(--ink)', fontStyle: 'italic' }}>
          A good objective answers: <strong>What will be done? By when? How will we know it&apos;s done?</strong>
        </Typography>
      </Paper>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)' }}>The SMART Framework</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        {qualities.map((q) => (
          <Paper key={q.label} elevation={2} sx={{ p: 2.5, borderRadius: 2, borderLeft: `4px solid var(--${q.token})` }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: `var(--${q.token})`, mb: 0.5 }}>{q.label}</Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6, mb: 1.5 }}>{q.desc}</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
              <Paper sx={{ p: 1.5, borderRadius: 1, background: 'var(--danger-bg)', border: '1px solid var(--danger)' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--danger)' }}>✖ Weak</Typography>
                <Typography variant="body2" sx={{ color: 'var(--ink-soft)', fontStyle: 'italic' }}>{q.bad}</Typography>
              </Paper>
              <Paper sx={{ p: 1.5, borderRadius: 1, background: 'var(--success-bg)', border: '1px solid var(--success)' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--success)' }}>✔ Strong</Typography>
                <Typography variant="body2" sx={{ color: 'var(--ink-soft)', fontStyle: 'italic' }}>{q.good}</Typography>
              </Paper>
            </Box>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="info" title="Objectives vs deliverables">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          An objective is an outcome — the change or result you want to see in the world. A
          deliverable is an output — the tangible thing you produce. Both are essential; objectives
          tell you <em>why</em> the deliverable matters.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
