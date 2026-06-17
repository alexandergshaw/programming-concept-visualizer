'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import '../../../styles/dataStructures.css';

type Kind = 'waiting' | 'calling' | 'base' | 'returning';
type Frame = { label: string; kind: Kind };
type Snap = { frames: Frame[]; desc: string };

function factorial(n: number): number {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function buildSnaps(n: number): Snap[] {
  const snaps: Snap[] = [];

  // Descent: each call asks a smaller copy for help
  for (let i = n; i >= 1; i--) {
    const frames: Frame[] = [];
    for (let j = i; j <= n; j++) {
      frames.push({ label: `factorial(${j})`, kind: j === i ? (i === 1 ? 'base' : 'calling') : 'waiting' });
    }
    snaps.push({
      frames,
      desc:
        i === 1
          ? 'factorial(1) is the base case — it answers 1 right away. The descent stops here.'
          : `factorial(${i}) needs factorial(${i - 1}) first, so it pauses and calls a smaller copy.`,
    });
  }

  // Ascent: each paused call now finishes
  for (let i = 1; i <= n; i++) {
    const frames: Frame[] = [];
    for (let j = i; j <= n; j++) {
      frames.push({ label: j === i ? `factorial(${j}) = ${factorial(j)}` : `factorial(${j})`, kind: j === i ? 'returning' : 'waiting' });
    }
    snaps.push({
      frames,
      desc:
        i === n
          ? `factorial(${i}) returns ${factorial(i)} — the final answer.`
          : `factorial(${i}) returns ${factorial(i)} back to factorial(${i + 1}).`,
    });
  }

  return snaps;
}

const kindClass: Record<Kind, string> = {
  waiting: '',
  calling: 'calling active',
  base: 'base active',
  returning: 'returning active',
};

// Nesting-dolls illustration: each call sits inside a bigger one
function NestingDolls() {
  const rings = [
    { w: 300, h: 190, x: 10, y: 15, fill: '#dbeafe', stroke: '#60a5fa', label: 'factorial(4)', ly: 34 },
    { w: 224, h: 140, x: 48, y: 40, fill: '#bfdbfe', stroke: '#3b82f6', label: 'factorial(3)', ly: 59 },
    { w: 148, h: 90, x: 86, y: 65, fill: '#c7d2fe', stroke: '#6366f1', label: 'factorial(2)', ly: 84 },
    { w: 92, h: 48, x: 114, y: 86, fill: '#fee2e2', stroke: '#f87171', label: 'factorial(1) = 1', ly: 114 },
  ];
  return (
    <svg viewBox="0 0 320 220" style={{ width: '100%', maxWidth: 360, display: 'block', margin: '0 auto' }}>
      {rings.map((r, i) => (
        <g key={i}>
          <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={14} fill={r.fill} stroke={r.stroke} strokeWidth={2} />
          <text x={160} y={r.ly} textAnchor="middle" fontSize={13} fontWeight={700} fill="#1e293b">{r.label}</text>
        </g>
      ))}
    </svg>
  );
}

export default function RecursionVisualConcept() {
  const [n, setN] = useState(4);
  const snaps = useMemo(() => buildSnaps(n), [n]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setStep(0); setPlaying(false); }, [n]);

  useEffect(() => {
    if (!playing) return;
    if (step >= snaps.length - 1) { setPlaying(false); return; }
    timer.current = setTimeout(() => setStep((s) => s + 1), 1100);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [playing, step, snaps.length]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const snap = snaps[step];
  const phase = step < n ? 'Going down (calling smaller copies)' : 'Coming back up (returning answers)';

  return (
    <ConceptWrapper
      title="Recursion"
      description="A function that solves a problem by calling itself."
    >
      <TableOfContents numbered>
        {/* 1 ----------------------------------------------------------------- */}
        <Section title="The Big Idea">
          <CalloutBox title="Solve a smaller copy" type="key-concepts">
            <Typography variant="body2">
              A recursive function solves a big problem by handing a <strong>smaller copy of the same problem</strong> to itself — over and over, until the copy is tiny enough to answer instantly.
            </Typography>
          </CalloutBox>

          <div className="ds-viz" style={{ marginTop: 16 }}>
            <NestingDolls />
            <p className="ds-caption">Like nesting dolls: open each to find a smaller one, until the tiniest (the base case) that doesn&apos;t open.</p>
          </div>
        </Section>

        {/* 2 ----------------------------------------------------------------- */}
        <Section title="Every Recursion Needs Two Things">
          <CalloutBox title="The two rules" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Base case:</strong> the smallest version, answered directly — this is what makes the calls stop.</Typography>
              <Typography variant="body2"><strong>Recursive case:</strong> call yourself on a smaller input, moving toward the base case.</Typography>
            </Box>
          </CalloutBox>

          <CalloutBox title="Forget the base case" type="warning">
            <Typography variant="body2">
              ...and the function calls itself forever, then crashes. Every path must reach the base case.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 3 ----------------------------------------------------------------- */}
        <Section title="Watch It: Down, Then Back Up">
          <Typography variant="body2" paragraph>
            Calls stack up on the way <strong>down</strong> (each waiting on a smaller copy). Once the base case answers, the results travel <strong>back up</strong> and each call finishes. Step through <code>factorial(n)</code>:
          </Typography>

          <div className="ds-viz">
            <Box sx={{ px: 1, mb: 2 }}>
              <Typography variant="body2" gutterBottom>factorial({n})</Typography>
              <Slider value={n} min={1} max={6} step={1} marks onChange={(_, v) => setN(v as number)} valueLabelDisplay="auto" />
            </Box>

            <div className="ds-controls">
              <Button variant="outlined" onClick={() => { setPlaying(false); setStep((s) => Math.max(0, s - 1)); }} disabled={step === 0}>Previous</Button>
              <Button variant="contained" onClick={() => { setPlaying(false); setStep((s) => Math.min(snaps.length - 1, s + 1)); }} disabled={step >= snaps.length - 1}>Next</Button>
              <Button variant="outlined" onClick={() => setPlaying((p) => !p)} disabled={step >= snaps.length - 1}>{playing ? 'Pause' : 'Play'}</Button>
              <Button variant="text" color="secondary" onClick={() => { setPlaying(false); setStep(0); }}>Reset</Button>
              <Typography variant="body2" sx={{ ml: 'auto', fontWeight: 600, color: '#475569' }}>{phase}</Typography>
            </div>

            <div className="rec-frames">
              {snap.frames.map((f, i) => (
                <div key={i} className={`rec-frame ${kindClass[f.kind]}`}>
                  {f.kind === 'returning' ? <span className="rec-return">returns {f.label}</span> : f.label}
                </div>
              ))}
            </div>

            <p className="ds-output"><strong>Step {step + 1} / {snaps.length}:</strong> {snap.desc}</p>

            <div className="ds-legend">
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#fef9c3', borderColor: '#facc15' }} /> Calling deeper</span>
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#fee2e2', borderColor: '#f87171' }} /> Base case</span>
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#dcfce7', borderColor: '#4ade80' }} /> Returning</span>
            </div>
          </div>
        </Section>

        {/* 4 ----------------------------------------------------------------- */}
        <Section title="The Code">
          <CodeSnippet
            language="python"
            lines={[
              { code: 'def factorial(n):' },
              { code: '    if n == 1:                    # base case' },
              { code: '        return 1' },
              { code: '    return n * factorial(n - 1)   # smaller copy' },
              { code: '' },
              { code: 'print(factorial(4))   # 24' }
            ]}
          />
          <CalloutBox title="Connecting back" type="success">
            <Typography variant="body2">
              Both rules are right there: stop at the base case, otherwise call a smaller copy. That is every recursion.
            </Typography>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
