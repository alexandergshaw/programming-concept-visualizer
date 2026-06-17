'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import InjectionDemo from '../SQL/InjectionDemo';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function SecurityConcept() {
  return (
    <ConceptWrapper title="Security & Access Control" description="Making sure only the right people and programs can touch your data.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="Least privilege" type="key-concepts">
            <Typography variant="body2">
              Database security is mostly about <strong>least privilege</strong>: every user and app gets the <em>minimum</em> access it needs, and nothing more. A reporting tool should read, not delete.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Users, Roles & Permissions">
          <Typography variant="body2" paragraph>
            You grant specific rights on specific tables, often grouped into <strong>roles</strong>:
          </Typography>
          <CodeSnippet
            lines={[
              { code: 'GRANT SELECT ON orders TO analyst;' },
              { code: 'GRANT SELECT, INSERT, UPDATE ON orders TO app_user;' },
              { code: 'REVOKE DELETE ON orders FROM app_user;' },
            ]}
          />
        </Section>

        <Section title="The Biggest Threat: SQL Injection">
          <CalloutBox title="Never build queries by pasting in user input" type="warning">
            <Typography variant="body2">
              If user text is concatenated straight into a query, an attacker can inject their own SQL. The fix is <strong>parameterized queries</strong> (placeholders), which keep data and code separate so input can never become commands.
            </Typography>
          </CalloutBox>
          <CodeSnippet
            lines={[
              { code: '-- Vulnerable: string-built query' },
              { code: '"SELECT * FROM users WHERE name = \'" + input + "\'"' },
              { code: '-- Safe: parameterized' },
              { code: 'SELECT * FROM users WHERE name = ?;' },
            ]}
          />
        </Section>

        <Section title="Other Essentials">
          <CalloutBox title="Layered defenses" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Encryption:</strong> protect data in transit (TLS) and at rest (disk encryption).</Typography>
              <Typography variant="body2"><strong>Hash passwords</strong> — never store them in plain text.</Typography>
              <Typography variant="body2"><strong>Limit network access</strong> so the database isn&apos;t reachable from the open internet.</Typography>
            </Box>
          </CalloutBox>
        </Section>
        <Section title="Try It: SQL Injection">
          <Typography variant="body2" paragraph>
            Type a username, then press &quot;use a malicious input&quot; and compare the vulnerable string-built query with the safe parameterized one.
          </Typography>
          <InjectionDemo />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
