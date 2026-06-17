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

export default function OrderByConcept() {
  return (
    <ConceptWrapper title="ORDER BY: Sorting" description="Put the result rows in a chosen order.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="ORDER BY sorts the result" type="key-concepts">
            <Typography variant="body2">
              Query results have <strong>no guaranteed order</strong> unless you ask for one. <code>ORDER BY</code> sorts the rows by one or more columns, ascending by default.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Sort by One Column">
          <CodeSnippet lines={[{ code: 'SELECT name, salary' }, { code: 'FROM employees' }, { code: 'ORDER BY salary DESC;' }]} />
          <SqlTable
            caption="Result — highest salary first (DESC)"
            columns={['name', 'salary']}
            rows={[
              ['Ben', 80000],
              ['Chen', 55000],
              ['Ana', 50000],
            ]}
          />
          <CalloutBox title="ASC vs DESC" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><code>ASC</code> — ascending (A-Z, low-high). This is the default if you write nothing.</Typography>
              <Typography variant="body2"><code>DESC</code> — descending (Z-A, high-low).</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="Sort by Several Columns">
          <Typography variant="body2" paragraph>
            List columns in priority order. Here rows are grouped by department, then by salary (highest first) within each department:
          </Typography>
          <CodeSnippet lines={[{ code: 'SELECT name, department, salary' }, { code: 'FROM employees' }, { code: 'ORDER BY department ASC, salary DESC;' }]} />
          <Typography variant="body2">
            The second column only breaks ties within the first.
          </Typography>
        </Section>

        <Section title="Key Takeaways">
          <CalloutBox title="Summary" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2">Without <code>ORDER BY</code>, row order is not guaranteed.</Typography>
              <Typography variant="body2">Default is ascending; add <code>DESC</code> to reverse.</Typography>
              <Typography variant="body2">Multiple columns sort by priority, left to right.</Typography>
            </Box>
          </CalloutBox>
        </Section>
        <Section title="Try It: Sort Rows">
          <Typography variant="body2" paragraph>
            Choose a column to sort by and flip between ASC and DESC. Watch the rows reorder.
          </Typography>
          <SqlPlayground features={{ columns: false, where: false, orderBy: true, limit: false }} />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
