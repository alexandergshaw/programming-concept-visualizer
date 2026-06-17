'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import RelationshipExplorer from '../SQL/RelationshipExplorer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from '../SQL/SqlTable';

export default function RelationshipTypesConcept() {
  return (
    <ConceptWrapper title="Relationship Types" description="The three ways tables relate: one-to-one, one-to-many, and many-to-many.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="Three shapes of relationship" type="key-concepts">
            <Typography variant="body2">
              Every link between two tables is one of three kinds, decided by <em>how many</em> rows on each side can match: <strong>one-to-one</strong>, <strong>one-to-many</strong>, or <strong>many-to-many</strong>.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="One-to-One (1:1)">
          <Typography variant="body2" paragraph>
            One row matches exactly one row on the other side — a user and their single profile. Often kept together, but split to isolate optional or sensitive data.
          </Typography>
          <CalloutBox title="How it's built" type="info">
            <Typography variant="body2">
              Put a foreign key on either table and mark it <code>UNIQUE</code> so it can match only one row.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="One-to-Many (1:many)">
          <Typography variant="body2" paragraph>
            The most common shape: one customer has many orders, but each order has one customer. The <strong>&quot;many&quot; side holds the foreign key</strong>.
          </Typography>
          <SqlTable
            name="orders (the 'many' side)"
            columns={['id', 'customer_id (FK)']}
            rows={[[101, 1], [102, 1], [103, 2]]}
            highlight={[1]}
          />
        </Section>

        <Section title="Many-to-Many (many:many)">
          <Typography variant="body2" paragraph>
            Students take many courses, and each course has many students. You can&apos;t store this with one foreign key — you add a <strong>junction (join) table</strong> in between, holding one row per pairing:
          </Typography>
          <SqlTable
            name="enrollments (junction table)"
            columns={['student_id', 'course_id']}
            rows={[[1, 10], [1, 11], [2, 10]]}
          />
          <CalloutBox title="The pattern" type="success">
            <Typography variant="body2">
              A many-to-many relationship is always modeled as <strong>two one-to-many relationships</strong> pointing into a junction table. That table&apos;s job is simply to record which pairs go together.
            </Typography>
          </CalloutBox>
        </Section>
        <Section title="Try It: Explore Relationships">
          <Typography variant="body2" paragraph>
            Switch between the three relationship shapes and see the example tables and where the foreign key lives.
          </Typography>
          <RelationshipExplorer />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
