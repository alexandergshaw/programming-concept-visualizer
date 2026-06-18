'use client';

import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const waterfallSteps = ['Requirements', 'Design', 'Build', 'Test', 'Release'];

const comparison = [
  { aspect: 'Structure', waterfall: 'One pass, phase after phase', agile: 'Short, repeating cycles (sprints)' },
  { aspect: 'Delivery', waterfall: 'Everything at the end', agile: 'A working slice every cycle' },
  { aspect: 'Change', waterfall: 'Hard and costly to change later', agile: 'Welcomes change between cycles' },
  { aspect: 'Best for', waterfall: 'Stable, well-understood requirements', agile: 'Evolving or uncertain requirements' },
];

export default function MethodologiesConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Agile vs Waterfall
      </Typography>

      <Typography variant="body1" sx={{ mb: 5, color: 'var(--ink-soft)', textAlign: 'center' }}>
        Two ways to run a project. Waterfall does each phase once, in order. Agile repeats them in small loops.
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Waterfall */}
        <Paper
          elevation={3}
          sx={{ flex: '1 1 380px', maxWidth: 460, p: 3, borderRadius: 2, borderTop: '4px solid var(--info)' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <WaterfallChartIcon sx={{ color: 'var(--info)', fontSize: 32 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
              Waterfall
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mb: 2 }}>
            Each phase finishes completely before the next one begins — like water flowing down a series of steps.
          </Typography>

          {/* Cascading steps */}
          <Box sx={{ mb: 1 }}>
            {waterfallSteps.map((step, i) => (
              <Box
                key={step}
                sx={{
                  ml: `${i * 28}px`,
                  mb: 1,
                  p: 1.2,
                  background: 'var(--info-bg)',
                  border: '1px solid var(--info)',
                  borderLeft: '4px solid var(--info)',
                  borderRadius: 1,
                  fontWeight: 600,
                  color: 'var(--info)',
                  fontSize: '0.9rem',
                }}
              >
                {i + 1}. {step}
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Agile */}
        <Paper
          elevation={3}
          sx={{ flex: '1 1 380px', maxWidth: 460, p: 3, borderRadius: 2, borderTop: '4px solid var(--success)' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <AutorenewIcon sx={{ color: 'var(--success)', fontSize: 32 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
              Agile
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mb: 2 }}>
            The same steps run in a short, repeating loop. Each loop (a &quot;sprint&quot;) ships a small working piece.
          </Typography>

          {/* Cycle */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              background: 'var(--success-bg)',
              border: '1px solid var(--success)',
              borderRadius: 2,
            }}
          >
            {['Plan', 'Build', 'Test', 'Review'].map((step, i, arr) => (
              <React.Fragment key={step}>
                <Chip
                  label={step}
                  sx={{ background: 'var(--success)', color: 'var(--paper-raised)', fontWeight: 600 }}
                />
                <AutorenewIcon
                  sx={{ fontSize: 18, color: 'var(--success)', transform: i === arr.length - 1 ? 'scaleX(-1)' : 'none' }}
                />
              </React.Fragment>
            ))}
            <Typography variant="caption" sx={{ width: '100%', textAlign: 'center', color: 'var(--success)', fontWeight: 700, mt: 1 }}>
              …then repeat
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Comparison table */}
      <Paper elevation={2} sx={{ mt: 4, borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', background: 'var(--ink)', color: 'var(--paper)' }}>
          <Box sx={{ flex: '0 0 28%', p: 1.5, fontWeight: 700 }}>Aspect</Box>
          <Box sx={{ flex: 1, p: 1.5, fontWeight: 700 }}>Waterfall</Box>
          <Box sx={{ flex: 1, p: 1.5, fontWeight: 700 }}>Agile</Box>
        </Box>
        {comparison.map((row, i) => (
          <Box
            key={row.aspect}
            sx={{ display: 'flex', background: i % 2 === 0 ? 'var(--paper-raised)' : 'var(--paper-sunken)', borderTop: '1px solid var(--line)' }}
          >
            <Box sx={{ flex: '0 0 28%', p: 1.5, fontWeight: 600, color: 'var(--ink)' }}>{row.aspect}</Box>
            <Box sx={{ flex: 1, p: 1.5, color: 'var(--ink-soft)', fontSize: '0.9rem' }}>{row.waterfall}</Box>
            <Box sx={{ flex: 1, p: 1.5, color: 'var(--ink-soft)', fontSize: '0.9rem' }}>{row.agile}</Box>
          </Box>
        ))}
      </Paper>

      {/* When to use which */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mt: 4 }}>
        <Paper sx={{ flex: '1 1 380px', p: 2.5, borderRadius: 2, background: 'var(--info-bg)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <CheckCircleIcon sx={{ color: 'var(--info)' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>Reach for Waterfall when…</Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
            the requirements are fixed and well understood up front, the work is predictable, or a contract
            requires the whole scope to be agreed before building (e.g. some hardware or compliance projects).
          </Typography>
        </Paper>
        <Paper sx={{ flex: '1 1 380px', p: 2.5, borderRadius: 2, background: 'var(--success-bg)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <CancelIcon sx={{ color: 'var(--success)' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>Reach for Agile when…</Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
            you expect the requirements to change, you want feedback from users early and often, or you&apos;d
            rather ship something small and useful now than wait months for the &quot;complete&quot; product.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
