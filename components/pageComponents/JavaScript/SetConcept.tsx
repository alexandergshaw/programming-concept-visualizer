'use client';

import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Autocomplete from '@mui/material/Autocomplete';
import '../../../styles/set.css';
import ConceptWrapper from '../../common/ConceptWrapper';
import Typography from '@mui/material/Typography';

const OPERATIONS = ['add', 'delete', 'has', 'clear'];

export default function SetConcept({
  onCodeChange,
}: {
  onCodeChange?: (code: string) => void;
}) {
  const [rawInput, setRawInput] = useState('1, 2, 3');
  const [setValues, setSetValues] = useState<Set<number>>(new Set([1, 2, 3]));
  const [input, setInput] = useState('');
  const [operation, setOperation] = useState('add');
  const [output, setOutput] = useState<string | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);

  useEffect(() => {
    const parsed = rawInput
      .split(',')
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n));

    const seen = new Set<number>();
    const duplicates = parsed.filter((n) => {
      if (seen.has(n)) return true;
      seen.add(n);
      return false;
    });

    if (duplicates.length > 0) {
      setDuplicateWarning(
        `Warning: Duplicate value${duplicates.length > 1 ? 's' : ''} detected: ${[...new Set(duplicates)].join(', ')}`
      );
    } else {
      setDuplicateWarning(null);
    }

    const newSet = new Set(parsed);
    setSetValues(newSet);
    onCodeChange?.(`let set = new Set([${[...newSet].join(', ')}]);`);
  }, [rawInput, onCodeChange]);

  const updateCodePreview = (actionCode: string) => {
    const values = [...setValues];
    const setLiteral = `new Set([${values.join(', ')}])`;
    onCodeChange?.(`let set = ${setLiteral};\n${actionCode}`);
  };

  const runOperation = () => {
    const val = parseInt(input);
    if (isNaN(val) && operation !== 'clear') return;

    switch (operation) {
      case 'add':
        const hasValue = setValues.has(val)
        const addSet = new Set(setValues);
        addSet.add(val);
        setSetValues(addSet);
        updateCodePreview(`\nset.add(${val}); // adds ${val} to the set, if ${val} isn't already in the set\n\n// ${hasValue ? `${val} was already in the set` : `${val} was not already in the set`}\n\n// updated set: ${hasValue ? "same as before" : displaySet(addSet)}`);
        break;

      case 'delete':
        const delSet = new Set(setValues);
        const deleted = delSet.delete(val);
        setSetValues(delSet);
        updateCodePreview(`\nset.delete(${val}); // removes ${val} from the set, if ${val} exists in the set\n\n// ${deleted ? `${val} was removed from the set` : `${val} was not found in the set`}\n\n// updated set: ${deleted ? displaySet(delSet) : "same as before"}`);
        break;

      case 'has':
        const exists = setValues.has(val);
        updateCodePreview(`\nset.has(${val}); // checks if ${val} exists in the set\n\n// set.has(${val}) returns ${exists} because ${val} ${exists ? "exists in the set" : "doesn't exist in the set"}\n\n// set is unchanged`);
        break;

      case 'clear':
        setSetValues(new Set());
        updateCodePreview(`\nset.clear(); // removes all values from the set\n\n// updated set: ${displaySet(new Set())}`);
        break;
    }
  };

  const displaySet = (set: Set<number>): string => {
    return `{ ${[...set].join(', ')} }`;
  };

  const handleReset = () => {
    const base = new Set([1, 2, 3]);
    setRawInput('1, 2, 3');
    setSetValues(base);
    setInput('');
    setOutput(null);
    setOperation('add');
    setDuplicateWarning(null);
    updateCodePreview(`let set = new Set([1, 2, 3]);`);
  };

  const getDescription = (op: string): string => {
    switch (op) {
      case 'add': return 'Adds a value to the set (if it is not already present).';
      case 'delete': return 'Removes a specific value from the set.';
      case 'has': return 'Checks whether a value exists in the set.';
      case 'clear': return 'Removes all values from the set.';
      default: return '';
    }
  };

  return (
    <ConceptWrapper title="Set" description="A data structure that stores unique values. You can add, remove, or check for existence.">
      <TextField
        label="Define your set (comma-separated)"
        variant="outlined"
        size="small"
        fullWidth
        value={rawInput}
        onChange={(e) => setRawInput(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      {duplicateWarning && (
        <p style={{ color: '#d32f2f', fontSize: '0.875rem', marginTop: 0, marginBottom: '1rem' }}>
          {duplicateWarning}
        </p>
      )}

      <div className="set-controls">
        <Autocomplete
          options={OPERATIONS}
          value={operation}
          onChange={(e, newVal) => {
            setOperation(newVal ?? 'add');
            setOutput(null);
          }}
          renderInput={(params) => <TextField {...params} label="Choose operation" size="small" />}
          sx={{ minWidth: 200 }}
        />

        {operation !== 'clear' && (
          <TextField
            label="Value"
            type="number"
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        )}

        <Typography variant="body2" sx={{ mt: 2, mb: 1, color: '#444' }}>
          <strong>Operation Description:</strong> {getDescription(operation)}
        </Typography>

        <Tooltip title={`Execute the ${operation} operation`}>
          <Button variant="contained" onClick={runOperation}>
            Run
          </Button>
        </Tooltip>

        <Button variant="text" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <div className="set-box">
        {[...setValues].map((val, idx) => (
          <div className="set-cell" key={idx}>
            {val}
          </div>
        ))}
      </div>

      {output && <p className="set-output">{output}</p>}
    </ConceptWrapper>
  );
}
