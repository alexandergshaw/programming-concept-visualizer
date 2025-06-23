import React, { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import StepThroughCodeAnimation, { Step } from '../JavaScript/StepThroughCodeAnimation';
import PythonCodeSnippet from '@/components/common/PythonCodeSnippet';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const ifElseSteps: Step[] = [
  {
    label: 'If Statement',
    desc: 'The <b>if</b> statement checks if a condition is true. If it is, the indented code runs.',
    highlight: 'if x > 0:',
  },
  {
    label: 'If Block',
    desc: 'This code runs only if the condition is true.',
    highlight: '    print("x is positive")',
  },
  {
    label: 'Else-If (elif) Statement',
    desc: 'The <b>elif</b> statement checks another condition if the first <b>if</b> was false.',
    highlight: 'elif x == 0:',
  },
  {
    label: 'Elif Block',
    desc: 'This code runs if the <b>elif</b> condition is true.',
    highlight: '    print("x is zero")',
  },
  {
    label: 'Else Statement',
    desc: 'The <b>else</b> block runs if none of the above conditions were true.',
    highlight: 'else:',
  },
  {
    label: 'Else Block',
    desc: 'This code runs if all previous conditions were false.',
    highlight: '    print("x is negative")',
  },
];

const ifElseStringSteps: Step[] = [
  {
    label: 'If Statement',
    desc: 'We check if <b>color</b> is "red".',
    highlight: 'if color == "red":',
  },
  {
    label: 'If Block',
    desc: 'This code runs if <b>color</b> is "red".',
    highlight: '    print("Stop!")',
  },
  {
    label: 'Else-If (elif) Statement',
    desc: 'We check if <b>color</b> is "yellow".',
    highlight: 'elif color == "yellow":',
  },
  {
    label: 'Elif Block',
    desc: 'This code runs if <b>color</b> is "yellow".',
    highlight: '    print("Slow down!")',
  },
  {
    label: 'Else Statement',
    desc: 'The <b>else</b> block runs if <b>color</b> is not "red" or "yellow".',
    highlight: 'else:',
  },
  {
    label: 'Else Block',
    desc: 'This code runs if <b>color</b> is something else (like "green").',
    highlight: '    print("Go!")',
  },
];

const nestedIfSteps: Step[] = [
  {
    label: 'Outer If',
    desc: 'First, we check if <b>num</b> is greater than 10.',
    highlight: 'if num > 10:',
  },
  {
    label: 'Outer If Block',
    desc: 'This code runs if <b>num</b> is greater than 10.',
    highlight: '    print("Greater than 10")',
  },
  {
    label: 'Nested If',
    desc: 'Inside the outer if, we check if <b>num</b> is also even.',
    highlight: '    if num % 2 == 0:',
  },
  {
    label: 'Nested If Block',
    desc: 'This code runs if <b>num</b> is greater than 10 <b>and</b> even.',
    highlight: '        print("And even!")',
  },
  {
    label: 'Else for Nested If',
    desc: 'This code runs if <b>num</b> is greater than 10 but <b>not</b> even.',
    highlight: '        print("But odd!")',
  },
  {
    label: 'Else for Outer If',
    desc: 'This code runs if <b>num</b> is <b>not</b> greater than 10.',
    highlight: 'else:',
  },
  {
    label: 'Else Block',
    desc: 'This code runs if <b>num</b> is 10 or less.',
    highlight: '    print("10 or less")',
  },
];

const nestedIfStringSteps: Step[] = [
  {
    label: 'Outer If',
    desc: 'First, we check if <b>animal</b> is "dog".',
    highlight: 'if animal == "dog":',
  },
  {
    label: 'Outer If Block',
    desc: 'This code runs if <b>animal</b> is "dog".',
    highlight: '    print("Woof!")',
  },
  {
    label: 'Nested If',
    desc: 'Inside the outer if, we check if <b>breed</b> is "poodle".',
    highlight: '    if breed == "poodle":',
  },
  {
    label: 'Nested If Block',
    desc: 'This code runs if <b>animal</b> is "dog" <b>and</b> <b>breed</b> is "poodle".',
    highlight: '        print("It\'s a poodle!")',
  },
  {
    label: 'Else for Nested If',
    desc: 'This code runs if <b>animal</b> is "dog" but <b>breed</b> is not "poodle".',
    highlight: '        print("Some other breed")',
  },
  {
    label: 'Else for Outer If',
    desc: 'This code runs if <b>animal</b> is not "dog".',
    highlight: '    print("Not a dog")',
  },
];

// Interactive dropdown for color, with more layman explanations
function ColorDropdownPythonSnippet() {
  const [color, setColor] = useState('red');
  const code = [
    `color = "${color}"`,
    'if color == "red":',
    '    print("Stop!")',
    'elif color == "yellow":',
    '    print("Slow down!")',
    'else:',
    '    print("Go!")',
  ].join('\n');

  return (
    <Box sx={{ my: 2 }}>
      <div style={{ marginBottom: 8 }}>
        Pick a color below and see what the program says you should do at a traffic light.
        <br />
      </div>
      <FormControl size="small" sx={{ minWidth: 160, mb: 1 }}>
        <InputLabel id="color-select-label">Color</InputLabel>
        <Select
          labelId="color-select-label"
          value={color}
          label="Color"
          onChange={e => setColor(e.target.value)}
        >
          <MenuItem value="red">red</MenuItem>
          <MenuItem value="yellow">yellow</MenuItem>
          <MenuItem value="green">green</MenuItem>
          <MenuItem value="blue">blue</MenuItem>
        </Select>
      </FormControl>
      <div style={{ marginBottom: 8 }}>
        The code below checks what color you picked and prints out what you should do.
      </div>
      <PythonCodeSnippet
        code={code}
        enableRun
        allowCopy
        showTerminal
      />
    </Box>
  );
}

// Interactive dropdowns for animal and breed, with more layman explanations
function AnimalBreedDropdownPythonSnippet() {
  const [animal, setAnimal] = useState('dog');
  const [breed, setBreed] = useState('poodle');
  const code = [
    `animal = "${animal}"`,
    `breed = "${breed}"`,
    'if animal == "dog":',
    '    print("Woof!")',
    '    if breed == "poodle":',
    '        print("It\'s a poodle!")',
    '    else:',
    '        print("Some other breed")',
    'else:',
    '    print("Not a dog")',
  ].join('\n');

  return (
    <Box sx={{ my: 2 }}>
      <FormControl size="small" sx={{ minWidth: 160, mr: 2, mb: 1 }}>
        <InputLabel id="animal-select-label">Animal</InputLabel>
        <Select
          labelId="animal-select-label"
          value={animal}
          label="Animal"
          onChange={e => setAnimal(e.target.value)}
        >
          <MenuItem value="dog">dog</MenuItem>
          <MenuItem value="cat">cat</MenuItem>
          <MenuItem value="bird">bird</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel id="breed-select-label">Breed</InputLabel>
        <Select
          labelId="breed-select-label"
          value={breed}
          label="Breed"
          onChange={e => setBreed(e.target.value)}
          disabled={animal !== 'dog'}
        >
          <MenuItem value="poodle">poodle</MenuItem>
          <MenuItem value="bulldog">bulldog</MenuItem>
          <MenuItem value="beagle">beagle</MenuItem>
          <MenuItem value="other">other</MenuItem>
        </Select>
      </FormControl>
      <PythonCodeSnippet
        code={code}
        enableRun
        allowCopy
        showTerminal
      />
    </Box>
  );
}

export default function IfElseConcept() {
  return (
    <ConceptWrapper
      title="Python If, Elif, Else"
      description="Conditional statements let you run different code depending on whether something is true or false."
    >
      <TableOfContents numbered>
        <Section title="Video Overview">
          <div style={{
            position: 'relative',
            width: '100%',
            height: 0,
            paddingTop: '56.25%',
            paddingBottom: 0,
            boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
            marginTop: '1.6em',
            marginBottom: '0.9em',
            overflow: 'hidden',
            borderRadius: 8,
            willChange: 'transform'
          }}>
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
                margin: 0
              }}
              src="https://www.canva.com/design/DAGrHmb_5Yo/Eahc0b0P2epVaUwr0vNA5g/watch?embed"
              allowFullScreen
              allow="fullscreen"
            >
            </iframe>
          </div>
        </Section>
        <Section
          title="Basic If Statement"
          subtitle="How to use if to run code only when a condition is true"
        >

          <div style={{ marginBottom: 16 }}>
            <b>What is an <code>if</code> statement?</b>
            <br />
            An <b>if</b> statement lets your program make decisions. If something is true, the code inside the <b>if</b> runs. If not, it skips it!
            <br /><br />
            For example, if you want to check if a number is positive, you can use an <b>if</b> statement.
          </div>
          <StepThroughCodeAnimation
            code={[
              'x = 5',
              'if x > 0:',
              '    print("x is positive")',
            ]}
            steps={[
              {
                label: 'Set Variable',
                desc: 'We set <b>x</b> to <b>5</b>.',
                highlight: 'x = 5',
              },
              {
                label: 'If Statement',
                desc: 'We check if <b>x</b> is greater than 0.',
                highlight: 'if x > 0:',
              },
              {
                label: 'If Block',
                desc: 'Since <b>x</b> is 5, this code runs and prints "x is positive".',
                highlight: '    print("x is positive")',
              },
            ]}
          />
        </Section>
        <Section
          title="If, Elif, Else"
          subtitle="How to check multiple conditions"
        >
          <div style={{ marginBottom: 16 }}>
            <b>What if you want to check more than one thing?</b>
            <br />
            You can use <b>elif</b> (which means &quot;else if&quot;) and <b>else</b> to check different possibilities.
            <br /><br />
            For example, you might want to print something different if a number is positive, zero, or negative.
          </div>
          <StepThroughCodeAnimation
            code={[
              'x = 0',
              'if x > 0:',
              '    print("x is positive")',
              'elif x == 0:',
              '    print("x is zero")',
              'else:',
              '    print("x is negative")',
            ]}
            steps={ifElseSteps}
          />
          <div style={{ margin: '24px 0 8px 0' }}>
            You can use <b>if</b>, <b>elif</b>, and <b>else</b> with any kind of value, not just numbers! Here’s an example with colors:
          </div>
          <StepThroughCodeAnimation
            code={[
              'color = "yellow"',
              'if color == "red":',
              '    print("Stop!")',
              'elif color == "yellow":',
              '    print("Slow down!")',
              'else:',
              '    print("Go!")',
            ]}
            steps={ifElseStringSteps}
          />
          <Section
            title="Try It Yourself: If, Elif, Else"
            subtitle="Change the color and run the code"
          >
            <ColorDropdownPythonSnippet />
          </Section>
        </Section>

        <Section
          title="Nested If Statements"
          subtitle="Putting if statements inside other if statements"
        >
          <div style={{ marginBottom: 16 }}>
            <b>What if you want to check something inside another check?</b>
            <br />
            You can put an <b>if</b> statement inside another <b>if</b>. This is called &quot;nesting&quot;.
            <br /><br />
            For example, you might want to check if a number is bigger than 10, and then check if it&apos;s even or odd.
          </div>
          <StepThroughCodeAnimation
            code={[
              'num = 12',
              'if num > 10:',
              '    print("Greater than 10")',
              '    if num % 2 == 0:',
              '        print("And even!")',
              '    else:',
              '        print("But odd!")',
              'else:',
              '    print("10 or less")',
            ]}
            steps={nestedIfSteps}
          />
          <div style={{ margin: '24px 0 8px 0' }}>
            You can nest <b>if</b> statements with other types of data too! Here’s an example with animals and breeds:
          </div>
          <StepThroughCodeAnimation
            code={[
              'animal = "dog"',
              'breed = "poodle"',
              'if animal == "dog":',
              '    print("Woof!")',
              '    if breed == "poodle":',
              '        print("It\'s a poodle!")',
              '    else:',
              '        print("Some other breed")',
              'else:',
              '    print("Not a dog")',
            ]}
            steps={nestedIfStringSteps}
          />
          <Section
            title="Try It Yourself: Nested If"
            subtitle="Change the animal and breed and run the code"
          >
            <AnimalBreedDropdownPythonSnippet />
          </Section>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}