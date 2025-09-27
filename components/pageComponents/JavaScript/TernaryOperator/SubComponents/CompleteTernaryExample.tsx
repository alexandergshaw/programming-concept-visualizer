import React from 'react';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';

const CompleteTernaryExample: React.FC = () => {

  const codeTemplate = (inputs: Record<string, string | number>) => {
    const isOnline = inputs.isOnline as string === 'true';
    return [`const status = isOnline ? "Active" : "Away";
// isOnline = ${isOnline}, status = "${isOnline ? "Active" : "Away"}"`];
  };

  const stepsTemplate = (inputs: Record<string, string | number>): Step[] => {
    const isOnline = inputs.isOnline as string === 'true';
    return [
      {
        label: 'Check',
        desc: `isOnline = ${isOnline}`,
        highlight: 'isOnline',
        outputLine: `${isOnline}`
      },
      {
        label: 'Result',
        desc: 'Return status',
        highlight: isOnline ? '"Active"' : '"Away"',
        outputLine: `"${isOnline ? "Active" : "Away"}"`
      }
    ];
  };

  return (
    <div>
      <p>Real-world ternary usage:</p>

      <InteractiveStepThrough
        codeTemplate={codeTemplate}
        stepsTemplate={stepsTemplate}
        inputConfigs={[
          {
            name: 'isOnline',
            label: 'User Online:',
            options: [
              { value: 'true', label: 'Yes' },
              { value: 'false', label: 'No' }
            ]
          }
        ]}
      />
    </div>
  );
};

export default CompleteTernaryExample;