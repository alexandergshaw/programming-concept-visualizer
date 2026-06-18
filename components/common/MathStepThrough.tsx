import React, { useState } from 'react';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import Button from '@mui/material/Button';

type MathStep = {
    label: string;
    expression: string; // The math expression for this step
    explanation: string; // Explanation for this step
};

type MathStepThroughProps = {
    steps: MathStep[];
    initialStep?: number;
    style?: React.CSSProperties;
};

const stepColors = [
    'var(--info)', 'var(--success)', 'var(--warning)', 'var(--danger)', 'var(--feature)', 'var(--info)', 'var(--warning)', 'var(--feature)'
];

const MathStepThrough: React.FC<MathStepThroughProps> = ({ steps, initialStep = 0, style }) => {
    const [current, setCurrent] = useState(initialStep);

    // Function to render expressions with line breaks
    const renderExpression = (expression: string) => {
        return expression.split('\n').map((line, i) => (
            <React.Fragment key={i}>
                {line}
                {i < expression.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <ConceptInfoCard style={style}>
            <div>
                {steps.slice(0, current + 1).map((step, idx) => (
                    <div key={idx} style={{ marginBottom: 18 }}>
                        <pre
                            style={{
                                fontFamily: 'monospace',
                                fontSize: 20,
                                color: stepColors[idx % stepColors.length],
                                background: 'var(--paper-raised)',
                                borderRadius: 8,
                                padding: '12px 10px',
                                lineHeight: 1.7,
                                overflowX: 'auto',
                                border: '1.5px solid var(--paper-sunken)',
                                display: 'block',
                                textAlign: 'left',
                                marginBottom: 8,
                                whiteSpace: 'pre-wrap',
                            }}
                        >
                            {renderExpression(step.expression)}
                        </pre>
                        <div style={{ minHeight: 24, textAlign: 'left' }}>
                            <b style={{ color: stepColors[idx % stepColors.length], fontSize: 16 }}>
                                {step.label}:
                            </b>{' '}
                            <span style={{ color: 'var(--ink)', fontSize: 15 }}>
                                {step.explanation}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{
                display: 'flex',
                gap: 12,
                justifyContent: 'flex-start',
                marginTop: 8
            }}>
                <Button
                    onClick={() => setCurrent(0)}
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
                    onClick={() => setCurrent(s => Math.max(s - 1, 0))}
                    variant="outlined"
                    color="primary"
                    disabled={current === 0}
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
                    onClick={() => setCurrent(s => Math.min(s + 1, steps.length - 1))}
                    variant="contained"
                    color="primary"
                    disabled={current >= steps.length - 1}
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
};

export default MathStepThrough;