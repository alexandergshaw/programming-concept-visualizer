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

// Static illustration data (a smaller, clearer list)
const ILLUS = [3, 9, 14, 21, 28, 35, 42, 50];
const ILLUS_TARGET_INDEX = 6; // value 42
const linearBadges = ILLUS.map((_, i) => (i <= ILLUS_TARGET_INDEX ? i + 1 : null));
const binaryOrder = [3, 5, 6]; // middles binary search would visit to reach index 6

function countLinear(target: number): { checks: number; found: boolean } {
  for (let i = 0; i < DATA.length; i++) {
    if (DATA[i] === target) return { checks: i + 1, found: true };
  }
  return { checks: DATA.length, found: false };
}

function countBinary(target: number): { checks: number; found: boolean } {
  let lo = 0;
  let hi = DATA.length - 1;
  let checks = 0;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    checks += 1;
    if (DATA[mid] === target) return { checks, found: true };
    if (DATA[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return { checks, found: false };
}

function linearSnaps(arr: number[], target: number): Snap[] {
  const snaps: Snap[] = [];
  for (let i = 0; i < arr.length; i++) {
    const states: CellState[] = arr.map((_, idx) => (idx < i ? 'eliminated' : ''));
    states[i] = 'active';
    snaps.push({ states, desc: `Check position ${i}: is ${arr[i]} the number we want (${target})?` });
    if (arr[i] === target) {
      const found: CellState[] = arr.map((_, idx) => (idx < i ? 'eliminated' : ''));
      found[i] = 'found';
      snaps.push({ states: found, desc: `Found ${target} at position ${i}. That took ${i + 1} checks.` });
      return snaps;
    }
  }
  snaps.push({ states: arr.map(() => 'eliminated'), desc: `Checked every item — ${target} is not in the list.` });
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
      snaps.push({ states: found, desc: `The middle number ${arr[mid]} equals ${target} — found in ${checks} checks.` });
      return snaps;
    }
    if (arr[mid] < target) {
      snaps.push({ states, desc: `Middle is ${arr[mid]}, smaller than ${target}. Throw away the left half.` });
      lo = mid + 1;
    } else {
      snaps.push({ states, desc: `Middle is ${arr[mid]}, larger than ${target}. Throw away the right half.` });
      hi = mid - 1;
    }
  }
  snaps.push({ states: arr.map(() => 'eliminated'), desc: `Nothing left to check — ${target} is not in the list.` });
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
  const linearResult = useMemo(() => countLinear(target), [target]);
  const binaryResult = useMemo(() => countBinary(target), [target]);

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
      description="Finding where a value lives in a list."
    >
      <TableOfContents numbered>
        {/* 1 ----------------------------------------------------------------- */}
        <Section title="The Big Idea">
          <CalloutBox title="Searching is elimination" type="key-concepts">
            <Typography variant="body2">
              Every search rules out items until only the answer is left. <strong>The faster you can rule items out, the faster you find what you want.</strong>
            </Typography>
          </CalloutBox>
          <Typography variant="body2" sx={{ mt: 2 }}>
            That single idea separates the two strategies below: one rules out <em>one</em> item per step, the other rules out <em>half the list</em> per step.
          </Typography>
        </Section>

        {/* 2 ----------------------------------------------------------------- */}
        <Section title="Rule Out One at a Time (Linear Search)">
          <Typography variant="body2" paragraph>
            Check each item from the start until you find the target. Works on any list.
          </Typography>

          <div className="ds-viz">
            <div className="illus">
              <div className="illus-label">Finding 42 — one check per item:</div>
              <div className="illus-cells">
                {ILLUS.map((val, i) => (
                  <div key={i} className={`illus-cell ${i === ILLUS_TARGET_INDEX ? 'target' : linearBadges[i] ? 'hit' : 'dim'}`}>
                    {linearBadges[i] && <span className="viz-badge">{linearBadges[i]}</span>}
                    {val}
                  </div>
                ))}
              </div>
              <p className="ds-caption">7 checks to reach 42.</p>
            </div>
          </div>
        </Section>

        {/* 3 ----------------------------------------------------------------- */}
        <Section title="Rule Out Half at a Time (Binary Search)">
          <Typography variant="body2" paragraph>
            On a <strong>sorted</strong> list, check the middle. Too small? Drop the left half. Too big? Drop the right half. Repeat. Each check halves what&apos;s left.
          </Typography>

          <div className="ds-viz">
            <div className="illus">
              <div className="illus-label">Finding 42 — jump to the middle each time:</div>
              <div className="illus-cells">
                {ILLUS.map((val, i) => {
                  const order = binaryOrder.indexOf(i);
                  const isTarget = i === ILLUS_TARGET_INDEX;
                  const checked = order !== -1;
                  return (
                    <div key={i} className={`illus-cell ${isTarget ? 'target' : checked ? 'hit' : 'dim'}`}>
                      {checked && <span className="viz-badge binary">{order + 1}</span>}
                      {val}
                    </div>
                  );
                })}
              </div>
              <p className="ds-caption">Only 3 checks to reach 42.</p>
            </div>
          </div>

          <CalloutBox title="The catch" type="warning">
            <Typography variant="body2">
              Binary search only works if the list is <strong>sorted</strong> — that&apos;s what lets you trust &quot;the answer must be on this side.&quot;
            </Typography>
          </CalloutBox>
        </Section>

        {/* 4 ----------------------------------------------------------------- */}
        <Section title="Try It">
          <Typography variant="body2" paragraph>
            Pick a target and a strategy. The scoreboard shows how many items each one rules out before finding the answer.
          </Typography>

          <div className="ds-viz">
            <div className="ds-controls">
              <Button variant={algorithm === 'linear' ? 'contained' : 'outlined'} onClick={() => setAlgorithm('linear')}>Linear</Button>
              <Button variant={algorithm === 'binary' ? 'contained' : 'outlined'} onClick={() => setAlgorithm('binary')}>Binary</Button>
              <TextField label="Find" type="number" size="small" value={target} onChange={(e) => setTarget(parseInt(e.target.value, 10) || 0)} sx={{ width: 110 }} />
            </div>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              <Box sx={{ flex: 1, minWidth: 150, p: 1.5, borderRadius: 2, border: '1px solid', borderColor: algorithm === 'linear' ? '#2563eb' : '#e2e8f0', bgcolor: '#f8fafc' }}>
                <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>Linear</Typography>
                <Typography variant="h6" sx={{ color: '#3b82f6', fontWeight: 700 }}>
                  {linearResult.found ? `${linearResult.checks} checks` : `${linearResult.checks} (not found)`}
                </Typography>
              </Box>
              <Box sx={{ flex: 1, minWidth: 150, p: 1.5, borderRadius: 2, border: '1px solid', borderColor: algorithm === 'binary' ? '#2563eb' : '#e2e8f0', bgcolor: '#f8fafc' }}>
                <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>Binary</Typography>
                <Typography variant="h6" sx={{ color: '#8b5cf6', fontWeight: 700 }}>
                  {binaryResult.found ? `${binaryResult.checks} checks` : `${binaryResult.checks} (not found)`}
                </Typography>
              </Box>
            </Box>

            <div className="cells-row">
              {DATA.map((val, idx) => (
                <div key={idx} className={`search-cell ${snap.states[idx]}`}>
                  <span className="cell-index">{idx}</span>
                  <span className="cell-value">{val}</span>
                </div>
              ))}
            </div>

            <div className="ds-controls">
              <Button variant="outlined" onClick={() => { setPlaying(false); setStep((s) => Math.max(0, s - 1)); }} disabled={step === 0}>Previous</Button>
              <Button variant="contained" onClick={() => { setPlaying(false); setStep((s) => Math.min(snaps.length - 1, s + 1)); }} disabled={step >= snaps.length - 1}>Next</Button>
              <Button variant="outlined" onClick={() => setPlaying((p) => !p)} disabled={step >= snaps.length - 1}>{playing ? 'Pause' : 'Play'}</Button>
              <Button variant="text" color="secondary" onClick={() => { setPlaying(false); setStep(0); }}>Reset</Button>
            </div>

            <p className="ds-output"><strong>Step {step + 1} / {snaps.length}:</strong> {snap.desc}</p>
          </div>

          <Typography variant="body2" sx={{ mt: 1 }}>
            Try finding <strong>91</strong> with each strategy, then try <strong>50</strong> (not in the list).
          </Typography>
        </Section>

        {/* 5 ----------------------------------------------------------------- */}
        <Section title="Why Halving Wins">
          <Typography variant="body2" paragraph>
            Ruling out half the list each step adds up fast.
          </Typography>

          <div className="ds-viz">
            {[
              { left: 16, w: 100 },
              { left: 8, w: 50 },
              { left: 4, w: 25 },
              { left: 2, w: 12.5 },
              { left: 1, w: 6.25 },
            ].map((row, i) => (
              <div className="halve-row" key={i}>
                <span style={{ width: 64, fontSize: 13, color: '#475569' }}>Check {i + 1}</span>
                <span className="halve-bar" style={{ width: `${row.w}%` }}>{row.left} left</span>
              </div>
            ))}
            <p className="ds-caption">16 items: found in 4 checks. 1,000,000 items: about 20.</p>
          </div>

          <CalloutBox title="Connecting back" type="success">
            <Typography variant="body2">
              Same goal, very different speed — because binary search eliminates more per step. That is the whole point of searching: <strong>rule out as much as you can, as fast as you can.</strong>
            </Typography>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
