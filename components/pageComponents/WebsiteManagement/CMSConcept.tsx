'use client';

import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function CMSConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        How a CMS Simplifies Website Development
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 5, color: 'var(--ink-soft)', textAlign: 'center' }}>
        In a website management class with students from diverse majors, a CMS levels the playing field.
      </Typography>

      {/* Comparison Section */}
      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center', mb: 5 }}>
        
        {/* Traditional Way - Without CMS */}
        <Paper 
          elevation={4}
          sx={{ 
            flex: '1 1 400px',
            maxWidth: 500,
            p: 3,
            borderRadius: 2,
            border: '3px solid var(--danger)',
            background: 'var(--danger-bg)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3, minHeight: 120 }}>
            <CodeIcon sx={{ fontSize: 60, color: 'var(--danger)', mb: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--danger)' }}>
              Without CMS
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mt: 1 }}>
              Traditional Website Development
            </Typography>
          </Box>

          {/* Code Editor Visualization */}
          <Paper 
            sx={{ 
              background: 'var(--ink)',
              p: 2,
              borderRadius: 1,
              mb: 2,
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              height: 240,
            }}
          >
            <Box sx={{ color: 'var(--ink-faint)', mb: 1 }}>
              <span style={{ color: 'var(--feature)' }}>&lt;html&gt;</span>
            </Box>
            <Box sx={{ color: 'var(--ink-faint)', mb: 1, pl: 2 }}>
              <span style={{ color: 'var(--feature)' }}>&lt;head&gt;</span>
            </Box>
            <Box sx={{ color: 'var(--ink-faint)', mb: 1, pl: 4 }}>
              <span style={{ color: 'var(--feature)' }}>&lt;title&gt;</span>
              <span style={{ color: 'var(--warning)' }}>My Page</span>
              <span style={{ color: 'var(--feature)' }}>&lt;/title&gt;</span>
            </Box>
            <Box sx={{ color: 'var(--ink-faint)', mb: 1, pl: 2 }}>
              <span style={{ color: 'var(--feature)' }}>&lt;/head&gt;</span>
            </Box>
            <Box sx={{ color: 'var(--ink-faint)', mb: 1, pl: 2 }}>
              <span style={{ color: 'var(--feature)' }}>&lt;body&gt;</span>
            </Box>
            <Box sx={{ color: 'var(--ink-faint)', mb: 1, pl: 4 }}>
              <span style={{ color: 'var(--feature)' }}>&lt;h1&gt;</span>
              <span style={{ color: 'var(--warning)' }}>Content...</span>
            </Box>
            <Box sx={{ color: 'var(--ink-faint)', pl: 4 }}>
              <span>...</span>
            </Box>
          </Paper>

          <Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mb: 2, fontWeight: 600 }}>
              Requirements:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minHeight: 80 }}>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>
                ❌ Learn HTML/CSS/JavaScript
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>
                ❌ Write code for every page
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>
                ❌ Technical knowledge required
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Arrow */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowForwardIcon sx={{ fontSize: 48, color: 'var(--info)' }} />
        </Box>

        {/* With CMS */}
        <Paper 
          elevation={4}
          sx={{ 
            flex: '1 1 400px',
            maxWidth: 500,
            p: 3,
            borderRadius: 2,
            border: '3px solid var(--success)',
            background: 'var(--success-bg)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3, minHeight: 120 }}>
            <DashboardIcon sx={{ fontSize: 60, color: 'var(--success)', mb: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--success)' }}>
              With CMS
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mt: 1 }}>
              User-Friendly Interface
            </Typography>
          </Box>

          {/* CMS Dashboard Visualization */}
          <Paper 
            sx={{ 
              background: 'white',
              border: '2px solid var(--line)',
              borderRadius: 1,
              overflow: 'hidden',
              mb: 2,
              height: 240,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Dashboard Header */}
            <Box sx={{ background: 'var(--info)', p: 1.5, color: 'white' }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                📝 Edit Page
              </Typography>
            </Box>
            
            {/* Dashboard Content */}
            <Box sx={{ p: 2, flex: 1 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: 'var(--ink-soft)', fontWeight: 600 }}>
                  Page Title:
                </Typography>
                <Box sx={{ 
                  background: 'var(--paper-raised)', 
                  border: '1px solid var(--line)',
                  p: 1,
                  borderRadius: 1,
                  mt: 0.5,
                }}>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                    My Page
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: 'var(--ink-soft)', fontWeight: 600 }}>
                  Content:
                </Typography>
                <Box sx={{ 
                  background: 'var(--paper-raised)', 
                  border: '1px solid var(--line)',
                  p: 1,
                  borderRadius: 1,
                  mt: 0.5,
                  minHeight: 60,
                }}>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'var(--ink-faint)' }}>
                    Type your content here...
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ 
                background: 'var(--success)', 
                color: 'white',
                textAlign: 'center',
                py: 1,
                borderRadius: 1,
                fontWeight: 600,
              }}>
                <Typography variant="body2">
                  Publish
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mb: 2, fontWeight: 600 }}>
              Benefits:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minHeight: 80 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon sx={{ fontSize: 18, color: 'var(--success)' }} />
                <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>
                  Accessible to business, marketing, and design students
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon sx={{ fontSize: 18, color: 'var(--success)' }} />
                <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>
                  Focus on content, design, and marketing instead of primarily on coding
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon sx={{ fontSize: 18, color: 'var(--success)' }} />
                <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>
                  Build real projects quickly in class
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Summary */}
      <Paper
        sx={{
          p: 3,
          background: 'var(--info-bg)',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}>
          Why Use a CMS in This Class?
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, textAlign: 'center', color: 'var(--ink-soft)' }}>
          A CMS allows students from all majors—business, marketing, communications, and design—to 
          participate fully in website management. Instead of spending time learning to code, you can 
          focus on content strategy, user experience, and digital marketing skills that apply to any career. 
          This makes the class accessible and practical for everyone.
        </Typography>
      </Paper>
    </Box>
  );
}
