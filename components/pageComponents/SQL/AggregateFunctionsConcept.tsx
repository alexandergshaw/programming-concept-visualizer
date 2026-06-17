'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import OptionExplorer from './OptionExplorer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from './SqlTable';

export default function AggregateFunctionsConcept() {
  return (
    <ConceptWrapper title="Aggregate Functions" description="Collapse many rows into a single summary number.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="Aggregates summarize a column" type="key-concepts">
            <Typography variant="body2">
              An <strong>aggregate function</strong> takes many rows and returns one value — a count, total, average, minimum, or maximum. It turns &quot;a list of salaries&quot; into &quot;the average salary.&quot;
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="The Five You Need">
          <SqlTable
            columns={['Function', 'Returns']}
            rows={[
              ['COUNT(*)', 'number of rows'],
              ['SUM(col)', 'total of a numeric column'],
              ['AVG(col)', 'average of a numeric column'],
              ['MIN(col)', 'smallest value'],
              ['MAX(col)', 'largest value'],
            ]}
            highlight={[0]}
          />
        </Section>

        <Section title="An Example">
          <Typography variant="body2" paragraph>
            Summarize the whole <code>employees</code> table at once:
          </Typography>
          <CodeSnippet lines={[{ code: 'SELECT COUNT(*)  AS headcount,' }, { code: '       AVG(salary) AS avg_salary,' }, { code: '       MAX(salary) AS top_salary' }, { code: 'FROM employees;' }]} />
          <SqlTable
            caption="Result — one summary row"
            columns={['headcount', 'avg_salary', 'top_salary']}
            rows={[[3, 61667, 80000]]}
          />
        </Section>

        <Section title="Two Gotchas">
          <CalloutBox title="Remember these" type="warning">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>NULLs are ignored</strong> by <code>SUM</code>, <code>AVG</code>, etc. <code>COUNT(col)</code> skips NULLs, but <code>COUNT(*)</code> counts every row.</Typography>
              <Typography variant="body2"><strong>Count uniques</strong> with <code>COUNT(DISTINCT department)</code>.</Typography>
            </Box>
          </CalloutBox>
          <Typography variant="body2" sx={{ mt: 1 }}>
            To get a summary <em>per group</em> instead of one for the whole table, add <code>GROUP BY</code> — covered next.
          </Typography>
        </Section>
        <Section title="Explore the Functions">
          <Typography variant="body2" paragraph>
            Click each aggregate to see what it does and an example query.
          </Typography>
          <OptionExplorer
            options={[
              { label: 'COUNT', points: ['Counts rows', 'COUNT(*) counts every row; COUNT(col) skips NULLs'], code: 'SELECT COUNT(*) FROM employees;' },
              { label: 'SUM', points: ['Adds up a numeric column', 'Ignores NULLs'], code: 'SELECT SUM(salary) FROM employees;' },
              { label: 'AVG', points: ['Average of a numeric column'], code: 'SELECT AVG(salary) FROM employees;' },
              { label: 'MIN / MAX', points: ['Smallest and largest value'], code: 'SELECT MIN(salary), MAX(salary) FROM employees;' },
            ]}
          />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
