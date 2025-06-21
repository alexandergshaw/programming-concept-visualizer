'use client';

import React, { useState } from 'react';
import ConceptInfoCard from '../../common/ConceptInfoCard';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface CapstonePracticeProps {
    prompt: string;
    correctOutput: string;
    initialCode?: string;
    runCodeButtonLabel?: string;
    requiredCode?: string | string[];
}

export default function CapstonePractice({
    prompt,
    correctOutput,
    initialCode = '',
    runCodeButtonLabel = 'Run Code',
    requiredCode
}: CapstonePracticeProps) {
    const [userCode, setUserCode] = useState(initialCode);
    const [output, setOutput] = useState<string | null>(null);
    const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleRunCode = () => {
        setError(null);
        setResult(null);
        setOutput(null);

        // Check for required code if specified (now supports array)
        if (requiredCode) {
            const requiredArr = Array.isArray(requiredCode) ? requiredCode : [requiredCode];
            const missing = requiredArr.filter(code => !userCode.includes(code));
            if (missing.length > 0) {
                setError(
                    `Your answer must include: ${missing.map(m => `"${m}"`).join(', ')}`
                );
                return;
            }
        }

        // Capture console.log output
        let captured = '';
        const log = (...args: unknown[]) => {
            captured += args.join(' ') + '\n';
        };

        // Extract JS code between <script> tags if present
        let codeToRun = userCode;
        const scriptMatch = userCode.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
        if (scriptMatch) {
            codeToRun = scriptMatch[1];
        }

        try {
            // eslint-disable-next-line no-new-func
            const func = new Function('console', codeToRun);
            func({ log });
            const trimmed = captured.trim();
            setOutput(trimmed);
            if (trimmed === correctOutput.trim()) {
                setResult('correct');
            } else {
                setResult('incorrect');
            }
        } catch (e) {
            setError((e instanceof Error ? e.message : String(e)) || 'Error running code');
        }
    };

    return (
        <ConceptInfoCard >
            <div style={{
                marginBottom: 18,
                lineHeight: 1.4,
            }}>
                {prompt}
            </div>
            <textarea
                value={userCode}
                onChange={e => setUserCode(e.target.value)}
                rows={8}
                style={{
                    width: '100%',
                    fontFamily: 'Fira Mono, Menlo, monospace',
                    fontSize: 15,
                    borderRadius: 8,
                    border: '1.5px solid #e0e4ea',
                    padding: '14px 16px',
                    marginBottom: 14,
                    background: '#f8fafc',
                    color: '#23272f',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border 0.2s',
                }}
                placeholder="Type your JavaScript code here. Use console.log() to print output."
            />
            <div >
                <Button
                    onClick={handleRunCode}
                    variant="contained"
                    color="primary"
                    sx={{
                        borderRadius: 2,
                        paddingX: 3,
                        paddingY: 1.2,
                        fontSize: 15,
                        fontWeight: 500,
                        textTransform: 'none',
                        boxShadow: '0 1px 4px 0 rgba(25, 118, 210, 0.08)',
                        letterSpacing: 0.2
                    }}
                >
                    {runCodeButtonLabel}
                </Button>
            </div>
            {output !== null && (
                <div style={{ marginTop: 10 }}>
                    <div style={{ fontWeight: 500, color: '#23272f', marginBottom: 4 }}>Your Output:</div>
                    <pre style={{
                        background: '#f4f6fa',
                        border: 'none',
                        borderRadius: 8,
                        padding: '12px 16px',
                        fontFamily: 'Fira Mono, Menlo, monospace',
                        fontSize: 15,
                        marginTop: 0,
                        whiteSpace: 'pre-wrap',
                        color: '#23272f'
                    }}>{output}</pre>
                </div>
            )}
            {result === 'correct' && (
                <Alert
                    severity="success"
                    icon={<CheckCircleIcon fontSize="inherit" />}
                    sx={{
                        mt: 2,
                        fontWeight: 600,
                        fontSize: 16,
                        alignItems: 'center',
                        borderRadius: 2
                    }}
                >
                    Correct!
                </Alert>
            )}
            {result === 'incorrect' && (
                <Alert
                    severity="error"
                    icon={<CancelIcon fontSize="inherit" />}
                    sx={{
                        mt: 2,
                        fontWeight: 600,
                        fontSize: 16,
                        alignItems: 'center',
                        borderRadius: 2
                    }}
                >
                    Not quite. Try again!
                </Alert>
            )}
            {error && (
                <Alert
                    severity="error"
                    sx={{
                        mt: 2,
                        fontSize: 15,
                        borderRadius: 2
                    }}
                >
                    <b>Error:</b> {error}
                </Alert>
            )}
        </ConceptInfoCard>
    );
}