import React from 'react';
import { Box, Typography } from '@mui/material';

export interface CalloutBoxProps {
  title: string;
  children: React.ReactNode;
  type?: 'default' | 'guide' | 'key-concepts' | 'info' | 'warning' | 'success';
  icon?: React.ReactNode;
  sx?: object;
}

const CalloutBox: React.FC<CalloutBoxProps> = ({ 
  title, 
  children, 
  type = 'default', 
  icon,
  sx = {}
}) => {
  // Define styles based on type
  const getBoxStyles = () => {
    const baseStyles = {
      mt: 3,
      p: 2.5,
      borderRadius: 2,
      border: '1px solid',
    };

    switch (type) {
      case 'guide':
        return {
          ...baseStyles,
          bgcolor: 'var(--paper-sunken)',
          borderColor: 'var(--line)',
        };
      case 'key-concepts':
        return {
          ...baseStyles,
          p: 2,
          bgcolor: 'var(--accent-bg)',
          borderColor: 'var(--line-strong)',
          borderRadius: 1,
        };
      case 'info':
        return {
          ...baseStyles,
          bgcolor: 'var(--info-bg)',
          borderColor: 'var(--info)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        };
      case 'warning':
        return {
          ...baseStyles,
          bgcolor: 'var(--warning-bg)',
          borderColor: 'var(--warning)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        };
      case 'success':
        return {
          ...baseStyles,
          bgcolor: 'var(--success-bg)',
          borderColor: 'var(--success)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        };
      default:
        return {
          ...baseStyles,
          bgcolor: 'var(--paper-sunken)',
          borderColor: 'var(--line)',
        };
    }
  };

  const getTitleStyles = () => {
    switch (type) {
      case 'key-concepts':
        return {
          variant: 'h6' as const,
          fontWeight: 600,
          gutterBottom: true,
        };
      case 'info':
        return {
          variant: 'h6' as const,
          fontWeight: 700,
          gutterBottom: true,
          sx: { color: 'var(--info)', display: 'flex', alignItems: 'center', gap: 1 },
        };
      case 'warning':
        return {
          variant: 'h6' as const,
          fontWeight: 700,
          gutterBottom: true,
          sx: { color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: 1 },
        };
      case 'success':
        return {
          variant: 'h6' as const,
          fontWeight: 700,
          gutterBottom: true,
          sx: { color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 1 },
        };
      default:
        return {
          variant: 'h4' as const,
          sx: { margin: '0 0 12px 0', color: 'var(--ink-soft)' },
        };
    }
  };

  const boxStyles = getBoxStyles();
  const titleStyles = getTitleStyles();

  return (
    <Box sx={{ ...boxStyles, ...sx }}>
      <Typography {...titleStyles}>
        {icon && icon} {title}
      </Typography>
      {children}
    </Box>
  );
};

export default CalloutBox;