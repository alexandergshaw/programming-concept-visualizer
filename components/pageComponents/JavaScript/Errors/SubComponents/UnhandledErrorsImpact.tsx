import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';

const UnhandledErrorsImpact: React.FC = () => {
  return (
    <div style={{ marginBottom: 40 }}>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        Let&apos;s see what happens when errors occur in your code and you don't handle them properly.
      </p>

      {/* Step-by-step explanation */}
      <Box sx={{ mt: 3 }}>
        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', mb: 3 }}>
          <Typography fontWeight={600} gutterBottom>Without Error Handling - Code Stops</Typography>
          <Typography paragraph sx={{ mb: 2, fontSize: 15 }}>
            When an error occurs without proper handling, your entire script stops running:
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
            {`console.log("Step 1: Starting...");
console.log(undefinedVariable); // ❌ Crashes here
console.log("Step 2: This never runs");
console.log("Step 3: Neither does this");

// Result: Only "Step 1: Starting..." appears
// The rest of your code is ignored`}
          </Box>
        </Paper>

        <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', mb: 3 }}>
          <Typography fontWeight={600} gutterBottom>User Experience Impact</Typography>
          <Typography paragraph sx={{ mb: 2, fontSize: 15 }}>
            The difference in user experience is dramatic:
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
            <Box sx={{ flex: 1, p: 2, bgcolor: '#ffebee', borderRadius: 1 }}>
              <Typography fontWeight={600} sx={{ color: '#d32f2f', mb: 1 }}>❌ Unhandled Error:</Typography>
              <Typography variant="body2">
                • Page stops working<br/>
                • User sees blank content<br/>
                • No feedback about what went wrong<br/>
                • User might lose their work<br/>
                • Looks unprofessional
              </Typography>
            </Box>
            
            <Box sx={{ flex: 1, p: 2, bgcolor: '#e8f5e9', borderRadius: 1 }}>
              <Typography fontWeight={600} sx={{ color: '#2e7d32', mb: 1 }}>✅ Handled Error:</Typography>
              <Typography variant="body2">
                • Page continues working<br/>
                • User sees helpful message<br/>
                • Alternative options provided<br/>
                • User's work is preserved<br/>
                • Professional experience
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default UnhandledErrorsImpact;