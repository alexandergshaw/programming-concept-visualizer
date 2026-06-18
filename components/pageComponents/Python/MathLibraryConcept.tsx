'use client';

import { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '@/components/common/Section';
import TableOfContents from '@/components/common/TableOfContents';
import PythonCodeSnippet from '@/components/common/PythonCodeSnippet';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';

const categories = [
  {
    title: 'Rounding',
    intro: 'Turn a float into a whole number, in a specific direction.',
    lines: [
      { code: 'math.floor(3.7)', comment: '3  (round down)' },
      { code: 'math.ceil(3.2)', comment: '4  (round up)' },
      { code: 'math.trunc(-3.7)', comment: '-3  (drop the decimal, toward zero)' },
    ],
  },
  {
    title: 'Powers & roots',
    intro: 'Square roots and exponents.',
    lines: [
      { code: 'math.sqrt(144)', comment: '12.0' },
      { code: 'math.pow(2, 10)', comment: '1024.0  (always a float)' },
      { code: 'math.isqrt(144)', comment: '12  (integer square root)' },
    ],
  },
  {
    title: 'Constants',
    intro: 'Useful values you should never type out by hand.',
    lines: [
      { code: 'math.pi', comment: '3.141592653589793' },
      { code: 'math.e', comment: '2.718281828459045' },
      { code: 'math.tau', comment: '6.283185307179586  (2 * pi)' },
    ],
  },
  {
    title: 'Logarithms & exponentials',
    intro: 'Logs in any base, plus e to a power.',
    lines: [
      { code: 'math.log(100, 10)', comment: '2.0  (log base 10)' },
      { code: 'math.log2(8)', comment: '3.0' },
      { code: 'math.exp(1)', comment: '2.718...  (e ** 1)' },
    ],
  },
  {
    title: 'Trigonometry',
    intro: 'Trig functions work in radians — convert from degrees first.',
    lines: [
      { code: 'math.radians(180)', comment: '3.14159...  (degrees -> radians)' },
      { code: 'math.degrees(math.pi)', comment: '180.0  (radians -> degrees)' },
      { code: 'math.sin(math.radians(90))', comment: '1.0' },
    ],
  },
  {
    title: 'Other helpers',
    intro: 'A few more you will reach for often.',
    lines: [
      { code: 'math.factorial(5)', comment: '120' },
      { code: 'math.gcd(12, 18)', comment: '6  (greatest common divisor)' },
      { code: 'math.fabs(-7)', comment: '7.0  (absolute value, as a float)' },
      { code: 'math.dist([0, 0], [3, 4])', comment: '5.0  (distance between points)' },
    ],
  },
];

const goals = [
  {
    goal: 'Round a number DOWN to a whole number',
    fn: 'math.floor(x)',
    example: 'math.floor(3.7)',
    result: '3',
  },
  {
    goal: 'Round a number UP to a whole number',
    fn: 'math.ceil(x)',
    example: 'math.ceil(3.2)',
    result: '4',
  },
  {
    goal: 'Find a square root',
    fn: 'math.sqrt(x)',
    example: 'math.sqrt(144)',
    result: '12.0',
  },
  {
    goal: 'Raise a number to a power',
    fn: 'math.pow(base, exp)',
    example: 'math.pow(2, 10)',
    result: '1024.0',
  },
  {
    goal: 'Use the value of pi (e.g. circle area/circumference)',
    fn: 'math.pi',
    example: 'area = math.pi * r ** 2',
    result: 'e.g. r=5 -> 78.539...',
  },
  {
    goal: 'Multiply every whole number up to n (a factorial)',
    fn: 'math.factorial(n)',
    example: 'math.factorial(5)',
    result: '120',
  },
  {
    goal: 'Find the greatest common divisor of two integers',
    fn: 'math.gcd(a, b)',
    example: 'math.gcd(12, 18)',
    result: '6',
  },
  {
    goal: 'Measure the straight-line distance between two points',
    fn: 'math.dist(p, q)',
    example: 'math.dist([0, 0], [3, 4])',
    result: '5.0',
  },
  {
    goal: 'Convert an angle from degrees to radians (for trig)',
    fn: 'math.radians(degrees)',
    example: 'math.radians(180)',
    result: '3.14159...',
  },
];

export default function MathLibraryConcept() {
  const [goalIndex, setGoalIndex] = useState(0);
  const picked = goals[goalIndex];

  return (
    <ConceptWrapper
      title="The math Library"
      description="The basic operators (+ - * / **) cover everyday arithmetic, but Python's built-in math module adds the functions you'd find on a scientific calculator: square roots, rounding, logarithms, trig, constants like pi, and more. The skill is knowing which function fits the job."
    >
      <TableOfContents numbered>
        <Section
          title="Importing the Library"
          subtitle="math ships with Python — there's nothing to install. Import it once at the top of your file, then reach functions and constants through the math. prefix."
        >
          <PythonCodeSnippet
            lines={[
              { code: `import math`, comment: `bring in the whole module` },
              { code: `` },
              { code: `print(math.sqrt(25))`, comment: `5.0` },
              { code: `print(math.pi)`, comment: `3.141592653589793` },
            ]}
            enableRun
          />
          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="body2">
              The <code>math.</code> prefix tells the reader exactly where a function comes from. You can also
              write <code>from math import sqrt, pi</code> to use them without the prefix — handy, but the
              prefix keeps larger programs clear.
            </Typography>
          </Alert>
        </Section>

        <Section
          title="A Tour of Common Functions"
          subtitle="The math module is large; these are the ones you'll use most, grouped by what they do."
        >
          {categories.map((cat) => (
            <Box key={cat.title} sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                {cat.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mb: 1.5 }}>
                {cat.intro}
              </Typography>
              <PythonCodeSnippet lines={cat.lines} allowCopy={false} />
            </Box>
          ))}
        </Section>

        <Section
          title="Pick the Right Function"
          subtitle="Choosing the appropriate function is most of the work. Pick a goal and see which math function fits."
        >
          <FormControl fullWidth size="small" sx={{ mb: 3 }}>
            <InputLabel id="math-goal-label">I want to…</InputLabel>
            <Select
              labelId="math-goal-label"
              label="I want to…"
              value={goalIndex}
              onChange={(e) => setGoalIndex(Number(e.target.value))}
            >
              {goals.map((g, i) => (
                <MenuItem key={g.fn} value={i}>
                  {g.goal}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <ConceptInfoCard>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>
              Use this function:
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--info)', my: 1 }}
            >
              {picked.fn}
            </Typography>
            <PythonCodeSnippet
              lines={[{ code: picked.example, comment: picked.result }]}
              allowCopy={false}
            />
          </ConceptInfoCard>

          <Alert severity="success">
            <Typography variant="body2">
              Tip: if you find yourself writing your own loop to compute something mathematical — a square
              root, a factorial, a power — check the <code>math</code> module first. It is faster, tested, and
              clearer than a hand-rolled version.
            </Typography>
          </Alert>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
