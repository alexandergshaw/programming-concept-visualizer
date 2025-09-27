import React from 'react';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';

const SwitchCaseBreakExample: React.FC = () => {
  const codeParts: CodePart[] = [
    {
      label: 'Switch Statement',
      part: 'switch (drink)',
      color: '#4caf50',
      desc: 'Evaluates drink once'
    },
    {
      label: 'Case Coffee',
      part: 'case "coffee":\n      console.log("Hot beverage");\n      break;',
      color: '#2196f3',
      desc: 'Coffee case with break statement'
    },
    {
      label: 'Case Tea',
      part: 'case "tea":\n      console.log("Also hot");\n      // No break here!',
      color: '#ff9800',
      desc: 'Tea case WITHOUT break - will fall through'
    },
    {
      label: 'Default Case',
      part: 'default:\n      console.log("Unknown drink");',
      color: '#f44336',
      desc: 'Default case catches fall-through'
    }
  ];

  const codeTemplate = (inputs: Record<string, string | number>) => {
    return [`function orderDrink(drink) {
  switch (drink) {
    case "coffee":
      console.log("Hot beverage");
      break;
    case "tea":
      console.log("Also hot");
      // No break here!
    default:
      console.log("Unknown drink");
  }
}

orderDrink("${inputs.drink}");`];
  };

  const stepsTemplate = (inputs: Record<string, string | number>): Step[] => {
    const drink = inputs.drink as string;
    const steps: Step[] = [
      {
        label: 'Call function',
        desc: 'Function called with drink type',
        highlight: 'orderDrink',
        outputLine: `Called orderDrink("${drink}")`
      },
      {
        label: 'Evaluate switch',
        desc: 'The drink value is evaluated',
        highlight: 'switch (drink)',
        outputLine: `Switch expression evaluated: "${drink}"`
      }
    ];

    // Add dynamic steps based on the drink
    if (drink === 'coffee') {
      steps.push({
        label: 'Check coffee case',
        desc: 'Check if drink matches "coffee"',
        highlight: 'case "coffee":',
        outputLine: `"${drink}" === "coffee"? YES - Match found!`
      });
      steps.push({
        label: 'Execute coffee case',
        desc: 'Run the coffee case code',
        highlight: 'console.log("Hot beverage");',
        outputLine: 'Output: Hot beverage'
      });
      steps.push({
        label: 'Hit break statement',
        desc: 'Break statement stops execution',
        highlight: 'break;',
        outputLine: 'Break found - exit switch (no fall-through)'
      });
    } else if (drink === 'tea') {
      steps.push({
        label: 'Check coffee case',
        desc: 'Check if drink matches "coffee"',
        highlight: 'case "coffee":',
        outputLine: `"${drink}" === "coffee"? NO - Continue to next case`
      });
      steps.push({
        label: 'Check tea case',
        desc: 'Check if drink matches "tea"',
        highlight: 'case "tea":',
        outputLine: `"${drink}" === "tea"? YES - Match found!`
      });
      steps.push({
        label: 'Execute tea case',
        desc: 'Run the tea case code',
        highlight: 'console.log("Also hot");',
        outputLine: 'Output: Also hot'
      });
      steps.push({
        label: 'No break - fall through!',
        desc: 'No break statement, so execution continues',
        highlight: '// No break here!',
        outputLine: 'No break found - continue to default case'
      });
      steps.push({
        label: 'Execute default case',
        desc: 'Fall-through executes default case too',
        highlight: 'console.log("Unknown drink");',
        outputLine: 'Output: Unknown drink (due to fall-through!)'
      });
    } else {
      steps.push({
        label: 'Check coffee case',
        desc: 'Check if drink matches "coffee"',
        highlight: 'case "coffee":',
        outputLine: `"${drink}" === "coffee"? NO - Continue to next case`
      });
      steps.push({
        label: 'Check tea case',
        desc: 'Check if drink matches "tea"',
        highlight: 'case "tea":',
        outputLine: `"${drink}" === "tea"? NO - Continue to default`
      });
      steps.push({
        label: 'Execute default case',
        desc: 'No cases matched, use default',
        highlight: 'default:',
        outputLine: 'Using default case'
      });
      steps.push({
        label: 'Default output',
        desc: 'Execute default case code',
        highlight: 'console.log("Unknown drink");',
        outputLine: 'Output: Unknown drink'
      });
    }

    return steps;
  };

  return (
    <div>
      <p>The <strong>break</strong> statement is crucial in switch statements. Without it, execution "falls through" to the next case:</p>

      <h5>Code with Break Issue:</h5>
      <CodePartsExplanation
        code={`function orderDrink(drink) {
  switch (drink) {
    case "coffee":
      console.log("Hot beverage");
      break;
    case "tea":
      console.log("Also hot");
      // No break here!
    default:
      console.log("Unknown drink");
  }
}`}
        parts={codeParts}
      />

      <h5>Interactive Example:</h5>
      <p>Notice what happens when you select "tea" - it will also execute the default case!</p>
      <InteractiveStepThrough
        codeTemplate={codeTemplate}
        stepsTemplate={stepsTemplate}
        inputConfigs={[
          {
            name: 'drink',
            label: 'Choose Drink:',
            options: [
              { value: 'coffee', label: 'Coffee (has break)' },
              { value: 'tea', label: 'Tea (no break - falls through!)' },
              { value: 'soda', label: 'Soda (goes to default)' }
            ]
          }
        ]}
      />
    </div>
  );
};

export default SwitchCaseBreakExample;