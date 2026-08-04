'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import LanIcon from '@mui/icons-material/Lan';
import DevicesIcon from '@mui/icons-material/Devices';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpIcon from '@mui/icons-material/Help';
import CalloutBox from '../../common/CalloutBox';

const techniques = [
  {
    token: 'info',
    icon: <LanIcon sx={{ fontSize: 28, color: 'var(--info)' }} />,
    name: 'ARP Ping (Layer 2)',
    applicable: 'Local subnet only',
    reliability: 'Very high',
    desc: 'Send ARP requests to each IP. Any response confirms the host is live. Bypasses ICMP filtering since ARP operates at the data-link layer.',
  },
  {
    token: 'success',
    icon: <DevicesIcon sx={{ fontSize: 28, color: 'var(--success)' }} />,
    name: 'ICMP Echo Ping (Layer 3)',
    applicable: 'Any routable host',
    reliability: 'Medium (often filtered)',
    desc: 'Classic "ping". Fast and widely understood, but firewalls frequently block ICMP type 8 at the perimeter.',
  },
  {
    token: 'warning',
    icon: <LanIcon sx={{ fontSize: 28, color: 'var(--warning)' }} />,
    name: 'TCP SYN Probe',
    applicable: 'Any host with open TCP port',
    reliability: 'High',
    desc: 'Send a TCP SYN to a common port (80, 443, 22). A SYN-ACK or RST confirms the host is alive, even when ICMP is blocked.',
  },
  {
    token: 'feature',
    icon: <DevicesIcon sx={{ fontSize: 28, color: 'var(--feature)' }} />,
    name: 'TCP ACK Probe',
    applicable: 'Stateless firewall bypass',
    reliability: 'Medium',
    desc: 'An unexpected ACK to a closed port triggers a RST from live hosts. May bypass stateless packet filters that block SYN packets.',
  },
  {
    token: 'danger',
    icon: <LanIcon sx={{ fontSize: 28, color: 'var(--danger)' }} />,
    name: 'UDP Ping',
    applicable: 'UDP-listening hosts',
    reliability: 'Low (slow, unreliable)',
    desc: 'Send UDP to a closed port; a live host returns ICMP port-unreachable. Slow because of retransmissions and rate limiting.',
  },
];

const hostStates = [
  {
    state: 'Up',
    icon: <CheckCircleIcon sx={{ color: 'var(--success)', fontSize: 28 }} />,
    token: 'success',
    desc: 'The host responded to at least one probe. It is online and accessible from the scanner.',
  },
  {
    state: 'Down',
    icon: <CancelIcon sx={{ color: 'var(--danger)', fontSize: 28 }} />,
    token: 'danger',
    desc: 'No response to any probe. Either offline, or all probe types are blocked by a firewall.',
  },
  {
    state: 'Unknown / Filtered',
    icon: <HelpIcon sx={{ color: 'var(--warning)', fontSize: 28 }} />,
    token: 'warning',
    desc: 'Some probes timed out, others did not. The host may be up but heavily filtered — worth investigating further.',
  },
];

const practicalTips = [
  'Use multiple probe types simultaneously; different hosts respond to different techniques.',
  'On local networks always start with ARP — it is the most reliable and fastest.',
  'Record which hosts are live before moving to port scanning to avoid wasting time.',
  'Some hosts appear down but are actually firewalled — try a TCP probe on port 80/443.',
  'Identify any hosts that were not expected — unknown devices may be rogue or compromised.',
];

export default function LiveHostsConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Identifying Live Hosts
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        Before scanning ports or enumerating services, you need to know <strong>which hosts are actually
        online</strong>. Host discovery narrows a large IP range to a manageable list of live targets,
        saving time and reducing noise.
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        Host Discovery Techniques
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5 }}>
        {techniques.map((t) => (
          <Paper
            key={t.name}
            elevation={2}
            sx={{ p: 2.5, borderRadius: 2, borderLeft: `4px solid var(--${t.token})` }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '0 0 auto', pt: 0.5 }}>{t.icon}</Box>
              <Box sx={{ flex: 1, minWidth: 200 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 0.5, flexWrap: 'wrap' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                    {t.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Box sx={{ px: 1, py: 0.2, borderRadius: 1, background: 'var(--info-bg)', color: 'var(--info)', fontSize: '0.72rem', fontWeight: 700 }}>
                      {t.applicable}
                    </Box>
                    <Box sx={{ px: 1, py: 0.2, borderRadius: 1, background: `var(--${t.token}-bg)`, color: `var(--${t.token})`, fontSize: '0.72rem', fontWeight: 700 }}>
                      {t.reliability}
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                  {t.desc}
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        Host States in Nmap
      </Typography>

      <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap', justifyContent: 'center', mb: 5 }}>
        {hostStates.map((s) => (
          <Paper
            key={s.state}
            elevation={2}
            sx={{
              flex: '1 1 220px',
              maxWidth: 280,
              p: 2.5,
              borderRadius: 2,
              borderTop: `4px solid var(--${s.token})`,
              textAlign: 'center',
            }}
          >
            <Box sx={{ mb: 1 }}>{s.icon}</Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: `var(--${s.token})`, mb: 1 }}>
              {s.state}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              {s.desc}
            </Typography>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="success" title="Practical tips">
        <Box component="ul" sx={{ m: 0, pl: 3, color: 'var(--ink-soft)' }}>
          {practicalTips.map((tip) => (
            <Box component="li" key={tip} sx={{ mb: 0.5, lineHeight: 1.7 }}>
              {tip}
            </Box>
          ))}
        </Box>
      </CalloutBox>
    </Box>
  );
}
