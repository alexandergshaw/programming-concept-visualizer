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

// --- Static illustration data (a smaller, clearer list) --------------------
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
      snaps.push({ states: found, desc: `The middle number ${arr[mid]} equals ${target} — found at position ${mid} in ${checks} checks.` });
      return snaps;
    }
    if (arr[mid] < target) {
      snaps.push({ states, desc: `Middle value ${arr[mid]} is smaller than ${target}, so the answer must be to the right. Discard the entire left half.` });
      lo = mid + 1;
    } else {
      snaps.push({ states, desc: `Middle value ${arr[mid]} is larger than ${target}, so the answer must be to the left. Discard the entire right half.` });
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
      description="Searching is how a program finds where a value lives in a list. The smarter the method, the fewer items it has to examine."
    >
      <TableOfContents numbered>
        {/* 1 ----------------------------------------------------------------- */}
        <Section title="The Big Idea">
          <Typography variant="body2" paragraph>
            Suppose you want to find a contact named Maria in your phone. You could scroll from the very top, name by name, until you reach hers. Or, because your contacts are in alphabetical order, you could jump to the middle, check whether you have gone too far, and keep narrowing the range.
          </Typography>
          <Typography variant="body2" paragraph>
            Those are the two fundamental searching strategies, and computers rely on the same two ideas.
          </Typography>

          <CalloutBox title="Definition" type="info">
            <Typography variant="body2">
              <strong>Searching</strong> is the process of looking through a collection to locate one specific item, or to determine that the item is not present.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 2 ----------------------------------------------------------------- */}
        <Section title="Linear Search: Check Every Item">
          <Typography variant="body2" paragraph>
            The most direct method is to start at the beginning and examine every item in turn until the target is found. This is the equivalent of reading a grocery list from top to bottom looking for &quot;milk.&quot;
          </Typography>

          <div className="ds-viz">
            <div className="illus">
              <div className="illus-label">Searching for 42 — linear search examines each box in order:</div>
              <div className="illus-cells">
                {ILLUS.map((val, i) => (
                  <div key={i} className={`illus-cell ${i === ILLUS_TARGET_INDEX ? 'target' : linearBadges[i] ? 'hit' : 'dim'}`}>
                    {linearBadges[i] && <span className="viz-badge">{linearBadges[i]}</span>}
                    {val}
                  </div>
                ))}
              </div>
              <p className="ds-caption">Reaching 42 took 7 checks. The numbered badges show the order of examination.</p>
            </div>
          </div>

          <CalloutBox title="Trade-off" type="warning">
            <Typography variant="body2">
              Linear search works on any list, sorted or unsorted. The downside is that for a long list, an item near the end requires examining nearly everything.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 3 ----------------------------------------------------------------- */}
        <Section title="Binary Search: Halve the Range Each Step">
          <Typography variant="body2" paragraph>
            When the list is sorted, a far more efficient approach is available. Examine the middle item. If it is smaller than the target, discard the entire left half; if it is larger, discard the entire right half. Repeat on whatever remains. Each examination eliminates half of the remaining items.
          </Typography>

          <div className="ds-viz">
            <div className="illus">
              <div className="illus-label">Searching for 42 — binary search jumps to the middle of each remaining range:</div>
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
              <p className="ds-caption">Reaching 42 took only 3 checks; everything else was eliminated without being examined.</p>
            </div>
          </div>

          <CalloutBox title="Prerequisite" type="warning">
            <Typography variant="body2">
              Binary search requires a <strong>sorted</strong> list. The core deduction — &quot;the answer must be to the left or right&quot; — depends entirely on the items being in order.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 4 ----------------------------------------------------------------- */}
        <Section title="Interactive Comparison">
          <Typography variant="body2" paragraph>
            The list below is sorted. Choose a number to find and a strategy, then use Play or step through manually. The scoreboard updates instantly so you can compare how many checks each method needs for the same target.
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

            {/* Live scoreboard */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              <Box sx={{ flex: 1, minWidth: 180, p: 1.5, borderRadius: 2, border: '1px solid', borderColor: algorithm === 'linear' ? '#2563eb' : '#e2e8f0', bgcolor: '#f8fafc' }}>
                <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>Linear search</Typography>
                <Typography variant="h6" sx={{ color: '#3b82f6', fontWeight: 700 }}>
                  {linearResult.found ? `${linearResult.checks} checks` : `${linearResult.checks} checks (not found)`}
                </Typography>
              </Box>
              <Box sx={{ flex: 1, minWidth: 180, p: 1.5, borderRadius: 2, border: '1px solid', borderColor: algorithm === 'binary' ? '#2563eb' : '#e2e8f0', bgcolor: '#f8fafc' }}>
                <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>Binary search</Typography>
                <Typography variant="h6" sx={{ color: '#8b5cf6', fontWeight: 700 }}>
                  {binaryResult.found ? `${binaryResult.checks} checks` : `${binaryResult.checks} checks (not found)`}
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
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#fef9c3', borderColor: '#facc15' }} /> Examining</span>
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#eff6ff', borderColor: '#93c5fd' }} /> Still possible</span>
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#bbf7d0', borderColor: '#22c55e' }} /> Found</span>
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#f1f5f9', borderColor: '#cbd5e1', opacity: 0.5 }} /> Eliminated</span>
            </div>
          </div>

          <CalloutBox title="Suggested experiment" type="success">
            <Typography variant="body2">
              Search for <strong>91</strong> (the last value) with each strategy and compare the scoreboard: linear search examines all 11 items, while binary search finds it in about 4. Then enter a value that is not present, such as <strong>50</strong>, to see how each method concludes the item is missing.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 5 ----------------------------------------------------------------- */}
        <Section title="Why Binary Search Scales So Well">
          <Typography variant="body2" paragraph>
            Each examination in binary search discards half of the remaining items. Halving repeatedly reduces even a very large list to a single candidate in a small number of steps.
          </Typography>

          <div className="ds-viz">
            <div className="illus-label">Starting from 16 items, each check roughly halves what remains:</div>
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
            <p className="ds-caption">16 items resolve in 4 checks. A list of 1,000,000 items requires only about 20.</p>
          </div>

          <CalloutBox title="Scaling behaviour" type="info">
            <Typography variant="body2">
              Doubling the size of the list adds just one additional step to binary search. This growth rate is written as <strong>O(log n)</strong> and is covered in detail in <em>Algorithm Analysis &amp; Design</em>.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 6 ----------------------------------------------------------------- */}
        <Section title="Real-World Examples">
          <CalloutBox title="Where these strategies appear" type="key-concepts">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Dictionaries and phone books:</strong> flipping toward the middle rather than starting at page one is binary search performed by hand.</Typography>
              <Typography variant="body2"><strong>Find on a page (Ctrl+F):</strong> scanning text item by item is linear search.</Typography>
              <Typography variant="body2"><strong>Number-guessing games:</strong> a &quot;higher or lower&quot; strategy is binary search.</Typography>
              <Typography variant="body2"><strong>Databases:</strong> data is kept sorted or indexed so lookups can use binary-search-style efficiency.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        {/* 7 ----------------------------------------------------------------- */}
        <Section title="Key Takeaways">
          <CalloutBox title="Summary" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Linear search</strong> examines items one at a time. It is simple and works on any list, but is slow for long lists.</Typography>
              <Typography variant="body2"><strong>Binary search</strong> repeatedly halves a sorted list, requiring far fewer checks.</Typography>
              <Typography variant="body2"><strong>The trade-off:</strong> binary search&apos;s efficiency depends on the list being sorted in advance.</Typography>
            </Box>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
