'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from './SqlTable';

export default function NullConcept() {
  return (
    <ConceptWrapper title="Working with NULL" description="NULL means 'unknown' — and it behaves differently from any normal value.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="NULL is the absence of a value" type="key-concepts">
            <Typography variant="body2">
              <code>NULL</code> is not zero and not an empty string — it means &quot;no value / unknown.&quot; Because the value is unknown, comparing <em>to</em> it is also unknown, which trips up beginners.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Why = NULL Never Works">
          <Typography variant="body2" paragraph>
            Given employees whose <code>phone</code> may be missing:
          </Typography>
          <SqlTable
            name="employees"
            columns={['name', 'phone']}
            rows={[
              ['Ana', '555-0101'],
              ['Ben', null],
              ['Chen', null],
            ]}
          />
          <CalloutBox title="Use IS NULL, not = NULL" type="warning">
            <Typography variant="body2">
              <code>phone = NULL</code> is never true (unknown = anything is unknown). To test for missing values you must use <code>IS NULL</code> / <code>IS NOT NULL</code>.
            </Typography>
          </CalloutBox>
          <CodeSnippet lines={[{ code: 'SELECT name' }, { code: 'FROM employees' }, { code: 'WHERE phone IS NULL;' }]} />
          <SqlTable caption="Result" columns={['name']} rows={[['Ben'], ['Chen']]} />
        </Section>

        <Section title="Replace NULL with COALESCE">
          <Typography variant="body2" paragraph>
            <code>COALESCE</code> returns the first non-null value, perfect for a fallback:
          </Typography>
          <CodeSnippet lines={[{ code: "SELECT name, COALESCE(phone, 'no phone') AS phone" }, { code: 'FROM employees;' }]} />
          <Typography variant="body2">
            Also remember: aggregate functions like <code>AVG</code> and <code>SUM</code> simply skip <code>NULL</code>s.
          </Typography>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
