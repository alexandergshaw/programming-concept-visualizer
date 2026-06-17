'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Alert from '@mui/material/Alert';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import ConceptInfoCard from '../../common/ConceptInfoCard';
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

  // Descent: factorial(n) calls down to the base case
  for (let i = n; i >= 1; i--) {
    const frames: Frame[] = [];
    for (let j = i; j <= n; j++) {
      frames.push({
        label: `factorial(${j})`,
        kind: j === i ? (i === 1 ? 'base' : 'calling') : 'waiting',
      });
    }
    snaps.push({
      frames,
      desc:
        i === 1
          ? 'factorial(1) is the base case — it can return 1 immediately without calling deeper.'
          : `factorial(${i}) can't finish yet: it needs factorial(${i - 1}), so it pauses and calls deeper.`,
    });
  }

  // Ascent: each frame returns its value and pops off the stack
  for (let i = 1; i <= n; i++) {
    const frames: Frame[] = [];
    for (let j = i; j <= n; j++) {
      frames.push({
        label: j === i ? `factorial(${j}) = ${factorial(j)}` : `factorial(${j})`,
        kind: j === i ? 'returning' : 'waiting',
      });
    }
    snaps.push({
      frames,
      desc:
        i === n
          ? `factorial(${i}) returns ${factorial(i)} — that's the final answer! 🎉`
          : `factorial(${i}) returns ${factorial(i)}, handing it back to factorial(${i + 1}).`,
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

export default function RecursionVisualConcept() {
  const [n, setN] = useState(4);
  const snaps = useMemo(() => buildSnaps(n), [n]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset to start whenever n changes
  useEffect(() => {
    setStep(0);
    setPlaying(false);
  }, [n]);

  // Auto-play
  useEffect(() => {
    if (!playing) return;
    if (step >= snaps.length - 1) { setPlaying(false); return; }
    timer.current = setTimeout(() => setStep((s) => s + 1), 1100);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [playing, step, snaps.length]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const snap = snaps[step];
  const phase = step < n ? 'Calling deeper ⬇️' : 'Returning back up ⬆️';

  return (
    <ConceptWrapper
      title="Recursion"
      description="Recursion is when a function solves a problem by calling itself on a smaller version of that problem."
    >
      <TableOfContents numbered>
        <Section title="Think of Nesting Dolls">
          <Typography variant="body2" paragraph>
            A recursive function is like a set of <strong>Russian nesting dolls</strong>. To open the biggest doll you open the next one inside, and the next, until you reach the tiniest doll that doesn&apos;t open — the <strong>base case</strong>. Then you close them back up one by one.
          </Typography>

          <ConceptInfoCard>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              Every Recursion Needs Two Things
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2">
                <strong>🛑 A base case:</strong> the simplest version that can be answered directly, so the calls stop
              </Typography>
              <Typography variant="body2">
                <strong>🔁 A recursive case:</strong> the function calls itself on a smaller input, moving toward the base case
              </Typography>
            </Box>
          </ConceptInfoCard>

          <Alert severity="warning" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Forget the base case and the function calls itself forever — that&apos;s an <strong>infinite recursion</strong>, and the program crashes when the call stack runs out of room.
            </Typography>
          </Alert>
        </Section>

        <Section title="Watch the Call Stack">
          <Typography variant="body2" paragraph>
            Each time the function calls itself, the computer stacks up a paused copy (a <strong>frame</strong>) — exactly like a stack of plates. Once the base case is hit, the frames resolve from the top down. Step through <code>factorial(n)</code> below to see it happen.
          </Typography>

          <div className="ds-viz">
            <Box sx={{ px: 1, mb: 2 }}>
              <Typography variant="body2" gutterBottom>
                Compute <strong>factorial({n})</strong>
              </Typography>
              <Slider value={n} min={1} max={6} step={1} marks onChange={(_, v) => setN(v as number)} valueLabelDisplay="auto" />
            </Box>

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
              <Typography variant="body2" sx={{ ml: 'auto', fontWeight: 600, color: '#475569' }}>
                {phase}
              </Typography>
            </div>

            <div className="rec-frames">
              {snap.frames.map((f, i) => (
                <div key={i} className={`rec-frame ${kindClass[f.kind]}`}>
                  {f.kind === 'returning' ? <span className="rec-return">↩ {f.label}</span> : f.label}
                </div>
              ))}
            </div>

            <p className="ds-output">
              <strong>Step {step + 1} / {snaps.length}:</strong> {snap.desc}
            </p>

            <div className="ds-legend">
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#fef9c3', borderColor: '#facc15' }} /> Calling deeper</span>
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#fee2e2', borderColor: '#f87171' }} /> Base case</span>
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#dcfce7', borderColor: '#4ade80' }} /> Returning a value</span>
            </div>
          </div>
        </Section>

        <Section title="The Code Behind It">
          <Typography variant="body2" paragraph>
            Here&apos;s the function the animation is running. Notice how small it is — recursion lets you express &quot;do this, then the rest&quot; very compactly.
          </Typography>
          <CodeSnippet
            language="python"
            lines={[
              { code: 'def factorial(n):' },
              { code: '    if n == 1:          # base case' },
              { code: '        return 1' },
              { code: '    return n * factorial(n - 1)   # recursive case' },
              { code: '' },
              { code: 'print(factorial(4))   # 24' }
            ]}
          />
        </Section>

        <Section title="Recursion vs. Loops">
          <ConceptInfoCard>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2">
                <strong>Anything recursive can be written with a loop</strong>, and vice versa — they&apos;re equally powerful.
              </Typography>
              <Typography variant="body2">
                <strong>Reach for recursion</strong> when a problem naturally breaks into smaller copies of itself: trees, nested folders, or divide-and-conquer algorithms.
              </Typography>
              <Typography variant="body2">
                <strong>Reach for a loop</strong> when you&apos;re simply repeating a step a fixed number of times — it usually uses less memory.
              </Typography>
            </Box>
          </ConceptInfoCard>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
