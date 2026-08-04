'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DnsIcon from '@mui/icons-material/Dns';
import PublicIcon from '@mui/icons-material/Public';
import SearchIcon from '@mui/icons-material/Search';
import ArchiveIcon from '@mui/icons-material/Archive';
import CalloutBox from '../../common/CalloutBox';

const techniques = [
  {
    token: 'info',
    icon: <DnsIcon sx={{ fontSize: 28, color: 'var(--info)' }} />,
    title: 'WHOIS Lookup',
    desc: 'Query the global registration database for a domain: registrant, registrar, name servers, registration and expiry dates. Even privacy-masked domains leak hosting and contact clues.',
    detectable: false,
  },
  {
    token: 'feature',
    icon: <DnsIcon sx={{ fontSize: 28, color: 'var(--feature)' }} />,
    title: 'DNS Record Analysis',
    desc: 'Query publicly available DNS records — A (IP addresses), MX (mail servers), NS (name servers), TXT (SPF, DKIM, verification tokens). Reveals infrastructure without sending a single packet to the target.',
    detectable: false,
  },
  {
    token: 'warning',
    icon: <SearchIcon sx={{ fontSize: 28, color: 'var(--warning)' }} />,
    title: 'Google Dorking',
    desc: 'Advanced search operators (site:, filetype:, intitle:, inurl:) surface pages and files the owner may not know are indexed: login panels, config files, exposed directories.',
    detectable: false,
  },
  {
    token: 'success',
    icon: <PublicIcon sx={{ fontSize: 28, color: 'var(--success)' }} />,
    title: 'Certificate Transparency',
    desc: 'TLS certificates are logged in public CT logs (crt.sh, censys.io). Every subdomain that has ever received a cert is visible — a complete map of internet-facing hosts.',
    detectable: false,
  },
  {
    token: 'danger',
    icon: <ArchiveIcon sx={{ fontSize: 28, color: 'var(--danger)' }} />,
    title: 'Wayback Machine / Archive',
    desc: 'Historical snapshots of a website reveal old admin portals, configuration files, employee names, and technology choices that may still be relevant.',
    detectable: false,
  },
  {
    token: 'info',
    icon: <PublicIcon sx={{ fontSize: 28, color: 'var(--info)' }} />,
    title: 'Job Postings & LinkedIn',
    desc: 'Roles advertised and employee profiles reveal the exact technologies, vendors, and products an organisation uses — directly telling an attacker what to target.',
    detectable: false,
  },
];

const passiveVsActive = [
  { aspect: 'Interaction with target', passive: 'None — only third-party and public sources', active: 'Direct — packets sent to target systems' },
  { aspect: 'Detectability', passive: 'Essentially undetectable', active: 'Logged and potentially alerted' },
  { aspect: 'Information richness', passive: 'Historical, broad, contextual', active: 'Current, precise, technical' },
  { aspect: 'Legal risk', passive: 'Minimal (accessing public data)', active: 'Requires explicit authorisation' },
];

export default function PassiveReconConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Passive Reconnaissance Techniques
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        <strong>Passive reconnaissance</strong> gathers information about a target without making any direct
        contact with its systems. Because no packets are sent to the target, this phase is virtually
        impossible to detect and can be conducted before any authorisation is required.
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, justifyContent: 'center' }}>
        <VisibilityOffIcon sx={{ color: 'var(--info)' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
          Key Passive Techniques
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 2.5,
          mb: 5,
        }}
      >
        {techniques.map((t) => (
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
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
              {t.desc}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 2 }}>
        Passive vs Active Reconnaissance
      </Typography>

      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden', mb: 4 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            background: 'var(--paper-raised)',
            p: 1.5,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)' }}>Aspect</Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--info)' }}>Passive</Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--warning)' }}>Active</Typography>
        </Box>
        {passiveVsActive.map((row, i) => (
          <Box
            key={row.aspect}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              p: 1.5,
              background: i % 2 === 0 ? 'var(--paper)' : 'var(--paper-raised)',
              borderTop: '1px solid var(--line)',
            }}
          >
            <Typography variant="body2" sx={{ color: 'var(--ink)', fontWeight: 600 }}>{row.aspect}</Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>{row.passive}</Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>{row.active}</Typography>
          </Box>
        ))}
      </Paper>

      <CalloutBox type="info" title="Start here — always">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          Professional penetration testers spend significant time on passive reconnaissance before any
          active scanning. A thorough passive phase reduces noise, makes active scans more targeted, and
          often reveals critical findings (leaked credentials, exposed admin panels) without any
          engagement with the target&apos;s defences.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
