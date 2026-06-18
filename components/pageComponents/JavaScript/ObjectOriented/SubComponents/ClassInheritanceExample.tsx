import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import CalloutBox from '@/components/common/CalloutBox';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ClassInheritanceExample: React.FC = () => {
  // Code parts for highlighting different sections
  const codeParts: CodePart[] = [
    {
      label: 'Parent Class',
      part: 'class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n  speak() {\n    return `${this.name} makes a sound`;\n  }\n}',
      color: 'var(--feature)',
      desc: 'Define the base class with common properties and methods'
    },
    {
      label: 'Child Class Declaration',
      part: 'class Dog extends Animal',
      color: 'var(--success)',
      desc: 'Use extends keyword to create inheritance relationship'
    },
    {
      label: 'Super Constructor Call',
      part: 'super(name)',
      color: 'var(--info)',
      desc: 'Call parent constructor to initialize inherited properties'
    },
    {
      label: 'Method Override',
      part: 'speak() {\n    return `${this.name} barks loudly!`;\n  }',
      color: 'var(--warning)',
      desc: 'Override parent method to provide specialized behavior'
    }
  ];

  // Template for generating executable code
  const codeTemplate = (inputs: Record<string, string | number>) => {
    const animalType = inputs.animalType as string;
    const animalName = inputs.animalName as string;
    const includeOverride = inputs.includeOverride as string === 'true';
    
    const animals = {
      dog: {
        className: 'Dog',
        sound: 'barks loudly',
        additionalProp: 'breed',
        additionalValue: '"Golden Retriever"'
      },
      cat: {
        className: 'Cat',
        sound: 'meows softly', 
        additionalProp: 'indoor',
        additionalValue: 'true'
      },
      bird: {
        className: 'Bird',
        sound: 'chirps melodiously',
        additionalProp: 'canFly',
        additionalValue: 'true'
      }
    };
    
    const config = animals[animalType as keyof typeof animals];
    
    return [`// Define the parent Animal class
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return \`\${this.name} makes a sound\`;
  }
  
  getInfo() {
    return \`This is \${this.name}\`;
  }
}

// Create child class that extends Animal
class ${config.className} extends Animal {
  constructor(name, ${config.additionalProp}) {
    super(name); // Call parent constructor
    this.${config.additionalProp} = ${config.additionalProp};
  }${includeOverride ? `
  
  // Override parent method with specialized behavior
  speak() {
    return \`\${this.name} ${config.sound}!\`;
  }` : ''}
}

// Create instance and test inheritance
const my${config.className} = new ${config.className}("${animalName}", ${config.additionalValue});

console.log("=== Testing Inheritance ===");
console.log("Name:", my${config.className}.name);           // Inherited property
console.log("${config.additionalProp}:", my${config.className}.${config.additionalProp});     // Own property
console.log("getInfo():", my${config.className}.getInfo()); // Inherited method
console.log("speak():", my${config.className}.speak());     // ${includeOverride ? 'Overridden' : 'Inherited'} method

// Check inheritance chain
console.log("\\n=== Inheritance Chain ===");
console.log("Is Animal?", my${config.className} instanceof Animal);
console.log("Is ${config.className}?", my${config.className} instanceof ${config.className});`];
  };

  // Template for generating step-by-step explanation
  const stepsTemplate = (inputs: Record<string, string | number>) => {
    const animalType = inputs.animalType as string;
    const animalName = inputs.animalName as string;
    const includeOverride = inputs.includeOverride as string === 'true';
    
    const animals = {
      dog: { className: 'Dog', sound: 'barks loudly' },
      cat: { className: 'Cat', sound: 'meows softly' },
      bird: { className: 'Bird', sound: 'chirps melodiously' }
    };
    
    const config = animals[animalType as keyof typeof animals];
    
    return [
      {
        label: "Define Parent Class",
        desc: "Create Animal class with common properties and methods",
        highlight: 'class Animal { constructor(name) { this.name = name; } }'
      },
      {
        label: "Create Child Class",
        desc: `${config.className} extends Animal using 'extends' keyword`,
        highlight: `class ${config.className} extends Animal`
      },
      {
        label: "Call Super Constructor",
        desc: "Use super() to initialize parent class properties",
        highlight: 'super(name)'
      },
      {
        label: includeOverride ? "Override Method" : "Inherit Methods",
        desc: includeOverride 
          ? `Override speak() method with specialized ${config.className.toLowerCase()} behavior`
          : "Child class automatically inherits all parent methods",
        highlight: includeOverride 
          ? `speak() { return \`\${this.name} ${config.sound}!\`; }`
          : 'getInfo(), speak() // inherited methods'
      },
      {
        label: "Create Instance",
        desc: `Create new ${config.className} instance named "${animalName}"`,
        highlight: `const my${config.className} = new ${config.className}("${animalName}", ...)`
      },
      {
        label: "Test Inheritance",
        desc: "Access inherited properties, own properties, and methods",
        highlight: `my${config.className}.name // inherited\nmy${config.className}.speak() // ${includeOverride ? 'overridden' : 'inherited'}`
      }
    ];
  };

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        <strong>Class Inheritance</strong> creates parent-child relationships between classes. The child gets everything from the parent automatically, plus you can add new features or change existing ones.
      </p>

      {/* Code Parts Explanation */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Building Class Hierarchies with Inheritance
        </Typography>
        <CodePartsExplanation 
          code={`// Parent class defines common structure
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return \`\${this.name} makes a sound\`;
  }
}

// Child class extends parent
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }
  
  // Override parent method
  speak() {
    return \`\${this.name} barks loudly!\`;
  }
}`}
          parts={codeParts}
        />
      </Box>

      {/* Interactive Step Through */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Try It Yourself: Create an Inheritance Hierarchy
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Build different animal classes that inherit from a base Animal class:
        </Typography>
        
        <InteractiveStepThrough
          codeTemplate={codeTemplate}
          stepsTemplate={stepsTemplate}
          inputConfigs={[
            {
              name: "animalType",
              label: "Animal Type",
              options: [
                { label: "Dog", value: "dog" },
                { label: "Cat", value: "cat" },
                { label: "Bird", value: "bird" }
              ],
              defaultValue: "dog"
            },
            {
              name: "animalName", 
              label: "Animal Name",
              options: [
                { label: "Buddy", value: "Buddy" },
                { label: "Max", value: "Max" },
                { label: "Bella", value: "Bella" },
                { label: "Charlie", value: "Charlie" }
              ],
              defaultValue: "Buddy"
            },
            {
              name: "includeOverride",
              label: "Override speak() Method",
              options: [
                { label: "Yes (specialized behavior)", value: "true" },
                { label: "No (inherit parent method)", value: "false" }
              ],
              defaultValue: "true"
            }
          ]}
        />
      </Box>

      <CalloutBox title="Key Inheritance Concepts:" type="key-concepts">
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li><strong>extends keyword:</strong> Creates inheritance relationship between classes</li>
          <li><strong>super() call:</strong> Invokes parent constructor to initialize inherited properties</li>
          <li><strong>Method Override:</strong> Child classes can redefine parent methods with specialized behavior</li>
          <li><strong>instanceof operator:</strong> Check if object is instance of a particular class or its parents</li>
        </ul>
      </CalloutBox>
    </div>
  );
};

export default ClassInheritanceExample;