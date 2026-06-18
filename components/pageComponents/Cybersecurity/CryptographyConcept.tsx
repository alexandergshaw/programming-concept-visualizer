'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import KeyIcon from '@mui/icons-material/Key';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TagIcon from '@mui/icons-material/Tag';
import CalloutBox from '../../common/CalloutBox';

export default function CryptographyConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Cryptography
      </Typography>

      <Typography variant="body1" sx={{ mb: 5, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        Cryptography is the science of scrambling information so that only the right person can read it. It is
        what protects passwords, messages, and payments — even when an attacker is watching the traffic.
      </Typography>

      {/* Encryption flow */}
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        How Encryption Works
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          flexWrap: 'wrap',
          mb: 2,
        }}
      >
        {/* Plaintext */}
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2, textAlign: 'center', minWidth: 150, borderTop: '4px solid var(--success)' }}>
          <LockOpenIcon sx={{ fontSize: 30, color: 'var(--success)' }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
            Plaintext
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'var(--ink-soft)' }}>
            HELLO
          </Typography>
        </Paper>

        <ArrowForwardIcon sx={{ color: 'var(--ink-soft)' }} />

        {/* Encrypt with key */}
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2, textAlign: 'center', minWidth: 150, borderTop: '4px solid var(--info)' }}>
          <KeyIcon sx={{ fontSize: 30, color: 'var(--info)' }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
            Encrypt
          </Typography>
          <Typography variant="caption" sx={{ color: 'var(--ink-soft)' }}>
            using a key
          </Typography>
        </Paper>

        <ArrowForwardIcon sx={{ color: 'var(--ink-soft)' }} />

        {/* Ciphertext */}
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2, textAlign: 'center', minWidth: 150, borderTop: '4px solid var(--danger)' }}>
          <LockIcon sx={{ fontSize: 30, color: 'var(--danger)' }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
            Ciphertext
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'var(--ink-soft)' }}>
            KHOOR
          </Typography>
        </Paper>
      </Box>
      <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: 'var(--ink-faint)', mb: 5 }}>
        A simple shift cipher: each letter moves 3 places. Real algorithms are far more complex, but the idea
        is the same — without the key, the ciphertext is meaningless.
      </Typography>

      {/* Symmetric vs Asymmetric */}
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        Two Kinds of Keys
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ flex: '1 1 360px', maxWidth: 460, p: 3, borderRadius: 2, borderTop: '4px solid var(--info)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <KeyIcon sx={{ color: 'var(--info)', fontSize: 30 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
              Symmetric
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7, mb: 1.5 }}>
            <strong>One shared key</strong> both locks and unlocks the data. It is fast, but both people must
            already share the same secret key — and getting it to them safely is the hard part.
          </Typography>
          <Box sx={{ p: 1.2, borderRadius: 1, background: 'var(--info-bg)', color: 'var(--info)', fontWeight: 600, fontSize: '0.85rem' }}>
            Same key encrypts and decrypts
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ flex: '1 1 360px', maxWidth: 460, p: 3, borderRadius: 2, borderTop: '4px solid var(--feature)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <VpnKeyIcon sx={{ color: 'var(--feature)', fontSize: 30 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
              Asymmetric
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7, mb: 1.5 }}>
            A <strong>pair of keys</strong>: a public key anyone can use to lock data, and a private key only
            the owner holds to unlock it. This solves the sharing problem and powers secure websites (HTTPS).
          </Typography>
          <Box sx={{ p: 1.2, borderRadius: 1, background: 'var(--feature-bg)', color: 'var(--feature)', fontWeight: 600, fontSize: '0.85rem' }}>
            Public key locks, private key unlocks
          </Box>
        </Paper>
      </Box>

      {/* Hashing */}
      <CalloutBox type="warning" title="Hashing is not encryption" icon={<TagIcon sx={{ color: 'var(--warning)' }} />}>
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          A <strong>hash</strong> is a one-way fingerprint of data — easy to compute, impossible to reverse.
          Unlike encryption, there is no key to turn it back. This is how passwords are stored safely: the
          system keeps the hash, not the password, and compares hashes when you log in. Any tiny change to the
          input produces a completely different hash, which also makes hashes great for checking that a file
          has not been tampered with.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
