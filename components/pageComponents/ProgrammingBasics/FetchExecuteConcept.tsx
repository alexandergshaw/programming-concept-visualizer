'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CycleDiagram from '../../common/CycleDiagram';
import DownloadIcon from '@mui/icons-material/Download';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function FetchExecuteConcept() {
  return (
    <ConceptWrapper
      title="How Computers Fetch and Execute Instructions"
      description="The CPU follows a repeated cycle to run your code."
    >
      <Section title="The Fetch-Decode-Execute Cycle">
        <CycleDiagram
          steps={[
            {
              label: 'Fetch',
              icon: <DownloadIcon fontSize="large" color="success" />,
              description: 'The CPU gets the next instruction from memory.',
            },
            {
              label: 'Decode',
              icon: <FindInPageIcon fontSize="large" color="primary" />,
              description: 'The CPU figures out what the instruction means.',
            },
            {
              label: 'Execute',
              icon: <PlayArrowIcon fontSize="large" color="action" />,
              description: 'The CPU performs the instruction (like math, moving data, or jumping to another instruction).',
            },
          ]}
        />
      </Section>
    </ConceptWrapper>
  );
}