'use client';

import React, { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';

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
            part: `<button id="myBtn">Click me!</button>`,
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
                <button
                    id="myBtn"
                    onClick={selectedEvent === 'click' ? handleDemo : undefined}
                    onMouseEnter={selectedEvent === 'mouseenter' ? handleDemo : undefined}
                    onDoubleClick={selectedEvent === 'dblclick' ? handleDemo : undefined}
                    style={{
                        padding: '10px 24px',
                        fontSize: 16,
                        borderRadius: 6,
                        border: '1.5px solid #1976d2',
                        background: '#1976d2',
                        color: '#fff',
                        cursor: 'pointer',
                        marginRight: 8
                    }}
                >
                    Button
                </button>
            );
        }
        if (selectedElement === 'myDiv') {
            return (
                <div
                    id="myDiv"
                    onClick={selectedEvent === 'click' ? handleDemo : undefined}
                    onMouseEnter={selectedEvent === 'mouseenter' ? handleDemo : undefined}
                    onDoubleClick={selectedEvent === 'dblclick' ? handleDemo : undefined}
                    style={{
                        padding: 16,
                        border: '1.5px solid #1976d2',
                        borderRadius: 6,
                        background: '#f3f6fa',
                        color: '#222',
                        display: 'inline-block',
                        minWidth: 120,
                        cursor: selectedEvent === 'click' ? 'pointer' : 'default'
                    }}
                >
                    div
                </div>
            );
        }
        if (selectedElement === 'myInput') {
            return (
                <input
                    id="myInput"
                    onClick={selectedEvent === 'click' ? handleDemo : undefined}
                    onMouseEnter={selectedEvent === 'mouseenter' ? handleDemo : undefined}
                    onDoubleClick={selectedEvent === 'dblclick' ? handleDemo : undefined}
                    placeholder="Input"
                    style={{
                        padding: '8px 12px',
                        fontSize: 16,
                        borderRadius: 6,
                        border: '1.5px solid #1976d2',
                        marginRight: 8
                    }}
                />
            );
        }
        return null;
    };

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
                </Section>
                <Section
                    title="Interactive Event Handler Demo"
                    subtitle="Try different combinations of events and elements to see how event handlers work."
                >
                    <ConceptInfoCard>
                        <div style={{ marginBottom: 12 }}>
                            <label>
                                <b>Event:</b>{' '}
                                <select
                                    value={selectedEvent}
                                    onChange={e => setSelectedEvent(e.target.value)}
                                    style={{ marginRight: 16, fontSize: 15, padding: '4px 8px' }}
                            >
                                {eventOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            <b>Element:</b>{' '}
                            <select
                                value={selectedElement}
                                onChange={e => setSelectedElement(e.target.value)}
                                style={{ fontSize: 15, padding: '4px 8px' }}
                            >
                                {elementOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </label>
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
            <Section
                title="Listening for DOMContentLoaded"
                subtitle="How to run JavaScript as soon as your HTML is ready"
            >
                <ConceptInfoCard>
                    <div style={{ marginBottom: 12 }}>
                        Sometimes you want your JavaScript to run as soon as the page's HTML is loaded, but before images or other resources are finished loading. The <b>DOMContentLoaded</b> event is perfect for this!<br /><br />
                        Think of it as: <i>"Let me know when the basic page structure is ready, so I can safely start working with the elements on the page."</i>
                        <br /><br />
                        <b>What if you don't use <code>DOMContentLoaded</code>?</b><br />
                        If you try to run JavaScript that selects or changes elements before the HTML is loaded, your code might not work. For example, <code>document.getElementById('myBtn')</code> could return <code>null</code> if the button isn't in the page yet. This can cause errors or nothing to happen at all. Using <code>DOMContentLoaded</code> makes sure your code waits until the HTML is ready.
                    </div>
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
                    >{`
document.addEventListener('DOMContentLoaded', () => {
  // This code runs as soon as the HTML is loaded and ready
  alert('DOM fully loaded and parsed!');
});
                    `.trim()}</pre>
                    <div style={{ fontSize: 14, color: '#555' }}>
                        <b>Tip:</b> Use <code>DOMContentLoaded</code> if you want to safely select or change elements on the page right after the HTML loads, without waiting for images or other files.
                    </div>
                </ConceptInfoCard>
            </Section>
            {/* ...end TableOfContents and ConceptWrapper... */}
        </TableOfContents>
    </ConceptWrapper>
    );
}