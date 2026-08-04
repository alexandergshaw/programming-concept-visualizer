'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import LanIcon from '@mui/icons-material/Lan';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SecurityIcon from '@mui/icons-material/Security';
import CalloutBox from '../../common/CalloutBox';

const phases = [
  {
    step: 1,
    name: 'Define the Scope',
    token: 'info',
    icon: <NetworkCheckIcon sx={{ fontSize: 28, color: 'var(--info)' }} />,
    desc: 'Identify the IP ranges and subnets authorised for scanning. Scanning outside this scope is unauthorised access.',
  },
  {
    step: 2,
    name: 'Host Discovery',
    token: 'feature',
    icon: <LanIcon sx={{ fontSize: 28, color: 'var(--feature)' }} />,
    desc: 'Determine which addresses in the range have live, responsive devices. Techniques include ARP scanning (local), ICMP ping, and TCP SYN probes.',
  },
  {
    step: 3,
    name: 'Port Scanning',
    token: 'warning',
    icon: <SettingsEthernetIcon sx={{ fontSize: 28, color: 'var(--warning)' }} />,
    desc: 'For each live host, probe TCP and UDP ports to identify which services are listening. Common tools: Nmap, masscan.',
  },
  {
    step: 4,
    name: 'Service & Version Detection',
    token: 'danger',
    icon: <FormatListBulletedIcon sx={{ fontSize: 28, color: 'var(--danger)' }} />,
    desc: 'Send crafted probes to open ports to identify the service name, version number, and protocol — the foundation for vulnerability matching.',
  },
  {
    step: 5,
    name: 'OS Fingerprinting',
    token: 'success',
    icon: <SecurityIcon sx={{ fontSize: 28, color: 'var(--success)' }} />,
    desc: 'Analyse the TCP/IP stack behaviour of responses to infer the operating system and version. Helps narrow applicable exploits.',
  },
];

const scanTypes = [
  {
    name: 'TCP Connect Scan (-sT)',
    token: 'info',
    desc: 'Completes the full TCP three-way handshake. Reliable but leaves entries in the target\'s connection logs.',
    stealth: 'Low',
  },
  {
    name: 'TCP SYN Scan (-sS)',
    token: 'success',
    desc: 'Sends only the SYN packet; never completes the handshake. Faster and stealthier — the most common scan type.',
    stealth: 'Medium',
  },
  {
    name: 'UDP Scan (-sU)',
    token: 'warning',
    desc: 'Probes UDP ports, which do not have a formal handshake. Slow and less reliable, but many services (DNS, SNMP) run on UDP.',
    stealth: 'Medium',
  },
  {
    name: 'Stealth / FIN / Xmas Scans',
    token: 'danger',
    desc: 'Send malformed TCP packets to elicit responses from closed ports. May bypass some firewalls but unreliable on modern systems.',
    stealth: 'High',
  },
];

export default function NetworkScanningIntroConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Introduction to Network Scanning
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        Network scanning is the systematic process of probing a network to map its devices, open ports,
        and running services. It turns the broad information gathered during reconnaissance into a
        precise picture of the attack surface.
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        Scanning Workflow
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 5 }}>
        {phases.map((p) => (
          <Paper
            key={p.step}
            elevation={1}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              p: 2,
              borderRadius: 2,
              background: 'var(--paper-raised)',
              borderLeft: `4px solid var(--${p.token})`,
            }}
          >
            <Box
              sx={{
                flex: '0 0 auto',
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: `var(--${p.token})`,
                color: 'var(--paper)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
              }}
            >
              {p.step}
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {p.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>
                {p.desc}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        Common Scan Types
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2.5,
          mb: 4,
        }}
      >
        {scanTypes.map((s) => (
          <Paper
            key={s.name}
            elevation={2}
            sx={{ p: 2.5, borderRadius: 2, borderLeft: `4px solid var(--${s.token})` }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, flexWrap: 'wrap', gap: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {s.name}
              </Typography>
              <Box
                sx={{
                  px: 1,
                  py: 0.3,
                  borderRadius: 1,
                  background: `var(--${s.token}-bg)`,
                  color: `var(--${s.token})`,
                  fontSize: '0.72rem',
                  fontWeight: 700,
                }}
              >
                Stealth: {s.stealth}
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
              {s.desc}
            </Typography>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="warning" title="Authorisation is mandatory">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          Network scanning generates traffic that is detectable by firewalls, IDS/IPS, and log analysis
          tools. Never scan systems without written permission — even scanning your own employer&apos;s
          network without approval may violate policy and potentially law.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
