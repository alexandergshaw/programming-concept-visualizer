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

const getAdvancedAnimatedCodeTemplate = (
    userAge: string,
    animationStep: number
) => [
    {
        code: `age_str = input("How old are you? ")`,
        comment: animationStep === 1 ? '🔄 Currently executing: Prompting user for age...' : 
                animationStep === 2 ? `✅ Completed: User entered "${userAge || '25'}" - stored as string in age_str` : undefined,
        highlight: animationStep === 1 || animationStep === 2,
    },
    {
        code: `age = int(age_str)`,
        comment: animationStep === 3 ? `🔄 Currently executing: Converting "${userAge || '25'}" to integer...` : 
                animationStep === 4 ? `✅ Completed: age = ${parseInt(userAge || '25', 10)} (now a number)` : undefined,
        highlight: animationStep === 3 || animationStep === 4,
    },
    {
        code: `years_to_vote = 18 - age`,
        comment: animationStep === 5 ? `🔄 Currently executing: Calculating 18 - ${parseInt(userAge || '25', 10)}...` : 
                animationStep === 6 ? `✅ Completed: years_to_vote = ${18 - parseInt(userAge || '25', 10)}` : undefined,
        highlight: animationStep === 5 || animationStep === 6,
    },
    {
        code: `if age >= 18:`,
        comment: animationStep === 7 ? `🔄 Currently executing: Checking if ${parseInt(userAge || '25', 10)} >= 18...` : 
                animationStep === 8 ? `✅ Completed: Condition is ${parseInt(userAge || '25', 10) >= 18 ? 'True' : 'False'}` : undefined,
        highlight: animationStep === 7 || animationStep === 8,
    },
    {
        code: `    print("You can vote!")`,
        comment: animationStep === 9 && parseInt(userAge || '25', 10) >= 18 ? `🔄 Currently executing: Running this branch...` : 
                animationStep === 10 && parseInt(userAge || '25', 10) >= 18 ? `✅ Completed: Output displayed` : undefined,
        highlight: (animationStep === 9 || animationStep === 10) && parseInt(userAge || '25', 10) >= 18,
    },
    {
        code: `else:`,
        comment: animationStep === 9 && parseInt(userAge || '25', 10) < 18 ? `🔄 Currently executing: Running else branch...` : 
                animationStep === 10 && parseInt(userAge || '25', 10) < 18 ? `✅ Completed: Running else branch` : undefined,
        highlight: (animationStep === 9 || animationStep === 10) && parseInt(userAge || '25', 10) < 18,
    },
    {
        code: `    print(f"Wait {years_to_vote} more years!")`,
        comment: animationStep === 11 && parseInt(userAge || '25', 10) < 18 ? `🔄 Currently executing: Printing wait message...` : 
                animationStep === 12 && parseInt(userAge || '25', 10) < 18 ? `✅ Completed: Output displayed` : undefined,
        highlight: (animationStep === 11 || animationStep === 12) && parseInt(userAge || '25', 10) < 18,
    },
];

