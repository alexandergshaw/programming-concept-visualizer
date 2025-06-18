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
import PythonConsoleAnimation, { AnimationStep } from '@/components/common/PythonConsoleAnimation';

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

    // Build animation steps for PythonConsoleAnimation
    const animationSteps: AnimationStep[] = [
        {
            key: 'prompt',
            output: promptText,
            showUserPrompt: animationStep === 1 || animationStep === 2,
        },
        {
            key: 'input',
            output: promptText,
            showUserPrompt: animationStep === 2,
        },
        {
            key: 'print',
            output: (
                <>
                    {promptText}
                    {animationUserInput}
                </>
            ),
            extraOutput: animationStep >= 4 ? `${printPrompt} ${animationUserInput || userInput || 'Alice'}` : undefined,
        },
        {
            key: 'completed',
            output: (
                <>
                    {promptText}
                    {animationUserInput}
                </>
            ),
            extraOutput: `${printPrompt} ${animationUserInput || userInput || 'Alice'}`,
            completed: true,
        },
    ].slice(0, animationStep > 0 ? animationStep : 1);

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

    // Reset everything if prompt or variable name changes
    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPromptText(e.target.value);
        setUserInput('');
    };

    const handleVariableNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setVariableName(name);
        setUserInput('');
        if (!isValidVarName(name)) {
            setVariableNameError('Invalid variable name for Python.');
        } else {
            setVariableNameError('');
        }
    };

    const handlePrintPromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrintPrompt(e.target.value);
        setUserInput('');
        
    };

    function getFStringAnimatedLines(step: number, name: string, age: string, color: string) {
        return [
            {
                code: `name = input("What is your name? ")`,
                comment: step === 0 ? '🔄 Prompting for name...' : step > 0 ? `✅ Got name: "${name}"` : undefined,
                highlight: step === 0,
            },
            { code: ` ` },
            {
                code: `age = input("How old are you? ")`,
                comment: step === 1 ? '🔄 Prompting for age...' : step > 1 ? `✅ Got age: "${age}"` : undefined,
                highlight: step === 1,
            },
            { code: ` ` },
            {
                code: `color = input("What is your favorite color? ")`,
                comment: step === 2 ? '🔄 Prompting for color...' : step > 2 ? `✅ Got color: "${color}"` : undefined,
                highlight: step === 2,
            },
            { code: ` ` },
            {
                code: `f"Hi {name}! You are {age} years old and your favorite color is {color}."`,
                comment: step === 3 ? '🔄 Substituting variables in f-string...' : step > 3 ? '✅ f-string ready' : undefined,
                highlight: step === 3,
            },
            { code: ` ` },
            {
                code: `print(f"Hi ${name}! You are ${age} years old and your favorite color is ${color}.")`,
                comment: step === 4 ? '🔄 Printing the result...' : step > 4 ? '✅ Output shown' : undefined,
                highlight: step === 4,
            },
        ];
    }

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
                        <PythonConsoleAnimation
                            steps={animationSteps}
                            currentStep={animationStep - 1}
                            isAnimating={isAnimating}
                            animationUserInput={animationUserInput}
                            userInput={userInput}
                            promptText={promptText}
                        />

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

                        <PythonCodeSnippet
                            lines={getFStringAnimatedLines(animationStep, userInput, '', '').map(line => ({
                                code: line.code,
                                comment: line.comment,
                                style: line.highlight
                                    ? {
                                        backgroundColor: '#fff3e0',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        border: '2px solid #ff9800',
                                        fontWeight: 'bold',
                                        marginBottom: '8px',
                                        display: 'block'
                                    }
                                    : {
                                        marginBottom: '8px',
                                        display: 'block'
                                    }
                            }))}
                            enableRun={false}
                        />

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