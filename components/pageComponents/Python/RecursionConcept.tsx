import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import InteractiveStepThrough from '../../common/InteractiveStepThrough';
import StepThroughCodeAnimation, { Step } from '../JavaScript/StepThroughCodeAnimation';
import Box from '@mui/material/Box';

const factorialSteps: Step[] = [
  {
    label: 'Start factorial(3)',
    desc: 'We call <b>factorial(3)</b>. Since 3 is not 1, we go to the recursive case.',
    highlight: 'def factorial(n):',
    outputLine: 'factorial(3) called',
  },
  {
    label: 'Recursive Call: factorial(2)',
    desc: 'We return <b>3 * factorial(2)</b>. Now we need to calculate <b>factorial(2)</b>.',
    highlight: 'return n * factorial(n - 1)',
    outputLine: 'factorial(2) called',
  },
  {
    label: 'Recursive Call: factorial(1)',
    desc: 'Now we call <b>factorial(1)</b>. This is the base case.',
    highlight: 'if n == 1:',
    outputLine: 'factorial(1) called',
  },
  {
    label: 'Base Case',
    desc: 'Since n is 1, we return 1. This stops the recursion.',
    highlight: 'return 1',
    outputLine: 'Returning 1',
  },
  {
    label: 'Unwind: factorial(2)',
    desc: 'Now <b>factorial(2)</b> returns <b>2 * 1 = 2</b>.',
    highlight: 'return n * factorial(n - 1)',
    outputLine: 'Returning 2',
  },
  {
    label: 'Unwind: factorial(3)',
    desc: 'Now <b>factorial(3)</b> returns <b>3 * 2 = 6</b>.',
    highlight: 'return n * factorial(n - 1)',
    outputLine: 'Returning 6',
  },
];

const fibonacciSteps: Step[] = [
  {
    label: 'Start fibonacci(4)',
    desc: 'We call <b>fibonacci(4)</b>. Since 4 > 1, we go to the recursive case.',
    highlight: 'def fibonacci(n):',
    outputLine: 'fibonacci(4) called',
  },
  {
    label: 'Recursive Call: fibonacci(3) + fibonacci(2)',
    desc: 'We return <b>fibonacci(3) + fibonacci(2)</b>.',
    highlight: 'return fibonacci(n-1) + fibonacci(n-2)',
    outputLine: 'fibonacci(3) called',
  },
  {
    label: 'Recursive Call: fibonacci(2) + fibonacci(1)',
    desc: 'Now we call <b>fibonacci(2)</b> and <b>fibonacci(1)</b>.',
    highlight: 'return fibonacci(n-1) + fibonacci(n-2)',
    outputLine: 'fibonacci(2) called',
  },
  {
    label: 'Base Case: fibonacci(1)',
    desc: 'fibonacci(1) returns 1 (base case).',
    highlight: 'if n <= 1:',
    outputLine: 'Returning 1',
  },
  {
    label: 'Base Case: fibonacci(0)',
    desc: 'fibonacci(0) returns 0 (base case).',
    highlight: 'if n <= 1:',
    outputLine: 'Returning 0',
  },
  {
    label: 'Unwind: fibonacci(2)',
    desc: 'fibonacci(2) returns 1 (1 + 0).',
    highlight: 'return fibonacci(n-1) + fibonacci(n-2)',
    outputLine: 'Returning 1',
  },
  {
    label: 'Unwind: fibonacci(3)',
    desc: 'fibonacci(3) returns 2 (1 + 1).',
    highlight: 'return fibonacci(n-1) + fibonacci(n-2)',
    outputLine: 'Returning 2',
  },
  {
    label: 'Unwind: fibonacci(4)',
    desc: 'fibonacci(4) returns 3 (2 + 1).',
    highlight: 'return fibonacci(n-1) + fibonacci(n-2)',
    outputLine: 'Returning 3',
  },
];

