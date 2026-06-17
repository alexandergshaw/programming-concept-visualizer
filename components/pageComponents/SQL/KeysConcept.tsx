'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from './SqlTable';

export default function KeysConcept() {
  return (
    <ConceptWrapper title="Keys & Relationships" description="How tables connect to each other — the foundation of every JOIN.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="Keys link rows across tables" type="key-concepts">
            <Typography variant="body2">
              A <strong>primary key</strong> uniquely identifies each row in its table. A <strong>foreign key</strong> is a column that stores another table&apos;s primary key, creating a link between the two.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="See the Link">
          <Typography variant="body2" paragraph>
            <code>customers.id</code> is the primary key. <code>orders.customer_id</code> is a foreign key pointing back to it.
          </Typography>
          <SqlTable
            name="customers"
            columns={['id (PK)', 'name']}
            rows={[
              [1, 'Ana'],
              [2, 'Ben'],
            ]}
            highlight={[0]}
          />
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
            Order 101&apos;s <code>customer_id = 1</code>, so it belongs to Ana. A <strong>JOIN</strong> follows these links to combine the tables.
          </Typography>
        </Section>

        <Section title="Why Bother?">
          <CalloutBox title="Benefits of splitting data" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>No duplication:</strong> Ana&apos;s name is stored once, not on every order.</Typography>
              <Typography variant="body2"><strong>Consistency:</strong> update her name in one place and every order reflects it.</Typography>
              <Typography variant="body2"><strong>Integrity:</strong> a foreign key can stop you from adding an order for a customer who does not exist.</Typography>
            </Box>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
