'use client';

import React, { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import CapstonePractice from './CapstonePractice';
import MuiButton from '@mui/material/Button';
import MuiInput from '@mui/material/Input';
import MuiBox from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function EventHandlersConcept() { 
    // Parts for a basic JS click handler, including HTML highlights
    const clickParts: CodePart[] = [
        {
            label: 'Selector',
            part: `document.getElementById('myBtn')`,
            color: '#1976d2',
            desc: 'Selects the element with id <b>myBtn</b> in the JavaScript.',
        },
        {
            label: 'Button Element',
            part: `id="myBtn"`,
            color: '#1976d2',
            desc: 'This is the HTML button with <b>id="myBtn"</b> that the selector finds.',
        },
        {
            label: 'addEventListener',
            part: 'addEventListener',
            color: '#43a047',
            desc: 'The JavaScript method for adding event listeners.',
        },
        {
            label: 'Event Name',
            part: `'click'`,
            color: '#fbc02d',
            desc: 'The type of event to listen for (here, a mouse click).',
        },
        {
            label: 'Callback Function',
            part: '() => {',
            color: '#e53935',
            desc: 'The code to run when the event happens.',
        },
        {
            label: 'Action',
            part: `alert('Event triggered!')`,
            color: '#8e24aa',
            desc: 'What happens when the button is clicked.',
        },
    ];


    // Demo options
    const eventOptions = [
        { label: 'Click', value: 'click' },
        { label: 'Mouse Enter', value: 'mouseenter' },
        { label: 'Double Click', value: 'dblclick' } // Changed from 'Key Up' to 'Double Click'
    ];
    const elementOptions = [
        { label: 'Button (myBtn)', value: 'myBtn', html: `<button id="myBtn">Click me!</button>` },
        { label: 'Div (myDiv)', value: 'myDiv', html: `<div id="myDiv" style="padding:16px;border:1px solid #ccc;">Hover me!</div>` },
        { label: 'Input (myInput)', value: 'myInput', html: `<input id="myInput" placeholder="Type here..." />` }
    ];

    const [selectedEvent, setSelectedEvent] = useState(eventOptions[0].value);
    const [selectedElement, setSelectedElement] = useState(elementOptions[0].value);

    // Handler for demo (always shows the same alert)
    const handleDemo = () => {
        window.alert('Event triggered!');
    };

    // Render the selected HTML element with the correct event handler
    const renderDemoElement = () => {
        if (selectedElement === 'myBtn') {
            return (
                <MuiButton
                    id="myBtn"
                    onClick={selectedEvent === 'click' ? handleDemo : undefined}
                    onMouseEnter={selectedEvent === 'mouseenter' ? handleDemo : undefined}
                    onDoubleClick={selectedEvent === 'dblclick' ? handleDemo : undefined}
                    variant="contained"
                    color="primary"
                    sx={{
                        fontSize: 16,
                        borderRadius: 2,
                        marginRight: 1,
                        textTransform: 'none',
                        boxShadow: 'none',
                        px: 3,
                        py: 1.2,
                    }}
                >
                    Button
                </MuiButton>
            );
        }
        if (selectedElement === 'myDiv') {
            return (
                <MuiBox
                    id="myDiv"
                    onClick={selectedEvent === 'click' ? handleDemo : undefined}
                    onMouseEnter={selectedEvent === 'mouseenter' ? handleDemo : undefined}
                    onDoubleClick={selectedEvent === 'dblclick' ? handleDemo : undefined}
                    sx={{
                        padding: 2,
                        border: '1.5px solid #1976d2',
                        borderRadius: 2,
                        background: '#f3f6fa',
                        color: '#222',
                        display: 'inline-block',
                        minWidth: 120,
                        cursor: selectedEvent === 'click' ? 'pointer' : 'default',
                        fontSize: 16,
                        textAlign: 'center'
                    }}
                >
                    div
                </MuiBox>
            );
        }
        if (selectedElement === 'myInput') {
            return (
                <MuiInput
                    id="myInput"
                    onClick={selectedEvent === 'click' ? handleDemo : undefined}
                    onMouseEnter={selectedEvent === 'mouseenter' ? handleDemo : undefined}
                    onDoubleClick={selectedEvent === 'dblclick' ? handleDemo : undefined}
                    placeholder="Input"
                    sx={{
                        fontSize: 16,
                        borderRadius: 2,
                        border: '1.5px solid #1976d2',
                        marginRight: 1,
                        padding: '8px 12px',
                        background: '#fff'
                    }}
                    disableUnderline
                />
            );
        }
        return null;
    };

    // More realistic DOMContentLoaded code example
    const domContentLoadedCode = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>DOMContentLoaded Example</title>
    <style>
      #output {
        margin-top: 16px;
        color: #1565c0;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <button id="showMsgBtn">Show Message</button>
    <div id="output"></div>
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('showMsgBtn');
        const output = document.getElementById('output');
        btn.addEventListener('click', () => {
          output.textContent = 'The DOM is ready and you clicked the button!';
        });
      });
    </script>
  </body>
