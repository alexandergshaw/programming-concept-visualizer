import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';

const AdvancedParametersExample: React.FC = () => {
  // Code parts for highlighting different sections
  const codeParts: CodePart[] = [
    {
      label: 'Destructured Parameters',
      part: 'function createProject({ name, type = "web", ...options })',
      color: '#e91e63',
      desc: 'Destructure object parameters with defaults and rest'
    },
    {
      label: 'Mixed Parameter Types',
      part: 'function processData(required, optional = "default", ...extras)',
      color: '#4caf50',
      desc: 'Combine required, default, and rest parameters'
    },
    {
      label: 'Spread in Calls',
      part: 'processData("value", ...arrayArgs)',
      color: '#2196f3',
      desc: 'Use spread to pass array elements as arguments'
    },
    {
      label: 'Dynamic Defaults',
      part: 'timestamp = new Date(), id = generateId()',
      color: '#ff9800',
      desc: 'Default parameters can be function calls or expressions'
    }
  ];

  // Template for generating executable code
  const codeTemplate = (inputs: Record<string, string | number>) => {
    const patternType = inputs.patternType as string;
    const projectName = inputs.projectName as string;
    
    const examples = {
      destructured: `// Advanced: Destructured Object Parameters
function createProject({
  name,
  type = "web",
  framework = "vanilla",
  features = [],
  ...additionalOptions
}) {
  // Generate unique ID and timestamp
  const id = Math.random().toString(36).substr(2, 9);
  const created = new Date().toISOString();
  
  return {
    id,
    name,
    type,
    framework,
    features: [...features], // Copy features array
    ...additionalOptions,    // Spread additional options
    created,
    status: 'initialized'
  };
}

console.log("=== Destructured Parameters ===");

// Call with object - keys can be in any order
const project1 = createProject({
  name: "${projectName}",
  type: "mobile",
  features: ["auth", "api"]
});
console.log("Mobile project:", project1);

// Additional properties spread into result
const project2 = createProject({
  name: "Advanced ${projectName}",
  framework: "react",
  version: "2.1.0",
  repository: "github.com/user/repo",
  license: "MIT"
});
console.log("Advanced project:", project2);`,

      mixed: `// Advanced: Mixed Parameter Patterns
function analyzeData(
  dataSource,                    // Required parameter
  analysisType = "basic",       // Default parameter
  options = { verbose: false }, // Default object parameter
  ...processors                 // Rest parameters for processors
) {
  console.log("Data source:", dataSource);
  console.log("Analysis type:", analysisType);
  console.log("Options:", options);
  console.log("Processors:", processors);
  
  // Simulate processing with each processor
  const results = processors.map((processor, index) => {
    return {
      processor: processor,
      order: index + 1,
      result: \`Processed \${dataSource} with \${processor}\`,
      timestamp: new Date().toLocaleTimeString()
    };
  });
  
  return {
    source: dataSource,
    type: analysisType,
    options: { ...options },
    processedBy: processors,
    results: results,
    summary: {
      totalProcessors: processors.length,
      completed: true,
      analysisTime: new Date().toISOString()
    }
  };
}

console.log("=== Mixed Parameters ===");

// Basic call with minimal arguments
const analysis1 = analyzeData("${projectName} Data");
console.log("Basic analysis:", analysis1);

// Call with some defaults overridden
const analysis2 = analyzeData(
  "${projectName} Dataset",
  "advanced",
  { verbose: true, includeMetrics: true }
);
console.log("Advanced analysis:", analysis2);

// Call with rest parameters
const processors = ["validator", "transformer", "aggregator"];
const analysis3 = analyzeData(
  "${projectName} Big Data",
  "comprehensive",
  { verbose: true, parallel: true },
  ...processors  // Spread array as rest parameters
);
console.log("Comprehensive analysis:", analysis3);`,

      dynamic: `// Advanced: Dynamic Defaults and Complex Patterns
function createSession({
  userId,
  sessionId = generateSessionId(),
  startTime = new Date(),
  expiresIn = 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  permissions = getUserPermissions(userId),
  ...sessionData
} = {}) {  // Default to empty object if no argument provided
  
  const expirationTime = new Date(startTime.getTime() + expiresIn);
  
  return {
    userId: userId || 'anonymous',
    sessionId,
    startTime: startTime.toISOString(),
    expirationTime: expirationTime.toISOString(),
    permissions: [...permissions],
    isActive: true,
    ...sessionData
  };
}

// Helper functions for dynamic defaults
function generateSessionId() {
  return 'sess_' + Math.random().toString(36).substr(2, 12);
}

function getUserPermissions(userId) {
  // Simulate getting user permissions
  const permissionSets = {
    'admin': ['read', 'write', 'delete', 'manage'],
    'editor': ['read', 'write'],
    'viewer': ['read']
  };
  
  return permissionSets[userId] || ['read'];
}

console.log("=== Dynamic Defaults ===");

// Call with no arguments - uses all defaults
const session1 = createSession();
console.log("Anonymous session:", session1);

// Call with user ID - dynamic permissions
const session2 = createSession({ userId: 'admin' });
console.log("Admin session:", session2);

// Call with custom data spread in
const session3 = createSession({
  userId: 'editor',
  expiresIn: 2 * 60 * 60 * 1000, // 2 hours
  clientInfo: { browser: 'Chrome', os: 'Windows' },
  theme: 'dark',
  language: 'en'
});
console.log("Custom session:", session3);

// Demonstrate function call defaults
console.log("\n=== Function Call Defaults ===");
for (let i = 0; i < 3; i++) {
  const session = createSession({ userId: \`user\${i}\` });
  console.log(\`Session \${i + 1} ID:", session.sessionId);
}`
    };
    
    return [examples[patternType as keyof typeof examples]];
  };

  // Template for generating step-by-step explanation
  const stepsTemplate = (inputs: Record<string, string | number>) => {
    const patternType = inputs.patternType as string;
    const projectName = inputs.projectName as string;
    
    if (patternType === 'destructured') {
      return [
        {
          label: "Destructured Object Parameters",
          desc: "Extract properties from object argument with defaults and rest",
          highlight: 'function createProject({ name, type = "web", ...additionalOptions })'
        },
        {
          label: "Object Argument Passed",
          desc: `Object with name "${projectName}" and additional properties`,
          highlight: `{ name: "${projectName}", type: "mobile", features: ["auth", "api"] }`
        },
        {
          label: "Properties Extracted",
          desc: "Destructuring extracts name, type, features; rest goes to additionalOptions",
          highlight: `name="${projectName}", type="mobile", features=["auth", "api"]`
        },
        {
          label: "Spread Additional Options",
          desc: "Rest properties spread into final result object",
          highlight: '...additionalOptions // includes version, repository, license'
        },
        {
          label: "Return Combined Object",
          desc: "Function returns object with extracted + additional properties",
          highlight: `{ id: "abc123", name: "${projectName}", type: "mobile", ... }`
        }
      ];
    }
    
    if (patternType === 'mixed') {
      return [
        {
          label: "Mixed Parameter Types",
          desc: "Required + default + rest parameters in one function",
          highlight: 'function analyzeData(dataSource, analysisType="basic", options={}, ...processors)'
        },
        {
          label: "Arguments Processing",
          desc: `Required: "${projectName} Data", defaults used for others`,
          highlight: `dataSource="${projectName} Data", analysisType="basic", processors=[]`
        },
        {
          label: "Spread Array as Arguments",
          desc: "Array spread into individual rest parameters",
          highlight: '...processors becomes "validator", "transformer", "aggregator"'
        },
        {
          label: "Rest Collection",
          desc: "Individual arguments collected back into processors array",
          highlight: 'processors = ["validator", "transformer", "aggregator"]'
        },
        {
          label: "Process Results",
          desc: "Map over processors array to generate results",
          highlight: 'processors.map(processor => ({ processor, result: ... }))'
        }
      ];
    }
    
    if (patternType === 'dynamic') {
      return [
        {
          label: "Dynamic Default Functions",
          desc: "Default parameters call functions when needed",
          highlight: 'sessionId = generateSessionId(), permissions = getUserPermissions(userId)'
        },
        {
          label: "Function Calls Executed",
          desc: "Default functions called only when parameters not provided",
          highlight: 'generateSessionId() → "sess_abc123def456", getUserPermissions("admin")'
        },
        {
          label: "Conditional Defaults",
          desc: "Permissions based on userId parameter value",
          highlight: 'userId="admin" → permissions=["read", "write", "delete", "manage"]'
        },
        {
          label: "Default to Empty Object",
          desc: "Entire parameter object defaults to {} if no argument provided",
          highlight: '} = {} // allows createSession() with no arguments'
        },
        {
          label: "Computed Properties",
          desc: "Calculate expiration time from startTime + expiresIn",
          highlight: 'expirationTime = new Date(startTime.getTime() + expiresIn)'
        }
      ];
    }
    
    return [];
  };

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        <strong>Advanced Parameter Patterns</strong> combine defaults, destructuring, rest, and spread to create highly flexible function interfaces that can handle complex use cases elegantly.
      </p>

      {/* Code Parts Explanation */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Combining All Parameter Techniques
        </Typography>
        <CodePartsExplanation 
          code={`// All techniques together:
function advancedFunction(
  required,                           // Required parameter
  optional = "default",              // Default parameter
  { name, type = "web", ...options } = {}, // Destructured with defaults
  ...rest                            // Rest parameters
) {
  // Dynamic defaults with function calls
  const id = generateId();
  const timestamp = new Date();
  
  return {
    required,
    optional,
    name,
    type,
    ...options,  // Spread destructured rest
    rest,        // Rest parameters array
    id,
    timestamp
  };
}

// Call with spread and mixed arguments
const result = advancedFunction(
  "value",
  undefined,  // Use default
  { name: "test", extra: "data" },
  ...arrayArgs
);`}
          parts={codeParts}
        />
      </Box>

      {/* Interactive Step Through */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Try It Yourself: Advanced Parameter Patterns
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Explore sophisticated parameter techniques used in real applications:
        </Typography>
        
        <InteractiveStepThrough
          codeTemplate={codeTemplate}
          stepsTemplate={stepsTemplate}
          inputConfigs={[
            {
              name: "patternType",
              label: "Pattern Type",
              options: [
                { label: "Destructured Object Parameters", value: "destructured" },
                { label: "Mixed Parameter Types", value: "mixed" },
                { label: "Dynamic Defaults & Complex Patterns", value: "dynamic" }
              ],
              defaultValue: "destructured"
            },
            {
              name: "projectName", 
              label: "Project Name",
              options: [
                { label: "TaskApp", value: "TaskApp" },
                { label: "Dashboard", value: "Dashboard" },
                { label: "Analytics", value: "Analytics" },
                { label: "WebStore", value: "WebStore" }
              ],
              defaultValue: "TaskApp"
            }
          ]}
        />
      </Box>

      {/* Key Concepts */}
      <Box sx={{ 
        p: 3, 
        bgcolor: '#f8fafc', 
        borderRadius: 2, 
        border: '1px solid #e2e8f0',
        mt: 4,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
          🔑 Advanced Parameter Best Practices
        </Typography>
        <Box component="ul" sx={{ margin: 0, paddingLeft: 3, '& li': { marginBottom: 1.5, color: '#475569' } }}>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Order matters:</Typography> required → defaults → destructured → rest</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Destructured objects:</Typography> Allow named parameters in any order</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Dynamic defaults:</Typography> Function calls executed only when needed</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Default to empty object:</Typography> {} allows optional destructured parameters</li>
        </Box>
      </Box>
    </div>
  );
};

export default AdvancedParametersExample;