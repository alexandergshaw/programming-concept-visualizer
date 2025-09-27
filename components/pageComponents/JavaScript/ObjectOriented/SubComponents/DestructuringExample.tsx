import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import CalloutBox from '@/components/common/CalloutBox';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DestructuringExample: React.FC = () => {
  // Code parts for highlighting different sections
  const codeParts: CodePart[] = [
    {
      label: 'Object Creation',
      part: 'const person = { name: "Alice", age: 30, city: "New York" }',
      color: '#e91e63',
      desc: 'Create an object with multiple properties'
    },
    {
      label: 'Destructuring Assignment',
      part: 'const { name, age, city } = person',
      color: '#4caf50',
      desc: 'Extract multiple properties into individual variables in one line'
    },
    {
      label: 'Variable Renaming',
      part: 'const { name: fullName, age: years } = person',
      color: '#2196f3',
      desc: 'Rename variables during destructuring using colon syntax'
    },
    {
      label: 'Default Values',
      part: 'const { country = "USA" } = person',
      color: '#ff9800',
      desc: 'Provide default values for properties that might not exist'
    }
  ];

  // Template for generating executable code
  const codeTemplate = (inputs: Record<string, string | number>) => {
    const destructureType = inputs.destructureType as string;
    
    const examples = {
      basic: `// Create an object with person data
const person = {
  name: "${inputs.personName}",
  age: ${inputs.personAge},
  city: "${inputs.personCity}",
  job: "${inputs.personJob}"
};

console.log("Original object:", person);

// Basic destructuring - extract properties into variables
const { name, age, city, job } = person;

console.log("Extracted variables:");
console.log("Name:", name);
console.log("Age:", age);
console.log("City:", city);
console.log("Job:", job);`,

      rename: `const person = {
  name: "${inputs.personName}",
  age: ${inputs.personAge},
  city: "${inputs.personCity}"
};

// Destructuring with renaming
const { 
  name: fullName, 
  age: years, 
  city: location 
} = person;

console.log("Renamed variables:");
console.log("Full Name:", fullName);
console.log("Years:", years);
console.log("Location:", location);`,

      defaults: `const person = {
  name: "${inputs.personName}",
  age: ${inputs.personAge}
  // Note: no city or country properties
};

// Destructuring with default values
const { 
  name, 
  age, 
  city = "Unknown City", 
  country = "Unknown Country" 
} = person;

console.log("With defaults:");
console.log("Name:", name);
console.log("Age:", age);
console.log("City:", city);        // Will use default
console.log("Country:", country);  // Will use default`
    };
    
    return [examples[destructureType as keyof typeof examples]];
  };

  // Template for generating step-by-step explanation
  const stepsTemplate = (inputs: Record<string, string | number>) => {
    const destructureType = inputs.destructureType as string;
    const personName = inputs.personName as string;
    const personAge = Number(inputs.personAge);
    const personCity = inputs.personCity as string;
    
    if (destructureType === 'basic') {
      return [
        {
          label: "Create Object",
          desc: `Create person object with multiple properties`,
          highlight: `const person = { name: "${personName}", age: ${personAge}, city: "${personCity}" }`
        },
        {
          label: "Destructuring Syntax",
          desc: "Use curly braces to extract properties",
          highlight: 'const { name, age, city, job } = person'
        },
        {
          label: "Variables Created",
          desc: "Each property becomes a separate variable",
          highlight: 'name, age, city, job'
        },
        {
          label: "Access Variables",
          desc: `name = "${personName}", age = ${personAge}, etc.`,
          highlight: 'console.log("Name:", name)'
        }
      ];
    }
    
    if (destructureType === 'rename') {
      return [
        {
          label: "Object with Properties",
          desc: `Person object: name, age, city`,
          highlight: `const person = { name: "${personName}", age: ${personAge} }`
        },
        {
          label: "Destructure with Renaming",
          desc: "Use colon to rename variables during extraction",
          highlight: 'const { name: fullName, age: years, city: location } = person'
        },
        {
          label: "New Variable Names",
          desc: "Properties assigned to renamed variables",
          highlight: 'fullName, years, location'
        },
        {
          label: "Use Renamed Variables",
          desc: `fullName = "${personName}", years = ${personAge}`,
          highlight: 'console.log("Full Name:", fullName)'
        }
      ];
    }
    
    if (destructureType === 'defaults') {
      return [
        {
          label: "Object Missing Properties",
          desc: "Object only has name and age (no city or country)",
          highlight: `const person = { name: "${personName}", age: ${personAge} }`
        },
        {
          label: "Destructure with Defaults",
          desc: "Provide default values using = operator",
          highlight: 'const { name, age, city = "Unknown City", country = "Unknown Country" } = person'
        },
        {
          label: "Apply Defaults",
          desc: "Missing properties get default values",
          highlight: 'city = "Unknown City", country = "Unknown Country"'
        },
        {
          label: "Final Variables",
          desc: `name = "${personName}", city = "Unknown City"`,
          highlight: 'console.log("City:", city)'
        }
      ];
    }
    
    return [];
  };

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        <strong>Destructuring</strong> is a powerful JavaScript feature that lets you extract multiple properties from objects into individual variables in a single, clean statement. No more repetitive property access!
      </p>

      {/* Code Parts Explanation */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Understanding Object Destructuring
        </Typography>
        <CodePartsExplanation 
          code={`const person = { name: "Alice", age: 30, city: "New York" };

// Instead of this:
// const name = person.name;
// const age = person.age;
// const city = person.city;

// Do this:
const { name, age, city } = person;

// With renaming:
const { name: fullName, age: years } = person;

// With defaults:
const { country = "USA" } = person;`}
          parts={codeParts}
        />
      </Box>

      {/* Interactive Step Through */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Try It Yourself: Different Destructuring Patterns
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Explore the three main destructuring techniques:
        </Typography>
        
        <InteractiveStepThrough
          codeTemplate={codeTemplate}
          stepsTemplate={stepsTemplate}
          inputConfigs={[
            {
              name: "destructureType",
              label: "Destructuring Type",
              options: [
                { label: "Basic Extraction", value: "basic" },
                { label: "Rename Variables", value: "rename" },
                { label: "Default Values", value: "defaults" }
              ],
              defaultValue: "basic"
            },
            {
              name: "personName",
              label: "Person Name",
              options: [
                { label: "Alice", value: "Alice" },
                { label: "Bob", value: "Bob" },
                { label: "Carol", value: "Carol" }
              ],
              defaultValue: "Alice"
            },
            {
              name: "personAge",
              label: "Person Age",
              options: [
                { label: "25", value: 25 },
                { label: "30", value: 30 },
                { label: "35", value: 35 }
              ],
              defaultValue: 30
            },
            {
              name: "personCity",
              label: "Person City",
              options: [
                { label: "New York", value: "New York" },
                { label: "Los Angeles", value: "Los Angeles" },
                { label: "Chicago", value: "Chicago" }
              ],
              defaultValue: "New York"
            },
            {
              name: "personJob",
              label: "Person Job",
              options: [
                { label: "Developer", value: "Developer" },
                { label: "Designer", value: "Designer" },
                { label: "Manager", value: "Manager" }
              ],
              defaultValue: "Developer"
            }
          ]}
        />
      </Box>

      <CalloutBox title="Key Destructuring Concepts:" type="key-concepts">
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li><strong>Basic Syntax:</strong> const {`{ prop1, prop2 }`} = object extracts properties</li>
          <li><strong>Variable Renaming:</strong> const {`{ oldName: newName }`} = object renames during extraction</li>
          <li><strong>Default Values:</strong> const {`{ prop = defaultValue }`} = object provides fallbacks</li>
          <li><strong>Cleaner Code:</strong> Eliminates repetitive property access patterns</li>
        </ul>
      </CalloutBox>
    </div>
  );
};

export default DestructuringExample;