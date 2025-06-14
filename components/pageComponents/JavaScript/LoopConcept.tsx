'use client';

import { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import TextField from '@mui/material/TextField';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import CodeSnippet from '@/components/common/CodeSnippet';
import ForLoopOrderAnimation from './ForLoopOrderAnimation';
import ForOfLoopOrderAnimation from './ForOfLoopOrderAnimation';
import DoWhileLoopOrderAnimation from './DoWhileLoopOrderAnimation';

const loopColor = '#0288d1';

function VisualLoop({
    label,
    iterations,
    output,
}: {
    label: string;
    iterations: number;
    output: string[];
}) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 28,
                margin: '28px 0 18px 0',
                flexWrap: 'wrap',
            }}
        >
            <div
                style={{
                    minWidth: 120,
                    padding: '16px 22px',
                    borderRadius: 12,
                    background: '#fafbfc',
                    border: `1.5px solid ${loopColor}`,
                    fontWeight: 600,
                    fontSize: 18,
                    color: loopColor,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '0 2px 8px #0001',
                }}
            >
                <span style={{ fontSize: 13, fontWeight: 500, color: '#888', marginBottom: 2 }}>
                    {label}
                </span>
                <span style={{ fontSize: 22, fontWeight: 700, color: loopColor }}>{iterations}</span>
            </div>
            <svg width="32" height="32" style={{ margin: '0 8px' }}>
                <circle cx="16" cy="16" r="15" fill="#fff" stroke="#eee" strokeWidth="1.5" />
                <polyline
                    points="10,16 22,16"
                    stroke={loopColor}
                    strokeWidth="3"
                    fill="none"
                    markerEnd="url(#arrowhead-min)"
                />
                <defs>
                    <marker id="arrowhead-min" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
                        <polygon points="0 0, 8 3, 0 6" fill={loopColor} />
                    </marker>
                </defs>
            </svg>
            <div
                style={{
                    minWidth: 160,
                    padding: '14px 20px',
                    borderRadius: 10,
                    background: '#f6fcf7',
                    border: `1.5px solid ${loopColor}`,
                    color: loopColor,
                    fontWeight: 600,
                    fontSize: 16,
                    boxShadow: '0 2px 8px #0001',
                    transition: 'all 0.2s',
                }}
            >
                {output.join(', ')}
            </div>
        </div>
    );
}

