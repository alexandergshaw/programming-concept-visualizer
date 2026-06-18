'use client';

import { useState, useRef } from 'react';
import { withAlpha } from '@/components/common/colorUtils';

const stepColors = ['var(--info)', 'var(--warning)', 'var(--success)', 'var(--danger)'];

const steps = [
    {
        label: 'Check if Condition',
        code: 'if (a > b)',
        desc: 'Check if the first condition is true.',
    },
    {
        label: 'Check Else-If Condition',
        code: 'else if (a === b)',
        desc: 'If not, check the else-if condition.',
    },
];

export default function IfElseIfElseAnimation() {
    const [currentStep, setCurrentStep] = useState(0);
    const [a, setA] = useState(5);
    const [b, setB] = useState(3);
    const [output, setOutput] = useState<string | null>(null);
    const [done, setDone] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    function reset() {
        setCurrentStep(0);
        setOutput(null);
        setDone(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
    }

    function nextStep() {
        if (done) return;

        if (currentStep === 0) {
            // Check first condition
            if (a > b) {
                setOutput('a is greater');
                setDone(true);
            } else {
                setCurrentStep(1);
            }
        } else if (currentStep === 1) {
            if (a === b) {
                setOutput('a equals b');
            } else {
                setOutput('a is less');
            }
            setDone(true);
        }
    }

    function playAnimation() {
        reset();
        let step = 0;
        setDone(false);
        intervalRef.current = setInterval(() => {
            if (step === 0) {
                if (a > b) {
                    setOutput('a is greater');
                    setDone(true);
                    if (intervalRef.current) clearInterval(intervalRef.current);
                } else {
                    step = 1;
                    setCurrentStep(step);
                }
            } else if (step === 1) {
                if (a === b) {
                    setOutput('a equals b');
                } else {
                    setOutput('a is less');
                }
                setDone(true);
                if (intervalRef.current) clearInterval(intervalRef.current);
            }
        }, 900);
    }

    function highlightPart(part: number) {
        return {
            background: withAlpha(stepColors[part], 20),
            borderRadius: '4px',
            padding: '1px 2px',
            transition: 'background 0.2s'
        };
    }

    return (
        <div style={{
            background: 'var(--paper-sunken)',
            borderRadius: 12,
            padding: 24,
            margin: '32px 0',
            boxShadow: '0 2px 12px #0001',
            maxWidth: 540
        }}>
            <div style={{ marginBottom: 10, color: 'var(--ink-soft)', fontSize: 15 }}>
                <b>Note:</b> You can change the values of <b>a</b> and <b>b</b> below to see how the flow changes.
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18 }}>
                <label style={{ fontWeight: 600 }}>a:</label>
                <input
                    type="number"
                    value={a}
                    onChange={e => setA(Number(e.target.value))}
                    style={{ width: 60, marginRight: 16 }}
                />
                <label style={{ fontWeight: 600 }}>b:</label>
                <input
                    type="number"
                    value={b}
                    onChange={e => setB(Number(e.target.value))}
                    style={{ width: 60 }}
                />
            </div>
            <pre style={{
                fontFamily: 'monospace',
                fontSize: 16,
                color: 'var(--ink)',
                marginBottom: 18,
                background: 'var(--paper-raised)',
                borderRadius: 8,
                padding: '12px 10px',
                lineHeight: 1.6,
                overflowX: 'auto',
                border: '1.5px solid var(--paper-sunken)',
                display: 'block'
            }}>
                <span>
                    <span style={{ color: 'var(--ink-faint)' }}>{'// User input values'}</span>
                </span>
                <br />
                <span>
                    <span style={{ color: 'var(--info)' }}>let</span> a = <span style={{ color: 'var(--info)' }}>{a}</span>;
                </span>
                <br />
                <span>
                    <span style={{ color: 'var(--info)' }}>let</span> b = <span style={{ color: 'var(--info)' }}>{b}</span>;
                </span>
                <br />
                <br />
                <span style={currentStep === 0 ? highlightPart(0) : {}}>
                    if (a &gt; b) {'{'}
                </span>
                <br />
                <span>&nbsp;&nbsp;console.log(&quot;a is greater&quot;);</span>
                <br />
                <span>{'}'} else if (a === b) {'{'}</span>
                <br />
                <span>&nbsp;&nbsp;console.log(&quot;a equals b&quot;);</span>
                <br />
                <span>{'}'} else {'{'}</span>
                <br />
                <span>&nbsp;&nbsp;console.log(&quot;a is less&quot;);</span>
                <br />
                <span>{'}'}</span>
            </pre>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                marginBottom: 18
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8,
                    flexWrap: 'wrap'
                }}>
                    {steps.map((step, idx) => (
                        <div key={step.label} style={{
                            flex: 1,
                            minWidth: 110,
                            background: currentStep === idx ? withAlpha(stepColors[idx], 13) : 'var(--paper-raised)',
                            border: `2px solid ${currentStep === idx ? stepColors[idx] : 'var(--paper-sunken)'}`,
                            borderRadius: 8,
                            padding: '12px 8px',
                            margin: '0 2px',
                            textAlign: 'center',
                            transition: 'all 0.2s'
                        }}>
                            <div style={{
                                fontWeight: 700,
                                color: stepColors[idx],
                                fontSize: 15,
                                marginBottom: 2
                            }}>{step.label}</div>
                            <div style={{
                                fontFamily: 'monospace',
                                fontSize: 15,
                                color: 'var(--ink)'
                            }}>{step.code}</div>
                        </div>
                    ))}
                </div>
                <div style={{
                    minHeight: 32,
                    marginTop: 8,
                    fontSize: 15,
                    color: 'var(--ink)',
                    textAlign: 'center'
                }}>
                    {done && output
                        ? <span>Output: <span style={{ color: stepColors[currentStep] }}>{output}</span></span>
                        : <span>
                            <b style={{ color: stepColors[currentStep] }}>
                                {steps[Math.min(currentStep, steps.length - 1)].label}:
                            </b> {steps[Math.min(currentStep, steps.length - 1)].desc}
                        </span>
                    }
                </div>
            </div>
            <div style={{
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
                marginTop: 10
            }}>
                <button
                    onClick={reset}
                    style={{
                        background: 'var(--paper-raised)',
                        border: '1.5px solid var(--line-strong)',
                        borderRadius: 6,
                        padding: '7px 18px',
                        fontWeight: 600,
                        color: 'var(--info)',
                        cursor: 'pointer'
                    }}
                >
                    Reset
                </button>
                <button
                    onClick={nextStep}
                    disabled={done}
                    style={{
                        background: done ? 'var(--paper-sunken)' : 'var(--info)',
                        border: 'none',
                        borderRadius: 6,
                        padding: '7px 18px',
                        fontWeight: 600,
                        color: done ? 'var(--ink-faint)' : 'var(--paper-raised)',
                        cursor: done ? 'not-allowed' : 'pointer'
                    }}
                >
                    Next Step
                </button>
                <button
                    onClick={playAnimation}
                    disabled={done}
                    style={{
                        background: done ? 'var(--paper-sunken)' : 'var(--success)',
                        border: 'none',
                        borderRadius: 6,
                        padding: '7px 18px',
                        fontWeight: 600,
                        color: done ? 'var(--ink-faint)' : 'var(--paper-raised)',
                        cursor: done ? 'not-allowed' : 'pointer'
                    }}
                >
                    Play
                </button>
            </div>
        </div>
    );
}