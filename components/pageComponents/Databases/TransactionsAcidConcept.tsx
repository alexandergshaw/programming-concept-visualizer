'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function TransactionsAcidConcept() {
  return (
    <ConceptWrapper title="Transactions & ACID" description="Grouping changes so they all succeed or all fail — and why that keeps data trustworthy.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="All or nothing" type="key-concepts">
            <Typography variant="body2">
              A <strong>transaction</strong> bundles several changes into one unit that either <strong>fully completes</strong> or is <strong>completely undone</strong>. The database is never left in a half-finished state.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="The Classic Example">
          <Typography variant="body2" paragraph>
            A bank transfer is two updates that must both happen — or neither:
          </Typography>
          <CodeSnippet
            lines={[
              { code: 'BEGIN;' },
              { code: 'UPDATE accounts SET balance = balance - 100 WHERE id = 1;' },
              { code: 'UPDATE accounts SET balance = balance + 100 WHERE id = 2;' },
              { code: 'COMMIT;   -- saved together; ROLLBACK to undo' },
            ]}
          />
          <Typography variant="body2">
            If the second update fails, a <code>ROLLBACK</code> undoes the first too — no money vanishes.
          </Typography>
        </Section>

        <Section title="The ACID Guarantees">
          <CalloutBox title="What a transaction promises" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Atomicity:</strong> all steps happen, or none do.</Typography>
              <Typography variant="body2"><strong>Consistency:</strong> the database moves from one valid state to another, obeying all constraints.</Typography>
              <Typography variant="body2"><strong>Isolation:</strong> concurrent transactions don&apos;t see each other&apos;s half-done work.</Typography>
              <Typography variant="body2"><strong>Durability:</strong> once committed, the change survives a crash or power loss.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="Why It Matters">
          <CalloutBox title="Trust under failure and concurrency" type="success">
            <Typography variant="body2">
              ACID transactions are the main reason relational databases are trusted for money, orders, and bookings: even with thousands of simultaneous users and unexpected crashes, the data stays correct.
            </Typography>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
