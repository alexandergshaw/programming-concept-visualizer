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

export default function OuterJoinsConcept() {
  return (
    <ConceptWrapper title="LEFT & RIGHT JOIN" description="Keep every row from one table even when there is no match in the other.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="Outer joins keep unmatched rows" type="key-concepts">
            <Typography variant="body2">
              A <code>LEFT JOIN</code> keeps <strong>every</strong> row from the left table; where the right table has no match, its columns come back as <code>NULL</code>. A <code>RIGHT JOIN</code> does the same for the right table.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="LEFT JOIN: every customer, orders if any">
          <SqlTable name="customers" columns={['id', 'name']} rows={[[1, 'Ana'], [2, 'Ben'], [3, 'Chen']]} />
          <SqlTable name="orders" columns={['id', 'customer_id', 'total']} rows={[[101, 1, 40], [102, 2, 90]]} />
          <CodeSnippet lines={[{ code: 'SELECT c.name, o.total' }, { code: 'FROM customers c' }, { code: 'LEFT JOIN orders o ON c.id = o.customer_id;' }]} />
          <SqlTable
            caption="Result — Chen is kept, with NULL for the missing order"
            columns={['name', 'total']}
            rows={[['Ana', 40], ['Ben', 90], ['Chen', null]]}
          />
        </Section>

        <Section title="Finding the Missing Ones">
          <Typography variant="body2" paragraph>
            A <code>LEFT JOIN</code> plus <code>IS NULL</code> is the standard way to find rows with no match — e.g. customers who never ordered:
          </Typography>
          <CodeSnippet lines={[{ code: 'SELECT c.name' }, { code: 'FROM customers c' }, { code: 'LEFT JOIN orders o ON c.id = o.customer_id' }, { code: 'WHERE o.id IS NULL;' }]} />
        </Section>

        <Section title="LEFT vs RIGHT vs FULL">
          <CalloutBox title="Which rows survive" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>LEFT JOIN:</strong> all left rows + matches.</Typography>
              <Typography variant="body2"><strong>RIGHT JOIN:</strong> all right rows + matches (just LEFT with the tables swapped).</Typography>
              <Typography variant="body2"><strong>FULL OUTER JOIN:</strong> all rows from both, NULLs filling the gaps.</Typography>
            </Box>
          </CalloutBox>
        </Section>
        <Section title="Try It: Join Explorer">
          <Typography variant="body2" paragraph>
            Toggle <strong>LEFT</strong> to keep customers with no orders, and <strong>RIGHT</strong> to keep the order that points to a missing customer. The NULLs show where a side had no match.
          </Typography>
          <JoinPlayground />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
