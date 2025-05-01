'use client';

import { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import '../../../styles/variable.css';
import Section from '@/components/common/Section';
import CodeSnippet from '@/components/common/CodeSnippet';
import OrderedList from '@/components/common/OrderedList';

interface VariableConceptProps {
    onCodeChange: (code: string) => void;
}

export default function VariableConcept(props: VariableConceptProps) {
    const [variables, setVariables] = useState<{ name: string; value: any; initialValue: any }[]>([]);
    const [variableName, setVariableName] = useState('');
    const [variableValue, setVariableValue] = useState('');
    const [firstNum, setFirstNum] = useState(5); // Default value for firstNum
    const [secondNum, setSecondNum] = useState(5); // Default value for secondNum

    const generateCodeForMemory = (memory: { name: string; value: any; initialValue: any }[]) => {
        if (memory.length === 0) {
            return '// No variables are currently stored in memory.';
        }

        return memory
            .map((entry) => {
                const initialization = `
        // Declare a variable named "${entry.name}"
        let ${entry.name} = ${JSON.stringify(entry.initialValue)};
        `;
                const reassignment =
                    entry.value !== entry.initialValue
                        ? `
        // Reassign the value of the variable "${entry.name}"
        ${entry.name} = ${JSON.stringify(entry.value)};
        `
                        : '';
                return initialization + reassignment;
            })
            .join('\n');
    };

    const addVariable = () => {
        if (!variableName) return;

        const newVariable = { name: variableName, value: variableValue, initialValue: variableValue };
        const updatedMemory = [...variables, newVariable];
        setVariables(updatedMemory);

        const code = generateCodeForMemory(updatedMemory);
        props.onCodeChange(code);

        setVariableName('');
        setVariableValue('');
    };

    const reassignVariable = (name: string, newValue: any) => {
        const updatedMemory = variables.map((entry) =>
            entry.name === name ? { ...entry, value: newValue } : entry
        );
        setVariables(updatedMemory);

        // Append the reassignment code to the existing block
        const code = `
    // Reassign the value of the variable "${name}"
    ${name} = ${JSON.stringify(newValue)};
    `;
        const updatedCode = `${props.onCodeChange.toString()}\n${code}`;
        props.onCodeChange(updatedCode);
    };

    return (
        <ConceptWrapper
            title="Variables in JavaScript"
            description="We can think of a variable as a box that we can put a value in."
        >
            <Section title="Declaring Variables" subtitle="When we declare a variable, we are creating a box that we can put things in. The name of the variable is the label on the box, and the value is what is inside the box." />
            <Section title="Example" subtitle='In this code snippet, we declare three variables (firstNum, secondNum, and result). Each of these holds a value.'>
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
                    lines={[
                        { code: `let firstNum = ${firstNum};`, comment: `declare the first variable - its name is firstNum, and its value is ${firstNum}` },
                        { code: `let secondNum = ${secondNum};`, comment: `declare the second variable - its name is secondNum, and its value is ${secondNum}` },
                        { code: `let result = firstNum - secondNum;`, comment: `declare the variable that will hold the difference - its name is result and its value is ${firstNum - secondNum}` },
                        { code: `console.log(result);`, comment: `the variable result holds the value ${firstNum - secondNum}` }
                    ]}
                />
            </Section>

            <Section title="How do we declare a variable?" subtitle='Every single time we declare a variable in JavaScript, we follow these steps:'>
                <OrderedList
                    items={[
                        'We use the keyword let.',
                        'We give the variable a name.',
                        'We can give it a value using the assignment operator (=). This step is optional. We can also declare a variable without assigning it a value.',
                    ]}
                />
                <CodeSnippet
                    lines={[
                        { code: `let variableName = "value";`, comment: `declare a variable using 'let', give it a name, and assign it a value` },
                        { code: `let uninitializedVariable;`, comment: `declare a variable without assigning a value (it will be 'undefined')` },
                    ].concat(variables.map((variable) => ({
                        code: `let ${variable.name} = ${JSON.stringify(variable.value)};`,
                        comment: `declare a variable named '${variable.name}' with the value ${JSON.stringify(variable.value)}`,
                    })))}
                />
                <Section title="Interactive Variable Declaration" subtitle="Enter the name and value of a variable to see how it is declared in code:">
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <TextField
                            label="Variable Name"
                            size="small"
                            value={variableName}
                            onChange={(e) => setVariableName(e.target.value)}
                            sx={{ mr: 2 }}
                        />
                        <TextField
                            label="Variable Value"
                            size="small"
                            value={variableValue}
                            onChange={(e) => setVariableValue(e.target.value)}
                            sx={{ mr: 2 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addVariable}
                            disabled={!variableName}
                        >
                            Add Variable
                        </Button>
                    </div>

                </Section>
            </Section>
            <Section title="How do we reassign a variable?" subtitle='We can change the value of a variable at any time. To do this, we follow these steps:'>
                <OrderedList
                    items={[
                        'We use the name of the variable.',
                        'We use the assignment operator (=).',
                        'We give it a new value.',
                    ]}
                />
                <CodeSnippet
                    lines={[
                        { code: `let variableName = "value";`, comment: `declare a variable using 'let', give it a name, and assign it a value` },
                        { code: `variableName = "newValue";`, comment: `reassign the variable to hold a new value` },
                    ]}
                />
            </Section>
        </ConceptWrapper>
    );
}