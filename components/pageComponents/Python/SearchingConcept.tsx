'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import '../../../styles/dataStructures.css';

const DATA = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91];
type CellState = '' | 'range' | 'active' | 'eliminated' | 'found';
type Snap = { states: CellState[]; desc: string };

// --- Static illustration data (a smaller, friendlier list) -----------------
const ILLUS = [3, 9, 14, 21, 28, 35, 42, 50];
const ILLUS_TARGET_INDEX = 6; // value 42

// Linear checks every cell from the left until it hits the target
const linearBadges = ILLUS.map((_, i) => (i <= ILLUS_TARGET_INDEX ? i + 1 : null));

// Binary keeps halving: middle of [0,7]=3, middle of [4,7]=5, middle of [6,7]=6
const binaryOrder = [3, 5, 6];

function linearSnaps(arr: number[], target: number): Snap[] {
  const snaps: Snap[] = [];
  for (let i = 0; i < arr.length; i++) {
    const states: CellState[] = arr.map((_, idx) => (idx < i ? 'eliminated' : ''));
    states[i] = 'active';
    snaps.push({ states, desc: `Check position ${i}: is ${arr[i]} the number we want (${target})?` });
    if (arr[i] === target) {
      const found: CellState[] = arr.map((_, idx) => (idx < i ? 'eliminated' : ''));
      found[i] = 'found';
      snaps.push({ states: found, desc: `Found ${target} at position ${i}! That took ${i + 1} checks. ✅` });
      return snaps;
    }
  }
  snaps.push({ states: arr.map(() => 'eliminated'), desc: `Checked every item — ${target} is not in the list. ❌` });
  return snaps;
}

function binarySnaps(arr: number[], target: number): Snap[] {
  const snaps: Snap[] = [];
  let lo = 0;
  let hi = arr.length - 1;
  let checks = 0;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    checks += 1;
    const states: CellState[] = arr.map((_, idx) => (idx >= lo && idx <= hi ? 'range' : 'eliminated'));
    states[mid] = 'active';
    if (arr[mid] === target) {
      const found = [...states];
      found[mid] = 'found';
      snaps.push({ states: found, desc: `The middle number ${arr[mid]} is exactly ${target} — found it at position ${mid} in just ${checks} checks! ✅` });
      return snaps;
    }
    if (arr[mid] < target) {
      snaps.push({ states, desc: `Look at the middle (${arr[mid]}). It's smaller than ${target}, so the answer must be to the right. Ignore the whole left half.` });
      lo = mid + 1;
    } else {
      snaps.push({ states, desc: `Look at the middle (${arr[mid]}). It's bigger than ${target}, so the answer must be to the left. Ignore the whole right half.` });
      hi = mid - 1;
    }
  }
  snaps.push({ states: arr.map(() => 'eliminated'), desc: `Nothing left to check — ${target} is not in the list. ❌` });
  return snaps;
}

