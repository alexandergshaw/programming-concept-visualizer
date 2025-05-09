'use client';

import { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import TextField from '@mui/material/TextField';
import '../../../styles/variable.css';
import Section from '@/components/common/Section';
import CodeSnippet from '@/components/common/CodeSnippet';
import OrderedList from '@/components/common/OrderedList';
import VideoPlayer from '@/components/common/VideoPlayer';
import TableOfContents from '@/components/common/TableOfContents';

const reservedKeywords = [
    'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'enum',
    'export', 'extends', 'false', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'new', 'null',
    'return', 'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield',
    'let', 'static', 'implements', 'interface', 'package', 'private', 'protected', 'public'
];

export default function VariableConcept() {
    const [firstNum, setFirstNum] = useState(5); // Default value for firstNum
    const [secondNum, setSecondNum] = useState(5); // Default value for secondNum
    const [variableName, setVariableName] = useState('');
    const [variableNameError, setVariableNameError] = useState(''); // State for variable name error
    const [helperText, setHelperText] = useState('Enter a valid variable name.');

    const handleVariableNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setHelperText(''); // Reset helper text
        setVariableNameError(''); // Reset error message

        // Check for specific errors
        if (/^[0-9]/.test(name)) {
            setVariableNameError('Variable name cannot start with a digit.');
        } else if (!/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name)) {
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
            title="Variables in JavaScript"
            description="We can think of a variable as a box that we put a value in. The box has a label (the variable name) that we can use to access the value inside. In professional terms, we call this storing data. We can store all kinds of data in a variable, like numbers, text, or even more complex things like lists and objects."
        >
            <TableOfContents>
                <VideoPlayer src="https://www.youtube.com/embed/9QbIDVcRnc8?si=MdHHGk2C7Tesrc6D" />
                <Section title="Accessing a Variable's Value" subtitle='In this code snippet, we declare (aka create) three variables (firstNum, secondNum, and result). We assign each of these a value using the assignment operator (=). When we need to access their values, we use their names.'>
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

                    <CodeSnippet
                        enableRun
                        lines={[
                            { code: `let firstNum = ${firstNum};`, comment: `declare the first variable - its name is firstNum, and its value is ${firstNum}` },
                            { code: "" },
                            { code: `let secondNum = ${secondNum};`, comment: `declare the second variable - its name is secondNum, and its value is ${secondNum}` },
                            { code: "" },
                            { code: `let result = firstNum - secondNum;`, comment: `the variable's name is result and its value is ${firstNum - secondNum} - notice that we're accessing the value of the other variables by using their names` },
                            { code: "" },
                            { code: `console.log(result);`, comment: `here, we access the value of result by using its name` }
                        ]}
                    />
                </Section>

                <Section title="Declaring a Variable" subtitle='Every single time we create a variable in JavaScript, we follow these steps:'>
                    <OrderedList
                        items={[
                            'We use the keyword let. This tells JavaScript that we are making a variable.',
                            'We give the variable a name.',
                            '(Optional) We can give it a value using the assignment operator (=). However, we can also declare a variable without assigning it a value.',
                        ]}
                    />
                    <CodeSnippet
                        enableRun
                        lines={[
                            { code: `let variableName = "value";`, comment: `declare a variable using 'let', give it a name, and assign it a value` },
                            { code: "" },
                            { code: `let uninitializedVariable;`, comment: `declare a variable without assigning a value (it will be 'undefined')` },
                            { code: "" },
                            { code: `console.log("value of variableName: ", variableName);`, comment: `output the value of the variable that we assigned a value` },
                            { code: "" },
                            { code: `console.log("value of uninitializedVariable: ", uninitializedVariable);`, comment: `output the value of the variable that didn't assign a value (we call these variables "unitialized")` },

                        ]}
                    />
                </Section>
                <Section title="Naming Variables" subtitle="There are a few rules we need to follow when naming variables:">
                    <OrderedList
                        items={[
                            'Variable names can only contain letters, numbers, underscores (_), and dollar signs ($).',
                            'Variable names cannot start with a number.',
                            'Variable names cannot be the same as JavaScript keywords (like let, const, var, etc.).',
                        ]}
                    />
                    <Section title="Examples of Valid and Invalid Variable Names" subtitle="Here are some examples of valid and invalid variable names. Keep in mind that we typically want our variable names to be descriptive.">
                        <CodeSnippet
                            lines={[
                                { code: `let 1stVariable = 5;`, comment: `invalid variable name - cannot start with a number` },
                                { code: `let let = 5;`, comment: `invalid variable name - 'let' is a reserved keyword` },
                                { code: `let my-variable = 5;`, comment: `invalid variable name - cannot contain hyphens` },
                                { code: `let my variable = 5;`, comment: `invalid variable name - cannot contain spaces` },
                                { code: `let myVariable = 5;`, comment: `valid variable name` },
                                { code: `let my_variable = 5;`, comment: `valid variable name - contains an underscore` },
                                { code: `let $myVariable = 5;`, comment: `valid variable name - starts with a dollar sign` },
                                { code: `let _myVariable = 5;`, comment: `valid variable name - starts with an underscore` },
                                { code: `let myVariable$ = 5;`, comment: `valid variable name - ends with a dollar sign` },
                            ]}
                        />
                    </Section>

                    <Section title="Try It Yourself!" subtitle="This textbox will provide instant feedback on any variable name you type.">
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
            </TableOfContents>

        </ConceptWrapper>
    );
}