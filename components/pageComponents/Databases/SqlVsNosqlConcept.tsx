'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from '../SQL/SqlTable';

export default function SqlVsNosqlConcept() {
  return (
    <ConceptWrapper title="SQL vs NoSQL" description="Two broad approaches to storing data, and what each trades away.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="Structure vs flexibility" type="key-concepts">
            <Typography variant="body2">
              <strong>SQL (relational)</strong> databases enforce a fixed structure of tables and relationships. <strong>NoSQL</strong> databases relax that structure to gain flexibility or massive scale. Neither is &quot;better&quot; — they fit different jobs.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Side by Side">
          <SqlTable
            columns={['Aspect', 'SQL (relational)', 'NoSQL']}
            rows={[
              ['Structure', 'fixed schema, tables', 'flexible / schema-less'],
              ['Relationships', 'joins via keys', 'often embedded or manual'],
              ['Scaling', 'scale up (bigger server)', 'scale out (more servers)'],
              ['Consistency', 'strong (ACID)', 'often eventual'],
              ['Best for', 'related, structured data', 'huge or fast-changing data'],
            ]}
            highlight={[0]}
          />
        </Section>

        <Section title="What 'Eventual Consistency' Means">
          <CalloutBox title="A common NoSQL trade-off" type="info">
            <Typography variant="body2">
              Many NoSQL systems spread data across servers and accept that, for a brief moment, different servers may show slightly different values before they catch up. That trade buys huge scale and availability — fine for a social feed, risky for a bank balance.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="The Honest Default">
          <CalloutBox title="Reach for SQL first" type="success">
            <Typography variant="body2">
              For most projects a relational database is the safer default: strong guarantees, mature tooling, and flexible querying. Choose NoSQL when you have a concrete need it serves better — covered in <em>When to Use Which</em>.
            </Typography>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
