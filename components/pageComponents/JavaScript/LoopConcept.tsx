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
                        lines={[
                            { code: `for (let i = 0; i < ${forCount}; i++) {` },
                            { code: `  console.log(i);` },
                            { code: `}` },
                        ]}
                    />
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
                    <CodeSnippet
                        enableRun
                        lines={[
                            { code: `const fruits = [${arrayItems.map(f => `"${f}"`).join(', ')}];` },
                            { code: `for (const fruit of fruits) {` },
                            { code: `  console.log(fruit);` },
                            { code: `}` },
                        ]}
                    />
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