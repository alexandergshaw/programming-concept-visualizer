'use client';

import { useState, useRef } from 'react';

const stepColors = ['#1976d2', '#43a047', '#fbc02d', '#e53935'];

const steps = [
    {
        label: 'Initialization',
        code: 'let i = 0;',
        desc: 'Set up the loop variable before the loop starts.',
    },
    {
        label: 'Condition',
        code: 'i < 3;',
        desc: 'Check if the loop should keep going.',
    },
    {
        label: 'Loop Body',
        code: 'console.log(i);',
        desc: 'Run the code inside the loop.',
    },
    {
        label: 'Increment',
        code: 'i++;',
        desc: 'Update the loop variable after each loop.',
    },
];

export default function ForLoopOrderAnimation() {
    const [currentStep, setCurrentStep] = useState(0);
    const [iteration, setIteration] = useState(1);
    const [done, setDone] = useState(false);
    const [output, setOutput] = useState<number[]>([]);
    const [i, setI] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Track if initialization has happened
    const [initialized, setInitialized] = useState(false);

    function reset() {
        setCurrentStep(0);
        setIteration(1);
        setDone(false);
        setOutput([]);
        setI(0);
        setInitialized(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
    }

    function nextStep() {
        if (done) return;

        if (currentStep === 0 && !initialized) {
            setI(0);
            setInitialized(true);
        } else if (currentStep === 1) {
            if (i >= 3) {
                setDone(true);
                return;
            }
        } else if (currentStep === 2) {
            setOutput(prev => [...prev, i]);
        } else if (currentStep === 3) {
            setI(prev => prev + 1);
        }

        // Only go to Initialization at very first step
        if (currentStep === 3) {
            setIteration(prev => prev + 1);
            setCurrentStep(1); // Go to Condition after Increment
        } else if (currentStep === 0 && initialized) {
            setCurrentStep(1); // Skip Initialization after first time
        } else {
            setCurrentStep((prev) => (prev + 1) % 4);
        }

        // If after increment, condition fails, mark as done
        if (currentStep === 3 && i + 1 >= 3) {
            setTimeout(() => setDone(true), 0);
        }
    }

    function playAnimation() {
        reset();
        let step = 0;
        let iter = 1;
        let localI = 0;
        let localOutput: number[] = [];
        let localInitialized = false;
        setDone(false);
        intervalRef.current = setInterval(() => {
            if (step === 0 && !localInitialized) {
                localI = 0;
                setI(0);
                localInitialized = true;
            } else if (step === 1) {
                if (localI >= 3) {
                    setDone(true);
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    return;
                }
            } else if (step === 2) {
                localOutput = [...localOutput, localI];
                setOutput([...localOutput]);
            } else if (step === 3) {
                localI++;
                setI(localI);
            }

            setCurrentStep(step);

            if (step === 3) {
                iter++;
                setIteration(iter);
                step = 1; // After increment, always go to Condition
            } else if (step === 0 && localInitialized) {
                step = 1; // Skip Initialization after first time
            } else {
                step = (step + 1) % 4;
            }

            if (step === 1 && localI >= 3) {
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
                    <div style={{
                        background: '#fff',
                        border: '1.5px solid #e0e0e0',
                        borderRadius: 8,
                        padding: '10px 18px',
                        fontFamily: 'monospace',
                        fontSize: 16,
                        color: '#43a047',
                        minWidth: 120,
                        textAlign: 'center'
                    }}>
                        Output: [{output.join(', ')}]
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
            <div style={{
                marginTop: 18,
                fontFamily: 'monospace',
                fontSize: 15,
                color: '#888',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                gap: 6,
                flexWrap: 'wrap'
            }}>
                <span style={currentStep === 0 && !initialized ? highlightPart(0) : {}}>for</span>
                <span>(</span>
                <span style={currentStep === 0 && !initialized ? highlightPart(0) : {}}>let i = 0</span>
                <span>;</span>
                <span style={currentStep === 1 ? highlightPart(1) : {}}>i &lt; 3</span>
                <span>;</span>
                <span style={currentStep === 3 ? highlightPart(3) : {}}>i++</span>
                <span>) {'{'}</span>
                <span style={currentStep === 2 ? highlightPart(2) : {}}>console.log(i);</span>
                <span>{'}'}</span>
            </div>
        </div>
    );
}