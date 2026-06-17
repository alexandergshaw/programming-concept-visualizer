'use client';

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
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
  { label: 'O(1)', plain: 'Constant', color: '#22c55e', steps: () => 1, analogy: 'Retrieving the first item in a list — instant, regardless of list length.' },
  { label: 'O(log n)', plain: 'Logarithmic', color: '#14b8a6', steps: (n) => Math.max(1, Math.ceil(Math.log2(n))), analogy: 'Finding a word in a dictionary by repeatedly splitting it in half.' },
  { label: 'O(n)', plain: 'Linear', color: '#3b82f6', steps: (n) => n, analogy: 'Reading every page of a book once.' },
  { label: 'O(n log n)', plain: 'Linearithmic', color: '#f59e0b', steps: (n) => Math.max(1, Math.round(n * Math.log2(Math.max(2, n)))), analogy: 'The growth rate of the efficient sorting algorithms used in production.' },
  { label: 'O(n²)', plain: 'Quadratic', color: '#ef4444', steps: (n) => n * n, analogy: 'Every person in a room shaking hands with every other person.' },
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
      description="An algorithm is a step-by-step procedure for solving a problem. Analysis asks a single practical question: will this procedure remain fast as the data grows?"
    >
      <TableOfContents numbered>
        {/* 1 ----------------------------------------------------------------- */}
        <Section title="What Is an Algorithm?">
          <Typography variant="body2" paragraph>
            An <strong>algorithm</strong> is simply a precise sequence of steps for accomplishing a task. A cooking recipe is an algorithm, and so are driving directions. Given the same input, following the same steps always produces the same result.
          </Typography>

          <div className="ds-viz">
            <div className="illus-label">A recipe is an algorithm — a clear, ordered sequence of steps:</div>
            <div className="flow">
              <span className="flow-step">Boil water</span>
              <span className="flow-arrow">&rarr;</span>
              <span className="flow-step">Add pasta</span>
              <span className="flow-arrow">&rarr;</span>
              <span className="flow-step">Wait 10 minutes</span>
              <span className="flow-arrow">&rarr;</span>
              <span className="flow-step">Drain</span>
              <span className="flow-arrow">&rarr;</span>
              <span className="flow-step" style={{ background: '#dcfce7', borderColor: '#4ade80', color: '#166534' }}>Done</span>
            </div>
          </div>

          <CalloutBox title="Definition" type="info">
            <Typography variant="body2">
              An <strong>algorithm</strong> takes some input and produces a result through a defined set of steps. <strong>Analysis</strong> is the study of how much time and memory those steps require as the input grows.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 2 ----------------------------------------------------------------- */}
        <Section title="What Makes an Algorithm Good?">
          <CalloutBox title="The qualities of a good algorithm" type="key-concepts">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Correct</strong> — it produces the right result every time.</Typography>
              <Typography variant="body2"><strong>Clear</strong> — each step is unambiguous.</Typography>
              <Typography variant="body2"><strong>Finite</strong> — it always terminates rather than running forever.</Typography>
              <Typography variant="body2"><strong>Efficient</strong> — it avoids wasting time and memory.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        {/* 3 ----------------------------------------------------------------- */}
        <Section title="Measuring Speed Without a Stopwatch">
          <Typography variant="body2" paragraph>
            How do we say one algorithm is faster than another? Not in seconds — that depends on the specific machine, what else it is running, and many other factors. Instead, we measure <strong>how the number of steps grows as the input grows</strong>.
          </Typography>
          <Typography variant="body2" paragraph>
            The question this answers is straightforward:
          </Typography>

          <CalloutBox title="The central question of analysis" type="info">
            <Typography variant="body2">
              If the input becomes ten times larger, does the algorithm become slightly slower, or dramatically slower?
            </Typography>
          </CalloutBox>

          <Typography variant="body2" paragraph sx={{ mt: 2 }}>
            That growth rate is given a shorthand label called <strong>Big-O notation</strong>, written as <code>O(n)</code>, <code>O(n²)</code>, and so on. Each label is simply a name for a <em>shape</em> of growth, which the visualizations below make concrete.
          </Typography>
        </Section>

        {/* 4 ----------------------------------------------------------------- */}
        <Section title="Compare the Growth Shapes">
          <Typography variant="body2" paragraph>
            Adjust the input size <strong>n</strong> with the slider and observe how many steps each growth rate requires. Notice that <code>O(1)</code> stays flat while <code>O(n²)</code> climbs steeply.
          </Typography>

          <div className="ds-viz">
            <Box sx={{ px: 1, mb: 2 }}>
              <Typography variant="body2" gutterBottom>
                Input size <strong>n = {n}</strong>
              </Typography>
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
            <p className="ds-caption">Bars are scaled to the largest value. The number is the actual step count at this input size.</p>
          </div>
        </Section>

        {/* 5 ----------------------------------------------------------------- */}
        <Section title="The Same Comparison at Scale">
          <Typography variant="body2" paragraph>
            Growth shapes only reveal their importance with large inputs. Choose an input size to see the exact number of steps each growth rate would require.
          </Typography>

          <div className="ds-viz">
            <div className="chip-row" style={{ marginBottom: 16 }}>
              {SCALE_PRESETS.map((p) => (
                <button
                  key={p.value}
                  className={`select-chip ${scaleN === p.value ? 'selected' : ''}`}
                  onClick={() => setScaleN(p.value)}
                >
                  n = {p.label}
                </button>
              ))}
            </div>

            {COMPLEXITIES.map((c) => (
              <Box key={c.label} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <span
                  style={{
                    flexShrink: 0,
                    background: c.color,
                    color: '#fff',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: 13,
                    padding: '4px 10px',
                    borderRadius: 6,
                    minWidth: 92,
                    textAlign: 'center',
                  }}
                >
                  {c.label}
                </span>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  {fmt(c.steps(scaleN))} steps
                </Typography>
              </Box>
            ))}
            <p className="ds-caption">
              At n = {scaleN.toLocaleString()}, the gap between O(log n) and O(n²) is the difference between instant and unusable.
            </p>
          </div>

          <CalloutBox title="Why this matters" type="success">
            <Typography variant="body2">
              At one million items, an O(log n) algorithm needs about 20 steps while an O(n²) algorithm needs a trillion. This is precisely why algorithm analysis drives real engineering decisions.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 6 ----------------------------------------------------------------- */}
        <Section title="The Common Growth Rates">
          <Typography variant="body2" paragraph>
            A small set of growth rates covers most situations. Listed from fastest to slowest, each with an everyday analogy:
          </Typography>

          <div className="ds-viz">
            {COMPLEXITIES.map((c) => (
              <Box key={c.label} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.75 }}>
                <span
                  style={{
                    flexShrink: 0,
                    background: c.color,
                    color: '#fff',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: 13,
                    padding: '4px 10px',
                    borderRadius: 6,
                    minWidth: 92,
                    textAlign: 'center',
                  }}
                >
                  {c.label}
                </span>
                <Typography variant="body2">
                  <strong>{c.plain}.</strong> {c.analogy}
                </Typography>
              </Box>
            ))}
          </div>

          <CalloutBox title="The two you will encounter most" type="key-concepts">
            <Typography variant="body2">
              <strong>O(n log n)</strong> is the target growth rate for good sorting. <strong>O(n²)</strong> is a warning sign that an algorithm is likely comparing everything to everything — usually an indication that a faster approach exists.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 7 ----------------------------------------------------------------- */}
        <Section title="Designing Algorithms">
          <Typography variant="body2" paragraph>
            <strong>Design</strong> is the act of choosing a strategy before writing code. Several classic approaches recur across many problems:
          </Typography>

          <CalloutBox title="Common design strategies" type="guide">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
              <Typography variant="body2"><strong>Brute force:</strong> try every possibility. Simple to implement, but often slow.</Typography>
              <Typography variant="body2"><strong>Divide and conquer:</strong> break the problem into smaller pieces, solve each, then combine. Powers binary search and merge sort.</Typography>
              <Typography variant="body2"><strong>Greedy:</strong> take the best-looking option at each step. Effective for problems such as making change with the fewest coins.</Typography>
              <Typography variant="body2"><strong>Dynamic programming:</strong> store the answers to sub-problems so none is ever solved twice.</Typography>
            </Box>
          </CalloutBox>

          <CalloutBox title="Data structures are part of the design" type="info">
            <Typography variant="body2">
              Choosing the right structure — a stack, a queue, or a tree — can convert a slow O(n²) approach into a fast O(n log n) one. The structure and the algorithm work together.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 8 ----------------------------------------------------------------- */}
        <Section title="Key Takeaways">
          <CalloutBox title="Summary" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>An algorithm</strong> is a precise sequence of steps for solving a problem.</Typography>
              <Typography variant="body2"><strong>Big-O</strong> describes how work grows as the input grows, independent of any specific machine.</Typography>
              <Typography variant="body2"><strong>Efficient growth rates</strong> (O(1), O(log n), O(n log n)) scale to large data; O(n²) does not.</Typography>
              <Typography variant="body2"><strong>Good design</strong> pairs the right strategy with the right data structure.</Typography>
            </Box>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
