'use client';

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import '../../../styles/dataStructures.css';

type Complexity = {
  label: string;
  plain: string;
  color: string;
  steps: (n: number) => number;
  analogy: string;
};

const COMPLEXITIES: Complexity[] = [
  { label: 'O(1)', plain: 'Constant', color: '#22c55e', steps: () => 1, analogy: 'Grabbing the first item — instant.' },
  { label: 'O(log n)', plain: 'Logarithmic', color: '#14b8a6', steps: (n) => Math.max(1, Math.ceil(Math.log2(n))), analogy: 'Halving a sorted list (binary search).' },
  { label: 'O(n)', plain: 'Linear', color: '#3b82f6', steps: (n) => n, analogy: 'Reading every page once.' },
  { label: 'O(n log n)', plain: 'Linearithmic', color: '#f59e0b', steps: (n) => Math.max(1, Math.round(n * Math.log2(Math.max(2, n)))), analogy: 'The good sorting algorithms.' },
  { label: 'O(n²)', plain: 'Quadratic', color: '#ef4444', steps: (n) => n * n, analogy: 'Everyone shaking hands with everyone.' },
];

const SCALE_PRESETS = [
  { label: '10', value: 10 },
  { label: '100', value: 100 },
  { label: '10,000', value: 10000 },
  { label: '1,000,000', value: 1000000 },
];

function fmt(x: number): string {
  return Math.round(x).toLocaleString();
}

export default function AlgorithmAnalysisConcept() {
  const [n, setN] = useState(16);
  const [scaleN, setScaleN] = useState(100);

  const results = COMPLEXITIES.map((c) => ({ ...c, value: c.steps(n) }));
  const max = Math.max(...results.map((r) => r.value));

  return (
    <ConceptWrapper
      title="Algorithm Analysis & Design"
      description="An algorithm is a recipe of steps. Analysis is how we judge whether it stays fast."
    >
      <TableOfContents numbered>
        {/* 1 ----------------------------------------------------------------- */}
        <Section title="The Big Idea">
          <CalloutBox title="Gentle, or explode?" type="key-concepts">
            <Typography variant="body2">
              An algorithm is a recipe — a set of steps. The one question that matters: <strong>as the data gets bigger, does the work grow gently, or explode?</strong>
            </Typography>
          </CalloutBox>

          <div className="ds-viz" style={{ marginTop: 16 }}>
            <div className="flow">
              <span className="flow-step">Boil water</span>
              <span className="flow-arrow">&rarr;</span>
              <span className="flow-step">Add pasta</span>
              <span className="flow-arrow">&rarr;</span>
              <span className="flow-step">Wait</span>
              <span className="flow-arrow">&rarr;</span>
              <span className="flow-step">Drain</span>
            </div>
            <p className="ds-caption">A recipe is an algorithm: clear, ordered steps that always give the same result.</p>
          </div>
        </Section>

        {/* 2 ----------------------------------------------------------------- */}
        <Section title="We Measure Steps, Not Seconds">
          <Typography variant="body2" paragraph>
            Seconds depend on your computer. So instead we count <strong>how the number of steps grows</strong> as the input grows. That growth pattern gets a shorthand name: <strong>Big-O</strong>, written like <code>O(n)</code> or <code>O(n²)</code>.
          </Typography>
          <Typography variant="body2">
            Don&apos;t worry about the symbols — each one is just a name for a <em>shape</em> of growth. The visuals below show those shapes.
          </Typography>
        </Section>

        {/* 3 ----------------------------------------------------------------- */}
        <Section title="See the Shapes">
          <Typography variant="body2" paragraph>
            Drag the slider. Watch <code>O(1)</code> stay flat while <code>O(n²)</code> shoots up.
          </Typography>

          <div className="ds-viz">
            <Box sx={{ px: 1, mb: 2 }}>
              <Typography variant="body2" gutterBottom>n = {n}</Typography>
              <Slider value={n} min={1} max={64} onChange={(_, v) => setN(v as number)} valueLabelDisplay="auto" />
            </Box>

            {results.map((r) => (
              <div className="bigo-row" key={r.label}>
                <span className="bigo-label" style={{ color: r.color }}>{r.label}</span>
                <span className="bigo-track">
                  <span className="bigo-fill" style={{ width: `${Math.max(2, (r.value / max) * 100)}%`, background: r.color }}>
                    {fmt(r.value)}
                  </span>
                </span>
                <span className="bigo-steps">steps</span>
              </div>
            ))}
            <p className="ds-caption">Bars scaled to the largest. The number is the actual step count.</p>
          </div>
        </Section>

        {/* 4 ----------------------------------------------------------------- */}
        <Section title="Why It Matters at Scale">
          <Typography variant="body2" paragraph>
            The shapes barely differ for tiny inputs. Pick a big input size and the &quot;gentle vs explode&quot; gap becomes obvious.
          </Typography>

          <div className="ds-viz">
            <div className="chip-row" style={{ marginBottom: 16 }}>
              {SCALE_PRESETS.map((p) => (
                <button key={p.value} className={`select-chip ${scaleN === p.value ? 'selected' : ''}`} onClick={() => setScaleN(p.value)}>
                  n = {p.label}
                </button>
              ))}
            </div>

            {COMPLEXITIES.map((c) => (
              <Box key={c.label} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <span style={{ flexShrink: 0, background: c.color, color: '#fff', fontFamily: 'monospace', fontWeight: 700, fontSize: 13, padding: '4px 10px', borderRadius: 6, minWidth: 92, textAlign: 'center' }}>
                  {c.label}
                </span>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{fmt(c.steps(scaleN))} steps</Typography>
              </Box>
            ))}
          </div>

          <CalloutBox title="Connecting back" type="success">
            <Typography variant="body2">
              At a million items, <code>O(log n)</code> needs about 20 steps; <code>O(n²)</code> needs a trillion. <strong>Gentle vs explode</strong> — that is the whole point of analysis.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 5 ----------------------------------------------------------------- */}
        <Section title="The Shapes in Plain English">
          <div className="ds-viz">
            {COMPLEXITIES.map((c) => (
              <Box key={c.label} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.25 }}>
                <span style={{ flexShrink: 0, background: c.color, color: '#fff', fontFamily: 'monospace', fontWeight: 700, fontSize: 13, padding: '4px 10px', borderRadius: 6, minWidth: 92, textAlign: 'center' }}>
                  {c.label}
                </span>
                <Typography variant="body2"><strong>{c.plain}.</strong> {c.analogy}</Typography>
              </Box>
            ))}
          </div>

          <CalloutBox title="And the design part?" type="info">
            <Typography variant="body2">
              <strong>Design</strong> is choosing a strategy that keeps the shape gentle — often <em>divide &amp; conquer</em> (split the problem in half, like binary search) paired with the right data structure (a stack, queue, or tree).
            </Typography>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
