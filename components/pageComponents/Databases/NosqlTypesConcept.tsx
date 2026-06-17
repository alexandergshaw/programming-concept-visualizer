'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from '../SQL/SqlTable';

export default function NosqlTypesConcept() {
  return (
    <ConceptWrapper title="NoSQL Types" description="The four main NoSQL families and what each is shaped for.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="'NoSQL' is really four families" type="key-concepts">
            <Typography variant="body2">
              NoSQL isn&apos;t one thing. It is a group of database styles — <strong>document</strong>, <strong>key-value</strong>, <strong>wide-column</strong>, and <strong>graph</strong> — each storing data in a different shape for a different problem.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="The Four Families">
          <SqlTable
            columns={['Family', 'Shape', 'Example', 'Great for']}
            rows={[
              ['Document', 'JSON-like documents', 'MongoDB', 'nested, evolving records'],
              ['Key-Value', 'key -> value pairs', 'Redis', 'caching, sessions'],
              ['Wide-Column', 'rows with flexible columns', 'Cassandra', 'massive write volume'],
              ['Graph', 'nodes + edges', 'Neo4j', 'networks, recommendations'],
            ]}
            highlight={[0]}
          />
        </Section>

        <Section title="A Document, for Feel">
          <Typography variant="body2" paragraph>
            A document database stores a whole record — including nested data — as one flexible object, instead of spreading it across joined tables:
          </Typography>
          <CodeSnippet
            lines={[
              { code: '{' },
              { code: '  "name": "Ana",' },
              { code: '  "orders": [' },
              { code: '    { "product": "Book", "total": 40 },' },
              { code: '    { "product": "Pen",  "total": 25 }' },
              { code: '  ]' },
              { code: '}' },
            ]}
          />
        </Section>

        <Section title="Key Takeaways">
          <CalloutBox title="Summary" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2">Pick the family that matches your data&apos;s natural shape.</Typography>
              <Typography variant="body2">Document and key-value stores are the most common starting points.</Typography>
              <Typography variant="body2">Graph databases shine when relationships <em>are</em> the data.</Typography>
            </Box>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
