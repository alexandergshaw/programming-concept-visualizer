'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CalloutBox from '../../common/CalloutBox';

const traits = [
  {
    token: 'info',
    icon: <PsychologyIcon sx={{ fontSize: 30, color: 'var(--info)' }} />,
    title: 'Curiosity',
    desc: 'Security professionals constantly ask "how does this really work?" and "what happens if I do this instead?" Curiosity drives discovery of the edge cases that become vulnerabilities.',
  },
  {
    token: 'warning',
    icon: <TrackChangesIcon sx={{ fontSize: 30, color: 'var(--warning)' }} />,
    title: 'Attacker Mindset',
    desc: 'Thinking like an adversary: considering every input, bypass, and misuse scenario rather than assuming users will behave as expected.',
  },
  {
    token: 'success',
    icon: <SchoolIcon sx={{ fontSize: 30, color: 'var(--success)' }} />,
    title: 'Continuous Learning',
    desc: 'The threat landscape evolves daily. Security professionals dedicate time to studying new CVEs, attack techniques, and defensive tools throughout their careers.',
  },
  {
    token: 'feature',
    icon: <GroupsIcon sx={{ fontSize: 30, color: 'var(--feature)' }} />,
    title: 'Responsibility & Ethics',
    desc: 'Access to powerful techniques comes with the obligation to use them only with permission, handle findings confidentially, and prioritise the wellbeing of those affected.',
  },
  {
    token: 'danger',
    icon: <AutorenewIcon sx={{ fontSize: 30, color: 'var(--danger)' }} />,
    title: 'Resilience & Patience',
    desc: 'Most tests involve hours of unsuccessful attempts before a finding. Professionals document failures systematically and persist methodically rather than guessing.',
  },
];

const offensiveVsDefensive = [
  {
    role: 'Red Team (Offensive)',
    token: 'danger',
    focus: 'Simulating real attacks to test how far an attacker could get',
    thinks: '"How would I get in, move around, and achieve my goal without being caught?"',
  },
  {
    role: 'Blue Team (Defensive)',
    token: 'info',
    focus: 'Detecting, preventing, and responding to attacks',
    thinks: '"What indicators of compromise should I look for, and how quickly can I respond?"',
  },
  {
    role: 'Purple Team (Collaborative)',
    token: 'feature',
    focus: 'Red and blue working together to close gaps in real time',
    thinks: '"How does what the red team found translate into detection rules for the blue team?"',
  },
];

export default function SecurityMindsetConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Mindset of Security Professionals
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        Cybersecurity is as much about how you think as what you know. The most effective security
        professionals combine deep technical knowledge with a distinctive mental approach to problem-solving.
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        Core Traits
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2.5,
          mb: 5,
        }}
      >
        {traits.map((t) => (
          <Paper
            key={t.title}
            elevation={2}
            sx={{
              p: 2.5,
              borderRadius: 2,
              borderLeft: `4px solid var(--${t.token})`,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {t.icon}
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {t.title}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
              {t.desc}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        Red, Blue & Purple Teams
      </Typography>

      <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap', justifyContent: 'center', mb: 4 }}>
        {offensiveVsDefensive.map((team) => (
          <Paper
            key={team.role}
            elevation={2}
            sx={{
              flex: '1 1 280px',
              maxWidth: 320,
              p: 2.5,
              borderRadius: 2,
              borderTop: `4px solid var(--${team.token})`,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: `var(--${team.token})`, mb: 1 }}>
              {team.role}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6, mb: 1 }}>
              <strong style={{ color: 'var(--ink)' }}>Focus: </strong>{team.focus}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', fontStyle: 'italic', lineHeight: 1.6 }}>
              {team.thinks}
            </Typography>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="success" title="Building the mindset">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          The security mindset is developed through practice: capture-the-flag competitions, home labs,
          reading post-mortems of real breaches, and deliberately studying how things break. Over time,
          spotting the &ldquo;unsafe path&rdquo; becomes instinctive.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