export default function SearchingConcept() {
  const [algorithm, setAlgorithm] = useState<'linear' | 'binary'>('binary');
  const [target, setTarget] = useState(23);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const snaps = useMemo(
    () => (algorithm === 'linear' ? linearSnaps(DATA, target) : binarySnaps(DATA, target)),
    [algorithm, target],
  );

  useEffect(() => { setStep(0); setPlaying(false); }, [algorithm, target]);

  useEffect(() => {
    if (!playing) return;
    if (step >= snaps.length - 1) { setPlaying(false); return; }
    timer.current = setTimeout(() => setStep((s) => s + 1), 1000);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [playing, step, snaps.length]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const snap = snaps[step];

  return (
    <ConceptWrapper
      title="Searching"
      description="Searching is how a program finds where something lives in a list. The smarter the method, the fewer things it has to look at."
    >
      <TableOfContents numbered>
        {/* 1 ----------------------------------------------------------------- */}
        <Section title="The Big Idea">
          <Typography variant="body2" paragraph>
            You want to find your friend Maria&apos;s number in your phone. You could scroll from the very top, name by name, until you reach hers. Or — because your contacts are in <strong>alphabetical order</strong> — you could jump to the middle, see if you&apos;ve gone too far, and keep narrowing it down.
          </Typography>
          <Typography variant="body2" paragraph>
            Those are the two big searching strategies, and computers use the exact same ideas.
          </Typography>

          <CalloutBox title="In plain English" type="info" icon="💡">
            <Typography variant="body2">
              <strong>Searching</strong> = looking through a collection to find one specific item (or to find out it isn&apos;t there).
            </Typography>
          </CalloutBox>
        </Section>

        {/* 2 ----------------------------------------------------------------- */}
        <Section title="Way 1: Check Every Item (Linear Search)">
          <Typography variant="body2" paragraph>
            The simplest method: start at the beginning and look at <strong>every item one at a time</strong> until you find what you want. It&apos;s like reading a grocery list top to bottom looking for &quot;milk.&quot;
          </Typography>

          <div className="ds-viz">
            <div className="illus">
              <div className="illus-label">Looking for 42 — linear search checks each box in order:</div>
              <div className="illus-cells">
                {ILLUS.map((val, i) => (
                  <div
                    key={i}
                    className={`illus-cell ${i === ILLUS_TARGET_INDEX ? 'target' : linearBadges[i] ? 'hit' : 'dim'}`}
                  >
                    {linearBadges[i] && <span className="viz-badge">{linearBadges[i]}</span>}
                    {val}
                  </div>
                ))}
              </div>
              <p className="ds-caption">It took 7 checks to reach 42. The numbered badges show the order it looked.</p>
            </div>
          </div>

          <CalloutBox title="The catch" type="warning" icon="⚠️">
            <Typography variant="body2">
              Linear search works on <strong>any</strong> list (sorted or messy), but if the list is long and your item is near the end, you do a <em>lot</em> of looking.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 3 ----------------------------------------------------------------- */}
        <Section title="Way 2: Split in Half Every Time (Binary Search)">
          <Typography variant="body2" paragraph>
            If the list is already <strong>sorted</strong>, you can be much smarter. Look at the <strong>middle</strong> item. If it&apos;s too small, throw away the entire left half. If it&apos;s too big, throw away the entire right half. Repeat on what&apos;s left. Each look <strong>cuts the problem in half</strong>.
          </Typography>

          <div className="ds-viz">
            <div className="illus">
              <div className="illus-label">Looking for 42 — binary search jumps to the middle each time:</div>
              <div className="illus-cells">
                {ILLUS.map((val, i) => {
                  const order = binaryOrder.indexOf(i);
                  const isTarget = i === ILLUS_TARGET_INDEX;
                  const checked = order !== -1;
                  return (
                    <div
                      key={i}
                      className={`illus-cell ${isTarget ? 'target' : checked ? 'hit' : 'dim'}`}
                    >
                      {checked && <span className="viz-badge binary">{order + 1}</span>}
                      {val}
                    </div>
                  );
                })}
              </div>
              <p className="ds-caption">Only 3 checks to reach 42 — it ignored everything else.</p>
            </div>
          </div>

          <CalloutBox title="One important rule" type="warning" icon="📋">
            <Typography variant="body2">
              Binary search <strong>only works on a sorted list</strong>. The whole trick — &quot;the answer must be to the left/right&quot; — falls apart if the items are out of order.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 4 ----------------------------------------------------------------- */}
        <Section title="Try It Yourself">
          <Typography variant="body2" paragraph>
            The list below is sorted. Pick a number to find and a strategy, then press <strong>Play</strong> (or step through). Count how many items each method has to look at.
          </Typography>

          <div className="ds-viz">
            <div className="ds-controls">
              <Button variant={algorithm === 'linear' ? 'contained' : 'outlined'} onClick={() => setAlgorithm('linear')}>
                Linear search
              </Button>
              <Button variant={algorithm === 'binary' ? 'contained' : 'outlined'} onClick={() => setAlgorithm('binary')}>
                Binary search
              </Button>
              <TextField
                label="Find this number"
                type="number"
                size="small"
                value={target}
                onChange={(e) => setTarget(parseInt(e.target.value, 10) || 0)}
                sx={{ width: 150 }}
              />
            </div>

            <div className="cells-row">
              {DATA.map((val, idx) => (
                <div key={idx} className={`search-cell ${snap.states[idx]}`}>
                  <span className="cell-index">{idx}</span>
                  <span className="cell-value">{val}</span>
                </div>
              ))}
            </div>

            <div className="ds-controls">
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
            </div>

            <p className="ds-output"><strong>Step {step + 1} / {snaps.length}:</strong> {snap.desc}</p>

            <div className="ds-legend">
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#fef9c3', borderColor: '#facc15' }} /> Looking here</span>
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#eff6ff', borderColor: '#93c5fd' }} /> Still possible</span>
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#bbf7d0', borderColor: '#22c55e' }} /> Found it</span>
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#f1f5f9', borderColor: '#cbd5e1', opacity: 0.5 }} /> Ruled out</span>
            </div>
          </div>

          <CalloutBox title="Try this" type="success" icon="🧪">
            <Typography variant="body2">
              Search for <strong>91</strong> (the last number) with each strategy. Linear search looks at all 11 boxes; binary search finds it in about 4. Then try a number that isn&apos;t there, like <strong>50</strong>, and watch how each one gives up.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 5 ----------------------------------------------------------------- */}
        <Section title="Why Binary Search Is So Fast">
          <Typography variant="body2" paragraph>
            Every time binary search looks at the middle, it <strong>throws away half</strong> of what&apos;s left. Halving again and again shrinks even a huge list to nothing in just a handful of steps.
          </Typography>

          <div className="ds-viz">
            <div className="illus-label">Starting with 16 items, each check roughly halves what&apos;s left:</div>
            {[
              { left: 16, w: 100 },
              { left: 8, w: 50 },
              { left: 4, w: 25 },
              { left: 2, w: 12.5 },
              { left: 1, w: 6.25 },
            ].map((row, i) => (
              <div className="halve-row" key={i}>
                <span style={{ width: 70, fontSize: 13, color: '#475569' }}>Check {i + 1}</span>
                <span className="halve-bar" style={{ width: `${row.w}%` }}>{row.left} left</span>
              </div>
            ))}
            <p className="ds-caption">16 items → found in 4 checks. A list of 1,000,000 items? Only about 20 checks.</p>
          </div>

          <CalloutBox title="The headline number" type="success" icon="⚡">
            <Typography variant="body2">
              Doubling the size of the list adds just <strong>one more step</strong> to binary search. Programmers call this <strong>O(log n)</strong> — but the plain-English version is &quot;ridiculously fast, even on giant lists.&quot; (More on these labels in <em>Algorithm Analysis &amp; Design</em>.)
            </Typography>
          </CalloutBox>
        </Section>

        {/* 6 ----------------------------------------------------------------- */}
        <Section title="Where You've Seen This">
          <CalloutBox title="Everyday examples" type="key-concepts" icon="🌍">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>📖 A dictionary or phone book:</strong> you flip toward the middle, not page 1 — that&apos;s binary search by hand.</Typography>
              <Typography variant="body2"><strong>🔍 &quot;Find on this page&quot; (Ctrl+F):</strong> scans the text item by item — linear search.</Typography>
              <Typography variant="body2"><strong>🎯 A guess-the-number game:</strong> &quot;higher or lower?&quot; is binary search.</Typography>
              <Typography variant="body2"><strong>🗄️ Databases:</strong> keep data sorted/indexed so lookups can use binary-search-style speed.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        {/* 7 ----------------------------------------------------------------- */}
        <Section title="Key Takeaways">
          <CalloutBox title="Remember these" type="success" icon="✅">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Linear search</strong> checks items one by one. Simple, works on any list, but slow on long ones.</Typography>
              <Typography variant="body2"><strong>Binary search</strong> repeatedly splits a <em>sorted</em> list in half. Far fewer checks.</Typography>
              <Typography variant="body2"><strong>The trade-off:</strong> binary search&apos;s speed depends entirely on the list already being in order.</Typography>
            </Box>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
