import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import CalloutBox from '@/components/common/CalloutBox';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ObjectHierarchyExample: React.FC = () => {
  // Code parts for highlighting different sections
  const codeParts: CodePart[] = [
    {
      label: 'Object.prototype',
      part: 'Object.prototype',
      color: '#e91e63', 
      desc: 'The root of all JavaScript objects - every object inherits from Object.prototype'
    },
    {
      label: 'Array Inheritance',
      part: 'Array.prototype.__proto__ === Object.prototype',
      color: '#4caf50',
      desc: 'Arrays inherit from Object.prototype through Array.prototype'
    },
    {
      label: 'Function Inheritance',
      part: 'Function.prototype.__proto__ === Object.prototype',
      color: '#2196f3',
      desc: 'Functions also inherit from Object.prototype through Function.prototype'
    },
    {
      label: 'Prototype Chain',
      part: 'myArray.__proto__.__proto__ === Object.prototype',
      color: '#ff9800',
      desc: 'Objects inherit methods through the prototype chain'
    }
  ];

  // Template for generating executable code
  const codeTemplate = (inputs: Record<string, string | number>) => {
    const objectType = inputs.objectType as string;
    
    const examples = {
      array: `// Exploring Array inheritance hierarchy
const myArray = [1, 2, 3];

console.log("=== Array Inheritance Chain ===");
console.log("Array value:", myArray);
console.log("Array constructor:", myArray.constructor.name);

// Check prototype chain
console.log("\\n=== Prototype Chain ===");
console.log("myArray.__proto__ === Array.prototype:", myArray.__proto__ === Array.prototype);
console.log("Array.prototype.__proto__ === Object.prototype:", Array.prototype.__proto__ === Object.prototype);

// Inherited methods from Array.prototype
console.log("\\n=== Array Methods (from Array.prototype) ===");
console.log("push method exists:", typeof myArray.push === 'function');
console.log("join method exists:", typeof myArray.join === 'function');
console.log("Using join():", myArray.join(', '));

// Inherited methods from Object.prototype
console.log("\\n=== Object Methods (from Object.prototype) ===");
console.log("toString method exists:", typeof myArray.toString === 'function');
console.log("hasOwnProperty exists:", typeof myArray.hasOwnProperty === 'function');
console.log("Using toString():", myArray.toString());`,

      string: `// Exploring String inheritance hierarchy  
const myString = "Hello World";

console.log("=== String Inheritance Chain ===");
console.log("String value:", myString);
console.log("String constructor:", myString.constructor.name);

// Check prototype chain
console.log("\\n=== Prototype Chain ===");
console.log("myString.__proto__ === String.prototype:", myString.__proto__ === String.prototype);
console.log("String.prototype.__proto__ === Object.prototype:", String.prototype.__proto__ === Object.prototype);

// Inherited methods from String.prototype
console.log("\\n=== String Methods (from String.prototype) ===");
console.log("toUpperCase exists:", typeof myString.toUpperCase === 'function');
console.log("slice exists:", typeof myString.slice === 'function');
console.log("Using toUpperCase():", myString.toUpperCase());

// Inherited methods from Object.prototype
console.log("\\n=== Object Methods (from Object.prototype) ===");
console.log("toString exists:", typeof myString.toString === 'function');
console.log("valueOf exists:", typeof myString.valueOf === 'function');
console.log("Using valueOf():", myString.valueOf());`,

      date: `// Exploring Date inheritance hierarchy
const myDate = new Date('2024-01-15');

console.log("=== Date Inheritance Chain ===");
console.log("Date value:", myDate);
console.log("Date constructor:", myDate.constructor.name);

// Check prototype chain
console.log("\\n=== Prototype Chain ===");
console.log("myDate.__proto__ === Date.prototype:", myDate.__proto__ === Date.prototype);
console.log("Date.prototype.__proto__ === Object.prototype:", Date.prototype.__proto__ === Object.prototype);

// Inherited methods from Date.prototype
console.log("\\n=== Date Methods (from Date.prototype) ===");
console.log("getFullYear exists:", typeof myDate.getFullYear === 'function');
console.log("toISOString exists:", typeof myDate.toISOString === 'function');
console.log("Using getFullYear():", myDate.getFullYear());

// Inherited methods from Object.prototype
console.log("\\n=== Object Methods (from Object.prototype) ===");
console.log("toString exists:", typeof myDate.toString === 'function');
console.log("hasOwnProperty exists:", typeof myDate.hasOwnProperty === 'function');
console.log("Using toString():", myDate.toString());`
    };
    
    return [examples[objectType as keyof typeof examples]];
  };

  // Template for generating step-by-step explanation
  const stepsTemplate = (inputs: Record<string, string | number>) => {
    const objectType = inputs.objectType as string;
    
    const configs = {
      array: {
        name: "Array",
        specificMethods: ["push()", "pop()", "join()", "slice()"],
        example: "[1, 2, 3]"
      },
      string: {
        name: "String", 
        specificMethods: ["toUpperCase()", "slice()", "charAt()", "indexOf()"],
        example: '"Hello World"'
      },
      date: {
        name: "Date",
        specificMethods: ["getFullYear()", "getMonth()", "toISOString()", "getTime()"],
        example: "new Date('2024-01-15')"
      }
    };
    
    const config = configs[objectType as keyof typeof configs];
    
    return [
      {
        label: "Create Object Instance",
        desc: `Create a ${config.name} object: ${config.example}`,
        highlight: `const my${config.name} = ${config.example}`
      },
      {
        label: "Check Constructor",
        desc: `Object constructor points to ${config.name} class`,
        highlight: `my${config.name}.constructor.name // "${config.name}"`
      },
      {
        label: "First Prototype Link",
        desc: `Object inherits from ${config.name}.prototype`,
        highlight: `my${config.name}.__proto__ === ${config.name}.prototype`
      },
      {
        label: "Second Prototype Link", 
        desc: `${config.name}.prototype inherits from Object.prototype`,
        highlight: `${config.name}.prototype.__proto__ === Object.prototype`
      },
      {
        label: `${config.name} Methods Available`,
        desc: `Access ${config.name}-specific methods from ${config.name}.prototype`,
        highlight: config.specificMethods.join(', ')
      },
      {
        label: "Object Methods Available",
        desc: "Access universal Object methods through prototype chain",
        highlight: 'toString(), hasOwnProperty(), valueOf()'
      }
    ];
  };

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        <strong>JavaScript's Object Hierarchy</strong> means every value you create (arrays, strings, dates) automatically gets useful methods like toString() and hasOwnProperty(). Understanding this chain explains why [1,2,3].toString() works.
      </p>

      {/* Code Parts Explanation */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          JavaScript's Built-in Inheritance Chain
        </Typography>
        <CodePartsExplanation 
          code={`// All JavaScript objects inherit from Object.prototype
const myArray = [1, 2, 3];

// Inheritance chain: myArray -> Array.prototype -> Object.prototype
console.log(myArray.__proto__ === Array.prototype); // true
console.log(Array.prototype.__proto__ === Object.prototype); // true

// Array gets methods from both prototypes
myArray.push(4);           // From Array.prototype  
myArray.toString();        // From Object.prototype

// Same pattern for all built-in types
const myString = &quot;hello&quot;;
console.log(myString.__proto__ === String.prototype); // true
console.log(String.prototype.__proto__ === Object.prototype); // true`}
          parts={codeParts}
        />
      </Box>

      {/* Interactive Step Through */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Try It Yourself: Explore Built-in Object Hierarchies
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Examine how different JavaScript types inherit from Object.prototype:
        </Typography>
        
        <InteractiveStepThrough
          codeTemplate={codeTemplate}
          stepsTemplate={stepsTemplate}
          inputConfigs={[
            {
              name: "objectType",
              label: "Object Type to Explore",
              options: [
                { label: "Array", value: "array" },
                { label: "String", value: "string" },
                { label: "Date", value: "date" }
              ],
              defaultValue: "array"
            }
          ]}
        />
      </Box>

      {/* Hierarchy Visualization */}
      <Box sx={{ 
        p: 2, 
        bgcolor: '#f8f9fa', 
        borderRadius: 1, 
        border: '1px solid #dee2e6',
        mb: 3 
      }}>
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          📊 JavaScript Object Hierarchy:
        </Typography>
        <div style={{ fontFamily: 'monospace', fontSize: 14, lineHeight: 1.8 }}>
          <div style={{ color: '#e91e63', fontWeight: 'bold' }}>Object.prototype</div>
          <div style={{ marginLeft: 20 }}>├── Array.prototype → <span style={{ color: '#4caf50' }}>Arrays [1,2,3]</span></div>
          <div style={{ marginLeft: 20 }}>├── String.prototype → <span style={{ color: '#4caf50' }}>Strings &quot;hello&quot;</span></div>
          <div style={{ marginLeft: 20 }}>├── Number.prototype → <span style={{ color: '#4caf50' }}>Numbers 42</span></div>
          <div style={{ marginLeft: 20 }}>├── Date.prototype → <span style={{ color: '#4caf50' }}>Dates new Date()</span></div>
          <div style={{ marginLeft: 20 }}>├── Function.prototype → <span style={{ color: '#4caf50' }}>Functions function(){`{}`}</span></div>
          <div style={{ marginLeft: 20 }}>└── Boolean.prototype → <span style={{ color: '#4caf50' }}>Booleans true/false</span></div>
        </div>
      </Box>

      <CalloutBox title="Key Object Hierarchy Concepts:" type="key-concepts">
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li><strong>Object.prototype:</strong> Root object that all JavaScript objects inherit from</li>
          <li><strong>Prototype Chain:</strong> Objects inherit methods by following __proto__ references</li>
          <li><strong>Built-in Types:</strong> Array, String, Date, etc. have their own prototype that inherits from Object.prototype</li>
          <li><strong>Universal Methods:</strong> toString(), hasOwnProperty(), valueOf() available on all objects</li>
        </ul>
      </CalloutBox>
    </div>
  );
};

export default ObjectHierarchyExample;