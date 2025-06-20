'use client';

import { useState } from 'react';

const stepColors = ['#0288d1', '#43a047', '#fbc02d', '#e53935'];

const steps = [
    {
        label: 'Define Arrow Function',
        code: 'const square = x => x * x;',
        desc: 'The arrow function is defined but not run yet.',
    },
    {
        label: 'Call Function',
        code: 'square(5)',
        desc: 'Call the function with an argument.',
    },
    {
        label: 'Execute Body',
        code: 'x * x',
        desc: 'Calculate the result inside the function.',
    },
    {
        label: 'Return Value',
        code: '25',
        desc: 'The function returns the value.',
    },
];

export default function ArrowFunctionAnimation({ input = 5 }: { input: number }) {
    const [currentStep, setCurrentStep] = useState(0);

    function reset() {
        setCurrentStep(0);
    }

    function nextStep() {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
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
                <span style={currentStep === 0 ? { background: stepColors[0] + '33', borderRadius: 4 } : {}}>
                    const square = x =&gt; x * x;
                </span>
                <br />
                <span style={currentStep === 1 ? { background: stepColors[1] + '33', borderRadius: 4 } : {}}>
                    square({input})
                </span>
                <br />
                <span style={currentStep === 2 ? { background: stepColors[2] + '33', borderRadius: 4 } : {}}>
                    {input} * {input}
                </span>
                <br />
                <span style={currentStep === 3 ? { background: stepColors[3] + '33', borderRadius: 4 } : {}}>
                    // returns {input * input}
                </span>
            </pre>
            <div style={{
                minHeight: 32,
                marginTop: 8,
                fontSize: 15,
                color: '#444',
                textAlign: 'center'
            }}>
                <b style={{ color: stepColors[currentStep] }}>{steps[currentStep].label}:</b> {steps[currentStep].desc}
            </div>
            <div style={{
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
                marginTop: 16
            }}>
                <button
                    onClick={reset}
                    style={{
                        background: '#fff',
                        border: '1.5px solid #bbb',
                        borderRadius: 6,
                        padding: '7px 18px',
                        fontWeight: 600,
                        color: '#0288d1',
                        cursor: 'pointer'
                    }}
                >
                    Reset
                </button>
                <button
                    onClick={nextStep}
                    disabled={currentStep >= steps.length - 1}
                    style={{
                        background: currentStep >= steps.length - 1 ? '#eee' : '#0288d1',
                        border: 'none',
                        borderRadius: 6,
                        padding: '7px 18px',
                        fontWeight: 600,
                        color: currentStep >= steps.length - 1 ? '#aaa' : '#fff',
                        cursor: currentStep >= steps.length - 1 ? 'not-allowed' : 'pointer'
                    }}
                >
                    Next Step
                </button>
            </div>
        </div>
    );
}