import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import StepThroughCodeAnimation from './StepThroughCodeAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer, faCheck, faCodeBranch, faRadio, faDotCircle } from '@fortawesome/free-solid-svg-icons';

const RadioButtonExample: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [message, setMessage] = useState('');
    
    const handleCheck = () => {
        if (selectedOption) {
            setMessage(`You selected: ${selectedOption}`);
        } else {
            setMessage('Please select an option first');
        }
        
        // Reset after 3 seconds
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    return (
        <div>
            <p style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 16 }}>
                Let&apos;s learn how to use JavaScript to check which radio button is selected. 
                Radio buttons are useful when users need to select a single option from a list of choices.
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
                    
                    <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography fontWeight={500} gutterBottom>Select your favorite pet:</Typography>
                        <RadioGroup
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}
                        >
                            <FormControlLabel value="dog" control={<Radio />} label="Dog" />
                            <FormControlLabel value="cat" control={<Radio />} label="Cat" />
                            <FormControlLabel value="fish" control={<Radio />} label="Fish" />
                            <FormControlLabel value="bird" control={<Radio />} label="Bird" />
                        </RadioGroup>
                        
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={handleCheck}
                            style={{ alignSelf: 'flex-start' }}
                        >
                            Check Selection
                        </Button>
                        
                        {message && (
                            <Box sx={{ 
                                p: 1, 
                                bgcolor: '#e3f2fd', 
                                border: '1px solid #90caf9',
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                color: '#0d47a1'
                            }}>
                                <FontAwesomeIcon icon={faCheck} />
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
                        First, we need to create a group of radio buttons and a button to check the selection:
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
                        {`<h3>Select your favorite pet:</h3>

<div>
  <input type="radio" id="dog" name="pet" value="dog">
  <label for="dog">Dog</label>
</div>

<div>
  <input type="radio" id="cat" name="pet" value="cat">
  <label for="cat">Cat</label>
</div>

<div>
  <input type="radio" id="fish" name="pet" value="fish">
  <label for="fish">Fish</label>
</div>

<div>
  <input type="radio" id="bird" name="pet" value="bird">
  <label for="bird">Bird</label>
</div>

<button id="checkButton">Check Selection</button>

<!-- This div will show the result -->
<div id="result"></div>`}
                    </Box>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                        Note how all radio buttons share the same <code>name=&quot;pet&quot;</code> attribute. This creates a group
                        where only one option can be selected at a time.
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
                            <b>What&apos;s happening:</b> We&apos;re ensuring our JavaScript only runs after all HTML elements have
                            been loaded and are ready to be accessed.
                        </Typography>
                    </Box>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', mb: 3 }}>
                    <Typography fontWeight={600} gutterBottom>Step 3: Get the elements with JavaScript</Typography>
                    <Typography paragraph sx={{ mb: 2, fontSize: 15 }}>
                        Inside our DOMContentLoaded event, we get references to our HTML elements:
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
  // Get all radio buttons with name="pet"
  const radioButtons = document.querySelectorAll('input[name="pet"]');
  
  // Get the check button
  const checkButton = document.getElementById("checkButton");
  
  // Get the result container
  const resultDiv = document.getElementById("result");
});`}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1 }}>
                        <FontAwesomeIcon icon={faRadio} style={{ fontSize: 20, color: '#1976d2' }} />
                        <Typography variant="body2">
                            <b>What&apos;s happening:</b> We&apos;re using <code>document.querySelectorAll()</code> to get all radio buttons
                            with the name &quot;pet&quot;. This returns a collection of elements rather than a single element.
                        </Typography>
                    </Box>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', mb: 3 }}>
                    <Typography fontWeight={600} gutterBottom>Step 4: Add an Event Listener to the Button</Typography>
                    <Typography paragraph sx={{ mb: 2, fontSize: 15 }}>
                        Next, we add a click event listener to the button to check which radio button is selected:
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
  // Get all radio buttons with name="pet"
  const radioButtons = document.querySelectorAll('input[name="pet"]');
  
  // Get the check button
  const checkButton = document.getElementById("checkButton");
  
  // Get the result container
  const resultDiv = document.getElementById("result");
  
  // Add event listener to the button
  checkButton.addEventListener("click", function() {
    // We'll add code to check selected radio button here
  });
});`}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1 }}>
                        <FontAwesomeIcon icon={faHandPointer} style={{ fontSize: 20, color: '#1976d2' }} />
                        <Typography variant="body2">
                            <b>What&apos;s happening:</b> We&apos;re setting up an event listener that will run our code
                            whenever the button is clicked.
                        </Typography>
                    </Box>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', mb: 3 }}>
                    <Typography fontWeight={600} gutterBottom>Step 5: Find the Selected Radio Button</Typography>
                    <Typography paragraph sx={{ mb: 2, fontSize: 15 }}>
                        Now let&apos;s write the code that finds which radio button is checked:
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
  // Get all radio buttons with name="pet"
  const radioButtons = document.querySelectorAll('input[name="pet"]');
  
  // Get the check button
  const checkButton = document.getElementById("checkButton");
  
  // Get the result container
  const resultDiv = document.getElementById("result");
  
  // Add event listener to the button
  checkButton.addEventListener("click", function() {
    // Variable to store the selected value
    let selectedValue = '';
    
    // Loop through all radio buttons
    for (const radioButton of radioButtons) {
      // Check if this radio button is checked
      if (radioButton.checked) {
        selectedValue = radioButton.value;
        // No need to continue the loop once we found the checked one
        break;
      }
    }
    
    // Show the result
    if (selectedValue) {
      console.log("Selected value:", selectedValue);
    } else {
      console.log("No option selected");
    }
  });
});`}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#fff8e1', p: 2, borderRadius: 1 }}>
                        <FontAwesomeIcon icon={faDotCircle} style={{ fontSize: 20, color: '#ff9800' }} />
                        <Typography variant="body2">
                            <b>What&apos;s happening:</b> We loop through all the radio buttons using a <code>for...of</code> loop, 
                            checking each one to see if its <code>checked</code> property is true. When we find the checked radio button,
                            we store its value and exit the loop with <code>break</code>.
                        </Typography>
                    </Box>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', mb: 3 }}>
                    <Typography fontWeight={600} gutterBottom>Step 6: Display the Selected Value</Typography>
                    <Typography paragraph sx={{ mb: 2, fontSize: 15 }}>
                        Finally, let&apos;s update the page to show which option was selected:
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
  // Get all radio buttons with name="pet"
  const radioButtons = document.querySelectorAll('input[name="pet"]');
  
  // Get the check button
  const checkButton = document.getElementById("checkButton");
  
  // Get the result container
  const resultDiv = document.getElementById("result");
  
  // Add event listener to the button
  checkButton.addEventListener("click", function() {
    // Clear previous results
    resultDiv.innerHTML = "";
    
    // Variable to store the selected value
    let selectedValue = '';
    
    // Loop through all radio buttons
    for (const radioButton of radioButtons) {
      // Check if this radio button is checked
      if (radioButton.checked) {
        selectedValue = radioButton.value;
        break;
      }
    }
    
    // Create result message
    const message = document.createElement("p");
    
    // Display appropriate message based on selection
    if (selectedValue) {
      message.textContent = "You selected: " + selectedValue;
      message.style.color = "#2196f3";
      message.style.fontWeight = "bold";
    } else {
      message.textContent = "Please select an option first";
      message.style.color = "#f44336";
    }
    
    // Add the message to the page
    resultDiv.appendChild(message);
  });
});`}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e8f5e9', p: 2, borderRadius: 1 }}>
                        <FontAwesomeIcon icon={faCheck} style={{ fontSize: 20, color: '#4caf50' }} />
                        <Typography variant="body2">
                            <b>What&apos;s happening:</b> We create a new paragraph element to display our message, style it 
                            according to whether an option was selected, and add it to the page. We also clear any previous 
                            messages by setting <code>innerHTML = &quot;&quot;</code> before creating the new message.
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
                            '  // Get all radio buttons with name="pet"',
                            '  const radioButtons = document.querySelectorAll(\'input[name="pet"]\');',
                            '  ',
                            '  // Get the check button',
                            '  const checkButton = document.getElementById("checkButton");',
                            '  ',
                            '  // Get the result container',
                            '  const resultDiv = document.getElementById("result");',
                            '  ',
                            '  // Add event listener to the button',
                            '  checkButton.addEventListener("click", function() {',
                            '    // Clear previous results',
                            '    resultDiv.innerHTML = "";',
                            '    ',
                            '    // Variable to store the selected value',
                            '    let selectedValue = \'\';',
                            '    ',
                            '    // Loop through all radio buttons',
                            '    for (const radioButton of radioButtons) {',
                            '      // Check if this radio button is checked',
                            '      if (radioButton.checked) {',
                            '        selectedValue = radioButton.value;',
                            '        break;',
                            '      }',
                            '    }',
                            '    ',
                            '    // Create result message',
                            '    const message = document.createElement("p");',
                            '    ',
                            '    // Display appropriate message based on selection',
                            '    if (selectedValue) {',
                            '      message.textContent = "You selected: " + selectedValue;',
                            '      message.style.color = "#2196f3";',
                            '      message.style.fontWeight = "bold";',
                            '    } else {',
                            '      message.textContent = "Please select an option first";',
                            '      message.style.color = "#f44336";',
                            '    }',
                            '    ',
                            '    // Add the message to the page',
                            '    resultDiv.appendChild(message);',
                            '  });',
                            '});'
                        ]}
                        steps={[
                            {
                                label: 'Wait for DOM',
                                desc: 'We wait for the HTML document to be fully loaded before running our code.',
                                highlight: 'document.addEventListener("DOMContentLoaded", function() {'
                            },
                            {
                                label: 'Get Radio Buttons',
                                desc: 'We use <b>querySelectorAll</b> to get all radio buttons with the name "pet".',
                                highlight: 'const radioButtons = document.querySelectorAll(\'input[name="pet"]\');'
                            },
                            {
                                label: 'Get Other Elements',
                                desc: 'We get the button and result container elements by their IDs.',
                                highlight: 'const checkButton = document.getElementById("checkButton");'
                            },
                            {
                                label: 'Add Event Listener',
                                desc: 'We add a <b>click</b> event listener to the check button.',
                                highlight: 'checkButton.addEventListener("click", function() {'
                            },
                            {
                                label: 'Clear Previous Results',
                                desc: 'We clear any previous results to avoid multiple messages.',
                                highlight: 'resultDiv.innerHTML = "";'
                            },
                            {
                                label: 'Loop Through Radio Buttons',
                                desc: 'We loop through each radio button to find which one is checked.',
                                highlight: 'for (const radioButton of radioButtons) {'
                            },
                            {
                                label: 'Check Selection',
                                desc: 'We check if the current radio button in the loop is checked.',
                                highlight: 'if (radioButton.checked) {'
                            },
                            {
                                label: 'Get Selected Value',
                                desc: 'We store the value of the checked radio button.',
                                highlight: 'selectedValue = radioButton.value;'
                            },
                            {
                                label: 'Create Message',
                                desc: 'We create a paragraph element for our message.',
                                highlight: 'const message = document.createElement("p");'
                            },
                            {
                                label: 'Set Message Content',
                                desc: 'We set the message text based on whether an option was selected.',
                                highlight: 'message.textContent = "You selected: " + selectedValue;'
                            },
                            {
                                label: 'Add to Page',
                                desc: 'Finally, we add our message to the page.',
                                highlight: 'resultDiv.appendChild(message);'
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
                        <b>Missing name attribute:</b> All radio buttons in a group must share the same <code>name</code> attribute 
                        for the browser to treat them as a single group where only one can be selected
                    </li>
                    <li style={{ marginBottom: 8 }}>
                        <b>Forgetting to check if a selection exists:</b> Always check if <code>selectedRadio</code> exists before 
                        trying to access its <code>value</code> property
                    </li>
                    <li style={{ marginBottom: 8 }}>
                        <b>Using getElementById for groups:</b> You can&apos;t use <code>getElementById</code> to get multiple elements; 
                        use <code>querySelectorAll</code> or <code>getElementsByName</code> instead
                    </li>
                    <li>
                        <b>Not using proper CSS selectors:</b> When using <code>querySelector</code> with the <code>:checked</code> 
                        pseudo-class, make sure your selector is correctly formatted
                    </li>
                </ul>
            </ConceptInfoCard>
        </div>
    );
};

export default RadioButtonExample;