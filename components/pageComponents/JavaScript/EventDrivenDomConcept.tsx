import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import EventDrivenIntro from './IntroToEventDrivenDom';
import DomExplanation from './DomExplanation';
import ChangeTextExample from './ChangeTextExample';
import InputValidationExample from './InputValidationExample';
import RadioButtonExample from './RadioButtonExample';

export default function EventDrivenDomConcept() {
  return (
    <ConceptWrapper
      title="Event-Driven DOM Manipulation"
      description="Learn how to use JavaScript event listeners to read and change text, get input values, and show validation errors in the DOM."
    >
      <TableOfContents numbered>
        <Section title="Refresher on the Document Object Model (DOM)">
          <DomExplanation />
        </Section>

        <Section title="Introduction to Event-Driven Programming">
          <EventDrivenIntro />
        </Section>
        <Section title="Working Examples">
          <Section title="Changing Text with Event Listeners">
            <ChangeTextExample/>
          </Section>
          <Section title="Validating Input and Showing Errors">
            <InputValidationExample/>
          </Section>
          <Section title="Detecting Whether Radio Buttons are Selected">
            <RadioButtonExample/>
          </Section>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}