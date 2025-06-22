import React, { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import StepThroughCodeAnimation, { Step } from '../JavaScript/StepThroughCodeAnimation';
import PythonCodeSnippet from '@/components/common/PythonCodeSnippet';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import CodePartsExplanation from '@/components/common/CodePartsExplanation';

const andOrSteps: Step[] = [
    {
        label: 'If with and',
        desc: 'The <b>and</b> operator checks if <b>both</b> conditions are true.',
        highlight: 'if age > 18 and has_id:',
    },
    {
        label: 'If Block',
        desc: 'This code runs only if <b>age > 18</b> <b>and</b> <b>has_id</b> are both true.',
        highlight: '    print("You can enter")',
    },
    {
        label: 'Else Block',
        desc: 'If either condition is false, this code runs.',
        highlight: 'else:',
    },
    {
        label: 'Else Block',
        desc: 'This code runs if <b>age <= 18</b> or <b>has_id</b> is false.',
        highlight: '    print("Sorry, you cannot enter")',
    },
];

const orSteps: Step[] = [
    {
        label: 'If with or',
        desc: 'The <b>or</b> operator checks if <b>at least one</b> condition is true.',
        highlight: 'if is_weekend or is_holiday:',
    },
    {
        label: 'If Block',
        desc: 'This code runs if <b>is_weekend</b> <b>or</b> <b>is_holiday</b> is true.',
        highlight: '    print("You can sleep in!")',
    },
    {
        label: 'Else Block',
        desc: 'If both are false, this code runs.',
        highlight: 'else:',
    },
    {
        label: 'Else Block',
        desc: 'This code runs if <b>is_weekend</b> and <b>is_holiday</b> are both false.',
        highlight: '    print("Time to wake up early!")',
    },
];

// Interactive playground for AND/OR
function AndOrPlayground() {
    const [age, setAge] = useState(16);
    const [hasId, setHasId] = useState(false);

    const code = [
        `age = ${age}`,
        `has_id = ${hasId}`,
        'if age > 18 and has_id:',
        '    print("You can enter")',
        'else:',
        '    print("Sorry, you cannot enter")',
    ].join('\n');

    return (
        <Box sx={{ my: 2 }}>
            <div style={{ marginBottom: "24px" }}>
                <FormControl size="small" sx={{ minWidth: 120, mr: 2 }}>
                    <InputLabel id="age-select-label">Age</InputLabel>
                    <Select
                        labelId="age-select-label"
                        value={age}
                        label="Age"
                        onChange={e => setAge(Number(e.target.value))}
                    >
                        <MenuItem value={16}>16</MenuItem>
                        <MenuItem value={18}>18</MenuItem>
                        <MenuItem value={19}>19</MenuItem>
                        <MenuItem value={21}>21</MenuItem>
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel id="id-select-label">Has ID?</InputLabel>
                    <Select
                        labelId="id-select-label"
                        value={hasId ? 'yes' : 'no'}
                        label="Has ID?"
                        onChange={e => setHasId(e.target.value === 'yes')}
                    >
                        <MenuItem value="yes">Yes</MenuItem>
                        <MenuItem value="no">No</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <PythonCodeSnippet
                code={code}
                enableRun
                allowCopy
                showTerminal
            />
        </Box>
    );
}

function OrPlayground() {
    const [isWeekend, setIsWeekend] = useState(true);
    const [isHoliday, setIsHoliday] = useState(false);

    const code = [
        `is_weekend = ${isWeekend}`,
        `is_holiday = ${isHoliday}`,
        'if is_weekend or is_holiday:',
        '    print("You can sleep in!")',
        'else:',
        '    print("Time to wake up early!")',
    ].join('\n');

    return (
        <Box sx={{ my: 2 }}>
            <div style={{ marginBottom: "24px" }}>
                <FormControl size="small" sx={{ minWidth: 140, mr: 2 }}>
                    <InputLabel id="weekend-select-label">Weekend?</InputLabel>
                    <Select
                        labelId="weekend-select-label"
                        value={isWeekend ? 'yes' : 'no'}
                        label="Weekend?"
                        onChange={e => setIsWeekend(e.target.value === 'yes')}
                    >
                        <MenuItem value="yes">Yes</MenuItem>
                        <MenuItem value="no">No</MenuItem>
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 140 }}>
                    <InputLabel id="holiday-select-label">Holiday?</InputLabel>
                    <Select
                        labelId="holiday-select-label"
                        value={isHoliday ? 'yes' : 'no'}
                        label="Holiday?"
                        onChange={e => setIsHoliday(e.target.value === 'yes')}
                    >
                        <MenuItem value="yes">Yes</MenuItem>
                        <MenuItem value="no">No</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <PythonCodeSnippet
                code={code}
                enableRun
                allowCopy
                showTerminal
            />
        </Box>
    );
}

