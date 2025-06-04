'use client';

import { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import TextField from '@mui/material/TextField';
import '../../../styles/variable.css';
import Section from '@/components/common/Section';
import CodeSnippet from '@/components/common/CodeSnippet';
import OrderedList from '@/components/common/OrderedList';
import VideoPlayer from '@/components/common/VideoPlayer';
import TableOfContents from '@/components/common/TableOfContents';

export default function ConstantConcept() {
    const [constValue, setConstValue] = useState(10);
    const [userConst, setUserConst] = useState(10);
    const [constName, setConstName] = useState('MY_CONSTANT');
    const [constNameError, setConstNameError] = useState('');
    const [helperText, setHelperText] = useState('Enter a valid constant name (all caps, underscores).');

    // Simple validation for constant names (all caps, underscores, not starting with a digit)
    const handleConstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setHelperText('');
        setConstNameError('');
        if (/^[0-9]/.test(name)) {
            setConstNameError('Constant name cannot start with a digit.');
        } else if (!/^[A-Z_][A-Z0-9_]*$/.test(name)) {
            setConstNameError('Constant names should be all uppercase letters and underscores.');
        } else {
            setHelperText('That is a valid constant name!');
        }
        setConstName(name);
    };

    return (
        <ConceptWrapper
            title="Constants in JavaScript"
            description="A constant is a variable whose value cannot be changed once it is set. In JavaScript, we use the keyword 'const' to declare a constant. Constants help us write safer code by preventing accidental changes to values that should stay the same."
        >
            <TableOfContents>
                <VideoPlayer src="https://www.youtube.com/embed/9QbIDVcRnc8?si=MdHHGk2C7Tesrc6D" />
                <Section title="1. Creating a Constant" subtitle="To create a constant, use the 'const' keyword, give it a name, and assign it a value.">
                    <OrderedList
                        items={[
                            "Use the keyword 'const'.",
                            "Give the constant a name (by convention, all uppercase with underscores).",
                            "Assign it a value (required).",
                        ]}
                    />
                    <CodeSnippet
                        enableRun
                        lines={[
                            { code: `const PI = 3.14;`, comment: `declare a constant named PI and assign it the value 3.14` },
                            { code: `const DAYS_IN_WEEK = 7;`, comment: `declare a constant named DAYS_IN_WEEK and assign it the value 7` },
                        ]}
                    />
                </Section>
                <Section title="2. Naming Constants" subtitle="Constants are usually named using all uppercase letters and underscores.">
                    <OrderedList
                        items={[
                            "Constant names can only contain uppercase letters, numbers, and underscores (_).",
                            "Constant names cannot start with a number.",
                            "Constant names are typically written in SCREAMING_SNAKE_CASE.",
                        ]}
                    />
                    <Section title="2a. Examples of Valid and Invalid Constant Names">
                        <CodeSnippet
                            lines={[
                                { code: `const 1ST_CONST = 5;`, comment: `invalid - cannot start with a number` },
                                { code: `const myConst = 5;`, comment: `valid, but not conventional - should use all caps` },
                                { code: `const MY_CONST = 5;`, comment: `valid and conventional` },
                                { code: `const MY-CONST = 5;`, comment: `invalid - cannot contain hyphens` },
                                { code: `const MY CONST = 5;`, comment: `invalid - cannot contain spaces` },
                                { code: `const MY_CONST_2 = 5;`, comment: `valid` },
                            ]}
                        />
                    </Section>
                    <Section title="2b. Try It Yourself!" subtitle="Type a constant name to see if it's valid.">
                        <TextField
                            label="Constant Name"
                            size="small"
                            value={constName}
                            onChange={handleConstNameChange}
                            error={!!constNameError}
                            helperText={constNameError || helperText}
                            sx={{ mb: 2 }}
                        />
                    </Section>
                </Section>
                <Section title="3. Assigning and Using Constants" subtitle="Constants must be assigned a value when declared, and their value cannot be changed later.">
                    <TextField
                        label="Constant Value"
                        size="small"
                        type="number"
                        value={constValue}
                        onChange={e => setConstValue(Number(e.target.value))}
                        sx={{ mr: 2 }}
                    />
                    <CodeSnippet
                        enableRun
                        lines={[
                            { code: `const ${constName} = ${constValue};`, comment: `declare a constant with your chosen name and value` },
                            { code: `console.log(${constName});`, comment: `output the value of the constant` },
                        ]}
                    />
                </Section>
                <Section title="4. Trying to Change a Constant" subtitle="If you try to change (reassign) a constant, JavaScript will throw an error.">
                    <TextField
                        label="Try to reassign the constant to:"
                        size="small"
                        type="number"
                        value={userConst}
                        onChange={e => setUserConst(Number(e.target.value))}
                        sx={{ mt: 2, mb: 1 }}
                    />
                    <CodeSnippet
                        enableRun
                        lines={[
                            { code: `const ${constName} = ${constValue};`, comment: `declare the constant` },
                            { code: `${constName} = ${userConst};`, comment: `❌ This will cause an error! You cannot reassign a constant.` },
                        ]}
                    />
                </Section>
            </TableOfContents>
        </ConceptWrapper>
    );
}