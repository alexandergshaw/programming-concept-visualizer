'use client';

import { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '@/components/common/Section';
import CodeSnippet from '@/components/common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import OrderedList from '@/components/common/OrderedList';

export default function StringManipulationConcept() {
    const [name, setName] = useState('Alice');
    const [age, setAge] = useState('30');
    const [color, setColor] = useState('blue');

    const fString = `f"My name is ${name}, I am ${age} years old, and my favorite color is ${color}."`;
    const fStringOutput = `My name is ${name}, I am ${age} years old, and my favorite color is ${color}.`;

    const concatString = '"My name is " + name + ", I am " + age + " years old, and my favorite color is " + color + "."';
    const concatOutput = `My name is ${name}, I am ${age} years old, and my favorite color is ${color}.`;

    const formatString = '"My name is {}, I am {} years old, and my favorite color is {}.".format(name, age, color)';
    const formatOutput = `My name is ${name}, I am ${age} years old, and my favorite color is ${color}.`;

    return (
        <ConceptWrapper
            title="String Manipulation in Python"
            description="Python makes it easy to combine and format strings using f-strings, concatenation, and the format() method."
        >
            <TableOfContents>
                <Section
                    title="Ways to Combine and Format Strings"
                    subtitle="Let's look at three common ways to build strings in Python:"
                >
                    <OrderedList
                        items={[
                            'f-strings (recommended, Python 3.6+)',
                            'String concatenation with +',
                            'The format() method',
                        ]}
                    />
                    <Section
                        title="1. f-strings"
                        subtitle="Put an 'f' before the string and use curly braces {} to insert variables."
                    >
                        <CodeSnippet
                            lines={[
                                { code: `name = input("What is your name? ")`, comment: 'get user input for name' },
                                { code: `age = input("How old are you? ")`, comment: 'get user input for age' },
                                { code: `color = input("What is your favorite color? ")`, comment: 'get user input for color' },
                                { code: fString, comment: 'f-string with variables' },
                                { code: '', comment: `Output: ${fStringOutput}` },
                            ]}
                            language="python"
                        />
                    </Section>
                    <Section
                        title="2. String Concatenation"
                        subtitle="Use + to join strings and variables (convert numbers to strings if needed)."
                    >
                        <CodeSnippet
                            lines={[
                                { code: `name = input("What is your name? ")`, comment: 'get user input for name' },
                                { code: `age = input("How old are you? ")`, comment: 'get user input for age' },
                                { code: `color = input("What is your favorite color? ")`, comment: 'get user input for color' },
                                { code: concatString, comment: 'concatenation' },
                                { code: '', comment: `Output: ${concatOutput}` },
                            ]}
                            language="python"
                        />
                    </Section>
                    <Section
                        title="3. The format() Method"
                        subtitle="Use {} as placeholders and call .format() with your variables."
                    >
                        <CodeSnippet
                            lines={[
                                { code: `name = input("What is your name? ")`, comment: 'get user input for name' },
                                { code: `age = input("How old are you? ")`, comment: 'get user input for age' },
                                { code: `color = input("What is your favorite color? ")`, comment: 'get user input for color' },
                                { code: formatString, comment: 'using format()' },
                                { code: '', comment: `Output: ${formatOutput}` },
                            ]}
                            language="python"
                        />
                    </Section>
                </Section>
                <Section
                    title="Try It Yourself!"
                    subtitle="Change the values below and see how each method works:"
                >
                    <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                        <TextField
                            label="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            size="small"
                        />
                        <TextField
                            label="Age"
                            value={age}
                            onChange={e => setAge(e.target.value)}
                            size="small"
                        />
                        <TextField
                            label="Favorite Color"
                            value={color}
                            onChange={e => setColor(e.target.value)}
                            size="small"
                        />
                    </Box>
                    <Section title="f-string result">
                        <CodeSnippet
                            lines={[
                                { code: `name = "${name}"`, comment: 'variable from user input' },
                                { code: `age = "${age}"`, comment: 'variable from user input' },
                                { code: `color = "${color}"`, comment: 'variable from user input' },
                                { code: fString, comment: 'f-string' },
                                { code: '', comment: `Output: ${fStringOutput}` },
                            ]}
                            language="python"
                        />
                    </Section>
                    <Section title="Concatenation result">
                        <CodeSnippet
                            lines={[
                                { code: `name = "${name}"`, comment: 'variable from user input' },
                                { code: `age = "${age}"`, comment: 'variable from user input' },
                                { code: `color = "${color}"`, comment: 'variable from user input' },
                                { code: concatString, comment: 'concatenation' },
                                { code: '', comment: `Output: ${concatOutput}` },
                            ]}
                            language="python"
                        />
                    </Section>
                    <Section title="format() result">
                        <CodeSnippet
                            lines={[
                                { code: `name = "${name}"`, comment: 'variable from user input' },
                                { code: `age = "${age}"`, comment: 'variable from user input' },
                                { code: `color = "${color}"`, comment: 'variable from user input' },
                                { code: formatString, comment: 'format()' },
                                { code: '', comment: `Output: ${formatOutput}` },
                            ]}
                            language="python"
                        />
                    </Section>
                </Section>
            </TableOfContents>
        </ConceptWrapper>
    )
}