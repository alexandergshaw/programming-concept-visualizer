'use client';

import { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import TextField from '@mui/material/TextField';
import '../../../styles/variable.css';
import Section from '@/components/common/Section';
import CodeSnippet from '@/components/common/CodeSnippet';
import OrderedList from '@/components/common/OrderedList';
import TableOfContents from '@/components/common/TableOfContents';
import IfElseOrderAnimation from './IfStatementAnimation';
import IfElseIfElseOrderAnimation from './IfElseIfElseAnimation';

const highlightColor = '#1976d2';
const trueColor = '#43a047';
const falseColor = '#e53935';

export default function ConditionalConcept() {
    const [a, setA] = useState(25);
    const [b, setB] = useState(18);
    const [userOperator, setUserOperator] = useState('>');
    const [userIfValue, setUserIfValue] = useState('You are eligible for a license');
    const [userElseValue, setUserElseValue] = useState('You are NOT eligible for a license');
    const [showElse, setShowElse] = useState(true);

    const [money, setMoney] = useState(10);
    const [ticket, setTicket] = useState(15);
    const [moneyIfMsg, setMoneyIfMsg] = useState("You can buy the ticket!");
    const [moneyElseMsg, setMoneyElseMsg] = useState("You need more money.");
    const [showElseMoney, setShowElseMoney] = useState(true);

    const [score, setScore] = useState(75);
    const [passMsg, setPassMsg] = useState("You passed!");
    const [almostMsg, setAlmostMsg] = useState("Almost! Study a bit more.");
    const [failMsg, setFailMsg] = useState("You did not pass.");
    const [perfectMsg, setPerfectMsg] = useState("Perfect score!");

    const operators = [
        { label: '>', value: '>' },
        { label: '<', value: '<' },
        { label: '===', value: '===' },
        { label: '!==', value: '!==' },
        { label: '>=', value: '>=' },
        { label: '<=', value: '<=' },
    ];

    // Evaluate the condition
    let conditionResult = false;
    switch (userOperator) {
        case '>': conditionResult = a > b; break;
        case '<': conditionResult = a < b; break;
        case '===': conditionResult = a === b; break;
        case '!==': conditionResult = a !== b; break;
        case '>=': conditionResult = a >= b; break;
        case '<=': conditionResult = a <= b; break;
    }

    const moneyResult = money >= ticket;

    return (
        <ConceptWrapper
            title="Conditionals in JavaScript"
            description="Conditionals let us run different code depending on whether something is true or false. The most common conditional is the if statement."
        >
            <TableOfContents>
                <Section title="1. What is a Conditional?" subtitle="A conditional checks if something is true or false, and runs code based on that.">
                    <CodeSnippet
                        lines={[
                            { code: `if (a > b) {`, comment: 'if a is greater than b...' },
                            { code: ``, comment: 'this code runs if the condition is true' },
                            { code: `} else {` },
                            { code: ``, comment: 'this code runs if the condition is false' },
                            { code: `}` },
                        ]}
                    />
                    <Section title="1a. Visualizing Conditionals">
                        <IfElseOrderAnimation/>
                    </Section>
                </Section>
                <Section
                    title="2. Try It Yourself"
                    subtitle={`Suppose you need to be at least ${b} years old to get a driver's license. Change the age and see what happens!`}
                >
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                        <TextField
                            label="Your Age"
                            size="small"
                            type="number"
                            value={a}
                            onChange={e => setA(Number(e.target.value))}
                        />
                        <TextField
                            label="Required Age"
                            size="small"
                            type="number"
                            value={b}
                            onChange={e => setB(Number(e.target.value))}
                        />
                    </div>
                    <TextField
                        label='If True Message'
                        size="small"
                        value={userIfValue}
                        onChange={e => setUserIfValue(e.target.value)}
                        sx={{ mr: 2, mb: 1 }}
                    />
                    <TextField
                        label='Else Message'
                        size="small"
                        value={userElseValue}
                        onChange={e => setUserElseValue(e.target.value)}
                        sx={{ mb: 1 }}
                        disabled={!showElse}
                    />
                    <CodeSnippet
                        enableRun
                        lines={[
                            { code: `let yourAge = ${a};` },
                            { code: `let requiredAge = ${b};` },
                            { code: `if (yourAge >= requiredAge) {` },
                            { code: `  console.log("${userIfValue}");` },
                            ...(showElse ? [
                                { code: `} else {` },
                                { code: `  console.log("${userElseValue}");` },
                            ] : []),
                            { code: `}` },
                        ]}
                    />
                </Section>
                <Section
                    title="3. Another Real Life Example"
                    subtitle="Let's check if you have enough money to buy a ticket!"
                >
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                        <TextField
                            label="Your Money ($)"
                            size="small"
                            type="number"
                            value={money ?? 10}
                            onChange={e => setMoney(Number(e.target.value))}
                        />
                        <TextField
                            label="Ticket Price ($)"
                            size="small"
                            type="number"
                            value={ticket ?? 15}
                            onChange={e => setTicket(Number(e.target.value))}
                        />
                    </div>
                    <TextField
                        label='If True Message'
                        size="small"
                        value={moneyIfMsg ?? "You can buy the ticket!"}
                        onChange={e => setMoneyIfMsg(e.target.value)}
                        sx={{ mr: 2, mb: 1 }}
                    />
                    <TextField
                        label='Else Message'
                        size="small"
                        value={moneyElseMsg ?? "You need more money."}
                        onChange={e => setMoneyElseMsg(e.target.value)}
                        sx={{ mb: 1 }}
                        disabled={!showElseMoney}
                    />
                    <CodeSnippet
                        enableRun
                        lines={[
                            { code: `let yourMoney = ${money};` },
                            { code: `let ticketPrice = ${ticket};` },
                            { code: `if (yourMoney >= ticketPrice) {` },
                            { code: `  console.log("${moneyIfMsg}");` },
                            ...(showElseMoney ? [
                                { code: `} else {` },
                                { code: `  console.log("${moneyElseMsg}");` },
                            ] : []),
                            { code: `}` },
                        ]}
                    />
                </Section>
                <Section
                    title="4. Multiple Conditions: if, else if, else"
                    subtitle="Sometimes there are multiple conditions we want to check for. We can do so by chaining if, else if, and else statements."
                >
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                        <TextField
                            label="Your Score"
                            size="small"
                            type="number"
                            value={score}
                            onChange={e => setScore(Number(e.target.value))}
                        />
                    </div>
                    <TextField
                        label='Perfect Score Message'
                        size="small"
                        value={perfectMsg}
                        onChange={e => setPerfectMsg(e.target.value)}
                        sx={{ mr: 2, mb: 1 }}
                    />
                    <TextField
                        label='Pass Message'
                        size="small"
                        value={passMsg}
                        onChange={e => setPassMsg(e.target.value)}
                        sx={{ mr: 2, mb: 1 }}
                    />
                    <TextField
                        label='Almost Message'
                        size="small"
                        value={almostMsg}
                        onChange={e => setAlmostMsg(e.target.value)}
                        sx={{ mr: 2, mb: 1 }}
                    />
                    <TextField
                        label='Fail Message'
                        size="small"
                        value={failMsg}
                        onChange={e => setFailMsg(e.target.value)}
                        sx={{ mb: 1 }}
                    />
                    <CodeSnippet
                        enableRun
                        lines={[
                            { code: `let score = ${score};` },
                            { code: `if (score === 100) {` },
                            { code: `  console.log("${perfectMsg}");` },
                            { code: `} else if (score >= 60) {` },
                            { code: `  console.log("${passMsg}");` },
                            { code: `} else if (score >= 50) {` },
                            { code: `  console.log("${almostMsg}");` },
                            { code: `} else {` },
                            { code: `  console.log("${failMsg}");` },
                            { code: `}` },
                        ]}
                    />
                    <Section title="4a. Visualizing Multiple Conditions">
                        <IfElseIfElseOrderAnimation/>
                    </Section>
                </Section>
            </TableOfContents>
        </ConceptWrapper>
    );
}