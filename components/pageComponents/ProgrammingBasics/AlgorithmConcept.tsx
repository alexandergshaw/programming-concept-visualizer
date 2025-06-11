'use client';

import { useState } from 'react';
import { Box, Typography, Paper, Button, TextField } from '@mui/material';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import CalculateIcon from '@mui/icons-material/Calculate';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';

export default function AlgorithmConcept() {
    const [step, setStep] = useState(0);
    const [inputTotal, setInputTotal] = useState('');
    const [inputTip, setInputTip] = useState('');
    const [inputPeople, setInputPeople] = useState('');
    const [current, setCurrent] = useState<number | null>(null);
    const [history, setHistory] = useState<number[]>([]);
    const [result, setResult] = useState<number | null>(null);
    const [algoStep, setAlgoStep] = useState(1);

    // Algorithm steps and code lines
    const algoSteps = [
        'Start with the total bill (including tip).',
        'Calculate the tip amount: tip = total × (tip % / 100)',
        'Subtract the tip from the total: subtotal = total - tip',
        'Divide the subtotal by the number of people: split = subtotal / people',
        'The result is what each person pays for their meal!',
    ];
    const codeLines = [
        'function splitBill(total, tipPercent, people) {',
        '    let tipAmount = total * (tipPercent / 100);',
        '    let subtotal = total - tipAmount;',
        '    let split = subtotal / people;',
        '    return split;',
        '}',
    ];

    // Interactive demo logic
    const handleNext = () => {
        if (step === 0) {
            const total = parseFloat(inputTotal);
            const tip = parseFloat(inputTip);
            const people = parseInt(inputPeople);
            if (!isNaN(total) && !isNaN(tip) && !isNaN(people) && people > 0) {
                setCurrent(total);
                setHistory([total]);
                setStep(1);
            }
        } else if (step === 1 && current !== null) {
            const total = parseFloat(inputTotal);
            const tip = parseFloat(inputTip);
            const tipAmount = total * (tip / 100);
            const subtotal = total - tipAmount;
            setCurrent(subtotal);
            setHistory(h => [...h, subtotal]);
            setStep(2);
        } else if (step === 2 && current !== null) {
            const people = parseInt(inputPeople);
            if (people > 0) {
                const split = current / people;
                setCurrent(split);
                setHistory(h => [...h, split]);
                setResult(split);
                setStep(3);
            }
        }
    };

    const handleReset = () => {
        setStep(0);
        setInputTotal('');
        setInputTip('');
        setInputPeople('');
        setCurrent(null);
        setHistory([]);
        setResult(null);
    };

    return (
        <ConceptWrapper
            title="What is an Algorithm?"
            description="An algorithm is a step-by-step set of instructions for solving a problem or completing a task."
        >
            <Section
                title="Why Are Algorithms Important?"
                subtitle="Algorithms are the foundation of all programming. They help us solve problems in a logical, step-by-step way."
            >
                <Box sx={{ maxWidth: 600, mx: 'auto', my: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <CalculateIcon sx={{ color: '#1976d2', fontSize: 32, mr: 2, mt: '2px' }} />
                        <Typography>
                            Computers need every step spelled out clearly and precisely.
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <ListAltIcon sx={{ color: '#388e3c', fontSize: 32, mr: 2, mt: '2px' }} />
                        <Typography>
                            That's why, before you write any code, you break your problem down into an algorithm: a sequence of simple, logical steps.
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <CheckCircleIcon sx={{ color: '#fbc02d', fontSize: 32, mr: 2, mt: '2px' }} />
                        <Typography>
                            By thinking through each step, you make sure your program works for any input and is easy to debug.
                        </Typography>
                    </Box>
                </Box>
            </Section>
            <Section
                title="Problem: Splitting a Meal (with a Generous Friend)"
                subtitle="Let's explore an example of how an algorithm can help us solve a problem."
            >
                <Box sx={{ maxWidth: 600, mx: 'auto', my: 2 }}>
                    <Paper sx={{ p: 2, bgcolor: '#fffde7', border: '2px solid #ffe082' }}>
                        <Typography sx={{ mb: 1 }}>
                            <b>Task:</b> You and your friends went out to eat. The bill comes, and your friend offers to pay the entire tip.
                            <ul style={{ margin: 0, paddingLeft: 24 }}>
                                <li>Given the <b>total bill (including tip)</b></li>
                                <li>The <b>tip percentage</b></li>
                                <li>The <b>number of people</b> (everyone had an equal meal)</li>
                            </ul>
                            How much does each person (except your friend) need to pay for their meal (not including tip)?
                        </Typography>
                    </Paper>
                </Box>
            </Section>
            <Section
                title="Break It Down: The Algorithm"
                subtitle="We can describe how to solve this problem step-by-step."
            >
                <Box sx={{ maxWidth: 600, mx: 'auto', my: 2 }}>
                    <Paper sx={{ p: 2, bgcolor: '#e3f2fd', border: '2px solid #90caf9' }}>
                        <ol style={{ margin: 0, paddingLeft: 20 }}>
                            {algoSteps.map((text, idx) => (
                                <li
                                    key={idx}
                                    style={{
                                        background: algoStep === idx + 1 ? '#fffde7' : 'transparent',
                                        fontWeight: algoStep === idx + 1 ? 700 : 400,
                                        transition: 'background 0.3s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: 8
                                    }}
                                >
                                    {/* Visuals for each step, describing the math */}
                                    {idx === 0 && (
                                        <>
                                            <CalculateIcon sx={{ color: '#1976d2', fontSize: 24, mr: 1 }} />
                                            <Typography component="span" sx={{ fontWeight: 500, mr: 1 }}>
                                                (Start) — <span style={{ color: '#1976d2' }}>This is the total amount you see on the bill, including the tip.</span>
                                            </Typography>
                                        </>
                                    )}
                                    {idx === 1 && (
                                        <>
                                            <AutoAwesomeMotionIcon sx={{ color: '#8e24aa', fontSize: 24, mr: 1 }} />
                                            <Typography component="span" sx={{ fontWeight: 500, mr: 1 }}>
                                                (×, %) — <span style={{ color: '#8e24aa' }}>Calculate just the tip part by multiplying the total by the tip percentage.</span>
                                            </Typography>
                                        </>
                                    )}
                                    {idx === 2 && (
                                        <>
                                            <ListAltIcon sx={{ color: '#388e3c', fontSize: 24, mr: 1 }} />
                                            <Typography component="span" sx={{ fontWeight: 500, mr: 1 }}>
                                                (−) — <span style={{ color: '#388e3c' }}>Subtract the tip from the total to find out how much the food actually cost.</span>
                                            </Typography>
                                        </>
                                    )}
                                    {idx === 3 && (
                                        <>
                                            <CheckCircleIcon sx={{ color: '#fbc02d', fontSize: 24, mr: 1 }} />
                                            <Typography component="span" sx={{ fontWeight: 500, mr: 1 }}>
                                                (÷) — <span style={{ color: '#fbc02d' }}>Divide the meal cost by the number of people to see what each person owes.</span>
                                            </Typography>
                                        </>
                                    )}
                                    {idx === 4 && (
                                        <>
                                            <ArrowRightAltIcon sx={{ color: '#ff7043', fontSize: 24, mr: 1 }} />
                                            <Typography component="span" sx={{ fontWeight: 500, mr: 1 }}>
                                                (=) — <span style={{ color: '#ff7043' }}>Now you know exactly what each person should pay (not including tip)!</span>
                                            </Typography>
                                        </>
                                    )}
                                    {text}
                                    {algoStep === idx + 1 && (
                                        <ArrowRightAltIcon sx={{ color: '#fbc02d', ml: 1, verticalAlign: 'middle' }} />
                                    )}
                                </li>
                            ))}
                        </ol>
                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setAlgoStep(s => Math.min(s + 1, algoSteps.length))}
                                disabled={algoStep >= algoSteps.length}
                            >
                                {algoStep < algoSteps.length ? 'Next Step' : 'Done'}
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => setAlgoStep(1)}
                                disabled={algoStep === 1}
                            >
                                Reset
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Section>
            <Section
                title="From Algorithm to Program"
                subtitle="Watch how each step of the algorithm becomes a line of code!"
            >
                <Box sx={{ maxWidth: 700, mx: 'auto', my: 2 }}>
                    <Paper sx={{ p: 2, bgcolor: '#e8f5e9', border: '2px solid #81c784' }}>
                        <Typography sx={{ mb: 2 }}>
                            Step through the algorithm and see how each step is translated into JavaScript code. The highlighted algorithm step matches the highlighted code line.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            {/* Algorithm Steps */}
                            <Box sx={{ flex: 1, minWidth: 260 }}>
                                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
                                    Algorithm Steps
                                </Typography>
                                <ol style={{ margin: 0, paddingLeft: 20 }}>
                                    {algoSteps.map((text, idx) => (
                                        <li
                                            key={idx}
                                            style={{
                                                background: algoStep === idx + 1 ? '#fffde7' : 'transparent',
                                                fontWeight: algoStep === idx + 1 ? 700 : 400,
                                                transition: 'background 0.3s'
                                            }}
                                        >
                                            {text}
                                            {algoStep === idx + 1 && (
                                                <ArrowRightAltIcon sx={{ color: '#fbc02d', ml: 1, verticalAlign: 'middle' }} />
                                            )}
                                        </li>
                                    ))}
                                </ol>
                                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setAlgoStep(s => Math.min(s + 1, algoSteps.length))}
                                        disabled={algoStep >= algoSteps.length}
                                    >
                                        {algoStep < algoSteps.length ? 'Next Step' : 'Done'}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setAlgoStep(1)}
                                        disabled={algoStep === 1}
                                    >
                                        Reset
                                    </Button>
                                </Box>
                            </Box>
                            {/* Code Lines */}
                            <Box sx={{ flex: 1, minWidth: 320 }}>
                                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
                                    Program Code
                                </Typography>
                                <Paper sx={{ p: 2, bgcolor: '#f1f8e9', fontFamily: 'monospace', fontSize: 15, whiteSpace: 'pre-line' }}>
                                    {codeLines.map((line, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                background:
                                                    idx === algoStep
                                                        ? '#fffde7'
                                                        : 'transparent',
                                                fontWeight:
                                                    idx === algoStep
                                                        ? 700
                                                        : 400,
                                                transition: 'background 0.3s'
                                            }}
                                        >
                                            {line}
                                        </div>
                                    ))}
                                </Paper>
                            </Box>
                        </Box>
                        <Typography sx={{ mt: 2 }}>
                            Each algorithm step becomes a line of code. Step through to see the transformation!
                        </Typography>
                    </Paper>
                </Box>
            </Section>
            <Section
                title="Try It Yourself"
                subtitle="Follow each step and see how much each person pays!"
            >
                <Box sx={{ maxWidth: 600, mx: 'auto', my: 3 }}>
                    <Paper sx={{ p: 3, bgcolor: '#f3e5f5', border: '2px solid #ce93d8' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <AutoAwesomeMotionIcon sx={{ fontSize: 48, color: '#8e24aa', mr: 2 }} />
                            <Typography variant="h5" fontWeight={700}>
                                Interactive Algorithm Demo
                            </Typography>
                        </Box>
                        <ol style={{ margin: 0, paddingLeft: 20, marginBottom: 16 }}>
                            <li>Enter the total bill (including tip), tip percentage, and number of people.</li>
                            <li>Remove the tip (your friend covers it).</li>
                            <li>Divide the remaining amount by the number of people.</li>
                            <li>See how much each person pays!</li>
                        </ol>
                        {step === 0 && (
                            <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField
                                    label="Total bill (with tip)"
                                    value={inputTotal}
                                    onChange={e => setInputTotal(e.target.value)}
                                    type="number"
                                    size="small"
                                />
                                <TextField
                                    label="Tip percentage"
                                    value={inputTip}
                                    onChange={e => setInputTip(e.target.value)}
                                    type="number"
                                    size="small"
                                />
                                <TextField
                                    label="Number of people"
                                    value={inputPeople}
                                    onChange={e => setInputPeople(e.target.value)}
                                    type="number"
                                    size="small"
                                />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleNext}
                                    disabled={
                                        inputTotal.trim() === '' ||
                                        isNaN(Number(inputTotal)) ||
                                        inputTip.trim() === '' ||
                                        isNaN(Number(inputTip)) ||
                                        inputPeople.trim() === '' ||
                                        isNaN(Number(inputPeople)) ||
                                        parseInt(inputPeople) <= 0
                                    }
                                >
                                    Start
                                </Button>
                            </Box>
                        )}
                        {step > 0 && step < 4 && (
                            <Box sx={{ mb: 2 }}>
                                <Typography>
                                    {step === 1 && (
                                        <>Subtotal (without tip): <b>{history[1] !== undefined ? `$${history[1].toFixed(2)}` : ''}</b></>
                                    )}
                                    {step === 2 && (
                                        <>Each person pays: <b>{history[2] !== undefined ? `$${history[2].toFixed(2)}` : ''}</b></>
                                    )}
                                </Typography>
                                <Button variant="contained" color="secondary" onClick={handleNext}>
                                    Next Step
                                </Button>
                            </Box>
                        )}
                        {step === 3 && result !== null && (
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="h6" color="primary">
                                    Each person pays: <b>${result.toFixed(2)}</b>
                                </Typography>
                                <Box sx={{ mt: 1, mb: 1 }}>
                                    <Typography variant="caption" color="text.secondary">
                                        Full calculation: {history.map((val, i) => (
                                            <span key={i}>
                                                {i === 0 && `Total: $${val.toFixed(2)} `}
                                                {i === 1 && `→ Subtotal: $${val.toFixed(2)} `}
                                                {i === 2 && `→ Split: $${val.toFixed(2)}`}
                                            </span>
                                        ))}
                                    </Typography>
                                </Box>
                                <Button variant="outlined" onClick={handleReset} sx={{ mt: 1 }}>
                                    Try Another
                                </Button>
                            </Box>
                        )}
                    </Paper>
                </Box>
            </Section>
        </ConceptWrapper>
    );
}