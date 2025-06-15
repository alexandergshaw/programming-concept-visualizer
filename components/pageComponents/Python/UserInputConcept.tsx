'use client';

import { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '@/components/common/Section';
import CodeSnippet from '@/components/common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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
        highlight: step === 1,
    },
    {
        code: `print("${printPrompt}", ${varName})`,
        comment: step === 2 ? '⬅️ This line is running now: Python prints a message using the user\'s answer.' : undefined,
        highlight: step === 2,
    },
];

export default function UserInputConcept() {
    const [promptText, setPromptText] = useState('What is your name? ');
    const [variableName, setVariableName] = useState('name');
    const [variableNameError, setVariableNameError] = useState('');
    const [userInput, setUserInput] = useState('');
    const [printPrompt, setPrintPrompt] = useState('Hello,');
    const [step, setStep] = useState<1 | 2>(1);

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
    const [favColor, setFavColor] = useState('');
    const [showAdvancedResult, setShowAdvancedResult] = useState(false);
    const [ageError, setAgeError] = useState('');

    // --- More in-depth code template ---
    const advancedCodeLines = [
        { code: 'age = input("How old are you? ")', comment: 'Ask for age' },
        { code: 'age = int(age)', comment: 'Convert age to a number' },
        { code: 'if age < 18:', comment: 'Check if user is a child' },
        { code: '    print("You are not old enough to vote")'},
        { code: 'else:', comment: 'Otherwise...' },
        { code: '    print("You are old enough to vote")' },
    ];

    // --- Advanced logic for output ---
    let advancedOutput = '';
    const parsedAge = parseInt(ageInput, 10);

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
                    {/* --- Original Interactive Portion --- */}
                    <Section
                        title="Try it yourself!"
                        subtitle="Experience the flow just like a real Python program:"
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
                            />
                            <TextField
                                label='Prompt for input()'
                                value={promptText}
                                onChange={handlePromptChange}
                                sx={{ mt: 2, mr: 2, width: 320 }}
                                size="small"
                            />
                            <TextField
                                label='Prompt for print()'
                                value={printPrompt}
                                onChange={handlePrintPromptChange}
                                sx={{ mt: 2, width: 200 }}
                                size="small"
                            />
                        </Box>
                        {step === 1 && (
                            <Box sx={{ mb: 3 }}>
                                <div>
                                    <span style={{ color: '#1976d2', fontWeight: 500 }}>Python:</span>
                                    <span style={{ fontFamily: 'monospace', marginLeft: 8 }}>{promptText}</span>
                                </div>
                                <TextField
                                    label="Your answer"
                                    value={userInput}
                                    onChange={handleInputChange}
                                    sx={{ mt: 2, width: 220 }}
                                    size="small"
                                    autoFocus
                                />
                                <Button
                                    variant="contained"
                                    sx={{ ml: 2, mt: 2 }}
                                    onClick={handleSubmit}
                                    disabled={
                                        !userInput.trim() ||
                                        !!variableNameError ||
                                        !isValidVarName(variableName)
                                    }
                                >
                                    Submit
                                </Button>
                            </Box>
                        )}
                        <CodeSnippet
                            lines={codeTemplate(variableName, promptText, userInput, printPrompt, step).map(line => ({
                                code: line.code,
                                comment: line.comment,
                                ...(line.highlight
                                    ? { style: { background: '#fffde7', fontWeight: 600 } }
                                    : {})
                            }))}
                            enableRun={false}
                            language="python"
                        />
                        {step === 2 && (
                            <Box sx={{
                                background: '#f5f5f5',
                                borderRadius: 2,
                                padding: '16px 20px',
                                marginTop: 3,
                                fontFamily: 'monospace',
                                color: '#333'
                            }}>
                                <b>Output:</b>
                                <div style={{ color: '#1976d2', marginTop: 4 }}>
                                    {printPrompt} {userInput}
                                </div>
                                <Button
                                    variant="outlined"
                                    sx={{ mt: 2 }}
                                    onClick={handleBack}
                                >
                                    Ask again
                                </Button>
                            </Box>
                        )}
                    </Section>

                    {/* --- New: More In-Depth Interactive Portion --- */}
                    <Section
                        title="A More In-Depth Example"
                        subtitle="Let's see how you can use user input in a slightly bigger Python program."
                    >
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                label='How old are you?'
                                value={ageInput}
                                onChange={e => {
                                    setAgeInput(e.target.value);
                                    setShowAdvancedResult(false);
                                    setAgeError('');
                                }}
                                sx={{ mr: 2, width: 180 }}
                                size="small"
                                error={!!ageError}
                                helperText={ageError}
                            />
                            <TextField
                                label='What is your favorite color?'
                                value={favColor}
                                onChange={e => {
                                    setFavColor(e.target.value);
                                    setShowAdvancedResult(false);
                                }}
                                sx={{ mr: 2, width: 220 }}
                                size="small"
                            />
                            <Button
                                variant="contained"
                                onClick={() => {
                                    if (isNaN(parseInt(ageInput, 10))) {
                                        setAgeError('Please enter a valid number for age.');
                                        setShowAdvancedResult(false);
                                    } else {
                                        setShowAdvancedResult(true);
                                        setAgeError('');
                                    }
                                }}
                                disabled={!ageInput.trim() || !favColor.trim()}
                            >
                                Show Result
                            </Button>
                            {showAdvancedResult && (
                                <Button
                                    variant="outlined"
                                    sx={{ ml: 2 }}
                                    onClick={() => {
                                        setShowAdvancedResult(false);
                                        setAgeInput('');
                                        setFavColor('');
                                        setAgeError('');
                                    }}
                                >
                                    Try Again
                                </Button>
                            )}
                        </Box>
                        <CodeSnippet
                            lines={advancedCodeLines}
                            enableRun={false}
                            language="python"
                        />
                        {showAdvancedResult && (
                            <Box sx={{
                                background: '#f5f5f5',
                                borderRadius: 2,
                                padding: '16px 20px',
                                marginTop: 3,
                                fontFamily: 'monospace',
                                color: '#333'
                            }}>
                                <b>Output:</b>
                                <div style={{ color: '#1976d2', marginTop: 4 }}>
                                    {advancedOutput}
                                </div>
                            </Box>
                        )}
                    </Section>
                </Section>
            </TableOfContents>
        </ConceptWrapper>
    );
}