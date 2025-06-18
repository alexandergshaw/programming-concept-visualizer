'use client';

import { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '@/components/common/Section';
import PythonCodeSnippet from '@/components/common/PythonCodeSnippet';
import PythonConsoleAnimation, { AnimationStep } from '@/components/common/PythonConsoleAnimation';
import TableOfContents from '@/components/common/TableOfContents';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import OrderedList from '@/components/common/OrderedList';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// F-string animation: show print line with curly braces, then inject variables step by step
function getFStringAnimatedLines(step: number, name: string, age: string, color: string) {
    let printLine = 'print(f"Hi ${name}! You are ${age} years old and your favorite color is ${color}.")';
    let comment;
    if (step === 3) {
        printLine = 'print(f"Hi ${name}! You are ${age} years old and your favorite color is ${color}.")';
        comment = '🔄 Injecting name...';
    } else if (step === 4) {
        printLine = 'print(f"Hi ${name}! You are ${age} years old and your favorite color is ${color}.")';
        comment = '🔄 Injecting age...';
    } else if (step === 5) {
        printLine = 'print(f"Hi ${name}! You are ${age} years old and your favorite color is ${color}.")';
        comment = '🔄 Injecting color...';
    } else if (step === 6) {
        printLine = 'print(f"Hi ${name}! You are ${age} years old and your favorite color is ${color}.")';
        comment = '🔄 Printing the result...';
    } else if (step > 6) {
        printLine = 'print(f"Hi ${name}! You are ${age} years old and your favorite color is ${color}.")';
        comment = '✅ Output shown';
    } else {
        // Always show curly braces for the first 3 steps
        printLine = 'print(f"Hi ${name}! You are ${age} years old and your favorite color is ${color}.")';
    }

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
            code: printLine,
            comment,
            highlight: step >= 3,
        },
    ];
}

function getConcatAnimatedLines(step: number, name: string, age: string, color: string) {
    const printLine = `print("Hi " + name + "! You are " + age + " years old and your favorite color is " + color + ".")`;
    let comment;
    if (step === 3) comment = '🔄 Injecting name...';
    else if (step === 4) comment = '🔄 Injecting age...';
    else if (step === 5) comment = '🔄 Injecting color...';
    else if (step === 6) comment = '🔄 Printing the result...';
    else if (step > 6) comment = '✅ Output shown';

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
            code: printLine,
            comment,
            highlight: step >= 3,
        },
    ];
}

function getFormatAnimatedLines(step: number, name: string, age: string, color: string) {
    const printLine = `print("Hi {}! You are {} years old and your favorite color is {}.".format(name, age, color))`;
    let comment;
    if (step === 3) comment = '🔄 Injecting name...';
    else if (step === 4) comment = '🔄 Injecting age...';
    else if (step === 5) comment = '🔄 Injecting color...';
    else if (step === 6) comment = '🔄 Printing the result...';
    else if (step > 6) comment = '✅ Output shown';

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
            code: printLine,
            comment,
            highlight: step >= 3,
        },
    ];
}