function TrueFalsePlayground() {
    const [color, setColor] = useState("blue");
    const [points, setPoints] = useState(7);

    const code = [
        `color = "${color}"`,
        `points = ${points}`,
        `print(color == "red")`,
        `print(points > 10)`,
    ].join('\n');

    return (
        <Box sx={{ my: 2 }}>
            <div style={{ marginBottom: 8 }}>
                Try changing the values below and see if the statements are <b>True</b> or <b>False</b>.
            </div>
            <div style={{ marginBottom: 16 }}>
                <FormControl size="small" sx={{ minWidth: 120, mr: 2 }}>
                    <InputLabel id="color-select-label">Color</InputLabel>
                    <Select
                        labelId="color-select-label"
                        value={color}
                        label="Color"
                        onChange={e => setColor(e.target.value)}
                    >
                        <MenuItem value="red">red</MenuItem>
                        <MenuItem value="blue">blue</MenuItem>
                        <MenuItem value="green">green</MenuItem>
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel id="points-select-label">Points</InputLabel>
                    <Select
                        labelId="points-select-label"
                        value={points}
                        label="Points"
                        onChange={e => setPoints(Number(e.target.value))}
                    >
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <PythonCodeSnippet
                code={code}
                enableRun
                allowCopy
                showTerminal
            />
        </Box>
    );
}

export default function LogicalAndOrConcept() {
    return (
        <ConceptWrapper
            title="Python Logical and / or"
            description="Logical operators let you combine conditions in your if statements."
        >
            <TableOfContents numbered>
                <Section
                    title="What are True and False Values?"
                >
                    <div style={{ marginBottom: 16 }}>
                        In Python, <b>True</b> and <b>False</b> are special values called <b>booleans</b>.<br /><br />
                        <b>True</b> means yes, it is correct, or it happened.<br />
                        <b>False</b> means no, it is not correct, or it did not happen.<br /><br />
                        You get <b>True</b> or <b>False</b> when you ask a question in code, like <code>5 == 5</code> (which is <b>True</b>) or <code>2 == 4</code> (which is <b>False</b>).
                    </div>
                    <div style={{ maxWidth: 500, marginBottom: 16 }}>
                        <CodePartsExplanation
                            code={`print(5 == 5)\nprint(2 == 4)`}
                            parts={[
                                {
                                    label: 'First Comparison',
                                    part: '5 == 5',
                                    color: '#4caf50',
                                    desc: '<b>5 == 5</b> is <b>True</b> because 5 is equal to 5.',
                                },
                                {
                                    label: 'Second Comparison',
                                    part: '2 == 4',
                                    color: '#f44336',
                                    desc: '<b>2 == 4</b> is <b>False</b> because 2 is not equal to 4.',
                                },
                            ]}
                        />
                    </div>
                    <div style={{ maxWidth: 600, marginBottom: 16 }}>
                        <CodePartsExplanation
                            code={`score = 12\nname = "Alex"\nprint(score == 12)\nprint(name == "Sam")`}
                            parts={[
                                {
                                    label: 'First Comparison',
                                    part: 'score == 12',
                                    color: '#1976d2',
                                    desc: '<b>score == 12</b> is <b>True</b> because score is 12.',
                                },
                                {
                                    label: 'Second Comparison',
                                    part: 'name == "Sam"',
                                    color: '#ff9800',
                                    desc: '<b>name == "Sam"</b> is <b>False</b> because name is "Alex".',
                                },
                            ]}
                        />
                    </div>
                    <div style={{ maxWidth: 600, marginBottom: 16 }}>
                        <TrueFalsePlayground />
                    </div>
                </Section>
                <Section
                    title="Using And"
                    subtitle="The and operator checks if multiple things are true"
                >
                    <div style={{ marginBottom: 16 }}>
                        <b>What does <code>and</code> do?</b>
                        <br />
                        The <b>and</b> operator lets you check if <b>all</b> conditions are true. If <b>every</b> part is true, the whole thing is true!
                        <br /><br />
                        For example, you might want to check if someone is over 18 <b>and</b> has an ID before letting them enter.
                    </div>
                    <StepThroughCodeAnimation
                        code={[
                            'age = 20',
                            'has_id = True',
                            'if age > 18 and has_id:',
                            '    print("You can enter")',
                            'else:',
                            '    print("Sorry, you cannot enter")',
                        ]}
                        steps={andOrSteps}
                    />
                    <Section
                        title="Try It Yourself: and"
                        subtitle="Change the values and run the code"
                    >
                        <AndOrPlayground />
                    </Section>
                </Section>
                <Section
                    title="Using Or"
                    subtitle="The or operator checks if at least one thing is true"
                >
                    <div style={{ marginBottom: 16 }}>
                        <b>What does <code>or</code> do?</b>
                        <br />
                        The <b>or</b> operator lets you check if <b>at least one</b> condition is true. If <b>any</b> part is true, the whole thing is true!
                        <br /><br />
                        For example, you might want to sleep in if it’s the weekend <b>or</b> a holiday.
                    </div>
                    <StepThroughCodeAnimation
                        code={[
                            'is_weekend = True',
                            'is_holiday = False',
                            'if is_weekend or is_holiday:',
                            '    print("You can sleep in!")',
                            'else:',
                            '    print("Time to wake up early!")',
                        ]}
                        steps={orSteps}
                    />
                    <Section
                        title="Try It Yourself: or"
                        subtitle="Change the values and run the code"
                    >
                        <OrPlayground />
                    </Section>
                </Section>
            </TableOfContents>
        </ConceptWrapper>
    );
}