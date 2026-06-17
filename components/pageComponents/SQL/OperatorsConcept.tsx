'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import SqlPlayground from './SqlPlayground';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from './SqlTable';

export default function OperatorsConcept() {
  return (
    <ConceptWrapper title="Operators (AND, OR, NOT)" description="Build precise filter conditions by comparing and combining tests.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="Conditions are true/false tests" type="key-concepts">
            <Typography variant="body2">
              A <code>WHERE</code> condition is built from <strong>comparisons</strong> (is this column equal to / bigger than a value?) joined by <strong>logical operators</strong> (<code>AND</code>, <code>OR</code>, <code>NOT</code>).
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Comparison Operators">
          <SqlTable
            columns={['Operator', 'Meaning', 'Example']}
            rows={[
              ['=', 'equal to', "country = 'France'"],
              ['<> or !=', 'not equal to', "status <> 'closed'"],
              ['>  <  >=  <=', 'greater / less than', 'salary >= 50000'],
            ]}
            highlight={[0]}
          />
        </Section>

        <Section title="Combining with AND / OR / NOT">
          <Typography variant="body2" paragraph>
            <code>AND</code> needs both sides true; <code>OR</code> needs either; <code>NOT</code> flips a condition.
          </Typography>
          <CodeSnippet lines={[{ code: 'SELECT name' }, { code: 'FROM employees' }, { code: "WHERE department = 'Sales'" }, { code: '  AND salary > 52000;' }]} />
          <CalloutBox title="Use parentheses with mixed AND/OR" type="warning">
            <Typography variant="body2">
              <code>AND</code> binds tighter than <code>OR</code>, so mixed conditions can surprise you. Group them explicitly: <code>WHERE (a OR b) AND c</code> means something different from <code>a OR (b AND c)</code>.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Key Takeaways">
          <CalloutBox title="Summary" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2">Compare with <code>=</code>, <code>&lt;&gt;</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>.</Typography>
              <Typography variant="body2">Combine with <code>AND</code>, <code>OR</code>, <code>NOT</code>.</Typography>
              <Typography variant="body2">Parenthesize mixed <code>AND</code>/<code>OR</code> to make intent clear.</Typography>
            </Box>
          </CalloutBox>
        </Section>
        <Section title="Try It: Build a Condition">
          <Typography variant="body2" paragraph>
            Combine a column, an operator, and a value to filter the rows. Try the different operators and watch which rows survive.
          </Typography>
          <SqlPlayground features={{ columns: false, where: true, orderBy: false, limit: false }} />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
