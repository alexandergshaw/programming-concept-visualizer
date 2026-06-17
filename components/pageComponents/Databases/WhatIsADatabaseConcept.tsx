'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import CrudPlayground from '../SQL/CrudPlayground';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function WhatIsADatabaseConcept() {
  return (
    <ConceptWrapper title="What Is a Database?" description="An organized collection of data, managed by software so many people and programs can use it safely.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="A database stores data so you can find it again" type="key-concepts">
            <Typography variant="body2">
              A <strong>database</strong> is a structured collection of information, kept by software that lets many users and programs <strong>store, search, change, and protect</strong> that data at the same time — reliably and at scale.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="What Lives Inside">
          <CalloutBox title="The pieces" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Data:</strong> the actual values — customers, orders, messages.</Typography>
              <Typography variant="body2"><strong>Schema:</strong> the structure — what tables exist and what each column holds.</Typography>
              <Typography variant="body2"><strong>The engine (DBMS):</strong> the software that reads and writes the data and enforces the rules.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="An Everyday Example">
          <Typography variant="body2" paragraph>
            Your contacts app is backed by a database: each contact is a record, each detail (name, phone, email) is a field, and the app stores, searches, and edits them for you. Banks, shops, games, and websites all sit on databases.
          </Typography>
        </Section>

        <Section title="Key Takeaways">
          <CalloutBox title="Summary" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2">A database is organized, persistent data plus the software that manages it.</Typography>
              <Typography variant="body2">It separates the <em>data</em>, its <em>structure</em>, and the <em>engine</em> that runs it.</Typography>
              <Typography variant="body2">Almost every app you use is backed by one.</Typography>
            </Box>
          </CalloutBox>
        </Section>
        <Section title="Try It: Store & Change Data">
          <Typography variant="body2" paragraph>
            This is a tiny database in your browser. Add, change, and remove rows — the data persists and updates just like a real one.
          </Typography>
          <CrudPlayground />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
