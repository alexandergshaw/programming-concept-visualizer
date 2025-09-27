import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import CalloutBox from '@/components/common/CalloutBox';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ClassCreationExample: React.FC = () => {
  // Code parts for highlighting different sections
  const codeParts: CodePart[] = [
    {
      label: 'Class Declaration',
      part: 'class Person',
      color: '#e91e63',
      desc: 'Define a class as a blueprint for creating Person objects'
    },
    {
      label: 'Constructor Method',
      part: 'constructor(name, age)',
      color: '#4caf50',
      desc: 'Special method that runs when creating a new object instance'
    },
    {
      label: 'Property Assignment',
      part: 'this.name = name;\n    this.age = age;',
      color: '#2196f3',
      desc: 'Store the provided values as object properties using "this"'
    },
    {
      label: 'Instance Method',
      part: 'greet() {\n    return `Hello, I\'m ${this.name}`;',
      color: '#ff9800',
      desc: 'Define a method that can be called on object instances'
    },
    {
      label: 'Object Creation',
      part: 'new Person("Alice", 30)',
      color: '#9c27b0',
      desc: 'Use "new" keyword to create an object instance from the class'
    }
  ];

  // Template for generating executable code
  const codeTemplate = (inputs: Record<string, string | number>) => {
    return [`class Person {
  constructor(name, age) {
    console.log("Creating new Person...");
    this.name = name;
    this.age = age;
    console.log(\`Person created: \${this.name}, age \${this.age}\`);
  }
  
  greet() {
    return \`Hello, I'm \${this.name} and I'm \${this.age} years old!\`;
  }
  
  celebrateBirthday() {
    this.age++;
    return \`🎉 Happy Birthday! I'm now \${this.age} years old!\`;
  }
}

// Create a new person
const person = new Person("${inputs.name}", ${inputs.age});
console.log("Greeting:", person.greet());
console.log("Birthday:", person.celebrateBirthday());
console.log("Updated greeting:", person.greet());`];
  };

  // Template for generating step-by-step explanation
  const stepsTemplate = (inputs: Record<string, string | number>) => {
    const name = inputs.name as string;
    const age = Number(inputs.age);
    
    const steps: Step[] = [
      {
        label: "Class Definition",
        desc: "Define the Person class blueprint",
        highlight: 'class Person'
      },
      {
        label: "Constructor Call",
        desc: `Create new Person with name="${name}", age=${age}`,
        highlight: `new Person("${name}", ${age})`
      },
      {
        label: "Property Assignment",
        desc: "Store name and age as object properties",
        highlight: 'this.name = name;\n    this.age = age;'
      },
      {
        label: "Object Created",
        desc: `Person object created successfully`,
        highlight: 'console.log(`Person created: ${this.name}, age ${this.age}`);'
      },
      {
        label: "Call greet() Method",
        desc: "Execute the greet method on the person object",
        highlight: 'person.greet()'
      },
      {
        label: "Method Result",
        desc: `Returns: "Hello, I'm ${name} and I'm ${age} years old!"`,
        highlight: 'return `Hello, I\'m ${this.name} and I\'m ${this.age} years old!`;'
      }
    ];

    return steps;
  };

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        Classes serve as blueprints for creating objects. The <strong>constructor</strong> method runs automatically when you create a new object, setting up its initial properties.
      </p>

      {/* Code Parts Explanation */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Understanding Class Structure
        </Typography>
        <CodePartsExplanation 
          code={`class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
}

const person = new Person("Alice", 30);`}
          parts={codeParts}
        />
      </Box>

      {/* Interactive Step Through */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Try It Yourself: Create Different People
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Experiment with creating different Person objects:
        </Typography>
        
        <InteractiveStepThrough
          codeTemplate={codeTemplate}
          stepsTemplate={stepsTemplate}
          inputConfigs={[
            {
              name: "name",
              label: "Name",
              options: [
                { label: "Alice", value: "Alice" },
                { label: "Bob", value: "Bob" },
                { label: "Carol", value: "Carol" },
                { label: "David", value: "David" }
              ],
              defaultValue: "Alice"
            },
            {
              name: "age",
              label: "Age",
              options: [
                { label: "25", value: 25 },
                { label: "30", value: 30 },
                { label: "35", value: 35 },
                { label: "40", value: 40 }
              ],
              defaultValue: 30
            }
          ]}
        />
      </Box>

      <CalloutBox title="Key Class Creation Concepts:" type="key-concepts">
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li><strong>Class Declaration:</strong> Use "class" keyword to define a blueprint</li>
          <li><strong>Constructor Method:</strong> Special method that runs when creating objects</li>
          <li><strong>Property Assignment:</strong> Use "this" to store data in the object</li>
          <li><strong>Object Instantiation:</strong> Use "new" keyword to create objects from classes</li>
        </ul>
      </CalloutBox>
    </div>
  );
};

export default ClassCreationExample;