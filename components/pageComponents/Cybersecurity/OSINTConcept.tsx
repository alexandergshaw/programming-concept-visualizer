'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DnsIcon from '@mui/icons-material/Dns';
import CodeIcon from '@mui/icons-material/Code';
import SearchIcon from '@mui/icons-material/Search';
import BusinessIcon from '@mui/icons-material/Business';
import CalloutBox from '../../common/CalloutBox';

const osintSources = [
  {
    token: 'info',
    icon: <SearchIcon sx={{ fontSize: 28, color: 'var(--info)' }} />,
    title: 'Search Engines',
    techniques: ['Google / Bing dorking (site:, filetype:, inurl:)', 'Cached page analysis', 'Image reverse search'],
    example: 'site:target.com filetype:pdf — reveals publicly accessible PDFs',
  },
  {
    token: 'feature',
    icon: <LinkedInIcon sx={{ fontSize: 28, color: 'var(--feature)' }} />,
    title: 'Social Media',
    techniques: ['LinkedIn: employee roles, tech stack mentions', 'Twitter / X: announcements, outage posts', 'GitHub: leaked credentials, internal tooling'],
    example: 'Employee posts mentioning a VPN product reveal the technology in use',
  },
  {
    token: 'warning',
    icon: <DnsIcon sx={{ fontSize: 28, color: 'var(--warning)' }} />,
    title: 'Domain & DNS Records',
    techniques: ['WHOIS registration data', 'DNS record enumeration (A, MX, NS, TXT)', 'Certificate transparency logs (crt.sh)'],
    example: 'crt.sh reveals all subdomains that have ever received a TLS certificate',
  },
  {
    token: 'danger',
    icon: <TravelExploreIcon sx={{ fontSize: 28, color: 'var(--danger)' }} />,
    title: 'Shodan / Censys',
    techniques: ['Internet-wide banner scanning databases', 'Search for exposed services by port, banner, or SSL cert', 'Identify misconfigured or outdated systems'],
    example: 'shodan.io search for org:"Target Corp" reveals all their internet-facing infrastructure',
  },
  {
    token: 'success',
    icon: <BusinessIcon sx={{ fontSize: 28, color: 'var(--success)' }} />,
    title: 'Corporate Sources',
    techniques: ['Job postings (technology stack clues)', 'Press releases and annual reports', 'Companies House / SEC filings'],
    example: 'A job ad requesting "experience with CrowdStrike Falcon" reveals their EDR product',
  },
  {
    token: 'info',
    icon: <CodeIcon sx={{ fontSize: 28, color: 'var(--info)' }} />,
    title: 'Code Repositories',
    techniques: ['GitHub / GitLab public repos', 'Search for organisation name or email domains', 'History scanning for accidentally committed secrets'],
    example: 'git log on a public repo may expose API keys that were later deleted from the latest commit',
  },
];

const tools = [
  { name: 'Maltego', desc: 'Graphical link-analysis tool; visualises relationships between domains, people, and infrastructure.' },
  { name: 'theHarvester', desc: 'Automates email, subdomain, and host discovery from public sources.' },
  { name: 'Recon-ng', desc: 'Modular web-reconnaissance framework with dozens of data-source modules.' },
  { name: 'Shodan', desc: 'Search engine for internet-connected devices; reveals open ports and service banners.' },
  { name: 'SpiderFoot', desc: 'Automated OSINT collection across 200+ sources, including dark-web monitoring.' },
];

export default function OSINTConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Open Source Intelligence Gathering (OSINT)
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        <strong>OSINT</strong> is the collection and analysis of information from publicly available sources.
        It is entirely passive — you never interact with the target&apos;s systems — yet it can reveal
        an enormous amount about an organisation&apos;s people, technology, and vulnerabilities.
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        Key OSINT Sources
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 2.5,
          mb: 5,
        }}
      >
        {osintSources.map((src) => (
          <Paper
            key={src.title}
            elevation={2}
            sx={{ p: 2.5, borderRadius: 2, borderTop: `4px solid var(--${src.token})` }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              {src.icon}
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {src.title}
              </Typography>
            </Box>
            <Box component="ul" sx={{ m: 0, pl: 3, mb: 1.5, color: 'var(--ink-soft)' }}>
              {src.techniques.map((t) => (
                <Box component="li" key={t} sx={{ mb: 0.5, lineHeight: 1.6 }}>
                  <Typography variant="body2">{t}</Typography>
                </Box>
              ))}
            </Box>
            <Typography variant="caption" sx={{ color: 'var(--ink-soft)', fontStyle: 'italic' }}>
              {src.example}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        Common OSINT Tools
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
        {tools.map((t) => (
          <Paper
            key={t.name}
            elevation={1}
            sx={{
              display: 'flex',
              gap: 2,
              p: 2,
              borderRadius: 2,
              background: 'var(--paper-raised)',
              borderLeft: '4px solid var(--info)',
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)', minWidth: 120 }}>
              {t.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              {t.desc}
            </Typography>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="success" title="Defending against OSINT">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          Organisations can reduce their OSINT exposure by using domain privacy on WHOIS, sanitising job
          postings, training staff on what to share publicly, enabling private repositories, and regularly
          auditing their own internet-facing footprint — essentially performing OSINT on themselves.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
