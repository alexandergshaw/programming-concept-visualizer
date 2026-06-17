'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function ScalingConcept() {
  return (
    <ConceptWrapper title="Scaling Databases" description="How databases keep up as data and traffic grow.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="Two directions to grow" type="key-concepts">
            <Typography variant="body2">
              When one server can&apos;t keep up, you scale <strong>up</strong> (a bigger machine) or <strong>out</strong> (more machines working together). Scaling out is more powerful but more complex.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Vertical vs Horizontal">
          <CalloutBox title="Up or out" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Vertical (scale up):</strong> add CPU, RAM, or faster disks to one server. Simple, but there is a ceiling.</Typography>
              <Typography variant="body2"><strong>Horizontal (scale out):</strong> spread the load across many servers. Nearly unlimited, but harder to keep consistent.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="Three Common Techniques">
          <CalloutBox title="The toolbox" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Replication:</strong> keep copies of the data on several servers. Reads spread across replicas; if one dies, another takes over.</Typography>
              <Typography variant="body2"><strong>Sharding:</strong> split the data itself across servers (e.g. customers A-M here, N-Z there), so each handles a slice.</Typography>
              <Typography variant="body2"><strong>Caching:</strong> keep hot results in fast memory (like Redis) so the database isn&apos;t asked the same thing repeatedly.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="Start Simple">
          <CalloutBox title="Don't scale before you must" type="warning">
            <Typography variant="body2">
              A single well-indexed database handles far more than people expect. Add a cache, then read replicas, and only shard when truly necessary — sharding adds real complexity. Optimize queries and indexes first.
            </Typography>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
