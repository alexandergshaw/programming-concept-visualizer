'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from './SqlTable';

export default function ConstraintsConcept() {
  return (
    <ConceptWrapper title="Constraints" description="Rules the database enforces so your data can never go bad.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="Constraints guard data quality" type="key-concepts">
            <Typography variant="body2">
              A <strong>constraint</strong> is a rule attached to a column or table. The database rejects any <code>INSERT</code> or <code>UPDATE</code> that would break it, so invalid data simply cannot get in.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="The Essential Constraints">
          <SqlTable
            columns={['Constraint', 'Guarantees']}
            rows={[
              ['PRIMARY KEY', 'unique + not null; identifies each row'],
              ['FOREIGN KEY', 'value must exist in another table'],
              ['NOT NULL', 'a value is required'],
              ['UNIQUE', 'no two rows repeat this value'],
              ['CHECK', 'value must satisfy a condition'],
              ['DEFAULT', 'value used when none is supplied'],
            ]}
            highlight={[0]}
          />
        </Section>

        <Section title="Constraints in a Definition">
          <CodeSnippet lines={[{ code: 'CREATE TABLE orders (' }, { code: '    id          INTEGER PRIMARY KEY,' }, { code: '    customer_id INTEGER NOT NULL REFERENCES customers(id),' }, { code: '    total       DECIMAL(10,2) CHECK (total >= 0),' }, { code: '    email       VARCHAR(255) UNIQUE' }, { code: ');' }]} />
          <Typography variant="body2">
            <code>REFERENCES customers(id)</code> is the foreign key; <code>CHECK (total &gt;= 0)</code> blocks negative totals.
          </Typography>
        </Section>

        <Section title="Why It Matters">
          <CalloutBox title="The database is your last line of defense" type="success">
            <Typography variant="body2">
              Application code can have bugs; constraints can&apos;t be bypassed. Putting rules in the schema means the data stays valid no matter which app, script, or person writes to it.
            </Typography>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
