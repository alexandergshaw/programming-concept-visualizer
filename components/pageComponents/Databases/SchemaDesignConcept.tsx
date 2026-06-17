'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function SchemaDesignConcept() {
  return (
    <ConceptWrapper title="Schema Design" description="Turning real-world things into well-shaped tables and columns.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="Schema design = choosing your tables" type="key-concepts">
            <Typography variant="body2">
              The <strong>schema</strong> is the blueprint of your database: which tables exist, what columns they have, and how they link. Good design makes data easy to query and hard to corrupt; poor design fights you forever.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="A Simple Process">
          <CalloutBox title="From idea to tables" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>1. List the entities</strong> — the nouns you store (customer, order, product).</Typography>
              <Typography variant="body2"><strong>2. Give each a table</strong> with a primary key.</Typography>
              <Typography variant="body2"><strong>3. List each entity&apos;s attributes</strong> — these become columns with types.</Typography>
              <Typography variant="body2"><strong>4. Connect them</strong> with foreign keys for each relationship.</Typography>
              <Typography variant="body2"><strong>5. Add constraints</strong> so invalid data can&apos;t get in.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="Guiding Principles">
          <CalloutBox title="What good schemas share" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>One fact in one place.</strong> Don&apos;t store a customer&apos;s name on every order.</Typography>
              <Typography variant="body2"><strong>One thing per column.</strong> Split &quot;full_name&quot; or a comma-separated list into proper columns/rows.</Typography>
              <Typography variant="body2"><strong>Name things clearly</strong> and consistently (<code>customer_id</code>, not <code>cid</code>).</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="Where This Goes Next">
          <Typography variant="body2">
            Applying &quot;one fact in one place&quot; rigorously is called <strong>normalization</strong> — the next page. Sometimes you deliberately relax it for speed, which is <strong>denormalization</strong>.
          </Typography>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
