import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // Import the play icon
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface CodeSnippetProps {
    lines: { code: string; comment?: string }[];
    enableRun?: boolean; // Optional prop to enable running the code
    editable?: boolean; // Optional prop to allow editing the code
    allowCopy?: boolean; // Optional prop to allow copying the code
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ lines, enableRun = false, editable = false, allowCopy = true }) => {
    const [open, setOpen] = useState(false);
    const [output, setOutput] = useState<string>('');
    const [editableLines, setEditableLines] = useState<string>(
        lines.map(line => line.code).join('\n')
    );
    const [isEditing, setIsEditing] = useState<boolean>(false); // Track whether the user is editing

    const handleCopy = () => {
        const codeToCopy = isEditing ? editableLines : lines.map(line => line.code).join('\n');
        navigator.clipboard.writeText(codeToCopy);
        setOpen(true); // Show the toast
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false); // Hide the toast
    };

    const runCode = () => {
        const code = isEditing ? editableLines : lines.map(line => line.code).join('\n');
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
        } catch (error: any) {
            // Extract the line number from the error stack trace
            const stack = error.stack || '';
            const match = stack.match(/<anonymous>:(\d+):\d+/); // Match line number in the stack trace
            const lineNumber = match ? parseInt(match[1], 10) : null;

            if (lineNumber) {
                logs.push(`Error on line ${lineNumber}: ${error.message}`);
            } else {
                logs.push(`Error: ${error.message}`);
            }
        } finally {
            console.log = originalConsoleLog; // Restore original console.log
        }

        setOutput(logs.join('\n'));
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
                            {line.code && line.code} {line.comment && <span style={{ color: '#888' }}>{`// ${line.comment}`}</span>}
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
                    }}
                >
                    {output || 'No output yet.'}
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