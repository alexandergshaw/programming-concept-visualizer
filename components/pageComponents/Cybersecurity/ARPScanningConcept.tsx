'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import LanIcon from '@mui/icons-material/Lan';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import CalloutBox from '../../common/CalloutBox';

const arpFlow = [
  {
    step: '1',
    title: 'Attacker broadcasts ARP Request',
    desc: '"Who has IP 192.168.1.1? Tell 192.168.1.50." Sent to the Ethernet broadcast address (FF:FF:FF:FF:FF:FF) — every device on the segment receives it.',
    token: 'info',
  },
  {
    step: '2',
    title: 'Target responds with ARP Reply',
    desc: '"192.168.1.1 is at AA:BB:CC:DD:EE:FF." Sent unicast back to the requester.',
    token: 'success',
  },
  {
    step: '3',
    title: 'Attacker records the MAC address',
    desc: 'A response confirms the host is alive. The MAC address also reveals the hardware vendor (via the OUI), which hints at the device type.',
    token: 'feature',
  },
  {
    step: '4',
    title: 'Repeat for all IPs in range',
    desc: 'Scanning the entire subnet produces a list of live hosts with their MAC addresses and (inferred) vendor information.',
    token: 'warning',
  },
];

const advantages = [
  { label: 'Highly reliable on local networks', desc: 'ARP is a layer-2 protocol. Devices respond even if they are configured to block ICMP (ping).' },
  { label: 'Fast', desc: 'Responses arrive almost instantly since ARP operates at the data-link layer with no TTL considerations.' },
  { label: 'Reveals device types', desc: 'The first three bytes of the MAC address (OUI) identify the manufacturer: useful for identifying printers, cameras, switches, and IoT devices.' },
  { label: 'No routing required', desc: 'Works entirely within a subnet — ideal for discovering hosts on the local segment before any TCP/IP scanning.' },
];

const limitations = [
  { label: 'Local segment only', desc: 'ARP does not cross routers. Remote networks must be scanned using ICMP or TCP-based techniques.' },
  { label: 'Detectable', desc: 'Sweeping all IPs on a subnet generates many ARP requests in a short time, which is visible in switch logs and network monitoring tools.' },
  { label: 'Not valid for IPv6', desc: 'IPv6 replaces ARP with Neighbour Discovery Protocol (NDP). Separate tools are needed for IPv6 host discovery.' },
];

const tools = [
  { name: 'arp-scan', example: 'arp-scan --localnet', desc: 'Sends ARP requests to every address in the local subnet and displays live hosts with vendor info.' },
  { name: 'Nmap', example: 'nmap -PR 192.168.1.0/24', desc: 'Nmap ARP ping scan (-PR) uses ARP for host discovery on local segments.' },
  { name: 'netdiscover', example: 'netdiscover -r 192.168.1.0/24', desc: 'Passive / active ARP scanner commonly used in wireless assessments.' },
];

export default function ARPScanningConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        ARP Scanning in Networks
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        The <strong>Address Resolution Protocol (ARP)</strong> maps IP addresses to MAC addresses on a
        local network. ARP scanning exploits this protocol to discover all live hosts on the same
        subnet — even those that ignore ping.
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, justifyContent: 'center' }}>
        <LanIcon sx={{ color: 'var(--info)' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
          How ARP Scanning Works
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 5 }}>
        {arpFlow.map((s) => (
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
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: `var(--${s.token})`,
                color: 'var(--paper)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
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
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 3,
          mb: 5,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--success)', mb: 2, textAlign: 'center' }}>
            Advantages
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {advantages.map((a) => (
              <Paper key={a.label} elevation={1} sx={{ p: 2, borderRadius: 2, borderLeft: '4px solid var(--success)', background: 'var(--paper-raised)' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)', mb: 0.5 }}>{a.label}</Typography>
                <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>{a.desc}</Typography>
              </Paper>
            ))}
          </Box>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--danger)', mb: 2, textAlign: 'center' }}>
            Limitations
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {limitations.map((l) => (
              <Paper key={l.label} elevation={1} sx={{ p: 2, borderRadius: 2, borderLeft: '4px solid var(--danger)', background: 'var(--paper-raised)' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)', mb: 0.5 }}>{l.label}</Typography>
                <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>{l.desc}</Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, justifyContent: 'center' }}>
        <DeviceHubIcon sx={{ color: 'var(--feature)' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
          Common Tools
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
        {tools.map((t) => (
          <Paper key={t.name} elevation={1} sx={{ p: 2.5, borderRadius: 2, background: 'var(--paper-raised)', borderLeft: '4px solid var(--feature)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mb: 0.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)', minWidth: 100 }}>{t.name}</Typography>
              <Box component="code" sx={{ background: 'var(--paper)', color: 'var(--feature)', px: 1, py: 0.2, borderRadius: 1, fontSize: '0.75rem' }}>
                {t.example}
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>{t.desc}</Typography>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="warning" title="ARP spoofing — the flip side">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          ARP is inherently unauthenticated — any device can send a false ARP reply. <strong>ARP spoofing</strong> (or
          ARP poisoning) abuses this to redirect traffic through an attacker&apos;s machine, enabling
          man-in-the-middle attacks. Dynamic ARP Inspection (DAI) on managed switches mitigates this.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
