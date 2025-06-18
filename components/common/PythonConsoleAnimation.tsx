import Box from '@mui/material/Box';
import React from 'react';

export interface AnimationStep {
    key: string;
    // The main console output for this step (e.g., prompt, input, print, etc.)
    output?: React.ReactNode;
    // Optional: additional output below the main line (e.g., printed result)
    extraOutput?: React.ReactNode;
    // If true, show the user input field (with blinking cursor)
    showUserPrompt?: boolean;
    // If true, show the program completed message
    completed?: boolean;
}

interface PythonConsoleAnimationProps {
    steps: AnimationStep[];
    currentStep: number; // 0-based index
    isAnimating: boolean;
    animationUserInput?: string;
    userInput?: string;
    promptText?: string;
}

const PythonConsoleAnimation: React.FC<PythonConsoleAnimationProps> = ({
    steps,
    currentStep,
    isAnimating,
    animationUserInput = '',
    userInput = '',
    promptText = '',
}) => {
    const step = steps[currentStep] || {};
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
                {(!steps.length || currentStep < 0) && (
                    <div style={{ color: '#888', fontStyle: 'italic' }}>
                        Click &quot;Start Animation&quot; to see how the program runs...
                    </div>
                )}

                {/* Animation steps */}
                {steps.length > 0 && currentStep >= 0 && (
                    <div>
                        <div style={{ color: '#4CAF50' }}>$ python program.py</div>
                        <div style={{ marginTop: '8px' }}>
                            {step.output}
                            {step.showUserPrompt && (
                                <span style={{
                                    backgroundColor: '#333',
                                    padding: '2px 4px',
                                    marginLeft: '4px',
                                    animation: isAnimating ? 'blink 1s infinite' : 'none'
                                }}>
                                    {animationUserInput}
                                    {/* Show blinking cursor if still typing */}
                                    {animationUserInput.length < (userInput || 'Alice').length && '|'}
                                </span>
                            )}
                        </div>
                        {step.extraOutput && (
                            <div style={{ marginTop: '8px', color: '#2196F3' }}>{step.extraOutput}</div>
                        )}
                        {step.completed && (
                            <div style={{ marginTop: '12px', color: '#4CAF50' }}>Program completed successfully!</div>
                        )}
                    </div>
                )}
            </Box>
            <style jsx>{`
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `}</style>
        </>
    );
};

export default PythonConsoleAnimation;