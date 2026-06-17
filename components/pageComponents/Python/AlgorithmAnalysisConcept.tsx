'use client';

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Alert from '@mui/material/Alert';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import ConceptInfoCard from '../../common/ConceptInfoCard';
import TableOfContents from '@/components/common/TableOfContents';
import '../../../styles/dataStructures.css';

type Complexity = {
  label: string;
  color: string;
  steps: (n: number) => number;
  note: string;
};

const COMPLEXITIES: Complexity[] = [
  { label: 'O(1)', color: '#22c55e', steps: () => 1, note: 'Constant — same work no matter the size' },
  { label: 'O(log n)', color: '#14b8a6', steps: (n) => Math.max(1, Math.ceil(Math.log2(n))), note: 'Logarithmic — halves the problem each step' },
  { label: 'O(n)', color: '#3b82f6', steps: (n) => n, note: 'Linear — work grows with the input' },
  { label: 'O(n log n)', color: '#f59e0b', steps: (n) => Math.max(1, Math.round(n * Math.log2(Math.max(2, n)))), note: 'Good sorting algorithms live here' },
  { label: 'O(n²)', color: '#ef4444', steps: (n) => n * n, note: 'Quadratic — slows down fast' },
];

export default function AlgorithmAnalysisConcept() {
  const [n, setN] = useState(16);

  const results = COMPLEXITIES.map((c) => ({ ...c, value: c.steps(n) }));
  const max = Math.max(...results.map((r) => r.value));

  return (
    <ConceptWrapper
      title="Algorithm Analysis & Design"
      description="An algorithm is a step-by-step recipe for solving a problem. Analysis is how we measure whether that recipe will stay fast as the data grows."
    >
      <TableOfContents numbered>
        <Section title="What is an Algorithm?">
          <Typography variant="body2" paragraph>
            An <strong>algorithm</strong> is just a precise list of steps for getting something done — like a <em>cooking recipe</em> or the <em>directions</em> to a friend&apos;s house. Given the same starting ingredients, it always produces the same result.
          </Typography>

          <ConceptInfoCard>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              A Good Algorithm Is...
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2"><strong>✅ Correct:</strong> it produces the right answer every time</Typography>
              <Typography variant="body2"><strong>📋 Clear:</strong> each step is unambiguous</Typography>
              <Typography variant="body2"><strong>🏁 Finite:</strong> it eventually stops</Typography>
              <Typography variant="body2"><strong>⚡ Efficient:</strong> it doesn&apos;t waste time or memory</Typography>
            </Box>
          </ConceptInfoCard>
        </Section>

        <Section title="Why We Measure with Big-O">
          <Typography variant="body2" paragraph>
            We don&apos;t measure algorithms in <em>seconds</em>, because that depends on your computer. Instead we count <strong>how the number of steps grows as the input gets bigger</strong>. That growth rate is written with <strong>Big-O notation</strong>.
          </Typography>
          <Typography variant="body2" paragraph>
            The real question Big-O answers is: <em>&quot;If I give this algorithm 10× more data, does it get a little slower, or a lot slower?&quot;</em>
          </Typography>

          <Alert severity="info">
            <Typography variant="body2">
              Big-O describes the <strong>worst case</strong> and ignores constants. We care about the <em>shape</em> of the growth, not the exact step count.
            </Typography>
          </Alert>
        </Section>

        <Section title="See How They Grow">
          <Typography variant="body2" paragraph>
            Drag the slider to change the input size <strong>n</strong> and watch how many steps each kind of algorithm needs. Notice how <code>O(1)</code> barely moves while <code>O(n²)</code> explodes.
          </Typography>

          <div className="ds-viz">
            <Box sx={{ px: 1, mb: 2 }}>
              <Typography variant="body2" gutterBottom>
                Input size <strong>n = {n}</strong>
              </Typography>
              <Slider
                value={n}
                min={1}
                max={64}
                onChange={(_, v) => setN(v as number)}
                valueLabelDisplay="auto"
              />
            </Box>

            {results.map((r) => (
              <div className="bigo-row" key={r.label}>
                <span className="bigo-label" style={{ color: r.color }}>{r.label}</span>
                <span className="bigo-track">
                  <span
                    className="bigo-fill"
                    style={{
                      width: `${Math.max(2, (r.value / max) * 100)}%`,
                      background: r.color,
                    }}
                  >
                    {r.value <= 9999 ? r.value : '9999+'}
                  </span>
                </span>
                <span className="bigo-steps">steps</span>
              </div>
            ))}
            <p className="ds-caption">Bars are scaled to the slowest algorithm. The number is the actual step count.</p>
          </div>
        </Section>

        <Section title="Common Complexities (with Analogies)">
          <ConceptInfoCard>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2">
                <strong style={{ color: '#22c55e' }}>O(1) — Constant:</strong> grabbing the first item in a list. Instant, no matter how long the list is.
              </Typography>
              <Typography variant="body2">
                <strong style={{ color: '#14b8a6' }}>O(log n) — Logarithmic:</strong> finding a word in a dictionary by repeatedly splitting it in half.
              </Typography>
              <Typography variant="body2">
                <strong style={{ color: '#3b82f6' }}>O(n) — Linear:</strong> reading every page of a book once.
              </Typography>
              <Typography variant="body2">
                <strong style={{ color: '#f59e0b' }}>O(n log n) — Linearithmic:</strong> the speed of efficient sorting like merge sort.
              </Typography>
              <Typography variant="body2">
                <strong style={{ color: '#ef4444' }}>O(n²) — Quadratic:</strong> comparing every person in a room with every other person (handshakes).
              </Typography>
            </Box>
          </ConceptInfoCard>
        </Section>

        <Section title="Designing Algorithms">
          <Typography variant="body2" paragraph>
            <strong>Design</strong> is choosing a strategy to attack a problem. A few classic approaches:
          </Typography>

          <ConceptInfoCard>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2">
                <strong>💪 Brute force:</strong> try every possibility. Simple, but often slow — the &quot;just check everything&quot; approach.
              </Typography>
              <Typography variant="body2">
                <strong>✂️ Divide &amp; conquer:</strong> break the problem into smaller pieces, solve each, and combine. Powers binary search and merge sort.
              </Typography>
              <Typography variant="body2">
                <strong>🪙 Greedy:</strong> make the best-looking choice at each step. Great for things like making change with the fewest coins.
              </Typography>
              <Typography variant="body2">
                <strong>🧠 Dynamic programming:</strong> remember answers to sub-problems so you never solve the same one twice.
              </Typography>
            </Box>
          </ConceptInfoCard>

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              The data structure you choose is part of the design. The right structure (a stack, queue, or tree) can turn a slow <code>O(n²)</code> idea into a fast <code>O(n log n)</code> one.
            </Typography>
          </Alert>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
