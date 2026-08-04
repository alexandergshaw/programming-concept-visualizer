'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CalloutBox from '../../common/CalloutBox';

const techniques = [
  {
    name: 'Expert Judgement',
    token: 'info',
    desc: 'Consult experienced colleagues, consultants, or industry bodies who have worked on similar projects.',
  },
  {
    name: 'Brainstorming',
    token: 'success',
    desc: 'Run a facilitated session with the project team to generate a comprehensive initial list.',
  },
  {
    name: 'Interviews',
    token: 'feature',
    desc: 'One-on-one conversations with potential stakeholders to uncover hidden interests and connections.',
  },
  {
    name: 'Questionnaires & Surveys',
    token: 'warning',
    desc: 'Distribute structured forms to large groups to gather input efficiently.',
  },
  {
    name: 'Document Analysis',
    token: 'danger',
    desc: 'Review contracts, org charts, lessons-learned registers, and previous project records.',
  },
];

const registerFields = ['Name', 'Organisation / Role', 'Contact info', 'Level of interest', 'Level of influence', 'Potential impact', 'Engagement strategy'];

export default function IdentifyingStakeholdersConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Identifying Project Stakeholders
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <PeopleAltIcon sx={{ fontSize: 56, color: 'var(--feature)' }} />
      </Box>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        Identifying stakeholders is the first step in stakeholder management. Done well, it ensures
        no one who can influence — or be influenced by — the project is overlooked.
      </Typography>

      {/* Who is a stakeholder */}
      <Paper sx={{ p: 2.5, mb: 4, borderRadius: 2, background: 'var(--info-bg)', border: '1px solid var(--info)' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)', mb: 1 }}>Who counts as a stakeholder?</Typography>
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          Anyone who <strong>affects</strong> the project or is <strong>affected by</strong> it —
          positively or negatively. This includes people inside and outside the organisation, those
          directly involved, and those who are simply impacted by the outcome.
        </Typography>
      </Paper>

      {/* Techniques */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)' }}>Identification Techniques</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 4 }}>
        {techniques.map((t) => (
          <Paper key={t.name} elevation={2} sx={{ p: 2, borderRadius: 2, borderLeft: `4px solid var(--${t.token})` }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: `var(--${t.token})`, mb: 0.5 }}>{t.name}</Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>{t.desc}</Typography>
          </Paper>
        ))}
      </Box>

      {/* Stakeholder register */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)' }}>The Stakeholder Register</Typography>
      <Paper elevation={2} sx={{ p: 2.5, borderRadius: 2, mb: 4 }}>
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mb: 2, lineHeight: 1.6 }}>
          Document every stakeholder in a register — a living record updated throughout the project.
          Typical fields include:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {registerFields.map((f) => (
            <Paper key={f} elevation={1} sx={{ px: 1.5, py: 0.8, borderRadius: 2, background: 'var(--paper)' }}>
              <Typography variant="caption" sx={{ color: 'var(--ink)', fontWeight: 600 }}>{f}</Typography>
            </Paper>
          ))}
        </Box>
      </Paper>

      <CalloutBox type="info" title="Identify early, revisit often">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          Stakeholder identification should begin during project initiation — before the scope is
          finalised. And it never really stops: new stakeholders emerge as the project progresses
          and circumstances change.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
