'use client';

import { useState, useRef } from 'react';

const stepColors = ['#1976d2', '#0288d1', '#43a047', '#fbc02d'];

const steps = [
    {
        label: 'Declare Array',
        code: 'const fruits = ["apple", "banana", "pear"];',
        desc: 'Create the array you want to loop over.',
    },
    {
        label: 'Start Loop',
        code: 'for (const fruit of fruits)',
        desc: 'Begin looping through each item in the array.',
    },
    {
        label: 'Loop Body',
        code: 'console.log(fruit);',
        desc: 'Run the code inside the loop for this item.',
    },
    {
        label: 'Grab Next Item',
        code: 'fruit of fruits',
        desc: 'Grab the next item, if there are any.',
    },
];

const sampleArray = ['"apple"', '"banana"', '"pear"'];

export default function ForOfLoopOrderAnimation() {
    const [currentStep, setCurrentStep] = useState(0);
    const [index, setIndex] = useState(0);
    const [done, setDone] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    function reset() {
        setCurrentStep(0);
        setIndex(0);
        setDone(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
    }

    function nextStep() {
        if (done) return;

        if (currentStep === 0) {
            // Declare array, nothing to do except highlight
        } else if (currentStep === 1) {
            // Start loop, nothing to do except highlight
        } else if (currentStep === 3) {
            // Grab next item, if there are any
            if (index + 1 >= sampleArray.length) {
                setDone(true);
                return;
            } else {
                setIndex(prev => prev + 1);
            }
        }

        // Step logic
        if (currentStep === 3 && index + 1 < sampleArray.length) {
            setCurrentStep(2); // Go back to Loop Body for next item
        } else {
            setCurrentStep((prev) => (prev + 1) % 4);
        }
    }

    function playAnimation() {
        reset();
        let step = 0;
        let localIndex = 0;
        let localOutput: string[] = [];
        setDone(false);
        intervalRef.current = setInterval(() => {
            if (step === 0) {
                // Declare array
            } else if (step === 1) {
                // Start loop
            } else if (step === 2) {
                localOutput = [...localOutput, sampleArray[localIndex].replace(/"/g, '')];
            } else if (step === 3) {
                if (localIndex + 1 >= sampleArray.length) {
                    setDone(true);
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    return;
                } else {
                    localIndex++;
                    setIndex(localIndex);
                }
            }

            if (step === 3 && localIndex < sampleArray.length) {
                step = 2; // Go back to Loop Body for next item
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
                <span style={currentStep === 0 ? highlightPart(0) : {}}>
                    const fruits = [&quot;apple&quot;, &quot;banana&quot;, &quot;pear&quot;];
                </span>
                <br />
                <span>
                    for (
                    <span style={currentStep === 1 ? highlightPart(1) : {}}>const </span>
                    <span style={currentStep === 3 ? highlightPart(3) : currentStep === 1 ? highlightPart(1) : {}}>fruit of fruits</span>
                    )
                </span>
                <span> {'{'}</span>
                <br />
                <span>&nbsp;&nbsp;
                    <span style={currentStep === 1 ? highlightPart(1) : {}}>
                        console.log(fruit);
                    </span>
                </span>
                <br />
                <span>{'}'} </span>
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
                        minWidth: 120,
                        textAlign: 'center'
                    }}>
                        fruit = {sampleArray[index]}
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