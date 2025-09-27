import React from 'react';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';

const BasicTernaryExample: React.FC = () => {
  const codeTemplate = (inputs: Record<string, string | number>) => {
    const temp = inputs.temperature as number;
    return [`const result = temp > 20 ? "Hot" : "Cold";
// temp = ${temp}, result = "${temp > 20 ? "Hot" : "Cold"}"`];
  };

  const stepsTemplate = (inputs: Record<string, string | number>): Step[] => {
    const temp = Number(inputs.temperature);
    return [
      {
        label: 'Check',
        desc: `${temp} > 20?`,
        highlight: 'temp > 20',
        outputLine: `${temp > 20}`
      },
      {
        label: 'Result',
        desc: 'Return value',
        highlight: temp > 20 ? '"Hot"' : '"Cold"',
        outputLine: `"${temp > 20 ? "Hot" : "Cold"}"`
      }
    ];
  };

  return (
    <div>
      <InteractiveStepThrough
        codeTemplate={codeTemplate}
        stepsTemplate={stepsTemplate}
        inputConfigs={[
          {
            name: 'temperature',
            label: 'Temperature:',
            options: [
              { value: 25, label: '25°C' },
              { value: 15, label: '15°C' }
            ]
          }
        ]}
      />
    </div>
  );
};

export default BasicTernaryExample;