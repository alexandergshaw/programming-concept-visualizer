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

  // Going down: factorial(n) keeps calling a smaller copy of itself
  for (let i = n; i >= 1; i--) {
    const frames: Frame[] = [];
    for (let j = i; j <= n; j++) {
      frames.push({ label: `factorial(${j})`, kind: j === i ? (i === 1 ? 'base' : 'calling') : 'waiting' });
    }
    snaps.push({
      frames,
      desc:
        i === 1
          ? 'factorial(1) is the base case — it can answer immediately (1) without calling deeper. The going-down phase stops here.'
          : `factorial(${i}) can't finish yet: it needs factorial(${i - 1}) first, so it pauses and calls a smaller copy.`,
    });
  }

  // Coming back up: each paused call now gets its answer and finishes
  for (let i = 1; i <= n; i++) {
    const frames: Frame[] = [];
    for (let j = i; j <= n; j++) {
      frames.push({ label: j === i ? `factorial(${j}) = ${factorial(j)}` : `factorial(${j})`, kind: j === i ? 'returning' : 'waiting' });
    }
    snaps.push({
      frames,
      desc:
        i === n
          ? `factorial(${i}) finishes and returns ${factorial(i)} — that's the final answer! 🎉`
          : `factorial(${i}) now returns ${factorial(i)}, handing it back to factorial(${i + 1}), which was waiting for it.`,
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

// Nesting-dolls illustration: each ring is a smaller call inside a bigger one
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
  const phase = step < n ? 'Going down ⬇️ (calling smaller copies)' : 'Coming back up ⬆️ (returning answers)';

  return (
    <ConceptWrapper
      title="Recursion"
      description="Recursion is when a function solves a big problem by calling itself on a smaller version of the same problem."
    >
      <TableOfContents numbered>
        {/* 1 ----------------------------------------------------------------- */}
        <Section title="The Big Idea">
          <Typography variant="body2" paragraph>
            Picture a set of <strong>Russian nesting dolls</strong>. To open the biggest doll you have to open the slightly smaller one inside it, and the one inside that, and so on — until you reach the tiniest doll that doesn&apos;t open at all. Then you close them all back up, one by one.
          </Typography>
          <Typography variant="body2" paragraph>
            A recursive function works the same way: it keeps handing a smaller version of the job to <em>another copy of itself</em> until the job is small enough to answer instantly.
          </Typography>

          <div className="ds-viz">
            <div className="illus-label">Each call contains a smaller call inside it:</div>
            <NestingDolls />
            <p className="ds-caption">The smallest doll (red) is the &quot;base case&quot; — the one that can answer without opening anything else.</p>
          </div>

          <CalloutBox title="In plain English" type="info" icon="💡">
            <Typography variant="body2">
              <strong>Recursion</strong> = a function that calls itself, each time on a smaller or simpler input, until it hits a case simple enough to answer directly.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 2 ----------------------------------------------------------------- */}
        <Section title="The Two Rules Every Recursion Needs">
          <CalloutBox title="Rule 1 — the base case 🛑" type="key-concepts" icon="🛑">
            <Typography variant="body2">
              The simplest version of the problem, one you can answer <strong>without</strong> calling yourself again. This is what makes the chain of calls eventually <em>stop</em>. (For our nesting dolls, it&apos;s the tiniest doll.)
            </Typography>
          </CalloutBox>

          <CalloutBox title="Rule 2 — the recursive case 🔁" type="key-concepts" icon="🔁">
            <Typography variant="body2">
              The function calls itself on a <strong>smaller</strong> input, getting one step closer to the base case each time.
            </Typography>
          </CalloutBox>

          <CalloutBox title="Forget the base case and..." type="warning" icon="⚠️">
            <Typography variant="body2">
              ...the function calls itself <strong>forever</strong>. That&apos;s an <em>infinite recursion</em>, and the program eventually runs out of memory and crashes. Always make sure every path leads to the base case.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 3 ----------------------------------------------------------------- */}
        <Section title="Down, Then Back Up">
          <Typography variant="body2" paragraph>
            Recursion happens in two phases. First it goes <strong>down</strong>, with each call pausing and asking a smaller copy for help. Once the base case answers, the results travel <strong>back up</strong>, with each paused call finishing its math.
          </Typography>

          <div className="ds-viz">
            <div className="illus-label">⬇️ Going down — keep asking a smaller copy:</div>
            <div className="flow" style={{ marginBottom: 18 }}>
              <span className="flow-step">factorial(4)</span>
              <span className="flow-arrow">→</span>
              <span className="flow-step">factorial(3)</span>
              <span className="flow-arrow">→</span>
              <span className="flow-step">factorial(2)</span>
              <span className="flow-arrow">→</span>
              <span className="flow-step" style={{ background: '#fee2e2', borderColor: '#f87171', color: '#991b1b' }}>factorial(1) = 1</span>
            </div>
            <div className="illus-label">⬆️ Coming back up — now each one can finish:</div>
            <div className="flow">
              <span className="flow-step" style={{ background: '#dcfce7', borderColor: '#4ade80', color: '#166534' }}>1</span>
              <span className="flow-arrow">→</span>
              <span className="flow-step" style={{ background: '#dcfce7', borderColor: '#4ade80', color: '#166534' }}>2 × 1 = 2</span>
              <span className="flow-arrow">→</span>
              <span className="flow-step" style={{ background: '#dcfce7', borderColor: '#4ade80', color: '#166534' }}>3 × 2 = 6</span>
              <span className="flow-arrow">→</span>
              <span className="flow-step" style={{ background: '#dcfce7', borderColor: '#4ade80', color: '#166534' }}>4 × 6 = 24</span>
            </div>
          </div>
        </Section>

        {/* 4 ----------------------------------------------------------------- */}
        <Section title="Watch the Call Stack">
          <Typography variant="body2" paragraph>
            Every time the function calls itself, the computer stacks up a paused copy — exactly like a stack of plates. When the base case is reached, the plates come off the top one at a time as each call finishes. Step through <code>factorial(n)</code> to see it.
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

            <p className="ds-output"><strong>Step {step + 1} / {snaps.length}:</strong> {snap.desc}</p>

            <div className="ds-legend">
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#fef9c3', borderColor: '#facc15' }} /> Calling deeper</span>
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#fee2e2', borderColor: '#f87171' }} /> Base case</span>
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#dcfce7', borderColor: '#4ade80' }} /> Returning a value</span>
            </div>
          </div>

          <CalloutBox title="Try this" type="success" icon="🧪">
            <Typography variant="body2">
              Set <strong>n = 6</strong> and press Play. Notice how the stack grows to its tallest at the base case, then shrinks back down as the answers come up.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 5 ----------------------------------------------------------------- */}
        <Section title="The Code Behind It">
          <Typography variant="body2" paragraph>
            Here&apos;s the actual function the animation runs. It&apos;s tiny — that&apos;s the appeal of recursion. Notice the two rules in the code: the <strong>base case</strong> and the <strong>recursive case</strong>.
          </Typography>
          <CodeSnippet
            language="python"
            lines={[
              { code: 'def factorial(n):' },
              { code: '    if n == 1:                    # base case: stop here' },
              { code: '        return 1' },
              { code: '    return n * factorial(n - 1)   # recursive case: smaller copy' },
              { code: '' },
              { code: 'print(factorial(4))   # 24' }
            ]}
          />
        </Section>

        {/* 6 ----------------------------------------------------------------- */}
        <Section title="Recursion vs. Loops">
          <Typography variant="body2" paragraph>
            A loop and recursion can solve the same problems — they&apos;re equally powerful. The question is which one makes your code <em>clearer</em>.
          </Typography>

          <CalloutBox title="Which should I reach for?" type="key-concepts" icon="🤔">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Use recursion</strong> when a problem naturally breaks into smaller copies of itself — trees, nested folders, or divide-and-conquer algorithms.</Typography>
              <Typography variant="body2"><strong>Use a loop</strong> when you&apos;re simply repeating a step a set number of times — it usually uses less memory and is easier to follow.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        {/* 7 ----------------------------------------------------------------- */}
        <Section title="Key Takeaways">
          <CalloutBox title="Remember these" type="success" icon="✅">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Recursion</strong> is a function calling itself on a smaller version of the problem.</Typography>
              <Typography variant="body2"><strong>Every recursion needs a base case</strong> (to stop) and a recursive case (to shrink the problem).</Typography>
              <Typography variant="body2"><strong>It runs in two phases:</strong> calls pile up going down, then resolve coming back up.</Typography>
            </Box>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
