import React from 'react';
import { Box, Typography } from '@mui/material';

type VennDiagramProps = {
  leftLabel: string;
  rightLabel: string;
  leftColor?: string;
  rightColor?: string;
  overlapLabel?: string;
  width?: number;
  height?: number;
  fontSize?: number;
};

export default function VennDiagram({
  leftLabel,
  rightLabel,
  overlapLabel,
  leftColor = '#90caf9',
  rightColor = '#a5d6a7',
  width = 3000,
  height = 3000,
  fontSize = 22,
}: VennDiagramProps) {
  // Bigger circles
  const r = 110;
  const cx1 = width / 2 - r * 0.8;
  const cx2 = width / 2 + r * 0.8;
  const cy = height / 2;

  return (
    <Box sx={{ width, height, position: 'relative', mx: 'auto' }}>
      <svg width={width} height={height}>
        <circle cx={cx1} cy={cy} r={r} fill={leftColor} fillOpacity={0.6} />
        <circle cx={cx2} cy={cy} r={r} fill={rightColor} fillOpacity={0.6} />
      </svg>
      {/* Left Label */}
      <Typography
        sx={{
          position: 'absolute',
          left: cx1 - r / 2,
          top: cy - fontSize,
          width: r,
          textAlign: 'center',
          fontWeight: 600,
          fontSize,
          color: '#222',
          pointerEvents: 'none',
        }}
      >
        {leftLabel}
      </Typography>
      {/* Right Label */}
      <Typography
        sx={{
          position: 'absolute',
          left: cx2 - r / 2,
          top: cy - fontSize,
          width: r,
          textAlign: 'center',
          fontWeight: 600,
          fontSize,
          color: '#222',
          pointerEvents: 'none',
        }}
      >
        {rightLabel}
      </Typography>
      {/* Overlap Label */}
      {overlapLabel && (
        <Typography
          sx={{
            position: 'absolute',
            left: width / 2 - r / 2,
            top: cy + fontSize,
            width: r,
            textAlign: 'center',
            fontWeight: 600,
            fontSize: fontSize * 0.95,
            color: '#333',
            pointerEvents: 'none',
          }}
        >
          {overlapLabel}
        </Typography>
      )}
    </Box>
  );
}