'use client';

import { useState, useRef } from 'react';

const stepColors = ['#1976d2', '#43a047', '#fbc02d', '#e53935'];

const steps = [
    {
        label: 'Initialization',
        code: 'let i = 1;',
        desc: 'Set up the loop variable before the loop starts.',
    },
    {
        label: 'Loop Body',
        code: 'console.log(i);',
        desc: 'Run the code inside the loop.',
    },
    {
        label: 'Increment',
        code: 'i++;',
        desc: 'Increase i by 1.',
    },
    {
        label: 'Condition',
        code: 'while (i <= 3)',
        desc: 'Check if the loop should run again.',
    },
];

export default function DoWhileLoopOrderAnimation() {
    const [currentStep, setCurrentStep] = useState(0);
    const [i, setI] = useState(1);
    const [output, setOutput] = useState<number[]>([]);
    const [done, setDone] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [initialized, setInitialized] = useState(false);

    function reset() {
        setCurrentStep(0);
        setI(1);
        setOutput([]);
        setDone(false);
        setInitialized(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
    }

    function nextStep() {
        if (done) return;

        if (currentStep === 0 && !initialized) {
            setI(1);
            setInitialized(true);
        } else if (currentStep === 1) {
            setOutput(prev => [...prev, i]);
        } else if (currentStep === 2) {
            setI(prev => prev + 1);
        } else if (currentStep === 3) {
            if (i + 1 <= 3) {
                setCurrentStep(1); // Go back to Loop Body if condition is true
                return;
            } else {
                setDone(true);
                setCurrentStep(3);
                return;
            }
        }

        // Step logic
        if (currentStep === 0 && initialized) {
            setCurrentStep(1); // Skip Initialization after first time
        } else {
            setCurrentStep((prev) => (prev + 1) % 4);
        }
    }

    function playAnimation() {
        reset();
        let step = 0;
        let localI = 1;
        let localOutput: number[] = [];
        let localInitialized = false;
        setDone(false);
        intervalRef.current = setInterval(() => {
            if (step === 0 && !localInitialized) {
                localI = 1;
                setI(1);
                localInitialized = true;
            } else if (step === 1) {
                localOutput = [...localOutput, localI];
                setOutput([...localOutput]);
            } else if (step === 2) {
                localI++;
                setI(localI);
            } else if (step === 3) {
                if (localI <= 3) {
                    step = 1;
                    setCurrentStep(step);
                    return;
                } else {
                    setDone(true);
                    setCurrentStep(3);
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    return;
                }
            }

            if (step === 0 && localInitialized) {
                step = 1;
            } else {
                step = (step + 1) % 4;
            }
            setCurrentStep(step);
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
                <span style={currentStep === 0 ? highlightPart(0) : {}}>let i = 1;</span>
                <br />
                <span>do {'{'}</span>
                <br />
                <span>&nbsp;&nbsp;<span style={currentStep === 1 ? highlightPart(1) : {}}>console.log(i);</span></span>
                <br />
                <span>&nbsp;&nbsp;<span style={currentStep === 2 ? highlightPart(2) : {}}>i++;</span></span>
                <br />
                <span>{'}'} </span>
                <span>while (</span>
                <span style={currentStep === 3 ? highlightPart(3) : {}}>i {'<= 3'}</span>
                <span>);</span>
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
                    {done
                        ? <span>Loop finished. <span style={{ color: '#43a047' }}>All done!</span></span>
                        : <span>
                            <b style={{ color: stepColors[currentStep] }}>{steps[currentStep].label}:</b> {steps[currentStep].desc}
                        </span>
                    }
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 24,
                    marginTop: 8
                }}>
                    <div style={{
                        background: '#fff',
                        border: '1.5px solid #e0e0e0',
                        borderRadius: 8,
                        padding: '10px 18px',
                        fontFamily: 'monospace',
                        fontSize: 16,
                        color: '#1976d2',
                        minWidth: 90,
                        textAlign: 'center'
                    }}>
                        i = {i}
                    </div>
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