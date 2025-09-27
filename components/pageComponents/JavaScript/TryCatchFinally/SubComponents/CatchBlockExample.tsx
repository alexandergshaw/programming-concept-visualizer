import React from 'react';
import { Box, Typography } from '@mui/material';
import CalloutBox from '@/components/common/CalloutBox';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';

const CatchBlockExample: React.FC = () => {
  // Code parts for highlighting different sections
  const codeParts: CodePart[] = [
    {
      label: 'Function Declaration',
      part: 'function safeMath(operation, a, b)',
      color: '#e91e63',
      desc: 'Function that performs math operations with error handling'
    },
    {
      label: 'Try Block',
      part: 'try',
      color: '#4caf50',
      desc: 'Contains code that might throw an error'
    },
    {
      label: 'Division Check',
      part: 'if (operation === "divide" && b === 0)',
      color: '#2196f3',
      desc: 'Check for division by zero before performing operation'
    },
    {
      label: 'Throw Error',
      part: 'throw new Error("Cannot divide by zero");',
      color: '#ff9800',
      desc: 'Manually throw an error when division by zero is detected'
    },
    {
      label: 'Perform Operation',
      part: 'return a / b;',
      color: '#9c27b0',
      desc: 'Perform the math operation if no errors'
    },
    {
      label: 'Catch Block',
      part: 'catch (error)',
      color: '#f44336',
      desc: 'Catches and handles any errors that occur in the try block'
    },
    {
      label: 'Error Message Log',
      part: 'console.log("Math error:", error.message);',
      color: '#795548',
      desc: 'Log the error message for debugging'
    },
    {
      label: 'Return Safe Value',
      part: 'return "Error: " + error.message;',
      color: '#607d8b',
      desc: 'Return a safe error message instead of crashing'
    }
  ];

  // Template for generating executable code
  const codeTemplate = (inputs: Record<string, string | number>) => {
    return [`function safeMath(operation, a, b) {
  try {
    console.log(\`Attempting \${operation}: \${a} and \${b}\`);
    
    if (operation === "divide" && b === 0) {
      throw new Error("Cannot divide by zero");
    }
    
    if (operation === "sqrt" && a < 0) {
      throw new Error("Cannot take square root of negative number");
    }
    
    let result;
    switch (operation) {
      case "divide":
        result = a / b;
        break;
      case "sqrt":
        result = Math.sqrt(a);
        break;
      case "parse":
        result = parseInt(a.toString());
        if (isNaN(result)) {
          throw new Error("Cannot parse as number");
        }
        break;
      default:
        throw new Error("Unknown operation");
    }
    
    console.log("Operation successful:", result);
    return result;
  } catch (error) {
    console.log("Math error:", error.message);
    return "Error: " + error.message;
  }
}

// Test the function
const result = safeMath("${inputs.operation}", ${inputs.valueA}, ${inputs.valueB});
console.log("Final result:", result);`];
  };

  // Template for generating step-by-step explanation
  const stepsTemplate = (inputs: Record<string, string | number>) => {
    const operation = inputs.operation as string;
    const valueA = Number(inputs.valueA);
    const valueB = Number(inputs.valueB);
    
    const steps: Step[] = [
      {
        label: "Function Call",
        desc: `safeMath("${operation}", ${valueA}, ${valueB}) called`,
        highlight: 'function safeMath(operation, a, b)'
      },
      {
        label: "Try Block Starts",
        desc: "Try block begins - attempting risky operation",
        highlight: 'try'
      },
      {
        label: "Log Attempt",
        desc: `Log: "Attempting ${operation}: ${valueA} and ${valueB}"`,
        highlight: 'console.log(`Attempting ${operation}: ${a} and ${b}`);'
      }
    ];

    // Determine if operation will succeed or fail
    let willFail = false;
    let errorMessage = "";
    let result: string | number = "";

    if (operation === "divide" && valueB === 0) {
      willFail = true;
      errorMessage = "Cannot divide by zero";
    } else if (operation === "sqrt" && valueA < 0) {
      willFail = true;
      errorMessage = "Cannot take square root of negative number";
    } else if (operation === "parse" && isNaN(valueA)) {
      willFail = true;
      errorMessage = "Cannot parse as number";
    } else if (!["divide", "sqrt", "parse"].includes(operation)) {
      willFail = true;
      errorMessage = "Unknown operation";
    } else {
      // Calculate result
      switch (operation) {
        case "divide":
          result = valueA / valueB;
          break;
        case "sqrt":
          result = Math.sqrt(valueA);
          break;
        case "parse":
          result = parseInt(valueA.toString());
          break;
      }
    }

    if (willFail) {
      // Error path
      let checkHighlight = "";
      if (operation === "divide" && valueB === 0) {
        checkHighlight = 'if (operation === "divide" && b === 0)';
      } else if (operation === "sqrt" && valueA < 0) {
        checkHighlight = 'if (operation === "sqrt" && a < 0)';
      } else if (operation === "parse") {
        checkHighlight = 'if (isNaN(result))';
      } else {
        checkHighlight = 'default:';
      }

      steps.push(
        {
          label: "Error Condition",
          desc: `Error condition detected: ${errorMessage}`,
          highlight: checkHighlight
        },
        {
          label: "Throw Error",
          desc: `Throw error: "${errorMessage}"`,
          highlight: `throw new Error("${errorMessage}");`
        },
        {
          label: "Catch Block Executes",
          desc: "Error caught and handled by catch block",
          highlight: 'catch (error)'
        },
        {
          label: "Log Error",
          desc: `Log: "Math error: ${errorMessage}"`,
          highlight: 'console.log("Math error:", error.message);'
        },
        {
          label: "Return Error Message",
          desc: `Return: "Error: ${errorMessage}"`,
          highlight: 'return "Error: " + error.message;'
        }
      );
    } else {
      // Success path
      steps.push(
        {
          label: "No Error Detected",
          desc: `All error checks pass for ${operation} operation`,
          highlight: operation === "divide" ? 'if (operation === "divide" && b === 0)' : 
                    operation === "sqrt" ? 'if (operation === "sqrt" && a < 0)' : 
                    'case "parse":'
        },
        {
          label: "Perform Operation",
          desc: `Execute ${operation}: result = ${result}`,
          highlight: operation === "divide" ? 'result = a / b;' :
                    operation === "sqrt" ? 'result = Math.sqrt(a);' :
                    'result = parseInt(a.toString());'
        },
        {
          label: "Log Success",
          desc: `Log: "Operation successful: ${result}"`,
          highlight: 'console.log("Operation successful:", result);'
        },
        {
          label: "Return Result",
          desc: `Return successful result: ${result}`,
          highlight: 'return result;'
        }
      );
    }

    return steps;
  };

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        When the try block fails, JavaScript immediately jumps to the <strong>catch block</strong>. This is where you transform errors into helpful messages and prevent your program from crashing.
      </p>

      {/* Code Parts Explanation */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Understanding the Catch Block
        </Typography>
        <CodePartsExplanation 
          code={`function safeMath(operation, a, b) {
  try {
    console.log(\`Attempting \${operation}: \${a} and \${b}\`);
    
    if (operation === "divide" && b === 0) {
      throw new Error("Cannot divide by zero");
    }
    
    if (operation === "sqrt" && a < 0) {
      throw new Error("Cannot take square root of negative number");
    }
    
    let result;
    switch (operation) {
      case "divide":
        result = a / b;
        break;
      case "sqrt":
        result = Math.sqrt(a);
        break;
      default:
        throw new Error("Unknown operation");
    }
    
    console.log("Operation successful:", result);
    return result;
  } catch (error) {
    console.log("Math error:", error.message);
    return "Error: " + error.message;
  }
}`}
          parts={codeParts}
        />
      </Box>

      {/* Interactive Step Through */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Try It Yourself: See Catch in Action
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Test different operations to see how the catch block handles various errors:
        </Typography>
        
        <InteractiveStepThrough
          codeTemplate={codeTemplate}
          stepsTemplate={stepsTemplate}
          inputConfigs={[
            {
              name: "operation",
              label: "Operation",
              options: [
                { label: "Division (safe)", value: "divide" },
                { label: "Square Root (safe)", value: "sqrt" },
                { label: "Parse Number", value: "parse" },
                { label: "Unknown Operation", value: "multiply" }
              ],
              defaultValue: "divide"
            },
            {
              name: "valueA",
              label: "First Value",
              options: [
                { label: "Positive: 10", value: 10 },
                { label: "Positive: 16", value: 16 },
                { label: "Negative: -5", value: -5 },
                { label: "Zero: 0", value: 0 },
                { label: "Text: abc", value: "abc" }
              ],
              defaultValue: 10
            },
            {
              name: "valueB",
              label: "Second Value",
              options: [
                { label: "Positive: 2", value: 2 },
                { label: "Positive: 5", value: 5 },
                { label: "Zero: 0", value: 0 },
                { label: "Negative: -1", value: -1 }
              ],
              defaultValue: 2
            }
          ]}
        />
      </Box>

      <CalloutBox title="Key Catch Block Concepts:" type="key-concepts">
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li><strong>Error Prevention:</strong> Catch blocks prevent your program from crashing when errors occur</li>
          <li><strong>Error Information:</strong> The error object contains useful information like message and type</li>
          <li><strong>Graceful Handling:</strong> Return safe fallback values instead of letting errors propagate</li>
          <li><strong>User-Friendly:</strong> Transform technical error messages into user-friendly responses</li>
        </ul>
      </CalloutBox>
    </div>
  );
};

export default CatchBlockExample;