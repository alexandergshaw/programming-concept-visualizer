'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function ViewsConcept() {
  return (
    <ConceptWrapper title="Views" description="A saved query you can use like a table.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="A view is a named, reusable query" type="key-concepts">
            <Typography variant="body2">
              A <strong>view</strong> stores a <code>SELECT</code> under a name. Querying the view runs its query and returns fresh results — so you write a complex query once and reuse it as if it were a simple table.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Create and Use a View">
          <CodeSnippet lines={[{ code: 'CREATE VIEW active_customers AS' }, { code: 'SELECT id, name, country' }, { code: 'FROM customers' }, { code: "WHERE status = 'active';" }]} />
          <Typography variant="body2" paragraph>
            From then on, query it like any table:
          </Typography>
          <CodeSnippet lines={[{ code: 'SELECT name' }, { code: 'FROM active_customers' }, { code: "WHERE country = 'France';" }]} />
        </Section>

        <Section title="Why Use Views">
          <CalloutBox title="Benefits" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Simplicity:</strong> hide a complicated join/filter behind a friendly name.</Typography>
              <Typography variant="body2"><strong>Consistency:</strong> everyone uses the same definition of &quot;active customer.&quot;</Typography>
              <Typography variant="body2"><strong>Security:</strong> expose a view with only certain columns instead of the raw table.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="Good to Know">
          <CalloutBox title="Views don't store data" type="info">
            <Typography variant="body2">
              A normal view holds no data of its own — it re-runs its query each time, so results are always current. (Some databases also offer <strong>materialized views</strong>, which cache the results and must be refreshed.)
            </Typography>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
