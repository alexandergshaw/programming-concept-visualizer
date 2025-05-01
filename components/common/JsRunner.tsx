import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface JsRunnerProps {
    initialCode?: string; // Optional prop to prepopulate the code
}

const JsRunner: React.FC<JsRunnerProps> = ({ initialCode = '' }) => {
    const [code, setCode] = useState<string>(initialCode); // Initialize with initialCode
    const [output, setOutput] = useState<string>('');

    const runCode = () => {
        const logs: string[] = [];
        const originalConsoleLog = console.log;

        // Override console.log to capture logs
        console.log = (...args: any[]) => {
            logs.push(args.map(arg => String(arg)).join(' '));
            originalConsoleLog(...args); // Still log to the browser console
        };

        try {
            // Use eval to execute the code
            const result = eval(code);
            if (result !== undefined) {
                logs.push(`Result: ${String(result)}`);
            }
        } catch (error) {
            logs.push(`Error: ${error}`);
        } finally {
            console.log = originalConsoleLog; // Restore original console.log
        }

        setOutput(logs.join('\n'));
    };

    return (
        <Box sx={{ padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <TextField
                label="Enter JavaScript Code"
                multiline
                rows={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ marginBottom: '16px' }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={runCode}
                sx={{ marginBottom: '16px' }}
            >
                Run Code
            </Button>
            <TextField
                label="Output"
                value={output}
                disabled
                fullWidth
                variant="outlined"
                sx={{ marginBottom: '16px' }}
            />
        </Box>
    );
};

export default JsRunner;