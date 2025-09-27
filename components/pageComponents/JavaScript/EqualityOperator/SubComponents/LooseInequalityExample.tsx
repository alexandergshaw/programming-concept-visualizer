import React from 'react';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';

const LooseInequalityExample: React.FC = () => {
  const codeTemplate = (inputs: Record<string, string | number>) => {
    const scenario = inputs.scenario as string;
    const testValue = inputs.testValue as string;
    
    if (scenario === 'nullCheck') {
      return [`function checkNotNull(value) {
  console.log('Testing value:', value, '(type:', typeof value + ')');
  
  // Loose inequality - checks for null OR undefined
  if (value != null) {
    console.log('✅ Value exists (not null or undefined)');
    return true;
  } else {
    console.log('❌ Value is null or undefined');
    return false;
  }
}

checkNotNull(${testValue});`];
    } else {
      return [`function validateInput(input) {
  console.log('Validating:', input, '(type:', typeof input + ')');
  
  // Check if input is not empty/falsy
  if (input != "" && input != 0 && input != false) {
    console.log('✅ Input has meaningful value');
    return true;
  } else {
    console.log('❌ Input is empty or falsy');
    return false;
  }
}

validateInput(${testValue});`];
    }
  };

  const stepsTemplate = (inputs: Record<string, string | number>): Step[] => {
    const scenario = inputs.scenario as string;
    const testValue = inputs.testValue as string;
    
    // Parse the test value
    const parsedValue = testValue === '""' ? '' : testValue === 'null' ? null : testValue === 'undefined' ? undefined : testValue === 'false' ? false : testValue.startsWith('"') ? testValue.slice(1, -1) : Number(testValue);
    
    if (scenario === 'nullCheck') {
      const isNotNull = parsedValue != null; // Intentional loose inequality
      
      return [
        {
          label: 'Check Value',
          desc: 'What are we testing?',
          highlight: 'checkNotNull',
          outputLine: `Value: ${testValue} (${typeof parsedValue})`
        },
        {
          label: 'Loose Inequality',
          desc: 'Check if NOT null or undefined',
          highlight: 'value != null',
          outputLine: isNotNull ? '✅ Has value' : '❌ Null or undefined'
        }
      ];
    } else {
      const hasValue = parsedValue != "" && parsedValue != 0 && parsedValue != false; // Intentional loose inequality
      
      return [
        {
          label: 'Check Value',
          desc: 'What are we validating?',
          highlight: 'input',
          outputLine: `Input: ${testValue} (${typeof parsedValue})`
        },
        {
          label: 'Multiple Checks',
          desc: 'Check if NOT empty, zero, or false',
          highlight: 'input != "" && input != 0 && input != false',
          outputLine: hasValue ? '✅ Meaningful value' : '❌ Empty/falsy'
        }
      ];
    }
  };

  return (
    <div>
      <p style={{ marginBottom: 16 }}>
        The != operator has one useful case: checking for null/undefined together.
      </p>

      <InteractiveStepThrough
        codeTemplate={codeTemplate}
        stepsTemplate={stepsTemplate}
        inputConfigs={[
          {
            name: 'scenario',
            label: 'Use Case:',
            options: [
              { value: 'nullCheck', label: 'Null/Undefined Check' }
            ]
          },
          {
            name: 'testValue',
            label: 'Test Value:',
            options: [
              { value: 'null', label: 'null' },
              { value: 'undefined', label: 'undefined' },
              { value: '&quot;hello&quot;', label: 'String &quot;hello&quot;' }
            ]
          }
        ]}
      />

      <div style={{ padding: 10, backgroundColor: '#e3f2fd', borderRadius: 8, border: '1px solid #64b5f6', marginTop: 12 }}>
        <strong style={{ color: '#1976d2' }}>Useful:</strong> <code>value != null</code> checks both null AND undefined
      </div>
    </div>
  );
};

export default LooseInequalityExample;