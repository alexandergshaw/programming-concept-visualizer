import React from 'react';
import StepThroughCodeAnimation, { Step } from '../JavaScript/StepThroughCodeAnimation';
import Section from '@/components/common/Section';

const code = [
    'def factorial(n):',
    '    print("Calling factorial with", n)',
    '    if n == 1:',
    '        print("Base case reached!")',
    '        return 1',
    '    else:',
    '        result = n * factorial(n - 1)',
    '        print("Returning", result)',
    '        return result',
    '',
    'print(factorial(3))',
];

const steps: Step[] = [
    {
        label: 'Start Our Journey',
        desc: 'We want to calculate factorial(3). Think of factorial as "multiply this number by all smaller numbers down to 1". So the factorial of 3 (which can be written as "3!") means 3×2×1.',
        highlight: 'print(factorial(3))',
        outputLine: '',
    },
    {
        label: 'Enter factorial(3)',
        desc: 'We enter the factorial function with n=3. First thing it does is print a message. Think of this as "I\'m starting to work on factorial of 3."',
        highlight: 'print("Calling factorial with", n)',
        outputLine: 'Calling factorial with 3',
    },
    {
        label: 'Check if we\'re done',
        desc: 'The function asks: "Is n equal to 1?" The answer is no (3 is not 1), so we need to keep going with the recursive path.',
        highlight: 'if n == 1:',
        outputLine: '',
    },
    {
        label: 'Make a recursive call',
        desc: 'To solve factorial(3), we need to first know factorial(2). It\'s like saying "I don\'t know the factorial of 3 (aka 3!) yet, but I know it\'s 3 times 2!. So let me find 2! first."',
        highlight: 'result = n * factorial(n - 1)',
        outputLine: '',
    },
    {
        label: 'Enter factorial(2)',
        desc: 'Now we\'re in a new copy of the function, with n=2. It\'s like we left factorial(3) on pause while we figure out factorial(2).',
        highlight: 'print("Calling factorial with", n)',
        outputLine: 'Calling factorial with 2',
    },
    {
        label: 'Check if we\'re done (again)',
        desc: 'Again we ask: "Is n equal to 1?" The answer is still no (2 is not 1), so we take the recursive path again.',
        highlight: 'if n == 1:',
        outputLine: '',
    },
    {
        label: 'Make another recursive call',
        desc: 'To solve factorial(2), we need to know factorial(1). It\'s like saying "I don\'t know 2! yet, but I know it\'s 2 times 1!. So let me find 1! first."',
        highlight: 'result = n * factorial(n - 1)',
        outputLine: '',
    },
    {
        label: 'Enter factorial(1)',
        desc: 'Now we\'re in a third copy of the function, with n=1. Both factorial(3) and factorial(2) are waiting for us to finish.',
        highlight: 'print("Calling factorial with", n)',
        outputLine: 'Calling factorial with 1',
    },
    {
        label: 'Found the base case!',
        desc: 'This time when we ask "Is n equal to 1?", the answer is yes! This is our stopping point, called the "base case".',
        highlight: 'if n == 1:',
        outputLine: '',
    },
    {
        label: 'Return from base case',
        desc: 'For factorial(1), we just return 1 directly. No more recursive calls needed! We\'ve reached the smallest nesting doll.',
        highlight: 'return 1',
        outputLine: 'Base case reached!',
    },
    {
        label: 'Back to factorial(2)',
        desc: 'Now we return to factorial(2) which was waiting. We can calculate result = 2 × 1 = 2.',
        highlight: 'result = n * factorial(n - 1)',
        outputLine: '',
    },
    {
        label: 'Complete factorial(2)',
        desc: 'factorial(2) now prints its result and returns 2 to whoever called it (which was factorial(3)).',
        highlight: 'print("Returning", result)',
        outputLine: 'Returning 2',
    },
    {
        label: 'Back to factorial(3)',
        desc: 'Finally, we return to our original factorial(3) call. We can calculate result = 3 × 2 = 6.',
        highlight: 'result = n * factorial(n - 1)',
        outputLine: '',
    },
    {
        label: 'Complete factorial(3)',
        desc: 'factorial(3) prints its final result and returns 6. We\'ve solved the original problem by breaking it down into smaller pieces!',
        highlight: 'print("Returning", result)',
        outputLine: 'Returning 6',
    },
    {
        label: 'Final Result',
        desc: 'The program prints the final result: 6. This is the factorial of 3 (3!) = 3×2×1 = 6. All our recursive calls are finished, like all the nesting dolls have been put back together.',
        highlight: 'print(factorial(3))',
        outputLine: '6',
    },
];

const RecursionVisualizer: React.FC = () => (
    <div style={{ marginBottom: 40 }}>
        <p style={{ marginBottom: 18 }}>
            <b>Recursion</b> is a programming technique where a function calls itself to solve a smaller version of the problem. Each time the function calls itself, it works on a simpler or smaller input, until it reaches a <b>base case</b> that stops the recursion.
        </p>
        <p style={{ marginBottom: 18 }}>
            Think of recursion like a set of Russian nesting dolls: each function call is like opening a doll to find a smaller one inside. You keep opening dolls <b>(calling the function)</b> until you reach the smallest one <b>(the base case)</b>, and then you start putting them back together <b>(returning from the function calls)</b>.
        </p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/rf60MejMz3E?si=Y82pSaB0ILUGp--f" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <div style={{ margin: '10px 0 18px 0' }}>
            <Section title="Stepping Through Recursion">
                This animation shows how a recursive function works by calling itself, reaching a base case, and then "unwinding" as each call returns. Follow each step to see how the stack of function calls grows and shrinks!
            </Section>
        </div>
        <StepThroughCodeAnimation code={code} steps={steps} />
    </div>
);

export default RecursionVisualizer;