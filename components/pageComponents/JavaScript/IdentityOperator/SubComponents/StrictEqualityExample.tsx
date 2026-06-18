import React from 'react';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';

const StrictEqualityExample: React.FC = () => {
  const codeTemplate = (inputs: Record<string, string | number>) => {
    const value1 = inputs.value1 as string;
    const value2 = inputs.value2 as string;
    
    return [`function checkEquality(a, b) {
  console.log('Comparing:', a, 'and', b);
  console.log('Type of a:', typeof a);
  console.log('Type of b:', typeof b);
  
  const result = a === b;
  console.log('a === b:', result);
  return result;
}

checkEquality(${value1}, ${value2});`];
  };

  const stepsTemplate = (inputs: Record<string, string | number>): Step[] => {
    const value1 = inputs.value1 as string;
    const value2 = inputs.value2 as string;
    
    // Parse the values to their actual types
    const parsedValue1 = value1 === 'true' ? true : value1 === 'false' ? false : value1 === 'null' ? null : value1 === 'undefined' ? undefined : value1.startsWith('"') ? value1.slice(1, -1) : Number(value1);
    const parsedValue2 = value2 === 'true' ? true : value2 === 'false' ? false : value2 === 'null' ? null : value2 === 'undefined' ? undefined : value2.startsWith('"') ? value2.slice(1, -1) : Number(value2);
    
    const result = parsedValue1 === parsedValue2;

    return [
      {
        label: 'Check Values',
        desc: 'What are we comparing?',
        highlight: 'checkEquality',
        outputLine: `a = ${value1}, b = ${value2}`
      },
      {
        label: 'Check Types',
        desc: 'Are the types the same?',
        highlight: 'typeof a',
        outputLine: `typeof a = ${typeof parsedValue1}, typeof b = ${typeof parsedValue2}`
      },
      {
        label: 'Strict Comparison',
        desc: 'Compare value AND type',
        highlight: 'a === b',
        outputLine: `${value1} === ${value2} = ${result}`
      }
    ];
  };

  return (
    <div>
      <p style={{ marginBottom: 16 }}>
        The === operator only returns true when both value and type are identical.
      </p>

      <InteractiveStepThrough
        codeTemplate={codeTemplate}
        stepsTemplate={stepsTemplate}
        inputConfigs={[
          {
            name: 'value1',
            label: 'First Value:',
            options: [
              { value: '5', label: '5 (number)' },
              { value: '"5"', label: '"5" (string)' },
              { value: 'true', label: 'true (boolean)' }
            ]
          },
          {
            name: 'value2',
            label: 'Second Value:',
            options: [
              { value: '5', label: '5 (number)' },
              { value: '"5"', label: '"5" (string)' },
              { value: 'true', label: 'true (boolean)' }
            ]
          }
        ]}
      />

      <div style={{ padding: 12, backgroundColor: 'var(--success-bg)', borderRadius: 8, border: '1px solid var(--success)', marginTop: 16 }}>
        <strong style={{ color: 'var(--success)' }}>Key examples:</strong> <code>5 === 5</code> → true, <code>&quot;5&quot; === 5</code> → false
      </div>
    </div>
  );
};

export default StrictEqualityExample;