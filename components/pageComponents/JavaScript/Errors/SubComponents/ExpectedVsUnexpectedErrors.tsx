import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';

const ExpectedVsUnexpectedErrors: React.FC = () => {
  return (
    <div style={{ marginBottom: 40 }}>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        Let&apos;s learn to distinguish between errors you should anticipate and handle versus those you should fix during development.
      </p>

      {/* Expected vs Unexpected Errors */}
      <ConceptInfoCard>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          What We&apos;re Learning:
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mt: 2 }}>
          <Box sx={{ flex: 1, p: 2, bgcolor: '#e3f2fd', borderRadius: 1 }}>
            <Typography fontWeight={600} sx={{ color: '#1976d2', mb: 1 }}>
              Expected Errors
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Errors you can anticipate and plan for:
            </Typography>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: '0.9rem' }}>
              <li>Network request failures</li>
              <li>Invalid user input</li>
              <li>File not found</li>
              <li>Permission denied</li>
            </ul>
            <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
              These need graceful handling in your application
            </Typography>
          </Box>

          <Box sx={{ flex: 1, p: 2, bgcolor: '#fff3e0', borderRadius: 1 }}>
            <Typography fontWeight={600} sx={{ color: '#f57c00', mb: 1 }}>
              Unexpected Errors
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Programming mistakes or unusual conditions:
            </Typography>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: '0.9rem' }}>
              <li>Typos in variable names</li>
              <li>Logic errors</li>
              <li>Syntax errors</li>
              <li>Browser compatibility issues</li>
            </ul>
            <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
              These should be fixed during development
            </Typography>
          </Box>
        </Box>
      </ConceptInfoCard>

      {/* Step-by-step explanation */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Understanding Each Type
        </Typography>

        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', mb: 3 }}>
          <Typography fontWeight={600} gutterBottom>Identify Expected Errors</Typography>
          <Typography paragraph sx={{ mb: 2, fontSize: 15 }}>
            These are situations where something might go wrong, but it's not your fault as a programmer:
          </Typography>
          <Box sx={{
            bgcolor: '#f5f5f5',
            p: 2,
            borderRadius: 1,
            fontFamily: 'monospace',
            fontSize: 14,
            whiteSpace: 'pre-wrap',
            mb: 2
          }}>
            {`// Expected: Network might be down
const response = await fetch('/api/users');
// This could fail if:
// - Internet connection is lost
// - Server is temporarily unavailable
// - Network timeout occurs

const data = JSON.parse(userInput);
// This could fail if:
// - User enters invalid JSON
// - Input contains special characters
// - Data format is unexpected`}
          </Box>
        </Paper>

        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', mb: 3 }}>
          <Typography fontWeight={600} gutterBottom>Step 2: Understanding Expected Error Scenarios</Typography>
          <Typography paragraph sx={{ mb: 2, fontSize: 15 }}>
            These are common situations where errors naturally occur in web applications:
          </Typography>
          <Box sx={{
            bgcolor: '#f5f5f5',
            p: 2,
            borderRadius: 1,
            fontFamily: 'monospace',
            fontSize: 14,
            whiteSpace: 'pre-wrap',
            mb: 2
          }}>
            {`// File operations that might fail
const fileContent = readFile('config.json');
// Could throw: File not found, Permission denied

// API calls that might fail  
const userData = await fetchUserProfile(userId);
// Could throw: Network error, 404 Not Found, Server timeout

// User input parsing that might fail
const settings = JSON.parse(userSettings);
// Could throw: Invalid JSON syntax, Unexpected token`}
          </Box>
        </Paper>

        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', mb: 3 }}>
          <Typography fontWeight={600} gutterBottom>Step 3: Identifying Unexpected Errors</Typography>
          <Typography paragraph sx={{ mb: 2, fontSize: 15 }}>
            These are bugs in your code that should be fixed during development:
          </Typography>
          <Box sx={{
            bgcolor: '#f5f5f5',
            p: 2,
            borderRadius: 1,
            fontFamily: 'monospace',
            fontSize: 14,
            whiteSpace: 'pre-wrap',
            mb: 2
          }}>
            {`// Unexpected: Typo in variable name
console.log(userName); // ReferenceError: userName is not defined
// Should be: username (lowercase 'n')

// Unexpected: Wrong method call
let text = "hello";
text.push("world"); // TypeError: text.push is not a function
// Should be: text + "world" or use an array

// Unexpected: Logic error
for (let i = 0; i <= array.length; i++) {
  console.log(array[i]); // Will access undefined on last iteration
}
// Should be: i < array.length (not <=)`}
          </Box>
        </Paper>

        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', mb: 3 }}>
          <Typography fontWeight={600} gutterBottom>Step 4: Decision Framework</Typography>
          <Typography paragraph sx={{ mb: 2, fontSize: 15 }}>
            Ask yourself these questions to decide how to handle an error:
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ p: 2, bgcolor: '#e3f2fd', borderRadius: 1, borderLeft: '4px solid #1976d2' }}>
              <Typography fontWeight={600} sx={{ color: '#1976d2', mb: 1 }}>Questions to Ask:</Typography>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: '0.9rem' }}>
                <li>Is this error caused by external factors I can't control?</li>
                <li>Could this happen even in a perfectly written program?</li>
                <li>Do I need to provide a fallback or alternative for users?</li>
              </ul>
              <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                If YES → Plan for graceful error handling
              </Typography>
            </Box>
            
            <Box sx={{ p: 2, bgcolor: '#fff3e0', borderRadius: 1, borderLeft: '4px solid #f57c00' }}>
              <Typography fontWeight={600} sx={{ color: '#f57c00', mb: 1 }}>If the Error Is:</Typography>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: '0.9rem' }}>
                <li>A typo or mistake in your code</li>
                <li>A logic error you can prevent</li>
                <li>Something that should never happen in normal operation</li>
              </ul>
              <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                Then FIX the code during development
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default ExpectedVsUnexpectedErrors;