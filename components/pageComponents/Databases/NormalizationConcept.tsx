'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import NormalizationToggle from '../SQL/NormalizationToggle';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from '../SQL/SqlTable';

export default function NormalizationConcept() {
  return (
    <ConceptWrapper title="Normalization" description="Organizing tables to remove duplication, so data can't contradict itself.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="Normalization removes repeated data" type="key-concepts">
            <Typography variant="body2">
              <strong>Normalization</strong> is the process of splitting data into tables so that every fact is stored <strong>once</strong>. The goal is to make &quot;the same thing recorded two different ways&quot; impossible.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="The Problem: a Big Flat Table">
          <Typography variant="body2" paragraph>
            Notice the customer name and city repeat on every order. This causes <strong>anomalies</strong>:
          </Typography>
          <SqlTable
            name="orders (un-normalized)"
            columns={['order_id', 'customer', 'city', 'product']}
            rows={[
              [101, 'Ana', 'Paris', 'Book'],
              [102, 'Ana', 'Paris', 'Pen'],
              [103, 'Ben', 'Rome', 'Lamp'],
            ]}
            highlight={[1, 2]}
          />
          <CalloutBox title="What goes wrong" type="warning">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Update anomaly:</strong> Ana moves city — you must change many rows, and might miss one.</Typography>
              <Typography variant="body2"><strong>Insertion anomaly:</strong> you can&apos;t record a new customer until they place an order.</Typography>
              <Typography variant="body2"><strong>Deletion anomaly:</strong> deleting the last order erases the customer entirely.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="The Fix: Split Into Tables">
          <SqlTable name="customers" columns={['id', 'name', 'city']} rows={[[1, 'Ana', 'Paris'], [2, 'Ben', 'Rome']]} />
          <SqlTable name="orders" columns={['id', 'customer_id', 'product']} rows={[[101, 1, 'Book'], [102, 1, 'Pen'], [103, 2, 'Lamp']]} highlight={[1]} />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Now Ana&apos;s city lives in exactly one place. The anomalies are gone.
          </Typography>
        </Section>

        <Section title="The Normal Forms (lightly)">
          <CalloutBox title="A practical rule of thumb" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>1NF:</strong> one value per cell; no repeating groups.</Typography>
              <Typography variant="body2"><strong>2NF &amp; 3NF:</strong> every column depends on the whole key and nothing but the key.</Typography>
              <Typography variant="body2">In practice, aim for <strong>3NF</strong>: each table is about one thing, with no duplicated facts.</Typography>
            </Box>
          </CalloutBox>
        </Section>
        <Section title="Try It: Normalize the Data">
          <Typography variant="body2" paragraph>
            Toggle between the un-normalized and normalized versions to see the duplication — and the anomalies — appear and disappear.
          </Typography>
          <NormalizationToggle />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
