'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import InfoIcon from '@mui/icons-material/Info';
import CalloutBox from '../../common/CalloutBox';

const methods = [
  {
    token: 'warning',
    icon: <PhoneIcon sx={{ fontSize: 28, color: 'var(--warning)' }} />,
    title: 'Pretexting (Phone / Vishing)',
    desc: 'The attacker calls claiming to be someone authoritative — IT support, a vendor, or a manager — and asks for information directly. A convincing story can extract usernames, system names, and network details.',
    infoGathered: 'Usernames, internal system names, org structure, credentials',
  },
  {
    token: 'danger',
    icon: <EmailIcon sx={{ fontSize: 28, color: 'var(--danger)' }} />,
    title: 'Phishing Campaigns',
    desc: 'Targeted emails (spear-phishing) crafted to look legitimate. Responses, link clicks, and form submissions reveal which employees are susceptible and what credentials they use.',
    infoGathered: 'Email validity, credentials, internal URL formats, installed software',
  },
  {
    token: 'feature',
    icon: <BusinessCenterIcon sx={{ fontSize: 28, color: 'var(--feature)' }} />,
    title: 'Impersonation (Physical)',
    desc: 'Posing as a contractor, delivery driver, or inspector to gain physical access or start conversations that reveal building layouts, staff names, and security procedures.',
    infoGathered: 'Physical security gaps, staff names, badge formats, server room locations',
  },
  {
    token: 'info',
    icon: <GroupsIcon sx={{ fontSize: 28, color: 'var(--info)' }} />,
    title: 'Elicitation',
    desc: 'Casual conversation or targeted questions that lead someone to volunteer information without realising its value. Common at industry conferences and networking events.',
    infoGathered: 'Technology in use, project timelines, security posture, upcoming changes',
  },
  {
    token: 'success',
    icon: <InfoIcon sx={{ fontSize: 28, color: 'var(--success)' }} />,
    title: 'Open-Source Social Profiling',
    desc: 'Analysing employees\' social media, conference talks, and forum posts to build a profile useful for targeted attacks and crafting convincing pretexts.',
    infoGathered: 'Technical expertise, tools used, colleagues, travel patterns, interests',
  },
];

const defences = [
  { label: 'Security awareness training', desc: 'Teach staff how to verify caller identity and what information should never be shared.' },
  { label: 'Call-back verification', desc: 'Always call back on a known-good number before acting on any unexpected request.' },
  { label: 'Clear information-handling policies', desc: 'Define what is public vs confidential and train staff to recognise classification.' },
  { label: 'Simulated phishing drills', desc: 'Regular internal tests measure susceptibility and identify staff who need more training.' },
  { label: 'Physical access controls', desc: 'Badge-in requirements, visitor log, and escort policies prevent impersonation.' },
];

export default function SocialEngineeringReconConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Social Engineering Information Collection
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        Technical defences can be bypassed by targeting the human element. Social engineering
        uses <strong>deception and manipulation</strong> to extract information directly from people —
        often the fastest route to sensitive data.
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        Social Engineering Methods for Recon
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 5 }}>
        {methods.map((m) => (
          <Paper
            key={m.title}
            elevation={2}
            sx={{ p: 3, borderRadius: 2, borderLeft: `4px solid var(--${m.token})` }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '0 0 auto', pt: 0.5 }}>{m.icon}</Box>
              <Box sx={{ flex: 1, minWidth: 220 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)', mb: 0.5 }}>
                  {m.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7, mb: 1 }}>
                  {m.desc}
                </Typography>
                <Typography variant="caption" sx={{ color: 'var(--ink-soft)' }}>
                  <strong style={{ color: 'var(--ink)' }}>Information gathered: </strong>
                  {m.infoGathered}
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        Defences
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
        {defences.map((d) => (
          <Paper
            key={d.label}
            elevation={1}
            sx={{
              display: 'flex',
              gap: 2,
              p: 2,
              borderRadius: 2,
              background: 'var(--paper-raised)',
              borderLeft: '4px solid var(--success)',
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)', minWidth: 200, flexShrink: 0 }}>
              {d.label}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              {d.desc}
            </Typography>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="warning" title="The most powerful attack vector">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          Studies consistently show that social engineering succeeds where technical controls fail.
          A perfectly patched, encrypted, monitored system can be compromised in minutes by one phone
          call to the right employee. Organisations that invest only in technology and neglect human
          training are significantly more vulnerable.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
