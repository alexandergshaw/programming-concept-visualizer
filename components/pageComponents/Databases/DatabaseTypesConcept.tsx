'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from '../SQL/SqlTable';

export default function DatabaseTypesConcept() {
  return (
    <ConceptWrapper title="Types of Databases" description="The main families of databases and what each is good at.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="Different shapes for different data" type="key-concepts">
            <Typography variant="body2">
              Most databases fall into a few families. <strong>Relational</strong> databases (tables + SQL) are the default for structured, related data; the <strong>NoSQL</strong> families trade some structure for flexibility or scale.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="The Families">
          <SqlTable
            columns={['Type', 'Stores data as', 'Good for']}
            rows={[
              ['Relational', 'tables with rows & columns', 'structured, related data'],
              ['Document', 'JSON-like documents', 'flexible, nested records'],
              ['Key-Value', 'a giant dictionary', 'caching, fast lookups'],
              ['Wide-Column', 'rows with flexible columns', 'huge write-heavy data'],
              ['Graph', 'nodes and edges', 'networks & relationships'],
            ]}
            highlight={[0]}
          />
        </Section>

        <Section title="Start Relational">
          <CalloutBox title="The sensible default" type="success">
            <Typography variant="body2">
              For most applications a <strong>relational database</strong> is the right starting point: mature, reliable, well understood, and great when your data has clear relationships. Reach for NoSQL when you have a specific reason (covered later in <em>SQL vs NoSQL</em>).
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="The Rest of This Section">
          <Typography variant="body2">
            The upcoming pages focus mostly on the relational model — tables, keys, design, and integrity — because those ideas underpin SQL and transfer to almost every database you will meet.
          </Typography>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
