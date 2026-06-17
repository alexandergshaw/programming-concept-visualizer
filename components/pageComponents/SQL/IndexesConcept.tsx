'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import IndexPlayground from './IndexPlayground';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function IndexesConcept() {
  return (
    <ConceptWrapper title="Indexes" description="A lookup structure that makes searches fast — like the index at the back of a book.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="An index is a shortcut to rows" type="key-concepts">
            <Typography variant="body2">
              Without an index, finding matching rows means scanning the whole table. An <strong>index</strong> keeps a sorted lookup of a column&apos;s values, so the database can jump straight to the rows it needs — the same reason a book has an index instead of making you read every page.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Creating One">
          <Typography variant="body2" paragraph>
            If you often filter customers by email, index that column:
          </Typography>
          <CodeSnippet lines={[{ code: 'CREATE INDEX idx_customers_email' }, { code: 'ON customers (email);' }]} />
          <Typography variant="body2">
            Now <code>WHERE email = &apos;ana@x.com&apos;</code> can use the index instead of scanning every row. (This connects to binary search from the Algorithms section — sorted data is searchable fast.)
          </Typography>
        </Section>

        <Section title="The Trade-off">
          <CalloutBox title="Indexes are not free" type="warning">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Reads get faster</strong> for columns you filter, join, or sort on.</Typography>
              <Typography variant="body2"><strong>Writes get slower</strong> — every <code>INSERT</code>/<code>UPDATE</code> must also update the index.</Typography>
              <Typography variant="body2"><strong>They take space.</strong> Index the columns you actually search on, not every column.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="What to Index">
          <CalloutBox title="Good candidates" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2">Primary keys are indexed automatically.</Typography>
              <Typography variant="body2">Columns used in <code>WHERE</code>, <code>JOIN ... ON</code>, and <code>ORDER BY</code>.</Typography>
              <Typography variant="body2">Foreign key columns, which are frequently joined.</Typography>
            </Box>
          </CalloutBox>
        </Section>
        <Section title="Try It: Index vs Scan">
          <Typography variant="body2" paragraph>
            Toggle the index on and off and watch how many rows the database has to look at to answer the same query.
          </Typography>
          <IndexPlayground />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
