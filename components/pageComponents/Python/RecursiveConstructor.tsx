import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ReplayIcon from '@mui/icons-material/Replay';
import CodeIcon from '@mui/icons-material/Code';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import StepThroughCodeAnimation, { Step } from '../JavaScript/StepThroughCodeAnimation';

const RecursiveConstructor: React.FC = () => {
    const [problem, setProblem] = useState('factorial');
    const [step, setStep] = useState(1);
    const [userInput, setUserInput] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [showSolution, setShowSolution] = useState(false);

    // Reset when problem changes
    React.useEffect(() => {
        setStep(1);
        setUserInput('');
        setShowHint(false);
        setShowSolution(false);
    }, [problem]);

    const problems = {
        factorial: {
            title: 'Factorial (n!)',
            description: 'Calculate the product of a number and all positive integers below it.',
            example: 'factorial(4) = 4 × 3 × 2 × 1 = 24',
            fullSolution: 'def factorial(n):\n    if n == 1:\n        return 1\n    else:\n        return n * factorial(n-1)',
            solutionSteps: [
                {
                    label: 'Define the function',
                    desc: 'Start by defining the function with its parameter <b>n</b>.',
                    highlight: 'def factorial(n):',
                    outputLine: '',
                },
                {
                    label: 'Add the base case',
                    desc: 'When <b>n = 1</b>, we return 1 directly. This is our stopping condition.',
                    highlight: 'if n == 1:\n        return 1',
                    outputLine: '',
                },
                {
                    label: 'Add the recursive case',
                    desc: 'For any other value, we multiply <b>n</b> by the factorial of <b>n-1</b>.',
                    highlight: 'return n * factorial(n-1)',
                    outputLine: '',
                },
                {
                    label: 'Complete function',
                    desc: 'The complete factorial function handles any positive integer input by breaking it down.',
                    highlight: () => { return true; },
                    outputLine: 'factorial(4) = 24',
                },
            ],
            steps: [
                {
                    instruction: 'Define the base case: When should the recursion stop?',
                    hint: 'The factorial of 1 is just 1. So when n is 1, we can directly return 1 without any further recursion.',
                    solution: 'if n == 1:\n    return 1',
                },
                {
                    instruction: 'Define the recursive case: How can we break this into a smaller problem?',
                    hint: 'For factorial(n), we can calculate n × factorial(n-1).',
                    solution: 'return n * factorial(n-1)',
                },
                {
                    instruction: 'Put it all together into a complete function',
                    hint: 'Combine the base case and recursive case into a complete function with proper indentation.',
                    solution: 'def factorial(n):\n    if n == 1:\n        return 1\n    else:\n        return n * factorial(n-1)',
                }
            ]
        },
        sum: {
            title: 'Sum of Numbers (1 to n)',
            description: 'Calculate the sum of all integers from 1 to n.',
            example: 'sum_to_n(4) = 1 + 2 + 3 + 4 = 10',
            fullSolution: 'def sum_to_n(n):\n    if n == 1:\n        return 1\n    else:\n        return n + sum_to_n(n-1)',
            solutionSteps: [
                {
                    label: 'Define the function',
                    desc: 'Start by defining the function with its parameter <b>n</b>.',
                    highlight: 'def sum_to_n(n):',
                    outputLine: '',
                },
                {
                    label: 'Add the base case',
                    desc: 'When <b>n = 1</b>, we return 1 directly. This is our stopping condition.',
                    highlight: 'if n == 1:\n        return 1',
                    outputLine: '',
                },
                {
                    label: 'Add the recursive case',
                    desc: 'For any other value, we add <b>n</b> to the sum of numbers from 1 to <b>n-1</b>.',
                    highlight: 'return n + sum_to_n(n-1)',
                    outputLine: '',
                },
                {
                    label: 'Complete function',
                    desc: 'The complete sum_to_n function adds up all numbers from 1 to n by breaking it down.',
                    highlight: () => { return true; },
                    outputLine: 'sum_to_n(4) = 10',
                },
            ],
            steps: [
                {
                    instruction: 'Define the base case: When should the recursion stop?',
                    hint: 'The sum of numbers up to 1 is just 1. So when n is 1, we can directly return 1.',
                    solution: 'if n == 1:\n    return 1',
                },
                {
                    instruction: 'Define the recursive case: How can we break this into a smaller problem?',
                    hint: 'For sum_to_n(n), we can calculate n + sum_to_n(n-1).',
                    solution: 'return n + sum_to_n(n-1)',
                },
                {
                    instruction: 'Put it all together into a complete function',
                    hint: 'Combine the base case and recursive case into a complete function with proper indentation.',
                    solution: 'def sum_to_n(n):\n    if n == 1:\n        return 1\n    else:\n        return n + sum_to_n(n-1)',
                }
            ]
        },
        fibonacci: {
            title: 'Fibonacci Sequence',
            description: 'Calculate the nth Fibonacci number where each number is the sum of the two preceding ones.',
            example: 'fibonacci(5) = fibonacci(4) + fibonacci(3) = 5\nThe sequence starts: 0, 1, 1, 2, 3, 5, 8, ...',
            fullSolution: 'def fibonacci(n):\n    if n <= 1:\n        return n\n    else:\n        return fibonacci(n-1) + fibonacci(n-2)',
            solutionSteps: [
                {
                    label: 'Define the function',
                    desc: 'Start by defining the function with its parameter <b>n</b>.',
                    highlight: 'def fibonacci(n):',
                    outputLine: '',
                },
                {
                    label: 'Add the base cases',
                    desc: 'Fibonacci has two base cases: <b>fib(0) = 0</b> and <b>fib(1) = 1</b>. We handle both with one condition.',
                    highlight: 'if n <= 1:\n        return n',
                    outputLine: '',
                },
                {
                    label: 'Add the recursive case',
                    desc: 'Each Fibonacci number is the sum of the two previous numbers in the sequence.',
                    highlight: 'return fibonacci(n-1) + fibonacci(n-2)',
                    outputLine: '',
                },
                {
                    label: 'Complete function',
                    desc: 'The complete fibonacci function calculates any Fibonacci number by breaking it down to its base cases.',
                    highlight: () => { return true; },
                    outputLine: 'fibonacci(5) = 5',
                },
            ],
            steps: [
                {
                    instruction: 'Define the base case: When should the recursion stop?',
                    hint: 'For Fibonacci, we have two base cases: fibonacci(0) = 0 and fibonacci(1) = 1',
                    solution: 'if n <= 1:\n    return n',
                },
                {
                    instruction: 'Define the recursive case: How can we break this into a smaller problem?',
                    hint: 'Each Fibonacci number is the sum of the previous two numbers in the sequence.',
                    solution: 'return fibonacci(n-1) + fibonacci(n-2)',
                },
                {
                    instruction: 'Put it all together into a complete function',
                    hint: 'Combine the base case and recursive case into a complete function with proper indentation.',
                    solution: 'def fibonacci(n):\n    if n <= 1:\n        return n\n    else:\n        return fibonacci(n-1) + fibonacci(n-2)',
                }
            ]
        }
    };

    const currentProblem = problems[problem as keyof typeof problems];
    const currentStep = currentProblem.steps[step - 1];

    const checkStep = () => {
        // Simple check - we're not doing exact syntax checking, just basic verification
        const solution = currentStep.solution.trim();
        const input = userInput.trim();

        if (input.includes(solution.split('\n')[0].trim())) {
            if (step < currentProblem.steps.length) {
                setStep(step + 1);
                setUserInput('');
                setShowHint(false);
            }
        } else {
            setShowHint(true);
        }
    };

    const resetExercise = () => {
        setStep(1);
        setUserInput('');
        setShowHint(false);
    };

    const renderVisualization = () => {
        if (problem === 'factorial') {
            return (
                <ConceptInfoCard>
                    <Typography variant="h6" fontWeight={600} gutterBottom>Visualizing factorial(4)</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        <Paper sx={{ p: 1, width: '200px' }}>factorial(4) = 4 × factorial(3)</Paper>
                        <ArrowDownwardIcon />
                        <Paper sx={{ p: 1, width: '200px' }}>factorial(3) = 3 × factorial(2)</Paper>
                        <ArrowDownwardIcon />
                        <Paper sx={{ p: 1, width: '200px' }}>factorial(2) = 2 × factorial(1)</Paper>
                        <ArrowDownwardIcon />
                        <Paper sx={{ p: 1, width: '200px', bgcolor: '#e3f2fd' }}>factorial(1) = 1 (base case)</Paper>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mt: 2 }}>
                            <Typography fontWeight={500}>Now we unwind and calculate:</Typography>
                            <Paper sx={{ p: 1, width: '200px' }}>factorial(2) = 2 × 1 = 2</Paper>
                            <ArrowDownwardIcon />
                            <Paper sx={{ p: 1, width: '200px' }}>factorial(3) = 3 × 2 = 6</Paper>
                            <ArrowDownwardIcon />
                            <Paper sx={{ p: 1, width: '200px' }}>factorial(4) = 4 × 6 = 24</Paper>
                        </Box>
                    </Box>
                </ConceptInfoCard>
            );
        } else if (problem === 'sum') {
            return (
                <ConceptInfoCard>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>Visualizing sum_to_n(4)</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        <Paper sx={{ p: 1, width: '200px' }}>sum_to_n(4) = 4 + sum_to_n(3)</Paper>
                        <ArrowDownwardIcon />
                        <Paper sx={{ p: 1, width: '200px' }}>sum_to_n(3) = 3 + sum_to_n(2)</Paper>
                        <ArrowDownwardIcon />
                        <Paper sx={{ p: 1, width: '200px' }}>sum_to_n(2) = 2 + sum_to_n(1)</Paper>
                        <ArrowDownwardIcon />
                        <Paper sx={{ p: 1, width: '200px', bgcolor: '#e3f2fd' }}>sum_to_n(1) = 1 (base case)</Paper>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mt: 2 }}>
                            <Typography fontWeight={500}>Now we unwind and calculate:</Typography>
                            <Paper sx={{ p: 1, width: '200px' }}>sum_to_n(2) = 2 + 1 = 3</Paper>
                            <ArrowDownwardIcon />
                            <Paper sx={{ p: 1, width: '200px' }}>sum_to_n(3) = 3 + 3 = 6</Paper>
                            <ArrowDownwardIcon />
                            <Paper sx={{ p: 1, width: '200px' }}>sum_to_n(4) = 4 + 6 = 10</Paper>
                        </Box>
                    </Box>
                </ConceptInfoCard>
            );
        } else if (problem === 'fibonacci') {
            return (
                <ConceptInfoCard>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>Visualizing fibonacci(4)</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Paper sx={{ p: 1, width: '240px' }}>fibonacci(4) = fibonacci(3) + fibonacci(2)</Paper>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', mt: 1 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                <ArrowDownwardIcon />
                                <Paper sx={{ p: 1, width: '200px' }}>fibonacci(3) = fib(2) + fib(1)</Paper>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                        <ArrowDownwardIcon />
                                        <Paper sx={{ p: 1 }}>fib(2) = fib(1) + fib(0)</Paper>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <ArrowDownwardIcon />
                                                <Paper sx={{ p: 1, bgcolor: '#e3f2fd' }}>fib(1) = 1</Paper>
                                            </Box>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <ArrowDownwardIcon />
                                                <Paper sx={{ p: 1, bgcolor: '#e3f2fd' }}>fib(0) = 0</Paper>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <ArrowDownwardIcon />
                                        <Paper sx={{ p: 1, bgcolor: '#e3f2fd' }}>fib(1) = 1</Paper>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                <ArrowDownwardIcon />
                                <Paper sx={{ p: 1 }}>fibonacci(2) = fib(1) + fib(0)</Paper>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <ArrowDownwardIcon />
                                        <Paper sx={{ p: 1, bgcolor: '#e3f2fd' }}>fib(1) = 1</Paper>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <ArrowDownwardIcon />
                                        <Paper sx={{ p: 1, bgcolor: '#e3f2fd' }}>fib(0) = 0</Paper>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Typography sx={{ mt: 2, fontWeight: 500 }}>Result: fibonacci(4) = 3</Typography>
                    </Box>
                </ConceptInfoCard>
            );
        }
        return null;
    };

    return (
        <div style={{ marginBottom: 40 }}>
            <Typography paragraph style={{ fontSize: 16, marginBottom: 16, lineHeight: 1.6 }}>
                Recursive functions solve problems by breaking them into smaller versions of the same problem.
                They have two key parts:
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
                <Paper sx={{ p: 2, flex: 1, bgcolor: '#e8f5e9' }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>1. Base Case</Typography>
                    <Typography>
                        The simplest version of the problem that can be solved directly.
                        This is where the recursion stops.
                    </Typography>
                </Paper>
                <Paper sx={{ p: 2, flex: 1, bgcolor: '#e3f2fd' }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>2. Recursive Case</Typography>
                    <Typography>
                        Breaking down the problem into a smaller version of itself,
                        plus some extra work.
                    </Typography>
                </Paper>
            </Box>

            <ConceptInfoCard style={{ marginBottom: 20 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>How to Design a Recursive Function: Step-by-Step</Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                        <Typography fontWeight={600} sx={{ fontSize: 15, mb: 1 }}>Step 1: Identify the Base Case</Typography>
                        <Typography sx={{ fontSize: 14, color: '#444' }}>
                            Ask: "What's the simplest version of this problem?"
                            <br />
                            This is where your function will stop recursing and return a direct answer.
                            For example, factorial(1) = 1, or the sum of numbers up to 1 is just 1.
                        </Typography>
                    </Box>
                    
                    <Box>
                        <Typography fontWeight={600} sx={{ fontSize: 15, mb: 1 }}>Step 2: Define the Recursive Relationship</Typography>
                        <Typography sx={{ fontSize: 14, color: '#444' }}>
                            Ask: "How can I express the current problem in terms of a smaller version of itself?"
                            <br />
                            For example, factorial(n) = n × factorial(n-1), or sum(n) = n + sum(n-1)
                        </Typography>
                    </Box>
                    
                    <Box>
                        <Typography fontWeight={600} sx={{ fontSize: 15, mb: 1 }}>Step 3: Ensure Progress Toward Base Case</Typography>
                        <Typography sx={{ fontSize: 14, color: '#444' }}>
                            Each recursive call must move closer to the base case to avoid infinite recursion.
                            Usually this means working with a smaller input (n-1, n/2, etc).
                        </Typography>
                    </Box>
                    
                    <Box>
                        <Typography fontWeight={600} sx={{ fontSize: 15, mb: 1 }}>Step 4: Combine the Parts</Typography>
                        <Typography sx={{ fontSize: 14, color: '#444' }}>
                            Write a complete function with:
                            <br />
                            • A condition to check for the base case
                            <br />
                            • A return statement for the base case
                            <br />
                            • A return statement for the recursive case that calls the function with a smaller input
                        </Typography>
                    </Box>
                </Box>
            </ConceptInfoCard>

            <>
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Choose a problem to solve recursively</InputLabel>
                    <Select
                        value={problem}
                        label="Choose a problem to solve recursively"
                        onChange={(e) => setProblem(e.target.value)}
                    >
                        <MenuItem value="factorial">Factorial</MenuItem>
                        <MenuItem value="sum">Sum of Numbers</MenuItem>
                        <MenuItem value="fibonacci">Fibonacci Sequence</MenuItem>
                    </Select>
                </FormControl>

                <ConceptInfoCard>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6" fontWeight={600}>{currentProblem.title}</Typography>
                        <Button 
                            startIcon={<CodeIcon />}
                            size="small"
                            onClick={() => setShowSolution(!showSolution)}
                            color="primary"
                            variant={showSolution ? "contained" : "outlined"}
                        >
                            {showSolution ? "Hide Solution" : "View Solution"}
                        </Button>
                    </Box>
                    <Typography paragraph style={{ fontSize: 15, color: '#333' }}>{currentProblem.description}</Typography>
                    <Typography sx={{ fontFamily: 'monospace', bgcolor: '#f0f0f0', p: 1, borderRadius: 1, fontSize: 15 }}>
                        {currentProblem.example}
                    </Typography>

                    {showSolution && (
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ mb: 2 }}>Complete Solution:</Typography>
                            <StepThroughCodeAnimation 
                                code={currentProblem.fullSolution.split('\n')} 
                                steps={currentProblem.solutionSteps}
                            />
                        </Box>
                    )}
                </ConceptInfoCard>

                {renderVisualization()}
            </>
        </div>
    );
};

export default RecursiveConstructor;