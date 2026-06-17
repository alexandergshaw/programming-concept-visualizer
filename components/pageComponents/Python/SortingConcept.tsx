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
      snaps.push({ values: [...arr], states, desc: `Compare the two yellow neighbors: ${arr[j]} and ${arr[j + 1]}.` });
      if (arr[j] > arr[j + 1]) {
        const a = arr[j];
        const b = arr[j + 1];
        arr[j] = b;
        arr[j + 1] = a;
        const s2: BarState[] = arr.map((_, idx) => (idx >= n - i ? 'sorted' : ''));
        s2[j] = 'swap';
        s2[j + 1] = 'swap';
        snaps.push({ values: [...arr], states: s2, desc: `${a} is bigger than ${b}, so swap them — the bigger number moves right.` });
      }
    }
  }
  snaps.push({ values: [...arr], states: arr.map(() => 'sorted'), desc: 'No swaps left to make — the list is fully sorted! ✅' });
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
      description="Sorting means putting a list in order. Seeing the values slide into place makes the strategy easy to follow."
    >
      <TableOfContents numbered>
        {/* 1 ----------------------------------------------------------------- */}
        <Section title="The Big Idea">
          <Typography variant="body2" paragraph>
            Imagine you&apos;re holding a messy hand of playing cards and you want them in order. Most people do something simple without thinking about it: they glance at two cards next to each other and, if they&apos;re in the wrong order, swap them. Do that enough times and the whole hand ends up sorted.
          </Typography>
          <Typography variant="body2" paragraph>
            That everyday habit is almost exactly the algorithm called <strong>bubble sort</strong>.
          </Typography>

          <CalloutBox title="In plain English" type="info" icon="💡">
            <Typography variant="body2">
              <strong>Sorting</strong> = rearranging a list so the items are in order (smallest to largest, A to Z, oldest to newest, and so on).
            </Typography>
          </CalloutBox>
        </Section>

        {/* 2 ----------------------------------------------------------------- */}
        <Section title="The One Move: Compare Two Neighbors">
          <Typography variant="body2" paragraph>
            Bubble sort only ever does one tiny thing: it looks at <strong>two side-by-side items</strong> and swaps them if the left one is bigger.
          </Typography>

          <div className="ds-viz">
            <div className="illus-label">Two neighbors are out of order, so swap them:</div>
            <div className="cards-compare">
              <div className="play-card big">7</div>
              <span className="compare-symbol">&gt;</span>
              <div className="play-card">3</div>
              <span className="swap-arrows">⇄</span>
              <div className="play-card">3</div>
              <div className="play-card big">7</div>
            </div>
            <p className="ds-caption">7 is bigger than 3, so they trade places. The bigger number ends up on the right.</p>
          </div>

          <CalloutBox title="The whole algorithm, in 4 steps" type="key-concepts" icon="📋">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
              <Typography variant="body2"><strong>1.</strong> Start at the left with the first two items.</Typography>
              <Typography variant="body2"><strong>2.</strong> If they&apos;re in the wrong order, swap them.</Typography>
              <Typography variant="body2"><strong>3.</strong> Shuffle one step to the right and repeat, all the way to the end.</Typography>
              <Typography variant="body2"><strong>4.</strong> Go back to the start and do another pass — keep going until a pass makes no swaps.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        {/* 3 ----------------------------------------------------------------- */}
        <Section title="Why It's Called 'Bubble' Sort">
          <Typography variant="body2" paragraph>
            On each left-to-right pass, the biggest remaining number keeps getting swapped rightward until it can&apos;t go any further. It looks like the largest value <strong>bubbles up</strong> to the end of the list, like a bubble rising to the top of a glass. After the first pass the biggest is parked at the far right; after the second pass the next-biggest is parked next to it, and so on.
          </Typography>

          <CalloutBox title="Watch for the green zone" type="success" icon="🫧">
            <Typography variant="body2">
              In the visualizer below, every number that has &quot;bubbled&quot; into its final spot turns <strong>green</strong>. The green zone grows from the right with every pass until the whole list is green.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 4 ----------------------------------------------------------------- */}
        <Section title="Watch It Sort">
          <Typography variant="body2" paragraph>
            Each bar is a number — taller means bigger. Step through (or press Play) to watch the comparisons, the swaps, and the green &quot;done&quot; zone growing from the right.
          </Typography>

          <div className="ds-viz">
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
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#93c5fd' }} /> Not sorted yet</span>
            </div>
          </div>

          <CalloutBox title="Try this" type="success" icon="🧪">
            <Typography variant="body2">
              Press <strong>Shuffle</strong> a few times and predict which bar will turn green first. (Hint: it&apos;s always the tallest one still in play.)
            </Typography>
          </CalloutBox>
        </Section>

        {/* 5 ----------------------------------------------------------------- */}
        <Section title="Is Bubble Sort Fast?">
          <Typography variant="body2" paragraph>
            Honestly? No. Bubble sort is fantastic for <em>learning</em> because you can see every move — but it compares almost every pair of items, so it gets slow quickly. Double the list and it does roughly <strong>four times</strong> the work.
          </Typography>

          <CalloutBox title="What real programs use" type="info" icon="🚀">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Bubble / insertion / selection sort:</strong> easy to understand, fine for tiny lists. (&quot;Slow&quot; — O(n²).)</Typography>
              <Typography variant="body2"><strong>Merge / quick / heap sort:</strong> what real software uses for big lists. (&quot;Fast&quot; — O(n log n).)</Typography>
              <Typography variant="body2"><strong>In actual Python code,</strong> you almost never write a sort yourself — you call the built-in <code>sorted()</code>, which uses a highly optimized fast sort.</Typography>
            </Box>
          </CalloutBox>

          <CalloutBox title="The clever trick behind fast sorts" type="key-concepts" icon="✂️">
            <Typography variant="body2">
              Fast sorts like merge sort use <strong>divide &amp; conquer</strong>: split the list in half, sort each half, then merge the two sorted halves back together. You can read more about that strategy in <em>Algorithm Analysis &amp; Design</em>.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 6 ----------------------------------------------------------------- */}
        <Section title="Key Takeaways">
          <CalloutBox title="Remember these" type="success" icon="✅">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Sorting</strong> puts a list in order; it makes searching and many other tasks easier.</Typography>
              <Typography variant="body2"><strong>Bubble sort</strong> repeatedly compares neighbors and swaps them, &quot;bubbling&quot; big values to the end.</Typography>
              <Typography variant="body2"><strong>It&apos;s simple but slow</strong> — great for learning, but real code uses faster sorts like <code>sorted()</code>.</Typography>
            </Box>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
