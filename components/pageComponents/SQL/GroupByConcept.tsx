'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from './SqlTable';

export default function GroupByConcept() {
  return (
    <ConceptWrapper title="GROUP BY" description="Split rows into groups and summarize each group separately.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="GROUP BY = one summary row per group" type="key-concepts">
            <Typography variant="body2">
              <code>GROUP BY</code> bundles rows that share a value, then runs an aggregate on each bundle. &quot;Average salary&quot; becomes &quot;average salary <strong>per department</strong>.&quot;
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="From Rows to Groups">
          <Typography variant="body2" paragraph>
            Starting from <code>employees</code>:
          </Typography>
          <SqlTable
            name="employees"
            columns={['name', 'department', 'salary']}
            rows={[
              ['Ana', 'Sales', 50000],
              ['Ben', 'Engineering', 80000],
              ['Chen', 'Sales', 55000],
            ]}
            highlight={[1]}
          />
          <CodeSnippet lines={[{ code: 'SELECT department, COUNT(*) AS people, AVG(salary) AS avg_salary' }, { code: 'FROM employees' }, { code: 'GROUP BY department;' }]} />
          <SqlTable
            caption="Result — one row per department"
            columns={['department', 'people', 'avg_salary']}
            rows={[
              ['Sales', 2, 52500],
              ['Engineering', 1, 80000],
            ]}
          />
        </Section>

        <Section title="The Golden Rule">
          <CalloutBox title="Every selected column is grouped or aggregated" type="warning">
            <Typography variant="body2">
              In the <code>SELECT</code> list you may only use columns that appear in <code>GROUP BY</code>, or columns wrapped in an aggregate. Selecting a raw <code>name</code> alongside <code>GROUP BY department</code> is an error — which name would it show for the group?
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Key Takeaways">
          <CalloutBox title="Summary" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><code>GROUP BY col</code> produces one result row per distinct value of <code>col</code>.</Typography>
              <Typography variant="body2">Aggregates then run within each group.</Typography>
              <Typography variant="body2">Non-aggregated SELECT columns must be in the <code>GROUP BY</code>.</Typography>
            </Box>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
