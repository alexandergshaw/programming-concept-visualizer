'use client';

import { useState, useEffect } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '@/components/common/Section';
import PythonCodeSnippet from '@/components/common/PythonCodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const reservedKeywords = [
    'False', 'None', 'True', 'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else',
    'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or',
    'pass', 'raise', 'return', 'try', 'while', 'with', 'yield'
];

function isValidVarName(name: string) {
    if (!name) return false;
    if (/^[0-9]/.test(name)) return false;
    if (!/^[_a-zA-Z][_a-zA-Z0-9]*$/.test(name)) return false;
    if (reservedKeywords.includes(name)) return false;
    return true;
}

const getAnimatedCodeTemplate = (
    varName: string,
    promptText: string,
    userInput: string,
    printPrompt: string,
    animationStep: number
) => [
    {
        code: `${varName} = input("${promptText}")`,
        comment: animationStep === 1 ? '🔄 Currently executing: Prompting user for input...' : 
                animationStep === 2 ? `✅ Completed: User entered "${userInput || 'Alice'}" - stored in ${varName}` : undefined,
        highlight: animationStep === 1 || animationStep === 2,
    },
    {
        code: `print("${printPrompt}", ${varName})`,
        comment: animationStep === 3 ? `🔄 Currently executing: Printing result using ${varName}...` : 
                animationStep === 4 ? `✅ Completed: Output displayed` : undefined,
        highlight: animationStep === 3 || animationStep === 4,
    },
];

// Animation states
type AnimationState = 'idle' | 'step1' | 'step2' | 'step3' | 'step4' | 'completed';

