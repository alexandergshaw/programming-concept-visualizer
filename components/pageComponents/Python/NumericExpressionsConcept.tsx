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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Alert,
} from '@mui/material';

const operators = [
  { op: '+', name: 'Addition', example: '7 + 2', result: '9' },
  { op: '-', name: 'Subtraction', example: '7 - 2', result: '5' },
  { op: '*', name: 'Multiplication', example: '7 * 2', result: '14' },
  { op: '/', name: 'Division (always a float)', example: '7 / 2', result: '3.5' },
  { op: '//', name: 'Floor division (drops the remainder)', example: '7 // 2', result: '3' },
  { op: '%', name: 'Modulo (the remainder)', example: '7 % 2', result: '1' },
  { op: '**', name: 'Exponent (power)', example: '7 ** 2', result: '49' },
];

export default function NumericExpressionsConcept() {
  const [price, setPrice] = useState(20);
  const [quantity, setQuantity] = useState(3);
  const [taxRate, setTaxRate] = useState(8);

  const subtotal = price * quantity;
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;
  // Round money to 2 dp for display, matching round(total, 2) in the code.
  const round2 = (n: number) => Math.round(n * 100) / 100;

  return (
    <ConceptWrapper
      title="Numeric Expressions"
      description="A numeric expression combines numbers, variables, and arithmetic operators to compute a value. By storing the inputs to a problem in variables and combining them, you can let Python do the arithmetic for you."
    >
      <TableOfContents numbered>
        <Section
          title="Numbers in Python"
          subtitle="Python has two everyday number types. You don't declare which one you're using — Python figures it out from the value."
        >
          <ConceptInfoCard>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2">
                <strong>int</strong> — a whole number, like <code>5</code>, <code>-12</code>, or <code>1000</code>.
              </Typography>
              <Typography variant="body2">
                <strong>float</strong> — a number with a decimal point, like <code>3.5</code>, <code>-0.1</code>, or <code>2.0</code>.
              </Typography>
            </Box>
          </ConceptInfoCard>
          <PythonCodeSnippet
            lines={[
              { code: `age = 25`, comment: `an int (whole number)` },
              { code: `price = 4.99`, comment: `a float (has a decimal point)` },
              { code: `` },
              { code: `print(type(age))`, comment: `<class 'int'>` },
              { code: `print(type(price))`, comment: `<class 'float'>` },
            ]}
            enableRun
          />
        </Section>

        <Section
          title="Arithmetic Operators"
          subtitle="These seven operators are the building blocks of every numeric expression."
        >
          <Table size="small" aria-label="Python arithmetic operators">
            <TableHead>
              <TableRow>
                <TableCell><strong>Operator</strong></TableCell>
                <TableCell><strong>Meaning</strong></TableCell>
                <TableCell><strong>Example</strong></TableCell>
                <TableCell><strong>Result</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {operators.map((row) => (
                <TableRow key={row.op}>
                  <TableCell>
                    <code>{row.op}</code>
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <code>{row.example}</code>
                  </TableCell>
                  <TableCell>
                    <code>{row.result}</code>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="body2">
              Watch the difference between <code>/</code> and <code>{'//'}</code>: <code>7 / 2</code> gives{' '}
              <code>3.5</code>, but <code>7 // 2</code> gives <code>3</code> (it throws away the remainder).
              The leftover from that division is exactly what <code>%</code> gives you: <code>7 % 2</code> is{' '}
              <code>1</code>.
            </Typography>
          </Alert>
        </Section>

        <Section
          title="Order of Operations"
          subtitle="When an expression mixes operators, Python follows the same precedence you learned in math class (often remembered as PEMDAS)."
        >
          <OrderedList
            items={[
              'Parentheses ( )',
              'Exponents **',
              'Multiplication, division, floor division, and modulo (* / // %), left to right',
              'Addition and subtraction (+ -), left to right',
            ]}
          />
          <Typography variant="body2" paragraph>
            Because multiplication happens before addition, the two expressions below give different answers.
            Use parentheses to make your intent clear and to force a different order.
          </Typography>
          <PythonCodeSnippet
            lines={[
              { code: `result_1 = 2 + 3 * 4`, comment: `3 * 4 happens first, then + 2  ->  14` },
              { code: `result_2 = (2 + 3) * 4`, comment: `parentheses force 2 + 3 first  ->  20` },
              { code: `` },
              { code: `print(result_1)`, comment: `14` },
              { code: `print(result_2)`, comment: `20` },
            ]}
            enableRun
          />
        </Section>

        <Section
          title="Solving a Problem with Variables"
          subtitle="The real power: store each input in a well-named variable, then write one expression per quantity you need. Change the inputs below and watch the expressions recompute."
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <TextField
              label="Item price ($)"
              size="small"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <TextField
              label="Quantity"
              size="small"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <TextField
              label="Tax rate (%)"
              size="small"
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
            />
          </Box>

          <PythonCodeSnippet
            lines={[
              { code: `price = ${price}`, comment: `the inputs to the problem, stored in variables` },
              { code: `quantity = ${quantity}` },
              { code: `tax_rate = ${taxRate}` },
              { code: `` },
              { code: `subtotal = price * quantity`, comment: `expression 1  ->  ${subtotal}` },
              { code: `tax = subtotal * (tax_rate / 100)`, comment: `expression 2  ->  ${round2(tax)}` },
              { code: `total = subtotal + tax`, comment: `expression 3  ->  ${round2(total)}` },
              { code: `` },
              { code: `print("Total due: $" + str(round(total, 2)))`, comment: `Total due: $${round2(total)}` },
            ]}
            enableRun
          />

          <Alert severity="success" sx={{ mt: 3 }}>
            <Typography variant="body2">
              Notice how each line builds on the variables above it. Breaking a problem into named,
              single-purpose expressions makes it readable and easy to change — that is the whole point of
              using variables instead of one giant formula.
            </Typography>
          </Alert>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
