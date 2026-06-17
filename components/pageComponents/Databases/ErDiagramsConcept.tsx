'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import RelationshipExplorer from '../SQL/RelationshipExplorer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function EntityBox({ title, fields }: { title: string; fields: string[] }) {
  return (
    <Box sx={{ border: '1px solid #cbd5e1', borderRadius: 2, overflow: 'hidden', minWidth: 150, bgcolor: '#fff' }}>
      <Box sx={{ bgcolor: '#1e293b', color: '#fff', px: 1.5, py: 0.75, fontWeight: 700, fontFamily: 'monospace', fontSize: 14 }}>{title}</Box>
      <Box sx={{ p: 1.5 }}>
        {fields.map((f) => (
          <Typography key={f} variant="body2" sx={{ fontFamily: 'monospace', fontSize: 13, color: '#475569' }}>{f}</Typography>
        ))}
      </Box>
    </Box>
  );
}

export default function ErDiagramsConcept() {
  return (
    <ConceptWrapper title="ER Diagrams" description="A picture of your data: the entities, their fields, and how they relate.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="An ER diagram is a map of the data" type="key-concepts">
            <Typography variant="body2">
              An <strong>Entity-Relationship (ER) diagram</strong> sketches a database before you build it: boxes are <strong>entities</strong> (future tables), lines are <strong>relationships</strong>, and the line endings show whether each side is &quot;one&quot; or &quot;many.&quot;
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="A Simple Diagram">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', my: 2 }}>
            <EntityBox title="customers" fields={['id (PK)', 'name', 'email']} />
            <Box sx={{ textAlign: 'center', color: '#64748b', fontFamily: 'monospace' }}>
              <Box sx={{ fontSize: 22 }}>1 ──&lt; many</Box>
              <Box sx={{ fontSize: 12 }}>places</Box>
            </Box>
            <EntityBox title="orders" fields={['id (PK)', 'customer_id (FK)', 'total']} />
          </Box>
          <Typography variant="body2">
            Read it as: &quot;one customer places many orders.&quot; The crow&apos;s-foot end (the &quot;many&quot; side) is the table that carries the foreign key.
          </Typography>
        </Section>

        <Section title="Why Diagram First">
          <CalloutBox title="Cheaper to fix on paper" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2">Spot missing entities and relationships before writing any SQL.</Typography>
              <Typography variant="body2">Agree on the design with teammates using one shared picture.</Typography>
              <Typography variant="body2">It translates almost directly into <code>CREATE TABLE</code> statements.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="Reading the Notation">
          <CalloutBox title="Crow's-foot basics" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2">A single bar means <strong>one</strong>; a crow&apos;s foot (the fork) means <strong>many</strong>.</Typography>
              <Typography variant="body2">So <em>one</em>-to-<em>many</em> is a bar on one end and a fork on the other.</Typography>
              <Typography variant="body2">Many-to-many shows a fork on both ends and becomes a junction table when built.</Typography>
            </Box>
          </CalloutBox>
        </Section>
        <Section title="Try It: Read the Relationships">
          <Typography variant="body2" paragraph>
            Each relationship in a diagram becomes tables and a foreign key. Switch shapes to see what each one turns into.
          </Typography>
          <RelationshipExplorer />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
