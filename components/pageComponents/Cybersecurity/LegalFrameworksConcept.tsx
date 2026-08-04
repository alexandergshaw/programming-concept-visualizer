'use client';

import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import GavelIcon from '@mui/icons-material/Gavel';
import DescriptionIcon from '@mui/icons-material/Description';
import PolicyIcon from '@mui/icons-material/Policy';
import CalloutBox from '../../common/CalloutBox';

const laws = [
  {
    name: 'Computer Fraud and Abuse Act (CFAA)',
    country: 'USA',
    token: 'info',
    summary: 'Criminalises unauthorised access to computers and computer fraud. The most commonly cited US law in hacking prosecutions.',
    keyPoints: [
      'Covers accessing any "protected computer" without authorisation',
      'Penalties range from fines to multi-year prison sentences',
      'Applies to US citizens and systems regardless of location',
    ],
  },
  {
    name: 'Computer Misuse Act 1990',
    country: 'UK',
    token: 'feature',
    summary: 'The primary UK legislation making unauthorised access and modification of computer systems a criminal offence.',
    keyPoints: [
      'Three tiers: unauthorised access, access with intent, and unauthorised modification',
      'Amended in 2015 to include attacks on critical national infrastructure',
      'Extraterritorial reach — applies to acts carried out from abroad that affect UK systems',
    ],
  },
  {
    name: 'GDPR / Data Protection Act',
    country: 'EU / UK',
    token: 'success',
    summary: 'Governs how personal data is collected, stored, and protected. Breaches can trigger mandatory notification within 72 hours.',
    keyPoints: [
      'Requires appropriate technical and organisational security measures',
      'Fines up to €20 million or 4% of annual global turnover',
      'Data subjects have rights to access, erasure, and portability',
    ],
  },
  {
    name: 'CFAA / ECPA / State Laws',
    country: 'USA',
    token: 'warning',
    summary: 'The Electronic Communications Privacy Act (ECPA) regulates interception of electronic communications, complementing the CFAA.',
    keyPoints: [
      'Wiretapping and stored communications are separately addressed',
      'Individual US states may have additional cybercrime statutes',
      'Pen test contracts must be reviewed against applicable state laws',
    ],
  },
];

const contractElements = [
  { label: 'Scope definition', desc: 'Precise list of IP addresses, domains, and systems that may be tested' },
  { label: 'Rules of engagement', desc: 'What techniques are permitted, what is explicitly forbidden, and testing time windows' },
  { label: 'Emergency contacts', desc: 'Who to call if a critical vulnerability or ongoing breach is discovered' },
  { label: 'Data handling', desc: 'How findings, credentials, and captured data are stored, transmitted, and destroyed' },
  { label: 'Liability clauses', desc: 'Who bears responsibility if testing inadvertently causes downtime or data loss' },
  { label: 'Deliverables', desc: 'Format, audience, and timeline for the final report' },
];

export default function LegalFrameworksConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Legal Frameworks for Security
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        Every ethical hacking engagement operates within a legal context. Understanding the relevant laws —
        and ensuring every test is backed by a watertight written contract — is not optional; it is the
        foundation of professional security work.
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        Key Cybercrime & Data Protection Laws
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 5 }}>
        {laws.map((law) => (
          <Paper
            key={law.name}
            elevation={2}
            sx={{ p: 3, borderRadius: 2, borderLeft: `4px solid var(--${law.token})` }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1, flexWrap: 'wrap' }}>
              <PublicIcon sx={{ color: `var(--${law.token})` }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)', flex: 1 }}>
                {law.name}
              </Typography>
              <Chip
                label={law.country}
                size="small"
                sx={{
                  fontWeight: 600,
                  background: `var(--${law.token}-bg)`,
                  color: `var(--${law.token})`,
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7, mb: 1.5 }}>
              {law.summary}
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 3, color: 'var(--ink-soft)' }}>
              {law.keyPoints.map((pt) => (
                <Box component="li" key={pt} sx={{ mb: 0.5, lineHeight: 1.6 }}>
                  <Typography variant="body2">{pt}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        ))}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
        <DescriptionIcon sx={{ color: 'var(--info)' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
          What a Pen Test Contract Must Include
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 2,
          mb: 4,
        }}
      >
        {contractElements.map((el) => (
          <Paper
            key={el.label}
            elevation={1}
            sx={{ p: 2, borderRadius: 2, background: 'var(--paper-raised)' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <PolicyIcon sx={{ fontSize: 20, color: 'var(--info)' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {el.label}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              {el.desc}
            </Typography>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="warning" title="Ignorance of the law is not a defence">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          Laws vary by country, and a test that is legal in one jurisdiction may be criminal in another.
          Always consult legal counsel before conducting cross-border assessments, and never begin work
          without a signed written agreement in hand — verbal permission will not protect you in court.
        </Typography>
      </CalloutBox>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 3, mb: 1 }}>
        <GavelIcon sx={{ color: 'var(--success)' }} />
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
          Responsible Disclosure
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
        When a vulnerability is found outside a formal engagement, responsible disclosure means notifying
        the vendor privately, giving them a reasonable time to patch (typically 90 days), and only
        publishing details afterwards. Many organisations run official bug-bounty programmes to formalise
        this process.
      </Typography>
    </Box>
  );
}
