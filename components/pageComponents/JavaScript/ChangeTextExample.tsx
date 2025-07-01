import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import StepThroughCodeAnimation from './StepThroughCodeAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer, faEdit, faCodeBranch } from '@fortawesome/free-solid-svg-icons';

const ChangeTextExample: React.FC = () => {
    return (
        <div>
            <p style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 16 }}>
                Let&apos;s learn how to change text on a webpage when a button is clicked. This is one of the most basic
                and useful things you can do with JavaScript!
            </p>

            {/* Visual demo of what we're building */}
            <ConceptInfoCard>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    What We&apos;re Building:
                </Typography>

                <Box sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    p: 2,
                    mb: 2,
                    bgcolor: '#fafafa',
                    position: 'relative'
                }}>
                    <Box sx={{ fontSize: 12, position: 'absolute', right: 8, top: 4, color: '#666' }}>
                        Preview
                    </Box>
                    <Typography paragraph id="demoText" sx={{ mb: 2 }}>
                        This text will change when you click the button.
                    </Typography>
                    <button
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#1976d2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            const text = document.getElementById('demoText');
                            if (text) {
                                text.textContent = "Hello! The text has changed!";

                                // Reset after 2 seconds
                                setTimeout(() => {
                                    text.textContent = "This text will change when you click the button.";
                                }, 2000);
                            }
                        }}
                    >
                        Click to Change Text
                    </button>
                </Box>
            </ConceptInfoCard>

            {/* Step-by-step explanation */}
            <Box sx={{ mt: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    How It Works: Step-by-Step
                </Typography>

                <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', mb: 3 }}>
                    <Typography fontWeight={600} gutterBottom>Step 1: Create your HTML</Typography>
                    <Typography paragraph sx={{ mb: 2, fontSize: 15 }}>
                        First, we need a paragraph of text and a button on our webpage:
                    </Typography>
                    <Box sx={{
                        bgcolor: '#f5f5f5',
                        p: 2,
                        borderRadius: 1,
                        fontFamily: 'monospace',
                        fontSize: 14,
                        whiteSpace: 'pre-wrap',
                        mb: 2
                    }}>
                        {`<p id="myText">This is some text that will change.</p>
<button id="changeButton">Click to Change Text</button>`}
                    </Box>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                        The <code>id=&apos;myText&apos;</code> and <code>id=&apos;changeButton&apos;</code> are like name tags that help
                        JavaScript find these elements later.
                    </Typography>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', mb: 3 }}>
                    <Typography fontWeight={600} gutterBottom>Step 2: Wait for the page to load</Typography>
                    <Typography paragraph sx={{ mb: 2, fontSize: 15 }}>
                        Before we can access HTML elements, we need to make sure the page is fully loaded:
                    </Typography>
                    <Box sx={{
                        bgcolor: '#f5f5f5',
                        p: 2,
                        borderRadius: 1,
                        fontFamily: 'monospace',
                        fontSize: 14,
                        whiteSpace: 'pre-wrap',
                        mb: 2
                    }}>
                        {`// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // All our code will go inside this function
  console.log("Page is ready!");
});`}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1 }}>
                        <FontAwesomeIcon icon={faCodeBranch} style={{ fontSize: 20, color: '#1976d2' }} />
                        <Typography variant="body2">
                            <b>What&apos;s happening:</b> The <code>DOMContentLoaded</code> event ensures our code only runs after
                            the HTML has fully loaded. It&apos;s like waiting for all the furniture to be delivered before
                            trying to rearrange the room.
                        </Typography>
                    </Box>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', mb: 3 }}>
                    <Typography fontWeight={600} gutterBottom>Step 3: Get the elements with JavaScript</Typography>
                    <Typography paragraph sx={{ mb: 2, fontSize: 15 }}>
                        Now we need to connect JavaScript to these HTML elements:
                    </Typography>
                    <Box sx={{
                        bgcolor: '#f5f5f5',
                        p: 2,
                        borderRadius: 1,
                        fontFamily: 'monospace',
                        fontSize: 14,
                        whiteSpace: 'pre-wrap',
                        mb: 2
                    }}>
                        {`document.addEventListener("DOMContentLoaded", function() {
  // Get the paragraph element
  const textElement = document.getElementById("myText");

  // Get the button element
  const button = document.getElementById("changeButton");
});`}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
                        <FontAwesomeIcon icon={faHandPointer} style={{ fontSize: 20, color: '#1976d2' }} />
                        <Typography variant="body2">
                            <b>What&apos;s happening:</b> We&apos;re finding our HTML elements using their IDs. We put this inside
                            the <code>DOMContentLoaded</code> event to make sure the elements exist before we try to find them.
                        </Typography>
                    </Box>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', mb: 3 }}>
                    <Typography fontWeight={600} gutterBottom>Step 4: Add an Event Listener</Typography>
                    <Typography paragraph sx={{ mb: 2, fontSize: 15 }}>
                        Now we add a &quot;listener&quot; to the button that waits for clicks:
                    </Typography>
                    <Box sx={{
                        bgcolor: '#f5f5f5',
                        p: 2,
                        borderRadius: 1,
                        fontFamily: 'monospace',
                        fontSize: 14,
                        whiteSpace: 'pre-wrap',
                        mb: 2
                    }}>
                        {`document.addEventListener("DOMContentLoaded", function() {
  // Get the elements
  const textElement = document.getElementById("myText");
  const button = document.getElementById("changeButton");

  // Add a click event listener to the button
  button.addEventListener("click", function() {
    // Code inside here will run when the button is clicked
  });
});`}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1 }}>
                        <FontAwesomeIcon icon={faHandPointer} style={{ fontSize: 20, color: '#1976d2' }} />
                        <Typography variant="body2">
                            <b>What&apos;s happening:</b> The <code>addEventListener</code> is like setting up a security camera
                            that&apos;s specifically watching for someone to click the button. Notice we&apos;re still inside the DOMContentLoaded event.
                        </Typography>
                    </Box>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', mb: 3 }}>
                    <Typography fontWeight={600} gutterBottom>Step 5: Change the text when clicked</Typography>
                    <Typography paragraph sx={{ mb: 2, fontSize: 15 }}>
                        Finally, we add the code to change the text inside the event listener:
                    </Typography>
                    <Box sx={{
                        bgcolor: '#f5f5f5',
                        p: 2,
                        borderRadius: 1,
                        fontFamily: 'monospace',
                        fontSize: 14,
                        whiteSpace: 'pre-wrap',
                        mb: 2
                    }}>
                        {`document.addEventListener("DOMContentLoaded", function() {
  // Get the elements
  const textElement = document.getElementById("myText");
  const button = document.getElementById("changeButton");

  // Add a click event listener to the button
  button.addEventListener("click", function() {
    // Change the text content
    textElement.textContent = "Hello! The text has changed!";
  });
});`}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e8f5e9', p: 2, borderRadius: 1 }}>
                        <FontAwesomeIcon icon={faEdit} style={{ fontSize: 20, color: '#4caf50' }} />
                        <Typography variant="body2">
                            <b>What's happening:</b> <code>textElement.textContent</code> is like an eraser and pencil -
                            it erases the old text and writes in new text. All of this happens when the button is clicked,
                            and only after the page has fully loaded.
                        </Typography>
                    </Box>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', mb: 3 }}>
                    <Typography fontWeight={600} gutterBottom>Complete Code</Typography>
                    <Typography paragraph sx={{ mb: 2, fontSize: 15 }}>
                        Here&apos;s the full JavaScript code:
                    </Typography>
                    <StepThroughCodeAnimation
                        code={[
                            '// Wait for the DOM to be fully loaded',
                            'document.addEventListener("DOMContentLoaded", function() {',
                            '  // Step 1: Get the elements we need',
                            '  const textElement = document.getElementById("myText");',
                            '  const button = document.getElementById("changeButton");',
                            '',
                            '  // Step 2: Add an event listener to the button',
                            '  button.addEventListener("click", function() {',
                            '    // Step 3: Change the text when button is clicked',
                            '    textElement.textContent = "Hello! The text has changed!";',
                            '  });',
                            '});'
                        ]}
                        steps={[
                            {
                                label: 'Wait for DOM',
                                desc: "Wait for the document to be fully loaded before running our code.",
                                highlight: 'document.addEventListener("DOMContentLoaded", function() {'
                            },
                            {
                                label: 'Get Text Element',
                                desc: "Get the paragraph element by its ID.",
                                highlight: 'const textElement = document.getElementById("myText");'
                            },
                            {
                                label: 'Get Button Element',
                                desc: "Get the button element by its ID.",
                                highlight: 'const button = document.getElementById("changeButton");'
                            },
                            {
                                label: 'Add Event Listener',
                                desc: "Add a click event listener to the button.",
                                highlight: 'button.addEventListener("click", function() {'
                            },
                            {
                                label: 'Change Text Content',
                                desc: "Change the text content when the button is clicked.",
                                highlight: 'textContent = "Hello! The text has changed!";'
                            }
                        ]}
                    />
                </Paper>
            </Box>

            {/* Common mistakes and tips */}
            <ConceptInfoCard style={{ marginTop: 24 }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Common Mistakes to Avoid
                </Typography>
                <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
                    <li style={{ marginBottom: 8 }}>
                        <b>Wrong ID:</b> Double-check your HTML IDs match exactly what&apos;s in your JavaScript
                        (capitalization matters!)
                    </li>
                    <li style={{ marginBottom: 8 }}>
                        <b>Forgetting DOMContentLoaded:</b> Without the <code>DOMContentLoaded</code> event, your code might
                        run before the HTML elements exist, causing errors
                    </li>
                    <li>
                        <b>Using innerHTML:</b> <code>textContent</code> is safer than <code>innerHTML</code> when you just want to change text
                    </li>
                </ul>
            </ConceptInfoCard>
        </div>
    );
};

export default ChangeTextExample;