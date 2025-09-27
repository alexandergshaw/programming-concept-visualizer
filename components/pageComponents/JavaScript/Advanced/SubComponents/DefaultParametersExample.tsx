import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import CalloutBox from '@/components/common/CalloutBox';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DefaultParametersExample: React.FC = () => {
  // Code parts for highlighting different sections
  const codeParts: CodePart[] = [
    {
      label: 'Default Value Syntax',
      part: 'function createUser(name = "Anonymous", role = "user")',
      color: '#e91e63',
      desc: 'Use = operator to assign default values to parameters'
    },
    {
      label: 'Parameter Check',
      part: 'if (name === undefined) { name = "Anonymous"; }',
      color: '#4caf50',
      desc: 'Default parameters automatically handle undefined arguments'
    },
    {
      label: 'Complex Defaults',
      part: 'timestamp = new Date().toISOString()',
      color: '#2196f3',
      desc: 'Default values can be expressions, function calls, or calculations'
    },
    {
      label: 'Partial Arguments',
      part: 'createUser("Alice")',
      color: '#ff9800',
      desc: 'Omitted arguments use defaults, provided arguments override defaults'
    }
  ];

  // Template for generating executable code
  const codeTemplate = (inputs: Record<string, string | number>) => {
    const functionType = inputs.functionType as string;
    const userName = inputs.userName as string;
    const userRole = inputs.userRole as string;
    
    const examples = {
      basic: `// Basic default parameters
function createUser(name = "Anonymous", role = "user", active = true) {
  return {
    name: name,
    role: role,
    active: active,
    id: Math.random().toString(36).substr(2, 9)
  };
}

console.log("=== Testing Default Parameters ===");

// No arguments - all defaults used
console.log("No args:", createUser());

// Partial arguments - mix of provided and defaults
console.log("Name only:", createUser("${userName}"));

// All arguments provided - no defaults used  
console.log("All args:", createUser("${userName}", "${userRole}", false));

// Skip middle parameter using undefined
console.log("Skip role:", createUser("${userName}", undefined, false));`,

      advanced: `// Advanced default parameters with expressions
function generateReport(
  title = "Monthly Report",
  date = new Date().toLocaleDateString(),
  author = getCurrentUser(),
  options = { format: 'pdf', pages: 10 }
) {
  return {
    title,
    date,
    author,
    options,
    generated: new Date().toISOString()
  };
}

// Helper function for default parameter
function getCurrentUser() {
  return "${userName} (Current User)";
}

console.log("=== Advanced Default Parameters ===");

// All defaults (including function call and object)
console.log("All defaults:", generateReport());

// Override some parameters
console.log("Custom title:", generateReport("${userRole} Report"));

// Override with different options object
console.log("Custom options:", generateReport(
  "Custom Report", 
  undefined, 
  "${userName}", 
  { format: 'html', pages: 5 }
));`,

      conditional: `// Default parameters with conditional logic
function processOrder(
  items = [],
  shippingSpeed = "standard",
  discount = items.length > 5 ? 0.1 : 0,
  tax = calculateTax()
) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const discountAmount = subtotal * discount;
  const taxAmount = (subtotal - discountAmount) * tax;
  
  return {
    items: items.length,
    subtotal: subtotal,
    discount: discountAmount,
    tax: taxAmount,
    total: subtotal - discountAmount + taxAmount,
    shipping: shippingSpeed
  };
}

function calculateTax() {
  return 0.08; // 8% tax rate
}

// Sample items
const sampleItems = [
  { name: "Item 1", price: 10 },
  { name: "Item 2", price: 15 },
  { name: "Item 3", price: 20 }
];

const manyItems = Array(7).fill().map((_, i) => ({ 
  name: \`Item \${i+1}\`, 
  price: 10 + i 
}));

console.log("=== Conditional Default Parameters ===");

// Empty order - all defaults
console.log("Empty order:", processOrder());

// Small order - no bulk discount
console.log("Small order:", processOrder(sampleItems));

// Large order - automatic bulk discount
console.log("Large order:", processOrder(manyItems, "express"));`
    };
    
    return [examples[functionType as keyof typeof examples]];
  };

  // Template for generating step-by-step explanation
  const stepsTemplate = (inputs: Record<string, string | number>) => {
    const functionType = inputs.functionType as string;
    const userName = inputs.userName as string;
    const userRole = inputs.userRole as string;
    
    if (functionType === 'basic') {
      return [
        {
          label: "Define Function with Defaults",
          desc: "Set default values using = syntax in parameter list",
          highlight: 'function createUser(name = "Anonymous", role = "user", active = true)'
        },
        {
          label: "Call with No Arguments",
          desc: "All parameters use their default values",
          highlight: 'createUser() // name="Anonymous", role="user", active=true'
        },
        {
          label: "Call with Some Arguments",
          desc: `Provided arguments override defaults: name="${userName}"`,
          highlight: `createUser("${userName}") // name="${userName}", role="user", active=true`
        },
        {
          label: "Skip Parameters with undefined",
          desc: "Use undefined to skip parameters and use defaults",
          highlight: `createUser("${userName}", undefined, false) // skip role, use default`
        },
        {
          label: "Return Constructed Object",
          desc: "Function returns object with provided + default values",
          highlight: `{ name: "${userName}", role: "user", active: false, id: "..." }`
        }
      ];
    }
    
    if (functionType === 'advanced') {
      return [
        {
          label: "Advanced Default Expressions",
          desc: "Defaults can be function calls, expressions, or objects",
          highlight: 'date = new Date().toLocaleDateString(), author = getCurrentUser()'
        },
        {
          label: "Function Call Default",
          desc: "getCurrentUser() function called when author parameter not provided",
          highlight: `getCurrentUser() returns "${userName} (Current User)"`
        },
        {
          label: "Object Default",
          desc: "Default parameter can be an entire object with properties",
          highlight: 'options = { format: "pdf", pages: 10 }'
        },
        {
          label: "Mix Provided & Defaults",
          desc: "Override some parameters while others use defaults",
          highlight: `generateReport("${userRole} Report") // custom title, other defaults`
        },
        {
          label: "Generated Report Object",
          desc: "Function combines provided arguments with computed defaults",
          highlight: `{ title: "${userRole} Report", date: "today", author: "${userName}..." }`
        }
      ];
    }
    
    if (functionType === 'conditional') {
      return [
        {
          label: "Conditional Default Logic",
          desc: "Default values can depend on other parameters or calculations",
          highlight: 'discount = items.length > 5 ? 0.1 : 0'
        },
        {
          label: "Empty Order Processing",
          desc: "All defaults used: empty array, standard shipping, no discount",
          highlight: 'processOrder() // items=[], discount=0, tax=0.08'
        },
        {
          label: "Small Order (3 items)",
          desc: "No bulk discount applied since items.length <= 5",
          highlight: 'items.length = 3, so discount = 0 (no bulk discount)'
        },
        {
          label: "Large Order (7+ items)",
          desc: "Bulk discount automatically applied since items.length > 5",
          highlight: 'items.length = 7, so discount = 0.1 (10% bulk discount)'
        },
        {
          label: "Calculate Final Totals",
          desc: "Process order with subtotal, discount, tax, and total",
          highlight: 'total = subtotal - discount + tax'
        }
      ];
    }
    
    return [];
  };

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        <strong>Default Parameters</strong> let you specify fallback values that are used when arguments are omitted or undefined. This makes functions more flexible and eliminates the need for manual parameter checking.
      </p>

      {/* Code Parts Explanation */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          How Default Parameters Work
        </Typography>
        <CodePartsExplanation 
          code={`// Instead of manual checking:
function oldWay(name, role) {
  if (name === undefined) name = "Anonymous";
  if (role === undefined) role = "user";
  // ... rest of function
}

// Use default parameters:
function newWay(name = "Anonymous", role = "user", timestamp = new Date()) {
  return { name, role, timestamp };
}

// Call with any number of arguments
newWay();                    // All defaults
newWay("Alice");             // Name provided, role default
newWay("Bob", "admin");      // Both provided
newWay("Carol", undefined, customDate); // Skip role parameter`}
          parts={codeParts}
        />
      </Box>

      {/* Interactive Step Through */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Try It Yourself: Default Parameter Patterns
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Explore different ways to use default parameters effectively:
        </Typography>
        
        <InteractiveStepThrough
          codeTemplate={codeTemplate}
          stepsTemplate={stepsTemplate}
          inputConfigs={[
            {
              name: "functionType",
              label: "Example Type",
              options: [
                { label: "Basic Defaults", value: "basic" },
                { label: "Advanced Expressions", value: "advanced" },
                { label: "Conditional Logic", value: "conditional" }
              ],
              defaultValue: "basic"
            },
            {
              name: "userName", 
              label: "User Name",
              options: [
                { label: "Alice", value: "Alice" },
                { label: "Bob", value: "Bob" },
                { label: "Carol", value: "Carol" },
                { label: "David", value: "David" }
              ],
              defaultValue: "Alice"
            },
            {
              name: "userRole",
              label: "User Role",
              options: [
                { label: "Admin", value: "admin" },
                { label: "Editor", value: "editor" },
                { label: "Manager", value: "manager" },
                { label: "Analyst", value: "analyst" }
              ],
              defaultValue: "admin"
            }
          ]}
        />
      </Box>

      <CalloutBox title="Key Default Parameter Concepts" type="key-concepts">
        <Box component="ul" sx={{ margin: 0, paddingLeft: 3, '& li': { marginBottom: 1.5, color: '#475569' } }}>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>= syntax:</Typography> Use equals sign to assign default values in parameter list</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>undefined triggers defaults:</Typography> Only undefined (not null or false) uses defaults</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Expression defaults:</Typography> Defaults can be function calls, calculations, or objects</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Skip with undefined:</Typography> Pass undefined to skip parameters and use defaults</li>
        </Box>
      </CalloutBox>
    </div>
  );
};

export default DefaultParametersExample;