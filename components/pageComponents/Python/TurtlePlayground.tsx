'use client';

import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Slider,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TurtleStage from './TurtleStage';
import { commandToPython, normalizeHeading, simulate, TurtleCommand } from './turtleEngine';

interface TurtlePlaygroundProps {
  showTurnButtons?: boolean;
  showPenToggle?: boolean;
  showColorPicker?: boolean;
  showSizeSlider?: boolean;
  stepDistance?: number;
}

// CSS color we paint with + the Python string a learner would actually type.
// "black" paints with --ink so the line stays visible on a dark canvas too.
const PEN_COLORS: { name: string; css: string }[] = [
  { name: 'black', css: 'var(--ink)' },
  { name: 'red', css: 'crimson' },
  { name: 'blue', css: 'royalblue' },
  { name: 'green', css: 'seagreen' },
  { name: 'orange', css: 'darkorange' },
  { name: 'purple', css: 'blueviolet' },
];

/**
 * Click buttons → the turtle moves → the equivalent Python builds up line by
 * line. The shared engine keeps the drawing and the code perfectly in sync, so
 * learners connect each action to the command that causes it.
 */
export default function TurtlePlayground({
  showTurnButtons = true,
  showPenToggle = true,
  showColorPicker = false,
  showSizeSlider = false,
  stepDistance = 50,
}: TurtlePlaygroundProps) {
  const [commands, setCommands] = useState<TurtleCommand[]>([]);
  const [size, setSize] = useState(3);

  const frames = useMemo(() => simulate(commands), [commands]);
  const last = frames[frames.length - 1];

  const add = (cmd: TurtleCommand) => setCommands((c) => [...c, cmd]);
  const undo = () => setCommands((c) => c.slice(0, -1));
  const reset = () => setCommands([]);

  const code = [
    'import turtle',
    't = turtle.Turtle()',
    '',
    ...commands.map((cmd) => commandToPython(cmd)),
    '',
    'turtle.done()',
  ].join('\n');

  const heading = normalizeHeading(last.state.heading);

  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
          gap: 2.5,
          alignItems: 'start',
        }}
      >
        {/* Canvas */}
        <Box>
          <TurtleStage segments={last.segments} turtle={last.state} animate />
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1.5 }}>
            <Chip size="small" variant="outlined" label={`position: (${Math.round(last.state.x)}, ${Math.round(last.state.y)})`} />
            <Chip size="small" variant="outlined" label={`heading: ${heading}°`} />
            <Chip
              size="small"
              variant="outlined"
              color={last.state.penDown ? 'success' : 'default'}
              label={last.state.penDown ? 'pen: down (drawing)' : 'pen: up (not drawing)'}
            />
            {showColorPicker && <Chip size="small" variant="outlined" label={`color: ${last.state.colorName}`} />}
            {showSizeSlider && <Chip size="small" variant="outlined" label={`size: ${last.state.width}`} />}
          </Stack>
        </Box>

        {/* Controls */}
        <Stack spacing={2}>
          <Box>
            <Typography variant="caption" sx={{ color: 'var(--ink-soft)', fontWeight: 600 }}>
              MOVE
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
              <Button variant="contained" size="small" onClick={() => add({ type: 'forward', value: stepDistance })}>
                Forward {stepDistance}
              </Button>
              <Button variant="outlined" size="small" onClick={() => add({ type: 'backward', value: stepDistance })}>
                Back {stepDistance}
              </Button>
            </Stack>
          </Box>

          {showTurnButtons && (
            <Box>
              <Typography variant="caption" sx={{ color: 'var(--ink-soft)', fontWeight: 600 }}>
                TURN
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 0.5 }} flexWrap="wrap" useFlexGap>
                <Button variant="outlined" size="small" onClick={() => add({ type: 'left', value: 90 })}>
                  Left 90°
                </Button>
                <Button variant="outlined" size="small" onClick={() => add({ type: 'right', value: 90 })}>
                  Right 90°
                </Button>
                <Button variant="outlined" size="small" onClick={() => add({ type: 'left', value: 45 })}>
                  Left 45°
                </Button>
                <Button variant="outlined" size="small" onClick={() => add({ type: 'right', value: 45 })}>
                  Right 45°
                </Button>
              </Stack>
            </Box>
          )}

          {showPenToggle && (
            <Box>
              <Typography variant="caption" sx={{ color: 'var(--ink-soft)', fontWeight: 600 }}>
                PEN
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                <Button
                  variant={last.state.penDown ? 'outlined' : 'contained'}
                  size="small"
                  disabled={!last.state.penDown}
                  onClick={() => add({ type: 'penup' })}
                >
                  Pen up
                </Button>
                <Button
                  variant={last.state.penDown ? 'contained' : 'outlined'}
                  size="small"
                  disabled={last.state.penDown}
                  onClick={() => add({ type: 'pendown' })}
                >
                  Pen down
                </Button>
              </Stack>
            </Box>
          )}

          {showColorPicker && (
            <Box>
              <Typography variant="caption" sx={{ color: 'var(--ink-soft)', fontWeight: 600 }}>
                PEN COLOR
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 0.75 }} flexWrap="wrap" useFlexGap>
                {PEN_COLORS.map((c) => (
                  <Tooltip key={c.name} title={`pencolor("${c.name}")`}>
                    <Box
                      component="button"
                      aria-label={`pen color ${c.name}`}
                      onClick={() => add({ type: 'color', value: c.name, css: c.css })}
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        cursor: 'pointer',
                        background: c.css,
                        border: last.state.colorName === c.name ? '3px solid var(--accent)' : '2px solid var(--line-strong)',
                        p: 0,
                      }}
                    />
                  </Tooltip>
                ))}
              </Stack>
            </Box>
          )}

          {showSizeSlider && (
            <Box>
              <Typography variant="caption" sx={{ color: 'var(--ink-soft)', fontWeight: 600 }}>
                PEN SIZE — {size}
              </Typography>
              <Slider
                size="small"
                min={1}
                max={12}
                value={size}
                onChange={(_, v) => setSize(v as number)}
                onChangeCommitted={(_, v) => add({ type: 'width', value: v as number })}
                sx={{ maxWidth: 200, mt: 0.5 }}
              />
            </Box>
          )}

          <Stack direction="row" spacing={1}>
            <Button size="small" color="inherit" startIcon={<UndoIcon />} onClick={undo} disabled={!commands.length}>
              Undo
            </Button>
            <Button size="small" color="inherit" startIcon={<RestartAltIcon />} onClick={reset} disabled={!commands.length}>
              Reset
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Live, in-sync Python */}
      <Box sx={{ mt: 2.5 }}>
        <Typography variant="caption" sx={{ color: 'var(--ink-soft)', fontWeight: 600 }}>
          THE PYTHON YOU JUST WROTE
        </Typography>
        <Box
          component="pre"
          sx={{
            mt: 0.5,
            mb: 0,
            p: 2,
            borderRadius: 2,
            background: 'var(--code-bg)',
            color: 'var(--code-fg)',
            fontFamily: 'monospace',
            fontSize: 14,
            lineHeight: 1.6,
            overflowX: 'auto',
            whiteSpace: 'pre',
          }}
        >
          {code}
        </Box>
      </Box>
    </Box>
  );
}
