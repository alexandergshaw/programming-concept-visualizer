import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';

const CompositionPatternExample: React.FC = () => {
  // Code parts for highlighting different sections
  const codeParts: CodePart[] = [
    {
      label: 'Component Classes',
      part: 'class Engine {\n  start() {\n    return "Engine started";\n  }\n}\n\nclass GPS {\n  navigate(destination) {\n    return `Navigating to ${destination}`;\n  }\n}',
      color: '#e91e63',
      desc: 'Create independent, reusable component classes'
    },
    {
      label: 'Composition Setup',
      part: 'constructor() {\n    this.engine = new Engine();\n    this.gps = new GPS();\n    this.radio = new Radio();\n  }',
      color: '#4caf50',
      desc: 'Compose object by including other objects as properties'
    },
    {
      label: 'Delegate Methods',
      part: 'start() {\n    return this.engine.start();\n  }\n  navigate(destination) {\n    return this.gps.navigate(destination);\n  }',
      color: '#2196f3',
      desc: 'Delegate functionality to composed components'
    },
    {
      label: 'Flexible Configuration',
      part: 'class ElectricCar {\n  constructor() {\n    this.motor = new Motor();\n    this.gps = new GPS();\n    // No radio - different composition\n  }\n}',
      color: '#ff9800',
      desc: 'Different classes can have different combinations of components'
    }
  ];

  // Template for generating executable code
  const codeTemplate = (inputs: Record<string, string | number>) => {
    const carType = inputs.carType as string;
    const includeCustomization = inputs.includeCustomization as string === 'true';
    
    const carConfigs = {
      standard: {
        className: 'StandardCar',
        components: ['engine', 'gps', 'radio'],
        features: ['start', 'navigate', 'playMusic']
      },
      luxury: {
        className: 'LuxuryCar', 
        components: ['engine', 'gps', 'radio', 'massager', 'climateControl'],
        features: ['start', 'navigate', 'playMusic', 'massage', 'adjustClimate']
      },
      electric: {
        className: 'ElectricCar',
        components: ['motor', 'gps', 'battery'],
        features: ['start', 'navigate', 'checkBattery']
      }
    };
    
    const config = carConfigs[carType as keyof typeof carConfigs];
    
    return [`// Composition Pattern - Building objects through HAS-A relationships

// Independent component classes (can be reused)
class Engine {
  start() {
    return "Gasoline engine started - vroom!";
  }
  
  stop() {
    return "Engine stopped";
  }
}

class Motor {
  start() {
    return "Electric motor started - silent and smooth";
  }
  
  stop() {
    return "Motor stopped";
  }
}

class GPS {
  navigate(destination) {
    return \`GPS navigating to \${destination}\`;
  }
  
  getCurrentLocation() {
    return "Current location: Downtown";
  }
}

class Radio {
  playMusic() {
    return "Playing your favorite songs 🎵";
  }
  
  changeStation() {
    return "Changed to jazz station";
  }
}${config.components.includes('massager') ? `

class Massager {
  massage() {
    return "Relaxing massage activated 💆";
  }
}

class ClimateControl {
  adjustClimate(temp) {
    return \`Climate set to \${temp}°F\`;
  }
}` : ''}${config.components.includes('battery') ? `

class Battery {
  checkBattery() {
    return "Battery level: 85% charged ⚡";
  }
  
  charge() {
    return "Charging battery...";
  }
}` : ''}

// Composed class - builds functionality through HAS-A relationships
class ${config.className} {
  constructor() {
    // Composition: this car HAS-A engine, HAS-A gps, etc.${config.components.map(comp => {
      switch(comp) {
        case 'engine': return '\n    this.engine = new Engine();';
        case 'motor': return '\n    this.motor = new Motor();';
        case 'gps': return '\n    this.gps = new GPS();';
        case 'radio': return '\n    this.radio = new Radio();';
        case 'massager': return '\n    this.massager = new Massager();';
        case 'climateControl': return '\n    this.climateControl = new ClimateControl();';
        case 'battery': return '\n    this.battery = new Battery();';
        default: return '';
      }
    }).join('')}
  }
  
  // Delegate methods to composed objects
  start() {
    return this.${config.components.includes('engine') ? 'engine' : 'motor'}.start();
  }
  
  navigate(destination) {
    return this.gps.navigate(destination);
  }${config.components.includes('radio') ? `
  
  playMusic() {
    return this.radio.playMusic();
  }` : ''}${config.components.includes('massager') ? `
  
  massage() {
    return this.massager.massage();
  }` : ''}${config.components.includes('climateControl') ? `
  
  adjustClimate(temp) {
    return this.climateControl.adjustClimate(temp);
  }` : ''}${config.components.includes('battery') ? `
  
  checkBattery() {
    return this.battery.checkBattery();
  }` : ''}
}

// Create and use the composed car
const myCar = new ${config.className}();

console.log("=== ${config.className} Composition Example ===");
console.log("Car created with components:", Object.keys(myCar));

console.log("\\n=== Using Composed Functionality ===");
console.log(myCar.start());
console.log(myCar.navigate("Home"));${config.components.includes('radio') ? `
console.log(myCar.playMusic());` : ''}${config.components.includes('massager') ? `
console.log(myCar.massage());` : ''}${config.components.includes('climateControl') ? `
console.log(myCar.adjustClimate(72));` : ''}${config.components.includes('battery') ? `
console.log(myCar.checkBattery());` : ''}${includeCustomization ? `

// Composition allows easy customization
console.log("\\n=== Composition Flexibility ===");
console.log("Can swap components:");
myCar.gps = new GPS(); // Could be different GPS implementation
console.log("GPS swapped successfully");

console.log("\\nEach component is independent:");
const standaloneGPS = new GPS();
console.log(standaloneGPS.navigate("Coffee Shop"));` : ''}`];
  };

  // Template for generating step-by-step explanation
  const stepsTemplate = (inputs: Record<string, string | number>) => {
    const carType = inputs.carType as string;
    const includeCustomization = inputs.includeCustomization as string === 'true';
    
    const carConfigs = {
      standard: { className: 'StandardCar', components: 'engine, GPS, radio' },
      luxury: { className: 'LuxuryCar', components: 'engine, GPS, radio, massager, climate control' },
      electric: { className: 'ElectricCar', components: 'motor, GPS, battery' }
    };
    
    const config = carConfigs[carType as keyof typeof carConfigs];
    
    const baseSteps = [
      {
        label: "Create Component Classes",
        desc: "Build independent, reusable classes (Engine, GPS, Radio, etc.)",
        highlight: 'class Engine { start() { ... } }\nclass GPS { navigate() { ... } }'
      },
      {
        label: "Compose Main Class",
        desc: `${config.className} contains instances of component classes`,
        highlight: `constructor() {\n  this.engine = new Engine();\n  this.gps = new GPS();\n}`
      },
      {
        label: "Delegate Methods",
        desc: "Main class methods delegate to component methods",
        highlight: 'start() { return this.engine.start(); }\nnavigate() { return this.gps.navigate(); }'
      },
      {
        label: "Create Instance", 
        desc: `Create ${config.className} instance with all components`,
        highlight: `const myCar = new ${config.className}()`
      },
      {
        label: "Use Composed Functionality",
        desc: "Access functionality through delegation to components",
        highlight: 'myCar.start() // delegates to engine\nmyCar.navigate() // delegates to GPS'
      },
      {
        label: "Verify Composition",
        desc: `Car HAS-A ${config.components} (not IS-A relationship)`,
        highlight: `Object.keys(myCar) // shows: [${config.components}]`
      }
    ];
    
    if (includeCustomization) {
      baseSteps.push({
        label: "Demonstrate Flexibility",
        desc: "Components can be swapped or used independently",
        highlight: 'myCar.gps = new DifferentGPS(); // swap components\nnew GPS().navigate("Anywhere"); // use independently'
      });
    }
    
    return baseSteps;
  };

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        <strong>Composition Pattern</strong> builds objects using "HAS-A" relationships. Use it when you can say "X has a Y" - a Car HAS-A Engine, a Phone HAS-A Camera. More flexible than inheritance.
      </p>

      {/* Code Parts Explanation */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Building Objects Through Composition
        </Typography>
        <CodePartsExplanation 
          code={`// Create reusable component classes
class Engine {
  start() {
    return "Engine started";
  }
}

class GPS {
  navigate(destination) {
    return \`Navigating to \${destination}\`;
  }
}

class Radio {
  playMusic() {
    return "Playing music 🎵";
  }
}

// Compose a car using HAS-A relationships
class Car {
  constructor() {
    this.engine = new Engine();  // Car HAS-A Engine
    this.gps = new GPS();        // Car HAS-A GPS
    this.radio = new Radio();    // Car HAS-A Radio
  }
  
  // Delegate to components
  start() {
    return this.engine.start();
  }
  
  navigate(destination) {
    return this.gps.navigate(destination);
  }
  
  playMusic() {
    return this.radio.playMusic();
  }
}

// Different cars can have different compositions
class ElectricCar {
  constructor() {
    this.motor = new Motor();    // Different engine type
    this.gps = new GPS();        // Same GPS
    this.battery = new Battery(); // Different additional component
    // No radio - different composition!
  }
}`}
          parts={codeParts}
        />
      </Box>

      {/* Interactive Step Through */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Try It Yourself: Build Different Car Compositions
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Create different types of cars using composition with various components:
        </Typography>
        
        <InteractiveStepThrough
          codeTemplate={codeTemplate}
          stepsTemplate={stepsTemplate}
          inputConfigs={[
            {
              name: "carType",
              label: "Car Type",
              options: [
                { label: "Standard Car (Engine, GPS, Radio)", value: "standard" },
                { label: "Luxury Car (+ Massager, Climate)", value: "luxury" },
                { label: "Electric Car (Motor, GPS, Battery)", value: "electric" }
              ],
              defaultValue: "standard"
            },
            {
              name: "includeCustomization",
              label: "Show Composition Flexibility",
              options: [
                { label: "Yes (demonstrate swapping components)", value: "true" },
                { label: "No (basic composition only)", value: "false" }
              ],
              defaultValue: "true"
            }
          ]}
        />
      </Box>

      {/* Key Concepts */}
      <Box sx={{ 
        p: 2, 
        bgcolor: '#f5f5f5', 
        borderRadius: 1, 
        border: '1px solid #ddd',
        mt: 3 
      }}>
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          🔑 When to Use Composition:
        </Typography>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li><strong>Mix & match:</strong> Different objects need different combinations of features</li>
          <li><strong>Easy swapping:</strong> Want to change parts without affecting the whole</li>
          <li><strong>Reuse components:</strong> Same parts used in multiple different objects</li>
          <li><strong>Avoid complexity:</strong> Inheritance chains getting too deep or confusing</li>
        </ul>
      </Box>
    </div>
  );
};

export default CompositionPatternExample;