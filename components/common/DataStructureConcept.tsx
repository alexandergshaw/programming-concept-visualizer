'use client';

import { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Autocomplete,
  Tooltip,
  Typography,
  Box,
} from '@mui/material';
import ConceptWrapper from './ConceptWrapper';

export interface Operation {
  label: string;
  description: string;
  inputs: ('key' | 'value' | 'index')[];
  execute: (params: {
    data: string[];
    key?: string;
    value?: string;
    index?: string;
  }) => { updated: (string | number)[]; output?: string; code: string };
}

export interface DataStructureConceptProps {
  title: string;
  description: string;
  initialRaw: string;
  operations: Operation[];
  parse: (raw: string) => any;
  renderEntries: (data: (string | number)[]) => React.ReactNode;
  formatCodeInit: (data: (string | number)[]) => string;
  onCodeChange?: (code: string) => void;
}

export default function DataStructureConcept({
  title,
  description,
  initialRaw,
  operations,
  parse,
  renderEntries,
  formatCodeInit,
  onCodeChange,
}: DataStructureConceptProps) {
  const [rawInput, setRawInput] = useState(initialRaw);
  const [structure, setStructure] = useState<any>(parse(initialRaw));
  const [selectedOp, setSelectedOp] = useState(operations[0]);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [index, setIndex] = useState('');
  const [output, setOutput] = useState<string | null>(null);

  useEffect(() => {
    const parsed = parse(rawInput);
    setStructure(parsed);
    onCodeChange?.(formatCodeInit(parsed));
  }, [rawInput, parse, onCodeChange, formatCodeInit]);

  const runOperation = () => {
    const { updated, output: opOut, code } = selectedOp.execute({
      data: structure,
      key,
      value,
      index,
    });
    setStructure(updated);
    setOutput(opOut ?? null);
    onCodeChange?.(`${formatCodeInit(updated)}\n${code}`);
  };

  return (
    <ConceptWrapper title={title} description={description}>
      <TextField
        label={`Define your ${title.toLowerCase()}`}
        fullWidth
        size="small"
        value={rawInput}
        onChange={(e) => setRawInput(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <Autocomplete
          options={operations}
          getOptionLabel={(op) => op.label}
          value={selectedOp}
          onChange={(e, newOp) => {
            setSelectedOp(newOp ?? operations[0]);
            setOutput(null);
          }}
          renderInput={(params) => <TextField {...params} label="Choose operation" size="small" />}
          sx={{ minWidth: 200 }}
        />

        {selectedOp.inputs.includes('key') && (
          <TextField
            label="Key"
            size="small"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        )}
        {selectedOp.inputs.includes('value') && (
          <TextField
            label="Value"
            size="small"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}
        {selectedOp.inputs.includes('index') && (
          <TextField
            label="Index"
            size="small"
            value={index}
            onChange={(e) => setIndex(e.target.value)}
          />
        )}
      </Box>

      <Typography variant="body2" sx={{ mt: 2, mb: 1, color: '#444' }}>
        <strong>Operation Description:</strong> {selectedOp.description}
      </Typography>

      <Tooltip title={`Execute the ${selectedOp.label} operation`}>
        <Button variant="contained" onClick={runOperation} sx={{ mr: 2 }}>
          Run
        </Button>
      </Tooltip>

      <Box className={`${title.toLowerCase()}-box`} sx={{ mt: 2 }}>
        {renderEntries(structure)}
      </Box>

      {output && <Typography variant="body2" sx={{ mt: 2 }}>{output}</Typography>}
    </ConceptWrapper>
  );
}
