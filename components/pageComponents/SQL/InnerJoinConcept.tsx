'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from './SqlTable';
import JoinPlayground from './JoinPlayground';

export default function InnerJoinConcept() {
  return (
    <ConceptWrapper title="INNER JOIN" description="Combine two tables into one, keeping only rows that match in both.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="INNER JOIN matches rows by a key" type="key-concepts">
            <Typography variant="body2">
              An <code>INNER JOIN</code> stitches two tables together wherever a column in one matches a column in the other. Rows with no match on either side are dropped.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Joining customers and orders">
          <SqlTable name="customers" columns={['id', 'name']} rows={[[1, 'Ana'], [2, 'Ben'], [3, 'Chen']]} />
          <SqlTable name="orders" columns={['id', 'customer_id', 'total']} rows={[[101, 1, 40], [102, 2, 90]]} />
          <CodeSnippet lines={[{ code: 'SELECT customers.name, orders.total' }, { code: 'FROM customers' }, { code: 'INNER JOIN orders' }, { code: '  ON customers.id = orders.customer_id;' }]} />
          <SqlTable
            caption="Result — Chen has no orders, so Chen is dropped"
            columns={['name', 'total']}
            rows={[['Ana', 40], ['Ben', 90]]}
          />
        </Section>

        <Section title="The ON Clause Is the Match Rule">
          <CalloutBox title="ON says how rows pair up" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><code>ON customers.id = orders.customer_id</code> is the link followed for each row.</Typography>
              <Typography variant="body2">Prefix columns with the table (or an alias) when both tables share a column name.</Typography>
              <Typography variant="body2"><code>JOIN</code> on its own means <code>INNER JOIN</code> — the word INNER is optional.</Typography>
            </Box>
          </CalloutBox>
          <CodeSnippet lines={[{ code: 'SELECT c.name, o.total' }, { code: 'FROM customers c' }, { code: 'JOIN orders o ON c.id = o.customer_id;' }]} />
        </Section>

        <Section title="Key Takeaways">
          <CalloutBox title="Summary" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><code>INNER JOIN</code> keeps only rows that match in both tables.</Typography>
              <Typography variant="body2">The <code>ON</code> clause defines the matching condition.</Typography>
              <Typography variant="body2">To keep unmatched rows too, use an outer join (next).</Typography>
            </Box>
          </CalloutBox>
        </Section>
        <Section title="Try It: Join Explorer">
          <Typography variant="body2" paragraph>
            Switch between join types and watch which rows survive. Start with INNER, then compare it to the others.
          </Typography>
          <JoinPlayground />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
