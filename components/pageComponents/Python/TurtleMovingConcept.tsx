'use client';

import { Box, Typography, Alert } from '@mui/material';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '@/components/common/Section';
import TableOfContents from '@/components/common/TableOfContents';
import PythonCodeSnippet from '@/components/common/PythonCodeSnippet';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import TurtlePlayground from './TurtlePlayground';
import TurtleAnimation from './TurtleAnimation';
import { TurtleCommand, TurtleState } from './turtleEngine';

// The square from the worked example, as commands the animation can replay.
// Start offset so the finished square sits centred on (0, 0).
const SQUARE_START: TurtleState = {
  x: -50,
  y: -50,
  heading: 0,
  penDown: true,
  color: 'var(--accent)',
  colorName: 'black',
  width: 4,
};

const SQUARE_COMMANDS: TurtleCommand[] = [
  { type: 'forward', value: 100 },
  { type: 'left', value: 90 },
  { type: 'forward', value: 100 },
  { type: 'left', value: 90 },
  { type: 'forward', value: 100 },
  { type: 'left', value: 90 },
  { type: 'forward', value: 100 },
];

const commands = [
  {
    cmd: 't.forward(d)',
    alias: 't.fd(d)',
    what: 'Crawl forward d steps in the current direction, drawing a line.',
  },
  {
    cmd: 't.backward(d)',
    alias: 't.bk(d)',
    what: 'Crawl backward d steps without turning around.',
  },
  {
    cmd: 't.left(a)',
    alias: 't.lt(a)',
    what: 'Spin a degrees counter-clockwise. Does NOT move — only changes the heading.',
  },
  {
    cmd: 't.right(a)',
    alias: 't.rt(a)',
    what: 'Spin a degrees clockwise. Also only changes the heading.',
  },
];

export default function TurtleMovingConcept() {
  return (
    <ConceptWrapper
      title="Moving & Turning"
      description="A turtle only really does two things: it moves and it turns. forward and backward slide it along the way it's already facing; left and right spin it on the spot. Chain these four together and you can draw anything. The trick beginners miss: turning never moves the turtle — it just changes which way the next forward() will go."
    >
      <TableOfContents numbered>
        <Section
          title="The Four Core Commands"
          subtitle="Distances are in steps (pixels); angles are in degrees. Each command also has a short alias."
        >
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            {commands.map((c) => (
              <ConceptInfoCard key={c.cmd} style={{ marginBottom: 0 }}>
                <Typography sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--info)' }}>
                  {c.cmd}
                </Typography>
                <Typography variant="caption" sx={{ color: 'var(--ink-faint)', fontFamily: 'monospace' }}>
                  short form: {c.alias}
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mt: 0.75 }}>
                  {c.what}
                </Typography>
              </ConceptInfoCard>
            ))}
          </Box>
        </Section>

        <Section
          title="Drive the Turtle"
          subtitle="Click the buttons to send the turtle commands. Watch it move on the canvas and the matching Python build up underneath — every click is one line of real code. Try to draw a staircase or your initial."
        >
          <TurtlePlayground showTurnButtons showPenToggle />
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Notice that <strong>Left</strong> and <strong>Right</strong> don't move the turtle at all — the
              position chip stays the same, only the heading changes. Movement only happens on{' '}
              <strong>Forward</strong> / <strong>Back</strong>.
            </Typography>
          </Alert>
        </Section>

        <Section
          title="Worked Example: A Square"
          subtitle="A square is just 'forward, turn 90°' done four times. Press Play to watch the turtle walk each side and turn each corner, and follow along in the code beside it."
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 3,
              alignItems: 'start',
            }}
          >
            <TurtleAnimation commands={SQUARE_COMMANDS} start={SQUARE_START} showCaption />
            <PythonCodeSnippet
              lines={[
                { code: 'import turtle' },
                { code: 't = turtle.Turtle()' },
                { code: '' },
                { code: 't.forward(100)', comment: 'bottom side' },
                { code: 't.left(90)', comment: 'turn to face up' },
                { code: 't.forward(100)', comment: 'right side' },
                { code: 't.left(90)' },
                { code: 't.forward(100)', comment: 'top side' },
                { code: 't.left(90)' },
                { code: 't.forward(100)', comment: 'left side — back to start' },
                { code: '' },
                { code: 'turtle.done()' },
              ]}
            />
          </Box>
          <Alert severity="success" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Spot the repetition — <code>forward(100)</code> then <code>left(90)</code>, four times over.
              That's a strong hint a <strong>loop</strong> would be cleaner, which is exactly the next
              section: <em>Drawing Shapes with Loops</em>.
            </Typography>
          </Alert>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
