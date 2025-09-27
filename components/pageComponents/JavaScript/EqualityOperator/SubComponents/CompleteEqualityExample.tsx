import React from 'react';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';

const CompleteEqualityExample: React.FC = () => {
  const codeTemplate = (inputs: Record<string, string | number>) => {
    const scenario = inputs.scenario as string;
    
    if (scenario === 'nullCheck') {
      return [`function processUserData(data) {
  console.log('Processing user data...');
  
  // Common pattern: check for null OR undefined with !=
  if (data != null) {
    console.log('✅ Data exists, processing...');
    console.log('User name:', data.name);
    console.log('User email:', data.email);
    return { success: true, processed: data };
  } else {
    console.log('❌ No data to process (null or undefined)');
    return { success: false, error: 'Missing data' };
  }
}

// Test with different inputs
const testData = ${inputs.testData};
processUserData(testData);`];
    } else {
      return [`function flexibleSearch(query, searchTerm) {
  console.log('Searching for:', searchTerm, 'in:', query);
  
  // Sometimes loose equality helps with flexible matching
  // (though usually you'd want more specific logic)
  if (query == searchTerm) {
    console.log('✅ Match found (with type coercion)');
    return true;
  } else {
    console.log('❌ No match');
    return false;
  }
}

// Example: user searches for number but data is string
const result = flexibleSearch("${inputs.queryValue}", ${inputs.searchTerm});
console.log('Search result:', result);`];
    }
  };

  const stepsTemplate = (inputs: Record<string, string | number>): Step[] => {
    const scenario = inputs.scenario as string;
    
    if (scenario === 'nullCheck') {
      const testData = JSON.parse(inputs.testData as string);
      const hasData = testData != null; // Intentional loose inequality
      
      return [
        {
          label: 'Check Data',
          desc: 'Is data null or undefined?',
          highlight: 'data != null',
          outputLine: `Data: ${testData === null ? 'null' : testData === undefined ? 'undefined' : 'exists'}`
        },
        {
          label: 'Process Result',
          desc: hasData ? 'Data exists, can process' : 'No data available',
          highlight: hasData ? 'return { success: true' : 'return { success: false',
          outputLine: hasData ? '✅ Processing data' : '❌ Missing data'
        }
      ];
    } else {
      const queryValue = inputs.queryValue as string;
      const searchTerm = inputs.searchTerm as string;
      
      // Parse search term
      const parsedSearchTerm = searchTerm.startsWith('"') ? searchTerm.slice(1, -1) : Number(searchTerm);
      const matches = queryValue == parsedSearchTerm; // Intentional loose equality
      
      return [
        {
          label: 'Compare Values',
          desc: 'Check if query matches search term',
          highlight: 'query == searchTerm',
          outputLine: `"${queryValue}" == ${searchTerm}`
        },
        {
          label: 'Search Result',
          desc: matches ? 'Match found with coercion' : 'No match',
          highlight: 'return',
          outputLine: matches ? '✅ Match (coerced)' : '❌ No match'
        }
      ];
    }
  };

  return (
    <div>
      <p style={{ marginBottom: 16 }}>
        Loose operators have limited use cases - mainly null/undefined checks.
      </p>

      <InteractiveStepThrough
        codeTemplate={codeTemplate}
        stepsTemplate={stepsTemplate}
        inputConfigs={[
          {
            name: 'scenario',
            label: 'Scenario:',
            options: [
              { value: 'nullCheck', label: 'Null/Undefined Check' }
            ]
          },
          {
            name: 'testData',
            label: 'Test Data:',
            options: [
              { value: '{&quot;name&quot;: "John", "email": "john@test.com"}', label: 'Valid Data' },
              { value: 'null', label: 'null' },
              { value: 'undefined', label: 'undefined' }
            ]
          }
        ]}
      />

      <div style={{ padding: 10, backgroundColor: '#e8f5e9', borderRadius: 8, border: '1px solid #4caf50', marginTop: 12 }}>
        <strong style={{ color: '#2e7d32' }}>Best practice:</strong> Use <code>value != null</code> for null/undefined checks, otherwise prefer strict operators (=== and !==)
      </div>
    </div>
  );
};

export default CompleteEqualityExample;