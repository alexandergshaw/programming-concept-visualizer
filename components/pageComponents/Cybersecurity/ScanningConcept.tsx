'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import RadarIcon from '@mui/icons-material/Radar';
import LanIcon from '@mui/icons-material/Lan';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ShieldIcon from '@mui/icons-material/Shield';
import CalloutBox from '../../common/CalloutBox';

const stages = [
  {
    step: 1,
    name: 'Host Discovery',
    token: 'info',
    icon: <LanIcon sx={{ fontSize: 28, color: 'var(--info)' }} />,
    what: 'Find which machines on the network are actually alive and responding.',
    tool: 'ping sweep, ARP scan',
  },
  {
    step: 2,
    name: 'Port Scanning',
    token: 'feature',
    icon: <SettingsEthernetIcon sx={{ fontSize: 28, color: 'var(--feature)' }} />,
    what: 'Check which TCP/UDP ports are open — each open port is a possible way in.',
    tool: 'Nmap, masscan',
  },
  {
    step: 3,
    name: 'Service & Version Detection',
    token: 'warning',
    icon: <RadarIcon sx={{ fontSize: 28, color: 'var(--warning)' }} />,
    what: 'Identify what software and version sits behind each open port to find known flaws.',
    tool: 'banner grabbing, nmap -sV',
  },
  {
    step: 4,
    name: 'Enumeration',
    token: 'danger',
    icon: <FormatListBulletedIcon sx={{ fontSize: 28, color: 'var(--danger)' }} />,
    what: 'Actively pull out usernames, shares, and configuration details from the services found.',
    tool: 'SMB/SNMP/LDAP queries',
  },
];

const ports = [
  { port: '22', service: 'SSH', note: 'Remote shell access' },
  { port: '80 / 443', service: 'HTTP / HTTPS', note: 'Web servers' },
  { port: '25', service: 'SMTP', note: 'Mail relay' },
  { port: '3389', service: 'RDP', note: 'Remote desktop' },
  { port: '445', service: 'SMB', note: 'Windows file sharing' },
  { port: '3306', service: 'MySQL', note: 'Database' },
];

const defenses = [
  'Close or firewall every port that is not strictly needed',
  'Hide software versions in service banners where possible',
  'Use an IDS/IPS to spot and rate-limit scanning traffic',
  'Segment the network so one foothold cannot scan everything',
  'Keep services patched so a known version is not a known target',
];

export default function ScanningConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Scanning &amp; Enumeration
      </Typography>

      <Typography variant="body1" sx={{ mb: 5, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        Once a target is mapped out, the attacker probes it directly. <strong>Scanning</strong> finds the
        live hosts and open doors; <strong>enumeration</strong> then pulls specific details out of the
        services running behind those doors.
      </Typography>

      {/* Stages */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2.5,
          mb: 4,
        }}
      >
        {stages.map((s) => (
          <Paper
            key={s.name}
            elevation={3}
            sx={{ p: 2.5, borderRadius: 2, borderLeft: `4px solid var(--${s.token})`, display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: `var(--${s.token}-bg)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: '0 0 auto',
                }}
              >
                {s.icon}
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: `var(--${s.token})`, fontWeight: 700 }}>
                  STEP {s.step}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2 }}>
                  {s.name}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              {s.what}
            </Typography>
            <Box
              sx={{
                px: 1.2,
                py: 0.5,
                borderRadius: 1,
                background: 'var(--paper-sunken)',
                color: 'var(--ink-soft)',
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                alignSelf: 'flex-start',
              }}
            >
              {s.tool}
            </Box>
          </Paper>
        ))}
      </Box>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Ports Worth Knowing
      </Typography>

      {/* Common ports table */}
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden', mb: 1 }}>
        <Box sx={{ display: 'flex', background: 'var(--ink)', color: 'var(--paper)' }}>
          <Box sx={{ flex: '0 0 26%', p: 1.5, fontWeight: 700 }}>Port</Box>
          <Box sx={{ flex: '0 0 30%', p: 1.5, fontWeight: 700 }}>Service</Box>
          <Box sx={{ flex: 1, p: 1.5, fontWeight: 700 }}>Why it matters</Box>
        </Box>
        {ports.map((row, i) => (
          <Box
            key={row.port}
            sx={{ display: 'flex', background: i % 2 === 0 ? 'var(--paper-raised)' : 'var(--paper-sunken)', borderTop: '1px solid var(--line)' }}
          >
            <Box sx={{ flex: '0 0 26%', p: 1.5, fontFamily: 'monospace', fontWeight: 700, color: 'var(--info)' }}>{row.port}</Box>
            <Box sx={{ flex: '0 0 30%', p: 1.5, fontWeight: 600, color: 'var(--ink)' }}>{row.service}</Box>
            <Box sx={{ flex: 1, p: 1.5, color: 'var(--ink-soft)', fontSize: '0.9rem' }}>{row.note}</Box>
          </Box>
        ))}
      </Paper>

      <CalloutBox type="success" title="Defending against scans" icon={<ShieldIcon sx={{ color: 'var(--success)' }} />}>
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
