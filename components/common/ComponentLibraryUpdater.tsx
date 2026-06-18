'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface ButtonStyle {
  background: string;
  color: string;
  borderRadius: string;
  padding: string;
}

export default function ComponentLibraryUpdater() {
  const [buttonStyle, setButtonStyle] = useState<ButtonStyle>({
    background: 'var(--info)',
    color: 'white',
    borderRadius: '4px',
    padding: '8px 16px',
  });

  const updateColor = (color: string) => {
    setButtonStyle({ ...buttonStyle, background: color });
  };

  const updateBorderRadius = (radius: string) => {
    setButtonStyle({ ...buttonStyle, borderRadius: radius });
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Component Library Consistency Demo
      </Typography>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Library Control Panel */}
        <Box sx={{ 
          width: '300px', 
          p: 3, 
          border: '2px solid var(--info)', 
          borderRadius: 2, 
          background: 'var(--info-bg)' 
        }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: 'var(--info)' }}>
            📚 Component Library
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: 'var(--ink-soft)' }}>
            Update the Button component:
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Background Color</InputLabel>
            <Select
              value={buttonStyle.background}
              label="Background Color"
              onChange={(e) => updateColor(e.target.value)}
              size="small"
            >
              <MenuItem value="var(--info)">Blue</MenuItem>
              <MenuItem value="var(--success)">Green</MenuItem>
              <MenuItem value="var(--danger)">Red</MenuItem>
              <MenuItem value="var(--feature)">Purple</MenuItem>
              <MenuItem value="var(--warning)">Orange</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Border Radius</InputLabel>
            <Select
              value={buttonStyle.borderRadius}
              label="Border Radius"
              onChange={(e) => updateBorderRadius(e.target.value)}
              size="small"
            >
              <MenuItem value="4px">Small (4px)</MenuItem>
              <MenuItem value="8px">Medium (8px)</MenuItem>
              <MenuItem value="16px">Large (16px)</MenuItem>
              <MenuItem value="24px">Extra Large (24px)</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ 
            p: 2, 
            background: 'white', 
            borderRadius: 1, 
            border: '1px solid var(--line)' 
          }}>
            <Typography variant="caption" sx={{ display: 'block', mb: 1, color: 'var(--ink-soft)' }}>
              Button Component Code:
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                fontFamily: 'monospace', 
                fontSize: '0.75rem',
                display: 'block',
                whiteSpace: 'pre-wrap',
                color: 'var(--ink)',
              }}
            >
              {`<Button
  bg="${buttonStyle.background}"
  radius="${buttonStyle.borderRadius}"
/>`}
            </Typography>
          </Box>
        </Box>

        {/* App Preview */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            🖥️ Your App (All instances update automatically)
          </Typography>

          <Box sx={{ border: '2px solid var(--line)', borderRadius: 2, background: 'white', overflow: 'hidden' }}>
            {/* Header */}
            <Box sx={{ p: 2, background: 'var(--paper-raised)', borderBottom: '1px solid var(--line)', display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', flex: 1 }}>My Application</Typography>
              <Box
                sx={{
                  background: buttonStyle.background,
                  color: buttonStyle.color,
                  borderRadius: buttonStyle.borderRadius,
                  padding: buttonStyle.padding,
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                }}
              >
                Login
              </Box>
            </Box>

            {/* Sidebar + Main Content */}
            <Box sx={{ display: 'flex' }}>
              {/* Sidebar */}
              <Box sx={{ width: '200px', background: 'var(--paper-raised)', borderRight: '1px solid var(--line)', p: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Navigation
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {['Dashboard', 'Profile', 'Settings'].map((label) => (
                    <Box
                      key={label}
                      sx={{
                        background: buttonStyle.background,
                        color: buttonStyle.color,
                        borderRadius: buttonStyle.borderRadius,
                        padding: buttonStyle.padding,
                        textAlign: 'center',
                        fontSize: '0.85rem',
                      }}
                    >
                      {label}
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Main Content */}
              <Box sx={{ flex: 1, p: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                  User Form
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: 'var(--ink-soft)' }}>Name</Typography>
                  <Box sx={{ p: 1.5, border: '1px solid var(--line)', borderRadius: 1, background: 'var(--paper-raised)' }}>
                    <Typography variant="body2" sx={{ color: 'var(--ink-faint)' }}>Enter your name</Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: 'var(--ink-soft)' }}>Email</Typography>
                  <Box sx={{ p: 1.5, border: '1px solid var(--line)', borderRadius: 1, background: 'var(--paper-raised)' }}>
                    <Typography variant="body2" sx={{ color: 'var(--ink-faint)' }}>Enter your email</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Box
                    sx={{
                      background: buttonStyle.background,
                      color: buttonStyle.color,
                      borderRadius: buttonStyle.borderRadius,
                      padding: buttonStyle.padding,
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    Submit
                  </Box>
                  <Box
                    sx={{
                      background: 'var(--ink-soft)',
                      color: 'white',
                      borderRadius: buttonStyle.borderRadius,
                      padding: buttonStyle.padding,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Footer */}
            <Box sx={{ p: 2, background: 'var(--paper-raised)', borderTop: '1px solid var(--line)', display: 'flex', gap: 2, justifyContent: 'center' }}>
              {['Help', 'Contact', 'About'].map((label) => (
                <Box
                  key={label}
                  sx={{
                    background: buttonStyle.background,
                    color: buttonStyle.color,
                    borderRadius: buttonStyle.borderRadius,
                    padding: '6px 12px',
                    fontSize: '0.8rem',
                  }}
                >
                  {label}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 3, p: 2, background: 'var(--info-bg)', borderRadius: 1, border: '1px solid var(--info)' }}>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
          💡 Key Concept: Single Source of Truth
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>
          When you update the Button component in your library (left panel), <strong>all 10 buttons</strong> across 
          your app update instantly. No need to manually change each button! This ensures consistency and makes 
          updates easy.
        </Typography>
      </Box>
    </Box>
  );
}