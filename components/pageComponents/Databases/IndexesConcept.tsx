'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function IndexesConcept() {
  return (
    <ConceptWrapper title="Indexes & Performance" description="How databases find rows fast instead of scanning everything.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="An index is like a book's index" type="key-concepts">
            <Typography variant="body2">
              Without an index, finding rows means reading the whole table. An <strong>index</strong> is a sorted lookup of a column&apos;s values that lets the database jump straight to matching rows — just like the index at the back of a book.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="The Difference It Makes">
          <CalloutBox title="Scan vs seek" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>No index:</strong> a &quot;full table scan&quot; checks every row — slow on big tables.</Typography>
              <Typography variant="body2"><strong>With an index:</strong> the engine seeks the value directly, like binary search on sorted data.</Typography>
            </Box>
          </CalloutBox>
          <CodeSnippet lines={[{ code: 'CREATE INDEX idx_users_email ON users (email);' }]} />
        </Section>

        <Section title="The Trade-off">
          <CalloutBox title="Indexes aren't free" type="warning">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Reads get faster</strong> on indexed columns.</Typography>
              <Typography variant="body2"><strong>Writes get slower</strong> — each insert/update maintains the index too.</Typography>
              <Typography variant="body2"><strong>They use storage.</strong> Index what you search on, not everything.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="What to Index">
          <CalloutBox title="Good candidates" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2">Primary keys (indexed automatically) and foreign keys.</Typography>
              <Typography variant="body2">Columns frequently used in <code>WHERE</code>, <code>JOIN</code>, and <code>ORDER BY</code>.</Typography>
              <Typography variant="body2">Measure first — add indexes to fix real slow queries, not on a hunch.</Typography>
            </Box>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
