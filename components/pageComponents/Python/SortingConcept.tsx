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
      snaps.push({ values: [...arr], states, kind: 'compare', desc: `Compare ${arr[j]} and ${arr[j + 1]}.` });
      if (arr[j] > arr[j + 1]) {
        const a = arr[j];
        const b = arr[j + 1];
        arr[j] = b;
        arr[j + 1] = a;
        const s2: BarState[] = arr.map((_, idx) => (idx >= n - i ? 'sorted' : ''));
        s2[j] = 'swap';
        s2[j + 1] = 'swap';
        snaps.push({ values: [...arr], states: s2, kind: 'swap', desc: `${a} is bigger than ${b}, so swap them.` });
      }
    }
  }
  snaps.push({ values: [...arr], states: arr.map(() => 'sorted'), kind: 'done', desc: 'No pairs left to fix — the list is sorted.' });
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
  const comparisons = snaps.slice(0, step + 1).filter((s) => s.kind === 'compare').length;
  const swaps = snaps.slice(0, step + 1).filter((s) => s.kind === 'swap').length;

  return (
    <ConceptWrapper
      title="Sorting"
      description="Putting a list in order."
    >
      <TableOfContents numbered>
        {/* 1 ----------------------------------------------------------------- */}
        <Section title="The Big Idea">
          <CalloutBox title="Sorting is fixing pairs" type="key-concepts">
            <Typography variant="body2">
              If two neighbours are out of order, swap them. <strong>Repeat that one move until no pair is out of order — now the whole list is sorted.</strong>
            </Typography>
          </CalloutBox>
          <Typography variant="body2" sx={{ mt: 2 }}>
            That is exactly how most people sort a hand of cards, and it is exactly how <strong>bubble sort</strong> works.
          </Typography>
        </Section>

        {/* 2 ----------------------------------------------------------------- */}
        <Section title="The One Move">
          <Typography variant="body2" paragraph>
            Look at two neighbours. If the left one is bigger, swap them. The whole algorithm is just this move, repeated across the list again and again.
          </Typography>

          <div className="ds-viz">
            <div className="cards-compare">
              <div className="play-card big">7</div>
              <span className="compare-symbol">&gt;</span>
              <div className="play-card">3</div>
              <span className="swap-arrows">&#8644;</span>
              <div className="play-card">3</div>
              <div className="play-card big">7</div>
            </div>
            <p className="ds-caption">7 is bigger than 3, so they swap. The bigger value moves right.</p>
          </div>
        </Section>

        {/* 3 ----------------------------------------------------------------- */}
        <Section title="Try It">
          <Typography variant="body2" paragraph>
            Each bar is a number. Step through and watch the same move repeat. Bars that reach their final spot turn <strong>green</strong>, growing from the right.
          </Typography>

          <div className="ds-viz">
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
              <Button variant="outlined" onClick={() => { setPlaying(false); setStep((s) => Math.max(0, s - 1)); }} disabled={step === 0}>Previous</Button>
              <Button variant="contained" onClick={() => { setPlaying(false); setStep((s) => Math.min(snaps.length - 1, s + 1)); }} disabled={step >= snaps.length - 1}>Next</Button>
              <Button variant="outlined" onClick={() => setPlaying((p) => !p)} disabled={step >= snaps.length - 1}>{playing ? 'Pause' : 'Play'}</Button>
              <Button variant="text" color="secondary" onClick={() => { setPlaying(false); setStep(0); }}>Reset</Button>
              <Button variant="outlined" onClick={() => setBase(randomArray())}>Shuffle</Button>
            </div>

            <p className="ds-output"><strong>Step {step + 1} / {snaps.length}:</strong> {snap.desc}</p>
          </div>
        </Section>

        {/* 4 ----------------------------------------------------------------- */}
        <Section title="Simple, but Slow">
          <Typography variant="body2" paragraph>
            Because it fixes just one pair at a time, bubble sort does a lot of work — double the list and it does about four times as much. It is great for learning, not for real data.
          </Typography>

          <CalloutBox title="In practice" type="info">
            <Typography variant="body2">
              Real programs use faster sorts (merge, quick) or just call Python&apos;s built-in <code>sorted()</code>. See <em>Algorithm Analysis &amp; Design</em> for why &quot;one pair at a time&quot; doesn&apos;t scale.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 5 ----------------------------------------------------------------- */}
        <Section title="When You'd Actually Use This">
          <Typography variant="body2" paragraph>
            Almost any time a program shows a list to a person, it shows it in some order — and putting it in that order is sorting:
          </Typography>

          <CalloutBox title="Everyday programming situations" type="key-concepts">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>A feed or inbox:</strong> newest posts and emails shown first.</Typography>
              <Typography variant="body2"><strong>A leaderboard:</strong> highest scores ranked at the top.</Typography>
              <Typography variant="body2"><strong>A contacts list or music library:</strong> sorted A–Z.</Typography>
              <Typography variant="body2"><strong>Shopping results:</strong> &quot;price: low to high&quot; or &quot;most relevant first.&quot;</Typography>
            </Box>
          </CalloutBox>

          <CalloutBox title="Sorting helps searching" type="success">
            <Typography variant="body2">
              Sorting is also a setup step: once a list is in order, you can find things in it with fast binary search. The main choice you make is <em>what</em> to sort by — date, price, name, score.
            </Typography>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
