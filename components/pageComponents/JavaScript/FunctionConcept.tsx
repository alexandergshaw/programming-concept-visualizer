'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import StepThroughCodeAnimation from './StepThroughCodeAnimation';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import CapstonePractice from './CapstonePractice';

export default function FunctionConcept() {
    const squareParts: CodePart[] = [
        {
            label: 'Function Keyword',
            part: 'function',
            color: '#1976d2',
            desc: 'Tells JavaScript you are making a function.',
        },
        {
            label: 'Function Name',
            part: 'square',
            color: '#43a047',
            desc: 'What you call the function when you want to use it.',
        },
        {
            label: 'Parameters',
            part: '(x)',
            color: '#fbc02d',
            desc: 'A placeholder for the value you give the function.',
        },
        {
            label: 'Body',
            part: '{',
            color: '#e53935',
            desc: 'The instructions the function runs.',
        },
        {
            label: 'Return Statement',
            part: 'return x * x;',
            color: '#8e24aa',
            desc: 'Sends the answer back to wherever the function was called.',
        },
        {
            label: 'Argument',
            part: `(5)`,
            color: '#00bcd4',
            desc: 'The actual value you give to the function when you use it.',
        },
    ];

    // Parts for the arrow function example
    const arrowParts: CodePart[] = [
        {
            label: 'Arrow Function',
            part: 'const square =',
            color: '#1976d2',
            desc: 'Defines a constant variable and assigns it a function.',
        },
        {
            label: 'Parameter',
            part: 'x =>',
            color: '#43a047',
            desc: 'The parameter and the arrow that shows what comes next is the function body.',
        },
        {
            label: 'Function Body',
            part: 'x * x',
            color: '#e53935',
            desc: 'The code that runs when you call the function.',
        },
        {
            label: 'Argument',
            part: `(5)`,
            color: '#00bcd4',
            desc: 'The actual value you give to the function when you use it.',
        },
    ];


    return (
        <ConceptWrapper
            title="Functions in JavaScript"
            description="A function is a way to group steps together and give them a name, so you can run those steps whenever you want. You can give a function some info (like a number), and it can give you back an answer."
        >
            <TableOfContents numbered>
                <Section
                    title="Introduction to Functions"
                >
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
                            src="https://www.canva.com/design/DAGrIDVlfJc/qvTIrutwpb4R5SNOW3HdHA/watch?embed"
                            allowFullScreen={true}
                            allow="fullscreen"
                        >
                        </iframe>
                    </div>
                    <Section title="Parts of a Function">
                        <CodePartsExplanation
                            code={`function square(x) {\n  return x * x;\n}\nconsole.log(square(5));`}
                            parts={squareParts}
                        />
                    </Section>
                    <Section title="Step by Step Process of a Function">
                        <Section title="Example: Squaring a number">
                            <StepThroughCodeAnimation
                                code={[
                                    'function square(x) {',
                                    '  // This multiplies the number by itself',
                                    '  return x * x;',
                                    '}',
                                    `// Call the function with the number`,
                                    `console.log(square(5));`,
                                ]}
                                steps={[
                                    {
                                        label: 'Define Function',
                                        desc: 'We write out the function, but it hasn\'t run yet.',
                                        highlight: 'function square(x) {',
                                    },
                                    {
                                        label: 'Parameter Placeholder',
                                        desc: 'The <b>x</b> in <b>(x)</b> is a blank spot for the number you give.',
                                        highlight: '(x)',
                                    },
                                    {
                                        label: 'Function Body',
                                        desc: 'This is the code inside the curly braces. It tells the function what to do.',
                                        highlight: '{',
                                    },
                                    {
                                        label: 'Comment',
                                        desc: 'This line is a comment explaining what the next line does.',
                                        highlight: '// This multiplies the number by itself',
                                    },
                                    {
                                        label: 'Return Statement',
                                        desc: 'This line does the math and sends the answer back.',
                                        highlight: 'return x * x;',
                                    },
                                    {
                                        label: 'Call the Function',
                                        desc: 'Now we use the function and give it a number.',
                                        highlight: 'console.log(square(5));',
                                    },
                                    {
                                        label: 'What gets passed in?',
                                        desc: `The number <b>5</b> is sent into the function as <b>x</b>.`,
                                        highlight: 'console.log(square(5));',
                                    },
                                    {
                                        label: 'What happens inside?',
                                        desc: `Inside the function, <b>x</b> is now <b>5</b>.`,
                                        highlight: 'function square(x) {',
                                    },
                                    {
                                        label: 'Math Happens',
                                        desc: `The function multiplies <b>$5 * 5</b>.`,
                                        highlight: 'return x * x;',
                                    },
                                    {
                                        label: 'Return Value',
                                        desc: `The answer <b>25</b> is sent back to where the function was called.`,
                                        highlight: 'return x * x;',
                                    },
                                    {
                                        label: 'Show Output',
                                        desc: `The result <b>25</b> is printed to the console.`,
                                        highlight: (lines, idx) => lines[idx].includes('// Output: 25'),
                                        outputLine: `// Output: 25`,
                                    },
                                ]}
                            />
                        </Section>
                        <Section title="Example: Describing a Grade">
                            <StepThroughCodeAnimation
                                code={[
                                    'function describeGrade(name, grade) {',
                                    '  // Check if the grade is passing',
                                    '  if (grade >= 70) {',
                                    '    // If yes, return this message',
                                    '    return name + " passed!";',
                                    '  } else {',
                                    '    // If not, return this message',
                                    '    return name + " did not pass.";',
                                    '  }',
                                    '}',
                                    '// Call the function for Alex',
                                    'const alexResult = describeGrade("Alex", 85);',
                                    'console.log(alexResult);',
                                    '// Output: Alex passed!',
                                    '// Call the function for Sam',
                                    'const samResult = describeGrade("Sam", 62);',
                                    'console.log(samResult);',
                                    '// Output: Sam did not pass.'
                                ]}
                                steps={[
                                    {
                                        label: 'Define Function',
                                        desc: 'We write out the function, but it hasn\'t run yet.',
                                        highlight: 'function describeGrade(name, grade) {',
                                    },
                                    {
                                        label: 'Parameters',
                                        desc: 'The <b>name</b> and <b>grade</b> are blanks for info you give.',
                                        highlight: '(name, grade)',
                                    },
                                    {
                                        label: 'Call for Alex',
                                        desc: 'We use the function for Alex, who has a grade of <b>85</b>.',
                                        highlight: 'const alexResult = describeGrade("Alex", 85);',
                                    },
                                    {
                                        label: 'Step into Function (Alex)',
                                        desc: 'Now we step into the function with <b>name = "Alex"</b> and <b>grade = 85</b>.',
                                        highlight: 'function describeGrade(name, grade) {',
                                    },
                                    {
                                        label: 'Check Grade (Alex)',
                                        desc: 'This line checks if <b>grade</b> (85) is 70 or more. It is!',
                                        highlight: 'if (grade >= 70) {',
                                    },
                                    {
                                        label: 'Return Passed (Alex)',
                                        desc: 'The function sends back <b>"Alex passed!"</b> and saves it to <b>alexResult</b>.',
                                        highlight: (lines, idx) =>
                                            lines[idx].includes('return name + " passed!";') ||
                                            lines[idx].includes('const alexResult = describeGrade("Alex", 85);'),
                                    },
                                    {
                                        label: 'Print Result (Alex)',
                                        desc: 'We print <b>alexResult</b> to the console.',
                                        highlight: 'console.log(alexResult);',
                                    },
                                    {
                                        label: 'Show Output (Alex)',
                                        desc: '<b>Alex passed!</b> is printed to the console.',
                                        highlight: (lines, idx) => lines[idx].includes('// Output: Alex passed!'),
                                    },
                                    {
                                        label: 'Call for Sam',
                                        desc: 'Now we use the function for Sam, who has a grade of <b>62</b>.',
                                        highlight: 'const samResult = describeGrade("Sam", 62);',
                                    },
                                    {
                                        label: 'Step into Function (Sam)',
                                        desc: 'Now we step into the function with <b>name = "Sam"</b> and <b>grade = 62</b>.',
                                        highlight: 'function describeGrade(name, grade) {',
                                    },
                                    {
                                        label: 'Check Grade (Sam)',
                                        desc: 'This line checks if <b>grade</b> (62) is 70 or more. It is not!',
                                        highlight: 'if (grade >= 70) {',
                                    },
                                    {
                                        label: 'Else Branch (Sam)',
                                        desc: 'Since <b>grade</b> is 62, we go to the <b>else</b> part.',
                                        highlight: 'else {',
                                    },
                                    {
                                        label: 'Return Not Passed (Sam)',
                                        desc: 'The function sends back <b>"Sam did not pass."</b> and saves it to <b>samResult</b>.',
                                        highlight: (lines, idx) =>
                                            lines[idx].includes('return name + " did not pass.";') ||
                                            lines[idx].includes('const samResult = describeGrade("Sam", 62);'),
                                    },
                                    {
                                        label: 'Print Result (Sam)',
                                        desc: 'We print <b>samResult</b> to the console.',
                                        highlight: 'console.log(samResult);',
                                    },
                                    {
                                        label: 'Show Output (Sam)',
                                        desc: '<b>Sam did not pass.</b> is printed to the console.',
                                        highlight: (lines, idx) => lines[idx].includes('// Output: Sam did not pass.'),
                                    },
                                ]}
                            />
                        </Section>
                    </Section>
                </Section>
                <Section
                    title="Arrow Functions"
                    subtitle="Arrow functions are a shorter way to write functions and are often assigned to variables."
                >
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
                            src="https://www.canva.com/design/DAGrIAx7pGo/L3paE-TzPKAX9G6owiASyQ/watch?embed"
                            allowFullScreen={true}
                            allow="fullscreen"
                        >
                        </iframe>
                    </div>
                    <Section title="Parts of an Arrow Function">
                        <CodePartsExplanation
                            code={`const square = x => x * x;\nconsole.log(square(${5}));`}
                            parts={arrowParts}
                        />
                    </Section>
                    <Section title="Step by Step Process of an Arrow Function">
                        <StepThroughCodeAnimation
                            code={[
                                'const square = x => x * x;',
                                `console.log(square(${5}));`,
                            ]}
                            steps={[
                                {
                                    label: 'Define Arrow Function',
                                    desc: 'We create a function and assign it to the variable <b>square</b>.',
                                    highlight: 'const square = x => x * x;',
                                },
                                {
                                    label: 'Call the Function',
                                    desc: `We use the function and give it the number <b>${5}</b>.`,
                                    highlight: `console.log(square(${5}));`,
                                },
                                {
                                    label: 'Parameter',
                                    desc: `The value <b>${5}</b> is used as <b>x</b> in the function.`,
                                    highlight: 'x =>',
                                },
                                {
                                    label: 'Function Body',
                                    desc: `The function multiplies <b>${5} * ${5}</b>.`,
                                    highlight: 'x * x',
                                },
                                {
                                    label: 'Show Output',
                                    desc: `The result <b>${5 * 5}</b> is printed to the console.`,
                                    highlight: (lines, idx) => lines[idx].includes('// Output: ' + (5 * 5)),
                                    outputLine: `// Output: ${5 * 5}`,
                                },
                            ]}
                        />
                    </Section>

                    <Section
                        title="Arrow Functions with 0 Parameters"
                        subtitle="Arrow functions can also take no input at all."
                    >
                        <StepThroughCodeAnimation
                            code={[
                                'const sayHello = () => "Hello!";',
                                'console.log(sayHello());',
                                '// Output: Hello!',
                            ]}
                            steps={[
                                {
                                    label: 'Define Arrow Function',
                                    desc: 'We make a function called <b>sayHello</b> that takes no input.',
                                    highlight: 'const sayHello = () => "Hello!";',
                                },
                                {
                                    label: 'Call the Function',
                                    desc: 'We use the function. Since it takes no input, we just use empty parentheses.',
                                    highlight: 'console.log(sayHello());',
                                },
                                {
                                    label: 'Function Body',
                                    desc: 'The function gives back the text <b>Hello!</b>.',
                                    highlight: '"Hello!"',
                                },
                                {
                                    label: 'Show Output',
                                    desc: '<b>Hello!</b> is printed to the console.',
                                    highlight: (lines, idx) => lines[idx].includes('// Output: Hello!'),
                                },
                            ]}
                        />
                    </Section>
                    <Section
                        title="Arrow Functions with 2 Parameters"
                        subtitle="Arrow functions can take more than one input."
                    >

                        <StepThroughCodeAnimation
                            code={[
                                'const add = (a, b) => a + b;',
                                'console.log(add(3, 4));',
                                '// Output: 7',
                            ]}
                            steps={[
                                {
                                    label: 'Define Arrow Function',
                                    desc: 'We make a function called <b>add</b> that takes two inputs: <b>a</b> and <b>b</b>.',
                                    highlight: 'const add = (a, b) => a + b;',
                                },
                                {
                                    label: 'Call the Function',
                                    desc: 'We use the function and give it the numbers <b>3</b> and <b>4</b>.',
                                    highlight: 'console.log(add(3, 4));',
                                },
                                {
                                    label: 'Function Body',
                                    desc: 'The function adds <b>3 + 4</b>.',
                                    highlight: 'a + b',
                                },
                                {
                                    label: 'Show Output',
                                    desc: '<b>7</b> is printed to the console.',
                                    highlight: (lines, idx) => lines[idx].includes('// Output: 7'),
                                },
                            ]}
                        />
                    </Section>
                </Section>

                <Section
                    title="Anonymous Functions"
                    subtitle="Sometimes we need to tell our program how another piece of code should behave. This is where we can use something called an anonymous function."
                >
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
                            src="https://www.canva.com/design/DAGrIOBSQJk/J4k-K4b6X9qkAHeQ3ILCJw/watch?embed"
                            allowFullScreen={true}
                            allow="fullscreen"
                        >
                        </iframe>
                    </div>
                    <Section title="Parts of an Anonymous Function">
                        <CodePartsExplanation
                            code={`x => console.log(x * x)`}
                            parts={[
                                {
                                    label: 'Arrow Function (Anonymous)',
                                    part: 'x =>',
                                    color: '#e53935',
                                    desc: 'This is a quick, no-name (the reason we call it "anonymous") function.',
                                },
                                {
                                    label: 'Parameter',
                                    part: 'x =>',
                                    color: '#fbc02d',
                                    desc: '<b>x</b> is the function input.',
                                },
                                {
                                    label: 'Function Body',
                                    part: 'console.log(x * x)',
                                    color: '#8e24aa',
                                    desc: 'This is what the anonymous function does.',
                                },
                            ]}
                        />
                    </Section>
                    <Section title="Step by Step Example of Anonymous Function" subtitle='Anonymous functions are often used along with another piece of code. In this example, we use our anonymous function to tell the forEach loop to print the square of each number in a list.'>
                        <StepThroughCodeAnimation
                            code={[
                                'const nums = [1, 2, 3];',
                                'nums.forEach(x => console.log(x * x));',
                                '// Output:',
                                '// 1',
                                '// 4',
                                '// 9',
                            ]}
                            steps={[
                                {
                                    label: 'Make a List',
                                    desc: 'We make a list of numbers called <b>nums</b>.',
                                    highlight: 'const nums = [1, 2, 3];',
                                },
                                {
                                    label: 'Get Ready to Do Something for Each number',
                                    desc: 'We use <b>forEach</b> to say: "Do something for every number in <b>nums</b>."',
                                    highlight: '.forEach',
                                },
                                {
                                    label: 'Give forEach a Quick Function',
                                    desc: 'We give <b>forEach</b> a quick, no-name function (an anonymous function) to use.',
                                    highlight: 'x =>',
                                },
                                {
                                    label: 'What is x?',
                                    desc: '<b>x</b> is just a stand-in for each number in our list, one at a time.',
                                    highlight: 'x =>',
                                },
                                {
                                    label: 'What Do We Do?',
                                    desc: 'For each number, we tell the computer to show <b>x * x</b> (the number times itself).',
                                    highlight: 'console.log(x * x)',
                                },
                                {
                                    label: 'First number',
                                    desc: 'First, <b>x</b> is <b>1</b>. We show <b>1 * 1</b>, which is <b>1</b>.',
                                    highlight: 'console.log(x * x)',
                                },
                                {
                                    label: 'Second number',
                                    desc: 'Next, <b>x</b> is <b>2</b>. We show <b>2 * 2</b>, which is <b>4</b>.',
                                    highlight: 'console.log(x * x)',
                                },
                                {
                                    label: 'Third number',
                                    desc: 'Then, <b>x</b> is <b>3</b>. We show <b>3 * 3</b>, which is <b>9</b>.',
                                    highlight: 'console.log(x * x)',
                                },
                                {
                                    label: 'See the Results',
                                    desc: 'We see <b>1</b>, <b>4</b>, and <b>9</b> printed out—one for each number in our list.',
                                    highlight: (lines, idx) =>
                                        lines[idx].includes('// 1') ||
                                        lines[idx].includes('// 4') ||
                                        lines[idx].includes('// 9'),
                                },
                            ]}
                        />
                    </Section>
                </Section>
                <Section
                    title="Capstone Practice Problem"
                    subtitle="Use what you learned about arrow functions to solve this challenge!"
                >
                    <CapstonePractice
                        prompt={`Write an arrow function called triple that takes a number and returns that number times 3. Then console.log the result of passing 7 as an argument to triple().`}
                        correctOutput="21"
                        initialCode={`// Write your arrow function below\n`}
                        requiredCode={["const triple", "=>", "return", "console.log"]}
                    />
                </Section>
            </TableOfContents>
        </ConceptWrapper>
    );
}