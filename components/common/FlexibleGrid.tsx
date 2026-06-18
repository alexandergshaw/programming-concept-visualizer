import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export interface GridItem {
  title: string;
  description: string;
  code?: string;
  titleColor?: string;
  backgroundColor?: string;
  codeBackgroundColor?: string;
}

interface FlexibleGridProps {
  items: GridItem[];
  gap?: number;
  minItems?: number;
}

/**
 * FlexibleGrid Component - Displays items in a responsive grid layout
 * 
 * Supports 1-many items with intelligent column distribution:
 * - 1 item: Single column
 * - 2 items: Two columns on desktop
 * - 3 items: Three columns on desktop  
 * - 4 items: 2x2 grid
 * - 5-6 items: Three columns on desktop
 * - 7+ items: Four columns on desktop
 * 
 * Always single column on mobile for better readability
 */
const FlexibleGrid: React.FC<FlexibleGridProps> = ({ 
  items, 
  gap = 2,
  minItems = 2
}) => {
  // Validate minimum items
  if (items.length < minItems) {
    console.warn(`FlexibleGrid: Expected at least ${minItems} items, but received ${items.length}`);
  }

  const defaultColors = [
    { 
      titleColor: 'var(--danger)', 
      backgroundColor: 'var(--danger-bg)', 
      codeBackgroundColor: 'var(--feature-bg)' 
    },
    { 
      titleColor: 'var(--warning)', 
      backgroundColor: 'var(--warning-bg)', 
      codeBackgroundColor: 'var(--warning-bg)' 
    },
    { 
      titleColor: 'var(--feature)', 
      backgroundColor: 'var(--feature-bg)', 
      codeBackgroundColor: 'var(--feature-bg)' 
    },
    { 
      titleColor: 'var(--success)', 
      backgroundColor: 'var(--success-bg)', 
      codeBackgroundColor: 'var(--success-bg)' 
    },
    { 
      titleColor: 'var(--info)', 
      backgroundColor: 'var(--info-bg)', 
      codeBackgroundColor: 'var(--info-bg)' 
    },
    { 
      titleColor: 'var(--danger)', 
      backgroundColor: 'var(--danger-bg)', 
      codeBackgroundColor: 'var(--danger-bg)' 
    },
    { 
      titleColor: 'var(--success)', 
      backgroundColor: 'var(--success)', 
      codeBackgroundColor: 'var(--success-bg)' 
    },
    { 
      titleColor: 'var(--warning)', 
      backgroundColor: 'var(--warning-bg)', 
      codeBackgroundColor: 'var(--warning-bg)' 
    }
  ];

  // Determine grid columns based on number of items
  const getGridColumns = () => {
    if (items.length === 1) return { xs: '1fr', md: '1fr' };
    if (items.length === 2) return { xs: '1fr', md: '1fr 1fr' };
    if (items.length === 3) return { xs: '1fr', md: '1fr 1fr 1fr' };
    if (items.length <= 4) return { xs: '1fr', md: '1fr 1fr' };
    if (items.length <= 6) return { xs: '1fr', md: '1fr 1fr 1fr' };
    // For more than 6 items, use 4 columns on desktop
    return { xs: '1fr', md: '1fr 1fr 1fr 1fr' };
  };

  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: getGridColumns(), 
      gap: gap, 
      mt: 2 
    }}>
      {items.map((item, index) => {
        const colors = defaultColors[index % defaultColors.length]; // Cycle through colors if more items than colors
        const titleColor = item.titleColor || colors.titleColor;
        const backgroundColor = item.backgroundColor || colors.backgroundColor;
        const codeBackgroundColor = item.codeBackgroundColor || colors.codeBackgroundColor;

        return (
          <Paper 
            key={index} 
            sx={{ 
              p: 2, 
              bgcolor: backgroundColor, 
              borderRadius: '4px' 
            }}
          >
            <Typography 
              fontWeight={600} 
              sx={{ color: titleColor, mb: 1 }}
            >
              {item.title}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ mb: item.code ? 2 : 0 }}
            >
              {item.description}
            </Typography>
            {item.code && (
              <Box sx={{ 
                bgcolor: codeBackgroundColor, 
                p: 1.5, 
                borderRadius: 1, 
                fontFamily: 'monospace', 
                fontSize: '0.75rem', 
                whiteSpace: 'pre-wrap' 
              }}>
                {item.code}
              </Box>
            )}
          </Paper>
        );
      })}
    </Box>
  );
};

export default FlexibleGrid;
export { FlexibleGrid as FourSquareGrid };