import React from 'react';
import Typography from '@mui/material/Typography';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import FlexibleGrid, { GridItem } from '@/components/common/FlexibleGrid';

const ErrorTypesOverview: React.FC = () => {
  return (
    <div style={{ marginBottom: 40 }}>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        Let&apos;s learn about the different types of errors that can occur in JavaScript and what causes them.
      </p>

      {/* Common Error Types */}
      <ConceptInfoCard>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          What We&apos;re Learning:
        </Typography>
        
        <FlexibleGrid 
          items={[
            {
              title: 'ReferenceError',
              description: 'Occurs when you try to access a variable, function, or object that doesn\'t exist or hasn\'t been declared yet.',
              code: `// Variable not declared
console.log(undefinedVar);
// ReferenceError: undefinedVar is not defined

// Function not defined
myFunction();
// ReferenceError: myFunction is not defined

// Accessing before declaration
console.log(x);
let x = 5;
// ReferenceError: Cannot access 'x' before initialization`
            },
            {
              title: 'TypeError', 
              description: 'Occurs when you try to perform an operation on a value that is not of the expected type.',
              code: `// Calling method on null/undefined
null.toUpperCase();
// TypeError: Cannot read properties of null

// Wrong method for data type
let number = 42;
number.toUpperCase();
// TypeError: number.toUpperCase is not a function

// Calling non-function as function
let text = "hello";
text();
// TypeError: text is not a function`
            },
            {
              title: 'SyntaxError',
              description: 'Occurs when JavaScript code has invalid syntax that prevents it from being parsed correctly.',
              code: `// Missing closing parenthesis
if (true { console.log("error"); }
// SyntaxError: Unexpected token '{'

// Missing closing bracket
let arr = [1, 2, 3;
// SyntaxError: Unexpected end of input

// Invalid assignment
5 = x;
// SyntaxError: Invalid left-hand side in assignment`
            },
            {
              title: 'RangeError',
              description: 'Occurs when a numeric value is not within the range of allowed values for a particular operation.',
              code: `// Negative array length
new Array(-1);
// RangeError: Invalid array length

// Number too large for precision
(1234).toFixed(200);
// RangeError: toFixed() digits argument must be between 0 and 100

// Stack overflow (infinite recursion)
function infinite() { infinite(); }
infinite();
// RangeError: Maximum call stack size exceeded`
            }
          ]}
        />
      </ConceptInfoCard>
    </div>
  );
};

export default ErrorTypesOverview;