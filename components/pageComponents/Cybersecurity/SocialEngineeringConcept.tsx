'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import PhishingIcon from '@mui/icons-material/Phishing';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import SmsIcon from '@mui/icons-material/Sms';
import BadgeIcon from '@mui/icons-material/Badge';
import UsbIcon from '@mui/icons-material/Usb';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ShieldIcon from '@mui/icons-material/Shield';
import CalloutBox from '../../common/CalloutBox';

const attacks = [
  {
    name: 'Phishing',
    token: 'danger',
    icon: <PhishingIcon sx={{ fontSize: 30, color: 'var(--danger)' }} />,
    what: 'Fake emails that look legitimate, luring the victim to a malicious link or attachment.',
    channel: 'Email',
  },
  {
    name: 'Spear Phishing',
    token: 'danger',
    icon: <PhishingIcon sx={{ fontSize: 30, color: 'var(--danger)' }} />,
    what: 'A phishing message crafted for one specific person using details gathered about them.',
    channel: 'Targeted email',
  },
  {
    name: 'Vishing',
    token: 'warning',
    icon: <RecordVoiceOverIcon sx={{ fontSize: 30, color: 'var(--warning)' }} />,
    what: 'Voice phone calls where the attacker impersonates IT, a bank, or an authority figure.',
    channel: 'Phone',
  },
  {
    name: 'Smishing',
    token: 'warning',
    icon: <SmsIcon sx={{ fontSize: 30, color: 'var(--warning)' }} />,
    what: 'Phishing delivered by SMS text, often with an urgent link to "verify" an account.',
    channel: 'Text message',
  },
  {
    name: 'Pretexting',
    token: 'feature',
    icon: <BadgeIcon sx={{ fontSize: 30, color: 'var(--feature)' }} />,
    what: 'Inventing a believable scenario and identity to talk a victim into handing over access.',
    channel: 'Any',
  },
  {
    name: 'Baiting',
    token: 'info',
    icon: <UsbIcon sx={{ fontSize: 30, color: 'var(--info)' }} />,
    what: 'Leaving infected USB drives or offering "free" downloads that the victim plugs in or runs.',
    channel: 'Physical / web',
  },
];

const triggers = [
  { name: 'Authority', desc: '"This is the CEO — I need this done now."' },
  { name: 'Urgency', desc: '"Your account will be closed in one hour."' },
  { name: 'Fear', desc: '"We have detected fraud on your card."' },
  { name: 'Trust / Familiarity', desc: '"Hi, it’s Dave from IT, we spoke last week."' },
  { name: 'Greed / Reward', desc: '"You’ve won a prize — just confirm your details."' },
  { name: 'Helpfulness', desc: '"Could you just hold the door / reset this for me?"' },
];

const defenses = [
  'Verify unusual requests through a second, known channel before acting',
  'Never share passwords or codes — no legitimate IT team will ask',
  'Hover over links and check the real sender address before clicking',
  'Slow down: urgency and pressure are themselves warning signs',
  'Report suspected attempts so the whole organisation can be warned',
];

export default function SocialEngineeringConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Social Engineering
      </Typography>

      <Typography variant="body1" sx={{ mb: 5, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        <strong>Social engineering</strong> attacks the person, not the computer. Instead of breaking
        through firewalls, the attacker tricks someone into opening the door for them — which is why it
        is the most common way real breaches begin.
      </Typography>

      {/* Attack types grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 2.5,
        }}
      >
        {attacks.map((a) => (
          <Paper
            key={a.name}
            elevation={3}
            sx={{ p: 2.5, borderRadius: 2, borderTop: `4px solid var(--${a.token})`, display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  background: `var(--${a.token}-bg)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: '0 0 auto',
                }}
              >
                {a.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {a.name}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6, flex: 1 }}>
              {a.what}
            </Typography>
            <Box
              sx={{
                mt: 0.5,
                px: 1.2,
                py: 0.6,
                borderRadius: 1,
                background: `var(--${a.token}-bg)`,
                color: `var(--${a.token})`,
                fontWeight: 700,
                fontSize: '0.75rem',
                alignSelf: 'flex-start',
              }}
            >
              {a.channel}
            </Box>
          </Paper>
        ))}
      </Box>

      <CalloutBox
        type="warning"
        title="The emotions attackers exploit"
        icon={<PriorityHighIcon sx={{ color: 'var(--warning)' }} />}
      >
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mb: 1.5, lineHeight: 1.6 }}>
          Almost every social engineering attack pulls one of these psychological levers to stop you
          thinking clearly:
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 1.5,
          }}
        >
          {triggers.map((t) => (
            <Box
              key={t.name}
              sx={{ p: 1.5, borderRadius: 1, background: 'var(--paper-raised)', border: '1px solid var(--line)' }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {t.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)', fontStyle: 'italic' }}>
                {t.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </CalloutBox>

      <CalloutBox type="success" title="How to defend yourself" icon={<ShieldIcon sx={{ color: 'var(--success)' }} />}>
        <Box component="ul" sx={{ m: 0, pl: 3, color: 'var(--ink-soft)' }}>
          {defenses.map((d) => (
            <Box component="li" key={d} sx={{ mb: 0.5, lineHeight: 1.6 }}>
              {d}
            </Box>
          ))}
        </Box>
      </CalloutBox>
    </Box>
  );
}
