'use client';

import { useState } from 'react';
import { Box, Paper, Typography, Button, TextField, MenuItem, Select, InputLabel, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import TableOfContents from '../../common/TableOfContents';
import CodeSnippet from '../../common/CodeSnippet';

// SVG shape components for flowchart
function Oval({ children, color }: { children: React.ReactNode, color?: string }) {
    return (
        <Box sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 48,
            background: color || '#81c784',
            borderRadius: '50% / 50%',
            border: '2px solid #1976d2',
            fontWeight: 600,
            fontSize: 13, // Shrunk font
            mb: 0.5
        }}>
            {children}
        </Box>
    );
}
function Parallelogram({ children, color }: { children: React.ReactNode, color?: string }) {
    return (
        <Box sx={{
            width: 120,
            height: 48,
            background: color || '#ba68c8',
            transform: 'skew(-20deg)',
            border: '2px solid #7c43bd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            fontSize: 13, // Shrunk font
            mb: 0.5
        }}>
            <span style={{ transform: 'skew(20deg)' }}>{children}</span>
        </Box>
    );
}
function Rectangle({ children, color }: { children: React.ReactNode, color?: string }) {
    return (
        <Box sx={{
            width: 120,
            height: 48,
            background: color || '#90caf9',
            border: '2px solid #1976d2',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            fontSize: 13, // Shrunk font
            mb: 0.5
        }}>
            {children}
        </Box>
    );
}
function Diamond({ children, color }: { children: React.ReactNode, color?: string }) {
    return (
        <Box sx={{
            width: 64,
            height: 64,
            background: color || '#ffd54f',
            border: '2px solid #fbc02d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            fontSize: 13, // Shrunk font
            mb: 0.5,
            mx: 'auto',
            transform: 'rotate(45deg)'
        }}>
            <span style={{ transform: 'rotate(-45deg)' }}>{children}</span>
        </Box>
    );
}
// Arrow always points straight down for decisions
function Arrow({ label }: { angle?: number; label?: string }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 0.5 }}>
            {label && (
                <Typography sx={{ fontSize: 13, color: label === 'Yes' ? '#388e3c' : '#e57373', mb: 0.2 }}>
                    {label}
                </Typography>
            )}
            <svg width="32" height="32">
                <line x1="16" y1="0" x2="16" y2="24" stroke="#bdbdbd" strokeWidth="3" />
                <polygon points="10,18 16,24 22,18" fill="#bdbdbd" />
            </svg>
        </Box>
    );
}

// Improved BranchArrow: curves outwards from the bottom of the diamond, then down
function BranchArrow({ label, direction }: { label: string; direction: 'left' | 'right' }) {
    // direction: 'left' for Yes, 'right' for No
    // Arrow starts at (center bottom of diamond) and curves outwards then down
    // For left: curve to (8,20) then down to (8,44)
    // For right: curve to (56,20) then down to (56,44)
    const labelColor = direction === 'left' ? '#388e3c' : '#e57373';
    const startX = 32;
    const startY = 0;
    const midX = direction === 'left' ? 8 : 56;
    const midY = 20;
    const endX = midX;
    const endY = 44;
    // Arrowhead points
    const arrowHead =
        direction === 'left'
            ? `${endX - 6},${endY - 4} ${endX},${endY} ${endX + 6},${endY - 4}`
            : `${endX - 6},${endY - 4} ${endX},${endY} ${endX + 6},${endY - 4}`;
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 70 }}>
            <Typography sx={{ fontSize: 13, color: labelColor, mb: 0.2 }}>
                {label}
            </Typography>
            <svg width="64" height="48">
                <path
                    d={`M${startX},${startY} Q${midX},${midY} ${endX},${endY - 4}`}
                    stroke="#bdbdbd"
                    strokeWidth="3"
                    fill="none"
                />
                {/* Arrowhead */}
                <polygon
                    points={arrowHead}
                    fill="#bdbdbd"
                />
            </svg>
        </Box>
    );
}

type NodeType = 'start' | 'input' | 'process' | 'decision' | 'output' | 'end';

interface FlowNode {
    id: number;
    type: NodeType;
    text: string;
}

const SYMBOLS = [
    { shape: <Oval> </Oval>, name: 'Start/end', meaning: 'Shows where your program begins or ends.' },
    { shape: <Arrow />, name: 'Arrow', meaning: 'Shows the direction to go next.' },
    { shape: <Parallelogram> </Parallelogram>, name: 'Input/Output', meaning: 'Purple slanted box: ask the user for info or show a result.' },
    { shape: <Rectangle> </Rectangle>, name: 'Process', meaning: 'Blue rectangle: do a calculation or action.' },
    { shape: <Diamond> </Diamond>, name: 'Decision', meaning: 'Yellow diamond: ask a yes/no question.' },
];

