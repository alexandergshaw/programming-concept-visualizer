'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RadarIcon from '@mui/icons-material/Radar';
import DnsIcon from '@mui/icons-material/Dns';
import PublicIcon from '@mui/icons-material/Public';
import WorkIcon from '@mui/icons-material/Work';
import GroupsIcon from '@mui/icons-material/Groups';
import ShieldIcon from '@mui/icons-material/Shield';
import CalloutBox from '../../common/CalloutBox';

const approaches = [
  {
    name: 'Passive Recon',
    token: 'info',
    icon: <VisibilityOffIcon sx={{ fontSize: 30, color: 'var(--info)' }} />,
    what: 'Gathering information without ever touching the target directly — only public sources are used.',
    examples: 'Search engines, social media, public records, WHOIS',
    risk: 'Almost impossible to detect',
  },
  {
    name: 'Active Recon',
    token: 'warning',
    icon: <RadarIcon sx={{ fontSize: 30, color: 'var(--warning)' }} />,
    what: 'Interacting with the target system to pull information out of it, which leaves traces in logs.',
    examples: 'Pinging hosts, DNS queries, banner grabbing',
    risk: 'Can be noticed and logged',
  },
];

const techniques = [
  {
    name: 'WHOIS Lookup',
    icon: <PublicIcon sx={{ fontSize: 26, color: 'var(--feature)' }} />,
    desc: 'Reveals who registered a domain, when, and sometimes contact details and name servers.',
  },
  {
    name: 'DNS Enumeration',
    icon: <DnsIcon sx={{ fontSize: 26, color: 'var(--feature)' }} />,
    desc: 'Maps a domain to its servers, mail hosts, and subdomains — a blueprint of the target.',
  },
  {
    name: 'Search Engine Dorking',
    icon: <TravelExploreIcon sx={{ fontSize: 26, color: 'var(--feature)' }} />,
    desc: 'Crafted queries (e.g. filetype:, site:) surface exposed files, logins, and error pages.',
  },
  {
    name: 'Social Media OSINT',
    icon: <GroupsIcon sx={{ fontSize: 26, color: 'var(--feature)' }} />,
    desc: 'Employee profiles leak roles, tech stacks, and details useful for later social engineering.',
  },
  {
    name: 'Job Postings',
    icon: <WorkIcon sx={{ fontSize: 26, color: 'var(--feature)' }} />,
    desc: 'Adverts naming specific software or versions tell an attacker exactly what to target.',
  },
  {
    name: 'Public Footprint',
    icon: <PublicIcon sx={{ fontSize: 26, color: 'var(--feature)' }} />,
    desc: 'Company sites, press releases, and code repos expose infrastructure and email formats.',
  },
];

const defenses = [
  'Limit the technical detail shared in job postings and public pages',
  'Use domain privacy so WHOIS does not expose staff contact details',
  'Train staff on what is safe to share on social media',
  'Lock down DNS zone transfers so the whole map cannot be pulled at once',
  'Periodically search for your own organisation the way an attacker would',
];

export default function FootprintingConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Footprinting &amp; Reconnaissance
      </Typography>

      <Typography variant="body1" sx={{ mb: 5, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        <strong>Footprinting</strong> is the very first phase of an attack: quietly gathering as much
        information about a target as possible. The more an attacker learns up front, the smaller and
        more accurate their later attack can be.
      </Typography>

      {/* Passive vs Active */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center', mb: 4 }}>
        {approaches.map((a) => (
          <Paper
            key={a.name}
            elevation={3}
            sx={{ flex: '1 1 380px', maxWidth: 460, p: 3, borderRadius: 2, borderTop: `4px solid var(--${a.token})` }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  background: `var(--${a.token}-bg)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: '0 0 auto',
                }}
              >
                {a.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {a.name}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6, mb: 1.5 }}>
              {a.what}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', color: 'var(--ink-soft)', mb: 0.5 }}>
              <strong style={{ color: 'var(--ink)' }}>Examples:</strong> {a.examples}
            </Typography>
            <Box
              sx={{
                mt: 1,
                px: 1.2,
                py: 0.6,
                borderRadius: 1,
                background: `var(--${a.token}-bg)`,
                color: `var(--${a.token})`,
                fontWeight: 700,
                fontSize: '0.75rem',
                alignSelf: 'flex-start',
                display: 'inline-block',
              }}
            >
              {a.risk}
            </Box>
          </Paper>
        ))}
      </Box>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Common Techniques
      </Typography>

      {/* Techniques grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 2.5,
        }}
      >
        {techniques.map((t) => (
          <Paper
            key={t.name}
            elevation={2}
            sx={{ p: 2.5, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {t.icon}
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {t.name}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              {t.desc}
            </Typography>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="success" title="Shrinking your footprint" icon={<ShieldIcon sx={{ color: 'var(--success)' }} />}>
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