export default function LoopConcept() {
    // For-loop
    const [forCount, setForCount] = useState(5);

    // For-of loop
    const [arrayInput, setArrayInput] = useState('apple,banana,pear');
    const arrayItems = arrayInput.split(',').map(s => s.trim()).filter(Boolean);

    // Do-while loop
    const [doStart, setDoStart] = useState(1);
    const [doEnd, setDoEnd] = useState(5);

    // Outputs
    const forOutput = [];
    for (let i = 0; i < forCount; i++) {
        forOutput.push(i.toString());
    }

    const forOfOutput = [];
    for (const item of arrayItems) {
        forOfOutput.push(item);
    }

    const doWhileOutput = [];
    let j = doStart;
    if (doStart <= doEnd) {
        do {
            doWhileOutput.push(j.toString());
            j++;
        } while (j <= doEnd);
    } else {
        doWhileOutput.push(doStart.toString());
    }

    // For running code and showing output
    const [runOutput, setRunOutput] = useState<string[]>([]);

    function handleRun(codeType: 'for' | 'forof' | 'dowhile') {
        let output: string[] = [];
        if (codeType === 'for') {
            for (let i = 0; i < forCount; i++) {
                output.push(i.toString());
            }
        } else if (codeType === 'forof') {
            for (const item of arrayItems) {
                output.push(item);
            }
        } else if (codeType === 'dowhile') {
            let k = doStart;
            if (doStart <= doEnd) {
                do {
                    output.push(k.toString());
                    k++;
                } while (k <= doEnd);
            } else {
                output.push(doStart.toString());
            }
        }
        setRunOutput(output);
    }

    return (
        <ConceptWrapper
            title="Loops in JavaScript"
            description="Loops let you repeat code multiple times. Here are three common types of loops in JavaScript."
        >
            <TableOfContents>
                <Section
                    title="1. For Loop"
                    subtitle="A for loop repeats code a set number of times."
                >
                    <div style={{ marginBottom: 10 }}>
                        <TextField
                            label="How many times?"
                            size="small"
                            type="number"
                            value={forCount}
                            onChange={e => setForCount(Math.max(0, Number(e.target.value)))}
                            inputProps={{ min: 0, max: 20 }}
                            style={{ width: "200px" }}
                        />
                    </div>
                    <CodeSnippet
                        enableRun
                        onRun={() => handleRun('for')}
                        lines={[
                            { code: `for (let i = 0; i < ${forCount}; i++) {` },
                            { code: `  console.log(i);` },
                            { code: `}` },
                        ]}
                    />
                    {runOutput.length > 0 && (
                        <div style={{
                            marginTop: 10,
                            background: '#f5f5f5',
                            borderRadius: 6,
                            padding: 10,
                            fontWeight: 500,
                            color: loopColor
                        }}>
                            Output: {runOutput.join(', ')}
                        </div>
                    )}
                    {/* --- Visualization of for loop order --- */}
                    <Section title="1a. For Loop Order Animation" subtitle="A visual of how a for loop executes">
                        <ForLoopOrderAnimation />
                    </Section>
                </Section>
                
                <Section
                    title="2. For...of Loop"
                    subtitle="A for...of loop goes through each item in a list (array)."
                >
                    <div style={{ marginBottom: 10 }}>
                        <TextField
                            label="Array items (comma separated)"
                            size="small"
                            value={arrayInput}
                            onChange={e => setArrayInput(e.target.value)}
                        />
                    </div>
                    <VisualLoop label="Items" iterations={arrayItems.length} output={forOfOutput} />
                    <CodeSnippet
                        enableRun
                        onRun={() => handleRun('forof')}
                        lines={[
                            { code: `const fruits = [${arrayItems.map(f => `"${f}"`).join(', ')}];` },
                            { code: `for (const fruit of fruits) {` },
                            { code: `  console.log(fruit);` },
                            { code: `}` },
                        ]}
                    />
                    {runOutput.length > 0 && (
                        <div style={{
                            marginTop: 10,
                            background: '#f5f5f5',
                            borderRadius: 6,
                            padding: 10,
                            fontWeight: 500,
                            color: loopColor
                        }}>
                            Output: {runOutput.join(', ')}
                        </div>
                    )}
                    <Section title="2a. For...of Loop Animation" subtitle="A visual of how a for...of loop iterates through an array">
                        <ForOfLoopOrderAnimation items={arrayItems} />
                    </Section>
                </Section>
                <Section
                    title="3. Do...While Loop"
                    subtitle="A do...while loop always runs at least once, then keeps going while the condition is true."
                >
                    <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                        <TextField
                            label="Start"
                            size="small"
                            type="number"
                            value={doStart}
                            onChange={e => setDoStart(Number(e.target.value))}
                        />
                        <TextField
                            label="End"
                            size="small"
                            type="number"
                            value={doEnd}
                            onChange={e => setDoEnd(Number(e.target.value))}
                        />
                    </div>
                    <CodeSnippet
                        enableRun
                        onRun={() => handleRun('dowhile')}
                        lines={[
                            { code: `let i = ${doStart};` },
                            { code: `do {` },
                            { code: `  console.log(i);` },
                            { code: `  i++;` },
                            { code: `} while (i <= ${doEnd});` },
                        ]}
                    />
                    {runOutput.length > 0 && (
                        <div style={{
                            marginTop: 10,
                            background: '#f5f5f5',
                            borderRadius: 6,
                            padding: 10,
                            fontWeight: 500,
                            color: loopColor
                        }}>
                            Output: {runOutput.join(', ')}
                        </div>
                    )}
                    <Section title="3a. Do...While Loop Animation" subtitle="A visual of how a do...while loop executes">
                        <DoWhileLoopOrderAnimation/>
                    </Section>
                </Section>
            </TableOfContents>
        </ConceptWrapper>
    );
}