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
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: '#1e293b', textAlign: 'center' }}>
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
            border: '3px solid #3b82f6',
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box
              sx={{
                background: '#3b82f6',
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
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
                The Editor
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
                Content Management Application - CMA
              </Typography>
            </Box>
            <CreateIcon sx={{ fontSize: 60, color: '#3b82f6' }} />
          </Box>

          {/* More realistic CMS editor interface */}
          <Paper
            sx={{
              background: 'white',
              borderRadius: 1,
              border: '2px solid #3b82f6',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155' }}>
                CMS Dashboard • Edit Page
              </Typography>
              <Box sx={{ width: 88, height: 28, borderRadius: 0.5, background: '#3b82f6' }} />
            </Box>

            <Box sx={{ display: 'flex', minHeight: 220 }}>
              <Box sx={{ width: 120, background: '#f1f5f9', borderRight: '1px solid #e2e8f0', p: 1 }}>
                <Box sx={{ height: 24, background: '#3b82f6', borderRadius: 0.5, mb: 1 }} />
                <Box sx={{ height: 20, background: '#cbd5e1', borderRadius: 0.5, mb: 1 }} />
                <Box sx={{ height: 20, background: '#cbd5e1', borderRadius: 0.5, mb: 1 }} />
                <Box sx={{ height: 20, background: '#cbd5e1', borderRadius: 0.5 }} />
              </Box>

              <Box sx={{ flex: 1, p: 2 }}>
                <Box sx={{ height: 34, background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 0.5, mb: 1.5 }} />
                <Box sx={{ display: 'flex', gap: 0.75, mb: 1.5 }}>
                  <Box sx={{ width: 22, height: 22, background: '#e2e8f0', borderRadius: 0.5 }} />
                  <Box sx={{ width: 22, height: 22, background: '#e2e8f0', borderRadius: 0.5 }} />
                  <Box sx={{ width: 22, height: 22, background: '#e2e8f0', borderRadius: 0.5 }} />
                  <Box sx={{ width: 22, height: 22, background: '#e2e8f0', borderRadius: 0.5 }} />
                </Box>
                <Box sx={{ height: 110, background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 0.5, mb: 1.5 }} />
                <Box sx={{ width: 110, height: 30, background: '#3b82f6', borderRadius: 0.5 }} />
              </Box>
            </Box>

            <Typography variant="body2" sx={{ color: '#64748b', textAlign: 'center', fontStyle: 'italic', p: 2, borderTop: '1px solid #e2e8f0' }}>
              A typical CMS editor with menu, text tools, and publish controls
            </Typography>
          </Paper>
        </Paper>

        {/* Arrow Down */}
        <Box sx={{ textAlign: 'center' }}>
          <ArrowDownwardIcon sx={{ fontSize: 40, color: '#64748b' }} />
          <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
            Stores content in
          </Typography>
          <ArrowDownwardIcon sx={{ fontSize: 40, color: '#64748b' }} />
        </Box>

        {/* 2. Database */}
        <Paper
          elevation={4}
          sx={{
            width: '100%',
            maxWidth: 700,
            p: 4,
            borderRadius: 2,
            border: '3px solid #8b5cf6',
            background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box
              sx={{
                background: '#8b5cf6',
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
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
                Content Storage
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
                Database
              </Typography>
            </Box>
            <StorageIcon sx={{ fontSize: 60, color: '#8b5cf6' }} />
          </Box>

          {/* More realistic database/admin table view */}
          <Paper
            sx={{
              background: 'white',
              borderRadius: 1,
              border: '2px solid #8b5cf6',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ background: '#faf5ff', borderBottom: '1px solid #ddd6fe', p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#5b21b6' }}>
                content_posts table
              </Typography>
              <Box sx={{ width: 80, height: 24, background: '#8b5cf6', borderRadius: 0.5 }} />
            </Box>

            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '60px 1.6fr 100px 120px', gap: 1, mb: 1 }}>
                <Box sx={{ background: '#ede9fe', height: 26, borderRadius: 0.5 }} />
                <Box sx={{ background: '#ede9fe', height: 26, borderRadius: 0.5 }} />
                <Box sx={{ background: '#ede9fe', height: 26, borderRadius: 0.5 }} />
                <Box sx={{ background: '#ede9fe', height: 26, borderRadius: 0.5 }} />
              </Box>

              {[1, 2, 3, 4].map((row) => (
                <Box key={row} sx={{ display: 'grid', gridTemplateColumns: '60px 1.6fr 100px 120px', gap: 1, mb: 1 }}>
                  <Box sx={{ background: '#f5f3ff', height: 24, borderRadius: 0.5 }} />
                  <Box sx={{ background: '#f5f3ff', height: 24, borderRadius: 0.5 }} />
                  <Box sx={{ background: row % 2 === 0 ? '#ddd6fe' : '#f5f3ff', height: 24, borderRadius: 0.5 }} />
                  <Box sx={{ background: '#f5f3ff', height: 24, borderRadius: 0.5 }} />
                </Box>
              ))}
            </Box>

            <Typography variant="body2" sx={{ color: '#64748b', textAlign: 'center', fontStyle: 'italic', p: 2, borderTop: '1px solid #ede9fe' }}>
              A database view storing page titles, status, and publish dates
            </Typography>
          </Paper>
        </Paper>

        {/* Arrow Down */}
        <Box sx={{ textAlign: 'center' }}>
          <ArrowDownwardIcon sx={{ fontSize: 40, color: '#64748b' }} />
          <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
            Delivers content via
          </Typography>
          <ArrowDownwardIcon sx={{ fontSize: 40, color: '#64748b' }} />
        </Box>

        {/* 3. Content Delivery Application (CDA) */}
        <Paper
          elevation={4}
          sx={{
            width: '100%',
            maxWidth: 700,
            p: 4,
            borderRadius: 2,
            border: '3px solid #10b981',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box
              sx={{
                background: '#10b981',
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
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
                Your Live Website
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
                Content Delivery Application - CDA
              </Typography>
            </Box>
            <PublicIcon sx={{ fontSize: 60, color: '#10b981' }} />
          </Box>

          {/* More realistic browser + live website view */}
          <Paper
            sx={{
              background: 'white',
              borderRadius: 1,
              border: '2px solid #10b981',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ background: '#ecfdf5', borderBottom: '1px solid #bbf7d0', p: 1.25 }}>
              <Box sx={{ display: 'flex', gap: 0.75, mb: 1 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
              </Box>
              <Box sx={{ height: 28, background: 'white', border: '1px solid #86efac', borderRadius: 1 }} />
            </Box>

            <Box sx={{ p: 2 }}>
              <Box sx={{ height: 44, background: '#10b981', borderRadius: 0.5, mb: 1.5 }} />
              <Box sx={{ height: 92, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 0.5, mb: 1.5 }} />
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.25, mb: 1.5 }}>
                <Box sx={{ height: 62, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 0.5 }} />
                <Box sx={{ height: 62, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 0.5 }} />
                <Box sx={{ height: 62, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 0.5 }} />
              </Box>
              <Box sx={{ height: 32, width: 120, background: '#10b981', borderRadius: 0.5 }} />
            </Box>

            <Typography variant="body2" sx={{ color: '#64748b', textAlign: 'center', fontStyle: 'italic', p: 2, borderTop: '1px solid #dcfce7' }}>
              A live website as visitors see it in their browser
            </Typography>
          </Paper>
        </Paper>
      </Box>

    </Box>
  );
}
