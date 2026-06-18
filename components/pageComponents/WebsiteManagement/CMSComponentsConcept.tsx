'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import StorageIcon from '@mui/icons-material/Storage';
import PublicIcon from '@mui/icons-material/Public';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function CMSComponentsConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        3 Basic Components of a CMS
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        
        {/* 1. Content Management Application (CMA) */}
        <Paper
          elevation={4}
          sx={{
            width: '100%',
            maxWidth: 700,
            p: 4,
            borderRadius: 2,
            border: '3px solid var(--info)',
            background: 'linear-gradient(135deg, var(--info-bg) 0%, var(--info-bg) 100%)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box
              sx={{
                background: 'var(--info)',
                borderRadius: '50%',
                width: 50,
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>
                1
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                The Editor
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mt: 0.5 }}>
                Content Management Application - CMA
              </Typography>
            </Box>
            <CreateIcon sx={{ fontSize: 60, color: 'var(--info)' }} />
          </Box>

          {/* More realistic CMS editor interface */}
          <Paper
            sx={{
              background: 'white',
              borderRadius: 1,
              border: '2px solid var(--info)',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ background: 'var(--paper-sunken)', borderBottom: '1px solid var(--line)', p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--ink)' }}>
                CMS Dashboard • Edit Page
              </Typography>
              <Box sx={{ width: 88, height: 28, borderRadius: 0.5, background: 'var(--info)' }} />
            </Box>

            <Box sx={{ display: 'flex', minHeight: 220 }}>
              <Box sx={{ width: 120, background: 'var(--paper-sunken)', borderRight: '1px solid var(--line)', p: 1 }}>
                <Box sx={{ height: 24, background: 'var(--info)', borderRadius: 0.5, mb: 1 }} />
                <Box sx={{ height: 20, background: 'var(--line-strong)', borderRadius: 0.5, mb: 1 }} />
                <Box sx={{ height: 20, background: 'var(--line-strong)', borderRadius: 0.5, mb: 1 }} />
                <Box sx={{ height: 20, background: 'var(--line-strong)', borderRadius: 0.5 }} />
              </Box>

              <Box sx={{ flex: 1, p: 2 }}>
                <Box sx={{ height: 34, background: 'var(--paper-sunken)', border: '1px solid var(--line-strong)', borderRadius: 0.5, mb: 1.5 }} />
                <Box sx={{ display: 'flex', gap: 0.75, mb: 1.5 }}>
                  <Box sx={{ width: 22, height: 22, background: 'var(--line)', borderRadius: 0.5 }} />
                  <Box sx={{ width: 22, height: 22, background: 'var(--line)', borderRadius: 0.5 }} />
                  <Box sx={{ width: 22, height: 22, background: 'var(--line)', borderRadius: 0.5 }} />
                  <Box sx={{ width: 22, height: 22, background: 'var(--line)', borderRadius: 0.5 }} />
                </Box>
                <Box sx={{ height: 110, background: 'var(--paper-sunken)', border: '1px solid var(--line-strong)', borderRadius: 0.5, mb: 1.5 }} />
                <Box sx={{ width: 110, height: 30, background: 'var(--info)', borderRadius: 0.5 }} />
              </Box>
            </Box>

            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', textAlign: 'center', fontStyle: 'italic', p: 2, borderTop: '1px solid var(--line)' }}>
              A typical CMS editor with menu, text tools, and publish controls
            </Typography>
          </Paper>
        </Paper>

        {/* Arrow Down */}
        <Box sx={{ textAlign: 'center' }}>
          <ArrowDownwardIcon sx={{ fontSize: 40, color: 'var(--ink-soft)' }} />
          <Typography variant="body2" sx={{ color: 'var(--ink-soft)', fontWeight: 600 }}>
            Stores content in
          </Typography>
          <ArrowDownwardIcon sx={{ fontSize: 40, color: 'var(--ink-soft)' }} />
        </Box>

        {/* 2. Database */}
        <Paper
          elevation={4}
          sx={{
            width: '100%',
            maxWidth: 700,
            p: 4,
            borderRadius: 2,
            border: '3px solid var(--feature)',
            background: 'linear-gradient(135deg, var(--feature-bg) 0%, var(--feature-bg) 100%)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box
              sx={{
                background: 'var(--feature)',
                borderRadius: '50%',
                width: 50,
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>
                2
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                Content Storage
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mt: 0.5 }}>
                Database
              </Typography>
            </Box>
            <StorageIcon sx={{ fontSize: 60, color: 'var(--feature)' }} />
          </Box>

          {/* More realistic database/admin table view */}
          <Paper
            sx={{
              background: 'white',
              borderRadius: 1,
              border: '2px solid var(--feature)',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ background: 'var(--feature-bg)', borderBottom: '1px solid var(--feature-bg)', p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--feature)' }}>
                content_posts table
              </Typography>
              <Box sx={{ width: 80, height: 24, background: 'var(--feature)', borderRadius: 0.5 }} />
            </Box>

            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '60px 1.6fr 100px 120px', gap: 1, mb: 1 }}>
                <Box sx={{ background: 'var(--feature-bg)', height: 26, borderRadius: 0.5 }} />
                <Box sx={{ background: 'var(--feature-bg)', height: 26, borderRadius: 0.5 }} />
                <Box sx={{ background: 'var(--feature-bg)', height: 26, borderRadius: 0.5 }} />
                <Box sx={{ background: 'var(--feature-bg)', height: 26, borderRadius: 0.5 }} />
              </Box>

              {[1, 2, 3, 4].map((row) => (
                <Box key={row} sx={{ display: 'grid', gridTemplateColumns: '60px 1.6fr 100px 120px', gap: 1, mb: 1 }}>
                  <Box sx={{ background: 'var(--feature-bg)', height: 24, borderRadius: 0.5 }} />
                  <Box sx={{ background: 'var(--feature-bg)', height: 24, borderRadius: 0.5 }} />
                  <Box sx={{ background: row % 2 === 0 ? 'var(--feature-bg)' : 'var(--feature-bg)', height: 24, borderRadius: 0.5 }} />
                  <Box sx={{ background: 'var(--feature-bg)', height: 24, borderRadius: 0.5 }} />
                </Box>
              ))}
            </Box>

            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', textAlign: 'center', fontStyle: 'italic', p: 2, borderTop: '1px solid var(--feature-bg)' }}>
              A database view storing page titles, status, and publish dates
            </Typography>
          </Paper>
        </Paper>

        {/* Arrow Down */}
        <Box sx={{ textAlign: 'center' }}>
          <ArrowDownwardIcon sx={{ fontSize: 40, color: 'var(--ink-soft)' }} />
          <Typography variant="body2" sx={{ color: 'var(--ink-soft)', fontWeight: 600 }}>
            Delivers content via
          </Typography>
          <ArrowDownwardIcon sx={{ fontSize: 40, color: 'var(--ink-soft)' }} />
        </Box>

        {/* 3. Content Delivery Application (CDA) */}
        <Paper
          elevation={4}
          sx={{
            width: '100%',
            maxWidth: 700,
            p: 4,
            borderRadius: 2,
            border: '3px solid var(--success)',
            background: 'linear-gradient(135deg, var(--success-bg) 0%, var(--success-bg) 100%)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box
              sx={{
                background: 'var(--success)',
                borderRadius: '50%',
                width: 50,
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>
                3
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                Your Live Website
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mt: 0.5 }}>
                Content Delivery Application - CDA
              </Typography>
            </Box>
            <PublicIcon sx={{ fontSize: 60, color: 'var(--success)' }} />
          </Box>

          {/* More realistic browser + live website view */}
          <Paper
            sx={{
              background: 'white',
              borderRadius: 1,
              border: '2px solid var(--success)',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ background: 'var(--success-bg)', borderBottom: '1px solid var(--success-bg)', p: 1.25 }}>
              <Box sx={{ display: 'flex', gap: 0.75, mb: 1 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--danger)' }} />
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--warning)' }} />
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--success)' }} />
              </Box>
              <Box sx={{ height: 28, background: 'white', border: '1px solid var(--success-bg)', borderRadius: 1 }} />
            </Box>

            <Box sx={{ p: 2 }}>
              <Box sx={{ height: 44, background: 'var(--success)', borderRadius: 0.5, mb: 1.5 }} />
              <Box sx={{ height: 92, background: 'var(--success-bg)', border: '1px solid var(--success-bg)', borderRadius: 0.5, mb: 1.5 }} />
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.25, mb: 1.5 }}>
                <Box sx={{ height: 62, background: 'var(--paper-sunken)', border: '1px solid var(--line)', borderRadius: 0.5 }} />
                <Box sx={{ height: 62, background: 'var(--paper-sunken)', border: '1px solid var(--line)', borderRadius: 0.5 }} />
                <Box sx={{ height: 62, background: 'var(--paper-sunken)', border: '1px solid var(--line)', borderRadius: 0.5 }} />
              </Box>
              <Box sx={{ height: 32, width: 120, background: 'var(--success)', borderRadius: 0.5 }} />
            </Box>

            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', textAlign: 'center', fontStyle: 'italic', p: 2, borderTop: '1px solid var(--success-bg)' }}>
              A live website as visitors see it in their browser
            </Typography>
          </Paper>
        </Paper>
      </Box>

    </Box>
  );
}
