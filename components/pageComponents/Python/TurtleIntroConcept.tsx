'use client';

import { useState } from 'react';
import { Box, Slider, Stack, Typography, Alert } from '@mui/material';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '@/components/common/Section';
import TableOfContents from '@/components/common/TableOfContents';
import PythonCodeSnippet from '@/components/common/PythonCodeSnippet';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import TurtleStage from './TurtleStage';
import { DEFAULT_STATE, headingToCompass, normalizeHeading } from './turtleEngine';

export default function TurtleIntroConcept() {
  const [heading, setHeading] = useState(0);

  return (
    <ConceptWrapper
      title="Meet the Turtle"
      description="The turtle module is Python's drawing robot. You give a little turtle simple instructions — go forward, turn left — and it crawls across the screen leaving a line behind it, like a pen on paper. It ships with Python, so there's nothing to install, and it's the friendliest way to see your code actually do something."
    >
      <TableOfContents numbered>
        <Section
          title="Your First Turtle"
          subtitle="Three lines get a turtle on screen. Import the module, create a turtle, then keep the window open."
        >
          <PythonCodeSnippet
            lines={[
              { code: 'import turtle', comment: 'bring in the drawing module' },
              { code: 't = turtle.Turtle()', comment: 'create a turtle named t' },
              { code: 't.forward(100)', comment: 'crawl forward, drawing a line' },
              { code: 'turtle.done()', comment: 'keep the window open so you can see it' },
            ]}
          />
          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="body2">
              <code>t = turtle.Turtle()</code> makes one turtle and gives it the name <code>t</code>. Every
              command you'll learn is something you ask <code>t</code> to do: <code>t.forward(...)</code>,{' '}
              <code>t.left(...)</code>, and so on. <code>turtle.done()</code> goes last — without it the
              drawing window closes instantly.
            </Typography>
          </Alert>
        </Section>

        <Section
          title="The Canvas & Coordinates"
          subtitle="The turtle lives on a grid. The very middle is (0, 0) — called home. x grows to the right, y grows upward, exactly like graph paper in maths."
        >
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            <TurtleStage segments={[]} turtle={DEFAULT_STATE} showAxes showGrid={false} animate={false} />
          </Box>
          <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mt: 1.5, textAlign: 'center' }}>
            A fresh turtle starts at home <code>(0, 0)</code>, facing <strong>east</strong> (to the right).
          </Typography>
        </Section>

        <Section
          title="Which Way Is It Facing? (Heading)"
          subtitle="A turtle always faces one direction, called its heading, measured in degrees. forward() always moves along the heading — so turning first changes where forward() takes you. Drag the slider to point the turtle around."
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 3,
              alignItems: 'center',
            }}
          >
            <Box sx={{ maxWidth: 360, mx: 'auto', width: '100%' }}>
              <TurtleStage
                segments={[]}
                turtle={{ ...DEFAULT_STATE, heading }}
                showGrid
                ghost={{ length: 110 }}
                animate
              />
            </Box>
            <Stack spacing={1.5}>
              <Typography variant="caption" sx={{ color: 'var(--ink-soft)', fontWeight: 600 }}>
                HEADING — {normalizeHeading(heading)}°
              </Typography>
              <Slider
                min={0}
                max={360}
                step={15}
                value={heading}
                onChange={(_, v) => setHeading(v as number)}
                marks={[
                  { value: 0, label: '0°' },
                  { value: 90, label: '90°' },
                  { value: 180, label: '180°' },
                  { value: 270, label: '270°' },
                ]}
              />
              <ConceptInfoCard style={{ marginBottom: 0 }}>
                <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>
                  The dashed arrow shows where <code>t.forward()</code> would go.
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--accent)', mt: 0.5 }}>
                  Facing {headingToCompass(heading)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mt: 0.5 }}>
                  0° = east · 90° = north (up) · 180° = west · 270° = south. <code>t.left(90)</code> adds 90°
                  to the heading; <code>t.right(90)</code> subtracts it.
                </Typography>
              </ConceptInfoCard>
            </Stack>
          </Box>
        </Section>

        <Section
          title="The Two Things a Turtle Tracks"
          subtitle="Everything the turtle does comes down to two pieces of state. Keep these in mind and the rest of turtle makes sense."
        >
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <ConceptInfoCard style={{ marginBottom: 0 }}>
              <Typography variant="subtitle1" fontWeight={700}>
                📍 Position
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mt: 0.5 }}>
                Where it is, as <code>(x, y)</code>. Starts at <code>(0, 0)</code>. Moving changes it.
              </Typography>
            </ConceptInfoCard>
            <ConceptInfoCard style={{ marginBottom: 0 }}>
              <Typography variant="subtitle1" fontWeight={700}>
                🧭 Heading
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mt: 0.5 }}>
                The direction it faces, in degrees. Starts at <code>0°</code> (east). Turning changes it.
              </Typography>
            </ConceptInfoCard>
          </Box>
          <Alert severity="success" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Up next: <strong>Moving &amp; Turning</strong> lets you drive the turtle yourself and watch the
              Python appear as you go.
            </Typography>
          </Alert>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
