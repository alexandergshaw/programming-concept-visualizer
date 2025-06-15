'use client';

import { useState, useRef } from 'react';

const stepColors = ['#1976d2', '#43a047', '#e53935'];

const steps = [
    {
        label: 'Check Condition',
        code: 'if (a > b)',
        desc: 'The interpreter checks if the condition is true or false.',
    },
    {
        label: 'If Block',
        code: 'console.log("In if block");',
        desc: 'If the condition is true, this block runs.',
    },
    {
        label: 'Else Block',
        code: 'console.log("In else block");',
        desc: 'If the condition is false, this block runs.',
    },
];

export default function IfElseOrderAnimation() {
    const [currentStep, setCurrentStep] = useState(0);
    const [a, setA] = useState(5);
    const [b, setB] = useState(3);
    const [done, setDone] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    function reset() {
        setCurrentStep(0);
        setDone(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
    }

    function nextStep() {
        if (done) return;

        if (currentStep === 0) {
            // Check condition
            if (a > b) {
                setCurrentStep(1);
            } else {
                setCurrentStep(2);
            }
        } else if (currentStep === 1 || currentStep === 2) {
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
                    step = 1;
                } else {
                    step = 2;
                }
                setCurrentStep(step);
            } else if (step === 1 || step === 2) {
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
            maxWidth: 520
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
                <span>&nbsp;&nbsp;
                    <span style={currentStep === 1 ? highlightPart(1) : {}}>
                        console.log(&quot;In if block&quot;);
                    </span>
                </span>
                <br />
                <span>{'}'} else {'{'}</span>
                <br />
                <span>&nbsp;&nbsp;
                    <span style={currentStep === 2 ? highlightPart(2) : {}}>
                        console.log(&quot;In else block&quot;);
                    </span>
                </span>
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
                    {!done
                        ? <span>
                            <b style={{ color: stepColors[currentStep] }}>{steps[currentStep].label}:</b> {steps[currentStep].desc}
                        </span>
                        : currentStep === 1
                        ? <span>Output: <span style={{ color: stepColors[1] }}>&quot;In if block&quot;</span></span>
                        : <span>Output: <span style={{ color: stepColors[2] }}>&quot;In else block&quot;</span></span>
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