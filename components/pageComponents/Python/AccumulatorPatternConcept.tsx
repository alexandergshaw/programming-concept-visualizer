'use client';

import { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '@/components/common/Section';
import TableOfContents from '@/components/common/TableOfContents';
import PythonCodeSnippet from '@/components/common/PythonCodeSnippet';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import OrderedList from '@/components/common/OrderedList';
import {
  Box,
  Typography,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type Op = 'sum' | 'count' | 'max' | 'average';

const opConfig: Record<
  Op,
  {
    label: string;
    init: string;
    initValue: number;
    update: (acc: number, n: number) => number;
    updateLine: string;
    blurb: string;
  }
> = {
  sum: {
    label: 'Sum',
    init: 'total = 0',
    initValue: 0,
    update: (acc, n) => acc + n,
    updateLine: 'total = total + n',
    blurb: 'Start the running total at 0 and add each value as you go.',
  },
  count: {
    label: 'Count',
    init: 'count = 0',
    initValue: 0,
    update: (acc) => acc + 1,
    updateLine: 'count = count + 1',
    blurb: 'Start at 0 and add 1 for every item — the value itself is ignored.',
  },
  max: {
    label: 'Maximum',
    init: 'biggest = numbers[0]',
    initValue: Number.NEGATIVE_INFINITY,
    update: (acc, n) => Math.max(acc, n),
    updateLine: 'if n > biggest:\n    biggest = n',
    blurb: 'Start with the first item, then replace it whenever you find something larger.',
  },
  average: {
    label: 'Average',
    init: 'total = 0',
    initValue: 0,
    update: (acc, n) => acc + n,
    updateLine: 'total = total + n',
    blurb: 'Accumulate a total, then divide by how many items there were at the end.',
  },
};

export default function AccumulatorPatternConcept() {
  const [raw, setRaw] = useState('5, 3, 8, 1, 9');
  const [op, setOp] = useState<Op>('sum');

  const numbers = raw
    .split(',')
    .map((s) => Number(s.trim()))
    .filter((n) => !Number.isNaN(n));

  const cfg = opConfig[op];

  // Build the running accumulator trace for the chosen operation.
  const trace: { n: number; acc: number }[] = [];
  let acc = op === 'max' ? (numbers[0] ?? 0) : cfg.initValue;
  numbers.forEach((n, i) => {
    if (op === 'max' && i === 0) {
      acc = n;
    } else {
      acc = cfg.update(acc, n);
    }
    trace.push({ n, acc });
  });

  const finalRaw = numbers.length ? acc : 0;
  const finalValue =
    op === 'average' && numbers.length
      ? Math.round((finalRaw / numbers.length) * 100) / 100
      : finalRaw;

  const listLiteral = `[${numbers.join(', ')}]`;

  // Python lines for the selected accumulator.
  const codeLines =
    op === 'average'
      ? [
          { code: `numbers = ${listLiteral}` },
          { code: `total = 0`, comment: `1. initialize the accumulator` },
          { code: `for n in numbers:`, comment: `2. visit each item` },
          { code: `    total = total + n`, comment: `3. update the accumulator` },
          { code: `` },
          { code: `average = total / len(numbers)`, comment: `use the result` },
          { code: `print(average)`, comment: `${numbers.length ? finalValue : 0}` },
        ]
      : op === 'max'
        ? [
            { code: `numbers = ${listLiteral}` },
            { code: `biggest = numbers[0]`, comment: `1. initialize from the first item` },
            { code: `for n in numbers:`, comment: `2. visit each item` },
            { code: `    if n > biggest:`, comment: `3. update only when something is larger` },
            { code: `        biggest = n` },
            { code: `` },
            { code: `print(biggest)`, comment: `${numbers.length ? finalValue : 'list is empty'}` },
          ]
        : [
            { code: `numbers = ${listLiteral}` },
            { code: cfg.init, comment: `1. initialize the accumulator` },
            { code: `for n in numbers:`, comment: `2. visit each item` },
            { code: `    ${cfg.updateLine}`, comment: `3. update the accumulator` },
            { code: `` },
            { code: `print(${op === 'count' ? 'count' : 'total'})`, comment: `${finalValue}` },
          ];

  return (
    <ConceptWrapper
      title="The Accumulator Pattern"
      description="The accumulator pattern is the standard way to boil a whole collection of data down to a single result — a sum, a count, a maximum, and more. You keep a variable that 'accumulates' the answer as a loop visits each item."
    >
      <TableOfContents numbered>
        <Section
          title="The Three Steps"
          subtitle="Every accumulator follows the same shape, whatever you're computing."
        >
          <OrderedList
            items={[
              'Initialize an accumulator variable before the loop (often 0, "", or an empty list).',
              'Update the accumulator inside the loop, once per item.',
              'Use the accumulator after the loop, when it holds the final answer.',
            ]}
          />
          <PythonCodeSnippet
            lines={[
              { code: `numbers = [5, 3, 8]` },
              { code: `total = 0`, comment: `1. initialize` },
              { code: `for n in numbers:`, comment: `   loop over the data` },
              { code: `    total = total + n`, comment: `2. update each time` },
              { code: `` },
              { code: `print(total)`, comment: `3. use the result -> 16` },
            ]}
            enableRun
          />
          <Alert severity="warning" sx={{ mt: 3 }}>
            <Typography variant="body2">
              The most common bug is putting the <strong>initialize</strong> step <em>inside</em> the loop.
              That resets the accumulator on every pass, so you only ever keep the last item. Initialize{' '}
              <strong>before</strong> the loop.
            </Typography>
          </Alert>
        </Section>

        <Section
          title="Try It: Watch the Accumulator Change"
          subtitle="Enter a list of numbers and pick what to compute. The trace shows the accumulator's value after each item, and the code updates to match."
        >
          <TextField
            label="Numbers (comma-separated)"
            size="small"
            fullWidth
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            sx={{ mb: 2 }}
          />
          <ToggleButtonGroup
            value={op}
            exclusive
            onChange={(_, v) => v && setOp(v as Op)}
            size="small"
            sx={{ mb: 2, flexWrap: 'wrap' }}
          >
            {(Object.keys(opConfig) as Op[]).map((key) => (
              <ToggleButton key={key} value={key}>
                {opConfig[key].label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Typography variant="body2" sx={{ color: 'var(--ink-soft)', mb: 2 }}>
            {cfg.blurb}
          </Typography>

          {/* Accumulator trace */}
          <ConceptInfoCard>
            <Typography variant="subtitle2" gutterBottom>
              Accumulator after each step
            </Typography>
            {numbers.length === 0 ? (
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>
                Enter some numbers above to see the trace.
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    px: 1.5,
                    py: 1,
                    borderRadius: 1,
                    border: '1px solid var(--line)',
                    background: 'var(--paper-raised)',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    color: 'var(--ink-soft)',
                  }}
                >
                  start = {op === 'max' ? numbers[0] : op === 'count' ? 0 : 0}
                </Box>
                {trace.map((step, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ArrowForwardIcon sx={{ fontSize: 16, color: 'var(--ink-faint)' }} />
                    <Box
                      sx={{
                        px: 1.5,
                        py: 1,
                        borderRadius: 1,
                        border: '1px solid var(--info)',
                        background: 'var(--info-bg)',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        color: 'var(--info)',
                        fontWeight: 600,
                      }}
                    >
                      n={step.n} → {op === 'average' ? `total=${step.acc}` : step.acc}
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
            <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 700, color: 'var(--ink)' }}>
              {cfg.label} ={' '}
              <Box component="span" sx={{ color: 'var(--success)' }}>
                {numbers.length ? finalValue : '—'}
              </Box>
              {op === 'average' && numbers.length ? (
                <Typography component="span" variant="body2" sx={{ color: 'var(--ink-soft)', ml: 1 }}>
                  (total {finalRaw} ÷ {numbers.length} items)
                </Typography>
              ) : null}
            </Typography>
          </ConceptInfoCard>

          <PythonCodeSnippet lines={codeLines} enableRun />
        </Section>

        <Section
          title="Accumulators Aren't Just for Numbers"
          subtitle="The same pattern builds up strings and lists too — only the starting value and update step change."
        >
          <Typography variant="body2" paragraph>
            Start with an empty string and concatenate, or start with an empty list and append:
          </Typography>
          <PythonCodeSnippet
            lines={[
              { code: `words = ["Python", "is", "fun"]` },
              { code: `` },
              { code: `sentence = ""`, comment: `accumulate a string` },
              { code: `for w in words:` },
              { code: `    sentence = sentence + w + " "` },
              { code: `print(sentence.strip())`, comment: `Python is fun` },
              { code: `` },
              { code: `lengths = []`, comment: `accumulate a list` },
              { code: `for w in words:` },
              { code: `    lengths.append(len(w))` },
              { code: `print(lengths)`, comment: `[6, 2, 3]` },
            ]}
            enableRun
          />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
