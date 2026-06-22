'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, Button, Slider, Stack, Typography, Alert } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '@/components/common/Section';
import TableOfContents from '@/components/common/TableOfContents';
import PythonCodeSnippet from '@/components/common/PythonCodeSnippet';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import TurtleStage from './TurtleStage';
import { simulate, TurtleCommand, TurtleState } from './turtleEngine';

const SHAPE_NAMES: Record<number, string> = {
  3: 'triangle',
  4: 'square',
  5: 'pentagon',
  6: 'hexagon',
  7: 'heptagon',
  8: 'octagon',
};

function shapeName(n: number): string {
  return SHAPE_NAMES[n] ?? `${n}-sided polygon`;
}

export default function TurtleShapesConcept() {
  const [sides, setSides] = useState(5);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  // Keep a roughly constant perimeter so every shape fits the canvas nicely.
  const { commands, sideLen, start } = useMemo(() => {
    const len = Math.round(420 / sides);
    const turn = 360 / sides;
    const apothem = len / (2 * Math.tan(Math.PI / sides));
    const cmds: TurtleCommand[] = [];
    for (let i = 0; i < sides; i++) {
      cmds.push({ type: 'forward', value: len });
      cmds.push({ type: 'left', value: Number(turn.toFixed(1)) });
    }
    // Start offset so the finished polygon is centred on (0, 0).
    const startState: TurtleState = {
      x: -len / 2,
      y: -apothem,
      heading: 0,
      penDown: true,
      color: 'var(--accent)',
      colorName: 'black',
      width: 3,
    };
    return { commands: cmds, sideLen: len, start: startState };
  }, [sides]);

  const frames = useMemo(() => simulate(commands, start), [commands, start]);

  // When the shape changes, show the finished drawing and stop any animation.
  useEffect(() => {
    setStep(frames.length - 1);
    setPlaying(false);
  }, [frames]);

  // Advance one frame at a time while playing.
  useEffect(() => {
    if (!playing) return;
    if (step >= frames.length - 1) {
      setPlaying(false);
      return;
    }
    const id = setTimeout(() => setStep((s) => s + 1), 320);
    return () => clearTimeout(id);
  }, [playing, step, frames.length]);

  const play = () => {
    setStep(0);
    setPlaying(true);
  };
  const showAll = () => {
    setPlaying(false);
    setStep(frames.length - 1);
  };

  const current = frames[Math.min(step, frames.length - 1)];
  const turnAngle = Number((360 / sides).toFixed(1));

  return (
    <ConceptWrapper
      title="Drawing Shapes with Loops"
      description="Drawing a square by hand means writing forward / turn eight times. That's tedious — and changing it into a pentagon means rewriting everything. A for loop fixes this: say the repeating step once and let Python repeat it. The whole secret to regular shapes is one rule — to close any shape, the turtle's turns must add up to a full circle, 360°."
    >
      <TableOfContents numbered>
        <Section
          title="The 360° Rule"
          subtitle="Walk all the way around any closed shape and you end up facing the way you started — a full turn of 360°. Spread that evenly across the corners and each turn is 360 ÷ (number of sides). That one formula draws every regular polygon."
        >
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
            {[
              { shape: 'Triangle', n: 3 },
              { shape: 'Square', n: 4 },
              { shape: 'Hexagon', n: 6 },
            ].map((s) => (
              <ConceptInfoCard key={s.n} style={{ marginBottom: 0 }}>
                <Typography variant="subtitle1" fontWeight={700}>
                  {s.shape}
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mt: 0.5 }}>
                  {s.n} sides → turn{' '}
                  <strong style={{ color: 'var(--info)' }}>{Number((360 / s.n).toFixed(1))}°</strong> at each
                  corner (360 ÷ {s.n}).
                </Typography>
              </ConceptInfoCard>
            ))}
          </Box>
        </Section>

        <Section
          title="Build Any Polygon"
          subtitle="Slide to choose how many sides, then press Play to watch the turtle draw it one edge at a time. The code below rebuilds itself — notice only two numbers change."
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 3,
              alignItems: 'start',
            }}
          >
            <Box>
              <TurtleStage segments={current.segments} turtle={current.state} animate={playing} />
              <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                <Button variant="contained" size="small" startIcon={<PlayArrowIcon />} onClick={play}>
                  Play
                </Button>
                <Button variant="outlined" size="small" startIcon={<RestartAltIcon />} onClick={showAll}>
                  Show finished
                </Button>
              </Stack>
            </Box>

            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" sx={{ color: 'var(--ink-soft)', fontWeight: 600 }}>
                  SIDES — {sides} ({shapeName(sides)})
                </Typography>
                <Slider
                  min={3}
                  max={10}
                  step={1}
                  marks
                  value={sides}
                  onChange={(_, v) => setSides(v as number)}
                  sx={{ maxWidth: 280 }}
                />
              </Box>
              <ConceptInfoCard style={{ marginBottom: 0 }}>
                <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>
                  Turn at each corner:
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--accent)' }}>
                  360 ÷ {sides} = {turnAngle}°
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mt: 0.5 }}>
                  Repeated {sides} times, the turns add up to {turnAngle} × {sides} = 360° — a full circle, so
                  the shape closes.
                </Typography>
              </ConceptInfoCard>
            </Stack>
          </Box>

          <Box sx={{ mt: 2.5 }}>
            <PythonCodeSnippet
              lines={[
                { code: 'import turtle' },
                { code: 't = turtle.Turtle()' },
                { code: '' },
                { code: `sides = ${sides}`, comment: shapeName(sides) },
                { code: `length = ${sideLen}` },
                { code: 'for i in range(sides):', comment: `repeat ${sides} times` },
                { code: '    t.forward(length)', comment: 'draw one side' },
                { code: '    t.left(360 / sides)', comment: `turn ${turnAngle}° at the corner` },
                { code: '' },
                { code: 'turtle.done()' },
              ]}
            />
          </Box>
        </Section>

        <Section
          title="Why the Loop Wins"
          subtitle="The loop body is the repeating step — 'draw a side, turn the corner'. range(sides) runs it the right number of times."
        >
          <Alert severity="success">
            <Typography variant="body2">
              To change the shape you change <strong>one number</strong> — <code>sides</code>. The hand-written
              version would need you to add or delete whole lines every time. This is the real payoff of
              loops: <em>say the repeating work once.</em>
            </Typography>
          </Alert>
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Push it further: wrap this in a loop that also calls <code>t.left(...)</code> between shapes and
              you get spirals and flower patterns — all from the same four movement commands.
            </Typography>
          </Alert>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