// Helper to generate code from user flowchart nodes
function generateCodeFromNodes(nodes: FlowNode[]): { code: string; comment?: string }[] {
    const codeLines: { code: string; comment?: string }[] = [];
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        switch (node.type) {
            case 'start':
                codeLines.push({ code: '', comment: 'Start of program' });
                break;
            case 'input':
                codeLines.push({ code: 'const input = prompt("Enter a value:");', comment: node.text });
                break;
            case 'output':
                codeLines.push({ code: 'console.log(input);', comment: node.text });
                break;
            case 'process':
                codeLines.push({ code: '', comment: node.text });
                break;
            case 'decision':
                codeLines.push({ code: 'if (/* condition */) {', comment: node.text });
                codeLines.push({ code: '    // ...', comment: 'Yes branch' });
                codeLines.push({ code: '} else {' });
                codeLines.push({ code: '    // ...', comment: 'No branch' });
                codeLines.push({ code: '}' });
                break;
            case 'end':
                codeLines.push({ code: '', comment: 'End of program' });
                break;
            default:
                break;
        }
    }
    return codeLines;
}

export default function FlowchartDesigner() {
    const [nodes, setNodes] = useState<FlowNode[]>([
        { id: 1, type: 'start', text: 'Start' },
        { id: 2, type: 'end', text: 'End' }
    ]);
    const [selectedType, setSelectedType] = useState<NodeType>('process');
    const [nodeText, setNodeText] = useState('');
    const [insertIdx, setInsertIdx] = useState<number>(1); // Default: before 'End'

    // Generate code snippet from user flowchart
    const userCodeLines = generateCodeFromNodes(nodes);

    const addNode = () => {
        if (!nodeText.trim()) return;
        const newId = nodes.length ? Math.max(...nodes.map(n => n.id)) + 1 : 1;
        const newNode: FlowNode = { id: newId, type: selectedType, text: nodeText };
        const newNodes = [...nodes];
        newNodes.splice(insertIdx, 0, newNode);
        setNodes(newNodes);
        setNodeText('');
        setInsertIdx(insertIdx + 1);
    };

    const removeNode = (idx: number) => {
        if (nodes[idx].type === 'start' || nodes[idx].type === 'end') return;
        const newNodes = [...nodes];
        newNodes.splice(idx, 1);
        setNodes(newNodes);
        if (insertIdx > newNodes.length - 1) setInsertIdx(newNodes.length - 1);
    };

    // Render the correct shape for each node type
    const renderShape = (node: FlowNode) => {
        switch (node.type) {
            case 'start':
                return <Oval color="#81c784">Start</Oval>;
            case 'end':
                return <Oval color="#e57373">End</Oval>;
            case 'input':
                return <Parallelogram color="#ba68c8">{node.text}</Parallelogram>;
            case 'output':
                return <Parallelogram color="#ba68c8">{node.text}</Parallelogram>;
            case 'process':
                return <Rectangle color="#90caf9">{node.text}</Rectangle>;
            case 'decision':
                return <Diamond color="#ffd54f">{node.text}</Diamond>;
            default:
                return null;
        }
    };

    // Sample problem, flowchart, and code
    const sampleNodes: FlowNode[] = [
        { id: 1, type: 'start', text: 'Start' },
        { id: 2, type: 'input', text: 'Input number' },
        { id: 3, type: 'decision', text: 'Even?' },
        { id: 4, type: 'output', text: 'Show "Even"' },
        { id: 5, type: 'output', text: 'Show "Odd"' },
        { id: 6, type: 'end', text: 'End' }
    ];

    // For the sample flowchart, show branches for the decision node
    const renderSampleFlowchart = () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, mb: 2 }}>
            {/* Start */}
            <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {renderShape(sampleNodes[0])}
                    {/* No text outside the shape */}
                </Box>
                <Arrow />
            </Box>
            {/* Input */}
            <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {renderShape(sampleNodes[1])}
                    {/* No text outside the shape */}
                </Box>
                <Arrow />
            </Box>
            {/* Decision */}
            <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    {renderShape(sampleNodes[2])}
                    {/* No text outside the shape */}
                    {/* Branch arrows */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: -30,
                        zIndex: 1
                    }}>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', pr: 3 }}>
                            <BranchArrow label="Yes" direction="left" />
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start', pl: 3 }}>
                            <BranchArrow label="No" direction="right" />
                        </Box>
                    </Box>
                </Box>
                {/* Branches */}
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 5 }}>
                    {/* Yes branch (left) */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 2 }}>
                        {renderShape(sampleNodes[3])}
                        {/* No text outside the shape */}
                        <Arrow />
                        {renderShape(sampleNodes[5])}
                        {/* No text outside the shape */}
                    </Box>
                    {/* No branch (right) */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 2 }}>
                        {renderShape(sampleNodes[4])}
                        {/* No text outside the shape */}
                        <Arrow />
                        {renderShape(sampleNodes[5])}
                        {/* No text outside the shape */}
                    </Box>
                </Box>
            </Box>
        </Box>
    );

    return (
        <ConceptWrapper
            title="Flowchart Designer"
            description="Flowcharts are simple diagrams that help you plan out your program before you write any code. Each shape means something special."
        >
            <TableOfContents>
                <Section
                    title="1) Flowchart Symbols"
                    subtitle="What do the shapes mean?"
                >
                    <Typography sx={{ mb: 2 }}>
                        Here’s a quick guide to the shapes you’ll see in flowcharts:
                    </Typography>
                    <TableContainer
                        component={Paper}
                        sx={{
                            mb: 3,
                            overflow: 'visible', // Remove scroll bar
                            boxShadow: 0
                        }}
                    >
                        <Table size="small" sx={{ minWidth: 400 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700 }}>Shape</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>What it means</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {SYMBOLS.map((row, i) => (
                                    <TableRow key={i} sx={{ height: 96 /* Increased row height */ }}>
                                        <TableCell sx={{ pl: 2, textAlign: 'left', verticalAlign: 'middle', width: 140 }}>
                                            {row.shape}
                                        </TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle' }}>{row.name}</TableCell>
                                        <TableCell sx={{ verticalAlign: 'middle' }}>{row.meaning}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Section>
                <Section
                    title="2) Sample Problem"
                    subtitle="See how a flowchart helps you plan a program."
                >
                    <Paper sx={{ p: 2, mb: 2, bgcolor: '#fffde7', border: '2px solid #ffe082' }}>
                        <Typography sx={{ mb: 1 }}>
                            <b>Problem:</b> Ask the user for a number. If the number is even, show &quot;Even&quot;. If it&apos;s odd, show &quot;Odd&quot;.
                        </Typography>
                    </Paper>
                    <Section title="2a) Sample Flowchart" sx={{ mb: 2 }}>
                        {renderSampleFlowchart()}

                    </Section>
                    <Section title="2b) Sample Code">
                        <CodeSnippet
                            lines={[
                                { code: 'const num = Number(prompt("Enter a number:"));', comment: 'Ask the user for a number' },
                                { code: 'if (num % 2 === 0) {', comment: 'Is it even?' },
                                { code: '    console.log("Even");', comment: 'Show "Even"' },
                                { code: '} else {', comment: 'Otherwise...' },
                                { code: '    console.log("Odd");', comment: 'Show "Odd"' },
                                { code: '}' }
                            ]}
                            allowCopy
                        />
                    </Section>
                </Section>
                <Section
                    title="3) Try Making Your Own Flowchart"
                    subtitle="Add steps, questions, input, and output to plan your own program."
                >
                    <Typography sx={{ mb: 2 }}>
                        Click &quot;Add&quot; to put a new step in your flowchart.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                        <FormControl size="small">
                            <InputLabel id="type-label">Type</InputLabel>
                            <Select
                                labelId="type-label"
                                value={selectedType}
                                label="Type"
                                onChange={e => setSelectedType(e.target.value as NodeType)}
                                sx={{ minWidth: 110 }}
                            >
                                <MenuItem value="input">Input</MenuItem>
                                <MenuItem value="process">Process</MenuItem>
                                <MenuItem value="decision">Decision</MenuItem>
                                <MenuItem value="output">Output</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            size="small"
                            label="What happens in this step?"
                            value={nodeText}
                            onChange={e => setNodeText(e.target.value)}
                            sx={{ minWidth: 200 }}
                        />
                        <FormControl size="small">
                            <InputLabel id="insert-label">Insert At</InputLabel>
                            <Select
                                labelId="insert-label"
                                value={insertIdx}
                                label="Insert At"
                                onChange={e => setInsertIdx(Number(e.target.value))}
                                sx={{ minWidth: 120 }}
                            >
                                {nodes.map((node, idx) => (
                                    idx !== 0 && (
                                        <MenuItem key={idx} value={idx}>
                                            {`After ${nodes[idx - 1].text.replace(/"/g, '&quot;').replace(/'/g, '&apos;')}`}
                                        </MenuItem>
                                    )
                                ))}
                            </Select>
                        </FormControl>
                        <Button variant="contained" onClick={addNode} disabled={!nodeText.trim()}>
                            Add
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                        {nodes.map((node, idx) => (
                            <Box key={node.id + '-with-arrow'} sx={{ width: '100%' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    {renderShape(node)}
                                    {node.type !== 'start' && node.type !== 'end' && (
                                        <Button
                                            size="small"
                                            color="error"
                                            sx={{ mb: 1 }}
                                            onClick={() => removeNode(idx)}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </Box>
                                {/* Arrow between shapes */}
                                {idx < nodes.length - 1 && <Arrow />}
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{ mt: 4, width: '100%' }}>
                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
                            Your Program Code
                        </Typography>
                        <CodeSnippet
                            lines={
                                userCodeLines.length
                                    ? userCodeLines.map(line => ({
                                        ...line,
                                        comment: line.comment
                                            ? line.comment
                                                .replace(/"/g, '&quot;')
                                                .replace(/'/g, '&apos;')
                                            : undefined
                                    }))
                                    : [{ code: '// Add steps to see your code!' }]
                            }
                            allowCopy
                        />
                    </Box>
                </Section>
            </TableOfContents>
        </ConceptWrapper>
    );
}