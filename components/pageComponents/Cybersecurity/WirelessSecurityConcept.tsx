'use client';

import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CalloutBox from '../../common/CalloutBox';

const standards = [
  { name: 'WEP', year: '1999', token: 'danger', rating: 'Broken', note: 'Cracked in minutes — never use it.' },
  { name: 'WPA', year: '2003', token: 'warning', rating: 'Weak', note: 'A quick patch for WEP; now outdated.' },
  { name: 'WPA2', year: '2004', token: 'info', rating: 'OK', note: 'Still common, but has known attacks.' },
  { name: 'WPA3', year: '2018', token: 'success', rating: 'Strong', note: 'The current standard — use it if you can.' },
];

const attacks = [
  {
    name: 'Evil Twin',
    icon: <ContentCopyIcon sx={{ fontSize: 26, color: 'var(--feature)' }} />,
    token: 'feature',
    detail:
      'The attacker sets up a fake Wi-Fi network with the same name as a real one. Victims connect to it, and all their traffic flows through the attacker.',
  },
  {
    name: 'Deauthentication',
    icon: <WifiOffIcon sx={{ fontSize: 26, color: 'var(--danger)' }} />,
    token: 'danger',
    detail:
      'The attacker forces devices off the network. This can capture the reconnection handshake or push users onto an evil-twin network.',
  },
  {
    name: 'Packet Sniffing',
    icon: <WifiIcon sx={{ fontSize: 26, color: 'var(--warning)' }} />,
    token: 'warning',
    detail:
      'Wireless signals travel through the air, so anyone nearby can capture them. If the traffic is not encrypted, they can read it directly.',
  },
];

const defenses = [
  'Use WPA3 (or WPA2 at minimum) with a long, unique password',
  'Change the default router admin login and network name',
  'Keep router firmware updated',
  'Use a VPN on public Wi-Fi so your traffic stays encrypted',
  'Turn off WPS, which can be brute-forced',
];

export default function WirelessSecurityConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Wireless Security
      </Typography>

      <Typography variant="body1" sx={{ mb: 5, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        Wi-Fi is convenient, but it broadcasts your data through the air where anyone in range can try to
        listen. Strong <strong>encryption</strong> is what keeps that data private — and the standards have
        had to keep improving as old ones were broken.
      </Typography>

      {/* Encryption standards timeline */}
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 1 }}>
        Wi-Fi Encryption Over Time
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: 'var(--ink-soft)', textAlign: 'center' }}>
        Each standard replaced the last after attackers found ways to break it.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 1 }}>
        {standards.map((s) => (
          <Paper
            key={s.name}
            elevation={3}
            sx={{
              flex: '1 1 180px',
              maxWidth: 230,
              p: 2.5,
              borderRadius: 2,
              borderBottom: `5px solid var(--${s.token})`,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'var(--ink)' }}>
              {s.name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--ink-faint)' }}>
              {s.year}
            </Typography>
            <Box sx={{ my: 1 }}>
              <Chip
                label={s.rating}
                size="small"
                sx={{
                  fontWeight: 700,
                  background: `var(--${s.token}-bg)`,
                  color: `var(--${s.token})`,
                  border: `1px solid var(--${s.token})`,
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.5 }}>
              {s.note}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Common attacks */}
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mt: 5, mb: 3 }}>
        Common Wireless Attacks
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {attacks.map((a) => (
          <Paper
            key={a.name}
            elevation={2}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              p: 2.5,
              borderRadius: 2,
              borderLeft: `4px solid var(--${a.token})`,
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
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
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {a.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                {a.detail}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="success" title="Securing a wireless network" icon={<VpnKeyIcon sx={{ color: 'var(--success)' }} />}>
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
