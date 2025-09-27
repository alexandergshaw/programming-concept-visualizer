import React from 'react';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';

const StrictInequalityExample: React.FC = () => {
  const codeTemplate = (inputs: Record<string, string | number>) => {
    const scenario = inputs.scenario as string;
    const testValue = inputs.testValue as string;
    
    if (scenario === 'validation') {
      return [`function validateInput(value) {
  console.log('Validating:', value, '(type:', typeof value + ')');
  
  if (value !== null && value !== undefined && value !== "") {
    console.log('✅ Valid input');
    return true;
  } else {
    console.log('❌ Invalid input');
    return false;
  }
}

validateInput(${testValue});`];
    } else {
      return [`function filterValidData(value) {
  console.log('Checking:', value, '(type:', typeof value + ')');
  
  // Keep only non-empty, non-zero, non-false values
  if (value !== "" && value !== 0 && value !== false) {
    console.log('✅ Keep this data');
    return true;
  } else {
    console.log('❌ Filter out this data');
    return false;
  }
}

filterValidData(${testValue});`];
    }
  };

  const stepsTemplate = (inputs: Record<string, string | number>): Step[] => {
    const scenario = inputs.scenario as string;
    const testValue = inputs.testValue as string;
    
    // Parse the test value
    const parsedValue = testValue === '""' ? '' : testValue === 'null' ? null : testValue === 'undefined' ? undefined : testValue === 'false' ? false : testValue.startsWith('"') ? testValue.slice(1, -1) : Number(testValue);
    
    if (scenario === 'validation') {
      const isValid = parsedValue !== null && parsedValue !== undefined && parsedValue !== "";
      
      return [
        {
          label: 'Check Value',
          desc: 'What are we validating?',
          highlight: 'validateInput',
          outputLine: `Value: ${testValue} (${typeof parsedValue})`
        },
        {
          label: 'Strict Inequality',
          desc: 'Check if NOT null, undefined, or empty',
          highlight: 'value !== null',
          outputLine: isValid ? '✅ Passes validation' : '❌ Fails validation'
        }
      ];
    } else {
      const shouldKeep = parsedValue !== "" && parsedValue !== 0 && parsedValue !== false;
      
      return [
        {
          label: 'Check Value',
          desc: 'What are we filtering?',
          highlight: 'filterValidData',
          outputLine: `Value: ${testValue} (${typeof parsedValue})`
        },
        {
          label: 'Filter Logic',
          desc: 'Keep if NOT empty, zero, or false',
          highlight: 'value !== ""',
          outputLine: shouldKeep ? '✅ Keep data' : '❌ Filter out'
        }
      ];
    }
  };

  return (
    <div>
      <p style={{ marginBottom: 16 }}>
        The !== operator returns true when values differ in value OR type. Perfect for validation.
      </p>

      <InteractiveStepThrough
        codeTemplate={codeTemplate}
        stepsTemplate={stepsTemplate}
        inputConfigs={[
          {
            name: 'scenario',
            label: 'Use Case:',
            options: [
              { value: 'validation', label: 'Input Validation' },
              { value: 'filtering', label: 'Data Filtering' }
            ]
          },
          {
            name: 'testValue',
            label: 'Test Value:',
            options: [
              { value: '""', label: 'Empty string ""' },
              { value: '0', label: 'Number 0' },
              { value: 'null', label: 'null' },
              { value: '"valid"', label: 'String "valid"' }
            ]
          }
        ]}
      />

      <div style={{ padding: 12, backgroundColor: '#e3f2fd', borderRadius: 8, border: '1px solid #64b5f6', marginTop: 16 }}>
        <strong style={{ color: '#1976d2' }}>Examples:</strong> <code>null !== undefined</code> → true, <code>0 !== false</code> → true
      </div>
    </div>
  );
};

export default StrictInequalityExample;