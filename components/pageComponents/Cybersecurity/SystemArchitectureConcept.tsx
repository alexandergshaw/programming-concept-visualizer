'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import AppsIcon from '@mui/icons-material/Apps';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import MemoryIcon from '@mui/icons-material/Memory';
import CalloutBox from '../../common/CalloutBox';

const layers = [
  {
    label: 'Network',
    token: 'feature',
    icon: <PublicIcon sx={{ fontSize: 30, color: 'var(--feature)' }} />,
    role: 'How the system talks to the outside world',
    weakness: 'Open ports, unencrypted traffic, and weak firewall rules let attackers reach the machine.',
  },
  {
    label: 'Applications',
    token: 'info',
    icon: <AppsIcon sx={{ fontSize: 30, color: 'var(--info)' }} />,
    role: 'The programs users actually interact with',
    weakness: 'Bugs in code — like input that is not checked — allow attackers to run commands or read data.',
  },
  {
    label: 'Operating System',
    token: 'warning',
    icon: <SettingsApplicationsIcon sx={{ fontSize: 30, color: 'var(--warning)' }} />,
    role: 'Manages programs, users, files, and permissions',
    weakness: 'Missing security patches and over-generous permissions let an attacker take full control.',
  },
  {
    label: 'Hardware',
    token: 'danger',
    icon: <MemoryIcon sx={{ fontSize: 30, color: 'var(--danger)' }} />,
    role: 'The physical CPU, memory, and storage',
    weakness: 'Physical access or chip-level flaws can bypass every protection built on top of it.',
  },
];

export default function SystemArchitectureConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        System Architecture
      </Typography>

      <Typography variant="body1" sx={{ mb: 5, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        To find a system&apos;s weaknesses you first have to understand how it is built. Every computer is a
        stack of layers, each sitting on the one below it. A weakness in <strong>any</strong> layer can put the
        whole system at risk — so attackers and defenders study them all.
      </Typography>

      {/* Layered stack */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, maxWidth: 760, mx: 'auto' }}>
        {layers.map((layer, i) => (
          <Paper
            key={layer.label}
            elevation={3}
            sx={{
              p: 2.5,
              // Indent each layer slightly so the "stack" reads top-down
              mx: { xs: 0, sm: `${i * 12}px` },
              borderRadius: 2,
              borderLeft: `6px solid var(--${layer.token})`,
              background: 'var(--paper-raised)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 1.5,
                  background: `var(--${layer.token}-bg)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: '0 0 auto',
                }}
              >
                {layer.icon}
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)', lineHeight: 1.15 }}>
                  {layer.label}
                </Typography>
                <Typography variant="caption" sx={{ color: 'var(--ink-soft)' }}>
                  {layer.role}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 1,
                background: `var(--${layer.token}-bg)`,
              }}
            >
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                <Box component="span" sx={{ fontWeight: 700, color: `var(--${layer.token})` }}>
                  Where it can break:{' '}
                </Box>
                {layer.weakness}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="info" title="The idea of an attack surface">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          Every point where an attacker could try to get in — a login form, an open port, a USB slot — is part
          of the <strong>attack surface</strong>. The more layers and features a system exposes, the larger
          that surface. A core goal of defense is to keep the attack surface as small as possible.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
