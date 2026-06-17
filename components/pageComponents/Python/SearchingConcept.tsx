'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import ConceptInfoCard from '../../common/ConceptInfoCard';
import TableOfContents from '@/components/common/TableOfContents';
import '../../../styles/dataStructures.css';

const DATA = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91];
type CellState = '' | 'range' | 'active' | 'eliminated' | 'found';
type Snap = { states: CellState[]; desc: string };

function linearSnaps(arr: number[], target: number): Snap[] {
  const snaps: Snap[] = [];
  for (let i = 0; i < arr.length; i++) {
    const states: CellState[] = arr.map((_, idx) => (idx < i ? 'eliminated' : ''));
    states[i] = 'active';
    snaps.push({ states, desc: `Check index ${i}: is ${arr[i]} the value we want (${target})?` });
    if (arr[i] === target) {
      const found: CellState[] = arr.map((_, idx) => (idx < i ? 'eliminated' : ''));
      found[i] = 'found';
      snaps.push({ states: found, desc: `Found ${target} at index ${i}! It took ${i + 1} checks. ✅` });
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
      snaps.push({ states: found, desc: `Middle value ${arr[mid]} equals ${target} — found at index ${mid} in just ${checks} checks! ✅` });
      return snaps;
    }
    if (arr[mid] < target) {
      snaps.push({ states, desc: `Window ${lo}–${hi}. Middle is ${arr[mid]} < ${target}, so the answer must be to the right — discard the left half.` });
      lo = mid + 1;
    } else {
      snaps.push({ states, desc: `Window ${lo}–${hi}. Middle is ${arr[mid]} > ${target}, so the answer must be to the left — discard the right half.` });
      hi = mid - 1;
    }
  }
  snaps.push({ states: arr.map(() => 'eliminated'), desc: `The window is empty — ${target} is not in the list. ❌` });
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
      description="Searching means finding where a value lives in a collection. The smarter your method, the fewer items you have to look at."
    >
      <TableOfContents numbered>
        <Section title="Two Ways to Find a Name">
          <Typography variant="body2" paragraph>
            Imagine looking for a name in a phone book. You could read <em>every</em> name from the start — that&apos;s <strong>linear search</strong>. Or you could flip to the middle, decide which half the name is in, and repeat — that&apos;s <strong>binary search</strong>. Binary search is dramatically faster, but it only works if the list is already <strong>sorted</strong>.
          </Typography>

          <ConceptInfoCard>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2">
                <strong>🔎 Linear search — O(n):</strong> check each item one by one. Works on any list, sorted or not.
              </Typography>
              <Typography variant="body2">
                <strong>⚡ Binary search — O(log n):</strong> repeatedly halve a sorted list. 1,000,000 items take only ~20 checks!
              </Typography>
            </Box>
          </ConceptInfoCard>
        </Section>

        <Section title="Watch Them Search">
          <Typography variant="body2" paragraph>
            The list below is sorted. Pick a target and an algorithm, then step through to compare how many items each one has to look at.
          </Typography>

          <div className="ds-viz">
            <div className="ds-controls">
              <Button
                variant={algorithm === 'linear' ? 'contained' : 'outlined'}
                onClick={() => setAlgorithm('linear')}
              >
                Linear search
              </Button>
              <Button
                variant={algorithm === 'binary' ? 'contained' : 'outlined'}
                onClick={() => setAlgorithm('binary')}
              >
                Binary search
              </Button>
              <TextField
                label="Target"
                type="number"
                size="small"
                value={target}
                onChange={(e) => setTarget(parseInt(e.target.value, 10) || 0)}
                sx={{ width: 110 }}
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
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#eff6ff', borderColor: '#93c5fd' }} /> Still in range</span>
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#bbf7d0', borderColor: '#22c55e' }} /> Found</span>
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#f1f5f9', borderColor: '#cbd5e1', opacity: 0.5 }} /> Ruled out</span>
            </div>
          </div>

          <Alert severity="info" sx={{ mt: 1 }}>
            <Typography variant="body2">
              Try searching for <strong>91</strong> (the last item) with both methods. Linear search checks all 11 cells; binary search finds it in about 4. The gap only grows as the list gets bigger.
            </Typography>
          </Alert>
        </Section>

        <Section title="When to Use Which">
          <ConceptInfoCard>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2">
                <strong>Use linear search</strong> when the list is small or unsorted, or you only search once.
              </Typography>
              <Typography variant="body2">
                <strong>Use binary search</strong> when the list is sorted and you&apos;ll search it many times — the speed is worth keeping it sorted.
              </Typography>
              <Typography variant="body2">
                <strong>Remember the trade-off:</strong> binary search&apos;s speed depends entirely on the data already being in order.
              </Typography>
            </Box>
          </ConceptInfoCard>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
