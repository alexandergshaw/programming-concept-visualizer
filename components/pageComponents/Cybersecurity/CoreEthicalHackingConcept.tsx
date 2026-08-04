'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import BugReportIcon from '@mui/icons-material/BugReport';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DescriptionIcon from '@mui/icons-material/Description';
import CalloutBox from '../../common/CalloutBox';

const coreAreas = [
  {
    token: 'info',
    icon: <FindInPageIcon sx={{ fontSize: 30, color: 'var(--info)' }} />,
    title: 'Reconnaissance',
    desc: 'Gathering information about the target before any active testing begins. The more you know, the more targeted your approach can be.',
  },
  {
    token: 'warning',
    icon: <BugReportIcon sx={{ fontSize: 30, color: 'var(--warning)' }} />,
    title: 'Vulnerability Discovery',
    desc: 'Systematically identifying weaknesses in software, configurations, and human processes that an attacker could exploit.',
  },
  {
    token: 'danger',
    icon: <SecurityIcon sx={{ fontSize: 30, color: 'var(--danger)' }} />,
    title: 'Exploitation (Controlled)',
    desc: 'Demonstrating that a discovered vulnerability is genuinely exploitable — done in a safe environment with written permission.',
  },
  {
    token: 'success',
    icon: <VerifiedUserIcon sx={{ fontSize: 30, color: 'var(--success)' }} />,
    title: 'Remediation & Reporting',
    desc: 'Documenting findings, their severity, and recommended fixes so the organisation can close the gaps before attackers find them.',
  },
  {
    token: 'feature',
    icon: <DescriptionIcon sx={{ fontSize: 30, color: 'var(--feature)' }} />,
    title: 'Scope & Rules of Engagement',
    desc: 'A clear written agreement defining exactly what can be tested, when, and how — the document that makes the work legal and ethical.',
  },
];

const whyItMatters = [
  'Organisations cannot fix what they do not know is broken.',
  'A controlled test is always safer and cheaper than a real breach.',
  'Ethical hackers provide an outsider\'s perspective that internal teams often miss.',
  'Regular testing keeps defences up to date as the threat landscape evolves.',
];

export default function CoreEthicalHackingConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Core Concepts of Ethical Hacking
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        Ethical hacking is a <strong>structured discipline</strong>. It is not random poking at systems — it
        follows a repeatable process, operates within a legal agreement, and exists solely to improve the
        security of the organisation being tested.
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        Five Pillars of Ethical Hacking
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2.5,
          mb: 5,
        }}
      >
        {coreAreas.map((area) => (
          <Paper
            key={area.title}
            elevation={2}
            sx={{
              p: 2.5,
              borderRadius: 2,
              borderLeft: `4px solid var(--${area.token})`,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {area.icon}
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {area.title}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
              {area.desc}
            </Typography>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="info" title="Why ethical hacking matters">
        <Box component="ul" sx={{ m: 0, pl: 3, color: 'var(--ink-soft)' }}>
          {whyItMatters.map((item) => (
            <Box component="li" key={item} sx={{ mb: 0.5, lineHeight: 1.7 }}>
              {item}
            </Box>
          ))}
        </Box>
      </CalloutBox>
    </Box>
  );
}
