'use client';

import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import GavelIcon from '@mui/icons-material/Gavel';
import CalloutBox from '../../common/CalloutBox';

const hats = [
  {
    label: 'White Hat',
    token: 'success',
    icon: <VerifiedUserIcon sx={{ fontSize: 32, color: 'var(--success)' }} />,
    summary: 'The ethical hacker',
    detail:
      'Has written permission to test a system. Finds weaknesses and reports them so they can be fixed. This is the role this course trains you for.',
    legal: 'Legal',
  },
  {
    label: 'Grey Hat',
    token: 'warning',
    icon: <HelpOutlineIcon sx={{ fontSize: 32, color: 'var(--warning)' }} />,
    summary: 'Somewhere in between',
    detail:
      'Pokes at systems without permission but usually without malicious intent — perhaps reporting the bug afterwards. Still illegal, because consent was never given.',
    legal: 'Illegal',
  },
  {
    label: 'Black Hat',
    token: 'danger',
    icon: <ReportProblemIcon sx={{ fontSize: 32, color: 'var(--danger)' }} />,
    summary: 'The malicious attacker',
    detail:
      'Breaks into systems to steal data, extort money, or cause damage. Acts without consent and for personal gain. This is the adversary you are defending against.',
    legal: 'Illegal',
  },
];

const rules = [
  { title: 'Get permission first', body: 'Never test a system without explicit, written authorization from its owner.' },
  { title: 'Stay in scope', body: 'Only touch the systems, networks, and accounts you were asked to test — nothing more.' },
  { title: 'Do no harm', body: 'Avoid actions that could damage data, crash services, or disrupt real users.' },
  { title: 'Protect what you find', body: 'Keep any sensitive data you uncover confidential and handle it responsibly.' },
  { title: 'Report everything', body: 'Document every weakness and disclose it to the owner so it can be fixed.' },
];

export default function EthicalHackingConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        What is Ethical Hacking?
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        Ethical hacking means breaking into a system <strong>with permission</strong> in order to find its
        weaknesses before a malicious attacker does. You think like an attacker, but you work to
        <strong> strengthen the defense</strong> instead of exploiting it.
      </Typography>

      {/* The three hats */}
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 1 }}>
        The Three &quot;Hats&quot;
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: 'var(--ink-soft)', textAlign: 'center' }}>
        Hackers are grouped by their intent and whether they have permission.
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
        {hats.map((hat) => (
          <Paper
            key={hat.label}
            elevation={3}
            sx={{
              flex: '1 1 280px',
              maxWidth: 320,
              p: 3,
              borderRadius: 2,
              borderTop: `4px solid var(--${hat.token})`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              {hat.icon}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)', lineHeight: 1.1 }}>
                  {hat.label}
                </Typography>
                <Typography variant="caption" sx={{ color: 'var(--ink-soft)' }}>
                  {hat.summary}
                </Typography>
              </Box>
            </Box>
            <Chip
              label={hat.legal}
              size="small"
              sx={{
                mb: 1.5,
                fontWeight: 700,
                background: `var(--${hat.token}-bg)`,
                color: `var(--${hat.token})`,
                border: `1px solid var(--${hat.token})`,
              }}
            />
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
              {hat.detail}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Rules of engagement */}
      <Box sx={{ mt: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
          <GavelIcon sx={{ color: 'var(--info)' }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
            The Rules of Engagement
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mb: 3, color: 'var(--ink-soft)', textAlign: 'center' }}>
          What separates an ethical hacker from a criminal is not the skill — it is following these rules.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {rules.map((rule, i) => (
            <Paper
              key={rule.title}
              elevation={1}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                p: 2,
                borderRadius: 2,
                background: 'var(--paper-raised)',
                borderLeft: '4px solid var(--info)',
              }}
            >
              <Box
                sx={{
                  flex: '0 0 auto',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'var(--info)',
                  color: 'var(--paper)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                  {rule.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>
                  {rule.body}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      <CalloutBox type="info" title="Why companies hire ethical hackers">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          Every system has weaknesses. A company would much rather pay a trusted professional to find and
          fix those weaknesses than have a criminal discover them first. By thinking like an attacker, the
          ethical hacker turns offensive knowledge into a stronger defense.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
