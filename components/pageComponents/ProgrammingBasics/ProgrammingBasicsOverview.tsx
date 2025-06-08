'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';

export default function ProgrammingBasicsOverview() {
  return (
    <ConceptWrapper
      title="Programming Basics"
      description="A high-level overview of how computers execute instructions, how code is translated, and how data is managed in memory."
    >
      <Section title="Overview">
        <ul>
          <li>
            How computers fetch and execute instructions (the fetch-decode-execute cycle)
          </li>
          <li>
            How compilers and interpreters translate code
          </li>
          <li>
            How data is stored and retrieved in memory
          </li>
        </ul>
      </Section>
    </ConceptWrapper>
  );
}