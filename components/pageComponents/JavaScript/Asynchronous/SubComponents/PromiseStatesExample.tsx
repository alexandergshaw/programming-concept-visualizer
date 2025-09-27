import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import StepThroughCodeAnimation, { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';
import FlexibleGrid from '@/components/common/FlexibleGrid';

const PromiseStatesExample: React.FC = () => {
  const promiseStatesCode = `// Promise with three possible states
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    console.log('Promise State: PENDING');
    
    // Simulate API call
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate
      
      if (success) {
        console.log('Promise State: FULFILLED');
        resolve({ id: userId, name: 'John Doe', email: 'john@example.com' });
      } else {
        console.log('Promise State: REJECTED');
        reject(new Error('Failed to fetch user data'));
      }
    }, 2000);
  });
}

// Using the promise
fetchUserData(123)
  .then(user => {
    console.log('Success! Got user:', user);
    return user;
  })
  .catch(error => {
    console.log('Error occurred:', error.message);
  })
  .finally(() => {
    console.log('Promise completed (either success or failure)');
  });`;

  const codeParts: CodePart[] = [
    {
      label: 'Pending State',
      part: "console.log('Promise State: PENDING')",
      color: '#ff9800',
      desc: 'Initial state - operation has started but not yet completed'
    },
    {
      label: 'Fulfilled State',
      part: "resolve({ id: userId, name: 'John Doe' })",
      color: '#4caf50',
      desc: 'Success state - operation completed successfully with a value'
    },
    {
      label: 'Rejected State',
      part: "reject(new Error('Failed to fetch'))",
      color: '#f44336',
      desc: 'Error state - operation failed with an error reason'
    },
    {
      label: 'Finally Block',
      part: '.finally(() => { /* cleanup */ })',
      color: '#9c27b0',
      desc: 'Runs regardless of success or failure, useful for cleanup'
    }
  ];

  const promiseSteps: Step[] = [
    {
      label: "Promise Created",
      desc: "Promise starts in PENDING state when created",
      highlight: "return new Promise((resolve, reject) => {"
    },
    {
      label: "Async Operation", 
      desc: "Background operation begins (API call, file read, etc.)",
      highlight: "setTimeout(() => {"
    },
    {
      label: "Success Path",
      desc: "Call resolve() to move to FULFILLED state with result",
      highlight: "resolve({ id: userId, name: 'John Doe' })"
    },
    {
      label: "Error Path",
      desc: "Call reject() to move to REJECTED state with error",
      highlight: "reject(new Error('Failed to fetch'))"
    },
    {
      label: "Handle Result",
      desc: ".then() handles fulfilled, .catch() handles rejected",
      highlight: ".then(user => { /* success */ }).catch(error => { /* error */ })"
    }
  ];

  const promiseAllCode = `// Promise.all - Wait for multiple promises
const promise1 = fetchUserData(1);
const promise2 = fetchUserData(2);
const promise3 = fetchUserData(3);

Promise.all([promise1, promise2, promise3])
  .then(users => {
    console.log('All users loaded:', users);
    // All three users are now available
  })
  .catch(error => {
    console.log('At least one promise failed:', error);
    // If ANY promise fails, this catch runs
  });

// Promise.race - First one to complete wins
Promise.race([promise1, promise2, promise3])
  .then(firstUser => {
    console.log('First user to load:', firstUser);
  });`;

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        Every <strong>Promise</strong> has exactly one of three states: <strong>pending</strong> (waiting), <strong>fulfilled</strong> (succeeded), or <strong>rejected</strong> (failed). Understanding these states is key to working with asynchronous code.
      </p>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          The Three Promise States
        </Typography>
        <CodePartsExplanation 
          code={promiseStatesCode}
          parts={codeParts}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Promise Lifecycle Step by Step
        </Typography>
        <StepThroughCodeAnimation
          code={[
            "return new Promise((resolve, reject) => {",
            "setTimeout(() => {",
            "resolve({ id: userId, name: 'John Doe' })",
            "reject(new Error('Failed to fetch'))",
            ".then(user => { /* success */ }).catch(error => { /* error */ })"
          ]}
          steps={promiseSteps}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Working with Multiple Promises
        </Typography>
        <CodePartsExplanation 
          code={promiseAllCode}
          parts={[
            {
              label: 'Promise.all',
              part: 'Promise.all([promise1, promise2, promise3])',
              color: '#2196f3',
              desc: 'Waits for ALL promises to complete successfully'
            },
            {
              label: 'Promise.race',
              part: 'Promise.race([promise1, promise2, promise3])',
              color: '#ff5722',
              desc: 'Returns the first promise to complete (success or failure)'
            }
          ]}
        />
      </Box>

      {/* Promise States Visual Guide */}
      <Box sx={{ 
        p: 3, 
        bgcolor: '#f8fafc', 
        borderRadius: 2, 
        border: '1px solid #e2e8f0',
        mt: 4,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
          📊 Promise States Reference
        </Typography>
        <FlexibleGrid 
          items={[
            {
              title: "�� PENDING",
              description: "Initial state. The operation has started but hasn't completed yet.",
              titleColor: "#92400e",
              backgroundColor: "#fffbeb"
            },
            {
              title: "🟢 FULFILLED",
              description: "Success! The operation completed and returned a value.",
              titleColor: "#047857",
              backgroundColor: "#ecfdf5"
            },
            {
              title: "🔴 REJECTED",
              description: "Error! The operation failed and returned an error reason.",
              titleColor: "#dc2626",
              backgroundColor: "#fef2f2"
            }
          ]}
          gap={2}
        />
            <Typography variant="body2" sx={{ fontSize: 13, color: '#991b1b' }}>
              Error! The operation failed and returned an error reason.
            </Typography>
      </Box>
    </div>
  );
};

export default PromiseStatesExample;