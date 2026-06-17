'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function TransactionsConcept() {
  return (
    <ConceptWrapper title="Transactions" description="Group several changes into one all-or-nothing unit.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="All of it, or none of it" type="key-concepts">
            <Typography variant="body2">
              A <strong>transaction</strong> bundles multiple statements so they either <em>all</em> succeed (<code>COMMIT</code>) or <em>all</em> get undone (<code>ROLLBACK</code>). The database is never left half-changed.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="The Classic Example: a Transfer">
          <Typography variant="body2" paragraph>
            Moving money is two updates that must both happen. If the second fails, the first must be undone:
          </Typography>
          <CodeSnippet lines={[{ code: 'BEGIN;' }, { code: 'UPDATE accounts SET balance = balance - 100 WHERE id = 1;' }, { code: 'UPDATE accounts SET balance = balance + 100 WHERE id = 2;' }, { code: 'COMMIT;   -- both saved together' }]} />
          <Typography variant="body2">
            If anything goes wrong before <code>COMMIT</code>, run <code>ROLLBACK</code> and it is as if nothing happened.
          </Typography>
        </Section>

        <Section title="ACID in Plain English">
          <CalloutBox title="The guarantees a transaction gives" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Atomic:</strong> all statements happen, or none do.</Typography>
              <Typography variant="body2"><strong>Consistent:</strong> rules and constraints hold before and after.</Typography>
              <Typography variant="body2"><strong>Isolated:</strong> concurrent transactions don&apos;t corrupt each other.</Typography>
              <Typography variant="body2"><strong>Durable:</strong> once committed, changes survive a crash.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="When to Reach for One">
          <CalloutBox title="Use a transaction when..." type="success">
            <Typography variant="body2">
              ...two or more changes only make sense together (transfers, orders that adjust inventory, multi-table edits), or whenever you want a safety net to <code>ROLLBACK</code> a risky <code>UPDATE</code>/<code>DELETE</code>.
            </Typography>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
