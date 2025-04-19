'use client';

import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import '../../styles/set.css';

export default function SetConcept() {
    const [setValues, setSetValues] = useState<Set<number>>(new Set([1, 2, 3]));
    const [input, setInput] = useState('');
    const [output, setOutput] = useState<string | null>(null);
    const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
    const [duplicateValue, setDuplicateValue] = useState<number | null>(null);

    const handleAdd = () => {
        const val = parseInt(input);
        if (!isNaN(val)) {
            if (setValues.has(val)) {
                setDuplicateValue(val);
                setShowDuplicateWarning(true);
                return;
            }
            const newSet = new Set(setValues);
            newSet.add(val);
            setSetValues(newSet);
            setOutput(`Added ${val}. Set size is now ${newSet.size}.`);
        }
    };


    const handleDelete = () => {
        const val = parseInt(input);
        if (!isNaN(val)) {
            const newSet = new Set(setValues);
            const result = newSet.delete(val);
            setSetValues(newSet);
            setOutput(`delete(${val}) → ${result}`);
        }
    };

    const handleHas = () => {
        const val = parseInt(input);
        if (!isNaN(val)) {
            const result = setValues.has(val);
            setOutput(`has(${val}) → ${result}`);
        }
    };

    const handleClear = () => {
        setSetValues(new Set());
        setOutput(`Set cleared`);
    };

    return (
        <div className="set-container">
            <h2 className="set-title">JavaScript Set</h2>
            <p className="set-description">
                A <code>Set</code> stores unique values. You can add, remove, or check for existence.
            </p>

            <div className="set-controls">
                <TextField
                    label="Value"
                    type="number"
                    size="small"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <Button variant="contained" onClick={handleAdd}>Add</Button>
                <Button variant="outlined" onClick={handleDelete}>Delete</Button>
                <Button variant="outlined" onClick={handleHas}>Has</Button>
                <Button variant="outlined" color="error" onClick={handleClear}>Clear</Button>
            </div>

            <div className="set-box">
                {[...setValues].map((val, idx) => (
                    <div className="set-cell" key={idx}>
                        {val}
                    </div>
                ))}
            </div>

            {output && <p className="set-output">{output}</p>}

            <Snackbar
                open={showDuplicateWarning}
                autoHideDuration={4000}
                onClose={() => setShowDuplicateWarning(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Snackbar
                    open={showDuplicateWarning}
                    autoHideDuration={4000}
                    onClose={() => setShowDuplicateWarning(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert
                        severity="warning"
                        variant="filled"
                        onClose={() => setShowDuplicateWarning(false)}
                    >
                        {duplicateValue !== null
                            ? `The value ${duplicateValue} already exists in the Set and was not added.`
                            : 'This value already exists in the Set.'}
                    </Alert>
                </Snackbar>

            </Snackbar>
        </div>
    );
}
