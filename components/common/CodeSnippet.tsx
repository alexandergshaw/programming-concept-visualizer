import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface CodeSnippetProps {
    lines: { code: string; comment: string }[];
}

const CodeSnippet: React.FC<CodeSnippetProps> = (props: CodeSnippetProps) => {
    const [open, setOpen] = useState(false);

    const handleCopy = () => {
        const codeToCopy = props.lines.map(line => line.code).join('\n');
        navigator.clipboard.writeText(codeToCopy);
        setOpen(true); // Show the toast
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false); // Hide the toast
    };

    return (
        <div style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#333' }}>Code Snippet</div>
                <Tooltip title="Copy code">
                    <IconButton onClick={handleCopy} size="small">
                        <ContentCopyIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </div>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {props.lines.map((line, index) => (
                    <div key={index} style={{ display: "flex", flexWrap: "wrap", marginBottom: '8px' }}>
                        <div style={{ fontFamily: 'monospace', color: '#333' }}>{line.code}</div>
                        <div style={{ fontSize: '0.9em', color: '#888', marginLeft: '8px' }}>{`// ${line.comment}`}</div>
                    </div>
                ))}
            </pre>
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