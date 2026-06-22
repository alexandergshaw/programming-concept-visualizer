'use client';

import { Box, Typography, Alert } from '@mui/material';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '@/components/common/Section';
import TableOfContents from '@/components/common/TableOfContents';
import PythonCodeSnippet from '@/components/common/PythonCodeSnippet';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import TurtleStage from './TurtleStage';
import TurtlePlayground from './TurtlePlayground';
import { DEFAULT_STATE, Segment } from './turtleEngine';

// A small pre-baked drawing for the fill demo: a filled triangle.
const fillSegments: Segment[] = [
  { x1: -70, y1: -50, x2: 70, y2: -50, color: 'crimson', width: 3 },
  { x1: 70, y1: -50, x2: 0, y2: 70, color: 'crimson', width: 3 },
  { x1: 0, y1: 70, x2: -70, y2: -50, color: 'crimson', width: 3 },
];

export default function TurtlePenConcept() {
  return (
    <ConceptWrapper
      title="The Pen"
      description="Think of the turtle as holding a pen. By default the pen is down and touching the paper, so every move draws. But you can lift the pen to move without drawing, swap its color, make the line thicker or thinner, and even flood a shape with color. These pen controls turn plain lines into real pictures."
    >
      <TableOfContents numbered>
        <Section
          title="Pen Up, Pen Down"
          subtitle="This is the single most useful pen idea: lift the pen to reposition the turtle without leaving a trail, then put it back down to draw again. It's how you make gaps — dashed lines, separate shapes, dotted patterns."
        >
          <PythonCodeSnippet
            lines={[
              { code: 't.forward(50)', comment: 'draws a line' },
              { code: 't.penup()', comment: 'lift the pen off the paper' },
              { code: 't.forward(50)', comment: 'moves, but draws NOTHING (a gap)' },
              { code: 't.pendown()', comment: 'pen back on the paper' },
              { code: 't.forward(50)', comment: 'draws again' },
            ]}
            allowCopy={false}
          />
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              The turtle still <em>moves</em> while the pen is up — it just doesn't draw. People forget to
              call <code>pendown()</code> again and wonder why the rest of their drawing vanished.
            </Typography>
          </Alert>
        </Section>

        <Section
          title="Color & Thickness"
          subtitle="pencolor changes the line color; pensize changes how thick it is. Set them before you draw — they affect every line until you change them again."
        >
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <ConceptInfoCard style={{ marginBottom: 0 }}>
              <Typography sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--info)' }}>
                t.pencolor("red")
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mt: 0.75 }}>
                Pick a color by name (<code>"red"</code>, <code>"blue"</code>, <code>"purple"</code>) — Python
                knows hundreds.
              </Typography>
            </ConceptInfoCard>
            <ConceptInfoCard style={{ marginBottom: 0 }}>
              <Typography sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--info)' }}>
                t.pensize(5)
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mt: 0.75 }}>
                A bigger number means a thicker line. The default is <code>1</code>.
              </Typography>
            </ConceptInfoCard>
          </Box>
        </Section>

        <Section
          title="Try the Pen Yourself"
          subtitle="Now you have the full set of controls. Pick a color, drag the pen size, lift and drop the pen, and draw. The Python updates with every change — see how pencolor and pensize lines appear."
        >
          <TurtlePlayground showTurnButtons showPenToggle showColorPicker showSizeSlider />
        </Section>

        <Section
          title="Filling a Shape"
          subtitle="To color in a shape (not just its outline), call begin_fill() before you draw it and end_fill() after. The turtle remembers the path you traced and floods it with the fill color."
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 3,
              alignItems: 'center',
            }}
          >
            <Box sx={{ maxWidth: 320, mx: 'auto', width: '100%', position: 'relative' }}>
              <TurtleStage
                segments={fillSegments}
                turtle={{ ...DEFAULT_STATE, x: -70, y: -50, heading: 0 }}
                showGrid={false}
                animate={false}
              />
              <Box
                component="svg"
                viewBox="0 0 440 340"
                sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
              >
                {/* matching filled triangle overlay (screen coords: cx=220, cy=170, y flipped) */}
                <polygon points="150,220 290,220 220,100" fill="var(--warning)" opacity={0.55} />
              </Box>
            </Box>
            <PythonCodeSnippet
              lines={[
                { code: 't.fillcolor("orange")', comment: 'the color to flood with' },
                { code: 't.begin_fill()', comment: 'start remembering the path' },
                { code: 't.forward(140)' },
                { code: 't.left(120)' },
                { code: 't.forward(140)' },
                { code: 't.left(120)' },
                { code: 't.forward(140)' },
                { code: 't.end_fill()', comment: 'flood the traced shape' },
              ]}
              allowCopy={false}
            />
          </Box>
          <Alert severity="success" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <code>pencolor</code> sets the <em>outline</em>; <code>fillcolor</code> sets the{' '}
              <em>inside</em>. The fill only happens between <code>begin_fill()</code> and{' '}
              <code>end_fill()</code>.
            </Typography>
          </Alert>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