const codeTemplate = (
    varName: string,
    promptText: string,
    userInput: string,
    printPrompt: string,
    step: number
) => [
    {
        code: `${varName} = input("${promptText}")`,
        comment: step === 1 ? '⬅️ This line is running now: Python is asking the user for input.' : undefined,
    },
    {
        code: `print("${printPrompt}", ${varName})`,
        comment: step === 2 ? '⬅️ This line is running now: Python prints a message using the user\'s answer.' : undefined,
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
    const [step, setStep] = useState<1 | 2>(1);

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
    const [advancedAnimationStep, setAdvancedAnimationStep] = useState(0);
    const [isAdvancedAnimating, setIsAdvancedAnimating] = useState(false);
    const [isAdvancedStepMode, setIsAdvancedStepMode] = useState(false);
    const [advancedAnimationOutput, setAdvancedAnimationOutput] = useState('');
    const [showAdvancedUserPrompt, setShowAdvancedUserPrompt] = useState(false);
    const [advancedAnimationUserInput, setAdvancedAnimationUserInput] = useState('');
    const [advancedUserAge, setAdvancedUserAge] = useState('16');

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
            const maxStep = parseInt(advancedUserAge, 10) >= 18 ? 10 : 12;
            
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

    const nextAdvancedStep = () => {
        if (!isAdvancedStepMode) return;
        
        const age = parseInt(advancedUserAge, 10);
        
        switch (advancedAnimationState) {
            case 'idle':
                executeAdvancedStep('step1');
                break;
            case 'step1':
                executeAdvancedStep('step2');
                break;
            case 'step2':
                executeAdvancedStep('step3');
                break;
            case 'step3':
                executeAdvancedStep('step4');
                break;
            case 'step4':
                executeAdvancedStep('step5');
                break;
            case 'step5':
                executeAdvancedStep('step6');
                break;
            case 'step6':
                executeAdvancedStep('step7');
                break;
            case 'step7':
                executeAdvancedStep('step8');
                break;
            case 'step8':
                executeAdvancedStep('step9');
                break;
            case 'step9':
                executeAdvancedStep('step10');
                break;
            case 'step10':
                if (age < 18) {
                    executeAdvancedStep('step11');
                } else {
                    executeAdvancedStep('completed');
                }
                break;
            case 'step11':
                executeAdvancedStep('step12');
                break;
            case 'step12':
                executeAdvancedStep('completed');
                break;
        }
    };

    const startAdvancedAnimation = () => {
        setIsAdvancedAnimating(true);
        setIsAdvancedStepMode(false);
        setAdvancedAnimationState('idle');
    };

    const startAdvancedStepMode = () => {
        setIsAdvancedAnimating(true);
        setIsAdvancedStepMode(true);
        setAdvancedAnimationState('idle');
        executeAdvancedStep('step1');
    };

    const stopAdvancedAnimation = () => {
        setIsAdvancedAnimating(false);
        setIsAdvancedStepMode(false);
        setAdvancedAnimationState('idle');
        setAdvancedAnimationStep(0);
        setAdvancedAnimationOutput('');
        setShowAdvancedUserPrompt(false);
        setAdvancedAnimationUserInput('');
    };

    const resetAdvancedAnimation = () => {
        stopAdvancedAnimation();
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

    // Step 1: User types their answer (simulating input())
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    // Step 2: Show output as if print() ran
    const handleSubmit = () => {
        setStep(2);
    };

    // Step 1: Go back to input
    const handleBack = () => {
        setStep(1);
    };

    // --- More in-depth interactive example state ---
    const [ageInput, setAgeInput] = useState('');
    const [showAdvancedResult, setShowAdvancedResult] = useState(false);
    const [ageError, setAgeError] = useState('');

    // --- More in-depth code template ---
    const advancedCodeLines = [
        { code: 'age = input("How old are you? ")', comment: 'Ask for age' },
        { code: 'age = int(age)', comment: 'Convert age to a number' },
        { code: 'if age >= 18:', comment: 'Check if user can vote' },
        { code: '    print("You are old enough to vote!")', comment: 'Output for eligible voters' },
        { code: 'else:', comment: 'Otherwise...' },
        { code: '    print("You are not old enough to vote yet.")', comment: 'Output for underage users' },
    ];

    // --- Advanced logic for output ---
    let advancedOutput = '';
    const parsedAge = parseInt(ageInput, 10);
    if (showAdvancedResult) {
        if (isNaN(parsedAge)) {
            advancedOutput = 'Please enter a valid number for age.';
        } else if (parsedAge >= 18) {
            advancedOutput = 'You are old enough to vote!';
        } else {
            advancedOutput = 'You are not old enough to vote yet.';
        }
    }

    // Utility functions for the advanced animation
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
    const typeText = async (text: string, setter: (value: string) => void) => {
        for (let i = 0; i <= text.length; i++) {
            setter(text.substring(0, i));
            await sleep(100);
        }
    };

    // --- Advanced Animated Demo Component ---
    const AdvancedAnimatedDemo = () => {
        const [isAdvancedPlaying, setIsAdvancedPlaying] = useState(false);
        const [advancedStep, setAdvancedStep] = useState(0);
        const [advancedAutoPlay, setAdvancedAutoPlay] = useState(false);
        const [advancedOutput, setAdvancedOutput] = useState<string[]>([]);
        const [advancedCurrentTyping, setAdvancedCurrentTyping] = useState<string>('');
        const [advancedConsoleVisible, setAdvancedConsoleVisible] = useState(false);

        const advancedCode = `name = input("What's your name? ")
age = input("How old are you? ")  
age_in_years = int(age)
age_in_days = age_in_years * 365
print(f"Hello {name}!")
print(f"You are {age_in_days} days old!")
if age_in_years >= 13 and age_in_years <= 19:
    print("You're a teenager!")
else:
    print("You're not a teenager.")`

        const advancedSteps = [
            {
                line: 0,
                description: "Ask for the user's name",
                input: "Alex",
                output: ""
            },
            {
                line: 1,
                description: "Ask for the user's age",
                input: "16",
                output: ""
            },
            {
                line: 2,
                description: "Convert age string to integer",
                input: "",
                output: ""
            },
            {
                line: 3,
                description: "Calculate age in days (16 × 365)",
                input: "",
                output: ""
            },
            {
                line: 4,
                description: "Print personalized greeting",
                input: "",
                output: "Hello Alex!"
            },
            {
                line: 5,
                description: "Print age in days",
                input: "",
                output: "You are 5840 days old!"
            },
            {
                line: 6,
                description: "Check if age is between 13 and 19",
                input: "",
                output: ""
            },
            {
                line: 7,
                description: "Since 16 is between 13-19, print teenager message",
                input: "",
                output: "You're a teenager!"
            }
        ];

        const runAdvancedAnimation = () => {
            setIsAdvancedPlaying(true);
            setAdvancedConsoleVisible(true);
            setAdvancedOutput([]);
            setAdvancedCurrentTyping('');
            setAdvancedStep(0);
            
            if (advancedAutoPlay) {
                runAdvancedAutoAnimation();
            }
        };

        const runAdvancedAutoAnimation = async () => {
            for (let i = 0; i < advancedSteps.length; i++) {
                setAdvancedStep(i);
                await sleep(1500);
                
                const step = advancedSteps[i];
                
                if (step.input) {
                    // Simulate typing user input
                    await typeText(step.input, setAdvancedCurrentTyping);
                    await sleep(1000);
                    setAdvancedOutput(prev => [...prev, `> ${step.input}`]);
                    setAdvancedCurrentTyping('');
                }
                
                if (step.output) {
                    // Add program output
                    await sleep(800);
                    setAdvancedOutput(prev => [...prev, step.output]);
                }
                
                await sleep(500);
            }
            
            setIsAdvancedPlaying(false);
        };

        const advancedStepForward = () => {
            if (advancedStep < advancedSteps.length - 1) {
                const newStep = advancedStep + 1;
                setAdvancedStep(newStep);
                
                const step = advancedSteps[newStep];
                
                if (step.input) {
                    setAdvancedOutput(prev => [...prev, `> ${step.input}`]);
                }
                
                if (step.output) {
                    setAdvancedOutput(prev => [...prev, step.output]);
                }
            }
        };

        const advancedStepBackward = () => {
            if (advancedStep > 0) {
                setAdvancedStep(advancedStep - 1);
                // Rebuild output up to current step
                const newOutput: string[] = [];
                for (let i = 0; i <= advancedStep - 1; i++) {
                    const step = advancedSteps[i];
                    if (step.input) newOutput.push(`> ${step.input}`);
                    if (step.output) newOutput.push(step.output);
                }
                setAdvancedOutput(newOutput);
            }
        };

        const resetAdvancedAnimation = () => {
            setIsAdvancedPlaying(false);
            setAdvancedStep(0);
            setAdvancedOutput([]);
            setAdvancedCurrentTyping('');
            setAdvancedConsoleVisible(false);
        };

        const stopAdvancedAnimation = () => {
            setIsAdvancedPlaying(false);
        };

        return (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Code Section */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3 text-gray-800">Code Execution</h4>
                        <PythonCodeSnippet
                            code={advancedCode}
                            editable={false}
                            style={{
                                [advancedSteps[advancedStep]?.line]: {
                                    backgroundColor: '#fef3c7',
                                    borderLeft: '4px solid #f59e0b'
                                }
                            }}
                        />
                        
                        {/* Step Description */}
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">
                                <strong>Step {advancedStep + 1}:</strong> {advancedSteps[advancedStep]?.description}
                            </p>
                        </div>
                    </div>

                    {/* Console Section */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3 text-gray-800">Console Output</h4>
                        <div 
                            className={`bg-black text-green-400 p-4 rounded-lg font-mono text-sm min-h-[300px] transition-opacity duration-300 ${
                                advancedConsoleVisible ? 'opacity-100' : 'opacity-50'
                            }`}
                        >
                            <div className="mb-2 text-gray-400">Python Interactive Console</div>
                            {advancedOutput.map((line, index) => (
                                <div key={index} className="mb-1">
                                    {line.startsWith('>') ? (
                                        <span className="text-yellow-400">{line}</span>
                                    ) : (
                                        <span>{line}</span>
                                    )}
                                </div>
                            ))}
                            {advancedCurrentTyping && (
                                <div className="text-yellow-400">
                                    &gt; {advancedCurrentTyping}<span className="animate-pulse">|</span>
                                </div>
                            )}
                            {!advancedConsoleVisible && (
                                <div className="text-gray-500 text-center mt-12">
                                    Click play to start the animation
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Advanced Animation Controls */}
                <div className="mt-6 flex flex-wrap gap-3 items-center justify-center">
                    <button
                        onClick={() => {
                            setAdvancedAutoPlay(true);
                            runAdvancedAnimation();
                        }}
                        disabled={isAdvancedPlaying}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span>▶</span> Auto Play
                    </button>
                    
                    <button
                        onClick={() => {
                            setAdvancedAutoPlay(false);
                            runAdvancedAnimation();
                        }}
                        disabled={isAdvancedPlaying}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span>👆</span> Step Mode
                    </button>

                    {!advancedAutoPlay && advancedConsoleVisible && (
                        <>
                            <button
                                onClick={advancedStepBackward}
                                disabled={advancedStep === 0}
                                className="flex items-center gap-1 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ◀ Back
                            </button>
                            
                            <button
                                onClick={advancedStepForward}
                                disabled={advancedStep >= advancedSteps.length - 1}
                                className="flex items-center gap-1 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next ▶
                            </button>
                        </>
                    )}

                    <button
                        onClick={stopAdvancedAnimation}
                        disabled={!isAdvancedPlaying}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span>⏹</span> Stop
                    </button>

                    <button
                        onClick={resetAdvancedAnimation}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                        <span>↻</span> Reset
                    </button>
                </div>

                {/* Progress Indicator */}
                <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((advancedStep + 1) / advancedSteps.length) * 100}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-600 text-center mt-2">
                        Step {advancedStep + 1} of {advancedSteps.length}
                    </p>
                </div>
            </div>
        );
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