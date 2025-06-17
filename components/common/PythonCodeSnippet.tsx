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
import CircularProgress from '@mui/material/CircularProgress';

interface PyodideInterface {
    runPython: (code: string) => string;
}

declare global {
    interface Window {
        loadPyodide: (config: { indexURL: string }) => Promise<PyodideInterface>;
    }
}

interface PythonCodeRunnerProps {
    lines?: { code: string; comment?: string; audio?: string; style?: React.CSSProperties }[];
    code?: string;
    enableRun?: boolean;
    editable?: boolean;
    allowCopy?: boolean;
    defaultCode?: string;
    style?: { [lineNumber: number]: React.CSSProperties };
}

const PythonCodeSnippet: React.FC<PythonCodeRunnerProps> = ({
    lines,
    code,
    enableRun = false,
    editable = false,
    allowCopy = true,
    defaultCode,
    style
}) => {
    const [open, setOpen] = useState(false);
    const [output, setOutput] = useState<string>('No output yet.');
    
    // Convert code string to lines format if needed
    const processedLines = React.useMemo(() => {
        if (lines) {
            return lines;
        } else if (code) {
            return code.split('\n').map((line, index) => ({
                code: line,
                comment: undefined,
                style: style?.[index]
            }));
        }
        return [];
    }, [lines, code, style]);
    
    const [editableCode, setEditableCode] = useState<string>(
        defaultCode || processedLines.map(line => line.code).join('\n')
    );
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pyodideReady, setPyodideReady] = useState<boolean>(false);
    const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);

    useEffect(() => {
        if (!enableRun) return;
        
        // Load Pyodide
        const loadPyodide = async () => {
            try {
                // Load Pyodide from CDN
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
                script.onload = async () => {
                    const pyodideInstance = await window.loadPyodide({
                        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
                    });
                    setPyodide(pyodideInstance);
                    setPyodideReady(true);
                };
                document.head.appendChild(script);
            } catch (error) {
                console.error('Failed to load Pyodide:', error);
                setOutput('Failed to load Python interpreter. Please refresh the page.');
            }
        };

        loadPyodide();
    }, [enableRun]);

    const handleCopy = () => {
        const codeToCopy = isEditing ? editableCode : processedLines.map(line => line.code).join('\n');
        navigator.clipboard.writeText(codeToCopy);
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const runPythonCode = async () => {
        if (!pyodide || !pyodideReady) {
            setOutput('Python interpreter is not ready yet. Please wait a moment and try again.');
            return;
        }

        setIsLoading(true);
        setOutput('Running Python code...');

        try {
            // Get the code to execute - use editableCode if editing, otherwise use current lines
            const codeToExecute = isEditing ? editableCode : processedLines.map(line => line.code).join('\n');

            // Capture print output
            pyodide.runPython(`
import sys
from io import StringIO
import contextlib

# Create a StringIO object to capture output
output_buffer = StringIO()

# Redirect stdout to capture print statements
@contextlib.contextmanager
def capture_output():
    old_stdout = sys.stdout
    sys.stdout = output_buffer
    try:
        yield output_buffer
    finally:
        sys.stdout = old_stdout
`);

            // Run the user's code with output capture
            pyodide.runPython(`
with capture_output() as output:
    try:
${codeToExecute.split('\n').map(line => `        ${line}`).join('\n')}
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
`);

            // Get the captured output
            const result = pyodide.runPython('output_buffer.getvalue()');
            
            if (result.trim()) {
                setOutput(result);
            } else {
                setOutput('Code executed successfully (no output).');
            }
        } catch (error) {
            setOutput(`Python Error: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {enableRun && !pyodideReady && <CircularProgress size={16} />}
                </div>
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
                        <Tooltip title={pyodideReady ? "Run Python Code" : "Python interpreter loading..."}>
                            <span>
                                <IconButton 
                                    onClick={runPythonCode} 
                                    size="small" 
                                    disabled={!pyodideReady || isLoading}
                                >
                                    {isLoading ? <CircularProgress size={16} /> : <PlayArrowIcon fontSize="small" />}
                                </IconButton>
                            </span>
                        </Tooltip>
                    )}
                </div>
            </div>

            {editable && isEditing ? (
                <TextField
                    multiline
                    rows={Math.max(processedLines.length + 2, editableCode.split('\n').length + 2)}
                    value={editableCode}
                    onChange={(e) => setEditableCode(e.target.value)}
                    fullWidth
                    variant="outlined"
                    sx={{ marginBottom: '16px', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}
                />
            ) : (
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'monospace', color: '#333' }}>
                    {processedLines.map((line, index) => (
                        <div key={index} style={{ ...line.style }}>
                            <span style={{ fontFamily: 'monospace' }}>
                                {line.code}
                            </span>
                            {line.comment && (
                                <span style={{ color: '#888' }}>{`  # ${line.comment}`}</span>
                            )}
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
                    Python code copied to clipboard!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default PythonCodeSnippet;
