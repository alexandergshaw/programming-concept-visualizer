'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import RadarIcon from '@mui/icons-material/Radar';
import DnsIcon from '@mui/icons-material/Dns';
import TerminalIcon from '@mui/icons-material/Terminal';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import BugReportIcon from '@mui/icons-material/BugReport';
import CalloutBox from '../../common/CalloutBox';

const tools = [
  {
    token: 'info',
    icon: <NetworkCheckIcon sx={{ fontSize: 28, color: 'var(--info)' }} />,
    name: 'Nmap',
    purpose: 'Network Mapper',
    desc: 'The gold-standard tool for host discovery, port scanning, service detection, OS fingerprinting, and NSE scripting. Nearly every active recon workflow starts here.',
    keyUsage: 'nmap -sV -O -A target.com',
  },
  {
    token: 'warning',
    icon: <DnsIcon sx={{ fontSize: 28, color: 'var(--warning)' }} />,
    name: 'dig / nslookup',
    purpose: 'DNS Querying',
    desc: 'Query DNS resolvers directly to enumerate A, MX, TXT, NS records, attempt zone transfers, and identify mail infrastructure.',
    keyUsage: 'dig axfr @ns1.target.com target.com',
  },
  {
    token: 'feature',
    icon: <RadarIcon sx={{ fontSize: 28, color: 'var(--feature)' }} />,
    name: 'Nikto',
    purpose: 'Web Server Scanner',
    desc: 'Scans web servers for dangerous files, outdated software, misconfigurations, and default credentials. Leaves clear traces in access logs.',
    keyUsage: 'nikto -h https://target.com',
  },
  {
    token: 'danger',
    icon: <BugReportIcon sx={{ fontSize: 28, color: 'var(--danger)' }} />,
    name: 'Metasploit Auxiliary Modules',
    purpose: 'Multi-purpose recon',
    desc: 'Provides purpose-built scanner modules for SMB, FTP, SSH, SNMP enumeration and banner grabbing without needing to launch exploits.',
    keyUsage: 'use auxiliary/scanner/smb/smb_version',
  },
  {
    token: 'success',
    icon: <TerminalIcon sx={{ fontSize: 28, color: 'var(--success)' }} />,
    name: 'Gobuster / dirb',
    purpose: 'Directory & DNS Brute-forcing',
    desc: 'Brute-forces web directories, files, and DNS subdomains by sending crafted HTTP requests and DNS queries using wordlists.',
    keyUsage: 'gobuster dir -u https://target.com -w /usr/share/wordlists/common.txt',
  },
  {
    token: 'info',
    icon: <NetworkCheckIcon sx={{ fontSize: 28, color: 'var(--info)' }} />,
    name: 'Wireshark / tcpdump',
    purpose: 'Packet Capture & Analysis',
    desc: 'Capture and analyse live network traffic to identify protocols, services, and unencrypted data. Most useful when you have access to the local segment.',
    keyUsage: 'tcpdump -i eth0 -w capture.pcap',
  },
];

const considerations = [
  { label: 'Always stay in scope', desc: 'Active tools send packets to systems. Running them against out-of-scope targets is unauthorised access, even by accident.' },
  { label: 'Minimise noise', desc: 'Aggressive scans trigger IDS/IPS alerts and may cause service disruptions. Start with stealthy options (e.g. nmap -sS) and escalate as needed.' },
  { label: 'Log your activity', desc: 'Keep a timestamped record of every tool run and command issued. This protects you if the client claims you caused damage.' },
  { label: 'Understand detection risk', desc: 'Active recon is detectable. Coordinate with the client on whether you should try to evade detection or operate openly.' },
];

export default function ActiveReconConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Active Reconnaissance Tools
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        <strong>Active reconnaissance</strong> involves direct interaction with the target to gather
        technical information. Unlike passive techniques, active recon sends packets to the target and
        can be detected — so it requires explicit written authorisation.
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        Essential Active Recon Tools
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 2.5,
          mb: 5,
        }}
      >
        {tools.map((t) => (
          <Paper
            key={t.name}
            elevation={2}
            sx={{ p: 2.5, borderRadius: 2, borderTop: `4px solid var(--${t.token})` }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
              {t.icon}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)', lineHeight: 1.1 }}>
                  {t.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'var(--ink-soft)' }}>
                  {t.purpose}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7, mb: 1 }}>
              {t.desc}
            </Typography>
            <Box
              component="code"
              sx={{
                display: 'block',
                background: 'var(--paper-raised)',
                color: 'var(--feature)',
                p: 1,
                borderRadius: 1,
                fontSize: '0.72rem',
                wordBreak: 'break-all',
              }}
            >
              {t.keyUsage}
            </Box>
          </Paper>
        ))}
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        Professional Considerations
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
        {considerations.map((c) => (
          <Paper
            key={c.label}
            elevation={1}
            sx={{
              display: 'flex',
              gap: 2,
              p: 2,
              borderRadius: 2,
              background: 'var(--paper-raised)',
              borderLeft: '4px solid var(--warning)',
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)', minWidth: 180, flexShrink: 0 }}>
              {c.label}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              {c.desc}
            </Typography>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="info" title="Passive first, active second">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          A professional workflow completes passive reconnaissance before any active scanning. The
          information gathered passively (subdomains, IP ranges, technologies in use) makes active scans
          faster, more targeted, and less likely to cause collateral disruption.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
