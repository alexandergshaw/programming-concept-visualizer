'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import RepeatIcon from '@mui/icons-material/Repeat';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CookieIcon from '@mui/icons-material/Cookie';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CalloutBox from '../../common/CalloutBox';

const factors = [
  {
    name: 'Something you know',
    token: 'info',
    icon: <PsychologyIcon sx={{ fontSize: 28, color: 'var(--info)' }} />,
    desc: 'A password, PIN, or answer to a security question.',
    weak: 'Can be guessed, phished, or reused',
  },
  {
    name: 'Something you have',
    token: 'feature',
    icon: <SmartphoneIcon sx={{ fontSize: 28, color: 'var(--feature)' }} />,
    desc: 'A phone with an authenticator app, a hardware key, or a one-time code.',
    weak: 'Can be lost or, rarely, stolen',
  },
  {
    name: 'Something you are',
    token: 'success',
    icon: <FingerprintIcon sx={{ fontSize: 28, color: 'var(--success)' }} />,
    desc: 'A biometric — fingerprint, face, or voice.',
    weak: 'Cannot be changed if compromised',
  },
];

const attacks = [
  {
    name: 'Brute Force',
    token: 'danger',
    icon: <RepeatIcon sx={{ fontSize: 26, color: 'var(--danger)' }} />,
    desc: 'Automatically trying huge numbers of password guesses until one works.',
    defense: 'Lockouts, rate limits, long passwords',
  },
  {
    name: 'Credential Stuffing',
    token: 'danger',
    icon: <VpnKeyIcon sx={{ fontSize: 26, color: 'var(--danger)' }} />,
    desc: 'Reusing username/password pairs leaked from one breached site on others.',
    defense: 'Unique passwords, MFA, breach checks',
  },
  {
    name: 'Session Hijacking',
    token: 'warning',
    icon: <CookieIcon sx={{ fontSize: 26, color: 'var(--warning)' }} />,
    desc: 'Stealing the session cookie that keeps you logged in, to impersonate you.',
    defense: 'HTTPS, secure cookies, short sessions',
  },
];

const defenses = [
  'Require multi-factor authentication (MFA) wherever possible',
  'Store passwords only as salted hashes — never in plain text',
  'Lock or slow down accounts after repeated failed attempts',
  'Encourage long passphrases and a password manager over complex-but-short passwords',
  'Expire sessions and rotate tokens so a stolen cookie does not last forever',
];

export default function AuthenticationSecurityConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Authentication Security
      </Typography>

      <Typography variant="body1" sx={{ mb: 5, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        <strong>Authentication</strong> is how a system proves you are who you say you are. It is the front
        door to almost everything — which is exactly why attackers spend so much effort trying to pick the
        lock.
      </Typography>

      {/* Three factors */}
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        The Three Factors
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: 'var(--ink-soft)', textAlign: 'center' }}>
        Combining factors from different categories is what makes authentication strong.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap', justifyContent: 'center', mb: 5 }}>
        {factors.map((f) => (
          <Paper
            key={f.name}
            elevation={3}
            sx={{ flex: '1 1 280px', maxWidth: 320, p: 2.5, borderRadius: 2, borderTop: `4px solid var(--${f.token})` }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  background: `var(--${f.token}-bg)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: '0 0 auto',
                }}
              >
                {f.icon}
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {f.name}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6, mb: 1.5 }}>
              {f.desc}
            </Typography>
            <Box
              sx={{
                px: 1.2,
                py: 0.6,
                borderRadius: 1,
                background: `var(--${f.token}-bg)`,
                color: `var(--${f.token})`,
                fontWeight: 700,
                fontSize: '0.72rem',
              }}
            >
              {f.weak}
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Attacks */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        How Attackers Break In
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 2,
          mb: 5,
        }}
      >
        {attacks.map((a) => (
          <Paper
            key={a.name}
            elevation={2}
            sx={{ p: 2.5, borderRadius: 2, borderLeft: `4px solid var(--${a.token})`, display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {a.icon}
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {a.name}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6, flex: 1 }}>
              {a.desc}
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--ink-soft)' }}>
              <Box component="span" sx={{ fontWeight: 700, color: 'var(--success)' }}>
                Defend:{' '}
              </Box>
              {a.defense}
            </Typography>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="success" title="Why MFA changes the game" icon={<VerifiedUserIcon sx={{ color: 'var(--success)' }} />}>
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8, mb: 1.5 }}>
          With multi-factor authentication, a stolen password is no longer enough — the attacker would also
          need the user&apos;s phone or fingerprint. It blocks the overwhelming majority of account-takeover
          attacks, which is why it is the single most effective control you can add.
        </Typography>
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
