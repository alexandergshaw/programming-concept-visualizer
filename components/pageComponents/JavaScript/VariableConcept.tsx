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

export default function VariableConcept(props: VariableConceptProps) {
  const [memory, setMemory] = useState<{ name: string; value: any }[]>([]);
  const [variableName, setVariableName] = useState('');
  const [variableValue, setVariableValue] = useState('');

  const generateCodeForMemory = (memory: { name: string; value: any }[]) => {
    if (memory.length === 0) {
      return '// No variables are currently stored in memory.';
    }

    return memory
      .map(
        (entry) => `
        // Declare a variable named "${entry.name}"
        // The "let" keyword is used to create a variable that can be reassigned later
        let ${entry.name} = ${JSON.stringify(entry.value)};
        
        // The value assigned to "${entry.name}" is: ${JSON.stringify(entry.value)}
      `
      )
      .join('\n');
  };

  const addVariable = () => {
    if (!variableName) return;

    const newVariable = { name: variableName, value: variableValue };
    const updatedMemory = [...memory, newVariable];
    setMemory(updatedMemory);

    // Generate JavaScript code for all variables in memory
    const code = generateCodeForMemory(updatedMemory);
    props.onCodeChange(code); // Pass the code to the parent

    setVariableName('');
    setVariableValue('');
  };

  const clearMemory = () => {
    setMemory([]);
    // Provide a comment explaining the memory clearing action
    props.onCodeChange(`
      // All variables have been cleared from memory.
      // The memory is now empty, and no variables are stored.
    `);
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
        {memory.map((entry, index) => (
          <div key={index} className="memory-box">
            <div className="memory-header">{entry.name}</div>
            <div className="memory-body">{entry.value}</div>
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
        Add Variable
      </Button>
    </ConceptWrapper>
  );
}