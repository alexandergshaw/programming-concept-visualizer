import React from 'react';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import FlexibleGrid from '@/components/common/FlexibleGrid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const PromiseBasics: React.FC = () => {
  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        A <strong>Promise</strong> is a JavaScript object that represents the eventual completion (or failure) of an asynchronous operation. It's like a placeholder for a value that will be available in the future.
      </p>

        <FlexibleGrid 
          items={[
            {
              title: "🔄 Callback Hell",
              description: "Old asynchronous approach\n\nProblems with callbacks:\n• Nested callbacks create \"pyramid of doom\"\n• Hard to handle errors consistently\n• Difficult to read and maintain\n• No built-in error propagation",
              code: `getData((result1) => {
  processData(result1, (result2) => {
    saveData(result2, (result3) => {
      // Deeply nested callbacks
    });
  });
});`,
              titleColor: "#d32f2f",
              backgroundColor: "#fffbeb",
              codeBackgroundColor: "#f1f5f9"
            },
            {
              title: "⚡ Promise Chain", 
              description: "Modern asynchronous approach\n\nPromise advantages:\n• Flat, chainable structure\n• Built-in error handling with .catch()\n• More readable and maintainable\n• Better error propagation",
              code: `getData()
  .then(processData)
  .then(saveData)
  .then(result => {
    // Clean, flat structure
  })
  .catch(handleError);`,
              titleColor: "#388e3c",
              backgroundColor: "#f0fdf4", 
              codeBackgroundColor: "#f1f5f9"
            }
          ]}
          gap={3}
        />

        <Box sx={{ 
          mt: 3, 
          p: 2.5, 
          bgcolor: '#f8fafc', 
          borderRadius: 2, 
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
            🎯 Creating and Using Promises
          </Typography>
          <Box sx={{ fontSize: 14, lineHeight: 1.8, color: '#475569' }}>
            <Typography component="div" sx={{ mb: 1 }}>
              <Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Creating:</Typography> new Promise((resolve, reject) =&gt; {`{ /* async work */ }`})
            </Typography>
            <Typography component="div" sx={{ mb: 1 }}>
              <Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Success:</Typography> Call resolve(value) when operation succeeds
            </Typography>
            <Typography component="div" sx={{ mb: 1 }}>
              <Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Error:</Typography> Call reject(error) when operation fails
            </Typography>
            <Typography component="div">
              <Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Consuming:</Typography> Use .then() for success, .catch() for errors
            </Typography>
          </Box>
        </Box>
    </div>
  );
};

export default PromiseBasics;