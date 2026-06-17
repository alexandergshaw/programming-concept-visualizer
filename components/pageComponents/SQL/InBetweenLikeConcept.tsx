'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import PredicatePlayground from './PredicatePlayground';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function InBetweenLikeConcept() {
  return (
    <ConceptWrapper title="IN, BETWEEN & LIKE" description="Three shortcuts that make common filters shorter and clearer.">
      <TableOfContents numbered>
        <Section title="IN — match any of a list">
          <Typography variant="body2" paragraph>
            <code>IN</code> replaces a chain of <code>OR</code>s. These two queries are identical:
          </Typography>
          <CodeSnippet lines={[{ code: "WHERE country = 'France' OR country = 'Canada' OR country = 'Japan'" }, { code: '-- same as' }, { code: "WHERE country IN ('France', 'Canada', 'Japan');" }]} />
        </Section>

        <Section title="BETWEEN — match a range">
          <Typography variant="body2" paragraph>
            <code>BETWEEN</code> tests a range and is <strong>inclusive</strong> of both ends:
          </Typography>
          <CodeSnippet lines={[{ code: 'WHERE salary BETWEEN 50000 AND 60000' }, { code: '-- same as' }, { code: 'WHERE salary >= 50000 AND salary <= 60000;' }]} />
          <Typography variant="body2">It works for dates too: <code>WHERE order_date BETWEEN &apos;2024-01-01&apos; AND &apos;2024-03-31&apos;</code>.</Typography>
        </Section>

        <Section title="LIKE — match a text pattern">
          <Typography variant="body2" paragraph>
            <code>LIKE</code> matches text using two wildcards:
          </Typography>
          <CalloutBox title="The two wildcards" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><code>%</code> — any number of characters (including none).</Typography>
              <Typography variant="body2"><code>_</code> — exactly one character.</Typography>
            </Box>
          </CalloutBox>
          <CodeSnippet lines={[{ code: "WHERE name LIKE 'A%'      -- starts with A" }, { code: "WHERE email LIKE '%@gmail.com'  -- ends with @gmail.com" }, { code: "WHERE code LIKE 'A_C'     -- A, any one char, C" }]} />
          <CalloutBox title="Negate any of them with NOT" type="success">
            <Typography variant="body2">
              <code>NOT IN (...)</code>, <code>NOT BETWEEN ...</code>, and <code>NOT LIKE ...</code> all work as you would expect.
            </Typography>
          </CalloutBox>
        </Section>
        <Section title="Try It: Match Patterns">
          <Typography variant="body2" paragraph>
            Switch between IN, BETWEEN, and LIKE and change the value to see which rows match.
          </Typography>
          <PredicatePlayground kinds={['IN', 'BETWEEN', 'LIKE']} />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
