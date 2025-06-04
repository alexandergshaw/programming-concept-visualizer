'use client';

import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';
import '../../../styles/map.css';
import ConceptWrapper from '../../common/ConceptWrapper';
import Typography from '@mui/material/Typography';

const OPERATIONS = ['set', 'get', 'has', 'delete', 'clear'];

export default function MapConcept({
  onCodeChange,
}: {
  onCodeChange?: (code: string) => void;
}) {
  const [rawInput, setRawInput] = useState('name:Alex, role:instructor');
  const [map, setMap] = useState<Map<string, string>>(new Map());
  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [selectedOp, setSelectedOp] = useState('set');
  const [output, setOutput] = useState<string | null>(null);

  useEffect(() => {
    const entries = rawInput
      .split(',')
      .map((pair) => pair.trim().split(':').map((s) => s.trim()))
      .filter(([k, v]) => k && v);
    const newMap = new Map(entries as [string, string][]);
    setMap(newMap);
    onCodeChange?.(`let map = new Map([${[...newMap.entries()]
      .map(([k, v]) => `["${k}", "${v}"]`)
      .join(', ')}]);`);
  }, [rawInput, onCodeChange]);

  const updateCodePreview = (actionCode: string) => {
    const entries = [...map.entries()]
      .map(([k, v]) => `["${k}", "${v}"]`)
      .join(', ');
    onCodeChange?.(`let map = new Map([${entries}]); // create the map\n${actionCode}`);
  };

  const handleSet = () => {
    if (keyInput.trim()) {
      const newMap = new Map(map);
      newMap.set(keyInput, valueInput);
      setMap(newMap);
      updateCodePreview(`\nmap.set("${keyInput}", "${valueInput}");\n\n// updated map: ${displayMap(newMap)} `);
    }
  };

  const displayMap = (map: Map<string, string>): string => {
    return `{${[...map.entries()]
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ')}}`;
  }

  const handleGet = () => {
    const result = map.get(keyInput);
    const present: boolean = result !== undefined
    updateCodePreview(`\nmap.get(${keyInput});\n\n// map is unchanged \n\n// map.get(${keyInput}) returns ${present ? `${result}` : 'undefined'} because the key ${keyInput} is ${present ? `associated with the value ${result}` : "not present in the map"}`);
  };

  const handleDelete = () => {
    const newMap = new Map(map);
    const value = newMap.get(keyInput)
    const keyWasDeleted = newMap.delete(keyInput);
    setMap(newMap);
    updateCodePreview(`\nmap.delete("${keyInput}"); // try to delete the key "${keyInput}" and its value, if the key exists in the map \n\n// ${keyWasDeleted ? `the key "${keyInput}" and the value "${value}" were removed from the map` : `the key "${keyInput}" doesn't exist in the map\n\n// map.delete(${keyInput}) returns ${keyWasDeleted ? "true" : "false"}`}`);
  };

  const handleHas = () => {
    const result = map.has(keyInput);
    updateCodePreview(`\nmap.has("${keyInput}"); // check if the map contains the key "${keyInput}"\n\n// map.has("${keyInput}") returns ${result} because the key "${keyInput}" ${result ? "exists in the map" : "doesn't exist in the map"}\n\n// map is unchanged`);
  };

  const handleClear = () => {
    const map = new Map<string, string>()
    map.clear()
    setMap(new Map());
    updateCodePreview(`\nmap.clear(); // remove all key-value pairs\n\n// map looks like this now: ${displayMap(new Map())}`);
  };

  const handleReset = () => {
    const defaultRaw = 'name:Alex, role:developer';
    setRawInput(defaultRaw);
    setKeyInput('');
    setValueInput('');
    setSelectedOp('set');
    setOutput(null);
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

  const getDescription = (op: string): string => {
    switch (op) {
      case 'set': return 'Adds or updates a key-value pair in the map.';
      case 'get': return 'Retrieves the value associated with a key.';
      case 'has': return 'Checks if a key exists in the map.';
      case 'delete': return 'Removes a key and its value.';
      case 'clear': return 'Removes all key-value pairs.';
      default: return '';
    }
  };

  return (
    <ConceptWrapper title='Map' description="A data structure that stores key-value pairs. Keys can be any type.">
      <TextField
        label="Define your map (key:value, comma-separated)"
        variant="outlined"
        size="small"
        fullWidth
        value={rawInput}
        onChange={(e) => setRawInput(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <div className="map-controls">
        <Autocomplete
          options={OPERATIONS}
          value={selectedOp}
          onChange={(e, value) => setSelectedOp(value ?? 'set')}
          renderInput={(params) => <TextField {...params} label="Choose operation" size="small" />}
          sx={{ minWidth: 200 }}
        />

        {selectedOp !== 'clear' && (
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

        <Typography variant="body2" sx={{ mt: 2, mb: 1, color: '#444' }}>
          <strong>Operation Description:</strong> {getDescription(selectedOp)}
        </Typography>


      </div>

      <div className='run-buttons'>
        <Tooltip title={`Execute the ${selectedOp} operation`}>
          <Button variant="contained" onClick={runOperation}>
            Run
          </Button>
        </Tooltip>

        <Button variant="text" onClick={handleReset}>
          Reset
        </Button>
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
    </ConceptWrapper>
  );
}
