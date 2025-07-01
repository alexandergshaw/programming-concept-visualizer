import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import StepThroughCodeAnimation from './StepThroughCodeAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer, faCheck, faTimes, faUserCheck, faCodeBranch, faCalculator } from '@fortawesome/free-solid-svg-icons';

const InputValidationExample: React.FC = () => {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleValidation = () => {
        // Clear any previous messages
        setMessage('');

        // Check if the input is a valid number
        if (isNaN(Number(input)) || input.trim() === '') {
            setMessage('Invalid input! Please enter a number.');
            setIsError(true);
        } else {
            setMessage('Success! You entered the number: ' + Number(input));
            setIsError(false);
        }

        // Reset after 3 seconds
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    return (
        <div>
            <p style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 16 }}>
                Let&apos;s learn how to get values from form inputs, validate them, and show feedback messages to the user.
                In this example, we&apos;ll check if the input is a valid number.
            </p>

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
                <iframe loading="lazy" style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    border: 'none',
                    padding: 0,
                    margin: 0
                }}
                    src="https://www.canva.com/design/DAGr4TWw4vk/yfCmm4Qeq59RyrfCA7vphg/watch?embed" allowFullScreen={true} allow="fullscreen">
                </iframe>
            </div>

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

                    <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Enter a number"
                            variant="outlined"
                            size="small"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            fullWidth
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleValidation}
                            style={{ alignSelf: 'flex-start' }}
                        >
                            Validate Number
                        </Button>

                        {message && (
                            <Box sx={{
                                p: 1,
                                bgcolor: isError ? '#ffebee' : '#e8f5e9',
                                border: `1px solid ${isError ? '#f44336' : '#4caf50'}`,
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                color: isError ? '#c62828' : '#2e7d32'
                            }}>
                                <FontAwesomeIcon icon={isError ? faTimes : faCheck} />
                                <Typography>{message}</Typography>
                            </Box>
                        )}
                    </Box>
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
                        First, we need an input field, a button, and a container for our message:
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
                        {`<input type="text" id="numberInput" placeholder="Enter a number">
<button id="submitBtn">Validate Number</button>

<!-- This div will hold our messages -->
<div id="messageContainer"></div>`}
                    </Box>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                        We&apos;ve given each element an ID so we can easily reference it with JavaScript.
                    </Typography>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', mb: 3 }}>
                    <Typography fontWeight={600} gutterBottom>Step 2: Wait for the DOM to be ready</Typography>
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
  console.log("DOM is ready!");
});`}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1 }}>
                        <FontAwesomeIcon icon={faCodeBranch} style={{ fontSize: 20, color: '#1976d2' }} />
                        <Typography variant="body2">
                            <b>What&apos;s happening:</b> We&apos;re telling JavaScript to wait until the webpage is
                            fully loaded before trying to interact with it. This ensures all elements are available.
                        </Typography>
                    </Box>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', mb: 3 }}>
                    <Typography fontWeight={600} gutterBottom>Step 3: Get the elements with JavaScript</Typography>
                    <Typography paragraph sx={{ mb: 2, fontSize: 15 }}>
                        Inside our DOMContentLoaded listener, we get references to our HTML elements:
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
  // Get the input field
  const input = document.getElementById("numberInput");

  // Get the submit button
  const submitBtn = document.getElementById("submitBtn");

  // Get the message container
  const messageContainer = document.getElementById("messageContainer");
});`}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1 }}>
                        <FontAwesomeIcon icon={faHandPointer} style={{ fontSize: 20, color: '#1976d2' }} />
                        <Typography variant="body2">
                            <b>What&apos;s happening:</b> We&apos;re using <code>document.getElementById()</code> to find each element on the page
                            by its unique ID.
                        </Typography>
                    </Box>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', mb: 3 }}>
                    <Typography fontWeight={600} gutterBottom>Step 4: Add an Event Listener to the Button</Typography>
                    <Typography paragraph sx={{ mb: 2, fontSize: 15 }}>
                        Still inside our DOMContentLoaded event, we add a click event listener to the button:
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
  // Get the elements we need
  const input = document.getElementById("numberInput");
  const submitBtn = document.getElementById("submitBtn");
  const messageContainer = document.getElementById("messageContainer");
  
  // Add a click event listener to the button
  submitBtn.addEventListener("click", function() {
    // Code to handle the click will go here
  });
});`}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1 }}>
                        <FontAwesomeIcon icon={faHandPointer} style={{ fontSize: 20, color: '#1976d2' }} />
                        <Typography variant="body2">
                            <b>What&apos;s happening:</b> We&apos;re telling JavaScript to watch for clicks on the button and
                            run some code when that happens.
                        </Typography>
                    </Box>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', mb: 3 }}>
                    <Typography fontWeight={600} gutterBottom>Step 5: Get the Input Value</Typography>
                    <Typography paragraph sx={{ mb: 2, fontSize: 15 }}>
                        Inside the click event listener, we get the value from the input field:
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
  // Get the elements we need
  const input = document.getElementById("numberInput");
  const submitBtn = document.getElementById("submitBtn");
  const messageContainer = document.getElementById("messageContainer");
  
  // Add a click event listener to the button
  submitBtn.addEventListener("click", function() {
    // Get the value from the input field
    const value = input.value;
    
    // Log it to the console to check
    console.log("Input value:", value);
  });
});`}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1 }}>
                        <FontAwesomeIcon icon={faUserCheck} style={{ fontSize: 20, color: '#1976d2' }} />
                        <Typography variant="body2">
                            <b>What&apos;s happening:</b> <code>input.value</code> gives us the text the user typed.
                            Remember that this is always a string, even if the user typed numbers.
                        </Typography>
                    </Box>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', mb: 3 }}>
                    <Typography fontWeight={600} gutterBottom>Step 6: Validate if the Input is a Number</Typography>
                    <Typography paragraph sx={{ mb: 2, fontSize: 15 }}>
                        Now we check if the input can be converted to a valid number:
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
  // Get the elements we need
  const input = document.getElementById("numberInput");
  const submitBtn = document.getElementById("submitBtn");
  const messageContainer = document.getElementById("messageContainer");
  
  // Add a click event listener to the button
  submitBtn.addEventListener("click", function() {
    // Get the value from the input field
    const value = input.value;
    
    // Check if the value is a number
    if (isNaN(Number(value)) || value.trim() === "") {
      // Handle invalid input
      console.log("Not a number!");
    } else {
      // Handle valid input
      console.log("Valid number:", Number(value));
    }
  });
});`}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#fff8e1', p: 2, borderRadius: 1 }}>
                        <FontAwesomeIcon icon={faCalculator} style={{ fontSize: 20, color: '#ff9800' }} />
                        <Typography variant="body2">
                            <b>What&apos;s happening:</b> We&apos;re using two checks here:
                            <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
                                <li><code>isNaN(Number(value))</code> checks if the value is &quot;Not a Number&quot;</li>
                                <li><code>value.trim() === &quot;&quot;</code> checks if the input is empty or just spaces</li>
                            </ul>
                            If either condition is true, the input is invalid.
                        </Typography>
                    </Box>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', mb: 3 }}>
                    <Typography fontWeight={600} gutterBottom>Step 7: Create and Display a Message</Typography>
                    <Typography paragraph sx={{ mb: 2, fontSize: 15 }}>
                        Finally, we create and display either an error or success message:
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
  // Get the elements we need
  const input = document.getElementById("numberInput");
  const submitBtn = document.getElementById("submitBtn");
  const messageContainer = document.getElementById("messageContainer");
  
  // Add a click event listener to the button
  submitBtn.addEventListener("click", function() {
    // Get the value from the input field
    const value = input.value;
    
    // Clear any previous messages
    messageContainer.innerHTML = "";
    
    // Create a new div for our message
    const messageDiv = document.createElement("div");
    
    // Check if the value is a number
    if (isNaN(Number(value)) || value.trim() === "") {
      // Style for error message
      messageDiv.style.color = "red";
      messageDiv.style.border = "1px solid red";
      messageDiv.style.padding = "10px";
      messageDiv.textContent = "Invalid input! Please enter a number.";
    } else {
      // Style for success message
      messageDiv.style.color = "green";
      messageDiv.style.border = "1px solid green";
      messageDiv.style.padding = "10px";
      messageDiv.textContent = "Success! You entered the number: " + Number(value);
    }
    
    // Add the message to the page
    messageContainer.appendChild(messageDiv);
  });
});`}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e8f5e9', p: 2, borderRadius: 1 }}>
                        <FontAwesomeIcon icon={faCheck} style={{ fontSize: 20, color: '#4caf50' }} />
                        <Typography variant="body2">
                            <b>What&apos;s happening:</b> Based on our validation, we create and style a message element.
                            If it&apos;s a valid number, we convert the string to a number with <code>Number(value)</code> and
                            show it in the success message. Then we add the message element to the page.
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
                            '  // Get the elements we need',
                            '  const input = document.getElementById("numberInput");',
                            '  const submitBtn = document.getElementById("submitBtn");',
                            '  const messageContainer = document.getElementById("messageContainer");',
                            '',
                            '  // Add event listener to the button',
                            '  submitBtn.addEventListener("click", function() {',
                            '    // Get value from input',
                            '    const value = input.value;',
                            '',
                            '    // Clear any previous messages',
                            '    messageContainer.innerHTML = "";',
                            '',
                            '    // Create a new div for our message',
                            '    const messageDiv = document.createElement("div");',
                            '',
                            '    // Check if the value is a number',
                            '    if (isNaN(Number(value)) || value.trim() === "") {',
                            '      // Style for error message',
                            '      messageDiv.style.color = "red";',
                            '      messageDiv.style.border = "1px solid red";',
                            '      messageDiv.style.padding = "10px";',
                            '      messageDiv.textContent = "Invalid input! Please enter a number.";',
                            '    } else {',
                            '      // Style for success message',
                            '      messageDiv.style.color = "green";',
                            '      messageDiv.style.border = "1px solid green";',
                            '      messageDiv.style.padding = "10px";',
                            '      messageDiv.textContent = "Success! You entered the number: " + Number(value);',
                            '    }',
                            '',
                            '    // Add the message to the page',
                            '    messageContainer.appendChild(messageDiv);',
                            '  });',
                            '});'
                        ]}
                        steps={[
                            {
                                label: 'Wait for DOM',
                                desc: 'We wait for the HTML document to be fully loaded before running our code.',
                                highlight: 'document.addEventListener("DOMContentLoaded", function() {',
                            },
                            {
                                label: 'Get the Elements',
                                desc: 'We use <b>document.getElementById()</b> to get our HTML elements.',
                                highlight: 'const input = document.getElementById("numberInput");',
                            },
                            {
                                label: 'Add Event Listener',
                                desc: 'We add a <b>click</b> event listener to the submit button.',
                                highlight: 'submitBtn.addEventListener("click", function() {',
                            },
                            {
                                label: 'Get Value',
                                desc: 'When the button is clicked, we get the value from the input.',
                                highlight: 'const value = input.value;',
                            },
                            {
                                label: 'Clear Previous',
                                desc: 'We clear any previous messages before adding new ones.',
                                highlight: 'messageContainer.innerHTML = "";',
                            },
                            {
                                label: 'Create Element',
                                desc: 'We create a new <b>div</b> element to hold our message.',
                                highlight: 'const messageDiv = document.createElement("div");',
                            },
                            {
                                label: 'Validate Number',
                                desc: 'We check if the value is a valid number using <b>isNaN()</b> and also check if it\'s empty.',
                                highlight: 'if (isNaN(Number(value)) || value.trim() === "") {',
                            },
                            {
                                label: 'Style Message',
                                desc: 'We style the message based on whether the input is a valid number.',
                                highlight: 'messageDiv.style.color = "red";',
                            },
                            {
                                label: 'Set Content',
                                desc: 'We set the text content of our message, showing the number if valid.',
                                highlight: 'messageDiv.textContent = "Success! You entered the number: " + Number(value);',
                            },
                            {
                                label: 'Add to Page',
                                desc: 'Finally, we add our message to the page with <b>appendChild</b>.',
                                highlight: 'messageContainer.appendChild(messageDiv);',
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
                        <b>Only using isNaN():</b> Without checking for empty strings, <code>isNaN(&quot;&quot;)</code> will return
                        <code>false</code> because an empty string converts to <code>0</code> in JavaScript
                    </li>
                    <li style={{ marginBottom: 8 }}>
                        <b>Forgetting to trim():</b> Users might enter spaces before or after a number, so it&apos;s good practice
                        to use <code>trim()</code> to remove whitespace
                    </li>
                    <li style={{ marginBottom: 8 }}>
                        <b>Not converting to Number:</b> Remember that <code>input.value</code> is always a string, even when the
                        user types numbers. Use <code>Number()</code> to convert it
                    </li>
                    <li style={{ marginBottom: 8 }}>
                        <b>Confusing NaN behaviors:</b> Remember that <code>NaN !== NaN</code> in JavaScript, which is why we use
                        <code>isNaN()</code> to check
                    </li>
                    <li>
                        <b>Ignoring input types:</b> In a real application, consider using <code>&lt;input type=&quot;number&quot;&gt;</code>
                        for better mobile keyboard support
                    </li>
                </ul>
            </ConceptInfoCard>
        </div>
    );
};

export default InputValidationExample;