export default function UserInputConcept() {
    // ...existing state...
    const [promptText, setPromptText] = useState('What is your name? ');
    const [variableName, setVariableName] = useState('name');
    const [variableNameError, setVariableNameError] = useState('');
    const [userInput, setUserInput] = useState('');
    const [printPrompt, setPrintPrompt] = useState('Hello,');

    // Animation state
    const [animationState, setAnimationState] = useState<AnimationState>('idle');
    const [animationStep, setAnimationStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isStepMode, setIsStepMode] = useState(false);
    const [animationOutput, setAnimationOutput] = useState('');
    const [showUserPrompt, setShowUserPrompt] = useState(false);
    const [animationUserInput, setAnimationUserInput] = useState('');

    // Advanced animation state
    const [advancedAnimationState, setAdvancedAnimationState] = useState<AnimationState>('idle');
    const [isAdvancedAnimating, setIsAdvancedAnimating] = useState(false);
    const [isAdvancedStepMode, setIsAdvancedStepMode] = useState(false);
    const [advancedAnimationUserInput, setAdvancedAnimationUserInput] = useState('');

    // Animation control
    useEffect(() => {
        let timer: NodeJS.Timeout;
        
        if (isAnimating && !isStepMode) {
            switch (animationState) {
                case 'idle':
                    setAnimationStep(1);
                    setAnimationState('step1');
                    setAnimationOutput('');
                    setShowUserPrompt(false);
                    setAnimationUserInput('');
                    timer = setTimeout(() => setAnimationState('step2'), 1500);
                    break;
                    
                case 'step1':
                    // Show the prompt to user
                    setShowUserPrompt(true);
                    setAnimationOutput(`${promptText}`);
                    timer = setTimeout(() => setAnimationState('step2'), 2000);
                    break;
                    
                case 'step2':
                    // Simulate user typing
                    setAnimationStep(2);
                    let currentInput = '';
                    const targetInput = userInput || 'Alice';
                    let charIndex = 0;
                    
                    const typeChar = () => {
                        if (charIndex < targetInput.length) {
                            currentInput += targetInput[charIndex];
                            setAnimationUserInput(currentInput);
                            charIndex++;
                            setTimeout(typeChar, 150);
                        } else {
                            // User finished typing, move to next step
                            timer = setTimeout(() => setAnimationState('step3'), 1000);
                        }
                    };
                    typeChar();
                    break;
                    
                case 'step3':
                    // Execute print statement
                    setAnimationStep(3);
                    setShowUserPrompt(false);
                    timer = setTimeout(() => setAnimationState('step4'), 1500);
                    break;
                    
                case 'step4':
                    // Show final output
                    setAnimationStep(4);
                    setAnimationOutput(`${printPrompt} ${animationUserInput}`);
                    timer = setTimeout(() => setAnimationState('completed'), 1500);
                    break;
                    
                case 'completed':
                    setIsAnimating(false);
                    break;
            }
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [animationState, isAnimating, isStepMode, promptText, userInput, printPrompt, animationUserInput]);

    const executeStep = (targetState: AnimationState) => {
        switch (targetState) {
            case 'step1':
                setAnimationStep(1);
                setAnimationState('step1');
                setAnimationOutput('');
                setShowUserPrompt(true);
                setAnimationUserInput('');
                setAnimationOutput(`${promptText}`);
                break;
                
            case 'step2':
                setAnimationStep(2);
                setAnimationState('step2');
                setShowUserPrompt(true);
                const targetInput = userInput || 'Alice';
                setAnimationUserInput(targetInput);
                setAnimationOutput(`${promptText}`);
                break;
                
            case 'step3':
                setAnimationStep(3);
                setAnimationState('step3');
                setShowUserPrompt(false);
                break;
                
            case 'step4':
                setAnimationStep(4);
                setAnimationState('step4');
                setAnimationOutput(`${printPrompt} ${animationUserInput || userInput || 'Alice'}`);
                break;
                
            case 'completed':
                setAnimationState('completed');
                setIsAnimating(false);
                setIsStepMode(false);
                break;
        }
    };

    const nextStep = () => {
        if (!isStepMode) return;
        
        switch (animationState) {
            case 'idle':
                executeStep('step1');
                break;
            case 'step1':
                executeStep('step2');
                break;
            case 'step2':
                executeStep('step3');
                break;
            case 'step3':
                executeStep('step4');
                break;
            case 'step4':
                executeStep('completed');
                break;
        }
    };

    const startAnimation = () => {
        setIsAnimating(true);
        setIsStepMode(false);
        setAnimationState('idle');
    };

    const startStepMode = () => {
        setIsAnimating(true);
        setIsStepMode(true);
        setAnimationState('idle');
        executeStep('step1');
    };

    const stopAnimation = () => {
        setIsAnimating(false);
        setIsStepMode(false);
        setAnimationState('idle');
        setAnimationStep(0);
        setAnimationOutput('');
        setShowUserPrompt(false);
        setAnimationUserInput('');
    };

    const resetAnimation = () => {
        stopAnimation();
    };

    // Advanced Animation control
    useEffect(() => {
        let timer: NodeJS.Timeout;
        
        if (isAdvancedAnimating && !isAdvancedStepMode) {
            const  = parseInt(advancedUserAge, 10) >= 18 ? 10 : 12;
            
            switch (advancedAnimationState) {
                case 'idle':
                    setAdvancedAnimationStep(1);
                    setAdvancedAnimationState('step1');
                    setAdvancedAnimationOutput('');
                    setShowAdvancedUserPrompt(false);
                    setAdvancedAnimationUserInput('');
                    timer = setTimeout(() => setAdvancedAnimationState('step2'), 1500);
                    break;
                    
                case 'step1':
                    setShowAdvancedUserPrompt(true);
                    setAdvancedAnimationOutput('How old are you? ');
                    timer = setTimeout(() => setAdvancedAnimationState('step2'), 2000);
                    break;
                    
                case 'step2':
                    setAdvancedAnimationStep(2);
                    let currentInput = '';
                    const targetInput = advancedUserAge;
                    let charIndex = 0;
                    
                    const typeChar = () => {
                        if (charIndex < targetInput.length) {
                            currentInput += targetInput[charIndex];
                            setAdvancedAnimationUserInput(currentInput);
                            charIndex++;
                            setTimeout(typeChar, 150);
                        } else {
                            timer = setTimeout(() => setAdvancedAnimationState('step3'), 1000);
                        }
                    };
                    typeChar();
                    break;
                    
                case 'step3':
                    setAdvancedAnimationStep(3);
                    setShowAdvancedUserPrompt(false);
                    timer = setTimeout(() => setAdvancedAnimationState('step4'), 1500);
                    break;
                    
                case 'step4':
                    setAdvancedAnimationStep(4);
                    timer = setTimeout(() => setAdvancedAnimationState('step5'), 1500);
                    break;
                    
                case 'step5':
                    setAdvancedAnimationStep(5);
                    timer = setTimeout(() => setAdvancedAnimationState('step6'), 1500);
                    break;
                    
                case 'step6':
                    setAdvancedAnimationStep(6);
                    timer = setTimeout(() => setAdvancedAnimationState('step7'), 1500);
                    break;
                    
                case 'step7':
                    setAdvancedAnimationStep(7);
                    timer = setTimeout(() => setAdvancedAnimationState('step8'), 1500);
                    break;
                    
                case 'step8':
                    setAdvancedAnimationStep(8);
                    timer = setTimeout(() => setAdvancedAnimationState('step9'), 1500);
                    break;
                    
                case 'step9':
                    setAdvancedAnimationStep(9);
                    const age = parseInt(advancedUserAge, 10);
                    if (age >= 18) {
                        setAdvancedAnimationOutput('You can vote!');
                        timer = setTimeout(() => setAdvancedAnimationState('step10'), 1500);
                    } else {
                        timer = setTimeout(() => setAdvancedAnimationState('step11'), 1500);
                    }
                    break;
                    
                case 'step10':
                    setAdvancedAnimationStep(10);
                    const ageFor10 = parseInt(advancedUserAge, 10);
                    if (ageFor10 >= 18) {
                        setAdvancedAnimationOutput('You can vote!');
                        timer = setTimeout(() => setAdvancedAnimationState('completed'), 1500);
                    } else {
                        timer = setTimeout(() => setAdvancedAnimationState('step11'), 1500);
                    }
                    break;
                    
                case 'step11':
                    setAdvancedAnimationStep(11);
                    timer = setTimeout(() => setAdvancedAnimationState('step12'), 1500);
                    break;
                    
                case 'step12':
                    setAdvancedAnimationStep(12);
                    const waitYears = 18 - parseInt(advancedUserAge, 10);
                    setAdvancedAnimationOutput(`Wait ${waitYears} more years!`);
                    timer = setTimeout(() => setAdvancedAnimationState('completed'), 1500);
                    break;
                    
                case 'completed':
                    setIsAdvancedAnimating(false);
                    break;
            }
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [advancedAnimationState, isAdvancedAnimating, isAdvancedStepMode, advancedUserAge, advancedAnimationUserInput]);

    const executeAdvancedStep = (targetState: AnimationState) => {
        const age = parseInt(advancedUserAge, 10);
        const waitYears = 18 - age;
        
        switch (targetState) {
            case 'step1':
                setAdvancedAnimationStep(1);
                setAdvancedAnimationState('step1');
                setAdvancedAnimationOutput('');
                setShowAdvancedUserPrompt(true);
                setAdvancedAnimationUserInput('');
                setAdvancedAnimationOutput('How old are you? ');
                break;
            case 'step2':
                setAdvancedAnimationStep(2);
                setAdvancedAnimationState('step2');
                setAdvancedAnimationUserInput(advancedUserAge);
                break;
            case 'step3':
                setAdvancedAnimationStep(3);
                setAdvancedAnimationState('step3');
                setShowAdvancedUserPrompt(false);
                break;
            case 'step4':
                setAdvancedAnimationStep(4);
                setAdvancedAnimationState('step4');
                break;
            case 'step5':
                setAdvancedAnimationStep(5);
                setAdvancedAnimationState('step5');
                break;
            case 'step6':
                setAdvancedAnimationStep(6);
                setAdvancedAnimationState('step6');
                break;
            case 'step7':
                setAdvancedAnimationStep(7);
                setAdvancedAnimationState('step7');
                break;
            case 'step8':
                setAdvancedAnimationStep(8);
                setAdvancedAnimationState('step8');
                break;
            case 'step9':
                setAdvancedAnimationStep(9);
                setAdvancedAnimationState('step9');
                if (age >= 18) {
                    setAdvancedAnimationOutput('You can vote!');
                }
                break;
            case 'step10':
                setAdvancedAnimationStep(10);
                setAdvancedAnimationState('step10');
                if (age >= 18) {
                    setAdvancedAnimationOutput('You can vote!');
                } else {
                    setAdvancedAnimationState('step11');
                    setAdvancedAnimationStep(11);
                }
                break;
            case 'step11':
                if (age < 18) {
                    setAdvancedAnimationStep(11);
                    setAdvancedAnimationState('step11');
                }
                break;
            case 'step12':
                if (age < 18) {
                    setAdvancedAnimationStep(12);
                    setAdvancedAnimationState('step12');
                    setAdvancedAnimationOutput(`Wait ${waitYears} more years!`);
                }
                break;
            case 'completed':
                setAdvancedAnimationState('completed');
                setIsAdvancedAnimating(false);
                setIsAdvancedStepMode(false);
                break;
        }
    };

    // Reset everything if prompt or variable name changes
    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPromptText(e.target.value);
        setStep(1);
        setUserInput('');
    };

    const handleVariableNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setVariableName(name);
        setStep(1);
        setUserInput('');
        if (!isValidVarName(name)) {
            setVariableNameError('Invalid variable name for Python.');
        } else {
            setVariableNameError('');
        }
    };

    const handlePrintPromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrintPrompt(e.target.value);
        setStep(1);
        setUserInput('');
    };

    return (
        <ConceptWrapper
            title="User Input in Python"
            description="You can ask the user for input in Python using the input() function. The user's answer is always a string."
        >
            <TableOfContents>
                <Section
                    title="Getting Input from the User"
                    subtitle='Use input("Your prompt here") to ask the user for something. The answer is saved in a variable.'
                >
                    {/* --- Animated Demonstration --- */}
                    <Section
                        title="How Python Input Works (Animated)"
                        subtitle="Watch how Python executes an input program step by step:"
                    >
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                label='Variable name'
                                value={variableName}
                                onChange={handleVariableNameChange}
                                sx={{ mt: 2, mr: 2, width: 160 }}
                                size="small"
                                error={!!variableNameError}
                                helperText={variableNameError || 'Choose a valid Python variable name.'}
                                disabled={isAnimating}
                            />
                            <TextField
                                label='Prompt for input()'
                                value={promptText}
                                onChange={handlePromptChange}
                                sx={{ mt: 2, mr: 2, width: 320 }}
                                size="small"
                                disabled={isAnimating}
                            />
                            <TextField
                                label='Sample user input'
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                sx={{ mt: 2, mr: 2, width: 200 }}
                                size="small"
                                disabled={isAnimating}
                                placeholder="Alice"
                            />
                            <TextField
                                label='Prompt for print()'
                                value={printPrompt}
                                onChange={handlePrintPromptChange}
                                sx={{ mt: 2, width: 200 }}
                                size="small"
                                disabled={isAnimating}
                            />
                        </Box>

                        <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                startIcon={<PlayArrowIcon />}
                                onClick={startAnimation}
                                disabled={isAnimating || !!variableNameError || !isValidVarName(variableName)}
                            >
                                Auto Play
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<SkipNextIcon />}
                                onClick={startStepMode}
                                disabled={isAnimating || !!variableNameError || !isValidVarName(variableName)}
                            >
                                Step Mode
                            </Button>
                            {isStepMode && animationState !== 'completed' && (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<SkipNextIcon />}
                                    onClick={nextStep}
                                >
                                    Next Step
                                </Button>
                            )}
                            <Button
                                variant="outlined"
                                startIcon={<PauseIcon />}
                                onClick={stopAnimation}
                                disabled={!isAnimating}
                            >
                                Stop
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<RestartAltIcon />}
                                onClick={resetAnimation}
                            >
                                Reset
                            </Button>
                            {animationState !== 'idle' && animationState !== 'completed' && (
                                <Chip 
                                    label={`Step ${animationStep}/4 - ${animationState}${isStepMode ? ' (Step Mode)' : ''}`} 
                                    color="primary" 
                                    variant="outlined" 
                                />
                            )}
                        </Box>

                        <PythonCodeSnippet
                            lines={getAnimatedCodeTemplate(variableName, promptText, userInput, printPrompt, animationStep).map((line, index) => {
                                const shouldHighlight = line.highlight;
                                console.log(`Line ${index}: highlight=${shouldHighlight}, step=${animationStep}`);
                                return {
                                    code: line.code,
                                    comment: line.comment,
                                    style: shouldHighlight ? { 
                                        backgroundColor: '#fff3e0', 
                                        padding: '4px 8px', 
                                        borderRadius: '4px',
                                        border: '2px solid #ff9800',
                                        fontWeight: 'bold',
                                        marginBottom: '8px',
                                        display: 'block'
                                    } : {
                                        marginBottom: '8px',
                                        display: 'block'
                                    }
                                };
                            })}
                            enableRun={false}
                        />

                        {/* Animation Console */}
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
                            
                            {animationState === 'idle' && !isAnimating && (
                                <div style={{ color: '#888', fontStyle: 'italic' }}>
                                    Click "Start Animation" to see how the program runs...
                                </div>
                            )}
                            
                            {(animationState === 'step1' || animationState === 'step2') && (
                                <div>
                                    <div style={{ color: '#4CAF50' }}>$ python program.py</div>
                                    <div style={{ marginTop: '8px' }}>
                                        {animationOutput}
                                        {showUserPrompt && (
                                            <span style={{ 
                                                backgroundColor: '#333', 
                                                padding: '2px 4px', 
                                                marginLeft: '4px',
                                                animation: isAnimating ? 'blink 1s infinite' : 'none'
                                            }}>
                                                {animationUserInput}
                                                {animationState === 'step2' && animationUserInput.length < (userInput || 'Alice').length && '|'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                            
                            {(animationState === 'step3' || animationState === 'step4' || animationState === 'completed') && (
                                <div>
                                    <div style={{ color: '#4CAF50' }}>$ python program.py</div>
                                    <div style={{ marginTop: '8px' }}>{promptText}{animationUserInput}</div>
                                    {(animationState === 'step4' || animationState === 'completed') && (
                                        <div style={{ marginTop: '8px', color: '#2196F3' }}>{animationOutput}</div>
                                    )}
                                    {animationState === 'completed' && (
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
                    </Section>
                </Section>
            </TableOfContents>
        </ConceptWrapper>
    );
}