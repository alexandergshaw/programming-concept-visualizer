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
  { label: 'O(1)', plain: 'Constant', color: '#22c55e', steps: () => 1, analogy: 'Grabbing the first item in a list — instant, no matter how long the list is.' },
  { label: 'O(log n)', plain: 'Logarithmic', color: '#14b8a6', steps: (n) => Math.max(1, Math.ceil(Math.log2(n))), analogy: 'Finding a word in a dictionary by repeatedly splitting it in half.' },
  { label: 'O(n)', plain: 'Linear', color: '#3b82f6', steps: (n) => n, analogy: 'Reading every page of a book once.' },
  { label: 'O(n log n)', plain: 'Linearithmic', color: '#f59e0b', steps: (n) => Math.max(1, Math.round(n * Math.log2(Math.max(2, n)))), analogy: 'The speed of the good sorting algorithms real programs use.' },
  { label: 'O(n²)', plain: 'Quadratic', color: '#ef4444', steps: (n) => n * n, analogy: 'Everyone in a room shaking hands with everyone else.' },
];

export default function AlgorithmAnalysisConcept() {
  const [n, setN] = useState(16);

  const results = COMPLEXITIES.map((c) => ({ ...c, value: c.steps(n) }));
  const max = Math.max(...results.map((r) => r.value));

  return (
    <ConceptWrapper
      title="Algorithm Analysis & Design"
      description="An algorithm is a step-by-step recipe for solving a problem. Analysis is just asking: will this recipe still be fast when the data gets big?"
    >
      <TableOfContents numbered>
        {/* 1 ----------------------------------------------------------------- */}
        <Section title="What's an Algorithm?">
          <Typography variant="body2" paragraph>
            An <strong>algorithm</strong> is nothing fancy — it&apos;s just a precise list of steps for getting something done. A cooking recipe is an algorithm. So are the directions to a friend&apos;s house. Follow the same steps with the same input, and you always get the same result.
          </Typography>

          <div className="ds-viz">
            <div className="illus-label">A recipe is an algorithm — a clear sequence of steps:</div>
            <div className="flow">
              <span className="flow-step">Boil water</span>
              <span className="flow-arrow">→</span>
              <span className="flow-step">Add pasta</span>
              <span className="flow-arrow">→</span>
              <span className="flow-step">Wait 10 min</span>
              <span className="flow-arrow">→</span>
              <span className="flow-step">Drain</span>
              <span className="flow-arrow">→</span>
              <span className="flow-step" style={{ background: '#dcfce7', borderColor: '#4ade80', color: '#166534' }}>🍝 Done</span>
            </div>
          </div>

          <CalloutBox title="In plain English" type="info" icon="💡">
            <Typography variant="body2">
              <strong>Algorithm</strong> = a clear set of steps that takes some input and produces a result. <strong>Analysis</strong> = figuring out how much time and memory those steps need as the input grows.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 2 ----------------------------------------------------------------- */}
        <Section title="What Makes an Algorithm Good?">
          <CalloutBox title="A good algorithm is..." type="key-concepts" icon="⭐">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>✅ Correct</strong> — it gives the right answer every time.</Typography>
              <Typography variant="body2"><strong>📋 Clear</strong> — each step is unambiguous; there&apos;s no guessing.</Typography>
              <Typography variant="body2"><strong>🏁 Finite</strong> — it always eventually stops (no running forever).</Typography>
              <Typography variant="body2"><strong>⚡ Efficient</strong> — it doesn&apos;t waste time or memory.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        {/* 3 ----------------------------------------------------------------- */}
        <Section title="Measuring Speed Without a Stopwatch">
          <Typography variant="body2" paragraph>
            How do we say one algorithm is &quot;faster&quot; than another? Not in <em>seconds</em> — that depends on your computer, what else it&apos;s running, even the weather in the data center. Instead, we count <strong>how the number of steps grows as the input gets bigger</strong>.
          </Typography>
          <Typography variant="body2" paragraph>
            The real question we&apos;re answering is simple:
          </Typography>

          <CalloutBox title="The one question Big-O answers" type="info" icon="📈">
            <Typography variant="body2">
              <em>&quot;If I give this algorithm 10× more data, does it get a little slower, or a LOT slower?&quot;</em>
            </Typography>
          </CalloutBox>

          <Typography variant="body2" paragraph sx={{ mt: 2 }}>
            That growth rate gets a shorthand label called <strong>Big-O notation</strong>, written like <code>O(n)</code> or <code>O(n²)</code>. Don&apos;t let the symbols scare you — each one is just a nickname for a <em>shape</em> of growth, which you can see below.
          </Typography>
        </Section>

        {/* 4 ----------------------------------------------------------------- */}
        <Section title="See How They Grow">
          <Typography variant="body2" paragraph>
            Drag the slider to change the input size <strong>n</strong>. Watch how many steps each kind of algorithm needs — <code>O(1)</code> barely moves while <code>O(n²)</code> shoots up.
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
                    {r.value <= 9999 ? r.value : '9999+'}
                  </span>
                </span>
                <span className="bigo-steps">steps</span>
              </div>
            ))}
            <p className="ds-caption">Bars are scaled to the slowest one. The number is the actual step count for that input size.</p>
          </div>

          <CalloutBox title="Try this" type="success" icon="🧪">
            <Typography variant="body2">
              Slide n up to 64. Notice that <code>O(1)</code> still needs just 1 step, <code>O(log n)</code> only 6, but <code>O(n²)</code> needs over 4,000. That gap is the whole reason we care about analysis.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 5 ----------------------------------------------------------------- */}
        <Section title="The Common Speeds, in Plain English">
          <Typography variant="body2" paragraph>
            You&apos;ll meet these handful of growth shapes again and again. Here they are from fastest to slowest, each with an everyday picture:
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

          <CalloutBox title="The two you'll hear most" type="key-concepts" icon="🎯">
            <Typography variant="body2">
              <strong>O(n log n)</strong> is the target speed for good sorting. <strong>O(n²)</strong> is the warning sign that you&apos;re probably comparing everything to everything — usually a hint there&apos;s a faster way.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 6 ----------------------------------------------------------------- */}
        <Section title="How Programmers Design Algorithms">
          <Typography variant="body2" paragraph>
            <strong>Design</strong> is choosing a strategy to attack a problem before you write any code. A few classic game plans:
          </Typography>

          <CalloutBox title="Common strategies" type="guide" icon="🧩">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
              <Typography variant="body2"><strong>💪 Brute force:</strong> just try every possibility. Simple to write, but often slow.</Typography>
              <Typography variant="body2"><strong>✂️ Divide &amp; conquer:</strong> break the problem into smaller pieces, solve each, then combine. Powers binary search and merge sort.</Typography>
              <Typography variant="body2"><strong>🪙 Greedy:</strong> grab the best-looking option at each step. Great for things like making change with the fewest coins.</Typography>
              <Typography variant="body2"><strong>🧠 Dynamic programming:</strong> remember the answers to sub-problems so you never solve the same one twice.</Typography>
            </Box>
          </CalloutBox>

          <CalloutBox title="Data structures are part of the design" type="info" icon="🏗️">
            <Typography variant="body2">
              Picking the right structure — a stack, a queue, a tree — can turn a slow <code>O(n²)</code> idea into a fast <code>O(n log n)</code> one. The structure and the algorithm are a team.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 7 ----------------------------------------------------------------- */}
        <Section title="Key Takeaways">
          <CalloutBox title="Remember these" type="success" icon="✅">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>An algorithm</strong> is a precise recipe of steps to solve a problem.</Typography>
              <Typography variant="body2"><strong>Big-O</strong> describes how the work grows as the input grows — not exact seconds.</Typography>
              <Typography variant="body2"><strong>Faster shapes</strong> (O(1), O(log n), O(n log n)) scale to big data; <strong>O(n²)</strong> doesn&apos;t.</Typography>
              <Typography variant="body2"><strong>Good design</strong> picks the right strategy and the right data structure together.</Typography>
            </Box>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
