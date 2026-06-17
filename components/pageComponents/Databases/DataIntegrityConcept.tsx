'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from '../SQL/SqlTable';

export default function DataIntegrityConcept() {
  return (
    <ConceptWrapper title="Constraints & Data Integrity" description="Rules the database enforces so bad data simply cannot get in.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="The database protects its own data" type="key-concepts">
            <Typography variant="body2">
              <strong>Data integrity</strong> means the data is accurate and consistent. The database enforces it with <strong>constraints</strong> — rules that reject any change that would break them, no matter which app or person made it.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="The Constraints That Guard Data">
          <SqlTable
            columns={['Constraint', 'Guarantees']}
            rows={[
              ['PRIMARY KEY', 'each row is uniquely identified'],
              ['FOREIGN KEY', 'links point to a row that exists'],
              ['NOT NULL', 'a required value is present'],
              ['UNIQUE', 'no duplicates (e.g. one account per email)'],
              ['CHECK', 'values obey a rule (e.g. age >= 0)'],
              ['DEFAULT', 'a sensible value when none is given'],
            ]}
            highlight={[0]}
          />
        </Section>

        <Section title="Three Kinds of Integrity">
          <CalloutBox title="The textbook breakdown" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Entity integrity:</strong> every row has a valid, unique primary key.</Typography>
              <Typography variant="body2"><strong>Referential integrity:</strong> every foreign key matches a real row.</Typography>
              <Typography variant="body2"><strong>Domain integrity:</strong> every value fits its column&apos;s type and rules.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="Why Put Rules in the Database">
          <CalloutBox title="Code has bugs; constraints don't bend" type="success">
            <Typography variant="body2">
              Validation in app code can be skipped, forgotten, or bypassed by another script. A constraint in the schema is the last line of defense — it holds for every writer, forever.
            </Typography>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
