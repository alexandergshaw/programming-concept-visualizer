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
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: '#1e293b', textAlign: 'center' }}>
        How a CMS Simplifies Website Development
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 5, color: '#64748b', textAlign: 'center' }}>
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
            border: '3px solid #ef4444',
            background: '#fef2f2',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3, minHeight: 120 }}>
            <CodeIcon sx={{ fontSize: 60, color: '#ef4444', mb: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#ef4444' }}>
              Without CMS
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mt: 1 }}>
              Traditional Website Development
            </Typography>
          </Box>

          {/* Code Editor Visualization */}
          <Paper 
            sx={{ 
              background: '#1e293b',
              p: 2,
              borderRadius: 1,
              mb: 2,
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              height: 240,
            }}
          >
            <Box sx={{ color: '#94a3b8', mb: 1 }}>
              <span style={{ color: '#f472b6' }}>&lt;html&gt;</span>
            </Box>
            <Box sx={{ color: '#94a3b8', mb: 1, pl: 2 }}>
              <span style={{ color: '#f472b6' }}>&lt;head&gt;</span>
            </Box>
            <Box sx={{ color: '#94a3b8', mb: 1, pl: 4 }}>
              <span style={{ color: '#f472b6' }}>&lt;title&gt;</span>
              <span style={{ color: '#fbbf24' }}>My Page</span>
              <span style={{ color: '#f472b6' }}>&lt;/title&gt;</span>
            </Box>
            <Box sx={{ color: '#94a3b8', mb: 1, pl: 2 }}>
              <span style={{ color: '#f472b6' }}>&lt;/head&gt;</span>
            </Box>
            <Box sx={{ color: '#94a3b8', mb: 1, pl: 2 }}>
              <span style={{ color: '#f472b6' }}>&lt;body&gt;</span>
            </Box>
            <Box sx={{ color: '#94a3b8', mb: 1, pl: 4 }}>
              <span style={{ color: '#f472b6' }}>&lt;h1&gt;</span>
              <span style={{ color: '#fbbf24' }}>Content...</span>
            </Box>
            <Box sx={{ color: '#94a3b8', pl: 4 }}>
              <span>...</span>
            </Box>
          </Paper>

          <Box>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 2, fontWeight: 600 }}>
              Requirements:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minHeight: 80 }}>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                ❌ Learn HTML/CSS/JavaScript
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                ❌ Write code for every page
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                ❌ Technical knowledge required
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Arrow */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowForwardIcon sx={{ fontSize: 48, color: '#3b82f6' }} />
        </Box>

        {/* With CMS */}
        <Paper 
          elevation={4}
          sx={{ 
            flex: '1 1 400px',
            maxWidth: 500,
            p: 3,
            borderRadius: 2,
            border: '3px solid #10b981',
            background: '#f0fdf4',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3, minHeight: 120 }}>
            <DashboardIcon sx={{ fontSize: 60, color: '#10b981', mb: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#10b981' }}>
              With CMS
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mt: 1 }}>
              User-Friendly Interface
            </Typography>
          </Box>

          {/* CMS Dashboard Visualization */}
          <Paper 
            sx={{ 
              background: 'white',
              border: '2px solid #e5e7eb',
              borderRadius: 1,
              overflow: 'hidden',
              mb: 2,
              height: 240,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Dashboard Header */}
            <Box sx={{ background: '#3b82f6', p: 1.5, color: 'white' }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                📝 Edit Page
              </Typography>
            </Box>
            
            {/* Dashboard Content */}
            <Box sx={{ p: 2, flex: 1 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                  Page Title:
                </Typography>
                <Box sx={{ 
                  background: '#f9fafb', 
                  border: '1px solid #e5e7eb',
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
                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                  Content:
                </Typography>
                <Box sx={{ 
                  background: '#f9fafb', 
                  border: '1px solid #e5e7eb',
                  p: 1,
                  borderRadius: 1,
                  mt: 0.5,
                  minHeight: 60,
                }}>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                    Type your content here...
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ 
                background: '#10b981', 
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
            <Typography variant="body2" sx={{ color: '#64748b', mb: 2, fontWeight: 600 }}>
              Benefits:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minHeight: 80 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon sx={{ fontSize: 18, color: '#10b981' }} />
                <Typography variant="body2" sx={{ color: '#64748b' }}>
                  Accessible to business, marketing, and design students
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon sx={{ fontSize: 18, color: '#10b981' }} />
                <Typography variant="body2" sx={{ color: '#64748b' }}>
                  Focus on content, design, and marketing instead of primarily on coding
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon sx={{ fontSize: 18, color: '#10b981' }} />
                <Typography variant="body2" sx={{ color: '#64748b' }}>
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
          background: '#eff6ff',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}>
          Why Use a CMS in This Class?
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, textAlign: 'center', color: '#475569' }}>
          A CMS allows students from all majors—business, marketing, communications, and design—to 
          participate fully in website management. Instead of spending time learning to code, you can 
          focus on content strategy, user experience, and digital marketing skills that apply to any career. 
          This makes the class accessible and practical for everyone.
        </Typography>
      </Paper>
    </Box>
  );
}
