'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function WhatIsSqlConcept() {
  return (
    <ConceptWrapper title="What Is SQL?" description="The language for asking questions of, and changing, data stored in a database.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="SQL talks to databases" type="key-concepts">
            <Typography variant="body2">
              <strong>SQL (Structured Query Language)</strong> is how you ask a database for the data you want and how you add, change, or remove data. You describe <em>what</em> you want, and the database figures out <em>how</em> to get it.
            </Typography>
          </CalloutBox>
          <Typography variant="body2" sx={{ mt: 2 }}>
            A spreadsheet holds rows and columns you scroll through by hand. A database holds the same kind of data, but you talk to it with precise commands — even across millions of rows.
          </Typography>
        </Section>

        <Section title="A First Query">
          <Typography variant="body2" paragraph>
            Almost every SQL statement reads like a sentence. This one asks for the names of every customer in France:
          </Typography>
          <CodeSnippet
            lines={[
              { code: 'SELECT name' },
              { code: 'FROM customers' },
              { code: "WHERE country = 'France';" },
            ]}
          />
          <Typography variant="body2" paragraph>
            You stated the goal (the names of French customers). You never said <em>how</em> to scan the table — that is the database engine&apos;s job.
          </Typography>
        </Section>

        <Section title="The Four Things SQL Does">
          <CalloutBox title="Most SQL falls into four verbs" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>SELECT</strong> — read existing data (by far the most common).</Typography>
              <Typography variant="body2"><strong>INSERT</strong> — add new rows.</Typography>
              <Typography variant="body2"><strong>UPDATE</strong> — change existing rows.</Typography>
              <Typography variant="body2"><strong>DELETE</strong> — remove rows.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="Good to Know">
          <CalloutBox title="A few facts up front" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Keywords aren&apos;t case-sensitive</strong> — <code>SELECT</code> and <code>select</code> both work. Uppercase keywords is just a common convention.</Typography>
              <Typography variant="body2"><strong>Statements end with a semicolon</strong> <code>;</code>.</Typography>
              <Typography variant="body2"><strong>Dialects vary slightly</strong> — PostgreSQL, MySQL, SQLite, and SQL Server share the same core but differ in details.</Typography>
            </Box>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
