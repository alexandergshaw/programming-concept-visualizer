'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import CalloutBox from '../../common/CalloutBox';

const categories = [
  {
    title: 'Internal Stakeholders',
    token: 'info',
    items: [
      { name: 'Project Sponsor', desc: 'Provides funding and executive authority; champion of the project.' },
      { name: 'Project Manager', desc: 'Leads delivery; accountable for scope, schedule, and budget.' },
      { name: 'Project Team', desc: 'The people doing the work — developers, designers, analysts, etc.' },
      { name: 'Functional Managers', desc: 'Control resources that the project borrows from departments.' },
    ],
  },
  {
    title: 'External Stakeholders',
    token: 'feature',
    items: [
      { name: 'Customer / Client', desc: 'The person or group who will use or receive the final deliverable.' },
      { name: 'End Users', desc: 'Day-to-day users of the product; their needs drive requirements.' },
      { name: 'Suppliers & Vendors', desc: 'Provide goods or services the project depends on.' },
      { name: 'Regulators', desc: 'Government or industry bodies whose rules must be met.' },
    ],
  },
];

const steps = [
  { step: 'Brainstorm', desc: 'List anyone affected by or able to influence the project.' },
  { step: 'Categorise', desc: 'Group by internal / external and by role.' },
  { step: 'Analyse', desc: 'Assess their level of power and interest (see the Power / Interest Grid).' },
  { step: 'Document', desc: 'Record in a stakeholder register — name, role, contact, and engagement strategy.' },
];

export default function KeyStakeholdersConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Key Project Stakeholders
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <GroupsIcon sx={{ fontSize: 56, color: 'var(--feature)' }} />
      </Box>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        Identifying stakeholders early is one of the most important steps at the start of any project.
        Missing a key voice can cause scope changes, conflict, or outright failure later on.
      </Typography>

      {/* Categories */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
        {categories.map((cat) => (
          <Paper key={cat.title} elevation={3} sx={{ p: 2.5, borderRadius: 2, borderTop: `4px solid var(--${cat.token})` }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: `var(--${cat.token})`, mb: 2 }}>{cat.title}</Typography>
            {cat.items.map((item) => (
              <Box key={item.name} sx={{ mb: 1.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)' }}>{item.name}</Typography>
                <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>{item.desc}</Typography>
              </Box>
            ))}
          </Paper>
        ))}
      </Box>

      {/* Identification process */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)' }}>Identification Process</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(4, 1fr)' }, gap: 2, mb: 4 }}>
        {steps.map((s, i) => (
          <Paper key={s.step} elevation={2} sx={{ p: 2, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Box sx={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--info)', color: 'var(--paper-raised)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', flex: '0 0 auto' }}>
                {i + 1}
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)' }}>{s.step}</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>{s.desc}</Typography>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="warning" title="Stakeholders can be overlooked">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          It is easy to focus on the loudest voices. Make sure to think about people who are
          affected by the project but may not actively raise their hand — such as end users or
          neighbouring teams who share infrastructure.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
