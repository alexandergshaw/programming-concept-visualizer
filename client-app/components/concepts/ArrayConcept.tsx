'use client';

import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../../styles/array.css';

const OPERATIONS = [
  'push',
  'pop',
  'unshift',
  'splice',
  'slice',
  'indexOf',
  'lastIndexOf',
  'includes',
];

export default function ArrayConcept() {
  const [arr, setArr] = useState<number[]>([1, 2, 3]);
  const [operation, setOperation] = useState<string | null>('push');
  const [inputValue, setInputValue] = useState('');
  const [indexValue, setIndexValue] = useState('');
  const [output, setOutput] = useState<string | null>(null);

  const resetOutput = () => setOutput(null);

  const runOperation = () => {
    resetOutput();
    const numInput = parseInt(inputValue);
    const numIndex = parseInt(indexValue);

    switch (operation) {
      case 'push':
        if (!isNaN(numInput)) setArr([...arr, numInput]);
        break;
      case 'pop':
        setArr(arr.slice(0, -1));
        break;
      case 'unshift':
        if (!isNaN(numInput)) setArr([numInput, ...arr]);
        break;
      case 'splice':
        if (!isNaN(numIndex) && !isNaN(numInput)) {
          const copy = [...arr];
          copy.splice(numIndex, 0, numInput);
          setArr(copy);
        }
        break;
      case 'slice':
        if (!isNaN(numIndex)) {
          const sliced = arr.slice(0, numIndex);
          setOutput(`Sliced: [${sliced.join(', ')}]`);
        }
        break;
      case 'indexOf':
        if (!isNaN(numInput)) {
          const idx = arr.indexOf(numInput);
          setOutput(`indexOf(${numInput}) → ${idx}`);
        }
        break;
      case 'lastIndexOf':
        if (!isNaN(numInput)) {
          const idx = arr.lastIndexOf(numInput);
          setOutput(`lastIndexOf(${numInput}) → ${idx}`);
        }
        break;
      case 'includes':
        if (!isNaN(numInput)) {
          const exists = arr.includes(numInput);
          setOutput(`includes(${numInput}) → ${exists}`);
        }
        break;
    }
  };

  const getDescription = (op: string | null): string => {
    switch (op) {
      case 'push': return 'Adds a value to the end of the array.';
      case 'pop': return 'Removes the last item from the array.';
      case 'unshift': return 'Adds a value to the beginning of the array.';
      case 'splice': return 'Inserts a value at a specific index.';
      case 'slice': return 'Copies part of the array (non-destructive).';
      case 'indexOf': return 'Finds the first index of a value.';
      case 'lastIndexOf': return 'Finds the last index of a value.';
      case 'includes': return 'Checks if a value exists in the array.';
      default: return '';
    }
  };

  return (
    <div className="array-container">
      <h2 className="array-title">JavaScript Arrays</h2>
      <p className="array-description">
        Select an array operation and see how it affects the structure.
      </p>
      <p className="array-description-secondary">{getDescription(operation)}</p>

      <div className="array-controls">
        <Autocomplete
          value={operation}
          onChange={(e, newVal) => {
            setOperation(newVal);
            resetOutput();
          }}
          options={OPERATIONS}
          renderInput={(params) => (
            <TextField {...params} label="Choose operation" size="small" />
          )}
          sx={{ minWidth: 200 }}
        />

        {(operation === 'push' ||
          operation === 'unshift' ||
          operation === 'indexOf' ||
          operation === 'lastIndexOf' ||
          operation === 'includes' ||
          operation === 'splice') && (
          <TextField
            label="Value"
            type="number"
            size="small"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        )}

        {(operation === 'splice' || operation === 'slice') && (
          <TextField
            label="Index"
            type="number"
            size="small"
            value={indexValue}
            onChange={(e) => setIndexValue(e.target.value)}
          />
        )}

        <Button variant="contained" onClick={runOperation}>
          Run
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setArr([1, 2, 3]);
            setOutput(null);
            setInputValue('');
            setIndexValue('');
          }}
        >
          Reset Array
        </Button>
      </div>

      <div className="array-box">
        {arr.map((val, idx) => (
          <div className="array-cell" key={idx}>
            <span className="array-index">Index {idx}</span>
            <span className="array-value">{val}</span>
          </div>
        ))}
      </div>

      {output && <p className="array-output">{output}</p>}
    </div>
  );
}
