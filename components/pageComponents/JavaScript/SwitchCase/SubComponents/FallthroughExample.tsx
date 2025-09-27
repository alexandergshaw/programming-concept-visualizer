import React from 'react';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';

const FallthroughExample: React.FC = () => {
  const codeParts: CodePart[] = [
    {
      label: 'Switch Statement',
      part: 'switch (month)',
      color: '#4caf50',
      desc: 'Evaluates month'
    },
    {
      label: 'Winter Cases',
      part: 'case "december":\n    case "january":\n    case "february":\n      return "Winter";',
      color: '#2196f3',
      desc: 'Multiple cases fall through to same result'
    },
    {
      label: 'Summer Cases', 
      part: 'case "june":\n    case "july":\n      return "Summer";',
      color: '#ff9800',
      desc: 'Summer months grouped together'
    },
    {
      label: 'Default Case',
      part: 'default:\n      return "Other season";',
      color: '#f44336',
      desc: 'All other months'
    }
  ];

  const codeTemplate = (inputs: Record<string, string | number>) => {
    return [`function getSeason(month) {
  switch (month) {
    case "december":
    case "january":
    case "february":
      return "Winter";
    case "june":
    case "july":
      return "Summer";
    default:
      return "Other season";
  }
}

getSeason("${inputs.month}");`];
  };

  const stepsTemplate = (inputs: Record<string, string | number>): Step[] => {
    const month = inputs.month as string;
    const steps: Step[] = [
      {
        label: 'Call function',
        desc: 'Function called with month',
        highlight: 'getSeason',
        outputLine: `Called getSeason("${month}")`
      },
      {
        label: 'Evaluate switch',
        desc: 'The month value is evaluated',
        highlight: 'switch (month)',
        outputLine: `Switch expression evaluated: "${month}"`
      }
    ];

    // Add dynamic steps based on the month
    if (['december', 'january', 'february'].includes(month)) {
      steps.push({
        label: 'Check winter cases',
        desc: 'Check winter month cases',
        highlight: 'case "december":',
        outputLine: `"${month}" matches winter month - found in grouped cases!`
      });
      steps.push({
        label: 'Fall through winter cases',
        desc: 'All winter cases fall through to same return',
        highlight: month === 'december' ? 'case "december":' : month === 'january' ? 'case "january":' : 'case "february":',
        outputLine: `Fall through from case "${month}" (no break statements)`
      });
      steps.push({
        label: 'Return winter',
        desc: 'Execute shared winter return',
        highlight: 'return "Winter";',
        outputLine: 'Return "Winter" and exit switch'
      });
    } else if (['june', 'july'].includes(month)) {
      steps.push({
        label: 'Check winter cases',
        desc: 'Check winter month cases first',
        highlight: 'case "december":',
        outputLine: `"${month}" !== winter months - continue checking`
      });
      steps.push({
        label: 'Check summer cases',
        desc: 'Check summer month cases',
        highlight: 'case "june":',
        outputLine: `"${month}" matches summer month - found in grouped cases!`
      });
      steps.push({
        label: 'Fall through summer cases',
        desc: 'Summer cases fall through to same return',
        highlight: month === 'june' ? 'case "june":' : 'case "july":',
        outputLine: `Fall through from case "${month}" (no break statements)`
      });
      steps.push({
        label: 'Return summer',
        desc: 'Execute shared summer return',
        highlight: 'return "Summer";',
        outputLine: 'Return "Summer" and exit switch'
      });
    } else {
      steps.push({
        label: 'Check winter cases',
        desc: 'Check winter month cases',
        highlight: 'case "december":',
        outputLine: `"${month}" !== winter months - continue checking`
      });
      steps.push({
        label: 'Check summer cases',
        desc: 'Check summer month cases',
        highlight: 'case "june":',
        outputLine: `"${month}" !== summer months - continue to default`
      });
      steps.push({
        label: 'Execute default case',
        desc: 'No cases matched, use default',
        highlight: 'default:',
        outputLine: 'No matching cases - using default case'
      });
      steps.push({
        label: 'Return other season',
        desc: 'Execute default case',
        highlight: 'return "Other season";',
        outputLine: 'Return "Other season" and exit switch'
      });
    }

    return steps;
  };

  return (
    <div>
      <p>Sometimes you want multiple cases to execute the same code. This is called <strong>intentional fall-through</strong>:</p>

      <h5>Season Calculator:</h5>
      <CodePartsExplanation
        code={`function getSeason(month) {
  switch (month) {
    case "december":
    case "january":
    case "february":
      return "Winter";
    case "june":
    case "july":
      return "Summer";
    default:
      return "Other season";
  }
}`}
        parts={codeParts}
      />

      <h5>Interactive Example:</h5>
      <p>Notice how winter months all fall through to the same return statement:</p>
      <InteractiveStepThrough
        codeTemplate={codeTemplate}
        stepsTemplate={stepsTemplate}
        inputConfigs={[
          {
            name: 'month',
            label: 'Month:',
            options: [
              { value: 'december', label: 'December (winter)' },
              { value: 'january', label: 'January (winter)' },
              { value: 'june', label: 'June (summer)' },
              { value: 'july', label: 'July (summer)' },
              { value: 'march', label: 'March (other)' }
            ]
          }
        ]}
      />
    </div>
  );
};

export default FallthroughExample;