const photoCombosSteps: Step[] = [
  {
    label: 'Start photo_combos(["A", "B"])',
    desc: 'We call <b>photo_combos(["A", "B"])</b>. The list is not empty, so we go to the recursive case.',
    highlight: 'def photo_combos(photos):',
    outputLine: 'photo_combos([A, B]) called',
  },
  {
    label: 'Recursive Call: photo_combos(["B"])',
    desc: 'We remove "A" and call <b>photo_combos(["B"])</b>.',
    highlight: 'for i in range(len(photos)):',
    outputLine: 'photo_combos([B]) called',
  },
  {
    label: 'Base Case: photo_combos([])',
    desc: 'Now the list is empty, so we return [[]]. This is the base case.',
    highlight: 'if not photos:',
    outputLine: 'Returning [[]]',
  },
  {
    label: 'Unwind: Add "A" to combos',
    desc: 'We add "A" to each smaller combo: [["A", "B"], ["B", "A"]].',
    highlight: 'result.append([photos[i]] + rest)',
    outputLine: 'Returning [["A", "B"], ["B", "A"]]',
  },
];

export default function RecursionConcept() {
  return (
    <ConceptWrapper
      title="Recursion in Python"
      description="Recursion is when a function calls itself to solve a problem. It's a powerful way to break problems into smaller pieces."
    >
      <TableOfContents numbered>
        <Section title="What is Recursion?">
          <p>
            <b>Recursion</b> is a programming technique where a function calls itself to solve a smaller version of the problem. Each time the function calls itself, it works on a simpler or smaller input, until it reaches a <b>base case</b> that stops the recursion.
          </p>
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', mt: 2, mb: 2 }}>
            <Box sx={{ minWidth: 220, bgcolor: '#f8fafc', borderRadius: 2, p: 2, border: '1px solid #e0e0e0', flex: 1 }}>
              <b>Real-World Analogy</b>
              <ul style={{ margin: '10px 0 0 18px', fontSize: 15 }}>
                <li>
                  <b>Russian Dolls:</b> Each doll contains a smaller doll, until you reach the smallest one.
                </li>
                <li>
                  <b>Mirrors Facing Each Other:</b> Each reflection contains another reflection, and so on.
                </li>
              </ul>
            </Box>
            <Box sx={{ minWidth: 220, bgcolor: '#f8fafc', borderRadius: 2, p: 2, border: '1px solid #e0e0e0', flex: 1 }}>
              <b>Recursion Structure (Pseudocode)</b>
              <pre style={{ margin: 0, fontSize: 14, color: '#1976d2' }}>
{`def recursive_function(problem):
    if simple_case(problem):
        return simple_answer
    else:
        smaller_problem = make_smaller(problem)
        return recursive_function(smaller_problem)
`}
              </pre>
            </Box>
          </Box>
          <p>
            <i>
              Every recursive function needs a <b>base case</b> (when to stop) and a <b>recursive case</b> (when to call itself).
            </i>
          </p>
        </Section>
        <Section title="Build a Recursive Function (Interactive)">
          <InteractiveStepThrough
            codeTemplate={inputs => [
              'def mystery(n):',
              inputs.baseCase === 'n == 1'
                ? '    if n == 1:'
                : '    if n == 0:',
              `        print("Base case reached!")`,
              inputs.baseCase === 'n == 1'
                ? '        return 1'
                : '        return 0',
              '    else:',
              `        print("Recursing with", n - 1)`,
              inputs.baseCase === 'n == 1'
                ? '        return n * mystery(n - 1)'
                : '        return n + mystery(n - 1)',
              '',
              'print(mystery(3))',
            ]}
            stepsTemplate={inputs => [
              {
                label: 'Write the Base Case',
                desc: `The <b>base case</b> stops the recursion. Here, it's <code>${inputs.baseCase}</code>.`,
                highlight: inputs.baseCase === 'n == 1' ? 'if n == 1:' : 'if n == 0:',
              },
              {
                label: 'Write the Recursive Case',
                desc: `The <b>recursive case</b> calls the function again with a smaller value (<code>n - 1</code>).`,
                highlight: inputs.baseCase === 'n == 1'
                  ? 'return n * mystery(n - 1)'
                  : 'return n + mystery(n - 1)',
              },
              {
                label: 'Add Debug Output',
                desc: `We add <code>print()</code> statements to see when the base case and recursive case are reached.`,
                highlight: ['print("Base case reached!")', 'print("Recursing with", n - 1)'],
              },
              {
                label: 'Try It!',
                desc: `Run <code>mystery(3)</code> to see the output and how recursion works step by step.`,
                highlight: 'print(mystery(3))',
              },
            ]}
            inputConfigs={[
              {
                name: 'baseCase',
                label: 'Base Case',
                options: [
                  { label: 'n == 1 (factorial)', value: 'n == 1' },
                  { label: 'n == 0 (sum)', value: 'n == 0' },
                ],
                defaultValue: 'n == 1',
              },
            ]}
          />
        </Section>
        <Section title="Debugging Recursion with Output">
          <StepThroughCodeAnimation
            code={[
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
            ]}
            steps={[
              {
                label: 'Call factorial(3)',
                desc: 'We call <b>factorial(3)</b>. The function prints the value of <b>n</b> each time it is called.',
                highlight: 'print("Calling factorial with", n)',
                outputLine: 'Calling factorial with 3',
              },
              {
                label: 'Recursive Call',
                desc: 'Since n is not 1, we call <b>factorial(2)</b> and print the call.',
                highlight: 'factorial(n - 1)',
                outputLine: 'Calling factorial with 2',
              },
              {
                label: 'Recursive Call',
                desc: 'Again, n is not 1, so we call <b>factorial(1)</b>.',
                highlight: 'factorial(n - 1)',
                outputLine: 'Calling factorial with 1',
              },
              {
                label: 'Base Case',
                desc: 'Now n is 1, so we print the base case message and return 1.',
                highlight: 'print("Base case reached!")',
                outputLine: 'Base case reached!',
              },
              {
                label: 'Unwind: factorial(2)',
                desc: 'We return from <b>factorial(1)</b> and calculate <b>2 * 1 = 2</b>, printing the result.',
                highlight: 'print("Returning", result)',
                outputLine: 'Returning 2',
              },
              {
                label: 'Unwind: factorial(3)',
                desc: 'We return from <b>factorial(2)</b> and calculate <b>3 * 2 = 6</b>, printing the result.',
                highlight: 'print("Returning", result)',
                outputLine: 'Returning 6',
              },
            ]}
          />
        </Section>
        <Section title="Classic Recursion: Factorial & Fibonacci">
          <StepThroughCodeAnimation
            code={[
              'def factorial(n):',
              '    if n == 1:',
              '        return 1',
              '    else:',
              '        return n * factorial(n - 1)',
              '',
              'def fibonacci(n):',
              '    if n <= 1:',
              '        return n',
              '    else:',
              '        return fibonacci(n-1) + fibonacci(n-2)',
              '',
              'print(factorial(3))   # Output: 6',
              'print(fibonacci(4))  # Output: 3',
            ]}
            steps={[
              ...factorialSteps,
              ...fibonacciSteps,
            ]}
          />
        </Section>
        <Section title="All Possible Photo Orders (Permutations)">
          <StepThroughCodeAnimation
            code={[
              'def photo_combos(photos):',
              '    if not photos:',
              '        return [[]]',
              '    result = []',
              '    for i in range(len(photos)):',
              '        rest = photos[:i] + photos[i+1:]',
              '        for combo in photo_combos(rest):',
              '            result.append([photos[i]] + combo)',
              '    return result',
              '',
              'print(photo_combos(["A", "B"]))',
            ]}
            steps={photoCombosSteps}
          />
        </Section>
        <Section title="Tips & Common Mistakes">
          <ul>
            <li>Always make sure your recursion has a <b>base case</b> that will be reached.</li>
            <li>Each recursive call should work on a <b>smaller or simpler</b> version of the problem.</li>
            <li>Use <code>print()</code> statements to debug and understand the flow of recursive calls.</li>
            <li>Recursion is powerful for problems that can be broken into similar subproblems, like trees, searching, and combinations.</li>
            <li>Too many recursive calls can cause a <b>stack overflow</b> (the program runs out of memory).</li>
          </ul>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}