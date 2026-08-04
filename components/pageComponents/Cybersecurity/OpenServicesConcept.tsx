'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import CalloutBox from '../../common/CalloutBox';

const portStates = [
  {
    state: 'Open',
    token: 'success',
    icon: <CheckCircleIcon sx={{ color: 'var(--success)', fontSize: 28 }} />,
    desc: 'An application is actively listening on this port. This is the primary target for further enumeration.',
    tcpResponse: 'SYN-ACK returned',
  },
  {
    state: 'Closed',
    token: 'danger',
    icon: <BlockIcon sx={{ color: 'var(--danger)', fontSize: 28 }} />,
    desc: 'The port is accessible (not firewalled) but no application is listening. A RST is returned immediately.',
    tcpResponse: 'RST returned',
  },
  {
    state: 'Filtered',
    token: 'warning',
    icon: <HelpOutlineIcon sx={{ color: 'var(--warning)', fontSize: 28 }} />,
    desc: 'A firewall or ACL is silently dropping packets. No response is received — Nmap times out.',
    tcpResponse: 'No response (timeout)',
  },
];

const enumerationTechniques = [
  {
    token: 'info',
    icon: <ManageSearchIcon sx={{ fontSize: 28, color: 'var(--info)' }} />,
    title: 'Banner Grabbing',
    desc: 'Connect to an open port and read the initial message sent by the service. Many servers announce their name and version in this banner.',
    tool: 'nc (netcat), curl, telnet',
    example: 'nc 192.168.1.1 22  → "SSH-2.0-OpenSSH_8.9p1 Ubuntu"',
  },
  {
    token: 'feature',
    icon: <SettingsEthernetIcon sx={{ fontSize: 28, color: 'var(--feature)' }} />,
    title: 'Service Version Detection',
    desc: 'Send crafted probes and analyse responses to identify the service, version, and sometimes the OS. More thorough than banner grabbing.',
    tool: 'Nmap -sV',
    example: '443/tcp open  https  Apache httpd 2.4.51',
  },
  {
    token: 'warning',
    icon: <ManageSearchIcon sx={{ fontSize: 28, color: 'var(--warning)' }} />,
    title: 'Protocol-Specific Enumeration',
    desc: 'Use the target protocol itself to extract information: list SMB shares, query SNMP MIBs, pull LDAP directory data, or enumerate SMTP users.',
    tool: 'enum4linux, snmpwalk, ldapsearch',
    example: 'enum4linux 192.168.1.1  → lists shares, users, groups',
  },
  {
    token: 'success',
    icon: <ManageSearchIcon sx={{ fontSize: 28, color: 'var(--success)' }} />,
    title: 'NSE Scripts (Nmap)',
    desc: 'The Nmap Scripting Engine runs purpose-built Lua scripts against open ports to enumerate service details, check for known vulnerabilities, or brute-force defaults.',
    tool: 'Nmap --script',
    example: 'nmap --script http-title,http-server-header target',
  },
];

const commonServices = [
  { port: '21', service: 'FTP', risk: 'Often allows anonymous login; cleartext credentials' },
  { port: '22', service: 'SSH', risk: 'Version reveals patchable CVEs; brute-force target' },
  { port: '23', service: 'Telnet', risk: 'Cleartext — all traffic readable on the wire' },
  { port: '25', service: 'SMTP', risk: 'User enumeration via VRFY/EXPN; mail relay abuse' },
  { port: '80/443', service: 'HTTP/HTTPS', risk: 'Largest web attack surface' },
  { port: '445', service: 'SMB', risk: 'EternalBlue family; network share enumeration' },
  { port: '3306', service: 'MySQL', risk: 'Exposed DB — brute-force and injection path' },
  { port: '3389', service: 'RDP', risk: 'BlueKeep and similar CVEs; brute-force' },
];

export default function OpenServicesConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Identifying Open Services
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        An open port is a doorway. <strong>Service enumeration</strong> looks through that doorway to
        identify exactly what is running, what version it is, and what attack surface it presents.
        This phase bridges host discovery and vulnerability assessment.
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        Port States
      </Typography>

      <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap', justifyContent: 'center', mb: 5 }}>
        {portStates.map((s) => (
          <Paper
            key={s.state}
            elevation={2}
            sx={{
              flex: '1 1 220px',
              maxWidth: 300,
              p: 2.5,
              borderRadius: 2,
              borderTop: `4px solid var(--${s.token})`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              {s.icon}
              <Typography variant="h6" sx={{ fontWeight: 700, color: `var(--${s.token})` }}>
                {s.state}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7, mb: 1 }}>
              {s.desc}
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--ink-soft)' }}>
              <strong style={{ color: 'var(--ink)' }}>TCP: </strong>{s.tcpResponse}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        Service Enumeration Techniques
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2.5,
          mb: 5,
        }}
      >
        {enumerationTechniques.map((t) => (
          <Paper
            key={t.title}
            elevation={2}
            sx={{ p: 2.5, borderRadius: 2, borderLeft: `4px solid var(--${t.token})` }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              {t.icon}
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {t.title}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7, mb: 1 }}>
              {t.desc}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', color: 'var(--ink-soft)', mb: 0.5 }}>
              <strong style={{ color: 'var(--ink)' }}>Tool: </strong>{t.tool}
            </Typography>
            <Box
              component="code"
              sx={{
                display: 'block',
                background: 'var(--paper-raised)',
                color: 'var(--feature)',
                p: 0.8,
                borderRadius: 1,
                fontSize: '0.72rem',
                wordBreak: 'break-all',
              }}
            >
              {t.example}
            </Box>
          </Paper>
        ))}
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        High-Value Ports & Their Risks
      </Typography>

      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden', mb: 4 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr 2fr',
            background: 'var(--paper-raised)',
            p: 1.5,
            borderBottom: '1px solid var(--line)',
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)' }}>Port</Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)' }}>Service</Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)' }}>Risk</Typography>
        </Box>
        {commonServices.map((row, i) => (
          <Box
            key={row.port}
            sx={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr 2fr',
              p: 1.5,
              background: i % 2 === 0 ? 'var(--paper)' : 'var(--paper-raised)',
              borderTop: '1px solid var(--line)',
            }}
          >
            <Typography variant="body2" sx={{ color: 'var(--feature)', fontWeight: 700, fontFamily: 'monospace' }}>
              {row.port}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink)', fontWeight: 600 }}>
              {row.service}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>
              {row.risk}
            </Typography>
          </Box>
        ))}
      </Paper>

      <CalloutBox type="warning" title="Enumeration leaves traces">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          Service version detection sends multiple crafted probes. This generates entries in access logs
          and may trigger IDS signatures. Coordinate with the client about whether stealth is required,
          and always document which commands you ran and when.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
