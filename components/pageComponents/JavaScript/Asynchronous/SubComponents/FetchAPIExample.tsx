import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import CalloutBox from '@/components/common/CalloutBox';
import StepThroughCodeAnimation, { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FetchAPIExample: React.FC = () => {
  // Code parts for highlighting different sections
  const codeParts: CodePart[] = [
    {
      label: 'Fetch Function Call',
      part: 'fetch(url)',
      color: 'var(--feature)',
      desc: 'Modern way to make HTTP requests, returns a Promise'
    },
    {
      label: 'Response Handling',
      part: '.then(response => response.json())',
      color: 'var(--success)',
      desc: 'Convert response to JSON format for JavaScript use'
    },
    {
      label: 'Data Processing',
      part: '.then(data => { /* use data */ })',
      color: 'var(--warning)',
      desc: 'Process the received data to update the page'
    },
    {
      label: 'Error Handling',
      part: '.catch(error => console.error(error))',
      color: 'var(--danger)',
      desc: 'Handle any errors that occur during the request'
    }
  ];

  const basicFetchCode = `// Basic Fetch API Example
const url = 'https://api.example.com/users';

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    displayUsers(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });`;

  const postRequestCode = `// POST request with data
const userData = {
  name: 'John Doe',
  email: 'john@example.com'
};

fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(userData)
})
.then(response => response.json())
.then(data => {
  console.log('User created:', data);
})
.catch(error => {
  console.error('Error:', error);
});`;

  const practicalCode = `// Practical example: Loading user profile
async function loadUserProfile(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const user = await response.json();
    
    // Update the page
    document.getElementById('username').textContent = user.name;
    document.getElementById('email').textContent = user.email;
    document.getElementById('avatar').src = user.avatar;
    
  } catch (error) {
    console.error('Failed to load user:', error);
    showErrorMessage('Unable to load user profile');
  }
}`;

  // Interactive steps for fetch workflow
  const fetchSteps: Step[] = [
    {
      label: "Initialize Request",
      desc: "Call fetch() with the URL to start the HTTP request",
      highlight: "fetch(url)"
    },
    {
      label: "Send HTTP Request", 
      desc: "Browser sends the request to the server in the background",
      highlight: "// Browser sends request to server"
    },
    {
      label: "Receive Response",
      desc: "Server responds with data, fetch returns a Promise",
      highlight: ".then(response => response.json())"
    },
    {
      label: "Process Data",
      desc: "Convert response to JSON and use the data",
      highlight: ".then(data => { displayUsers(data); })"
    },
    {
      label: "Handle Completion",
      desc: "Update the UI with new data, no page reload needed",
      highlight: "// Page updated dynamically"
    }
  ];

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        The <strong>Fetch API</strong> is the modern, Promise-based way to make HTTP requests in JavaScript. It's cleaner and more powerful than the older XMLHttpRequest approach.
      </p>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Basic Fetch Syntax
        </Typography>
        <CodePartsExplanation 
          code={basicFetchCode}
          parts={codeParts}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          How Fetch Works Step by Step
        </Typography>
        <StepThroughCodeAnimation
          code={[
            'fetch(url)',
            '// Browser sends request to server',  
            '.then(response => response.json())',
            '.then(data => { displayUsers(data); })',
            '// Page updated dynamically'
          ]}
          steps={fetchSteps}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          POST Request Example
        </Typography>
        <CodePartsExplanation 
          code={postRequestCode}
          parts={[
            {
              label: 'Request Options',
              part: "method: 'POST'",
              color: 'var(--feature)',
              desc: 'Specify HTTP method and headers for the request'
            },
            {
              label: 'JSON Data',
              part: 'JSON.stringify(userData)',
              color: 'var(--info)',
              desc: 'Convert JavaScript object to JSON string for sending'
            }
          ]}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Modern Async/Await Approach
        </Typography>
        <CodePartsExplanation 
          code={practicalCode}
          parts={[
            {
              label: 'Async Function',
              part: 'async function loadUserProfile',
              color: 'var(--feature)',
              desc: 'Use async/await for cleaner, more readable code'
            },
            {
              label: 'Error Handling',
              part: 'if (!response.ok)',
              color: 'var(--warning)',
              desc: 'Check response status and handle HTTP errors'
            },
            {
              label: 'DOM Updates',
              part: 'document.getElementById',
              color: 'var(--success)',
              desc: 'Update page elements with fetched data'
            }
          ]}
        />
      </Box>

      <CalloutBox title="Key Fetch API Concepts" type="key-concepts">
        <Box component="ul" sx={{ margin: 0, paddingLeft: 3, '& li': { marginBottom: 1.5, color: 'var(--ink-soft)' } }}>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--info)' }}>Promise-based:</Typography> Returns a Promise, use .then() or async/await</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--info)' }}>Response object:</Typography> Contains status, headers, and methods to extract data</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--info)' }}>JSON conversion:</Typography> Call response.json() to parse JSON data</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--info)' }}>Error handling:</Typography> Always include .catch() or try/catch blocks</li>
        </Box>
      </CalloutBox>
    </div>
  );
};

export default FetchAPIExample;