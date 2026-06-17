'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from './SqlTable';

export default function SelectConcept() {
  return (
    <ConceptWrapper title="SELECT & FROM" description="The statement that reads data: choose columns FROM a table.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="SELECT columns FROM a table" type="key-concepts">
            <Typography variant="body2">
              <code>SELECT</code> lists the <strong>columns</strong> you want; <code>FROM</code> names the <strong>table</strong> to read them from. The result is always a new table of rows.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Pick Specific Columns">
          <Typography variant="body2" paragraph>
            Given this <code>employees</code> table:
          </Typography>
          <SqlTable
            name="employees"
            columns={['id', 'name', 'department', 'salary']}
            rows={[
              [1, 'Ana', 'Sales', 50000],
              [2, 'Ben', 'Engineering', 80000],
              [3, 'Chen', 'Sales', 55000],
            ]}
          />
          <Typography variant="body2" paragraph>
            Ask for just two columns:
          </Typography>
          <CodeSnippet lines={[{ code: 'SELECT name, salary' }, { code: 'FROM employees;' }]} />
          <SqlTable
            caption="Result"
            columns={['name', 'salary']}
            rows={[
              ['Ana', 50000],
              ['Ben', 80000],
              ['Chen', 55000],
            ]}
          />
        </Section>

        <Section title="Select Everything with *">
          <Typography variant="body2" paragraph>
            <code>*</code> means &quot;all columns.&quot; Handy when exploring, but in real queries it is better to name the columns you actually need.
          </Typography>
          <CodeSnippet lines={[{ code: 'SELECT *' }, { code: 'FROM employees;' }]} />
          <CalloutBox title="Why avoid SELECT * in real code" type="warning">
            <Typography variant="body2">
              It returns more data than you need (slower), and your code breaks silently if columns are later added or reordered. Name your columns.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Compute New Columns">
          <Typography variant="body2" paragraph>
            <code>SELECT</code> can also calculate values, not just copy them:
          </Typography>
          <CodeSnippet lines={[{ code: 'SELECT name, salary * 1.10 AS new_salary' }, { code: 'FROM employees;' }]} />
          <Typography variant="body2">
            <code>AS new_salary</code> gives the computed column a readable name (an <em>alias</em>).
          </Typography>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
