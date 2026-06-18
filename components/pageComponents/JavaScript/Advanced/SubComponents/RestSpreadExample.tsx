import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';

const RestSpreadExample: React.FC = () => {
  // Code parts for highlighting different sections
  const codeParts: CodePart[] = [
    {
      label: 'Rest Parameters (...)',
      part: 'function sum(...numbers)',
      color: 'var(--feature)',
      desc: 'Rest operator collects multiple arguments into a single array parameter'
    },
    {
      label: 'Spread Syntax (...)',
      part: 'Math.max(...scores)',
      color: 'var(--success)',
      desc: 'Spread operator expands an array into individual arguments'
    },
    {
      label: 'Rest in Destructuring',
      part: 'const [first, ...rest] = array',
      color: 'var(--info)',
      desc: 'Rest can collect remaining elements in destructuring'
    },
    {
      label: 'Spread in Arrays',
      part: '[...array1, ...array2]',
      color: 'var(--warning)',
      desc: 'Spread can combine or copy arrays'
    }
  ];

  // Template for generating executable code
  const codeTemplate = (inputs: Record<string, string | number>) => {
    const operatorType = inputs.operatorType as string;
    const numbers = inputs.numbers as string;
    
    const examples = {
      rest: `// Rest Parameters: Collect arguments into array
function calculateStats(...numbers) {
  console.log("Arguments received:", numbers);
  
  if (numbers.length === 0) {
    return { count: 0, sum: 0, average: 0, max: null, min: null };
  }
  
  const sum = numbers.reduce((total, num) => total + num, 0);
  const average = sum / numbers.length;
  const max = Math.max(...numbers);
  const min = Math.min(...numbers);
  
  return {
    count: numbers.length,
    sum: sum,
    average: average,
    max: max,
    min: min
  };
}

console.log("=== Rest Parameters Example ===");

// Call with different numbers of arguments
console.log("No args:", calculateStats());
console.log("One arg:", calculateStats(${numbers.split(',')[0]}));
console.log("Multiple args:", calculateStats(${numbers}));

// Rest parameters work with any number of arguments
const moreNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Many args:", calculateStats(...moreNumbers));`,

      spread: `// Spread Operator: Expand arrays into arguments
const scores1 = [${numbers}];
const scores2 = [88, 92, 76];
const scores3 = [95, 89];

console.log("=== Spread Operator Examples ===");

// Spread in function calls
console.log("Max of scores1:", Math.max(...scores1));
console.log("Min of scores2:", Math.min(...scores2));

// Spread to combine arrays
const allScores = [...scores1, ...scores2, ...scores3];
console.log("All scores combined:", allScores);

// Spread to copy arrays (shallow copy)
const scoresCopy = [...scores1];
console.log("Copy of scores1:", scoresCopy);
console.log("Are they the same object?", scores1 === scoresCopy);

// Spread in array literals
const scoresWithBonus = [...scores1, 100]; // Add bonus score
console.log("Scores with bonus:", scoresWithBonus);

// Spread strings into characters
const message = "Hello";
const characters = [...message];
console.log("String spread:", characters);`,

      both: `// Rest and Spread Together
function processGrades(passingGrade, ...studentGrades) {
  console.log("Passing grade:", passingGrade);
  console.log("Student grades:", studentGrades);
  
  // Use spread to find max/min from rest parameters
  const maxGrade = studentGrades.length > 0 ? Math.max(...studentGrades) : 0;
  const minGrade = studentGrades.length > 0 ? Math.min(...studentGrades) : 0;
  
  // Filter passing vs failing grades
  const passingGrades = studentGrades.filter(grade => grade >= passingGrade);
  const failingGrades = studentGrades.filter(grade => grade < passingGrade);
  
  return {
    total: studentGrades.length,
    passing: passingGrades.length,
    failing: failingGrades.length,
    maxGrade: maxGrade,
    minGrade: minGrade,
    passingGrades: passingGrades,
    failingGrades: failingGrades
  };
}

// Arrays to spread as arguments
const midtermScores = [${numbers}];
const finalScores = [88, 76, 92, 85];

console.log("=== Rest + Spread Together ===");

// Use spread to pass array elements as individual arguments
console.log("Midterm results:", processGrades(70, ...midtermScores));
console.log("Final results:", processGrades(75, ...finalScores));

// Combine arrays with spread, then pass with spread
const allGrades = [...midtermScores, ...finalScores];
console.log("All grades results:", processGrades(80, ...allGrades));

// Rest in destructuring
const [firstScore, secondScore, ...remainingScores] = allGrades;
console.log("First score:", firstScore);
console.log("Second score:", secondScore);
console.log("Remaining scores:", remainingScores);`
    };
    
    return [examples[operatorType as keyof typeof examples]];
  };

  // Template for generating step-by-step explanation
  const stepsTemplate = (inputs: Record<string, string | number>) => {
    const operatorType = inputs.operatorType as string;
    const numbers = inputs.numbers as string;
    
    if (operatorType === 'rest') {
      return [
        {
          label: "Define Rest Parameters",
          desc: "Use ...numbers to collect all arguments into an array",
          highlight: 'function calculateStats(...numbers)'
        },
        {
          label: "Arguments Collected",
          desc: `All arguments become array: [${numbers}]`,
          highlight: `numbers = [${numbers}]`
        },
        {
          label: "Process Array",
          desc: "Use array methods to calculate statistics",
          highlight: 'numbers.reduce((total, num) => total + num, 0)'
        },
        {
          label: "Use Spread for Math",
          desc: "Spread array back to individual arguments for Math.max/min",
          highlight: 'Math.max(...numbers), Math.min(...numbers)'
        },
        {
          label: "Return Statistics",
          desc: "Return object with count, sum, average, max, min",
          highlight: '{ count: 3, sum: 240, average: 80, max: 95, min: 70 }'
        }
      ];
    }
    
    if (operatorType === 'spread') {
      return [
        {
          label: "Arrays to Spread",
          desc: `Create arrays with scores: [${numbers}], [88, 92, 76]`,
          highlight: `const scores1 = [${numbers}]; const scores2 = [88, 92, 76];`
        },
        {
          label: "Spread in Function Calls",
          desc: "Expand array elements as individual arguments",
          highlight: 'Math.max(...scores1) // same as Math.max(85, 90, 78)'
        },
        {
          label: "Combine Arrays",
          desc: "Use spread to merge multiple arrays into one",
          highlight: 'const allScores = [...scores1, ...scores2, ...scores3]'
        },
        {
          label: "Copy Arrays",
          desc: "Spread creates shallow copies of arrays",
          highlight: 'const copy = [...scores1] // new array with same values'
        },
        {
          label: "Add Elements",
          desc: "Spread existing array and add new elements",
          highlight: 'const withBonus = [...scores1, 100] // adds 100 at end'
        }
      ];
    }
    
    if (operatorType === 'both') {
      return [
        {
          label: "Rest + Regular Parameters",
          desc: "Mix regular parameters with rest parameters",
          highlight: 'function processGrades(passingGrade, ...studentGrades)'
        },
        {
          label: "Spread Arrays as Arguments",
          desc: `Pass array elements as individual arguments`,
          highlight: `processGrades(70, ...midtermScores) // 70, ${numbers}`
        },
        {
          label: "Rest Collects Arguments",
          desc: "Rest parameter collects spread arguments back into array",
          highlight: `studentGrades = [${numbers}] // from spread input`
        },
        {
          label: "Spread for Calculations",
          desc: "Use spread again within function for Math operations",
          highlight: 'Math.max(...studentGrades) // spread collected array'
        },
        {
          label: "Rest in Destructuring",
          desc: "Use rest to collect remaining array elements",
          highlight: 'const [first, second, ...remaining] = allGrades'
        }
      ];
    }
    
    return [];
  };

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        <strong>Rest and Spread Operators</strong> both use three dots (...) but serve opposite purposes: Rest collects multiple values into an array, while Spread expands an array into individual values.
      </p>

      {/* Code Parts Explanation */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Rest vs Spread: Same Syntax, Opposite Functions
        </Typography>
        <CodePartsExplanation 
          code={`// REST: Collect arguments into array
function sum(...numbers) {           // numbers = [1, 2, 3, 4]
  return numbers.reduce((a, b) => a + b);
}

// SPREAD: Expand array into arguments  
const scores = [85, 92, 78];
const maxScore = Math.max(...scores);  // same as Math.max(85, 92, 78)

// REST in destructuring
const [first, ...rest] = [1, 2, 3, 4]; // first=1, rest=[2,3,4]

// SPREAD in array literals
const combined = [...scores, 95, 88];   // [85, 92, 78, 95, 88]`}
          parts={codeParts}
        />
      </Box>

      {/* Interactive Step Through */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Try It Yourself: Rest and Spread in Action
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Explore how rest and spread operators work in different scenarios:
        </Typography>
        
        <InteractiveStepThrough
          codeTemplate={codeTemplate}
          stepsTemplate={stepsTemplate}
          inputConfigs={[
            {
              name: "operatorType",
              label: "Example Type",
              options: [
                { label: "Rest Parameters", value: "rest" },
                { label: "Spread Operator", value: "spread" },
                { label: "Rest + Spread Together", value: "both" }
              ],
              defaultValue: "rest"
            },
            {
              name: "numbers", 
              label: "Sample Numbers",
              options: [
                { label: "85, 90, 78", value: "85, 90, 78" },
                { label: "92, 88, 95, 76", value: "92, 88, 95, 76" },
                { label: "70, 85, 90", value: "70, 85, 90" },
                { label: "88, 92, 76, 94, 82", value: "88, 92, 76, 94, 82" }
              ],
              defaultValue: "85, 90, 78"
            }
          ]}
        />
      </Box>

      {/* Key Concepts */}
      <Box sx={{ 
        p: 3, 
        bgcolor: 'var(--paper-sunken)', 
        borderRadius: 2, 
        border: '1px solid var(--line)',
        mt: 4,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 1 }}>
          🔑 Rest vs Spread Quick Reference
        </Typography>
        <Box component="ul" sx={{ margin: 0, paddingLeft: 3, '& li': { marginBottom: 1.5, color: 'var(--ink-soft)' } }}>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--info)' }}>Rest (...args):</Typography> Collects multiple arguments INTO an array parameter</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--info)' }}>Spread (...array):</Typography> Expands an array INTO individual arguments</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--info)' }}>Rest in functions:</Typography> Must be the last parameter</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--info)' }}>Spread anywhere:</Typography> Can be used in function calls, array literals, destructuring</li>
        </Box>
      </Box>
    </div>
  );
};

export default RestSpreadExample;