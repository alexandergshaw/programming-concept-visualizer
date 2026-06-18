'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import HttpsIcon from '@mui/icons-material/Https';
import VerifiedIcon from '@mui/icons-material/Verified';
import PasswordIcon from '@mui/icons-material/Password';
import GrainIcon from '@mui/icons-material/Grain';
import TagIcon from '@mui/icons-material/Tag';
import StorageIcon from '@mui/icons-material/Storage';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalloutBox from '../../common/CalloutBox';

const handshake = [
  { step: 1, text: 'Browser asks the server for a secure connection' },
  { step: 2, text: 'Server sends its digital certificate (its public key + identity)' },
  { step: 3, text: 'Browser checks the certificate is signed by a trusted authority' },
  { step: 4, text: 'They agree on a shared session key using the public key' },
  { step: 5, text: 'All further traffic is encrypted with that session key' },
];

const passwordFlow = [
  { label: 'Password', value: 'hunter2', icon: <PasswordIcon sx={{ fontSize: 26, color: 'var(--info)' }} />, token: 'info' },
  { label: '+ Salt', value: 'x9$Lq', icon: <GrainIcon sx={{ fontSize: 26, color: 'var(--feature)' }} />, token: 'feature' },
  { label: 'Hash function', value: 'bcrypt', icon: <TagIcon sx={{ fontSize: 26, color: 'var(--warning)' }} />, token: 'warning' },
  { label: 'Stored', value: '$2b$10$Kx…', icon: <StorageIcon sx={{ fontSize: 26, color: 'var(--success)' }} />, token: 'success' },
];

export default function WebSecurityConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Cryptography on the Web
      </Typography>

      <Typography variant="body1" sx={{ mb: 5, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        Cryptography is not just theory — it quietly protects every secure website you use. Two everyday
        examples: <strong>HTTPS</strong>, which encrypts data in transit, and <strong>password hashing</strong>,
        which protects credentials at rest.
      </Typography>

      {/* HTTPS */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
        <HttpsIcon sx={{ color: 'var(--success)' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
          HTTPS &amp; the TLS Handshake
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ mb: 3, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        Before any real data is sent, the browser and server run a quick handshake to agree on a secret —
        using the asymmetric keys you met in the cryptography section.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, maxWidth: 760, mx: 'auto', mb: 4 }}>
        {handshake.map((h) => (
          <Paper
            key={h.step}
            elevation={1}
            sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.8, borderRadius: 2, borderLeft: '4px solid var(--success)' }}
          >
            <Box
              sx={{
                flex: '0 0 auto',
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: 'var(--success)',
                color: 'var(--paper-raised)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem',
              }}
            >
              {h.step}
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.5 }}>
              {h.text}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Certificates callout */}
      <CalloutBox type="info" title="Digital certificates and trust" icon={<VerifiedIcon sx={{ color: 'var(--info)' }} />}>
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          A <strong>digital certificate</strong> is a signed document that vouches for a site&apos;s identity
          and public key. A <strong>Certificate Authority</strong> (CA) that your browser already trusts
          signs it — so when you see the padlock, your browser has checked that signature and confirmed you
          really are talking to the right server, not an impostor.
        </Typography>
      </CalloutBox>

      {/* Secure password storage */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 5, mb: 1 }}>
        <PasswordIcon sx={{ color: 'var(--feature)' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
          Storing Passwords Safely
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ mb: 3, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        A site should <strong>never</strong> store your actual password. Instead it adds a random
        <strong> salt</strong>, runs it through a slow one-way <strong>hash</strong>, and stores only the
        result.
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap', mb: 2 }}>
        {passwordFlow.map((p, i) => (
          <React.Fragment key={p.label}>
            <Paper
              elevation={2}
              sx={{ p: 1.5, borderRadius: 2, minWidth: 130, textAlign: 'center', borderTop: `3px solid var(--${p.token})` }}
            >
              {p.icon}
              <Typography variant="caption" sx={{ display: 'block', fontWeight: 700, color: 'var(--ink)' }}>
                {p.label}
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'var(--ink-soft)', fontSize: '0.8rem' }}>
                {p.value}
              </Typography>
            </Paper>
            {i < passwordFlow.length - 1 && <ArrowForwardIcon sx={{ color: 'var(--ink-soft)' }} />}
          </React.Fragment>
        ))}
      </Box>

      <CalloutBox type="warning" title="Why the salt matters">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          Without a salt, two users with the same password get the same hash, and attackers can crack many
          at once with a pre-computed <strong>rainbow table</strong>. A unique random salt per user makes
          every hash different, forcing attackers to crack them one painfully slow guess at a time — which
          is also why a deliberately slow algorithm like <strong>bcrypt</strong> or <strong>Argon2</strong>
          is used instead of a fast one.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
