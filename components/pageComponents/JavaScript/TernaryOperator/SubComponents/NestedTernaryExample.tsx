import React from 'react';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';

const NestedTernaryExample: React.FC = () => {

  const codeTemplate = (inputs: Record<string, string | number>) => {
    const score = inputs.score as number;
    return [`const grade = score >= 80 ? "A" : 
              score >= 60 ? "B" : "C";
// score = ${score}, grade = "${score >= 80 ? "A" : score >= 60 ? "B" : "C"}"`];
  };

  const stepsTemplate = (inputs: Record<string, string | number>): Step[] => {
    const score = Number(inputs.score);
    const steps: Step[] = [
      {
        label: 'Check 1',
        desc: `${score} >= 80?`,
        highlight: 'score >= 80',
        outputLine: `${score >= 80}`
      }
    ];

    if (score >= 80) {
      steps.push({
        label: 'Result',
        desc: 'First is true',
        highlight: '"A"',
        outputLine: '"A"'
      });
    } else {
      steps.push({
        label: 'Check 2',
        desc: `${score} >= 60?`,
        highlight: 'score >= 60',
        outputLine: `${score >= 60}`
      });
      steps.push({
        label: 'Result',
        desc: score >= 60 ? 'Second is true' : 'Both false',
        highlight: score >= 60 ? '"B"' : '"C"',
        outputLine: `"${score >= 60 ? "B" : "C"}"`
      });
    }

    return steps;
  };

  return (
    <div>
      <p>Chain ternary operators for multiple conditions:</p>

      <InteractiveStepThrough
        codeTemplate={codeTemplate}
        stepsTemplate={stepsTemplate}
        inputConfigs={[
          {
            name: 'score',
            label: 'Score:',
            options: [
              { value: 85, label: '85' },
              { value: 65, label: '65' },
              { value: 45, label: '45' }
            ]
          }
        ]}
      />
    </div>
  );
};

export default NestedTernaryExample;