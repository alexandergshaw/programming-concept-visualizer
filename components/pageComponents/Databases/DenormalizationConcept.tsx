'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import NormalizationToggle from '../SQL/NormalizationToggle';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function DenormalizationConcept() {
  return (
    <ConceptWrapper title="Denormalization" description="Deliberately adding some duplication back — to make reads faster.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="Trade tidiness for speed" type="key-concepts">
            <Typography variant="body2">
              <strong>Denormalization</strong> is intentionally storing some data more than once so common queries run faster — fewer joins, fewer calculations. It is the conscious opposite of normalization.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Why You'd Do It">
          <Typography variant="body2" paragraph>
            Normalized data is great for correctness but can be slow when a popular query joins many tables or re-counts the same totals constantly. Denormalization pre-computes or co-locates that data.
          </Typography>
          <CalloutBox title="Common moves" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Stored totals:</strong> keep an <code>order_count</code> on the customer instead of counting orders every time.</Typography>
              <Typography variant="body2"><strong>Copied columns:</strong> store the product name on the order line so the receipt needs no join.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="The Cost">
          <CalloutBox title="Duplication must be kept in sync" type="warning">
            <Typography variant="body2">
              Every duplicated value is one more place that can drift out of date. You take on the job of updating all copies (often with application logic or triggers). That is the price you pay for the read speed.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="The Rule of Thumb">
          <CalloutBox title="Normalize first" type="success">
            <Typography variant="body2">
              Design normalized, then denormalize only specific spots after you measure a real performance problem. Premature denormalization buys complexity you may never need.
            </Typography>
          </CalloutBox>
        </Section>
        <Section title="Try It: Compare the Two Shapes">
          <Typography variant="body2" paragraph>
            Denormalization trades the tidy split for a flatter shape that is faster to read. Toggle the two to weigh duplication against convenience.
          </Typography>
          <NormalizationToggle />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
