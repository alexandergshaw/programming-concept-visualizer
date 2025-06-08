'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';

export default function MemoryConcept() {
  return (
    <ConceptWrapper
      title="How Data is Stored and Retrieved in Memory"
      description="Programs use memory (RAM) to store and access data."
    >
      <Section title="Memory Basics">
        <ul>
          <li>
            <b>Storing:</b> Data is written to a specific memory address.
          </li>
          <li>
            <b>Retrieving:</b> Data is read from a specific memory address.
          </li>
          <li>
            <b>Variables:</b> Programming languages use variables as easy-to-remember names for these memory locations.
          </li>
        </ul>
      </Section>
    </ConceptWrapper>
  );
}