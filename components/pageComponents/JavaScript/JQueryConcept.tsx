import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import JQueryIntroduction from './JQueryIntroduction';
import JQueryInclusionMethods from './JQueryInclusionMethods';

export default function JQueryConcept() {
  return (
    <ConceptWrapper
      title="jQuery: Simplified JavaScript Programming"
      description="Learn how to use jQuery to simplify DOM manipulation, handle events, and create interactive web applications with less code."
    >
      <TableOfContents numbered>
        <Section title="Video Overview">
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 0,
              paddingTop: '56.25%',
              paddingBottom: 0,
              boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
              marginTop: '1.6em',
              marginBottom: '0.9em',
              overflow: 'hidden',
              borderRadius: '8px',
              willChange: 'transform',
            }}
          >
            <iframe
              loading="lazy"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                border: 'none',
                padding: 0,
                margin: 0,
              }}
              src="https://www.canva.com/design/DAGscQNyBLg/pNzu50aZVmjLqZsXHgCpug/watch?embed"
              allowFullScreen={true}
              allow="fullscreen"
            />
          </div>
        </Section>
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