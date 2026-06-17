'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import '../../../styles/dataStructures.css';

type BarState = '' | 'compare' | 'swap' | 'sorted';
type SnapKind = 'compare' | 'swap' | 'done';
type Snap = { values: number[]; states: BarState[]; desc: string; kind: SnapKind };

function buildBubbleSnaps(input: number[]): Snap[] {
  const arr = [...input];
  const n = arr.length;
  const snaps: Snap[] = [];
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      const states: BarState[] = arr.map((_, idx) => (idx >= n - i ? 'sorted' : ''));
      states[j] = 'compare';
      states[j + 1] = 'compare';
      snaps.push({ values: [...arr], states, kind: 'compare', desc: `Compare the two highlighted neighbours: ${arr[j]} and ${arr[j + 1]}.` });
      if (arr[j] > arr[j + 1]) {
        const a = arr[j];
        const b = arr[j + 1];
        arr[j] = b;
        arr[j + 1] = a;
        const s2: BarState[] = arr.map((_, idx) => (idx >= n - i ? 'sorted' : ''));
        s2[j] = 'swap';
        s2[j + 1] = 'swap';
        snaps.push({ values: [...arr], states: s2, kind: 'swap', desc: `${a} is greater than ${b}, so they are swapped — the larger value moves to the right.` });
      }
    }
  }
  snaps.push({ values: [...arr], states: arr.map(() => 'sorted'), kind: 'done', desc: 'No further swaps are needed — the list is fully sorted.' });
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

  // Live tallies up to the current step
  const comparisons = snaps.slice(0, step + 1).filter((s) => s.kind === 'compare').length;
  const swaps = snaps.slice(0, step + 1).filter((s) => s.kind === 'swap').length;

  return (
    <ConceptWrapper
      title="Sorting"
      description="Sorting arranges a list into order. Watching the values move into place makes the underlying strategy easy to follow."
    >
      <TableOfContents numbered>
        {/* 1 ----------------------------------------------------------------- */}
        <Section title="The Big Idea">
          <Typography variant="body2" paragraph>
            Consider tidying a hand of playing cards. Most people do something simple without thinking about it: they glance at two adjacent cards and, if those cards are out of order, swap them. Repeat that enough times and the whole hand ends up sorted.
          </Typography>
          <Typography variant="body2" paragraph>
            That everyday habit is almost exactly the algorithm known as <strong>bubble sort</strong>.
          </Typography>

          <CalloutBox title="Definition" type="info">
            <Typography variant="body2">
              <strong>Sorting</strong> is the process of rearranging a list so its items follow a defined order — smallest to largest, A to Z, oldest to newest, and so on.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 2 ----------------------------------------------------------------- */}
        <Section title="The Core Move: Compare Two Neighbours">
          <Typography variant="body2" paragraph>
            Bubble sort performs only one basic operation: it looks at two adjacent items and swaps them if the one on the left is larger.
          </Typography>

          <div className="ds-viz">
            <div className="illus-label">Two neighbours are out of order, so they are swapped:</div>
            <div className="cards-compare">
              <div className="play-card big">7</div>
              <span className="compare-symbol">&gt;</span>
              <div className="play-card">3</div>
              <span className="swap-arrows">&#8644;</span>
              <div className="play-card">3</div>
              <div className="play-card big">7</div>
            </div>
            <p className="ds-caption">7 is greater than 3, so they trade places. The larger value ends up on the right.</p>
          </div>

          <CalloutBox title="The full algorithm in four steps" type="key-concepts">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
              <Typography variant="body2"><strong>1.</strong> Begin at the left with the first two items.</Typography>
              <Typography variant="body2"><strong>2.</strong> If they are out of order, swap them.</Typography>
              <Typography variant="body2"><strong>3.</strong> Move one position to the right and repeat, all the way to the end.</Typography>
              <Typography variant="body2"><strong>4.</strong> Return to the start and perform another pass; continue until a full pass makes no swaps.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        {/* 3 ----------------------------------------------------------------- */}
        <Section title="Why It Is Called Bubble Sort">
          <Typography variant="body2" paragraph>
            On each left-to-right pass, the largest remaining value is swapped rightward until it can move no further. The largest value appears to rise to the end of the list, much like a bubble rising to the surface. After the first pass the largest value is in its final position; after the second pass the next-largest is settled beside it, and so on.
          </Typography>

          <CalloutBox title="Watch the sorted region" type="info">
            <Typography variant="body2">
              In the visualization below, every value that has reached its final position turns <strong>green</strong>. This sorted region grows from the right with each pass until the entire list is green.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 4 ----------------------------------------------------------------- */}
        <Section title="Interactive Visualization">
          <Typography variant="body2" paragraph>
            Each bar represents a number; taller means larger. Step through or press Play to watch the comparisons, the swaps, and the sorted region growing from the right. The counters track the total work performed so far.
          </Typography>

          <div className="ds-viz">
            {/* Live counters */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              <Box sx={{ p: 1.25, px: 2, borderRadius: 2, bgcolor: '#fffbeb', border: '1px solid #fcd34d' }}>
                <Typography variant="caption" sx={{ color: '#92400e', display: 'block' }}>Comparisons</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#b45309' }}>{comparisons}</Typography>
              </Box>
              <Box sx={{ p: 1.25, px: 2, borderRadius: 2, bgcolor: '#fef2f2', border: '1px solid #fca5a5' }}>
                <Typography variant="caption" sx={{ color: '#991b1b', display: 'block' }}>Swaps</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#b91c1c' }}>{swaps}</Typography>
              </Box>
            </Box>

            <div className="bars-area">
              {snap.values.map((val, idx) => (
                <div key={idx} className={`bar ${snap.states[idx]}`} style={{ height: `${(val / maxVal) * 100}%` }}>
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
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#93c5fd' }} /> Not yet sorted</span>
            </div>
          </div>

          <CalloutBox title="Suggested experiment" type="success">
            <Typography variant="body2">
              Press <strong>Shuffle</strong> a few times and predict which bar will turn green first. It is always the tallest bar still in play. Note how an already-sorted list still requires a full pass of comparisons to confirm it is sorted.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 5 ----------------------------------------------------------------- */}
        <Section title="How Efficient Is Bubble Sort?">
          <Typography variant="body2" paragraph>
            Bubble sort is excellent for learning because every move is visible, but it is not efficient. It compares nearly every pair of items, so the work grows quickly: doubling the list size roughly quadruples the number of comparisons.
          </Typography>

          <CalloutBox title="What production code uses" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Bubble, insertion, and selection sort</strong> are easy to understand and acceptable for very small lists. Their growth rate is O(n&sup2;).</Typography>
              <Typography variant="body2"><strong>Merge, quick, and heap sort</strong> are what real software uses for large data. Their growth rate is O(n log n).</Typography>
              <Typography variant="body2"><strong>In practice,</strong> you rarely write a sort by hand in Python — you call the built-in <code>sorted()</code>, which uses a highly optimized O(n log n) algorithm.</Typography>
            </Box>
          </CalloutBox>

          <CalloutBox title="The strategy behind fast sorts" type="key-concepts">
            <Typography variant="body2">
              Efficient sorts such as merge sort use <strong>divide and conquer</strong>: split the list in half, sort each half, then merge the two sorted halves. This strategy is discussed further in <em>Algorithm Analysis &amp; Design</em>.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 6 ----------------------------------------------------------------- */}
        <Section title="Key Takeaways">
          <CalloutBox title="Summary" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Sorting</strong> arranges a list into order and makes searching and many other tasks easier.</Typography>
              <Typography variant="body2"><strong>Bubble sort</strong> repeatedly compares neighbours and swaps them, moving large values toward the end.</Typography>
              <Typography variant="body2"><strong>It is simple but slow</strong> — ideal for learning, while production code relies on faster sorts such as <code>sorted()</code>.</Typography>
            </Box>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
