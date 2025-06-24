import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import StepThroughCodeAnimation, { Step } from './StepThroughCodeAnimation';
import Box from '@mui/material/Box';

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
        <Section title="Changing Text with Event Listeners">
          <p>
            You can change the text of any element on your page when a user interacts with it. For example, clicking a button can update a heading or a paragraph.
          </p>
          <StepThroughCodeAnimation
            code={[
              '<button id="changeBtn">Change Text</button>',
              '<p id="myText">Original text</p>',
              '',
              'const button = document.getElementById("changeBtn");',
              'const element = document.getElementById("myText");',
              'button.addEventListener("click", function() {',
              '  element.textContent = "Hello, world!";',
              '});',
            ]}
            steps={changeTextSteps}
          />
        </Section>
        <Section title="Getting Text with Event Listeners">
          <p>
            You can also read the text of an element when an event happens, such as showing it in an alert when a button is clicked.
          </p>
          <StepThroughCodeAnimation
            code={[
              '<button id="showBtn">Show Text</button>',
              '<p id="myText">Some text here</p>',
              '',
              'const button = document.getElementById("showBtn");',
              'const element = document.getElementById("myText");',
              'button.addEventListener("click", function() {',
              '  alert(element.textContent);',
              '});',
            ]}
            steps={getTextSteps}
          />
        </Section>
        <Section title="Getting Input Values in Event Listeners">
          <p>
            To get the value from an input field when a button is clicked, use <code>input.value</code> inside your event listener.
          </p>
          <StepThroughCodeAnimation
            code={[
              '<input id="myInput" />',
              '<button id="getBtn">Get Value</button>',
              '',
              'const button = document.getElementById("getBtn");',
              'const input = document.getElementById("myInput");',
              'button.addEventListener("click", function() {',
              '  alert(input.value);',
              '});',
            ]}
            steps={getInputValueSteps}
          />
        </Section>
        <Section title="Validating Input and Showing Errors">
          <p>
            You can check user input and display errors by adding new elements to the DOM. For example, check if an email contains <code>@</code> and show an error if not.
          </p>
          <StepThroughCodeAnimation
            code={[
              '<input id="emailInput" />',
              '<button id="submitBtn">Submit</button>',
              '<div id="error"></div>',
              '',
              'const submitBtn = document.getElementById("submitBtn");',
              'const input = document.getElementById("emailInput");',
              'const errorDiv = document.getElementById("error");',
              'submitBtn.addEventListener("click", function() {',
              '  const value = input.value;',
              '  if (!value.includes("@")) {',
              '    errorDiv.textContent = "Invalid email!";',
              '  } else {',
              '    errorDiv.textContent = "";',
              '  }',
              '});',
            ]}
            steps={validationSteps}
          />
        </Section>
        <Section title="Tips & Common Mistakes">
          <ul>
            <li>Always get elements with <code>document.getElementById</code> or similar before using them.</li>
            <li>Event listeners let you react to user actions like clicks, typing, or mouse movement.</li>
            <li>Use <code>element.textContent</code> to change or read text, and <code>input.value</code> for input fields.</li>
            <li>To show errors, create or update DOM elements (like <code>&lt;div&gt;</code>) with your message.</li>
            <li>Always validate user input before using it in your code.</li>
          </ul>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}