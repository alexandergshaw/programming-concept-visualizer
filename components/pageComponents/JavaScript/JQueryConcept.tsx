import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import JQueryIntroduction from './JQueryIntroduction';
import JQueryInclusionMethods from './JQueryInclusionMethods';
import JQuerySelectorsSyntax from './JQuerySelectorsSyntax';
import JQueryChaining from './JQueryChaining';
import JQueryDomManipulation from './JQueryDomManipulation';
import JQueryFormHandling from './JQueryFormHandling';

export default function JQueryConcept() {
  return (
    <ConceptWrapper
      title="jQuery: Simplified JavaScript Programming"
      description="Learn how to use jQuery to simplify DOM manipulation, handle events, and create interactive web applications with less code."
    >
      <TableOfContents numbered>
        <Section title="What is jQuery?">
          <JQueryIntroduction />
        </Section>

        <Section title="Including jQuery in Your Project">
          <JQueryInclusionMethods />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
} 