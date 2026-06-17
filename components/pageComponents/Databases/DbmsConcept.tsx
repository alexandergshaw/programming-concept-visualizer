'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import SqlPlayground from '../SQL/SqlPlayground';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function DbmsConcept() {
  return (
    <ConceptWrapper title="The DBMS: Database Engine" description="The software that actually stores your data and runs your queries.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="The DBMS sits between you and the data" type="key-concepts">
            <Typography variant="body2">
              A <strong>Database Management System (DBMS)</strong> is the program that owns the data files. You never touch those files directly — you send the DBMS a request, and it reads, writes, and protects the data on your behalf.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="What the DBMS Handles For You">
          <CalloutBox title="Its jobs" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Storage:</strong> how data is laid out on disk and in memory.</Typography>
              <Typography variant="body2"><strong>Query processing:</strong> turning your request into an efficient plan.</Typography>
              <Typography variant="body2"><strong>Concurrency:</strong> letting many users work at once without conflicts.</Typography>
              <Typography variant="body2"><strong>Integrity & security:</strong> enforcing constraints and permissions.</Typography>
              <Typography variant="body2"><strong>Recovery:</strong> restoring a consistent state after a crash.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="Common Database Engines">
          <CalloutBox title="Names you'll hear" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Relational:</strong> PostgreSQL, MySQL, SQLite, SQL Server, Oracle.</Typography>
              <Typography variant="body2"><strong>NoSQL:</strong> MongoDB (documents), Redis (key-value), Cassandra (wide-column).</Typography>
            </Box>
          </CalloutBox>
          <Typography variant="body2" sx={{ mt: 1 }}>
            &quot;Database&quot; often refers loosely to both your data and the DBMS running it — context makes it clear.
          </Typography>
        </Section>
        <Section title="Try It: Send the Engine a Query">
          <Typography variant="body2" paragraph>
            You never touch the data files directly — you hand the DBMS a request and it does the work. Build a query and watch the engine return the rows.
          </Typography>
          <SqlPlayground />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
