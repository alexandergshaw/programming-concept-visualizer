'use client';

import React, { useState } from 'react';
import ConceptInfoCard from './ConceptInfoCard';

interface CapstonePracticeProps {
    prompt: string;
    correctOutput: string;
    initialCode?: string;
    runCodeButtonLabel?: string;
}

export default function CapstonePractice({
    prompt,
    correctOutput,
    initialCode = '',
    runCodeButtonLabel = 'Run Code'
}: CapstonePracticeProps) {
    const [userCode, setUserCode] = useState(initialCode);
    const [output, setOutput] = useState<string | null>(null);
    const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Run user code and compare output
    const handleRunCode = () => {
        setError(null);
        setResult(null);
        setOutput(null);

        // Capture console.log output
        let captured = '';
        const log = (...args: any[]) => {
            captured += args.join(' ') + '\n';
        };

        try {
            // eslint-disable-next-line no-new-func
            const func = new Function('console', userCode);
            func({ log });
            const trimmed = captured.trim();
            setOutput(trimmed);
            if (trimmed === correctOutput.trim()) {
                setResult('correct');
            } else {
                setResult('incorrect');
            }
        } catch (e: any) {
            setError(e.message || 'Error running code');
        }
    };

    return (
        <ConceptInfoCard>
            <div style={{ marginBottom: 16, fontWeight: 600, fontSize: 18 }}>
                {prompt}
            </div>
            <textarea
                value={userCode}
                onChange={e => setUserCode(e.target.value)}
                rows={8}
                style={{
                    width: '100%',
                    fontFamily: 'monospace',
                    fontSize: 15,
                    borderRadius: 6,
                    border: '1px solid #bdbdbd',
                    padding: 12,
                    marginBottom: 12,
                    background: '#fff'
                }}
                placeholder="Type your JavaScript code here. Use console.log() to print output."
            />
            <div>
                <button
                    onClick={handleRunCode}
                    style={{
                        background: '#1976d2',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        padding: '8px 20px',
                        fontSize: 15,
                        cursor: 'pointer',
                        fontWeight: 500
                    }}
                >
                    {runCodeButtonLabel}
                </button>
            </div>
            {output !== null && (
                <div style={{ marginTop: 18 }}>
                    <b>Your Output:</b>
                    <pre style={{
                        background: '#f7f7f7',
                        border: '1px solid #e0e0e0',
                        borderRadius: 6,
                        padding: '10px 14px',
                        fontFamily: 'monospace',
                        fontSize: 15,
                        marginTop: 6,
                        whiteSpace: 'pre-wrap'
                    }}>{output}</pre>
                </div>
            )}
            {result === 'correct' && (
                <div style={{ color: '#388e3c', fontWeight: 600, marginTop: 10 }}>
                    ✅ Correct!
                </div>
            )}
            {result === 'incorrect' && (
                <div style={{ color: '#d32f2f', fontWeight: 600, marginTop: 10 }}>
                    ❌ Not quite. Try again!
                </div>
            )}
            {error && (
                <div style={{ color: '#d32f2f', marginTop: 10 }}>
                    <b>Error:</b> {error}
                </div>
            )}
            <div style={{ marginTop: 24, fontSize: 13, color: '#888' }}>
                <b>Tip:</b> Use <code>console.log()</code> to print your answer.
            </div>
        </ConceptInfoCard>
    );
}