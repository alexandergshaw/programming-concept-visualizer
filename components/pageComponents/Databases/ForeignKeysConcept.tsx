'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from '../SQL/SqlTable';
import JoinPlayground from '../SQL/JoinPlayground';

export default function ForeignKeysConcept() {
  return (
    <ConceptWrapper title="Foreign Keys & Relationships" description="A column that points to another table's primary key — the link that connects data.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="A foreign key points at another row" type="key-concepts">
            <Typography variant="body2">
              A <strong>foreign key</strong> is a column that holds a primary-key value from another table. It is the thread that links related rows — an order to the customer who placed it.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="See the Link">
          <SqlTable name="customers" columns={['id (PK)', 'name']} rows={[[1, 'Ana'], [2, 'Ben']]} highlight={[0]} />
          <SqlTable
            name="orders"
            columns={['id', 'customer_id (FK)', 'total']}
            rows={[
              [101, 1, 40],
              [102, 1, 25],
              [103, 2, 90],
            ]}
            highlight={[1]}
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            <code>orders.customer_id</code> stores a value from <code>customers.id</code>. Orders 101 and 102 belong to Ana; order 103 belongs to Ben.
          </Typography>
        </Section>

        <Section title="Referential Integrity">
          <CalloutBox title="The database keeps links honest" type="info">
            <Typography variant="body2">
              A foreign key can <strong>refuse</strong> an order for a customer that doesn&apos;t exist, and can block (or cascade) deleting a customer who still has orders. This guarantee — no dangling links — is called <strong>referential integrity</strong>.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Why It Beats Copying Data">
          <CalloutBox title="One fact, one place" type="success">
            <Typography variant="body2">
              Without keys you would copy &quot;Ana&quot; onto every one of her orders. With a foreign key, her name lives once in <code>customers</code>; update it there and every order reflects the change. Combining the linked tables is the job of a <strong>JOIN</strong> (see the SQL section).
            </Typography>
          </CalloutBox>
        </Section>
        <Section title="Try It: Combine Linked Tables">
          <Typography variant="body2" paragraph>
            Foreign keys are what let you recombine split tables. Toggle the join type to see how following the <code>customer_id</code> link pulls customers and their orders back together.
          </Typography>
          <JoinPlayground />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
