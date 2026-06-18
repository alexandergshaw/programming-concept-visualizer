'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function WebsiteBasicsConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        How Websites Work
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 5, color: 'var(--ink-soft)', textAlign: 'center' }}>
        Three main components work together: web pages, a server, and a browser.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        
        {/* 1. Web Pages - Stylized Documents */}
        <Box sx={{ width: '100%', maxWidth: 700 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'var(--success)', textAlign: 'center' }}>
            1. Web Pages
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: 'var(--ink-soft)', textAlign: 'center' }}>
            Individual HTML files that make up a website
          </Typography>
          
          {/* Stack of styled web pages */}
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Home Page */}
            <Paper 
              elevation={4}
              sx={{ 
                width: 180, 
                height: 240,
                background: 'white',
                border: '3px solid var(--success)',
                borderRadius: 2,
                p: 2,
                position: 'relative',
              }}
            >
              {/* Browser-like header */}
              <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5 }}>
                <CircleIcon sx={{ fontSize: 10, color: 'var(--danger)' }} />
                <CircleIcon sx={{ fontSize: 10, color: 'var(--warning)' }} />
                <CircleIcon sx={{ fontSize: 10, color: 'var(--success)' }} />
              </Box>
              {/* Page content */}
              <Box sx={{ borderTop: '2px solid var(--line)', pt: 1.5 }}>
                <Typography variant="h6" sx={{ fontSize: '0.9rem', fontWeight: 700, mb: 1, color: 'var(--ink)' }}>
                  🏠 Home
                </Typography>
                <Box sx={{ height: 4, width: '80%', background: 'var(--line-strong)', mb: 0.8, borderRadius: 1 }} />
                <Box sx={{ height: 4, width: '60%', background: 'var(--line-strong)', mb: 0.8, borderRadius: 1 }} />
                <Box sx={{ height: 4, width: '70%', background: 'var(--line-strong)', mb: 1.5, borderRadius: 1 }} />
                <Box sx={{ height: 30, width: '100%', background: 'var(--success)', borderRadius: 1, mb: 0.8 }} />
                <Box sx={{ height: 4, width: '90%', background: 'var(--line-strong)', borderRadius: 1 }} />
              </Box>
            </Paper>

            {/* About Page */}
            <Paper 
              elevation={4}
              sx={{ 
                width: 180, 
                height: 240,
                background: 'white',
                border: '3px solid var(--warning)',
                borderRadius: 2,
                p: 2,
              }}
            >
              <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5 }}>
                <CircleIcon sx={{ fontSize: 10, color: 'var(--danger)' }} />
                <CircleIcon sx={{ fontSize: 10, color: 'var(--warning)' }} />
                <CircleIcon sx={{ fontSize: 10, color: 'var(--success)' }} />
              </Box>
              <Box sx={{ borderTop: '2px solid var(--line)', pt: 1.5 }}>
                <Typography variant="h6" sx={{ fontSize: '0.9rem', fontWeight: 700, mb: 1, color: 'var(--ink)' }}>
                  ℹ️ About
                </Typography>
                <Box sx={{ height: 4, width: '70%', background: 'var(--line-strong)', mb: 0.8, borderRadius: 1 }} />
                <Box sx={{ height: 4, width: '90%', background: 'var(--line-strong)', mb: 0.8, borderRadius: 1 }} />
                <Box sx={{ height: 4, width: '50%', background: 'var(--line-strong)', mb: 1.5, borderRadius: 1 }} />
                <Box sx={{ height: 30, width: '100%', background: 'var(--warning)', borderRadius: 1, mb: 0.8 }} />
                <Box sx={{ height: 4, width: '80%', background: 'var(--line-strong)', borderRadius: 1 }} />
              </Box>
            </Paper>

            {/* Contact Page */}
            <Paper 
              elevation={4}
              sx={{ 
                width: 180, 
                height: 240,
                background: 'white',
                border: '3px solid var(--feature)',
                borderRadius: 2,
                p: 2,
              }}
            >
              <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5 }}>
                <CircleIcon sx={{ fontSize: 10, color: 'var(--danger)' }} />
                <CircleIcon sx={{ fontSize: 10, color: 'var(--warning)' }} />
                <CircleIcon sx={{ fontSize: 10, color: 'var(--success)' }} />
              </Box>
              <Box sx={{ borderTop: '2px solid var(--line)', pt: 1.5 }}>
                <Typography variant="h6" sx={{ fontSize: '0.9rem', fontWeight: 700, mb: 1, color: 'var(--ink)' }}>
                  ✉️ Contact
                </Typography>
                <Box sx={{ height: 4, width: '60%', background: 'var(--line-strong)', mb: 0.8, borderRadius: 1 }} />
                <Box sx={{ height: 4, width: '85%', background: 'var(--line-strong)', mb: 0.8, borderRadius: 1 }} />
                <Box sx={{ height: 4, width: '75%', background: 'var(--line-strong)', mb: 1.5, borderRadius: 1 }} />
                <Box sx={{ height: 30, width: '100%', background: 'var(--feature)', borderRadius: 1, mb: 0.8 }} />
                <Box sx={{ height: 4, width: '70%', background: 'var(--line-strong)', borderRadius: 1 }} />
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* Arrow Down */}
        <Box sx={{ textAlign: 'center', my: 2 }}>
          <ArrowDownwardIcon sx={{ fontSize: 40, color: 'var(--ink-soft)' }} />
          <Typography variant="body1" sx={{ color: 'var(--ink-soft)', fontWeight: 600 }}>
            Stored on
          </Typography>
          <ArrowDownwardIcon sx={{ fontSize: 40, color: 'var(--ink-soft)' }} />
        </Box>

        {/* 2. Server - Stylized Server Rack */}
        <Box sx={{ width: '100%', maxWidth: 700 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'var(--info)', textAlign: 'center' }}>
            2. Server
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: 'var(--ink-soft)', textAlign: 'center' }}>
            A powerful computer that stores and delivers web pages
          </Typography>
          
          {/* Stylized server */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper 
              elevation={6}
              sx={{ 
                width: 300,
                background: 'linear-gradient(135deg, var(--ink) 0%, var(--ink) 100%)',
                borderRadius: 2,
                p: 2,
                border: '3px solid var(--info)',
              }}
            >
              {/* Server front panel */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="caption" sx={{ color: 'var(--ink-faint)', fontFamily: 'monospace' }}>
                  SERVER-01
                </Typography>
              </Box>
              
              {/* Server bays with indicator lights */}
              {[1, 2, 3].map((bay) => (
                <Box 
                  key={bay}
                  sx={{ 
                    background: 'var(--code-bg)',
                    border: '2px solid var(--ink-soft)',
                    borderRadius: 1,
                    p: 1.5,
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <CircleIcon sx={{ fontSize: 12, color: 'var(--success)' }} />
                    <CircleIcon sx={{ fontSize: 12, color: 'var(--success)' }} />
                    <CircleIcon sx={{ fontSize: 12, color: bay === 2 ? 'var(--warning)' : 'var(--ink-soft)' }} />
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', gap: 0.5, flexDirection: 'column' }}>
                    <Box sx={{ height: 3, background: 'var(--ink-soft)', borderRadius: 1, width: '100%' }} />
                    <Box sx={{ height: 3, background: 'var(--ink-soft)', borderRadius: 1, width: '80%' }} />
                  </Box>
                  <Typography variant="caption" sx={{ color: 'var(--ink-soft)', fontFamily: 'monospace', fontSize: '0.65rem' }}>
                    {['home.html', 'about.html', 'contact.html'][bay - 1]}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Box>
        </Box>

        {/* Arrow Down */}
        <Box sx={{ textAlign: 'center', my: 2 }}>
          <ArrowDownwardIcon sx={{ fontSize: 40, color: 'var(--ink-soft)' }} />
          <Typography variant="body1" sx={{ color: 'var(--ink-soft)', fontWeight: 600 }}>
            Accessed via Internet by
          </Typography>
          <ArrowDownwardIcon sx={{ fontSize: 40, color: 'var(--ink-soft)' }} />
        </Box>

        {/* 3. Browser - Stylized Browser Window */}
        <Box sx={{ width: '100%', maxWidth: 700 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'var(--feature)', textAlign: 'center' }}>
            3. Browser
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: 'var(--ink-soft)', textAlign: 'center' }}>
            A program that requests and displays web pages (Chrome, Firefox, Safari)
          </Typography>
          
          {/* Stylized browser window */}
          <Paper 
            elevation={6}
            sx={{ 
              width: '100%',
              background: 'white',
              borderRadius: 2,
              overflow: 'hidden',
              border: '3px solid var(--feature)',
            }}
          >
            {/* Browser chrome/header */}
            <Box sx={{ background: 'var(--line)', p: 1.5, borderBottom: '2px solid var(--line-strong)' }}>
              <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                <CircleIcon sx={{ fontSize: 14, color: 'var(--danger)' }} />
                <CircleIcon sx={{ fontSize: 14, color: 'var(--warning)' }} />
                <CircleIcon sx={{ fontSize: 14, color: 'var(--success)' }} />
              </Box>
              {/* Address bar */}
              <Box 
                sx={{ 
                  background: 'white', 
                  borderRadius: 2, 
                  p: 1,
                  border: '1px solid var(--line-strong)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Typography variant="body2" sx={{ fontSize: '0.85rem', color: 'var(--ink-faint)' }}>
                  🔒
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.85rem', color: 'var(--ink-soft)', fontFamily: 'monospace' }}>
                  https://www.example.com
                </Typography>
              </Box>
            </Box>
            
            {/* Browser content area showing rendered page */}
            <Box sx={{ p: 3, minHeight: 200, background: 'white' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'var(--ink)' }}>
                🏠 Welcome to Our Website
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                This is what you see when a browser displays a web page from the server.
              </Typography>
              <Box 
                sx={{ 
                  display: 'inline-block',
                  background: 'var(--feature)', 
                  color: 'white',
                  px: 3,
                  py: 1.5,
                  borderRadius: 1,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Learn More
              </Box>
            </Box>
          </Paper>
        </Box>

      </Box>

      {/* Summary */}
      <Paper
        sx={{
          mt: 5,
          p: 3,
          background: 'var(--info-bg)',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          How They Work Together
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          <strong>Web pages</strong> are HTML files stored on a <strong>server</strong> (a powerful computer). 
          When you use a <strong>browser</strong> and type a web address, your browser requests the page 
          from the server through the internet. The server sends the page back, and your browser displays it 
          on your screen.
        </Typography>
      </Paper>
    </Box>
  );
}
