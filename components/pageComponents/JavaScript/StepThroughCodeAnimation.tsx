'use client';

import { useState, useEffect } from 'react';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import Button from '@mui/material/Button';

export type Step = {
    label: string;
    desc: string;
    // Now supports: string | string[] | function
    highlight: string | string[] | ((codeLines: string[], idx: number) => boolean);
    outputLine?: string;
};

const defaultStepColors = [
    '#1976d2', '#43a047', '#fbc02d', '#e53935', '#8e24aa', '#00bcd4', '#ff9800', '#7e57c2'
];

export default function StepThroughCodeAnimation({
    code,
    steps,
    stepColors = defaultStepColors,
    style = {},
    onStepChange,
}: {
    code: string | string[];
    steps: Step[];
    stepColors?: string[];
    style?: React.CSSProperties;
    onStepChange?: (step: number) => void;
}) {
    const [currentStep, setCurrentStep] = useState(0);

    // Call onStepChange when currentStep changes
    useEffect(() => {
        onStepChange?.(currentStep);
    }, [currentStep, onStepChange]);

    // Support both string and string[] for code
    let codeLines = Array.isArray(code) ? code : code.split('\n');

    // If the step has an outputLine, append it for this step
    if (steps[currentStep]?.outputLine) {
        codeLines = [...codeLines, steps[currentStep].outputLine!];
    }

    // Highlight the relevant part and style comments/code
    const highlightedCode = codeLines.map((line, idx) => {
        const highlight = steps[currentStep].highlight;
        let shouldHighlight = false;
        let processedLine = line;

        // Style Python comments (lines starting with #)
        const isPythonComment = processedLine.trim().startsWith('#');
        // Style JS comments (lines starting with //)
        const isJsComment = processedLine.trim().startsWith('//');

        if (isPythonComment) {
            processedLine = `<span style="color:#789;">${processedLine}</span>`;
        } else if (isJsComment) {
            processedLine = `<span style="color:#789;">${processedLine}</span>`;
        } else {
            // Style code (non-comment)
            processedLine = `<span style="color:#222;">${processedLine}</span>`;
        }

        // Highlight logic
        const color = stepColors[currentStep % stepColors.length];

        if (typeof highlight === 'function') {
            shouldHighlight = highlight(codeLines, idx);
        } else if (Array.isArray(highlight)) {
            // Highlight multiple words/phrases on any line
            let lineToHighlight = line;
            let matched = false;
            highlight.forEach(word => {
                if (word && lineToHighlight.includes(word)) {
                    matched = true;
                    // Highlight all occurrences of the word
                    const re = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                    lineToHighlight = lineToHighlight.replace(
                        re,
                        `<span style="background:${color}33;border-radius:4px;padding:1px 2px;">${word}</span>`
                    );
                }
            });
            if (matched) {
                if (isPythonComment || isJsComment) {
                    processedLine = `<span style="color:#789;">${lineToHighlight}</span>`;
                } else {
                    processedLine = `<span style="color:#222;">${lineToHighlight}</span>`;
                }
                return processedLine;
            }
            // fallback: no match, continue
        } else if (typeof highlight === 'string') {
            if (highlight && line.includes(highlight)) {
                // Highlight just the substring (preserve comment styling)
                const highlighted = `<span style="background:${color}33;border-radius:4px;padding:1px 2px;">${highlight}</span>`;
                if (isPythonComment || isJsComment) {
                    processedLine = `<span style="color:#789;">${line.replace(
                        highlight,
                        highlighted
                    )}</span>`;
                } else {
                    processedLine = `<span style="color:#222;">${line.replace(
                        highlight,
                        highlighted
                    )}</span>`;
                }
                return processedLine;
            }
            shouldHighlight = line.trim() === highlight.trim();
        }
        if (shouldHighlight) {
            return `<span style="background:${color}33;border-radius:4px;padding:1px 2px;">${processedLine}</span>`;
        }
        return processedLine;
    }).join('\n');

    return (
        <ConceptInfoCard style={style}>
            <pre
                style={{
                    fontFamily: 'monospace',
                    fontSize: 16,
                    color: '#333',
                    marginBottom: 18,
                    background: '#fff',
                    borderRadius: 8,
                    padding: '12px 10px',
                    lineHeight: 1.7,
                    overflowX: 'auto',
                    overflowY: 'auto',
                    maxHeight: '400px',
                    border: '1.5px solid #e0e0e0',
                    display: 'block'
                }}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
            <div style={{
                minHeight: 32,
                marginTop: 8,
                fontSize: 15,
                color: '#444',
                textAlign: 'center'
            }}>
                <b style={{ color: stepColors[currentStep % stepColors.length] }}>{steps[currentStep].label}:</b>{' '}
                <span dangerouslySetInnerHTML={{ __html: steps[currentStep].desc }} />
            </div>
            <div style={{
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
                marginTop: 16
            }}>
                <Button
                    onClick={() => setCurrentStep(0)}
                    variant="outlined"
                    color="primary"
                    sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        fontWeight: 600,
                        textTransform: 'none'
                    }}
                >
                    Reset
                </Button>
                <Button
                    onClick={() => setCurrentStep(s => Math.max(s - 1, 0))}
                    variant="outlined"
                    color="primary"
                    disabled={currentStep === 0}
                    sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        fontWeight: 600,
                        textTransform: 'none'
                    }}
                >
                    Previous Step
                </Button>
                <Button
                    onClick={() => setCurrentStep(s => Math.min(s + 1, steps.length - 1))}
                    variant="contained"
                    color="primary"
                    disabled={currentStep >= steps.length - 1}
                    sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        fontWeight: 600,
                        textTransform: 'none'
                    }}
                >
                    Next Step
                </Button>
            </div>
        </ConceptInfoCard>
    );
}