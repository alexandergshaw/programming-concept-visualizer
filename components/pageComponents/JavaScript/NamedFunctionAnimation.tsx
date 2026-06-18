'use client';

import { useState } from 'react';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';

const stepColors = ['var(--info)', 'var(--success)', 'var(--warning)', 'var(--danger)', 'var(--feature)'];

export default function NamedFunctionAnimation({ input = 5 }: { input: number }) {
    const [currentStep, setCurrentStep] = useState(0);

    // The full code block as a string
    const codeBlock = [
        'function square(x) {',
        '  return x * x;',
        '}',
        `console.log(square(${input}));`,
    ].join('\n');

    // For each step, specify which part to highlight (by exact string match)
    const highlightParts = [
        'function square(x) {',
        `console.log(square(${input}));`,
        'function square(x) {',
        'return x * x;',
        `console.log(square(${input}));`,
        `// Output: ${input * input}`,
    ];

    // Animation steps with more detail and visual cues
    const steps = [
        {
            label: 'Define Function',
            desc: 'The function is defined in memory, but not run yet.',
        },
        {
            label: 'Call Function',
            desc: `The function is called. Argument <b>x = ${input}</b> is passed in.`,
        },
        {
            label: 'Enter Function',
            desc: `Execution jumps inside the function with <b>x = ${input}</b>.`,
        },
        {
            label: 'Evaluate Expression',
            desc: `The function computes <b>${input} * ${input} = ${input * input}</b>.`,
        },
        {
            label: 'Return Value',
            desc: `The function returns <b>${input * input}</b> to the caller.`,
        },
        {
            label: 'Output',
            desc: `The result <b>${input * input}</b> is printed to the console.`,
        },
    ];

    // For the output step, append the output line to the code block
    let displayCode = codeBlock;
    if (currentStep === 5) {
        displayCode += `\n// Output: ${input * input}`;
    }

    // Highlight the relevant part
    const highlightedCode = displayCode.split('\n').map((line, idx) => {
        // For the output step, highlight the output line
        if (currentStep === 5 && idx === displayCode.split('\n').length - 1) {
            return `<span style="background:${stepColors[5]}33;border-radius:4px;padding:1px 2px;">${line}</span>`;
        }
        // Otherwise, highlight the relevant line for the step
        if (line.trim() === highlightParts[currentStep]?.trim()) {
            return `<span style="background:${stepColors[currentStep]}33;border-radius:4px;padding:1px 2px;">${line}</span>`;
        }
        return line;
    }).join('\n');

    return (
        <ConceptInfoCard>
            <pre
                style={{
                    fontFamily: 'monospace',
                    fontSize: 16,
                    color: 'var(--ink)',
                    marginBottom: 18,
                    background: 'var(--paper-raised)', // White background for the code box
                    borderRadius: 8,
                    padding: '12px 10px',
                    lineHeight: 1.7,
                    overflowX: 'auto',
                    border: '1.5px solid var(--paper-sunken)',
                    display: 'block'
                }}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
            <div style={{
                minHeight: 32,
                marginTop: 8,
                fontSize: 15,
                color: 'var(--ink)',
                textAlign: 'center'
            }}>
                <b style={{ color: stepColors[currentStep] }}>{steps[currentStep].label}:</b>{' '}
                <span dangerouslySetInnerHTML={{ __html: steps[currentStep].desc }} />
            </div>
            <div style={{
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
                marginTop: 16
            }}>
                <button
                    onClick={() => setCurrentStep(0)}
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
                    onClick={() => setCurrentStep(s => Math.min(s + 1, steps.length - 1))}
                    disabled={currentStep >= steps.length - 1}
                    style={{
                        background: currentStep >= steps.length - 1 ? 'var(--paper-sunken)' : 'var(--info)',
                        border: 'none',
                        borderRadius: 6,
                        padding: '7px 18px',
                        fontWeight: 600,
                        color: currentStep >= steps.length - 1 ? 'var(--ink-faint)' : 'var(--paper-raised)',
                        cursor: currentStep >= steps.length - 1 ? 'not-allowed' : 'pointer'
                    }}
                >
                    Next Step
                </button>
            </div>
        </ConceptInfoCard>
    );
}