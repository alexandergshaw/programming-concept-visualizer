import Box from '@mui/material/Box';
import React from 'react';

export interface StaticAnimationStep {
    key: string;
    output?: React.ReactNode;
    extraOutput?: React.ReactNode;
    showUserPrompt?: boolean;
    completed?: boolean;
}

interface PythonConsoleStaticProps {
    steps: StaticAnimationStep[];
    // Always show the last step (or all steps if you want, see below)
}

const PythonConsoleStatic: React.FC<PythonConsoleStaticProps> = ({
    steps,
}) => {
    return (
        <>
            <Box sx={{
                mt: 3,
                p: 2,
                backgroundColor: '#1e1e1e',
                color: '#ffffff',
                borderRadius: 2,
                fontFamily: 'monospace',
                minHeight: '120px',
                position: 'relative'
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 1,
                    borderBottom: '1px solid #333',
                    pb: 1
                }}>
                    <Box sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: '#ff5f56',
                        mr: 1
                    }} />
                    <Box sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: '#ffbd2e',
                        mr: 1
                    }} />
                    <Box sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: '#27ca3f',
                        mr: 2
                    }} />
                    <span style={{ fontSize: '12px', color: '#888' }}>Python Console</span>
                </Box>

                {/* Idle state */}
                {(!steps.length) && (
                    <div style={{ color: '#888', fontStyle: 'italic' }}>
                        No output yet.
                    </div>
                )}

                {/* Show all output steps */}
                {steps.length > 0 && (
                    <div>
                        <div style={{ color: '#4CAF50' }}>$ python program.py</div>
                        <div style={{ marginTop: '8px' }}>
                            {steps.map((step, idx) => (
                                <div key={step.key || idx}>
                                    {step.output}
                                    {step.extraOutput && (
                                        <div style={{ color: '#2196F3' }}>{step.extraOutput}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Box>
        </>
    );
};

export default PythonConsoleStatic;