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

const RecursiveConstructor: React.FC = () => {
    const [problem, setProblem] = useState('factorial');
    const [step, setStep] = useState(1);
    const [userInput, setUserInput] = useState('');
    const [showHint, setShowHint] = useState(false);

    // Reset when problem changes
    React.useEffect(() => {
        setStep(1);
        setUserInput('');
        setShowHint(false);
    }, [problem]);

    const problems = {
        factorial: {
            title: 'Factorial (n!)',
            description: 'Calculate the product of a number and all positive integers below it.',
            example: 'factorial(4) = 4 × 3 × 2 × 1 = 24',
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
                <Box sx={{ my: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1, textAlign: 'center' }}>
                    <Typography variant="subtitle1" gutterBottom>Visualizing factorial(4)</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        <Paper elevation={2} sx={{ p: 1, width: '200px' }}>factorial(4) = 4 × factorial(3)</Paper>
                        <ArrowDownwardIcon />
                        <Paper elevation={2} sx={{ p: 1, width: '200px' }}>factorial(3) = 3 × factorial(2)</Paper>
                        <ArrowDownwardIcon />
                        <Paper elevation={2} sx={{ p: 1, width: '200px' }}>factorial(2) = 2 × factorial(1)</Paper>
                        <ArrowDownwardIcon />
                        <Paper elevation={2} sx={{ p: 1, width: '200px', bgcolor: '#e3f2fd' }}>factorial(1) = 1 (base case)</Paper>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mt: 2 }}>
                            <Typography>Now we unwind and calculate:</Typography>
                            <Paper elevation={2} sx={{ p: 1, width: '200px' }}>factorial(2) = 2 × 1 = 2</Paper>
                            <ArrowDownwardIcon />
                            <Paper elevation={2} sx={{ p: 1, width: '200px' }}>factorial(3) = 3 × 2 = 6</Paper>
                            <ArrowDownwardIcon />
                            <Paper elevation={2} sx={{ p: 1, width: '200px' }}>factorial(4) = 4 × 6 = 24</Paper>
                        </Box>
                    </Box>
                </Box>
            );
        } else if (problem === 'sum') {
            return (
                <Box sx={{ my: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1, textAlign: 'center' }}>
                    <Typography variant="subtitle1" gutterBottom>Visualizing sum_to_n(4)</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        <Paper elevation={2} sx={{ p: 1, width: '200px' }}>sum_to_n(4) = 4 + sum_to_n(3)</Paper>
                        <ArrowDownwardIcon />
                        <Paper elevation={2} sx={{ p: 1, width: '200px' }}>sum_to_n(3) = 3 + sum_to_n(2)</Paper>
                        <ArrowDownwardIcon />
                        <Paper elevation={2} sx={{ p: 1, width: '200px' }}>sum_to_n(2) = 2 + sum_to_n(1)</Paper>
                        <ArrowDownwardIcon />
                        <Paper elevation={2} sx={{ p: 1, width: '200px', bgcolor: '#e3f2fd' }}>sum_to_n(1) = 1 (base case)</Paper>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mt: 2 }}>
                            <Typography>Now we unwind and calculate:</Typography>
                            <Paper elevation={2} sx={{ p: 1, width: '200px' }}>sum_to_n(2) = 2 + 1 = 3</Paper>
                            <ArrowDownwardIcon />
                            <Paper elevation={2} sx={{ p: 1, width: '200px' }}>sum_to_n(3) = 3 + 3 = 6</Paper>
                            <ArrowDownwardIcon />
                            <Paper elevation={2} sx={{ p: 1, width: '200px' }}>sum_to_n(4) = 4 + 6 = 10</Paper>
                        </Box>
                    </Box>
                </Box>
            );
        } else if (problem === 'fibonacci') {
            return (
                <Box sx={{ my: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1, textAlign: 'center' }}>
                    <Typography variant="subtitle1" gutterBottom>Visualizing fibonacci(4)</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Paper elevation={2} sx={{ p: 1, width: '240px' }}>fibonacci(4) = fibonacci(3) + fibonacci(2)</Paper>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', mt: 1 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                <ArrowDownwardIcon />
                                <Paper elevation={2} sx={{ p: 1, width: '200px' }}>fibonacci(3) = fib(2) + fib(1)</Paper>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                        <ArrowDownwardIcon />
                                        <Paper elevation={2} sx={{ p: 1 }}>fib(2) = fib(1) + fib(0)</Paper>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <ArrowDownwardIcon />
                                                <Paper elevation={2} sx={{ p: 1, bgcolor: '#e3f2fd' }}>fib(1) = 1</Paper>
                                            </Box>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <ArrowDownwardIcon />
                                                <Paper elevation={2} sx={{ p: 1, bgcolor: '#e3f2fd' }}>fib(0) = 0</Paper>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <ArrowDownwardIcon />
                                        <Paper elevation={2} sx={{ p: 1, bgcolor: '#e3f2fd' }}>fib(1) = 1</Paper>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                <ArrowDownwardIcon />
                                <Paper elevation={2} sx={{ p: 1 }}>fibonacci(2) = fib(1) + fib(0)</Paper>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <ArrowDownwardIcon />
                                        <Paper elevation={2} sx={{ p: 1, bgcolor: '#e3f2fd' }}>fib(1) = 1</Paper>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <ArrowDownwardIcon />
                                        <Paper elevation={2} sx={{ p: 1, bgcolor: '#e3f2fd' }}>fib(0) = 0</Paper>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Typography sx={{ mt: 2 }}>Result: fibonacci(4) = 3</Typography>
                    </Box>
                </Box>
            );
        }
        return null;
    };

    return (
        <div style={{ marginBottom: 40 }}>
            <Typography paragraph>
                Recursive functions solve problems by breaking them into smaller versions of the same problem.
                They have two key parts:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
                <Paper elevation={3} sx={{ p: 2, flex: 1, bgcolor: '#e8f5e9' }}>
                    <Typography variant="h6" gutterBottom>1. Base Case</Typography>
                    <Typography>
                        The simplest version of the problem that can be solved directly.
                        This is where the recursion stops.
                    </Typography>
                </Paper>
                <Paper elevation={3} sx={{ p: 2, flex: 1, bgcolor: '#e3f2fd' }}>
                    <Typography variant="h6" gutterBottom>2. Recursive Case</Typography>
                    <Typography>
                        Breaking down the problem into a smaller version of itself,
                        plus some extra work.
                    </Typography>
                </Paper>
            </Box>

            <Box sx={{ mb: 4 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
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

                <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: '#f9f9f9' }}>
                    <Typography variant="h6">{currentProblem.title}</Typography>
                    <Typography paragraph>{currentProblem.description}</Typography>
                    <Typography sx={{ fontFamily: 'monospace', bgcolor: '#f0f0f0', p: 1, borderRadius: 1 }}>
                        {currentProblem.example}
                    </Typography>
                </Paper>

                {renderVisualization()}

                <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: '#fff8e1' }}>
                    <Typography variant="subtitle1" gutterBottom>Step {step} of {currentProblem.steps.length}:</Typography>
                    <Typography variant="h6" gutterBottom>{currentStep.instruction}</Typography>
                    
                    <TextField
                        label="Your code"
                        multiline
                        rows={4}
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        fullWidth
                        variant="outlined"
                        sx={{ fontFamily: 'monospace' }}
                        placeholder="Write your Python code here..."
                    />
                    
                    {showHint && (
                        <Paper sx={{ p: 2, mt: 2, bgcolor: '#e0f7fa' }}>
                            <Typography variant="subtitle2" gutterBottom>Hint:</Typography>
                            <Typography sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>{currentStep.hint}</Typography>
                            <Button 
                                sx={{ mt: 1 }}
                                size="small"
                                onClick={() => setUserInput(currentStep.solution)}
                            >
                                Show solution
                            </Button>
                        </Paper>
                    )}
                    
                    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={checkStep}
                        >
                            {step < currentProblem.steps.length ? 'Next Step' : 'Finish'}
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<ReplayIcon />}
                            onClick={resetExercise}
                        >
                            Reset
                        </Button>
                    </Box>
                </Paper>

                {step === currentProblem.steps.length && userInput.includes(currentStep.solution.split('\n')[0]) && (
                    <Paper sx={{ p: 3, bgcolor: '#e8f5e9', mb: 2 }}>
                        <Typography variant="h6" gutterBottom>Congratulations! 🎉</Typography>
                        <Typography paragraph>
                            You've successfully built a recursive {problem} function!
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
                            {currentProblem.steps[2].solution}
                        </Typography>
                    </Paper>
                )}
            </Box>

            <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>Tips for Writing Recursive Functions:</Typography>
                <ul>
                    <li>Always identify the base case(s) first - when should the recursion stop?</li>
                    <li>Make sure each recursive call moves closer to the base case</li>
                    <li>For complex problems, draw out the recursive calls as a tree diagram</li>
                    <li>Add print statements to see the flow of recursion while debugging</li>
                    <li>Remember that each recursive call uses memory - too many calls can cause a "stack overflow"</li>
                </ul>
            </Paper>
        </div>
    );
};

export default RecursiveConstructor;