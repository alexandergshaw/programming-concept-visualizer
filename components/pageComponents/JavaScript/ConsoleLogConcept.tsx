import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import StepThroughCodeAnimation, { Step } from './StepThroughCodeAnimation';

const basicSteps: Step[] = [
  {
    label: 'Write a Message',
    desc: 'You can use <b>console.log()</b> to print a message to the browser console.',
    highlight: 'console.log("Hello, world!");',
  },
  {
    label: 'Open the Console',
    desc: 'Open your browser\'s developer tools (usually F12 or right-click → Inspect) and go to the "Console" tab to see the output.',
    highlight: '',
  },
];

const variableSteps: Step[] = [
  {
    label: 'Log a Variable',
    desc: 'You can print the value of a variable using <b>console.log()</b>.',
    highlight: 'console.log(name);',
  },
  {
    label: 'Log Multiple Values',
    desc: 'You can log several values at once, separated by commas.',
    highlight: 'console.log("Name:", name, "Age:", age);',
  },
];

const debugSteps: Step[] = [
  {
    label: 'Debugging with console.log',
    desc: 'Use <b>console.log()</b> to check the value of variables at different points in your code.',
    highlight: 'console.log("Counter is", counter);',
  },
  {
    label: 'Log Inside Loops',
    desc: 'You can log inside a loop to see how values change.',
    highlight: 'console.log(i);',
  },
];

const errorWarnSteps: Step[] = [
  {
    label: 'console.error()',
    desc: 'Use <b>console.error()</b> to print error messages in red.',
    highlight: 'console.error("Something went wrong!");',
  },
  {
    label: 'console.warn()',
    desc: 'Use <b>console.warn()</b> to print warning messages in yellow.',
    highlight: 'console.warn("This is a warning!");',
  },
];

export default function ConsoleLogConcept() {
  return (
    <ConceptWrapper
      title="Using console.log in JavaScript"
      description="console.log() lets you print messages and values to the browser's console. It's the most common way to debug and understand your code."
    >
      <TableOfContents numbered>
        <Section title="What is console.log()?">
          <p>
            <b>console.log()</b> is a built-in JavaScript function that prints messages to the browser's console. It's useful for debugging, checking values, and understanding how your code runs.
          </p>
        </Section>
        <Section title="Basic Usage">
          <StepThroughCodeAnimation
            code={[
              'console.log("Hello, world!");',
              '// Output in the browser console:',
              '// Hello, world!',
            ]}
            steps={basicSteps}
          />
        </Section>
        <Section title="Logging Variables and Values">
          <StepThroughCodeAnimation
            code={[
              'let name = "Alice";',
              'let age = 30;',
              'console.log(name);',
              'console.log("Name:", name, "Age:", age);',
              '// Output:',
              '// Alice',
              '// Name: Alice Age: 30',
            ]}
            steps={variableSteps}
          />
        </Section>
        <Section title="Debugging with console.log">
          <StepThroughCodeAnimation
            code={[
              'let counter = 0;',
              'for (let i = 0; i < 3; i++) {',
              '  counter += i;',
              '  console.log("Counter is", counter);',
              '}',
              '// Output:',
              '// Counter is 0',
              '// Counter is 1',
              '// Counter is 3',
            ]}
            steps={debugSteps}
          />
        </Section>
        <Section title="console.error and console.warn">
          <StepThroughCodeAnimation
            code={[
              'console.error("Something went wrong!");',
              'console.warn("This is a warning!");',
              '// Output in the browser console:',
              '// (Error in red, warning in yellow)',
            ]}
            steps={errorWarnSteps}
          />
        </Section>
        <Section title="Tips & Common Mistakes">
          <ul>
            <li>Open your browser's developer tools and use the <b>Console</b> tab to see output from <code>console.log()</code>.</li>
            <li>You can log strings, numbers, variables, arrays, objects, and more.</li>
            <li>Use <code>console.log()</code> often to check your code as you write it.</li>
            <li>Remove or comment out <code>console.log()</code> lines before publishing your code.</li>
            <li>Use <code>console.error()</code> and <code>console.warn()</code> for errors and warnings.</li>
          </ul>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}