'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import ConceptInfoCard from '../../common/ConceptInfoCard';
import TableOfContents from '@/components/common/TableOfContents';
import '../../../styles/dataStructures.css';

type BarState = '' | 'compare' | 'swap' | 'sorted';
type Snap = { values: number[]; states: BarState[]; desc: string };

function buildBubbleSnaps(input: number[]): Snap[] {
  const arr = [...input];
  const n = arr.length;
  const snaps: Snap[] = [];
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      const states: BarState[] = arr.map((_, idx) => (idx >= n - i ? 'sorted' : ''));
      states[j] = 'compare';
      states[j + 1] = 'compare';
      snaps.push({ values: [...arr], states, desc: `Compare neighbors ${arr[j]} and ${arr[j + 1]}.` });
      if (arr[j] > arr[j + 1]) {
        const a = arr[j];
        const b = arr[j + 1];
        arr[j] = b;
        arr[j + 1] = a;
        const s2: BarState[] = arr.map((_, idx) => (idx >= n - i ? 'sorted' : ''));
        s2[j] = 'swap';
        s2[j + 1] = 'swap';
        snaps.push({ values: [...arr], states: s2, desc: `${a} is bigger than ${b}, so swap them — the bigger value drifts right.` });
      }
    }
  }
  snaps.push({ values: [...arr], states: arr.map(() => 'sorted'), desc: 'No more swaps needed — the list is fully sorted! ✅' });
  return snaps;
}

function randomArray(size = 8): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
}

const INITIAL = [40, 8, 70, 25, 90, 15, 55, 33];

export default function SortingConcept() {
  const [base, setBase] = useState<number[]>(INITIAL);
  const snaps = useMemo(() => buildBubbleSnaps(base), [base]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setStep(0); setPlaying(false); }, [base]);

  useEffect(() => {
    if (!playing) return;
    if (step >= snaps.length - 1) { setPlaying(false); return; }
    timer.current = setTimeout(() => setStep((s) => s + 1), 650);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [playing, step, snaps.length]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const snap = snaps[step];
  const maxVal = Math.max(...snap.values);

  return (
    <ConceptWrapper
      title="Sorting"
      description="Sorting arranges items into order. Watching the values shuffle into place makes the strategy easy to see."
    >
      <TableOfContents numbered>
        <Section title="Sorting Cards in Your Hand">
          <Typography variant="body2" paragraph>
            When you tidy a hand of playing cards, you naturally compare neighbors and swap the ones that are out of order. <strong>Bubble sort</strong> does exactly that: it walks across the list comparing each pair, swapping when needed, so the largest value &quot;bubbles&quot; up to the end on every pass.
          </Typography>

          <ConceptInfoCard>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              How Bubble Sort Thinks
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2"><strong>1.</strong> Compare the first two items</Typography>
              <Typography variant="body2"><strong>2.</strong> If they&apos;re in the wrong order, swap them</Typography>
              <Typography variant="body2"><strong>3.</strong> Move one step right and repeat to the end</Typography>
              <Typography variant="body2"><strong>4.</strong> Repeat the whole pass until no swaps are needed</Typography>
            </Box>
          </ConceptInfoCard>
        </Section>

        <Section title="Watch It Sort">
          <Typography variant="body2" paragraph>
            Each bar is a number — taller means bigger. Step through to see the comparisons and swaps, and watch the green &quot;already sorted&quot; zone grow from the right.
          </Typography>

          <div className="ds-viz">
            <div className="bars-area">
              {snap.values.map((val, idx) => (
                <div
                  key={idx}
                  className={`bar ${snap.states[idx]}`}
                  style={{ height: `${(val / maxVal) * 100}%` }}
                >
                  {val}
                </div>
              ))}
            </div>

            <div className="ds-controls" style={{ marginTop: 16 }}>
              <Button variant="outlined" onClick={() => { setPlaying(false); setStep((s) => Math.max(0, s - 1)); }} disabled={step === 0}>
                Previous
              </Button>
              <Button variant="contained" onClick={() => { setPlaying(false); setStep((s) => Math.min(snaps.length - 1, s + 1)); }} disabled={step >= snaps.length - 1}>
                Next
              </Button>
              <Button variant="outlined" onClick={() => setPlaying((p) => !p)} disabled={step >= snaps.length - 1}>
                {playing ? 'Pause' : 'Play'}
              </Button>
              <Button variant="text" color="secondary" onClick={() => { setPlaying(false); setStep(0); }}>
                Reset
              </Button>
              <Button variant="outlined" onClick={() => setBase(randomArray())}>
                Shuffle
              </Button>
            </div>

            <p className="ds-output"><strong>Step {step + 1} / {snaps.length}:</strong> {snap.desc}</p>

            <div className="ds-legend">
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#fbbf24' }} /> Comparing</span>
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#f87171' }} /> Swapping</span>
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#34d399' }} /> In final position</span>
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#93c5fd' }} /> Unsorted</span>
            </div>
          </div>
        </Section>

        <Section title="Bubble Sort Is Simple but Slow">
          <Typography variant="body2" paragraph>
            Bubble sort is wonderful for <em>learning</em> because you can see every step. But it compares almost every pair, so it runs in <strong>O(n²)</strong> time — double the data and it does roughly four times the work.
          </Typography>

          <ConceptInfoCard>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2">
                <strong>Bubble / Insertion / Selection sort — O(n²):</strong> easy to understand, fine for tiny lists
              </Typography>
              <Typography variant="body2">
                <strong>Merge / Quick / Heap sort — O(n log n):</strong> what real programs use for large data
              </Typography>
              <Typography variant="body2">
                <strong>Python&apos;s built-in <code>sorted()</code></strong> uses a highly optimized O(n log n) sort — in real code, reach for that.
              </Typography>
            </Box>
          </ConceptInfoCard>

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Faster sorts like merge sort use the <strong>divide &amp; conquer</strong> strategy from Algorithm Analysis &amp; Design: split the list in half, sort each half, then merge them back together.
            </Typography>
          </Alert>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
