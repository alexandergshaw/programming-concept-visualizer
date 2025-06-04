'use client';

import { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '@/components/common/Section';
import CodeSnippet from '@/components/common/CodeSnippet';
import OrderedList from '@/components/common/OrderedList';
import TableOfContents from '@/components/common/TableOfContents';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function UserInputConcept() {
    // State for string input
    const [nameInput, setNameInput] = useState('');
    const [nameResult, setNameResult] = useState<string | null>(null);

    // State for integer input
    const [intInput, setIntInput] = useState('');
    const [intResult, setIntResult] = useState<number | string | null>(null);

    // State for float input
    const [floatInput, setFloatInput] = useState('');
    const [floatResult, setFloatResult] = useState<number | string | null>(null);

    // State for sum example
    const [sumFirst, setSumFirst] = useState('');
    const [sumSecond, setSumSecond] = useState('');
    const [sumResult, setSumResult] = useState<number | string | null>(null);

    // State for NaN example
    const [nanInput, setNanInput] = useState('');
    const [nanResult, setNanResult] = useState<string | null>(null);

    return (
        <ConceptWrapper
            title="Getting User Input in JavaScript"
            description="You can ask the user for input in JavaScript using the prompt() function. You can also convert what the user types into numbers using parseInt and parseFloat."
        >
            <TableOfContents>
                <Section
                    title="1. Asking for User Input"
                    subtitle="The prompt() function shows a dialog box that asks the user to type something. Try it below!"
                >
                    <OrderedList
                        items={[
                            "Call prompt() with a message to show to the user.",
                            "The function returns whatever the user types as a string.",
                            "If the user clicks Cancel, prompt() returns null."
                        ]}
                    />
                    <TextField
                        label='Pretend prompt: What is your name?'
                        size="small"
                        value={nameInput}
                        onChange={e => {
                            setNameInput(e.target.value);
                            setNameResult(null);
                        }}
                        sx={{ mt: 2, mr: 2 }}
                    />
                    <CodeSnippet
                        enableRun
                        lines={[
                            { code: `let name = prompt("What is your name?");`, comment: `Ask the user for their name` },
                            { code: `console.log(name);`, comment: `Show what the user typed` }
                        ]}
                    />
                    <Button
                        variant="contained"
                        onClick={() => setNameResult(nameInput ? nameInput : 'User clicked Cancel (null)')}
                        sx={{ mt: 2 }}
                    >
                        Run Code
                    </Button>
                    {nameResult !== null && (
                        <div style={{ marginTop: 12 }}>
                            <strong>Result:</strong> <code>{nameResult}</code>
                        </div>
                    )}
                </Section>
                <Section
                    title="2. Converting User Input to a Number"
                    subtitle="User input from prompt() is always a string. To use it as a number, convert it with parseInt or parseFloat. Try it below!"
                >
                    <OrderedList
                        items={[
                            "Use parseInt to convert a string to a whole number (integer).",
                            "Use parseFloat to convert a string to a decimal number.",
                            "If the input can't be converted, the result will be NaN (Not a Number)."
                        ]}
                    />
                    <TextField
                        label='Pretend prompt: How old are you?'
                        size="small"
                        value={intInput}
                        onChange={e => {
                            setIntInput(e.target.value);
                            setIntResult(null);
                        }}
                        sx={{ mt: 2, mr: 2 }}
                    />
                    <TextField
                        label='Pretend prompt: Enter a price'
                        size="small"
                        value={floatInput}
                        onChange={e => {
                            setFloatInput(e.target.value);
                            setFloatResult(null);
                        }}
                        sx={{ mt: 2, mr: 2 }}
                    />
                    <CodeSnippet
                        enableRun
                        lines={[
                            { code: `let ageStr = prompt("How old are you?");`, comment: `Ask for age (as a string)` },
                            { code: `let age = parseInt(ageStr);`, comment: `Convert to an integer` },
                            { code: `console.log(age);`, comment: `Show the number` },
                            { code: "" },
                            { code: `let priceStr = prompt("Enter a price:");`, comment: `Ask for a price (as a string)` },
                            { code: `let price = parseFloat(priceStr);`, comment: `Convert to a decimal number` },
                            { code: `console.log(price);`, comment: `Show the number` }
                        ]}
                    />
                    <Button
                        variant="contained"
                        onClick={() => {
                            const parsedInt = parseInt(intInput);
                            setIntResult(isNaN(parsedInt) ? 'NaN' : parsedInt);
                            const parsedFloat = parseFloat(floatInput);
                            setFloatResult(isNaN(parsedFloat) ? 'NaN' : parsedFloat);
                        }}
                        sx={{ mt: 2 }}
                    >
                        Run Code
                    </Button>
                    {(intResult !== null || floatResult !== null) && (
                        <div style={{ marginTop: 12 }}>
                            {intResult !== null && (
                                <div>
                                    <strong>parseInt result:</strong> <code>{String(intResult)}</code>
                                </div>
                            )}
                            {floatResult !== null && (
                                <div>
                                    <strong>parseFloat result:</strong> <code>{String(floatResult)}</code>
                                </div>
                            )}
                        </div>
                    )}
                </Section>
                <Section
                    title="3. Adding Two Numbers from User Input"
                    subtitle="Here's how you can ask the user for two numbers and add them together. Try it below!"
                >
                    <TextField
                        label='First number'
                        size="small"
                        value={sumFirst}
                        onChange={e => {
                            setSumFirst(e.target.value);
                            setSumResult(null);
                        }}
                        sx={{ mt: 2, mr: 2 }}
                    />
                    <TextField
                        label='Second number'
                        size="small"
                        value={sumSecond}
                        onChange={e => {
                            setSumSecond(e.target.value);
                            setSumResult(null);
                        }}
                        sx={{ mt: 2, mr: 2 }}
                    />
                    <CodeSnippet
                        enableRun
                        lines={[
                            { code: `let first = prompt("Enter the first number:");`, comment: `Ask for the first number` },
                            { code: `let second = prompt("Enter the second number:");`, comment: `Ask for the second number` },
                            { code: `let sum = parseFloat(first) + parseFloat(second);`, comment: `Add the two numbers` },
                            { code: `console.log("The sum is:", sum);`, comment: `Show the result` }
                        ]}
                    />
                    <Button
                        variant="contained"
                        onClick={() => {
                            const a = parseFloat(sumFirst);
                            const b = parseFloat(sumSecond);
                            setSumResult(isNaN(a) || isNaN(b) ? 'NaN' : a + b);
                        }}
                        sx={{ mt: 2 }}
                    >
                        Run Code
                    </Button>
                    {sumResult !== null && (
                        <div style={{ marginTop: 12 }}>
                            <strong>Sum:</strong> <code>{String(sumResult)}</code>
                        </div>
                    )}
                </Section>
                <Section
                    title="4. What if the User Types Something Weird?"
                    subtitle="If the user types something that isn't a number, parseInt and parseFloat will return NaN (Not a Number). Try it below!"
                >
                    <TextField
                        label='Type a number'
                        size="small"
                        value={nanInput}
                        onChange={e => {
                            setNanInput(e.target.value);
                            setNanResult(null);
                        }}
                        sx={{ mt: 2, mr: 2 }}
                    />
                    <CodeSnippet
                        enableRun
                        lines={[
                            { code: `let input = prompt("Type a number:");`, comment: `Ask for a number` },
                            { code: `let num = parseFloat(input);`, comment: `Try to convert to a number` },
                            { code: `if (isNaN(num)) {`, comment: `Check if the result is Not a Number` },
                            { code: `  console.log("That wasn't a number!");` },
                            { code: `} else {` },
                            { code: `  console.log("You typed the number:", num);` },
                            { code: `}` }
                        ]}
                    />
                    <Button
                        variant="contained"
                        onClick={() => {
                            const num = parseFloat(nanInput);
                            setNanResult(isNaN(num) ? "That wasn't a number!" : `You typed the number: ${num}`);
                        }}
                        sx={{ mt: 2 }}
                    >
                        Run Code
                    </Button>
                    {nanResult && (
                        <div style={{ marginTop: 12 }}>
                            <strong>Result:</strong> <code>{nanResult}</code>
                        </div>
                    )}
                </Section>
            </TableOfContents>
        </ConceptWrapper>
    );
}