import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import CalloutBox from '@/components/common/CalloutBox';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TryBlockExample: React.FC = () => {
  // Code parts for highlighting different sections
  const codeParts: CodePart[] = [
    {
      label: 'Function Declaration',
      part: 'function processText(input)',
      color: '#e91e63',
      desc: 'Function that processes text input - might fail if input is not a string'
    },
    {
      label: 'Try Block',
      part: 'try',
      color: '#4caf50',
      desc: 'Try block contains risky code that might throw errors'
    },
    {
      label: 'Log Start',
      part: 'console.log("Processing:", input);',
      color: '#2196f3',
      desc: 'Log what we are trying to process'
    },
    {
      label: 'Text Processing',
      part: 'let result = input.toUpperCase().trim();',
      color: '#ff9800',
      desc: 'Attempt to convert text to uppercase and trim whitespace - fails if input is not a string'
    },
    {
      label: 'Length Check',
      part: 'if (result.length === 0)',
      color: '#9c27b0',
      desc: 'Check if the processed text is empty'
    },
    {
      label: 'Throw Custom Error',
      part: 'throw new Error("Empty text not allowed");',
      color: '#795548',
      desc: 'Manually throw an error for empty strings'
    },
    {
      label: 'Success Return',
      part: 'return "SUCCESS: " + result;',
      color: '#607d8b',
      desc: 'Return processed text if no errors occurred'
    },
    {
      label: 'Catch Block',
      part: 'catch (error)',
      color: '#f44336',
      desc: 'Handles any errors thrown in the try block'
    }
  ];

  // Template for generating executable code
  const codeTemplate = (inputs: Record<string, string | number>) => {
    let inputValue: any = inputs.inputValue;
    if (inputValue === 'null') inputValue = null;
    if (inputValue === 'true') inputValue = true;
    
    return [`function processText(input) {
  try {
    console.log("Processing:", input);
    let result = input.toUpperCase().trim();
    
    if (result.length === 0) {
      throw new Error("Empty text not allowed");
    }
    
    console.log("Text processed successfully:", result);
    return "SUCCESS: " + result;
  } catch (error) {
    console.log("Processing failed:", error.message);
    return "ERROR: " + error.message;
  }
}

// Test the function
const result = processText(${JSON.stringify(inputValue)});
console.log("Final result:", result);`];
  };

  // Template for generating step-by-step explanation
  const stepsTemplate = (inputs: Record<string, string | number>) => {
    let inputValue: any = inputs.inputValue;
    if (inputValue === 'null') inputValue = null;
    if (inputValue === 'true') inputValue = true;
    
    const steps: Step[] = [
      {
        label: "Function Call",
        desc: `processText(${JSON.stringify(inputValue)}) called`,
        highlight: 'function processText(input)'
      },
      {
        label: "Try Block Starts",
        desc: "Try block begins - attempting risky text processing",
        highlight: 'try'
      },
      {
        label: "Log Processing",
        desc: `Log: "Processing: ${JSON.stringify(inputValue)}"`,
        highlight: 'console.log("Processing:", input);'
      }
    ];

    // Determine what will happen based on input type and value
    let willFailAtProcessing = false;
    let willFailAtEmptyCheck = false;
    let errorMessage = "";
    let processedResult = "";

    if (typeof inputValue !== 'string') {
      willFailAtProcessing = true;
      if (inputValue === null) {
        errorMessage = "Cannot read properties of null (reading 'toUpperCase')";
      } else if (inputValue === undefined) {
        errorMessage = "Cannot read properties of undefined (reading 'toUpperCase')";
      } else {
        errorMessage = `${inputValue}.toUpperCase is not a function`;
      }
    } else {
      processedResult = inputValue.toUpperCase().trim();
      if (processedResult.length === 0) {
        willFailAtEmptyCheck = true;
        errorMessage = "Empty text not allowed";
      }
    }

    if (willFailAtProcessing) {
      // Fail at text processing step
      steps.push(
        {
          label: "Processing Fails",
          desc: `toUpperCase() fails - input is ${typeof inputValue}, not a string`,
          highlight: 'let result = input.toUpperCase().trim();'
        },
        {
          label: "Error Thrown",
          desc: `Automatic error: "${errorMessage}"`,
          highlight: 'let result = input.toUpperCase().trim();'
        },
        {
          label: "Jump to Catch",
          desc: "Error thrown - execution jumps to catch block",
          highlight: 'catch (error)'
        },
        {
          label: "Log Error",
          desc: `Log: "Processing failed: ${errorMessage}"`,
          highlight: 'console.log("Processing failed:", error.message);'
        },
        {
          label: "Return Error",
          desc: `Return: "ERROR: ${errorMessage}"`,
          highlight: 'return "ERROR: " + error.message;'
        }
      );
    } else if (willFailAtEmptyCheck) {
      // Succeed at processing but fail at empty check
      steps.push(
        {
          label: "Text Processing",
          desc: `Convert "${inputValue}" to "${processedResult}"`,
          highlight: 'let result = input.toUpperCase().trim();'
        },
        {
          label: "Check Length",
          desc: `Check if result length (${processedResult.length}) === 0`,
          highlight: 'if (result.length === 0)'
        },
        {
          label: "Throw Custom Error",
          desc: 'Throw custom error: "Empty text not allowed"',
          highlight: 'throw new Error("Empty text not allowed");'
        },
        {
          label: "Jump to Catch",
          desc: "Custom error thrown - execution jumps to catch block",
          highlight: 'catch (error)'
        },
        {
          label: "Log Error",
          desc: `Log: "Processing failed: ${errorMessage}"`,
          highlight: 'console.log("Processing failed:", error.message);'
        },
        {
          label: "Return Error",
          desc: `Return: "ERROR: ${errorMessage}"`,
          highlight: 'return "ERROR: " + error.message;'
        }
      );
    } else {
      // Success path
      steps.push(
        {
          label: "Text Processing",
          desc: `Convert "${inputValue}" to "${processedResult}"`,
          highlight: 'let result = input.toUpperCase().trim();'
        },
        {
          label: "Check Length",
          desc: `Check if result length (${processedResult.length}) === 0 → false`,
          highlight: 'if (result.length === 0)'
        },
        {
          label: "Log Success",
          desc: `Log: "Text processed successfully: ${processedResult}"`,
          highlight: 'console.log("Text processed successfully:", result);'
        },
        {
          label: "Return Success",
          desc: `Return: "SUCCESS: ${processedResult}"`,
          highlight: 'return "SUCCESS: " + result;'
        }
      );
    }

    return steps;
  };

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        The <strong>try block</strong> contains code that might fail. JavaScript executes it line by line until either it completes successfully or an error occurs - then it immediately jumps to the catch block.
      </p>

      {/* Code Parts Explanation */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Understanding the Try Block
        </Typography>
        <CodePartsExplanation 
          code={`function processText(input) {
  try {
    console.log("Processing:", input);
    let result = input.toUpperCase().trim();
    
    if (result.length === 0) {
      throw new Error("Empty text not allowed");
    }
    
    console.log("Text processed successfully:", result);
    return "SUCCESS: " + result;
  } catch (error) {
    console.log("Processing failed:", error.message);
    return "ERROR: " + error.message;
  }
}`}
          parts={codeParts}
        />
      </Box>

      {/* Interactive Step Through */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Try It Yourself: See Try Block in Action
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Test different inputs to see how the try block handles various scenarios:
        </Typography>
        
        <InteractiveStepThrough
          codeTemplate={codeTemplate}
          stepsTemplate={stepsTemplate}
          inputConfigs={[
            {
              name: "inputValue",
              label: "Input Value",
              options: [
                { label: "Valid Text: 'hello world'", value: "hello world" },
                { label: "Valid Text: '   spaces   '", value: "   spaces   " },
                { label: "Empty String: ''", value: "" },
                { label: "Only Spaces: '   '", value: "   " },
                { label: "Number: 123", value: 123 },
                { label: "Null Value", value: "null" },
                { label: "Boolean: true", value: "true" }
              ],
              defaultValue: "hello world"
            }
          ]}
        />
      </Box>

      <CalloutBox title="Key Try Block Concepts:" type="key-concepts">
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li><strong>Risky Code Container:</strong> Try blocks contain code that might throw errors</li>
          <li><strong>Sequential Execution:</strong> Code runs line by line until an error occurs</li>
          <li><strong>Immediate Jump:</strong> When an error occurs, execution immediately jumps to catch block</li>
          <li><strong>Error Types:</strong> Can handle both automatic errors (like calling methods on null) and custom thrown errors</li>
          <li><strong>Safe Testing:</strong> Allows you to attempt operations without crashing your program</li>
        </ul>
      </CalloutBox>
    </div>
  );
};

export default TryBlockExample;