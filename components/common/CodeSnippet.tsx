import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface CodeSnippetProps {
    lines: { code: string; comment?: string; audio?: string }[];
    enableRun?: boolean;
    editable?: boolean;
    allowCopy?: boolean;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ lines, enableRun = false, editable = false, allowCopy = true }) => {
    const [open, setOpen] = useState(false);
    const [output, setOutput] = useState<string>('No output yet.');
    const [editableLines, setEditableLines] = useState<string>(
        lines.map(line => line.code).join('\n')
    );
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [worker, setWorker] = useState<Worker | null>(null);

    useEffect(() => {
        // Initialize the Web Worker
        const newWorker = new Worker(new URL('../../workers/codeRunnerWorker.js', import.meta.url));
        setWorker(newWorker);

        // Cleanup the worker on component unmount
        return () => {
            newWorker.terminate();
        };
    }, []);

    const handleCopy = () => {
        const codeToCopy = isEditing ? editableLines : lines.map(line => line.code).join('\n');
        navigator.clipboard.writeText(codeToCopy);
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const runCode = () => {
        if (!worker) return;

        const code = isEditing ? editableLines : lines.map(line => line.code).join('\n');

        // Send the code to the Web Worker
        worker.postMessage({ code });

        // Listen for messages from the Web Worker
        worker.onmessage = (e) => {
            const { type, result, error, logs } = e.data;

            if (type === 'success') {
                const outputLogs = logs.join('\n');
                const finalOutput = result !== undefined ? `${outputLogs}\nResult: ${String(result)}` : outputLogs;
                setOutput(finalOutput || 'Code executed successfully.');
            } else if (type === 'error') {
                const outputLogs = logs.join('\n');
                setOutput(`${outputLogs}\nError: ${error}`);
            }
        };
    };

    return (
        <div style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#333' }}>Code Snippet</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {editable && (
                        <Tooltip title={isEditing ? "Enter View Mode" : "Enter Edit Mode"}>
                            <IconButton onClick={() => setIsEditing(!isEditing)} size="small">
                                {isEditing ? <VisibilityIcon fontSize="small" /> : <EditIcon fontSize="small" />}
                            </IconButton>
                        </Tooltip>
                    )}
                    {allowCopy && (
                        <Tooltip title="Copy code">
                            <IconButton onClick={handleCopy} size="small">
                                <ContentCopyIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                    {enableRun && (
                        <Tooltip title="Run Code">
                            <IconButton onClick={runCode} size="small">
                                <PlayArrowIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                </div>
            </div>
            {editable && isEditing ? (
                <TextField
                    multiline
                    rows={lines.length + 2}
                    value={editableLines}
                    onChange={(e) => setEditableLines(e.target.value)}
                    fullWidth
                    variant="outlined"
                    sx={{ marginBottom: '16px', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}
                />
            ) : (
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'monospace', color: '#333' }}>
                    {lines.map((line, index) => (
                        <div key={index} style={{ marginBottom: '8px' }}>
                            {line.code} {line.comment && <span style={{ color: '#888' }}>{`// ${line.comment}`}</span>}
                        </div>
                    ))}
                </pre>
            )}
            {enableRun && (
                <Box
                    sx={{
                        padding: '8px',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '4px',
                        minHeight: '50px',
                        whiteSpace: 'pre-wrap',
                        marginTop: '16px',
                        fontFamily: 'monospace',
                    }}
                >
                    <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#444' }}>Output</div>
                    {output}
                </Box>
            )}
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Code copied to clipboard!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CodeSnippet;