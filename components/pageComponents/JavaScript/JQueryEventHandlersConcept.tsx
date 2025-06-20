'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import StepThroughCodeAnimation from './StepThroughCodeAnimation';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import CodeSnippet from '@/components/common/CodeSnippet';

export default function JQueryEventHandlersConcept() {
    // Parts for a basic jQuery click handler
    const clickParts: CodePart[] = [
        {
            label: 'Selector',
            part: `$('#myBtn')`,
            color: '#1976d2',
            desc: 'Selects the element with id <b>myBtn</b>.',
        },
        {
            label: 'Event Method',
            part: '.on(',
            color: '#43a047',
            desc: 'Tells jQuery to listen for an event.',
        },
        {
            label: 'Event Name',
            part: `'click'`,
            color: '#fbc02d',
            desc: 'The type of event to listen for (here, a mouse click).',
        },
        {
            label: 'Callback Function',
            part: 'function()',
            color: '#e53935',
            desc: 'The code to run when the event happens.',
        },
        {
            label: 'Action',
            part: `alert('Button clicked!')`,
            color: '#8e24aa',
            desc: 'What happens when the button is clicked.',
        },
    ];

    return (
        <ConceptWrapper
            title="jQuery Event Handlers"
            description="jQuery makes it easy to react to user actions like clicks, typing, or mouse movement. You can use event handlers to run code when something happens on the page."
        >
            <TableOfContents numbered>
                <Section
                    title="What is an Event Handler?"
                    subtitle="An event handler is code that runs when something happens, like a button click."
                >
                    <Section title="Parts of a jQuery Event Handler">
                        <CodePartsExplanation
                            code={`$('#myBtn').on('click', function() {\n  alert('Button clicked!');\n});`}
                            parts={clickParts}
                        />
                    </Section>
                    <Section title="Step by Step: Handling a Click">
                        <StepThroughCodeAnimation
                            code={[
                                `$('#myBtn').on('click', function() {`,
                                `  alert('Button clicked!');`,
                                `});`,
                                `// When you click the button with id="myBtn",`,
                                `// the alert pops up.`,
                            ]}
                            steps={[
                                {
                                    label: 'Select the Button',
                                    desc: 'We use <b>$("#myBtn")</b> to find the button on the page.',
                                    highlight: `$('#myBtn')`,
                                },
                                {
                                    label: 'Listen for Click',
                                    desc: 'We tell jQuery to watch for a <b>click</b> event.',
                                    highlight: `.on('click'`,
                                },
                                {
                                    label: 'Write What Happens',
                                    desc: 'We give a function that runs when the button is clicked.',
                                    highlight: 'function() {',
                                },
                                {
                                    label: 'Show an Alert',
                                    desc: 'When the button is clicked, <b>alert("Button clicked!")</b> runs.',
                                    highlight: `alert('Button clicked!')`,
                                },
                                {
                                    label: 'Try It',
                                    desc: 'Clicking the button shows the alert.',
                                    highlight: '// the alert pops up.',
                                },
                            ]}
                        />
                    </Section>
                </Section>
                <Section
                    title="Common Events in jQuery"
                    subtitle="You can listen for many types of events."
                >
                    <Section title="Click Event">
                        <CodeSnippet
                            lines={[
                                { code: `$('#myBtn').on('click', function() {`, comment: 'When the button is clicked...' },
                                { code: `  alert('Clicked!');`, comment: 'Show a message' },
                                { code: `});` },
                            ]}
                            enableRun={false}
                            editable
                            allowCopy
                            language="javascript"
                        />
                    </Section>
                    <Section title="Mouse Enter Event">
                        <CodeSnippet
                            lines={[
                                { code: `$('#myDiv').on('mouseenter', function() {`, comment: 'When the mouse enters the div...' },
                                { code: `  $(this).css('background', 'yellow');`, comment: 'Change background color' },
                                { code: `});` },
                            ]}
                            enableRun={false}
                            editable
                            allowCopy
                            language="javascript"
                        />
                    </Section>
                    <Section title="Keyup Event">
                        <CodeSnippet
                            lines={[
                                { code: `$('#myInput').on('keyup', function() {`, comment: 'When a key is released in the input...' },
                                { code: `  $('#output').text($(this).val());`, comment: 'Show the input value' },
                                { code: `});` },
                            ]}
                            enableRun={false}
                            editable
                            allowCopy
                            language="javascript"
                        />
                    </Section>
                </Section>
                <Section
                    title="Try It Yourself: Practice jQuery Events"
                    subtitle="Edit and experiment with these event handlers."
                >
                    <Section title="Try: Click Event">
                        <CodeSnippet
                            lines={[
                                { code: `$('#myBtn').on('click', function() {`, comment: 'Show a message when clicked' },
                                { code: `  alert('You clicked the button!');` },
                                { code: `});` },
                            ]}
                            enableRun={false}
                            editable
                            allowCopy
                            language="javascript"
                        />
                    </Section>
                    <Section title="Try: Change Background on Hover">
                        <CodeSnippet
                            lines={[
                                { code: `$('#myDiv').on('mouseenter', function() {`, comment: 'Highlight on hover' },
                                { code: `  $(this).css('background', 'lightblue');` },
                                { code: `});` },
                            ]}
                            enableRun={false}
                            editable
                            allowCopy
                            language="javascript"
                        />
                    </Section>
                </Section>
            </TableOfContents>
        </ConceptWrapper>
    );
}