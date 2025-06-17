'use client';

import { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '@/components/common/Section';
import PythonCodeSnippet from '@/components/common/PythonCodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import OrderedList from '@/components/common/OrderedList';

export default function StringManipulationConcept() {
    const [name, setName] = useState('Alice');
    const [age, setAge] = useState('30');
    const [color, setColor] = useState('blue');

    // Improved, more natural output
    const fString = `f"Hi {name}! You are {age} years old and your favorite color is {color}."`;

    const concatString = '"Hi " + name + "! You are " + age + " years old and your favorite color is " + color + "."';

    const formatString = '"Hi {}! You are {} years old and your favorite color is {}.".format(name, age, color)';

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
                        <PythonCodeSnippet
                            lines={[
                                { code: `name = input("What is your name? ")`, comment: 'get user input for name' },
                                { code: ` ` },
                                { code: `age = input("How old are you? ")`, comment: 'get user input for age' },
                                { code: ` ` },
                                { code: `color = input("What is your favorite color? ")`, comment: 'get user input for color' },
                                { code: ` ` },
                                { code: fString, comment: 'f-string with variables' },
                                { code: ` ` },
                                { code: `print(f"Hi {name}! You are {age} years old and your favorite color is {color}.")`, comment: 'print the formatted string' },
                            ]}
                        />
                    </Section>
                    <Section
                        title="2. String Concatenation"
                        subtitle="Use + to join strings and variables (convert numbers to strings if needed)."
                    >
                        <PythonCodeSnippet
                            lines={[
                                { code: `name = input("What is your name? ")`, comment: 'get user input for name' },
                                { code: ` ` },
                                { code: `age = input("How old are you? ")`, comment: 'get user input for age' },
                                { code: ` ` },
                                { code: `color = input("What is your favorite color? ")`, comment: 'get user input for color' },
                                { code: ` ` },
                                { code: concatString, comment: 'concatenation with +' },
                                { code: ` ` },
                                { code: `print("Hi " + name + "! You are " + age + " years old and your favorite color is " + color + ".")`, comment: 'print the concatenated string' },
                            ]}
                        />
                    </Section>
                    <Section
                        title="3. The format() Method"
                        subtitle="Use {} as placeholders and call .format() with your variables."
                    >
                        <PythonCodeSnippet
                            lines={[
                                { code: `name = input("What is your name? ")`, comment: 'get user input for name' },
                                { code: ` ` },
                                { code: `age = input("How old are you? ")`, comment: 'get user input for age' },
                                { code: ` ` },
                                { code: `color = input("What is your favorite color? ")`, comment: 'get user input for color' },
                                { code: ` ` },
                                { code: formatString, comment: 'using format()' },
                                { code: ` ` },
                                { code: `print("Hi {}! You are {} years old and your favorite color is {}.".format(name, age, color))`, comment: 'print the formatted string' },
                            ]}
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
                        <PythonCodeSnippet
                            lines={[
                                { code: `name = "${name}"`, comment: 'variable from user input' },
                                { code: ` ` },

                                { code: `age = "${age}"`, comment: 'variable from user input' },
                                { code: ` ` },

                                { code: `color = "${color}"`, comment: 'variable from user input' },
                                { code: ` ` },

                                { code: `print(f"Hi {name}! You are {age} years old and your favorite color is {color}.")`, comment: 'print the result' },
                            ]}
                            enableRun
                        />
                    </Section>
                    <Section title="Concatenation result">
                        <PythonCodeSnippet
                            lines={[
                                { code: `name = "${name}"`, comment: 'variable from user input' },
                                { code: ` ` },
                                { code: `age = "${age}"`, comment: 'variable from user input' },
                                { code: ` ` },
                                { code: `color = "${color}"`, comment: 'variable from user input' },
                                { code: ` ` },
                                { code: `print("Hi " + name + "! You are " + age + " years old and your favorite color is " + color + ".")`, comment: 'print the result' },
                            ]}
                            enableRun
                        />
                    </Section>
                    <Section title="format() result">
                        <PythonCodeSnippet
                            lines={[
                                { code: `name = "${name}"`, comment: 'variable from user input' },
                                { code: ` ` },
                                { code: `age = "${age}"`, comment: 'variable from user input' },
                                { code: ` ` },
                                { code: `color = "${color}"`, comment: 'variable from user input' },
                                { code: ` ` },
                                { code: `print("Hi {}! You are {} years old and your favorite color is {}.".format(name, age, color))`, comment: 'print the result' },
                            ]}
                            enableRun
                        />
                    </Section>
                </Section>
            </TableOfContents>
        </ConceptWrapper>
    )
}