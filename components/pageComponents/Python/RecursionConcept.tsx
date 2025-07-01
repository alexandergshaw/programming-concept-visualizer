import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import RecursionVisualizer from './RecursionVisualizer';
import RecursiveConstructor from './RecursiveConstructor';

export default function RecursionConcept() {
  return (
    <ConceptWrapper
      title="Recursion in Python"
      description="Recursion is when a function calls itself to solve a problem. It's a powerful way to break problems into smaller pieces."
    >
      <TableOfContents numbered>
        <Section title="What is Recursion?">

          <RecursionVisualizer />
        </Section>
        <Section title="Build a Recursive Function (Interactive)">
          <RecursiveConstructor />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}