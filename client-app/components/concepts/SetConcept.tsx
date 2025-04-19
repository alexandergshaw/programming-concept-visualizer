'use client';

import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import '../../styles/set.css';

export default function SetConcept({
  onCodeChange,
}: {
  onCodeChange?: (code: string) => void;
}) {
  const [rawInput, setRawInput] = useState('1, 2, 3');
  const [setValues, setSetValues] = useState<Set<number>>(new Set([1, 2, 3]));
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string | null>(null);

  useEffect(() => {
    const parsed = rawInput
      .split(',')
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n));
    const newSet = new Set(parsed);
    setSetValues(newSet);
    onCodeChange?.(`let set = new Set([${[...newSet].join(', ')}]);`);
  }, [rawInput]);

  const updateCodePreview = (actionCode: string) => {
    const values = [...setValues];
    const setLiteral = `new Set([${values.join(', ')}])`;
    onCodeChange?.(`let set = ${setLiteral};\n${actionCode}`);
  };

  const handleAdd = () => {
    const val = parseInt(input);
    if (!isNaN(val)) {
      if (setValues.has(val)) {
        setOutput(`The value ${val} already exists in the Set and was not added.`);
        return;
      }
      const newSet = new Set(setValues);
      newSet.add(val);
      setSetValues(newSet);
      setOutput(null);
      updateCodePreview(`set.add(${val});`);
    }
  };

  const handleDelete = () => {
    const val = parseInt(input);
    if (!isNaN(val)) {
      const newSet = new Set(setValues);
      const result = newSet.delete(val);
      setSetValues(newSet);
      setOutput(`delete(${val}) → ${result}`);
      updateCodePreview(`set.delete(${val});`);
    }
  };

  const handleHas = () => {
    const val = parseInt(input);
    if (!isNaN(val)) {
      const result = setValues.has(val);
      setOutput(`has(${val}) → ${result}`);
      updateCodePreview(`set.has(${val});`);
    }
  };

  const handleClear = () => {
    setSetValues(new Set());
    setOutput('Set cleared');
    updateCodePreview(`set.clear();`);
  };

  const handleReset = () => {
    const base = new Set([1, 2, 3]);
    setRawInput('1, 2, 3');
    setSetValues(base);
    setInput('');
    setOutput(null);
    updateCodePreview(`let set = new Set([1, 2, 3]);`);
  };

  return (
    <div className="set-container">
      <h2 className="set-title">JavaScript Set</h2>
      <p className="set-description">
        A <code>Set</code> stores unique values. You can add, remove, or check for existence.
      </p>

      <TextField
        label="Define your set (comma-separated)"
        variant="outlined"
        size="small"
        fullWidth
        value={rawInput}
        onChange={(e) => setRawInput(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <div className="set-controls">
        <TextField
          label="Value"
          type="number"
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <Tooltip title="Add a value to the Set (duplicates not allowed)">
          <Button variant="contained" onClick={handleAdd}>Add</Button>
        </Tooltip>

        <Tooltip title="Remove a value from the Set">
          <Button variant="outlined" onClick={handleDelete}>Delete</Button>
        </Tooltip>

        <Tooltip title="Check if a value exists in the Set">
          <Button variant="outlined" onClick={handleHas}>Has</Button>
        </Tooltip>

        <Tooltip title="Remove all values from the Set">
          <Button variant="outlined" color="error" onClick={handleClear}>Clear</Button>
        </Tooltip>

        <Button variant="text" onClick={handleReset}>Reset</Button>
      </div>

      <div className="set-box">
        {[...setValues].map((val, idx) => (
          <div className="set-cell" key={idx}>
            {val}
          </div>
        ))}
      </div>

      {output && <p className="set-output">{output}</p>}
    </div>
  );
}
