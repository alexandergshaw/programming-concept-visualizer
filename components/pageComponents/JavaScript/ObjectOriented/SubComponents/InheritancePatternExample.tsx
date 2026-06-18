import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';

const InheritancePatternExample: React.FC = () => {
  // Code parts for highlighting different sections
  const codeParts: CodePart[] = [
    {
      label: 'Base Class',
      part: 'class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n  eat() {\n    return `${this.name} is eating`;\n  }\n}',
      color: 'var(--feature)',
      desc: 'Define the common behavior that all animals share'
    },
    {
      label: 'Inheritance Chain',
      part: 'class Mammal extends Animal {\n  constructor(name, furColor) {\n    super(name);\n    this.furColor = furColor;\n  }\n  nurse() {\n    return `${this.name} is nursing babies`;\n  }\n}',
      color: 'var(--success)', 
      desc: 'Add mammal-specific properties and behaviors'
    },
    {
      label: 'Specialized Class',
      part: 'class Dog extends Mammal {\n  constructor(name, furColor, breed) {\n    super(name, furColor);\n    this.breed = breed;\n  }\n  bark() {\n    return `${this.name} barks: Woof!`;\n  }\n}',
      color: 'var(--info)',
      desc: 'Create highly specialized behavior for dogs'
    },
    {
      label: 'Polymorphism',
      part: 'animals.forEach(animal => animal.eat())',
      color: 'var(--warning)',
      desc: 'Treat all animals uniformly through shared interface'
    }
  ];

  // Template for generating executable code
  const codeTemplate = (inputs: Record<string, string | number>) => {
    const includePolymorphism = inputs.includePolymorphism as string === 'true';
    const animalName = inputs.animalName as string;
    
    return [`// Inheritance Pattern - Building hierarchies through IS-A relationships

// Base class defines common behavior
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  eat() {
    return \`\${this.name} is eating\`;
  }
  
  sleep() {
    return \`\${this.name} is sleeping\`;
  }
}

// Intermediate class adds mammal-specific behavior
class Mammal extends Animal {
  constructor(name, furColor) {
    super(name);
    this.furColor = furColor;
  }
  
  nurse() {
    return \`\${this.name} is nursing babies\`;
  }
  
  regulate() {
    return \`\${this.name} regulates body temperature\`;
  }
}

// Specialized class for dogs
class Dog extends Mammal {
  constructor(name, furColor, breed) {
    super(name, furColor);
    this.breed = breed;
  }
  
  bark() {
    return \`\${this.name} barks: Woof!\`;
  }
  
  wagTail() {
    return \`\${this.name} wags tail happily\`;
  }
}

// Create instances
const myDog = new Dog("${animalName}", "golden", "Retriever");

console.log("=== Inheritance Chain Example ===");
console.log("Dog instance:", myDog);
console.log("Name:", myDog.name);
console.log("Breed:", myDog.breed);
console.log("Fur Color:", myDog.furColor);

console.log("\\n=== Inherited Methods ===");
console.log(myDog.eat());        // From Animal class
console.log(myDog.nurse());      // From Mammal class  
console.log(myDog.bark());       // From Dog class

console.log("\\n=== Inheritance Checks ===");
console.log("Is Dog?", myDog instanceof Dog);
console.log("Is Mammal?", myDog instanceof Mammal);
console.log("Is Animal?", myDog instanceof Animal);${includePolymorphism ? `

// Polymorphism example
const animals = [
  new Dog("Buddy", "brown", "Lab"),
  new Animal("Generic"),
  new Mammal("Fuzzy", "gray")
];

console.log("\\n=== Polymorphism ===");
animals.forEach(animal => {
  console.log(animal.eat()); // All can eat
  if (animal instanceof Mammal) {
    console.log(animal.nurse()); // Only mammals can nurse
  }
  if (animal instanceof Dog) {
    console.log(animal.bark()); // Only dogs can bark
  }
});` : ''}`];
  };

  // Template for generating step-by-step explanation
  const stepsTemplate = (inputs: Record<string, string | number>) => {
    const includePolymorphism = inputs.includePolymorphism as string === 'true';
    const animalName = inputs.animalName as string;
    
    const baseSteps = [
      {
        label: "Define Base Class",
        desc: "Animal class defines common behavior (eat, sleep)",
        highlight: 'class Animal { eat() { ... } sleep() { ... } }'
      },
      {
        label: "Create Inheritance Chain",
        desc: "Mammal extends Animal, adding mammal-specific methods",
        highlight: 'class Mammal extends Animal { nurse() { ... } }'
      },
      {
        label: "Specialize Further",
        desc: "Dog extends Mammal, adding dog-specific behavior",
        highlight: 'class Dog extends Mammal { bark() { ... } wagTail() { ... } }'
      },
      {
        label: "Create Instance",
        desc: `Create Dog instance "${animalName}" with all inherited properties`,
        highlight: `new Dog("${animalName}", "golden", "Retriever")`
      },
      {
        label: "Access Inherited Methods",
        desc: "Dog can use methods from all parent classes",
        highlight: `${animalName}.eat() // from Animal\n${animalName}.nurse() // from Mammal\n${animalName}.bark() // from Dog`
      },
      {
        label: "Verify Inheritance",
        desc: "instanceof checks confirm inheritance relationships",
        highlight: `${animalName} instanceof Dog // true\n${animalName} instanceof Animal // true`
      }
    ];
    
    if (includePolymorphism) {
      baseSteps.push({
        label: "Demonstrate Polymorphism",
        desc: "Treat different animals uniformly through shared interface",
        highlight: 'animals.forEach(animal => animal.eat()) // all animals can eat'
      });
    }
    
    return baseSteps;
  };

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        <strong>Inheritance Pattern</strong> builds class hierarchies using "IS-A" relationships. Use it when you can say "X is a type of Y" - a Dog IS-A Animal, a Car IS-A Vehicle.
      </p>

      {/* Code Parts Explanation */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Building Class Hierarchies with Inheritance
        </Typography>
        <CodePartsExplanation 
          code={`// Create a clear inheritance hierarchy
class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() {
    return \`\${this.name} is eating\`;
  }
}

class Mammal extends Animal {
  constructor(name, furColor) {
    super(name);
    this.furColor = furColor;
  }
  nurse() {
    return \`\${this.name} is nursing babies\`;
  }
}

class Dog extends Mammal {
  constructor(name, furColor, breed) {
    super(name, furColor);
    this.breed = breed;
  }
  bark() {
    return \`\${this.name} barks: Woof!\`;
  }
}

// Polymorphism - treat all as animals
const animals = [new Dog("Buddy"), new Animal("Fluffy")];
animals.forEach(animal => animal.eat()); // Works for all`}
          parts={codeParts}
        />
      </Box>

      {/* Interactive Step Through */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Try It Yourself: Build an Inheritance Hierarchy
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Create a multi-level inheritance chain and explore polymorphism:
        </Typography>
        
        <InteractiveStepThrough
          codeTemplate={codeTemplate}
          stepsTemplate={stepsTemplate}
          inputConfigs={[
            {
              name: "animalName",
              label: "Dog Name",
              options: [
                { label: "Buddy", value: "Buddy" },
                { label: "Max", value: "Max" },
                { label: "Bella", value: "Bella" },
                { label: "Charlie", value: "Charlie" }
              ],
              defaultValue: "Buddy"
            },
            {
              name: "includePolymorphism",
              label: "Include Polymorphism Example",
              options: [
                { label: "Yes (show polymorphism)", value: "true" },
                { label: "No (basic inheritance only)", value: "false" }
              ],
              defaultValue: "true"
            }
          ]}
        />
      </Box>

      {/* Key Concepts */}
      <Box sx={{ 
        p: 2, 
        bgcolor: 'var(--paper-raised)', 
        borderRadius: 1, 
        border: '1px solid var(--line)',
        mt: 3 
      }}>
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          🔑 When to Use Inheritance:
        </Typography>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li><strong>Clear IS-A relationship:</strong> Dog IS-A Animal, Button IS-A UIElement</li>
          <li><strong>Shared behavior:</strong> Multiple classes need the same basic methods</li>
          <li><strong>Natural hierarchy:</strong> Real-world categories that make sense</li>
          <li><strong>Consistent interface:</strong> All subclasses should work the same way</li>
        </ul>
      </Box>
    </div>
  );
};

export default InheritancePatternExample;