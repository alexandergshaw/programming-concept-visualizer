'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CalloutBox from '../../common/CalloutBox';

const principles = [
  {
    token: 'success',
    icon: <LockPersonIcon sx={{ fontSize: 30, color: 'var(--success)' }} />,
    title: 'Always Get Written Permission',
    desc: 'Before touching any system, obtain explicit written authorisation from its owner. Verbal agreements are not enough — the document protects both you and the client.',
  },
  {
    token: 'info',
    icon: <VisibilityIcon sx={{ fontSize: 30, color: 'var(--info)' }} />,
    title: 'Honour Confidentiality',
    desc: 'Findings, credentials, and sensitive data uncovered during a test must be handled with strict confidentiality. You are trusted with access; do not abuse it.',
  },
  {
    token: 'warning',
    icon: <GavelIcon sx={{ fontSize: 30, color: 'var(--warning)' }} />,
    title: 'Stay Within Scope',
    desc: 'Test only what the contract specifies. If you discover something outside scope, pause, document it, and seek explicit authorisation before going further.',
  },
  {
    token: 'danger',
    icon: <ReportGmailerrorredIcon sx={{ fontSize: 30, color: 'var(--danger)' }} />,
    title: 'Do No Harm',
    desc: 'Avoid any action that could damage live systems, corrupt data, or disrupt real users and services. If in doubt, ask before you act.',
  },
  {
    token: 'feature',
    icon: <VolunteerActivismIcon sx={{ fontSize: 30, color: 'var(--feature)' }} />,
    title: 'Disclose All Findings',
    desc: 'Every vulnerability found — even embarrassing or minor ones — must be reported. Selective disclosure undermines the entire purpose of the engagement.',
  },
];

const scenariosData = [
  {
    scenario: 'You find credentials for a system outside the agreed scope.',
    action: 'Stop immediately. Do not log in. Document what you found and notify the client to discuss how to handle it.',
    token: 'warning',
  },
  {
    scenario: 'You discover evidence of an ongoing breach by a third party.',
    action: 'Pause the test. Notify the client immediately so they can activate their incident-response process.',
    token: 'danger',
  },
  {
    scenario: 'A test action could disrupt a live production service.',
    action: 'Always ask first. Schedule disruptive tests during maintenance windows and confirm with the client.',
    token: 'info',
  },
  {
    scenario: 'A colleague asks you to share client data from a past engagement.',
    action: 'Refuse. Client data stays confidential regardless of who is asking or why.',
    token: 'success',
  },
];

export default function ProfessionalEthicsConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Ethical Hacking Professional Ethics
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        Technical skill without ethical discipline is dangerous. Professional ethics are what separate a
        trusted security consultant from a criminal — and they must be internalised, not just memorised.
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        Core Ethical Principles
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2.5,
          mb: 5,
        }}
      >
        {principles.map((p) => (
          <Paper
            key={p.title}
            elevation={2}
            sx={{
              p: 2.5,
              borderRadius: 2,
              borderLeft: `4px solid var(--${p.token})`,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {p.icon}
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {p.title}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
              {p.desc}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        Ethical Dilemmas & Right Actions
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        {scenariosData.map((s) => (
          <Paper
            key={s.scenario}
            elevation={1}
            sx={{
              p: 2.5,
              borderRadius: 2,
              borderLeft: `4px solid var(--${s.token})`,
              background: 'var(--paper-raised)',
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)', mb: 0.5 }}>
              Scenario: {s.scenario}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--ink)' }}>Correct action: </strong>{s.action}
            </Typography>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="info" title="Ethics as a professional standard">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          Certifications like CEH (Certified Ethical Hacker) and OSCP require candidates to sign a code
          of conduct. Professional ethics are enforced both by legal obligations and by the reputation that
          every security professional builds — and must protect — throughout their career.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
