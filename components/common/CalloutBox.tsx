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
          bgcolor: '#f8fafc',
          borderColor: '#e2e8f0',
        };
      case 'key-concepts':
        return {
          ...baseStyles,
          p: 2,
          bgcolor: '#f5f5f5',
          borderColor: '#ddd',
          borderRadius: 1,
        };
      case 'info':
        return {
          ...baseStyles,
          bgcolor: '#e3f2fd',
          borderColor: '#2196f3',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        };
      case 'warning':
        return {
          ...baseStyles,
          bgcolor: '#fff3e0',
          borderColor: '#ff9800',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        };
      case 'success':
        return {
          ...baseStyles,
          bgcolor: '#e8f5e8',
          borderColor: '#4caf50',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        };
      default:
        return {
          ...baseStyles,
          bgcolor: '#f8fafc',
          borderColor: '#e2e8f0',
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
          sx: { color: '#1565c0', display: 'flex', alignItems: 'center', gap: 1 },
        };
      case 'warning':
        return {
          variant: 'h6' as const,
          fontWeight: 700,
          gutterBottom: true,
          sx: { color: '#e65100', display: 'flex', alignItems: 'center', gap: 1 },
        };
      case 'success':
        return {
          variant: 'h6' as const,
          fontWeight: 700,
          gutterBottom: true,
          sx: { color: '#2e7d32', display: 'flex', alignItems: 'center', gap: 1 },
        };
      default:
        return {
          variant: 'h4' as const,
          sx: { margin: '0 0 12px 0', color: '#495057' },
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