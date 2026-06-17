'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from './SqlTable';
import SqlPlayground from './SqlPlayground';

export default function WhereConcept() {
  return (
    <ConceptWrapper title="WHERE: Filtering Rows" description="Keep only the rows that match a condition.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="WHERE keeps matching rows" type="key-concepts">
            <Typography variant="body2">
              <code>WHERE</code> tests every row against a condition and keeps only the rows where it is <strong>true</strong>. <code>SELECT</code> chooses columns; <code>WHERE</code> chooses rows.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="A Single Condition">
          <Typography variant="body2" paragraph>
            From the <code>employees</code> table, keep only the Sales team:
          </Typography>
          <CodeSnippet lines={[{ code: 'SELECT name, department' }, { code: 'FROM employees' }, { code: "WHERE department = 'Sales';" }]} />
          <SqlTable
            caption="Result — only rows where department = 'Sales'"
            columns={['name', 'department']}
            rows={[
              ['Ana', 'Sales'],
              ['Chen', 'Sales'],
            ]}
          />
          <CalloutBox title="Watch the quotes" type="warning">
            <Typography variant="body2">
              Text values go in <strong>single quotes</strong> (<code>&apos;Sales&apos;</code>); numbers do not (<code>salary &gt; 60000</code>). Equality uses a single <code>=</code>, not <code>==</code>.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Combining Conditions">
          <Typography variant="body2" paragraph>
            Use <code>AND</code> / <code>OR</code> to combine tests — for example, Sales employees earning more than 52,000:
          </Typography>
          <CodeSnippet lines={[{ code: 'SELECT name' }, { code: 'FROM employees' }, { code: "WHERE department = 'Sales'" }, { code: '  AND salary > 52000;' }]} />
          <SqlTable caption="Result" columns={['name']} rows={[['Chen']]} />
        </Section>

        <Section title="Key Takeaways">
          <CalloutBox title="Summary" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><code>WHERE</code> filters rows by a condition that is true or false per row.</Typography>
              <Typography variant="body2">Quote text values; combine tests with <code>AND</code>/<code>OR</code>.</Typography>
              <Typography variant="body2">More operators (<code>IN</code>, <code>BETWEEN</code>, <code>LIKE</code>) come next.</Typography>
            </Box>
          </CalloutBox>
        </Section>
        <Section title="Try It: Filter Rows">
          <Typography variant="body2" paragraph>
            Pick a column, an operator, and a value. Try <code>department = Sales</code>, <code>salary &gt; 60000</code>, or <code>name LIKE A%</code>.
          </Typography>
          <SqlPlayground features={{ columns: false, where: true, orderBy: false, limit: false }} />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
