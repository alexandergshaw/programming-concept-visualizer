'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import CrudPlayground from './CrudPlayground';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function InsertConcept() {
  return (
    <ConceptWrapper title="INSERT" description="Add new rows to a table.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="INSERT adds rows" type="key-concepts">
            <Typography variant="body2">
              <code>INSERT INTO</code> lists the columns you are filling, and <code>VALUES</code> provides the data — in the same order — for the new row.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Insert One Row">
          <CodeSnippet lines={[{ code: 'INSERT INTO customers (name, country)' }, { code: "VALUES ('Dana', 'Spain');" }]} />
          <CalloutBox title="Name your columns" type="warning">
            <Typography variant="body2">
              You can omit the column list (<code>INSERT INTO customers VALUES (...)</code>), but then you must supply every column in exact table order. Listing columns is safer and survives schema changes.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Insert Many Rows at Once">
          <CodeSnippet lines={[{ code: 'INSERT INTO customers (name, country)' }, { code: 'VALUES' }, { code: "    ('Eli', 'Italy')," }, { code: "    ('Fay', 'France')," }, { code: "    ('Gus', 'Canada');" }]} />
          <Typography variant="body2">One statement, multiple rows — faster than running several inserts.</Typography>
        </Section>

        <Section title="Good to Know">
          <CalloutBox title="Defaults and ids" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2">Columns you omit get their <strong>DEFAULT</strong> value, or <code>NULL</code> if allowed.</Typography>
              <Typography variant="body2">Auto-incrementing <code>id</code> columns are generated for you — don&apos;t supply them.</Typography>
              <Typography variant="body2">You can insert the results of a query with <code>INSERT INTO ... SELECT ...</code>.</Typography>
            </Box>
          </CalloutBox>
        </Section>
        <Section title="Try It: Insert Rows">
          <Typography variant="body2" paragraph>
            Fill in a name and country and press INSERT. Watch the row appear in the table and the generated SQL update.
          </Typography>
          <CrudPlayground only="insert" />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
