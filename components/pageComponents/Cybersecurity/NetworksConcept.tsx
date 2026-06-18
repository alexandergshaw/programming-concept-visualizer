'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import RuleIcon from '@mui/icons-material/Rule';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ComputerIcon from '@mui/icons-material/Computer';
import RouterIcon from '@mui/icons-material/Router';
import PublicIcon from '@mui/icons-material/Public';
import DnsIcon from '@mui/icons-material/Dns';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalloutBox from '../../common/CalloutBox';

const buildingBlocks = [
  {
    name: 'IP Address',
    token: 'info',
    icon: <LanguageIcon sx={{ fontSize: 26, color: 'var(--info)' }} />,
    desc: 'The unique address of a machine on a network — like a postal address for data.',
  },
  {
    name: 'Port',
    token: 'feature',
    icon: <SettingsEthernetIcon sx={{ fontSize: 26, color: 'var(--feature)' }} />,
    desc: 'A numbered door on a machine. Each service (web, mail, SSH) listens on its own port.',
  },
  {
    name: 'Protocol',
    token: 'warning',
    icon: <RuleIcon sx={{ fontSize: 26, color: 'var(--warning)' }} />,
    desc: 'The agreed rules for how two machines talk — HTTP, DNS, TCP, and so on.',
  },
  {
    name: 'Packet',
    token: 'success',
    icon: <Inventory2Icon sx={{ fontSize: 26, color: 'var(--success)' }} />,
    desc: 'Data is broken into small packets, each labelled with where it is going and coming from.',
  },
];

const journey = [
  { name: 'Your Device', icon: <ComputerIcon sx={{ fontSize: 28, color: 'var(--info)' }} />, token: 'info' },
  { name: 'Router', icon: <RouterIcon sx={{ fontSize: 28, color: 'var(--feature)' }} />, token: 'feature' },
  { name: 'DNS Lookup', icon: <DnsIcon sx={{ fontSize: 28, color: 'var(--warning)' }} />, token: 'warning' },
  { name: 'The Internet', icon: <PublicIcon sx={{ fontSize: 28, color: 'var(--ink-soft)' }} />, token: 'info' },
  { name: 'Web Server', icon: <DnsIcon sx={{ fontSize: 28, color: 'var(--success)' }} />, token: 'success' },
];

const protocols = [
  { name: 'HTTP / HTTPS', port: '80 / 443', purpose: 'Loading web pages (HTTPS is encrypted)' },
  { name: 'DNS', port: '53', purpose: 'Turns a domain name into an IP address' },
  { name: 'TCP', port: '—', purpose: 'Reliable, ordered delivery — checks nothing is lost' },
  { name: 'UDP', port: '—', purpose: 'Fast, fire-and-forget — used for video, games, voice' },
  { name: 'SSH', port: '22', purpose: 'Encrypted remote control of a machine' },
];

export default function NetworksConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Networks &amp; Communication
      </Typography>

      <Typography variant="body1" sx={{ mb: 5, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        Almost every attack travels over a network. To defend one — or test it — you first need to
        understand how machines find each other and pass data back and forth.
      </Typography>

      {/* Building blocks */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        The Building Blocks
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
          gap: 2,
          mb: 5,
        }}
      >
        {buildingBlocks.map((b) => (
          <Paper
            key={b.name}
            elevation={2}
            sx={{ p: 2.5, borderRadius: 2, borderTop: `4px solid var(--${b.token})`, display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {b.icon}
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {b.name}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              {b.desc}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Journey of a request */}
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        The Journey of a Request
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        When you visit a site, your request hops across several machines before a page comes back.
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, flexWrap: 'wrap', mb: 5 }}>
        {journey.map((step, i) => (
          <React.Fragment key={step.name}>
            <Paper
              elevation={2}
              sx={{
                p: 1.5,
                borderRadius: 2,
                minWidth: 96,
                textAlign: 'center',
                borderTop: `3px solid var(--${step.token})`,
              }}
            >
              {step.icon}
              <Typography variant="caption" sx={{ display: 'block', fontWeight: 700, color: 'var(--ink)' }}>
                {step.name}
              </Typography>
            </Paper>
            {i < journey.length - 1 && <ArrowForwardIcon sx={{ color: 'var(--ink-soft)' }} />}
          </React.Fragment>
        ))}
      </Box>

      {/* Protocols table */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Protocols Worth Knowing
      </Typography>
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden', mb: 1 }}>
        <Box sx={{ display: 'flex', background: 'var(--ink)', color: 'var(--paper)' }}>
          <Box sx={{ flex: '0 0 32%', p: 1.5, fontWeight: 700 }}>Protocol</Box>
          <Box sx={{ flex: '0 0 18%', p: 1.5, fontWeight: 700 }}>Port</Box>
          <Box sx={{ flex: 1, p: 1.5, fontWeight: 700 }}>What it does</Box>
        </Box>
        {protocols.map((row, i) => (
          <Box
            key={row.name}
            sx={{ display: 'flex', background: i % 2 === 0 ? 'var(--paper-raised)' : 'var(--paper-sunken)', borderTop: '1px solid var(--line)' }}
          >
            <Box sx={{ flex: '0 0 32%', p: 1.5, fontWeight: 700, color: 'var(--ink)' }}>{row.name}</Box>
            <Box sx={{ flex: '0 0 18%', p: 1.5, fontFamily: 'monospace', color: 'var(--info)' }}>{row.port}</Box>
            <Box sx={{ flex: 1, p: 1.5, color: 'var(--ink-soft)', fontSize: '0.9rem' }}>{row.purpose}</Box>
          </Box>
        ))}
      </Paper>

      <CalloutBox type="info" title="Why this matters for security">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          Every open port is a potential door, unencrypted protocols (like plain HTTP) can be read by
          anyone on the path, and DNS can be spoofed to send you to the wrong server. Understanding the
          network is what lets an ethical hacker spot — and close — these gaps.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
