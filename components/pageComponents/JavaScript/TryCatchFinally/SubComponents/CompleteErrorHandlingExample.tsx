import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '../../StepThroughCodeAnimation';

const CompleteErrorHandlingExample: React.FC = () => {
  // Code parts for highlighting
  const codeParts: CodePart[] = [
    {
      label: "Try Block",
      part: "try {",
      color: "var(--info)",
      desc: "Attempts risky operations - converting strings to numbers and dividing"
    },
    {
      label: "Input Validation",
      part: "if (isNaN(a) || isNaN(b)) {\n    throw new Error('Invalid input');",
      color: "var(--warning)",
      desc: "Checks if the inputs are valid numbers and throws an error if not"
    },
    {
      label: "Division Check",
      part: "if (b === 0) {\n    throw new Error('Cannot divide by zero');",
      color: "var(--warning)",
      desc: "Prevents division by zero by throwing a specific error"
    },
    {
      label: "Success Operation",
      part: "return a / b;",
      color: "var(--success)",
      desc: "If everything is valid, performs the division and returns result"
    },
    {
      label: "Catch Block",
      part: "} catch (error) {",
      color: "var(--danger)",
      desc: "Handles any errors that occurred in the try block"
    },
    {
      label: "Error Handling",
      part: "console.log('Error: ' + error.message);",
      color: "var(--feature)",
      desc: "Logs the error message for debugging purposes"
    },
    {
      label: "Finally Block",
      part: "} finally {",
      color: "var(--feature)",
      desc: "Always runs, whether the operation succeeded or failed"
    },
    {
      label: "Cleanup",
      part: "console.log('Operation completed');",
      color: "var(--feature)",
      desc: "Cleanup code that always executes"
    }
  ];

  // Template for generating code based on inputs
  const codeTemplate = (inputs: Record<string, string | number>) => [
    'function safeDivision(inputA, inputB) {',
    '  try {',
    '    const a = parseFloat(inputA);',
    '    const b = parseFloat(inputB);',
    '    ',
    '    if (isNaN(a) || isNaN(b)) {',
    '      throw new Error("Invalid input");',
    '    }',
    '    ',
    '    if (b === 0) {',
    '      throw new Error("Cannot divide by zero");',
    '    }',
    '    ',
    '    return a / b;',
    '  } catch (error) {',
    '    console.log("Error: " + error.message);',
    '    return null;',
    '  } finally {',
    '    console.log("Operation completed");',
    '  }',
    '}',
    '',
    `// Call the function`,
    `safeDivision("${inputs.num1}", "${inputs.num2}");`
  ];

  // Template for generating steps based on inputs  
  const stepsTemplate = (inputs: Record<string, string | number>) => {
    const num1 = parseFloat(inputs.num1 as string);
    const num2 = parseFloat(inputs.num2 as string);
    const isNum1Valid = !isNaN(num1);
    const isNum2Valid = !isNaN(num2);
    const isDivisionValid = isNum1Valid && isNum2Valid && num2 !== 0;
    
    const steps: Step[] = [
      {
        label: "Function Call",
        desc: "Function is called with the provided inputs",
        highlight: 'function safeDivision(inputA, inputB)'
      },
      {
        label: "Try Block Starts",
        desc: "Try block begins - this is where risky operations happen",
        highlight: 'try'
      },
      {
        label: "Parse First Input",
        desc: `Convert "${inputs.num1}" to number: ${isNum1Valid ? num1 : 'Invalid'}`,
        highlight: 'let num1 = parseFloat(inputA);'
      },
      {
        label: "Parse Second Input", 
        desc: `Convert "${inputs.num2}" to number: ${isNum2Valid ? num2 : 'Invalid'}`,
        highlight: 'let num2 = parseFloat(inputB);'
      }
    ];

    if (!isNum1Valid || !isNum2Valid) {
      steps.push(
        {
          label: "Input Validation Fails",
          desc: "Input validation fails - one or both inputs are not valid numbers",
          highlight: 'if (isNaN(a) || isNaN(b))'
        },
        {
          label: "Throw Input Error",
          desc: "Throw error and jump to catch block",
          highlight: "throw new Error('Invalid input');"
        },
        {
          label: "Catch Block Executes",
          desc: "Catch block handles the error",
          highlight: 'catch (error)'
        },
        {
          label: "Log Error Message",
          desc: `Log error message: "Invalid input"`,
          highlight: "console.log('Error: ' + error.message);"
        },
        {
          label: "Return Null",
          desc: "Return null to indicate failure",
          highlight: 'return null;'
        },
        {
          label: "Finally Block Runs",
          desc: "Finally block always runs",
          highlight: 'finally'
        },
        {
          label: "Log Completion",
          desc: "Log completion message",
          highlight: "console.log('Operation completed');"
        }
      );
    } else if (num2 === 0) {
      steps.push(
        {
          label: "Input Validation Passes",
          desc: "Input validation passes - both are valid numbers",
          highlight: 'if (isNaN(a) || isNaN(b))'
        },
        {
          label: "Division Check Fails",
          desc: "Division by zero check fails",
          highlight: 'if (b === 0)'
        },
        {
          label: "Throw Division Error",
          desc: "Throw error and jump to catch block",
          highlight: "throw new Error('Cannot divide by zero');"
        },
        {
          label: "Catch Block Executes",
          desc: "Catch block handles the division by zero error",
          highlight: 'catch (error)'
        },
        {
          label: "Log Error Message",
          desc: `Log error message: "Cannot divide by zero"`,
          highlight: "console.log('Error: ' + error.message);"
        },
        {
          label: "Return Null",
          desc: "Return null to indicate failure",
          highlight: 'return null;'
        },
        {
          label: "Finally Block Runs",
          desc: "Finally block always runs",
          highlight: 'finally'
        },
        {
          label: "Log Completion",
          desc: "Log completion message",
          highlight: "console.log('Operation completed');"
        }
      );
    } else {
      steps.push(
        {
          label: "Input Validation Passes",
          desc: "Input validation passes - both are valid numbers",
          highlight: 'if (isNaN(a) || isNaN(b))'
        },
        {
          label: "Division Check Passes",
          desc: "Division by zero check passes",
          highlight: 'if (b === 0)'
        },
        {
          label: "Perform Division",
          desc: `Perform division: ${num1} ÷ ${num2} = ${num1 / num2}`,
          highlight: 'return a / b;'
        },
        {
          label: "Finally Block Runs",
          desc: "Finally block always runs, even on success",
          highlight: 'finally'
        },
        {
          label: "Log Completion",
          desc: "Log completion message",
          highlight: "console.log('Operation completed');"
        }
      );
    }

    return steps;
  };

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        Here's how <strong>try</strong>, <strong>catch</strong>, and <strong>finally</strong> work together in a simple division function that handles errors gracefully.
      </p>

      {/* Code Parts Explanation */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Understanding the Complete Try-Catch-Finally Pattern
        </Typography>
        <CodePartsExplanation 
          code={`function safeDivision(inputA, inputB) {
  try {
    const a = parseFloat(inputA);
    const b = parseFloat(inputB);
    
    if (isNaN(a) || isNaN(b)) {
      throw new Error('Invalid input');
    }
    
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    
    return a / b;
  } catch (error) {
    console.log('Error: ' + error.message);
    return null;
  } finally {
    console.log('Operation completed');
  }
}`}
          parts={codeParts}
        />
      </Box>

      {/* Interactive Step Through */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Interactive Step-Through: Try Different Inputs
        </Typography>
        <InteractiveStepThrough
          codeTemplate={codeTemplate}
          stepsTemplate={stepsTemplate}
          inputConfigs={[
            {
              name: 'num1',
              label: 'First Number',
              options: [
                { label: '10 (valid)', value: '10' },
                { label: '5.5 (valid)', value: '5.5' },
                { label: 'abc (invalid)', value: 'abc' },
                { label: '"" (empty)', value: '' }
              ],
              defaultValue: '10'
            },
            {
              name: 'num2', 
              label: 'Second Number',
              options: [
                { label: '2 (valid)', value: '2' },
                { label: '0 (division by zero)', value: '0' },
                { label: 'xyz (invalid)', value: 'xyz' },
                { label: '-3 (valid negative)', value: '-3' }
              ],
              defaultValue: '2'
            }
          ]}
        />
      </Box>

      {/* Simple Summary */}
      <Box sx={{ mt: 4, p: 3, bgcolor: 'var(--info-bg)', borderRadius: 2, border: '2px solid var(--info)' }}>
        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: 'var(--info)' }}>
          🎯 Why This Pattern Works
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
          <Box>
            <Typography variant="subtitle2" fontWeight={600} sx={{ color: 'var(--info)', mb: 1 }}>
              Try Block
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
              Contains risky operations. If everything goes well, this is all that runs.
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle2" fontWeight={600} sx={{ color: 'var(--danger)', mb: 1 }}>
              Catch Block
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
              Only runs if something goes wrong. Prevents crashes and handles errors gracefully.
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle2" fontWeight={600} sx={{ color: 'var(--feature)', mb: 1 }}>
              Finally Block
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
              Always runs, regardless of success or failure. Perfect for cleanup.
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CompleteErrorHandlingExample;