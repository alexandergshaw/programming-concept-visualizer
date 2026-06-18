import React from 'react';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';

const CompleteIdentityExample: React.FC = () => {
  const codeTemplate = (inputs: Record<string, string | number>) => {
    const scenario = inputs.scenario as string;
    
    const scenarios = {
      userAuth: `function authenticateUser(inputPassword, storedPassword) {
  console.log('\\n=== USER AUTHENTICATION ===');
  console.log('Input password:', '"' + inputPassword + '"');
  console.log('Stored password:', '"' + storedPassword + '"');
  
  // SECURE: Using strict equality
  if (inputPassword === storedPassword) {
    console.log('✅ Authentication successful!');
    return { success: true, message: 'Welcome!' };
  } else {
    console.log('❌ Authentication failed!');
    return { success: false, message: 'Invalid credentials' };
  }
}

// Test authentication
const result = authenticateUser("${inputs.inputPassword}", "${inputs.storedPassword}");
console.log('Final result:', result);`,

      apiValidation: `function validateApiResponse(response) {
  console.log('\\n=== API RESPONSE VALIDATION ===');
  console.log('Response data:', response);
  
  // Check if response exists and has expected structure
  if (response !== null && response !== undefined) {
    console.log('✅ Response exists');
    
    if (response.status === 200) {
      console.log('✅ Status is exactly 200 (success)');
      return { valid: true, data: response.data };
    } else if (response.status !== 200) {
      console.log('❌ Status is not 200, got:', response.status);
      return { valid: false, error: 'Invalid status code' };
    }
  } else {
    console.log('❌ Response is null or undefined');
    return { valid: false, error: 'No response received' };
  }
}

// Test API validation
const testResponse = ${JSON.stringify(inputs.apiResponse)};
const validation = validateApiResponse(testResponse);
console.log('Validation result:', validation);`,

      dataProcessing: `function processUserData(userData) {
  console.log('\\n=== USER DATA PROCESSING ===');
  console.log('Raw user data:', userData);
  
  const errors = [];
  const processed = {};
  
  // Validate email (must be string, not empty)
  if (userData.email !== null && userData.email !== undefined && userData.email !== "") {
    processed.email = userData.email;
    console.log('✅ Email valid:', processed.email);
  } else {
    errors.push('Email is required');
    console.log('❌ Invalid email');
  }
  
  // Validate age (must be number, not string)
  if (typeof userData.age === 'number' && userData.age !== null) {
    processed.age = userData.age;
    console.log('✅ Age valid:', processed.age);
  } else {
    errors.push('Age must be a number');
    console.log('❌ Invalid age, got:', typeof userData.age);
  }
  
  // Check admin status (must be exactly boolean true)
  processed.isAdmin = userData.isAdmin === true;
  console.log('Admin status:', processed.isAdmin);
  
  return { success: errors.length === 0, data: processed, errors };
}

// Test data processing
const testData = ${JSON.stringify(inputs.userData)};
const result = processUserData(testData);
console.log('\\nProcessing result:', result);`
    };
    
    return [scenarios[scenario as keyof typeof scenarios]];
  };

  const stepsTemplate = (inputs: Record<string, string | number>): Step[] => {
    const scenario = inputs.scenario as string;
    
    if (scenario === 'userAuth') {
      const inputPass = inputs.inputPassword as string;
      const storedPass = inputs.storedPassword as string;
      const matches = inputPass === storedPass;
      
      return [
        {
          label: 'Receive Input',
          desc: 'User provides password',
          highlight: 'inputPassword',
          outputLine: `Input: "${inputPass}"`
        },
        {
          label: 'Compare Strictly',
          desc: 'Use === for exact match',
          highlight: 'inputPassword === storedPassword',
          outputLine: `"${inputPass}" === "${storedPass}" = ${matches}`
        },
        {
          label: 'Authentication Result',
          desc: matches ? 'Login successful' : 'Login denied',
          highlight: matches ? 'success: true' : 'success: false',
          outputLine: matches ? '✅ Welcome!' : '❌ Invalid credentials'
        }
      ];
    }
    
    if (scenario === 'apiValidation') {
      const response = JSON.parse(inputs.apiResponse as string);
      const exists = response !== null && response !== undefined;
      const hasCorrectStatus = exists && response?.status === 200;
      
      return [
        {
          label: 'Check Existence',
          desc: 'Verify response is not null/undefined',
          highlight: 'response !== null && response !== undefined',
          outputLine: exists ? '✅ Response exists' : '❌ No response'
        },
        {
          label: 'Validate Status',
          desc: 'Check for exact status code 200',
          highlight: 'response.status === 200',
          outputLine: hasCorrectStatus ? '✅ Status 200' : `❌ Status: ${response?.status || 'missing'}`
        },
        {
          label: 'Final Validation',
          desc: 'Return validation result',
          highlight: 'valid: true',
          outputLine: hasCorrectStatus ? '✅ Valid response' : '❌ Invalid response'
        }
      ];
    }
    
    if (scenario === 'dataProcessing') {
      const userData = JSON.parse(inputs.userData as string);
      const validEmail = userData?.email !== null && userData?.email !== undefined && userData?.email !== "";
      const validAge = typeof userData?.age === 'number' && userData?.age !== null;
      const isAdmin = userData?.isAdmin === true;
      
      return [
        {
          label: 'Validate Email',
          desc: 'Check email is not null, undefined, or empty',
          highlight: 'userData.email !== null && userData.email !== undefined && userData.email !== ""',
          outputLine: validEmail ? '✅ Email valid' : '❌ Email invalid'
        },
        {
          label: 'Validate Age',
          desc: 'Ensure age is exactly a number',
          highlight: 'typeof userData.age === "number"',
          outputLine: validAge ? '✅ Age valid' : `❌ Age is ${typeof userData?.age}`
        },
        {
          label: 'Check Admin Status',
          desc: 'Verify admin flag is exactly boolean true',
          highlight: 'userData.isAdmin === true',
          outputLine: isAdmin ? '✅ Admin access' : '❌ Regular user'
        }
      ];
    }
    
    return [];
  };

  return (
    <div>
      <p style={{ marginBottom: 16 }}>
        Real-world scenarios showing why identity operators prevent bugs and security issues.
      </p>

      <InteractiveStepThrough
        codeTemplate={codeTemplate}
        stepsTemplate={stepsTemplate}
        inputConfigs={[
          {
            name: 'scenario',
            label: 'Scenario:',
            options: [
              { value: 'userAuth', label: 'User Login' },
              { value: 'apiValidation', label: 'API Validation' }
            ]
          },
          {
            name: 'inputPassword',
            label: 'Input Password:',
            options: [
              { value: 'secret123', label: 'secret123' },
              { value: 'wrong', label: 'wrong' }
            ]
          },
          {
            name: 'storedPassword',
            label: 'Stored Password:',
            options: [
              { value: 'secret123', label: 'secret123' },
              { value: 'admin123', label: 'admin123' }
            ]
          },
          {
            name: 'apiResponse',
            label: 'API Response:',
            options: [
              { value: '{"status": 200, "data": "success"}', label: 'Valid (status: 200)' },
              { value: '{"status": "200", "data": "success"}', label: 'String Status ("200")' }
            ]
          }
        ]}
      />

      <div style={{ padding: 12, backgroundColor: 'var(--success-bg)', borderRadius: 8, border: '1px solid var(--success)', marginTop: 16 }}>
        <strong style={{ color: 'var(--success)' }}>Best Practices:</strong>
        <ul style={{ margin: '8px 0 0 0', color: 'var(--success)', fontSize: 14 }}>
          <li>Use === for password comparison (prevents bypasses)</li>
          <li>Use === for API status codes (ensures exact types)</li>
          <li>Use !== for null/undefined checks (type safety)</li>
        </ul>
      </div>
    </div>
  );
};

export default CompleteIdentityExample;