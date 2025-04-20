'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Card,
  CardContent,
} from '@mui/material';

export default function ObjectConcept() {
  const [message, setMessage] = useState('');
  const [playgroundObject, setPlaygroundObject] = useState<Record<string, any>>({});
  const [destructuredOutput, setDestructuredOutput] = useState<string>('');

  useEffect(() => {
    if (!playgroundObject || Object.keys(playgroundObject).length === 0) {
      setDestructuredOutput('No object defined.');
      return;
    }

    const keys = Object.keys(playgroundObject);

    const objLines = [
      `// Declare an object with the following properties`,
      `const obj = {`,
      ...keys.map(k => {
        const val = typeof playgroundObject[k] === 'function' ? '[Function]' : JSON.stringify(playgroundObject[k]);
        return `  ${k}: ${val}, // ${typeof playgroundObject[k]}`;
      }),
      `};`,
      ``,
      `// Destructure values from the object`,
      `const { ${keys.join(', ')} } = obj;`,
      ``,
      `// Log each destructured variable`,
      ...keys.map(k => {
        const val = typeof playgroundObject[k] === 'function' ? '[Function]' : JSON.stringify(playgroundObject[k]);
        return `console.log(${k}); // ${val}`;
      }),
    ];

    setDestructuredOutput(objLines.join('\n'));
  }, [playgroundObject]);


  class Animal {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
    speak() {
      return `${this.name} makes a noise.`;
    }
  }

  class Dog extends Animal {
    speak() {
      return `${this.name} barks.`;
    }
  }

  const moveBehavior = {
    move: () => 'Moving forward...',
  };

  const dogWithBehavior = {
    name: 'ComposedDog',
    ...moveBehavior,
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', p: 4 }}>
      <Typography variant="h4" gutterBottom>
        JavaScript Object Concepts
      </Typography>

      {/* Section: What is an Object? */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">What is an Object?</Typography>
        <Typography sx={{ mb: 2 }}>
          In JavaScript, an <strong>object</strong> is a collection of key-value pairs used to
          store and structure data. Keys are called <em>properties</em>, and they can hold
          values of any type — including functions (which become <em>methods</em>).
        </Typography>

        <Typography sx={{ mb: 2 }}>
          Try adding keys and values below. The object and destructuring code will update live.
        </Typography>

        <ObjectPlayground onObjectChange={setPlaygroundObject} />
      </Paper>

      {/* Section: Destructuring */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">Object Destructuring</Typography>
        <Typography sx={{ mb: 2 }}>
          This shows destructuring of the object above.
        </Typography>

        <Box
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: '#f6f6f6',
            fontFamily: 'monospace',
            borderRadius: 1,
            overflowX: 'auto',
          }}
        >
          <pre>{destructuredOutput}</pre>
        </Box>
      </Paper>
    </Box>
  );
}

function ObjectPlayground({
  onObjectChange,
}: {
  onObjectChange?: (obj: Record<string, any>) => void;
}) {
  const [entries, setEntries] = useState([{ key: 'name', value: '"Alex"' }]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const result: Record<string, any> = {};
    try {
      for (const { key, value } of entries) {
        if (!key.trim()) continue;
        const val = eval(`(${value})`);
        result[key] = val;
      }
      setError(null);
      onObjectChange?.(result);
    } catch {
      setError('Live object update failed — check your syntax.');
      onObjectChange?.({});
    }
  }, [entries]);

  const handleKeyChange = (index: number, value: string) => {
    const updated = [...entries];
    updated[index].key = value;
    setEntries(updated);
  };

  const handleValueChange = (index: number, value: string) => {
    const updated = [...entries];
    updated[index].value = value;
    setEntries(updated);
  };

  const addEntry = () => {
    setEntries([...entries, { key: '', value: '' }]);
  };

  return (
    <Box>
      {entries.map((entry, idx) => (
        <Box key={idx} sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <TextField
            label="Key"
            value={entry.key}
            onChange={(e) => handleKeyChange(idx, e.target.value)}
            size="small"
            sx={{ flex: 1 }}
          />
          <TextField
            label="Value (JS Expression)"
            value={entry.value}
            onChange={(e) => handleValueChange(idx, e.target.value)}
            size="small"
            sx={{ flex: 2 }}
          />
        </Box>
      ))}

      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
        <Button variant="outlined" onClick={addEntry}>
          Add Property
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
