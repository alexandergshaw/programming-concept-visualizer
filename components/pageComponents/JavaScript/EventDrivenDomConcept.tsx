import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import StepThroughCodeAnimation, { Step } from './StepThroughCodeAnimation';
import Box from '@mui/material/Box';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import EventDrivenIntro from './IntroToEventDrivenDom';
import DomExplanation from './DomExplanation';
import ChangeTextExample from './ChangeTextExample';
import InputValidationExample from './InputValidationExample';
import RadioButtonExample from './RadioButtonExample';

const changeTextSteps: Step[] = [
  {
    label: 'Get the Element',
    desc: 'We use <b>document.getElementById("myText")</b> to get the element we want to change.',
    highlight: 'document.getElementById("myText")',
  },
  {
    label: 'Add Event Listener',
    desc: 'We add a <b>click</b> event listener to the button.',
    highlight: 'button.addEventListener("click", ...)',
  },
  {
    label: 'Change Text',
    desc: 'When the button is clicked, we set <b>element.textContent</b> to new text.',
    highlight: 'element.textContent = "Hello, world!"',
  },
];

const getTextSteps: Step[] = [
  {
    label: 'Get the Element',
    desc: 'We use <b>document.getElementById("myText")</b> to get the element.',
    highlight: 'document.getElementById("myText")',
  },
  {
    label: 'Add Event Listener',
    desc: 'We add a <b>click</b> event listener to the button.',
    highlight: 'button.addEventListener("click", ...)',
  },
  {
    label: 'Get Text',
    desc: 'When the button is clicked, we read <b>element.textContent</b> and show it in an alert.',
    highlight: 'alert(element.textContent)',
  },
];

const getInputValueSteps: Step[] = [
  {
    label: 'Get the Input',
    desc: 'We use <b>document.getElementById("myInput")</b> to get the input element.',
    highlight: 'document.getElementById("myInput")',
  },
  {
    label: 'Add Event Listener',
    desc: 'We add a <b>click</b> event listener to the button.',
    highlight: 'button.addEventListener("click", ...)',
  },
  {
    label: 'Get Value',
    desc: 'When the button is clicked, we read <b>input.value</b> and show it in an alert.',
    highlight: 'alert(input.value)',
  },
];

const validationSteps: Step[] = [
  {
    label: 'Get the Input',
    desc: 'We use <b>document.getElementById("emailInput")</b> to get the input element.',
    highlight: 'document.getElementById("emailInput")',
  },
  {
    label: 'Add Event Listener',
    desc: 'We add a <b>click</b> event listener to the submit button.',
    highlight: 'submitBtn.addEventListener("click", ...)',
  },
  {
    label: 'Get Value',
    desc: 'When the button is clicked, we get the value from the input.',
    highlight: 'const value = input.value',
  },
  {
    label: 'Validate Input',
    desc: 'We check if the value contains <b>"@"</b>. If not, we show an error.',
    highlight: 'if (!value.includes("@")) { ... }',
  },
  {
    label: 'Show Error',
    desc: 'We create a new <b>&lt;div&gt;</b> and add it to the page to display the error.',
    highlight: 'errorDiv.textContent = "Invalid email!"',
  },
];

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