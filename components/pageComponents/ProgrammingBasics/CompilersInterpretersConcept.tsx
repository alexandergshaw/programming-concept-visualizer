'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';

export default function CompilersInterpretersConcept() {
  return (
    <ConceptWrapper
      title="How Compilers and Interpreters Work"
      description="Your code must be translated into something the computer can run."
    >
      <Section title="Translation Approaches">
        <ul>
          <li>
            <b>Compiler:</b> Translates all your code into machine code before running it (e.g., C, C++).
          </li>
          <li>
            <b>Interpreter:</b> Reads and executes your code line-by-line as the program runs (e.g., Python, JavaScript).
          </li>
        </ul>
      </Section>
    </ConceptWrapper>
  );
}