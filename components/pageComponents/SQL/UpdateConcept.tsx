'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function UpdateConcept() {
  return (
    <ConceptWrapper title="UPDATE" description="Change values in rows that already exist.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="UPDATE ... SET ... WHERE" type="key-concepts">
            <Typography variant="body2">
              <code>UPDATE</code> names the table, <code>SET</code> assigns new values, and <code>WHERE</code> decides which rows change. The <code>WHERE</code> is the most important part.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Update Specific Rows">
          <CodeSnippet lines={[{ code: 'UPDATE employees' }, { code: 'SET salary = 60000' }, { code: 'WHERE name = \'Ana\';' }]} />
          <Typography variant="body2">You can set several columns at once: <code>SET salary = 60000, department = &apos;Engineering&apos;</code>.</Typography>
        </Section>

        <Section title="The Most Dangerous Mistake">
          <CalloutBox title="Forgetting WHERE updates EVERY row" type="warning">
            <Typography variant="body2">
              <code>UPDATE employees SET salary = 60000;</code> with no <code>WHERE</code> sets <em>everyone&apos;s</em> salary to 60000. Always write (and double-check) the <code>WHERE</code> first. A good habit: run the same condition as a <code>SELECT</code> before you update.
            </Typography>
          </CalloutBox>
          <CodeSnippet lines={[{ code: '-- 1) preview what will change' }, { code: "SELECT * FROM employees WHERE name = 'Ana';" }, { code: '-- 2) then update with the same WHERE' }, { code: "UPDATE employees SET salary = 60000 WHERE name = 'Ana';" }]} />
        </Section>

        <Section title="Update Using Existing Values">
          <Typography variant="body2" paragraph>
            The new value can be based on the current one — give the Sales team a 10% raise:
          </Typography>
          <CodeSnippet lines={[{ code: 'UPDATE employees' }, { code: 'SET salary = salary * 1.10' }, { code: "WHERE department = 'Sales';" }]} />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
