'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CalloutBox from '../../common/CalloutBox';

const models = [
  {
    name: 'Net Present Value (NPV)',
    token: 'success',
    formula: 'NPV = Σ (Cash flow_t / (1 + r)^t) − Initial investment',
    desc: 'Discounts all future cash flows back to today\'s value. A positive NPV means the project is expected to create value.',
    rule: 'Accept if NPV > 0; choose highest NPV when comparing alternatives.',
  },
  {
    name: 'Internal Rate of Return (IRR)',
    token: 'info',
    formula: 'IRR = the discount rate at which NPV = 0',
    desc: 'The return rate the project is projected to generate. Compare it against the company\'s required rate (hurdle rate).',
    rule: 'Accept if IRR > hurdle rate.',
  },
  {
    name: 'Payback Period',
    token: 'warning',
    formula: 'Payback = Initial investment / Annual cash inflow',
    desc: 'The time needed to recover the initial investment from project cash flows. Simple and intuitive but ignores cash flows after payback.',
    rule: 'Accept if payback period is within the organisation\'s maximum threshold.',
  },
  {
    name: 'Return on Investment (ROI)',
    token: 'feature',
    formula: 'ROI = (Net benefit / Cost) × 100 %',
    desc: 'Expresses the benefit as a percentage of the cost. Useful for quick comparisons but does not account for time value of money.',
    rule: 'Higher ROI is better; compare to a minimum target %.',
  },
  {
    name: 'Benefit-Cost Ratio (BCR)',
    token: 'danger',
    formula: 'BCR = Present value of benefits / Present value of costs',
    desc: 'A ratio greater than 1 means benefits outweigh costs. Used heavily in public-sector projects.',
    rule: 'Accept if BCR ≥ 1; prioritise the highest BCR.',
  },
];

export default function FinancialModelsConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Financial Models for Project Evaluation
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <AccountBalanceIcon sx={{ fontSize: 56, color: 'var(--success)' }} />
      </Box>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
        Financial models convert a project proposal into numbers so decision-makers can compare
        alternatives objectively and ensure the organisation spends money wisely.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 4 }}>
        {models.map((m) => (
          <Paper key={m.name} elevation={3} sx={{ p: 2.5, borderRadius: 2, borderLeft: `4px solid var(--${m.token})` }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: `var(--${m.token})`, mb: 0.5 }}>{m.name}</Typography>
            <Paper sx={{ p: 1.5, background: 'var(--paper)', borderRadius: 1, mb: 1.5, fontFamily: 'monospace' }}>
              <Typography variant="body2" sx={{ color: 'var(--ink)', fontFamily: 'monospace' }}>{m.formula}</Typography>
            </Paper>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6, mb: 1 }}>{m.desc}</Typography>
            <Typography variant="caption" sx={{ color: `var(--${m.token})`, fontWeight: 700 }}>Decision rule: {m.rule}</Typography>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="warning" title="No model is perfect on its own">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          Each model has blind spots. NPV requires an accurate discount rate; payback period ignores
          long-term value; ROI can be manipulated by defining "benefits" loosely. Use at least two
          complementary models and combine them with qualitative judgement.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
