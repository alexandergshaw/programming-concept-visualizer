'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import RadarIcon from '@mui/icons-material/Radar';
import LoginIcon from '@mui/icons-material/Login';
import RepeatIcon from '@mui/icons-material/Repeat';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import DescriptionIcon from '@mui/icons-material/Description';
import CalloutBox from '../../common/CalloutBox';

const phases = [
  {
    label: 'Reconnaissance',
    token: 'info',
    icon: <TravelExploreIcon sx={{ fontSize: 28, color: 'var(--info)' }} />,
    goal: 'Gather information about the target',
    detail:
      'Quietly collect anything useful — domain names, email addresses, employee names, technologies in use. No system is touched directly yet.',
  },
  {
    label: 'Scanning',
    token: 'info',
    icon: <RadarIcon sx={{ fontSize: 28, color: 'var(--info)' }} />,
    goal: 'Map the attack surface',
    detail:
      'Probe the target with tools to find live hosts, open ports, running services, and known weaknesses to aim at.',
  },
  {
    label: 'Gaining Access',
    token: 'warning',
    icon: <LoginIcon sx={{ fontSize: 28, color: 'var(--warning)' }} />,
    goal: 'Exploit a weakness to get in',
    detail:
      'Use a discovered vulnerability — a weak password, an unpatched bug, a phishing email — to break into the system.',
  },
  {
    label: 'Maintaining Access',
    token: 'warning',
    icon: <RepeatIcon sx={{ fontSize: 28, color: 'var(--warning)' }} />,
    goal: 'Keep a foothold',
    detail:
      'Establish a way back in (such as a backdoor) so the access survives reboots and continues over time. Shows how deep an attacker could dig in.',
  },
  {
    label: 'Covering Tracks',
    token: 'danger',
    icon: <CleaningServicesIcon sx={{ fontSize: 28, color: 'var(--danger)' }} />,
    goal: 'Hide the evidence',
    detail:
      'A malicious attacker deletes logs and hides files to avoid detection. An ethical hacker studies this stage to learn what defenders should watch for.',
  },
  {
    label: 'Reporting',
    token: 'success',
    icon: <DescriptionIcon sx={{ fontSize: 28, color: 'var(--success)' }} />,
    goal: 'Document and fix',
    detail:
      'The step that makes hacking ethical: every weakness found is written up and handed to the owner, along with advice on how to fix it.',
  },
];

export default function HackingPhasesConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        The Phases of a Hack
      </Typography>

      <Typography variant="body1" sx={{ mb: 5, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        Real attacks are not random — they follow a repeatable process. An ethical hacker walks through the
        same phases, but with permission and a final report. Understanding the order helps defenders spot an
        attack early.
      </Typography>

      <Box sx={{ position: 'relative' }}>
        {phases.map((phase, i) => (
          <Box key={phase.label} sx={{ display: 'flex', gap: 2, alignItems: 'stretch' }}>
            {/* Timeline rail */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 0 auto' }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: `var(--${phase.token}-bg)`,
                  border: `2px solid var(--${phase.token})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {phase.icon}
              </Box>
              {i < phases.length - 1 && (
                <Box sx={{ flex: 1, width: 3, background: 'var(--line-strong)', my: 0.5, minHeight: 24 }} />
              )}
            </Box>

            {/* Card */}
            <Paper
              elevation={2}
              sx={{
                flex: 1,
                mb: 2,
                p: 2.5,
                borderRadius: 2,
                borderLeft: `4px solid var(--${phase.token})`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                  {i + 1}. {phase.label}
                </Typography>
                <Typography variant="caption" sx={{ color: `var(--${phase.token})`, fontWeight: 700 }}>
                  {phase.goal}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                {phase.detail}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>

      <CalloutBox type="success" title="The ethical difference">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          A black-hat attacker stops at &quot;covering tracks&quot; to stay hidden. An ethical hacker replaces
          that mindset with <strong>reporting</strong> — every phase exists to produce a clear picture of the
          weaknesses so the company can close them.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
