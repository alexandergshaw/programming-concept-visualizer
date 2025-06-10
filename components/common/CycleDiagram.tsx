'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { useState, ReactNode, useRef, useLayoutEffect } from 'react';

export interface CycleStep {
  label: string;
  icon?: ReactNode;
  description?: string;
}

export interface CycleDiagramProps {
  steps: CycleStep[];
  size?: number; // max size in px
  color?: string;
}

export default function CycleDiagram({
  steps,
  size = 320,
  color,
}: CycleDiagramProps) {
  const theme = useTheme();
  const [hovered, setHovered] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState<number>(size);

  // Responsive: update container size on resize
  useLayoutEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        setContainerSize(Math.min(containerRef.current.offsetWidth, size));
      }
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [size]);

  if (steps.length < 2) {
    return (
      <Typography color="error">
        CycleDiagram requires at least 2 steps.
      </Typography>
    );
  }

  // Card dimensions (fixed for all steps)
  const cardWidth = 180;
  const cardHeight = 100;
  const hoverScale = 1.07;

  // Calculate minimum radius so that cards don't overlap, even when hovered
  const angleStep = (2 * Math.PI) / steps.length;
  const minArc = cardWidth * hoverScale + 12; // 12px gap
  const minRadius = minArc / (2 * Math.sin(Math.PI / steps.length));
  const maxRadius = (containerSize / 2) - cardHeight / 2 - 8;
  const radius = Math.max(minRadius, 60, Math.min(maxRadius, size / 2 - cardHeight / 2 - 8));

  // Calculate positions for each step
  const center = containerSize / 2;
  const points = steps.map((step, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    return {
      ...step,
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  });

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 3, width: '100%' }}>
        <Box
          ref={containerRef}
          sx={{
            width: '100%',
            maxWidth: size,
            minWidth: 220,
            aspectRatio: '1 / 1',
            position: 'relative',
          }}
        >
          {/* Background cycle circle */}
          <svg
            width={containerSize}
            height={containerSize}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke={color || theme.palette.primary.main}
              strokeWidth={2.5}
              fill="none"
              opacity={0.22}
            />
          </svg>
          {/* Step boxes */}
          {points.map((pt, i) => {
            const step = steps[i];
            return (
              <StepBox
                key={i}
                hovered={hovered === i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                sx={{
                  left: pt.x - cardWidth / 2,
                  top: pt.y - cardHeight / 2,
                  width: cardWidth,
                  height: cardHeight,
                  position: 'absolute',
                  zIndex: hovered === i ? 2 : 1,
                  transition: 'box-shadow 0.2s, border-color 0.2s, background 0.2s, transform 0.2s',
                  transform: hovered === i ? `scale(${hoverScale})` : 'scale(1)',
                  borderColor: hovered === i ? (color || theme.palette.primary.main) : (color || theme.palette.primary.main),
                  background: '#fff', // Use solid color when hovered
                  boxShadow: hovered === i ? theme.shadows[6] : theme.shadows[1],
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  p: 1.5,
                  minWidth: 0,
                  minHeight: 0,
                  maxWidth: '90vw',
                  maxHeight: '30vh',
                  overflow: 'hidden',
                  wordBreak: 'break-word',
                  pointerEvents: 'auto',
                }}
              >
                {step.icon && (
                  <Box sx={{ mb: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {step.icon}
                  </Box>
                )}
                <Typography fontWeight={700} fontSize={17}>
                  {step.label}
                </Typography>
              </StepBox>
            );
          })}
        </Box>
      </Box>
      {/* Ordered list below the diagram */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <ol style={{ paddingLeft: 24, margin: 0, maxWidth: 600, width: '100%' }}>
          {steps.map((step, i) => (
            <li
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                fontWeight: hovered === i ? 700 : 400,
                background: hovered === i ? (color || theme.palette.primary.main + '22') : undefined,
                color: hovered === i ? (color || theme.palette.primary.main) : undefined,
                borderRadius: 6,
                padding: '6px 10px',
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s, font-weight 0.2s',
                marginBottom: 4,
                listStylePosition: 'inside',
              }}
            >
              <span>{step.label}</span>
              {step.description && (
                <span style={{ color: hovered === i ? (color || theme.palette.primary.main) : '#555', marginLeft: 8, fontWeight: 400, fontSize: 14 }}>
                  {step.description}
                </span>
              )}
            </li>
          ))}
        </ol>
      </Box>
    </Box>
  );
}

function StepBox({
  children,
  sx,
  hovered,
  onMouseEnter,
  onMouseLeave,
}: {
  children: ReactNode;
  sx?: React.CSSProperties | Record<string, unknown>;
  hovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        bgcolor: hovered ? '#e8f5e9' : '#fff',
        border: '2px solid',
        borderColor: hovered ? '#219653' : '#219653',
        borderRadius: 2,
        fontWeight: 700,
        fontSize: 16,
        minWidth: 70,
        minHeight: 36,
        textAlign: 'center',
        boxShadow: hovered ? 4 : 1,
        position: 'absolute',
        transition: 'box-shadow 0.2s, border-color 0.2s, background 0.2s, transform 0.2s',
        transform: hovered ? 'scale(1.07)' : 'scale(1)',
        cursor: 'pointer',
        pointerEvents: 'auto',
        ...sx,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Box>
  );
}