</html>`;

    const domContentLoadedParts: CodePart[] = [
        {
            label: 'Document Object Model (DOM)',
            part: `document.addEventListener`,
            color: '#1976d2', // blue for DOM/document
            desc: 'The object representing the HTML. Here, we add an event listener on it to listen for events on the whole page.',
        },
        {
            label: 'Event Name',
            part: `'DOMContentLoaded'`,
            color: '#d84315', // deep orange for event name
            desc: 'The event that fires when the HTML is fully loaded. This guarantees that all elements (buttons, divs, etc) are available to work with.',
        },
        {
            label: 'Get Button',
            part: `const btn = document.getElementById('showMsgBtn')`,
            color: '#388e3c', // green for selecting elements
            desc: 'We create a variable to hold the button, once we select it by its id. We have to do this inside the DOMContentLoaded event so our code waits until the page is loaded, and the button is guaranteed to exist.',
        },
        {
            label: 'Get Output Div',
            part: `const output = document.getElementById('output')`,
            color: '#388e3c', // green for selecting elements
            desc: 'Selects the output div by its id. We have to do this inside the DOMContentLoaded event so our code waits until the page is loaded, and the div is guaranteed to exist.',
        },
        {
            label: 'Button Click Listener',
            part: `btn.addEventListener('click', () => {`,
            color: '#6a1b9a', // purple for event listeners
            desc: 'Adds a click event listener to the button.',
        },
        {
            label: 'Set Output Text',
            part: `output.textContent = 'The DOM is ready and you clicked the button!';`,
            color: '#fbc02d', // yellow for output/action
            desc: 'Adds text to the output div when the button is clicked.',
        },
    ];

    return (
        <ConceptWrapper
            title="JavaScript Event Handlers"
            description="JavaScript makes it easy to react to user actions like clicks, typing, or mouse movement. You can use event handlers to run code when something happens on the page."
        >
            <TableOfContents numbered>
                <Section
                    title="What is an Event Handler?"
                    subtitle="An event handler is code that runs when something happens, like a button click."
                >
                    <Section title="Parts of a JavaScript Event Handler">
                        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                            <div style={{ flex: '1 1 420px', minWidth: 0 }}>
                                <CodePartsExplanation
                                    code={
                                        `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>JavaScript Event Handler Example</title>
  </head>
  <body>
    <button id="myBtn">Click me!</button>

    <script>
      document.getElementById('myBtn').addEventListener('click', () => {
        alert('Event triggered!');
      });
    </script>
  </body>
</html>`
                                    }
                                    parts={clickParts}
                                />
                            </div>
                        </div>
                    </Section>
                    <Section
                        title="Interactive Event Handler Demo"
                        subtitle="Try different combinations of events and elements to see how event handlers work."
                    >
                        <ConceptInfoCard>
                            <div style={{ marginBottom: 12, display: 'flex', gap: 24, alignItems: 'center' }}>
                                <FormControl size="small" variant="outlined" sx={{ minWidth: 120 }}>
                                    <InputLabel id="event-label">Event</InputLabel>
                                    <Select
                                        labelId="event-label"
                                        value={selectedEvent}
                                        label="Event"
                                        onChange={e => setSelectedEvent(e.target.value as string)}
                                    >
                                        {eventOptions.map(opt => (
                                            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl size="small" variant="outlined" sx={{ minWidth: 160 }}>
                                    <InputLabel id="element-label">Element</InputLabel>
                                    <Select
                                        labelId="element-label"
                                        value={selectedElement}
                                        label="Element"
                                        onChange={e => setSelectedElement(e.target.value as string)}
                                    >
                                        {elementOptions.map(opt => (
                                            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div style={{ margin: '24px 0' }}>
                                {renderDemoElement()}
                            </div>
                            <div style={{ margin: '24px 0' }}>
                                <b>Generated Code:</b>
                                <pre
                                    style={{
                                        background: '#f7f7f7',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: 6,
                                        padding: '12px 16px',
                                        fontFamily: 'monospace',
                                        fontSize: 15,
                                        marginTop: 8,
                                        marginBottom: 8,
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-all'
                                    }}
                                >
                                    {`<button id="myBtn">Click me!</button>
<div id="myDiv" style="padding:16px;border:1px solid #ccc;">Hover me!</div>
<input id="myInput" placeholder="Type here..." />

<script>
document.getElementById('${selectedElement}').addEventListener('${selectedEvent}', () => {
  alert('Event triggered!');
});
</script>`}
                                </pre>
                            </div>
                        </ConceptInfoCard>
                    </Section>
                </Section>

                <Section
                    title="Listening for DOMContentLoaded"
                    subtitle="How to run JavaScript as soon as your HTML is ready"
                >
                    <ConceptInfoCard>
                        <div style={{ marginBottom: 12 }}>
                            Sometimes you want your JavaScript to run as soon as the page&apos;s HTML is loaded, but before images or other resources are finished loading. The <b>DOMContentLoaded</b> event is perfect for this!<br /><br />
                            Think of it as: <i>&quot;Let me know when the basic page structure is ready, so I can safely start working with the elements on the page.&quot;</i>
                            <br /><br />
                            <b>What if you don&apos;t use <code>DOMContentLoaded</code>?</b><br />
                            If you try to run JavaScript that selects or changes elements before the HTML is loaded, your code might not work. For example, <code>document.getElementById(&apos;myBtn&apos;)</code> could return <code>null</code> if the button isn&apos;t in the page yet.
                        </div>
                        
                    </ConceptInfoCard>
                    <CodePartsExplanation
                            code={domContentLoadedCode}
                            parts={domContentLoadedParts}
                        />
                </Section>
                <Section
                    title="Capstone Practice Problem"
                    subtitle='Use what you learned about event handlers to complete this task.'
                >
                    <CapstonePractice
                        requiredCode={["addEventListener"]}
                        prompt={`Below is a sample HTML page. Write JavaScript code that logs "Hello, events!" to the console (using console.log) when the button with id "myBtn" is clicked. Add your event handler code inside the <script> tag.`}
                        correctOutput="Hello, events!"
                        initialCode={`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Event Handler Practice</title>
  </head>
  <body>
    <button id="myBtn">Click me!</button>
    <script>
      // Your JavaScript goes here
    </script>
  </body>
</html>
`}
                    />
                </Section>
                {/* ...end TableOfContents and ConceptWrapper... */}
            </TableOfContents>
        </ConceptWrapper>
    );
}