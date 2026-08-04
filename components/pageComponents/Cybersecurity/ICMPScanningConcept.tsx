'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CalloutBox from '../../common/CalloutBox';

const icmpTypes = [
  {
    type: 'Type 8 — Echo Request',
    token: 'info',
    desc: 'Sent by the scanner. "Are you there?" This is the familiar "ping" packet.',
  },
  {
    type: 'Type 0 — Echo Reply',
    token: 'success',
    desc: 'A host responds with this to confirm it is alive and reachable.',
  },
  {
    type: 'Type 3 — Destination Unreachable',
    token: 'warning',
    desc: 'Returned by an intermediate router (not the target) when the host or port cannot be reached. The code field indicates why.',
  },
  {
    type: 'Type 11 — Time Exceeded',
    token: 'danger',
    desc: 'Returned when a packet\'s TTL reaches zero before arriving. Used by traceroute to map network paths.',
  },
];

const pingFlow = [
  { step: '1', title: 'Send ICMP Echo Request (Type 8)', desc: 'Scanner sends a packet addressed to the target IP with ICMP Type 8.', token: 'info' },
  { step: '2', title: 'Wait for response', desc: 'The scanner waits a configurable timeout (e.g. 1–3 seconds) for a reply.', token: 'feature' },
  { step: '3a', title: 'Echo Reply received → Host is LIVE', desc: 'ICMP Type 0 back from the target confirms the host exists and is reachable.', token: 'success' },
  { step: '3b', title: 'No reply or ICMP Type 3/11 → Inconclusive', desc: 'Silence may mean the host is down, firewalled, or filtering ICMP — not necessarily offline.', token: 'warning' },
];

const limitations = [
  {
    title: 'Firewalls block ICMP',
    desc: 'Many organisations drop all inbound ICMP at the perimeter. A "no reply" does not always mean the host is down — it may mean ICMP is filtered.',
    token: 'danger',
  },
  {
    title: 'Rate limiting',
    desc: 'Some devices respond to the first few pings but then rate-limit or drop further ICMP to prevent scanning.',
    token: 'warning',
  },
  {
    title: 'Only confirms reachability',
    desc: 'An ICMP reply shows the host is online and responsive. It says nothing about open ports or running services.',
    token: 'info',
  },
];

const tools = [
  { name: 'ping', example: 'ping -c 4 192.168.1.1', desc: 'Built-in OS tool for manual ICMP echo testing.' },
  { name: 'fping', example: 'fping -a -g 192.168.1.0/24', desc: 'Sends ICMP pings to multiple hosts in parallel; prints only live hosts with -a.' },
  { name: 'Nmap', example: 'nmap -PE -sn 192.168.1.0/24', desc: 'ICMP echo ping scan (-PE). Combine with -sn to skip port scanning.' },
  { name: 'hping3', example: 'hping3 --icmp target.com', desc: 'Advanced packet crafting; can send custom ICMP types and fragments.' },
];

export default function ICMPScanningConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        ICMP Echo Request Scanning
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        The Internet Control Message Protocol (ICMP) echo request — better known as a <strong>ping</strong> —
        is the simplest way to test whether a remote host is reachable. It is the first technique most
        scanners try when performing host discovery.
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        Relevant ICMP Message Types
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2,
          mb: 5,
        }}
      >
        {icmpTypes.map((t) => (
          <Paper
            key={t.type}
            elevation={2}
            sx={{ p: 2.5, borderRadius: 2, borderLeft: `4px solid var(--${t.token})` }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: `var(--${t.token})`, mb: 0.5 }}>
              {t.type}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
              {t.desc}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        ICMP Ping Scan Flow
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 5 }}>
        {pingFlow.map((s) => (
          <Paper
            key={s.step}
            elevation={1}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              p: 2,
              borderRadius: 2,
              background: 'var(--paper-raised)',
              borderLeft: `4px solid var(--${s.token})`,
            }}
          >
            <Box
              sx={{
                flex: '0 0 auto',
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: `var(--${s.token})`,
                color: 'var(--paper)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.8rem',
              }}
            >
              {s.step}
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {s.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>
                {s.desc}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 2,
          mb: 5,
        }}
      >
        {limitations.map((l) => (
          <Paper key={l.title} elevation={1} sx={{ p: 2, borderRadius: 2, borderLeft: `4px solid var(--${l.token})`, background: 'var(--paper-raised)' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)', mb: 0.5 }}>{l.title}</Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>{l.desc}</Typography>
          </Paper>
        ))}
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 2 }}>
        Tools for ICMP Scanning
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
        {tools.map((t) => (
          <Paper key={t.name} elevation={1} sx={{ p: 2, borderRadius: 2, background: 'var(--paper-raised)', borderLeft: '4px solid var(--info)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mb: 0.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)', minWidth: 80 }}>{t.name}</Typography>
              <Box component="code" sx={{ background: 'var(--paper)', color: 'var(--feature)', px: 1, py: 0.2, borderRadius: 1, fontSize: '0.75rem' }}>
                {t.example}
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>{t.desc}</Typography>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="info" title="ICMP is just the start">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          Because many firewalls block ICMP, professional scanners combine multiple discovery methods:
          ICMP echo, ICMP timestamp, TCP SYN to port 443, and TCP ACK to port 80. A host that ignores
          pings may still respond to a TCP probe on an allowed port.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
