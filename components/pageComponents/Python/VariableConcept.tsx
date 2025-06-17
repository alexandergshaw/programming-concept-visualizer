'use client';

import { useState, useEffect } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import TextField from '@mui/material/TextField';
import '../../../styles/variable.css';
import Section from '@/components/common/Section';
import PythonCodeSnippet from '@/components/common/PythonCodeSnippet';
import OrderedList from '@/components/common/OrderedList';
import VideoPlayer from '@/components/common/VideoPlayer';
import TableOfContents from '@/components/common/TableOfContents';

const reservedKeywords = [
    'False', 'None', 'True', 'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else',
    'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or',
    'pass', 'raise', 'return', 'try', 'while', 'with', 'yield'
];

export default function VariableConcept() {
    const [firstNum, setFirstNum] = useState(5);
    const [secondNum, setSecondNum] = useState(5);
    const [variableName, setVariableName] = useState('');
    const [variableNameError, setVariableNameError] = useState('');
    const [helperText, setHelperText] = useState('Enter a valid variable name.');
    const [result, setResult] = useState(firstNum - secondNum);
    const [userResult, setUserResult] = useState(10);

    useEffect(() => {
        setResult(firstNum - secondNum);
    }, [firstNum, secondNum]);

    const handleVariableNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setHelperText('');
        setVariableNameError('');

        // Python variable name rules
        if (/^[0-9]/.test(name)) {
            setVariableNameError('Variable name cannot start with a digit.');
        } else if (!/^[_a-zA-Z][_a-zA-Z0-9]*$/.test(name)) {
            setVariableNameError('Variable name contains invalid characters.');
        } else if (reservedKeywords.includes(name)) {
            setVariableNameError(`"${name}" is a reserved keyword and cannot be used as a variable name.`);
        } else {
            setHelperText('That is a valid variable name!');
        }

        setVariableName(name);
    };

    return (
        <ConceptWrapper
            title="Variables in Python"
            description="A variable in Python is like a labeled box that stores a value. You can use variables to store numbers, text, or other data so you can use them later in your program."
        >
            <TableOfContents>
                <VideoPlayer src="https://www.youtube.com/embed/YYXdXT2l-Gg" />
                <Section title="1. Creating a Variable" subtitle="To create (declare) a variable in Python, just pick a name and use the = sign to assign it a value.">
                    <OrderedList
                        items={[
                            'Pick a name for your variable.',
                            'Use the = sign to assign it a value.',
                        ]}
                    />
                    <PythonCodeSnippet
                        lines={[
                            { code: `my_variable = "value"`, comment: `declare a variable and assign it a value` },
                            { code: `` },
                            { code: `uninitialized_variable = None`, comment: `declare a variable with no value (None means "nothing" in Python)` },
                            { code: `` },
                            { code: `print("value of my_variable:", my_variable)`, comment: `output the value of the variable` },
                            { code: `` },
                            { code: `print("value of uninitialized_variable:", uninitialized_variable)`, comment: `output the value of the variable that is None` },
                        ]}
                        enableRun
                    />
                </Section>
                <Section title="2. Naming Variables" subtitle="There are a few rules to follow when naming variables in Python:">
                    <OrderedList
                        items={[
                            'Variable names can only contain letters, numbers, and underscores (_).',
                            'Variable names cannot start with a number.',
                            'Variable names cannot be the same as Python keywords (like if, for, while, etc.).',
                        ]}
                    />
                    <Section title="2a. Examples of Valid and Invalid Variable Names" subtitle="Here are some examples of valid and invalid variable names. Try to use descriptive names!">
                        <PythonCodeSnippet
                            lines={[
                                { code: `1st_variable = 5`, comment: `invalid variable name - cannot start with a number` },
                                { code: `for = 5`, comment: `invalid variable name - 'for' is a reserved keyword` },
                                { code: `my-variable = 5`, comment: `invalid variable name - cannot contain hyphens` },
                                { code: `my variable = 5`, comment: `invalid variable name - cannot contain spaces` },
                                { code: `my_variable = 5`, comment: `valid variable name` },
                                { code: `_my_variable = 5`, comment: `valid variable name - starts with an underscore` },
                                { code: `myVariable = 5`, comment: `valid variable name (but Python style is usually with underscores)` },
                                { code: `my_variable1 = 5`, comment: `valid variable name - ends with a number` },
                            ]}
                        />
                    </Section>
                    <Section title="2b. Try It Yourself!" subtitle="Type a variable name below to see if it's valid in Python.">
                        <TextField
                            label="Variable Name"
                            size="small"
                            value={variableName}
                            onChange={handleVariableNameChange}
                            error={!!variableNameError}
                            helperText={variableNameError || helperText}
                            sx={{ mb: 2 }}
                        />
                    </Section>
                </Section>
                <Section title="3. Accessing a Variable's Value" subtitle="Let's declare three variables (first_num, second_num, and result). We assign each a value using =. To access their values, just use their names.">
                    <TextField
                        label="First Number"
                        size="small"
                        type="number"
                        value={firstNum}
                        onChange={(e) => setFirstNum(Number(e.target.value))}
                        sx={{ mr: 2 }}
                    />
                    <TextField
                        label="Second Number"
                        size="small"
                        type="number"
                        value={secondNum}
                        onChange={(e) => setSecondNum(Number(e.target.value))}
                        sx={{ mr: 2 }}
                    />

                    <PythonCodeSnippet
                        lines={[
                            { code: `first_num = ${firstNum}`, comment: `declare the first variable - its name is first_num, and its value is ${firstNum}` },
                            { code: `` },
                            { code: `second_num = ${secondNum}`, comment: `declare the second variable - its name is second_num, and its value is ${secondNum}` },
                            { code: `` },
                            { code: `result = first_num - second_num`, comment: `the variable's name is result and its value is ${firstNum - secondNum}` },
                            { code: `` },
                            { code: `print("value of result:", result)`, comment: `access the value of result by using its name` },
                        ]}
                        enableRun
                    />
                </Section>
                <Section title="4. Reassigning a Variable's Value" subtitle="You can change a variable's value at any time. This is called reassigning a variable. Try it yourself below!">
                    <TextField
                        label="Reassign to result:"
                        size="small"
                        type="number"
                        value={userResult}
                        onChange={e => setUserResult(Number(e.target.value))}
                        sx={{ mt: 2, mb: 1 }}
                    />
                    <PythonCodeSnippet
                        lines={[
                            { code: `first_num = ${firstNum}`, comment: `declare the first variable - its name is first_num, and its value is ${firstNum}` },
                            { code: `` },
                            { code: `second_num = ${secondNum}`, comment: `declare the second variable - its name is second_num, and its value is ${secondNum}` },
                            { code: `` },
                            { code: `result = first_num - second_num`, comment: `the variable's name is result and its value is ${result}` },
                            { code: `` },
                            { code: `print("value of result BEFORE reassigning:", result)`, comment: `output before reassigning (output: ${result})` },
                            { code: `` },
                            { code: `result = ${userResult}`, comment: `reassign the variable result to a new value` },
                            { code: `` },
                            { code: `print("value of result AFTER reassigning:", result)`, comment: `output after reassigning (output: ${userResult})` },
                        ]}
                        enableRun
                    />
                </Section>
            </TableOfContents>
        </ConceptWrapper>
    );
}