import React, { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import CodePreview from '@/components/common/CodePreview';
import CalloutBox from '@/components/common/CalloutBox';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FinallyBlockExample: React.FC = () => {
  // Code parts for highlighting different sections
  const codeParts: CodePart[] = [
    {
      label: 'Function Declaration',
      part: 'function processData(inputData)',
      color: 'var(--feature)',
      desc: 'Function that processes data and always cleans up resources'
    },
    {
      label: 'Try Block',
      part: 'try',
      color: 'var(--success)',
      desc: 'Contains code that might throw an error'
    },
    {
      label: 'Data Processing',
      part: 'let processed = inputData.toUpperCase();',
      color: 'var(--info)',
      desc: 'Process the input data - this might fail if input is not a string'
    },
    {
      label: 'Success Return',
      part: 'return processed;',
      color: 'var(--warning)',
      desc: 'Return the processed result on success'
    },
    {
      label: 'Catch Block',
      part: 'catch (error)',
      color: 'var(--danger)',
      desc: 'Handles any errors that occur in the try block'
    },
    {
      label: 'Error Handling',
      part: 'return "Error: Invalid input";',
      color: 'var(--feature)',
      desc: 'Return an error message when processing fails'
    },
    {
      label: 'Finally Block',
      part: 'finally',
      color: 'var(--ink-soft)',
      desc: 'Always executes - perfect for cleanup operations'
    },
    {
      label: 'Cleanup Code',
      part: 'console.log("Processing completed - resources cleaned up");',
      color: 'var(--ink-soft)',
      desc: 'Cleanup code that runs regardless of success or failure'
    }
  ];

  // Template for generating executable code
  const codeTemplate = (inputs: Record<string, string | number>) => {
    // Convert special string values to actual values
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let inputData: any = inputs.inputData;
    if (inputData === 'null') inputData = null;
    if (inputData === 'true') inputData = true;
    
    return [`function processData(inputData) {
  try {
    console.log("Starting data processing...");
    let processed = inputData.toUpperCase();
    console.log("Data processed successfully:", processed);
    return processed;
  } catch (error) {
    console.log("Error occurred:", error.message);
    return "Error: Invalid input";
  } finally {
    console.log("Processing completed - resources cleaned up");
  }
}

// Test the function
const result = processData(${JSON.stringify(inputData)});
console.log("Final result:", result);`];
  };

  // Template for generating step-by-step explanation
  const stepsTemplate = (inputs: Record<string, string | number>) => {
    // Convert special string values to actual values
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let inputData: any = inputs.inputData;
    if (inputData === 'null') inputData = null;
    if (inputData === 'true') inputData = true;
    
    const isValidString = typeof inputData === 'string' && inputData.length > 0;
    
    const steps: Step[] = [
      {
        label: "Function Call",
        desc: `Function called with input: ${JSON.stringify(inputData)}`,
        highlight: 'function processData(inputData)'
      },
      {
        label: "Try Block Starts",
        desc: "Try block begins - starting data processing",
        highlight: 'try'
      },
      {
        label: "Log Start Message",
        desc: 'Log: "Starting data processing..."',
        highlight: 'console.log("Starting data processing...");'
      }
    ];

    if (isValidString) {
      // Success path
      steps.push(
        {
          label: "Process Data",
          desc: `Convert "${inputData}" to uppercase: "${inputData.toUpperCase()}"`,
          highlight: 'let processed = inputData.toUpperCase();'
        },
        {
          label: "Log Success",
          desc: `Log: "Data processed successfully: ${inputData.toUpperCase()}"`,
          highlight: 'console.log("Data processed successfully:", processed);'
        },
        {
          label: "Return Result",
          desc: `Return processed data: "${inputData.toUpperCase()}"`,
          highlight: 'return processed;'
        },
        {
          label: "Finally Block Runs",
          desc: "Finally block executes (even on success)",
          highlight: 'finally'
        },
        {
          label: "Cleanup Log",
          desc: 'Log: "Processing completed - resources cleaned up"',
          highlight: 'console.log("Processing completed - resources cleaned up");'
        }
      );
    } else {
      // Error path
      steps.push(
        {
          label: "Error Occurs",
          desc: "toUpperCase() fails - input is not a string",
          highlight: 'let processed = inputData.toUpperCase();'
        },
        {
          label: "Catch Block Executes",
          desc: "Error caught and handled",
          highlight: 'catch (error)'
        },
        {
          label: "Log Error",
          desc: `Log: "Error occurred: ${inputData === null ? 'Cannot read properties of null' : 'inputData.toUpperCase is not a function'}"`,
          highlight: 'console.log("Error occurred:", error.message);'
        },
        {
          label: "Return Error Message",
          desc: 'Return: "Error: Invalid input"',
          highlight: 'return "Error: Invalid input";'
        },
        {
          label: "Finally Block Runs",
          desc: "Finally block executes (even after error)",
          highlight: 'finally'
        },
        {
          label: "Cleanup Log",
          desc: 'Log: "Processing completed - resources cleaned up"',
          highlight: 'console.log("Processing completed - resources cleaned up");'
        }
      );
    }

    return steps;
  };

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        The <strong>finally block</strong> is your cleanup crew. No matter what happens in try or catch, finally always executes - perfect for resource cleanup, logging, or closing connections.
      </p>

      {/* Code Parts Explanation */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Understanding the Finally Block
        </Typography>
        <CodePartsExplanation 
          code={`function processData(inputData) {
  try {
    console.log("Starting data processing...");
    let processed = inputData.toUpperCase();
    console.log("Data processed successfully:", processed);
    return processed;
  } catch (error) {
    console.log("Error occurred:", error.message);
    return "Error: Invalid input";
  } finally {
    console.log("Processing completed - resources cleaned up");
  }
}`}
          parts={codeParts}
        />
      </Box>

      {/* Interactive Step Through */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Try It Yourself: See Finally in Action
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Test different inputs to see how the finally block always runs, whether the operation succeeds or fails:
        </Typography>
        
        <InteractiveStepThrough
          codeTemplate={codeTemplate}
          stepsTemplate={stepsTemplate}
          inputConfigs={[
            {
              name: "inputData",
              label: "Input Data",
              options: [
                { label: "Valid String: 'hello world'", value: "hello world" },
                { label: "Empty String: ''", value: "" },
                { label: "Number: 123", value: 123 },
                { label: "Null Value", value: "null" },
                { label: "Boolean: true", value: "true" }
              ],
              defaultValue: "hello world"
            }
          ]}
        />
      </Box>

      <CalloutBox title="Key Finally Block Concepts:" type="key-concepts">
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li><strong>Always Executes:</strong> Finally runs whether try succeeds or catch handles an error</li>
          <li><strong>Cleanup Purpose:</strong> Perfect for closing files, releasing resources, or logging</li>
          <li><strong>Order Matters:</strong> Finally runs after try/catch, but before the function returns</li>
          <li><strong>Can't Be Skipped:</strong> Even if try/catch has return statements, finally still runs</li>
        </ul>
      </CalloutBox>
    </div>
  );
};

export default FinallyBlockExample;