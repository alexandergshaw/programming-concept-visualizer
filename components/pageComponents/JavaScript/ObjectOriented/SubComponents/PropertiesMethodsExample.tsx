import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import CalloutBox from '@/components/common/CalloutBox';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PropertiesMethodsExample: React.FC = () => {
  // Code parts for highlighting different sections
  const codeParts: CodePart[] = [
    {
      label: 'Property Access',
      part: 'person.name',
      color: 'var(--feature)',
      desc: 'Access object properties using dot notation'
    },
    {
      label: 'Property Modification',
      part: 'person.age = 31;',
      color: 'var(--success)',
      desc: 'Change property values after object creation'
    },
    {
      label: 'Method Call',
      part: 'person.greet()',
      color: 'var(--info)',
      desc: 'Execute methods on the object instance'
    },
    {
      label: 'Method with Parameters',
      part: 'person.setAge(32)',
      color: 'var(--warning)',
      desc: 'Call methods that accept parameters to modify the object'
    }
  ];

  // Template for generating executable code
  const codeTemplate = (inputs: Record<string, string | number>) => {
    const operation = inputs.operation as string;
    
    const operations = {
      access: `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Hello, I'm \${this.name}!\`;
  }
}

const person = new Person("${inputs.personName}", ${inputs.personAge});

// Access properties
console.log("Name:", person.name);
console.log("Age:", person.age);

// Call method
console.log("Greeting:", person.greet());`,

      modify: `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Hello, I'm \${this.name}, age \${this.age}!\`;
  }
}

const person = new Person("${inputs.personName}", ${inputs.personAge});
console.log("Before:", person.greet());

// Modify properties
person.name = "${inputs.newName}";
person.age = ${inputs.newAge};

console.log("After:", person.greet());`,

      methods: `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Hello, I'm \${this.name}!\`;
  }
  
  setAge(newAge) {
    console.log(\`Changing age from \${this.age} to \${newAge}\`);
    this.age = newAge;
  }
  
  getInfo() {
    return {
      name: this.name,
      age: this.age,
      canVote: this.age >= 18
    };
  }
}

const person = new Person("${inputs.personName}", ${inputs.personAge});
console.log("Initial:", person.greet());
person.setAge(${inputs.methodAge});
console.log("Info:", person.getInfo());`
    };
    
    return [operations[operation as keyof typeof operations]];
  };

  // Template for generating step-by-step explanation
  const stepsTemplate = (inputs: Record<string, string | number>) => {
    const operation = inputs.operation as string;
    const personName = inputs.personName as string;
    const personAge = Number(inputs.personAge);
    
    if (operation === 'access') {
      return [
        {
          label: "Create Object",
          desc: `Create Person named "${personName}", age ${personAge}`,
          highlight: `new Person("${personName}", ${personAge})`
        },
        {
          label: "Access Name Property",
          desc: `Get the name property: "${personName}"`,
          highlight: 'person.name'
        },
        {
          label: "Access Age Property",
          desc: `Get the age property: ${personAge}`,
          highlight: 'person.age'
        },
        {
          label: "Call greet() Method",
          desc: "Execute the greet method",
          highlight: 'person.greet()'
        },
        {
          label: "Method Returns Result",
          desc: `Returns: "Hello, I'm ${personName}!"`,
          highlight: 'return `Hello, I\'m ${this.name}!`;'
        }
      ];
    }
    
    if (operation === 'modify') {
      const newName = inputs.newName as string;
      const newAge = Number(inputs.newAge);
      
      return [
        {
          label: "Initial Object",
          desc: `Person: "${personName}", age ${personAge}`,
          highlight: `new Person("${personName}", ${personAge})`
        },
        {
          label: "Initial Greeting",
          desc: `Shows: "Hello, I'm ${personName}, age ${personAge}!"`,
          highlight: 'person.greet()'
        },
        {
          label: "Modify Name",
          desc: `Change name from "${personName}" to "${newName}"`,
          highlight: `person.name = "${newName}"`
        },
        {
          label: "Modify Age",
          desc: `Change age from ${personAge} to ${newAge}`,
          highlight: `person.age = ${newAge}`
        },
        {
          label: "Updated Greeting",
          desc: `Now shows: "Hello, I'm ${newName}, age ${newAge}!"`,
          highlight: 'person.greet()'
        }
      ];
    }
    
    if (operation === 'methods') {
      const methodAge = Number(inputs.methodAge);
      
      return [
        {
          label: "Create Person",
          desc: `Create Person: "${personName}", age ${personAge}`,
          highlight: `new Person("${personName}", ${personAge})`
        },
        {
          label: "Initial Greeting",
          desc: `Initial greeting from ${personName}`,
          highlight: 'person.greet()'
        },
        {
          label: "Call setAge() Method",
          desc: `Use method to change age to ${methodAge}`,
          highlight: `person.setAge(${methodAge})`
        },
        {
          label: "Method Updates Property",
          desc: `setAge() method changes this.age to ${methodAge}`,
          highlight: 'this.age = newAge'
        },
        {
          label: "Call getInfo() Method",
          desc: "Get comprehensive info about the person",
          highlight: 'person.getInfo()'
        }
      ];
    }
    
    return [];
  };

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        Once you create objects, you interact with them through their <strong>properties</strong> (data) and <strong>methods</strong> (functions). You can access, modify, and use these to make your objects work for you.
      </p>

      {/* Code Parts Explanation */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Working with Object Properties and Methods
        </Typography>
        <CodePartsExplanation 
          code={`const person = new Person("Alice", 30);

// Access properties
console.log(person.name);    // "Alice"
console.log(person.age);     // 30

// Modify properties
person.age = 31;

// Call methods
person.greet();              // "Hello, I'm Alice!"
person.setAge(32);           // Method with parameter`}
          parts={codeParts}
        />
      </Box>

      {/* Interactive Step Through */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Try It Yourself: Object Interaction Patterns
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Explore different ways to work with object properties and methods:
        </Typography>
        
        <InteractiveStepThrough
          codeTemplate={codeTemplate}
          stepsTemplate={stepsTemplate}
          inputConfigs={[
            {
              name: "operation",
              label: "Operation Type",
              options: [
                { label: "Access Properties", value: "access" },
                { label: "Modify Properties", value: "modify" },
                { label: "Use Methods", value: "methods" }
              ],
              defaultValue: "access"
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
              name: "newName",
              label: "New Name (for modify)",
              options: [
                { label: "Alicia", value: "Alicia" },
                { label: "Robert", value: "Robert" },
                { label: "Caroline", value: "Caroline" }
              ],
              defaultValue: "Alicia"
            },
            {
              name: "newAge",
              label: "New Age (for modify)",
              options: [
                { label: "31", value: 31 },
                { label: "32", value: 32 },
                { label: "33", value: 33 }
              ],
              defaultValue: 31
            },
            {
              name: "methodAge",
              label: "Method Age (for methods)",
              options: [
                { label: "28", value: 28 },
                { label: "35", value: 35 },
                { label: "42", value: 42 }
              ],
              defaultValue: 35
            }
          ]}
        />
      </Box>

      <CalloutBox title="Key Property & Method Concepts:" type="key-concepts">
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li><strong>Property Access:</strong> Use dot notation (object.property) to read values</li>
          <li><strong>Property Modification:</strong> Assign new values with object.property = newValue</li>
          <li><strong>Method Execution:</strong> Call methods with parentheses object.method()</li>
          <li><strong>Method Parameters:</strong> Pass data to methods for dynamic behavior</li>
        </ul>
      </CalloutBox>
    </div>
  );
};

export default PropertiesMethodsExample;