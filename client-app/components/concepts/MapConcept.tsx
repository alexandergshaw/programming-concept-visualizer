'use client';

import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';
import '../../styles/map.css';

const OPERATIONS = ['set', 'get', 'has', 'delete', 'clear'];

export default function MapConcept() {
  const [map, setMap] = useState<Map<string, string>>(new Map([
    ['name', 'Alex'],
    ['role', 'developer'],
  ]));

  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [selectedOp, setSelectedOp] = useState('set');
  const [output, setOutput] = useState<string | null>(null);

  const handleSet = () => {
    if (keyInput.trim()) {
      const newMap = new Map(map);
      newMap.set(keyInput, valueInput);
      setMap(newMap);
      setOutput(`set("${keyInput}", "${valueInput}")`);
    }
  };

  const handleGet = () => {
    const result = map.get(keyInput);
    setOutput(`get("${keyInput}") → ${result !== undefined ? `"${result}"` : 'undefined'}`);
  };

  const handleDelete = () => {
    const newMap = new Map(map);
    const result = newMap.delete(keyInput);
    setMap(newMap);
    setOutput(`delete("${keyInput}") → ${result}`);
  };

  const handleHas = () => {
    const result = map.has(keyInput);
    setOutput(`has("${keyInput}") → ${result}`);
  };

  const handleClear = () => {
    setMap(new Map());
    setOutput('Map cleared');
  };

  const getDescription = (op: string): string => {
    switch (op) {
      case 'set':
        return 'Adds or updates a key-value pair in the Map.';
      case 'get':
        return 'Retrieves the value for a given key.';
      case 'has':
        return 'Checks if a key exists in the Map.';
      case 'delete':
        return 'Removes a key and its value from the Map.';
      case 'clear':
        return 'Removes all key-value pairs from the Map.';
      default:
        return '';
    }
  };
  

  const runOperation = () => {
    switch (selectedOp) {
      case 'set':
        handleSet();
        break;
      case 'get':
        handleGet();
        break;
      case 'has':
        handleHas();
        break;
      case 'delete':
        handleDelete();
        break;
      case 'clear':
        handleClear();
        break;
    }
  };

  return (
    <div className="map-container">
      <h2 className="map-title">JavaScript Map</h2>
      <p className="map-description">
        A <code>Map</code> stores key-value pairs and maintains insertion order.
      </p>
      <p className="map-description-secondary">{getDescription(selectedOp)}</p>

      <div className="map-controls">
        <Autocomplete
          options={OPERATIONS}
          value={selectedOp}
          onChange={(e, value) => setSelectedOp(value ?? 'set')}
          renderInput={(params) => <TextField {...params} label="Choose operation" size="small" />}
          sx={{ minWidth: 200 }}
        />


        {(selectedOp !== 'clear') && (
          <TextField
            label="Key"
            size="small"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
          />
        )}

        {selectedOp === 'set' && (
          <TextField
            label="Value"
            size="small"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
          />
        )}

        <Tooltip title={`Execute the ${selectedOp} operation`}>
          <Button variant="contained" onClick={runOperation}>
            Run
          </Button>
        </Tooltip>
      </div>

      <div className="map-box">
        {[...map.entries()].map(([key, value], idx) => (
          <div key={idx} className="map-cell">
            <span className="map-key">{key}</span>
            <span className="map-value">{value}</span>
          </div>
        ))}
      </div>

      {output && <p className="map-output">{output}</p>}
    </div>
  );
}
