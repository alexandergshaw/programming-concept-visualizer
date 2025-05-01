'use client';

import { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import '../../../styles/variable.css';

interface VariableConceptProps {
    onCodeChange: (code: string) => void;
}

interface VariableConceptState {
    name: string;
    value: any;
    initialValue: any;
}

export default function VariableConcept(props: VariableConceptProps) {
    const [variables, setVariables] = useState<VariableConceptState[]>([]);
    const [variableName, setVariableName] = useState('');
    const [variableValue, setVariableValue] = useState('');

    const generateCodeForMemory = (memory: VariableConceptState[]) => {
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
        const updatedCode = `${generateCodeForMemory(variables)}\n${code}`;
        props.onCodeChange(updatedCode);
    };

    const clearMemory = () => {
        setVariables([]);
        props.onCodeChange('// All variables have been cleared from memory.');
    };

    return (
        <ConceptWrapper
            title="Variables in JavaScript"
            description="Learn how variables work as containers for values."
        >
            {/* Memory Visualization */}
            <Typography variant="h6" sx={{ mb: 2 }}>
                Memory Visualization
            </Typography>
            <div className="memory-grid">
                {variables.map((entry, index) => (
                    <div key={index} className="memory-box">
                        <div className="memory-body"><b>Variable Name:</b> {entry.name}</div>
                        <div className="memory-body"><b>Variable Value:</b> {entry.value}</div>
                        <div className="memory-body"><b>Variable Type:</b> {typeof entry.value}</div>
                    </div>
                ))}
            </div>
            <Button variant="outlined" onClick={clearMemory} sx={{ mt: 2 }}>
                Clear Memory
            </Button>

            {/* Add Variable */}
            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                Add a Variable
            </Typography>
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
            <Button variant="contained" onClick={addVariable} sx={{ ml: 2 }}>
                Add
            </Button>

            {/* Reassign Variable */}
            {variables.length > 0 &&
                (<>
                    <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                        Reassign a Variable
                    </Typography>
                    <TextField
                        label="Select Variable"
                        size="small"
                        select
                        value={variableName}
                        onChange={(e) => setVariableName(e.target.value)}
                        sx={{ mr: 2 }}
                        SelectProps={{
                            native: true,
                        }}
                    >
                        <option value="">-- Select a Variable --</option>
                        {variables.map((entry) => (
                            <option key={entry.name} value={entry.name}>
                                {entry.name}
                            </option>
                        ))}
                    </TextField>
                    <TextField
                        label="New Value"
                        size="small"
                        value={variableValue}
                        onChange={(e) => setVariableValue(e.target.value)}
                        sx={{ mr: 2 }}
                    />
                    <Button
                        variant="contained"
                        onClick={() => reassignVariable(variableName, variableValue)}
                        sx={{ ml: 2 }}
                    >
                        Reassign Variable
                    </Button>
                </>)}
        </ConceptWrapper>
    );
}