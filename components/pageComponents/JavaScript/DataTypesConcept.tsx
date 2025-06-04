'use client';

import { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '@/components/common/Section';
import CodeSnippet from '@/components/common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import VideoPlayer from '@/components/common/VideoPlayer';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function DataTypesConcept() {
    const [userInput, setUserInput] = useState('');
    const [detectedType, setDetectedType] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUserInput(value);

        // Try to detect type
        if (value === '') {
            setDetectedType(null);
        } else if (value === 'true' || value === 'false') {
            setDetectedType('Boolean (true/false)');
        } else if (!isNaN(Number(value))) {
            setDetectedType('Number');
        } else if (value === 'null') {
            setDetectedType('Null (empty value)');
        } else if (value === 'undefined') {
            setDetectedType('Undefined (not set)');
        } else if (value.startsWith('[') && value.endsWith(']')) {
            setDetectedType('Array (list of things)');
        } else if (value.startsWith('{') && value.endsWith('}')) {
            setDetectedType('Object (collection of properties)');
        } else {
            setDetectedType('String (text)');
        }
    };

    return (
        <ConceptWrapper
            title="Data Types in JavaScript"
            description="A data type is just the kind of thing you are storing in a variable or constant. JavaScript can handle numbers, words, true/false values, empty values, lists, and more."
        >
            <TableOfContents>
                <VideoPlayer src="https://www.youtube.com/embed/5K_Wq9B2eVo" />
                <Section
                    title="1. What is a Data Type?"
                    subtitle="Think of a data type as the 'category' of a value. For example, is it a number, some text, a list, or something else?"
                >
                </Section>
                <Section
                    title="2. The Most Common Data Types"
                    subtitle="Here are the main types of values you'll use:"
                >
                    <TableContainer component={Paper} sx={{ mb: 3 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Type</strong></TableCell>
                                    <TableCell><strong>Example</strong></TableCell>
                                    <TableCell><strong>What it means</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Number</TableCell>
                                    <TableCell>5, 3.14, -10</TableCell>
                                    <TableCell>Any kind of number. Use for math, counting, prices, etc.</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>String</TableCell>
                                    <TableCell>"hello", 'world', `your name`</TableCell>
                                    <TableCell>Any text. Use for words, sentences, or anything you want to treat as text.</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Boolean</TableCell>
                                    <TableCell>true, false</TableCell>
                                    <TableCell>Only two values: yes/no, on/off, true/false.</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Null</TableCell>
                                    <TableCell>null</TableCell>
                                    <TableCell>A special value that means "nothing here" or "empty" on purpose.</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Undefined</TableCell>
                                    <TableCell>undefined</TableCell>
                                    <TableCell>Means "not set yet". If you make a variable but don't give it a value, it's undefined.</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Object</TableCell>
                                    <TableCell>{`{ name: 'Alice', age: 30 }`}</TableCell>
                                    <TableCell>A collection of properties, like a box with labels. Arrays (lists) are also a kind of object.</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Array</TableCell>
                                    <TableCell>[1, 2, 3], ['a', 'b', 'c']</TableCell>
                                    <TableCell>A list of values. Use when you want to keep several things together in order.</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Symbol <span style={{ fontSize: '0.9em' }}>(advanced)</span></TableCell>
                                    <TableCell>Symbol('id')</TableCell>
                                    <TableCell>A unique value, mostly used by advanced code.</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>BigInt <span style={{ fontSize: '0.9em' }}>(advanced)</span></TableCell>
                                    <TableCell>12345678901234567890n</TableCell>
                                    <TableCell>A really big number, bigger than Number can handle.</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Section>
                <Section
                    title="3. How do I check what type something is?"
                    subtitle="You can use the typeof operator to ask JavaScript what type a value is."
                >
                    <CodeSnippet
                        lines={[
                            { code: `typeof 42;`, comment: `number` },
                            { code: `typeof "hello";`, comment: `string` },
                            { code: `typeof true;`, comment: `boolean` },
                            { code: `typeof null;`, comment: `object (this is a weird JavaScript quirk!)` },
                            { code: `typeof undefined;`, comment: `undefined` },
                            { code: `typeof { name: "Alice" };`, comment: `object` },
                            { code: `typeof [1, 2, 3];`, comment: `object (arrays are a special kind of object)` },
                            { code: `typeof Symbol("id");`, comment: `symbol` },
                            { code: `typeof 123n;`, comment: `bigint` },
                        ]}
                    />
                </Section>
                <Section
                    title="4. Try It Yourself!"
                    subtitle="Type a value below and see what kind of thing JavaScript thinks it is:"
                >
                    <TextField
                        label="Type a value (e.g. 42, hello, true, null, undefined, [1,2,3], {a:1})"
                        size="small"
                        value={userInput}
                        onChange={handleInputChange}
                        sx={{ mb: 2, width: '100%' }}
                    />
                    {detectedType && (
                        <div>
                            <strong>Detected type:</strong> <code>{detectedType}</code>
                        </div>
                    )}
                </Section>
            </TableOfContents>
        </ConceptWrapper>
    );
}