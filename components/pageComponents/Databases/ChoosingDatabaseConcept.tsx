'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import OptionExplorer from '../SQL/OptionExplorer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function ChoosingDatabaseConcept() {
  return (
    <ConceptWrapper title="When to Use Which" description="A practical guide to picking the right database for the job.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="Match the database to the problem" type="key-concepts">
            <Typography variant="body2">
              There is no single best database. The right choice depends on the <strong>shape of your data</strong>, the <strong>guarantees you need</strong>, and <strong>how it will grow</strong>.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Reach for Relational When...">
          <CalloutBox title="SQL is the right fit" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2">Your data has clear relationships (customers, orders, products).</Typography>
              <Typography variant="body2">Correctness matters — money, inventory, bookings (you need ACID).</Typography>
              <Typography variant="body2">You want flexible, ad-hoc queries and reporting.</Typography>
              <Typography variant="body2"><em>This covers the large majority of applications.</em></Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="Consider NoSQL When...">
          <CalloutBox title="A specific need points elsewhere" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Document:</strong> records vary a lot or change shape often (catalogs, content).</Typography>
              <Typography variant="body2"><strong>Key-Value:</strong> you need ultra-fast lookups or caching (sessions, leaderboards).</Typography>
              <Typography variant="body2"><strong>Wide-Column:</strong> enormous write volume across many servers (telemetry, logs).</Typography>
              <Typography variant="body2"><strong>Graph:</strong> the connections are the point (social, recommendations, fraud).</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="The Pragmatic Advice">
          <CalloutBox title="Start simple, mix freely" type="success">
            <Typography variant="body2">
              Begin with a relational database; it will take you far. Real systems often use <strong>more than one</strong> — for example PostgreSQL for core data plus Redis for caching. Choose per need, not per trend.
            </Typography>
          </CalloutBox>
        </Section>
        <Section title="Explore the Fits">
          <Typography variant="body2" paragraph>
            Click the question that matches your situation to see which database tends to fit.
          </Typography>
          <OptionExplorer
            options={[
              { label: 'Need ACID?', points: ['Money, orders, bookings point to a relational database', 'Correctness matters more than raw scale'] },
              { label: 'Flexible records?', points: ['Catalogs and content that change shape point to a document store'] },
              { label: 'Fast lookups?', points: ['Caching, sessions, and leaderboards point to a key-value store'] },
              { label: 'Connections matter?', points: ['Social graphs, recommendations, and fraud point to a graph database'] },
              { label: 'Not sure?', points: ['Start relational — it covers the large majority of apps', 'Add a cache or specialized store later if a real need appears'] },
            ]}
          />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
