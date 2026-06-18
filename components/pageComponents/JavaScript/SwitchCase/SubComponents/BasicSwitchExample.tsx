import React from 'react';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';

const BasicSwitchExample: React.FC = () => {
  const codeParts: CodePart[] = [
    {
      label: 'Switch Statement',
      part: 'switch (score)',
      color: 'var(--success)',
      desc: 'Evaluates score once'
    },
    {
      label: 'Case A',
      part: 'case 90:\n      return "A";',
      color: 'var(--info)',
      desc: 'Score 90+ gets grade A'
    },
    {
      label: 'Case B', 
      part: 'case 80:\n      return "B";',
      color: 'var(--warning)',
      desc: 'Score 80+ gets grade B'
    },
    {
      label: 'Default Case',
      part: 'default:\n      return "F";',
      color: 'var(--danger)',
      desc: 'All other scores get F'
    }
  ];

  const codeTemplate = (inputs: Record<string, string | number>) => {
    const score = inputs.score as number;
    
    return [`function getGrade(score) {
  switch (score) {
    case 90:
      return "A";
    case 80:
      return "B"; 
    default:
      return "F";
  }
}

getGrade(${score});`];
  };

  const stepsTemplate = (inputs: Record<string, string | number>): Step[] => {
    const score = Number(inputs.score);
    const steps: Step[] = [
      {
        label: 'Call function',
        desc: 'Function is called with the input score',
        highlight: 'getGrade',
        outputLine: `Called getGrade(${score})`
      },
      {
        label: 'Evaluate switch',
        desc: 'The score value is evaluated once',
        highlight: 'switch (score)',
        outputLine: `Switch expression evaluated: ${score}`
      }
    ];

    // Add dynamic steps based on the score
    if (score >= 90) {
      steps.push({
        label: 'Check case 90',
        desc: 'Check if score matches case 90',
        highlight: 'case 90:',
        outputLine: `${score} >= 90? YES - Match found!`
      });
      steps.push({
        label: 'Execute case 90',
        desc: 'Execute the matching case',
        highlight: 'return "A"',
        outputLine: 'Return "A" and exit switch'
      });
    } else if (score >= 80) {
      steps.push({
        label: 'Check case 90',
        desc: 'Check if score matches case 90',
        highlight: 'case 90:',
        outputLine: `${score} >= 90? NO - Continue to next case`
      });
      steps.push({
        label: 'Check case 80',
        desc: 'Check if score matches case 80',
        highlight: 'case 80:',
        outputLine: `${score} >= 80? YES - Match found!`
      });
      steps.push({
        label: 'Execute case 80',
        desc: 'Execute the matching case',
        highlight: 'return "B"',
        outputLine: 'Return "B" and exit switch'
      });
    } else {
      steps.push({
        label: 'Check case 90',
        desc: 'Check if score matches case 90',
        highlight: 'case 90:',
        outputLine: `${score} >= 90? NO - Continue to next case`
      });
      steps.push({
        label: 'Check case 80',
        desc: 'Check if score matches case 80',
        highlight: 'case 80:',
        outputLine: `${score} >= 80? NO - Continue to default`
      });
      steps.push({
        label: 'Execute default',
        desc: 'No cases matched, execute default',
        highlight: 'default:',
        outputLine: 'Use default case'
      });
      steps.push({
        label: 'Return default',
        desc: 'Return the default value',
        highlight: 'return "F"',
        outputLine: 'Return "F" and exit switch'
      });
    }

    return steps;
  };

  return (
    <div>
      <p>Let&apos;s see how a basic switch statement works with a simple grade calculator:</p>

      <h5>Code Breakdown:</h5>
      <CodePartsExplanation
        code={`function getGrade(score) {
  switch (score) {
    case 90:
      return "A";
    case 80:
      return "B";
    default:
      return "F";
  }
}`}
        parts={codeParts}
      />

      <h5>Interactive Example:</h5>
      <InteractiveStepThrough
        codeTemplate={codeTemplate}
        stepsTemplate={stepsTemplate}
        inputConfigs={[
          {
            name: 'score',
            label: 'Test Score:',
            options: [
              { value: 95, label: '95 (Should get A)' },
              { value: 85, label: '85 (Should get B)' },
              { value: 75, label: '75 (Should get F)' },
              { value: 50, label: '50 (Should get F)' }
            ]
          }
        ]}
      />
    </div>
  );
};

export default BasicSwitchExample;