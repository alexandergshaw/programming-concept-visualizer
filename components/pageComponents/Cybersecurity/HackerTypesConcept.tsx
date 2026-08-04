'use client';

import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import BuildIcon from '@mui/icons-material/Build';
import PolicyIcon from '@mui/icons-material/Policy';
import CalloutBox from '../../common/CalloutBox';

const hackerTypes = [
  {
    label: 'White Hat',
    token: 'success',
    icon: <VerifiedUserIcon sx={{ fontSize: 32, color: 'var(--success)' }} />,
    legal: 'Legal & Authorized',
    description: 'Ethical hackers hired to find and report vulnerabilities. They operate with explicit written permission and share everything they find so it can be fixed.',
    examples: 'Penetration testers, bug-bounty hunters, security consultants',
  },
  {
    label: 'Black Hat',
    token: 'danger',
    icon: <ReportProblemIcon sx={{ fontSize: 32, color: 'var(--danger)' }} />,
    legal: 'Illegal',
    description: 'Malicious attackers who break into systems without permission for financial gain, sabotage, espionage, or notoriety.',
    examples: 'Ransomware operators, state-sponsored attackers, data thieves',
  },
  {
    label: 'Grey Hat',
    token: 'warning',
    icon: <HelpOutlineIcon sx={{ fontSize: 32, color: 'var(--warning)' }} />,
    legal: 'Typically Illegal',
    description: 'Probe systems without consent, often claiming good intentions. Even if they report what they find, acting without permission is still unauthorised access.',
    examples: 'Researchers who disclose flaws before informing the vendor',
  },
  {
    label: 'Script Kiddie',
    token: 'warning',
    icon: <BuildIcon sx={{ fontSize: 32, color: 'var(--warning)' }} />,
    legal: 'Typically Illegal',
    description: 'Low-skill attackers who run existing exploit tools or scripts without understanding how they work. Unpredictable because they do not understand the consequences of their actions.',
    examples: 'Automated DDoS tool users, defacement attackers',
  },
  {
    label: 'Hacktivist',
    token: 'feature',
    icon: <PolicyIcon sx={{ fontSize: 32, color: 'var(--feature)' }} />,
    legal: 'Illegal',
    description: 'Motivated by political or social causes. They may leak data or disrupt services to make a statement — without regard for collateral damage.',
    examples: 'Anonymous operations, politically motivated defacements',
  },
];

export default function HackerTypesConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Types of Security Hackers
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        The word &ldquo;hacker&rdquo; covers a wide range of people. What separates them is not their
        technical skill — it is their <strong>intent</strong> and whether they have <strong>permission</strong>.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {hackerTypes.map((h) => (
          <Paper
            key={h.label}
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
              borderLeft: `4px solid var(--${h.token})`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '0 0 auto' }}>{h.icon}</Box>
              <Box sx={{ flex: 1, minWidth: 220 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5, flexWrap: 'wrap' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                    {h.label}
                  </Typography>
                  <Chip
                    label={h.legal}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      background: `var(--${h.token}-bg)`,
                      color: `var(--${h.token})`,
                      border: `1px solid var(--${h.token})`,
                    }}
                  />
                </Box>
                <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7, mb: 1 }}>
                  {h.description}
                </Typography>
                <Typography variant="caption" sx={{ color: 'var(--ink-soft)' }}>
                  <strong style={{ color: 'var(--ink)' }}>Examples: </strong>
                  {h.examples}
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="info" title="The key distinction">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          Authorization is everything. Identical technical actions — scanning a network, testing a login
          page, probing a server — are either professional security work or criminal activity depending
          solely on whether the owner gave written permission.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
