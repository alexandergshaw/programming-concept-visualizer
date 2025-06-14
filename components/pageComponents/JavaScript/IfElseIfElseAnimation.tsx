'use client';

import { useState, useRef } from 'react';

const stepColors = ['#1976d2', '#fbc02d', '#43a047', '#e53935'];

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
            background: stepColors[part] + '33',
            borderRadius: '4px',
            padding: '1px 2px',
            transition: 'background 0.2s'
        };
    }

    return (
        <div style={{
            background: '#f8fafc',
            borderRadius: 12,
            padding: 24,
            margin: '32px 0',
            boxShadow: '0 2px 12px #0001',
            maxWidth: 540
        }}>
            <div style={{ marginBottom: 10, color: '#555', fontSize: 15 }}>
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
                color: '#333',
                marginBottom: 18,
                background: '#f3f6fa',
                borderRadius: 8,
                padding: '12px 10px',
                lineHeight: 1.6,
                overflowX: 'auto',
                border: '1.5px solid #e0e0e0',
                display: 'block'
            }}>
                <span>
                    <span style={{ color: '#888' }}>{'// User input values'}</span>
                </span>
                <br />
                <span>
                    <span style={{ color: '#1976d2' }}>let</span> a = <span style={{ color: '#1976d2' }}>{a}</span>;
                </span>
                <br />
                <span>
                    <span style={{ color: '#1976d2' }}>let</span> b = <span style={{ color: '#1976d2' }}>{b}</span>;
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
                            background: currentStep === idx ? stepColors[idx] + '22' : '#fff',
                            border: `2px solid ${currentStep === idx ? stepColors[idx] : '#e0e0e0'}`,
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
                                color: '#333'
                            }}>{step.code}</div>
                        </div>
                    ))}
                </div>
                <div style={{
                    minHeight: 32,
                    marginTop: 8,
                    fontSize: 15,
                    color: '#444',
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
                        background: '#fff',
                        border: '1.5px solid #bbb',
                        borderRadius: 6,
                        padding: '7px 18px',
                        fontWeight: 600,
                        color: '#1976d2',
                        cursor: 'pointer'
                    }}
                >
                    Reset
                </button>
                <button
                    onClick={nextStep}
                    disabled={done}
                    style={{
                        background: done ? '#eee' : '#1976d2',
                        border: 'none',
                        borderRadius: 6,
                        padding: '7px 18px',
                        fontWeight: 600,
                        color: done ? '#aaa' : '#fff',
                        cursor: done ? 'not-allowed' : 'pointer'
                    }}
                >
                    Next Step
                </button>
                <button
                    onClick={playAnimation}
                    disabled={done}
                    style={{
                        background: done ? '#eee' : '#43a047',
                        border: 'none',
                        borderRadius: 6,
                        padding: '7px 18px',
                        fontWeight: 600,
                        color: done ? '#aaa' : '#fff',
                        cursor: done ? 'not-allowed' : 'pointer'
                    }}
                >
                    Play
                </button>
            </div>
        </div>
    );
}