export default function StringManipulationConcept() {
    const [name, setName] = useState('Alice');
    const [age, setAge] = useState('30');
    const [color, setColor] = useState('blue');

    // Animation state for each example
    const [fStep, setFStep] = useState(0);
    const [concatStep, setConcatStep] = useState(0);
    const [formatStep, setFormatStep] = useState(0);

    // F-string tailored animation steps
    const fStringSteps: AnimationStep[] = [
        {
            key: 'input1',
            output: <span>What is your name? </span>,
            showUserPrompt: true,
        },
        {
            key: 'input2',
            output: <span>How old are you? </span>,
            showUserPrompt: true,
        },
        {
            key: 'input3',
            output: <span>What is your favorite color? </span>,
            showUserPrompt: true,
        },
        {
            key: 'inject_name',
            output: <span>
                <span style={{ color: '#90caf9' }}>
                    f"Hi <span style={{ color: '#ffb300' }}>{name}</span>! You are {'{age}'} years old and your favorite color is {'{color}'}."
                </span>
            </span>,
        },
        {
            key: 'inject_age',
            output: <span>
                <span style={{ color: '#90caf9' }}>
                    f"Hi <span style={{ color: '#ffb300' }}>{name}</span>! You are <span style={{ color: '#ffb300' }}>{age}</span> years old and your favorite color is {'{color}'}."
                </span>
            </span>,
        },
        {
            key: 'inject_color',
            output: <span>
                <span style={{ color: '#90caf9' }}>
                    f"Hi <span style={{ color: '#ffb300' }}>{name}</span>! You are <span style={{ color: '#ffb300' }}>{age}</span> years old and your favorite color is <span style={{ color: '#ffb300' }}>{color}</span>."
                </span>
            </span>,
        },
        {
            key: 'print',
            output: <span style={{ color: '#4CAF50' }}>
                Hi {name}! You are {age} years old and your favorite color is {color}.
            </span>,
            completed: true,
        },
    ];

    // Concatenation tailored animation steps
    const concatSteps: AnimationStep[] = [
        {
            key: 'input1',
            output: <span>What is your name? </span>,
            showUserPrompt: true,
        },
        {
            key: 'input2',
            output: <span>How old are you? </span>,
            showUserPrompt: true,
        },
        {
            key: 'input3',
            output: <span>What is your favorite color? </span>,
            showUserPrompt: true,
        },
        {
            key: 'inject_name',
            output: <span>
                <span style={{ color: '#90caf9' }}>
                    "Hi " + <span style={{ color: '#ffb300' }}>{name}</span> + "! You are " + age + " years old and your favorite color is " + color + "."
                </span>
            </span>,
        },
        {
            key: 'inject_age',
            output: <span>
                <span style={{ color: '#90caf9' }}>
                    "Hi " + <span style={{ color: '#ffb300' }}>{name}</span> + "! You are " + <span style={{ color: '#ffb300' }}>{age}</span> + " years old and your favorite color is " + color + "."
                </span>
            </span>,
        },
        {
            key: 'inject_color',
            output: <span>
                <span style={{ color: '#90caf9' }}>
                    "Hi " + <span style={{ color: '#ffb300' }}>{name}</span> + "! You are " + <span style={{ color: '#ffb300' }}>{age}</span> + " years old and your favorite color is " + <span style={{ color: '#ffb300' }}>{color}</span> + "."
                </span>
            </span>,
        },
        {
            key: 'print',
            output: <span style={{ color: '#4CAF50' }}>
                Hi {name}! You are {age} years old and your favorite color is {color}.
            </span>,
            completed: true,
        },
    ];

    // Format tailored animation steps (show curly braces and injected values in the same line)
    const formatSteps: AnimationStep[] = [
        {
            key: 'input1',
            output: <span>What is your name? </span>,
            showUserPrompt: true,
        },
        {
            key: 'input2',
            output: <span>How old are you? </span>,
            showUserPrompt: true,
        },
        {
            key: 'input3',
            output: <span>What is your favorite color? </span>,
            showUserPrompt: true,
        },
        {
            key: 'inject_name',
            output: <span>
                <span style={{ color: '#90caf9' }}>
                    print("Hi <span style={{ color: '#ffb300' }}>{name}</span>! You are {'{}'} years old and your favorite color is {'{}'}."
                    .format(<span style={{ color: '#ffb300' }}>{name}</span>, age, color))
                </span>
            </span>,
        },
        {
            key: 'inject_age',
            output: <span>
                <span style={{ color: '#90caf9' }}>
                    print("Hi <span style={{ color: '#ffb300' }}>{name}</span>! You are <span style={{ color: '#ffb300' }}>{age}</span> years old and your favorite color is {'{}'}."
                    .format(<span style={{ color: '#ffb300' }}>{name}</span>, <span style={{ color: '#ffb300' }}>{age}</span>, color))
                </span>
            </span>,
        },
        {
            key: 'inject_color',
            output: <span>
                <span style={{ color: '#90caf9' }}>
                    print("Hi <span style={{ color: '#ffb300' }}>{name}</span>! You are <span style={{ color: '#ffb300' }}>{age}</span> years old and your favorite color is <span style={{ color: '#ffb300' }}>{color}</span>."
                    .format(<span style={{ color: '#ffb300' }}>{name}</span>, <span style={{ color: '#ffb300' }}>{age}</span>, <span style={{ color: '#ffb300' }}>{color}</span>))
                </span>
            </span>,
        },
        {
            key: 'print',
            output: <span style={{ color: '#4CAF50' }}>
                Hi {name}! You are {age} years old and your favorite color is {color}.
            </span>,
            completed: true,
        },
    ];

    return (
        <ConceptWrapper
            title="String Manipulation in Python"
            description="Python makes it easy to combine and format strings using f-strings, concatenation, and the format() method."
        >
            <TableOfContents>
                <Section
                    title="Ways to Combine and Format Strings"
                    subtitle="Let's look at three common ways to build strings in Python:"
                >
                    <OrderedList
                        items={[
                            'f-strings (recommended, Python 3.6+)',
                            'String concatenation with +',
                            'The format() method',
                        ]}
                    />
                    <Section
                        title="1. f-strings"
                        subtitle="Put an 'f' before the string and use curly braces {} to insert variables."
                    >
                        <PythonCodeSnippet
                            lines={getFStringAnimatedLines(fStep, name, age, color).map(line => ({
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
                        />
                        <Box sx={{ my: 2 }}>
                            <PythonConsoleAnimation
                                steps={fStringSteps}
                                currentStep={fStep}
                                isAnimating={false}
                                animationUserInput={
                                    fStep === 0 ? name :
                                    fStep === 1 ? age :
                                    fStep === 2 ? color : ''
                                }
                                userInput={
                                    fStep === 0 ? name :
                                    fStep === 1 ? age :
                                    fStep === 2 ? color : ''
                                }
                            />
                            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setFStep(Math.min(fStep + 1, fStringSteps.length - 1))}
                                    disabled={fStep >= fStringSteps.length - 1}
                                >
                                    Next Step
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => setFStep(0)}
                                >
                                    Reset
                                </Button>
                            </Stack>
                        </Box>
                    </Section>
                    <Section
                        title="2. String Concatenation"
                        subtitle="Use + to join strings and variables (convert numbers to strings if needed)."
                    >
                        <PythonCodeSnippet
                            lines={getConcatAnimatedLines(concatStep, name, age, color).map(line => ({
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
                        />
                        <Box sx={{ my: 2 }}>
                            <PythonConsoleAnimation
                                steps={concatSteps}
                                currentStep={concatStep}
                                isAnimating={false}
                                animationUserInput={
                                    concatStep === 0 ? name :
                                    concatStep === 1 ? age :
                                    concatStep === 2 ? color : ''
                                }
                                userInput={
                                    concatStep === 0 ? name :
                                    concatStep === 1 ? age :
                                    concatStep === 2 ? color : ''
                                }
                            />
                            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setConcatStep(Math.min(concatStep + 1, concatSteps.length - 1))}
                                    disabled={concatStep >= concatSteps.length - 1}
                                >
                                    Next Step
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => setConcatStep(0)}
                                >
                                    Reset
                                </Button>
                            </Stack>
                        </Box>
                    </Section>
                    <Section
                        title="3. The format() Method"
                        subtitle="Use {} as placeholders and call .format() with your variables."
                    >
                        <PythonCodeSnippet
                            lines={getFormatAnimatedLines(formatStep, name, age, color).map(line => ({
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
                        />
                        <Box sx={{ my: 2 }}>
                            <PythonConsoleAnimation
                                steps={formatSteps}
                                currentStep={formatStep}
                                isAnimating={false}
                                animationUserInput={
                                    formatStep === 0 ? name :
                                    formatStep === 1 ? age :
                                    formatStep === 2 ? color : ''
                                }
                                userInput={
                                    formatStep === 0 ? name :
                                    formatStep === 1 ? age :
                                    formatStep === 2 ? color : ''
                                }
                            />
                            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setFormatStep(Math.min(formatStep + 1, formatSteps.length - 1))}
                                    disabled={formatStep >= formatSteps.length - 1}
                                >
                                    Next Step
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => setFormatStep(0)}
                                >
                                    Reset
                                </Button>
                            </Stack>
                        </Box>
                    </Section>
                </Section>
                <Section
                    title="Try It Yourself!"
                    subtitle="Change the values below and see how each method works:"
                >
                    <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                        <TextField
                            label="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            size="small"
                        />
                        <TextField
                            label="Age"
                            value={age}
                            onChange={e => setAge(e.target.value)}
                            size="small"
                        />
                        <TextField
                            label="Favorite Color"
                            value={color}
                            onChange={e => setColor(e.target.value)}
                            size="small"
                        />
                    </Box>
                    <Section title="f-string result">
                        <PythonCodeSnippet
                            lines={[
                                { code: `name = "${name}"`, comment: 'variable from user input' },
                                { code: ` ` },

                                { code: `age = "${age}"`, comment: 'variable from user input' },
                                { code: ` ` },

                                { code: `color = "${color}"`, comment: 'variable from user input' },
                                { code: ` ` },

                                { code: `print(f"Hi ${name}! You are ${age} years old and your favorite color is ${color}.")`, comment: 'print the result' },
                            ]}
                            enableRun
                        />
                    </Section>
                    <Section title="Concatenation result">
                        <PythonCodeSnippet
                            lines={[
                                { code: `name = "${name}"`, comment: 'variable from user input' },
                                { code: ` ` },
                                { code: `age = "${age}"`, comment: 'variable from user input' },
                                { code: ` ` },
                                { code: `color = "${color}"`, comment: 'variable from user input' },
                                { code: ` ` },
                                { code: `print("Hi " + name + "! You are " + age + " years old and your favorite color is " + color + ".")`, comment: 'print the result' },
                            ]}
                            enableRun
                        />
                    </Section>
                    <Section title="format() result">
                        <PythonCodeSnippet
                            lines={[
                                { code: `name = "${name}"`, comment: 'variable from user input' },
                                { code: ` ` },
                                { code: `age = "${age}"`, comment: 'variable from user input' },
                                { code: ` ` },
                                { code: `color = "${color}"`, comment: 'variable from user input' },
                                { code: ` ` },
                                { code: `print("Hi {}! You are {} years old and your favorite color is {}.".format(name, age, color))`, comment: 'print the result' },
                            ]}
                            enableRun
                        />
                    </Section>
                </Section>
            </TableOfContents>
        </ConceptWrapper>
    )
}