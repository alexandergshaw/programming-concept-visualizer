'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, Button, LinearProgress, Stack, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TurtleStage from './TurtleStage';
import { simulate, TurtleCommand, TurtleState } from './turtleEngine';

interface TurtleAnimationProps {
  commands: TurtleCommand[];
  /** Starting state (position/heading/color). Defaults to a fresh turtle at home. */
  start?: TurtleState;
  showGrid?: boolean;
  showAxes?: boolean;
  /** Show a progress bar + a caption describing the command for the current step. */
  showCaption?: boolean;
  /** Milliseconds between steps while playing. */
  intervalMs?: number;
}

/**
 * Press Play and watch a fixed list of turtle commands draw themselves one step
 * at a time — the same step-through used on the "Drawing Shapes with Loops"
 * page, reusable for any worked example. Defaults to showing the finished
 * drawing; Play rewinds to the start and animates forward.
 *
 * NOTE: pass referentially-stable `commands` / `start` (module constants or
 * useMemo) — a fresh array every render restarts the animation.
 */
export default function TurtleAnimation({
  commands,
  start,
  showGrid = true,
  showAxes = false,
  showCaption = false,
  intervalMs = 600,
}: TurtleAnimationProps) {
  const frames = useMemo(() => simulate(commands, start), [commands, start]);
  const lastStep = Math.max(frames.length - 1, 0);

  const [step, setStep] = useState(lastStep);
  const [playing, setPlaying] = useState(false);

  // Reset to the finished drawing whenever the command list changes.
  useEffect(() => {
    setStep(lastStep);
    setPlaying(false);
  }, [frames, lastStep]);

  // Advance one frame at a time while playing.
  useEffect(() => {
    if (!playing) return;
    if (step >= lastStep) {
      setPlaying(false);
      return;
    }
    const id = setTimeout(() => setStep((s) => s + 1), intervalMs);
    return () => clearTimeout(id);
  }, [playing, step, lastStep, intervalMs]);

  const play = () => {
    setStep(0);
    setPlaying(true);
  };
  const showAll = () => {
    setPlaying(false);
    setStep(lastStep);
  };

  const current = frames[Math.min(step, lastStep)];
  const atEnd = step >= lastStep;

  return (
    <Box>
      <TurtleStage
        segments={current.segments}
        turtle={current.state}
        animate={playing}
        showGrid={showGrid}
        showAxes={showAxes}
      />

      {showCaption && (
        <Box sx={{ mt: 1 }}>
          <LinearProgress
            variant="determinate"
            value={lastStep ? (step / lastStep) * 100 : 0}
            sx={{ height: 6, borderRadius: 1 }}
          />
          <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mt: 0.75, minHeight: 24 }}>
            {atEnd && !playing
              ? 'Finished — press Play to watch it draw step by step.'
              : `Step ${step} of ${lastStep}: ${current.label}`}
          </Typography>
        </Box>
      )}

      <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
        <Button variant="contained" size="small" startIcon={<PlayArrowIcon />} onClick={play}>
          Play
        </Button>
        <Button variant="outlined" size="small" startIcon={<RestartAltIcon />} onClick={showAll}>
          Show finished
        </Button>
      </Stack>
    </Box>
  );
}
