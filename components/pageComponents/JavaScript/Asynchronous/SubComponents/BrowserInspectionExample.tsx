import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import FlexibleGrid from '@/components/common/FlexibleGrid';

const BrowserInspectionExample: React.FC = () => {
  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        <strong>Browser Developer Tools</strong> let you inspect network requests to see exactly what data is being sent and received. This is essential for debugging Ajax requests and understanding API responses.
      </p>

      <ConceptInfoCard>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          
          <Box sx={{ p: 2, border: '1px solid #e3f2fd', borderRadius: 2, bgcolor: '#fafbff' }}>
            <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#1976d2', display: 'flex', alignItems: 'center', gap: 1 }}>
              🔍 Network Tab
            </Typography>
            <Typography variant="body2" fontWeight={600} gutterBottom sx={{ color: '#374151' }}>
              Monitor HTTP requests
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ color: '#6b7280', fontSize: 14 }}>
                How to access:
              </Typography>
              <Box component="ol" sx={{ margin: 0, paddingLeft: 2, fontSize: 14, color: '#475569', '& li': { marginBottom: 0.5 } }}>
                <li>Press F12 or right-click → "Inspect"</li>
                <li>Click on the "Network" tab</li>
                <li>Refresh page or trigger Ajax request</li>
                <li>Click on any request to see details</li>
              </Box>
            </Box>

            <Box sx={{ 
              bgcolor: '#f0f9ff', 
              p: 1.5, 
              borderRadius: 1, 
              border: '1px solid #0ea5e9' 
            }}>
              <Typography variant="body2" fontWeight={700} sx={{ color: '#0369a1', mb: 0.5 }}>
                📊 What you can see:
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 13, color: '#0284c7' }}>
                Request headers, response data, status codes, timing
              </Typography>
            </Box>
          </Box>

          <Box sx={{ p: 2, border: '1px solid #fef3c7', borderRadius: 2, bgcolor: '#fffbeb' }}>
            <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#1976d2', display: 'flex', alignItems: 'center', gap: 1 }}>
              🎯 Console Tab
            </Typography>
            <Typography variant="body2" fontWeight={600} gutterBottom sx={{ color: '#374151' }}>
              Debug with console.log
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ color: '#6b7280', fontSize: 14 }}>
                Useful commands:
              </Typography>
              <Box sx={{ 
                bgcolor: '#f1f5f9', 
                p: 1.5, 
                borderRadius: 1, 
                fontSize: 12, 
                fontFamily: 'monospace',
                color: '#334155',
                border: '1px solid #e2e8f0'
              }}>
                {`// Log response data
console.log('API Response:', data);

// Log errors
console.error('Request failed:', error);

// Check response status
console.log('Status:', response.status);`}
              </Box>
            </Box>

            <Box sx={{ 
              bgcolor: '#fff7ed', 
              p: 1.5, 
              borderRadius: 1, 
              border: '1px solid #f97316' 
            }}>
              <Typography variant="body2" fontWeight={700} sx={{ color: '#ea580c', mb: 0.5 }}>
                ⚡ Pro tip:
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 13, color: '#dc2626' }}>
                Use console.table(data) for better data visualization
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ 
          mt: 3, 
          p: 2.5, 
          bgcolor: '#f8fafc', 
          borderRadius: 2, 
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
            🔧 Common HTTP Status Codes
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2, fontSize: 14 }}>
            <Box>
              <Typography variant="body2" fontWeight={600} sx={{ color: '#16a34a', mb: 1 }}>Success Codes:</Typography>
              <Box sx={{ color: '#475569', lineHeight: 1.6 }}>
                <div><strong>200 OK</strong> - Request successful</div>
                <div><strong>201 Created</strong> - Resource created</div>
                <div><strong>204 No Content</strong> - Success, no data</div>
              </Box>
            </Box>
            <Box>
              <Typography variant="body2" fontWeight={600} sx={{ color: '#dc2626', mb: 1 }}>Error Codes:</Typography>
              <Box sx={{ color: '#475569', lineHeight: 1.6 }}>
                <div><strong>400 Bad Request</strong> - Invalid request</div>
                <div><strong>401 Unauthorized</strong> - Need authentication</div>
                <div><strong>404 Not Found</strong> - Resource not found</div>
                <div><strong>500 Server Error</strong> - Server problem</div>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ 
          mt: 3, 
          p: 2.5, 
          bgcolor: '#f0fdf4', 
          borderRadius: 2, 
          border: '1px solid #bbf7d0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
            📋 Inspection Checklist
          </Typography>
          <Box component="ul" sx={{ margin: 0, paddingLeft: 3, '& li': { marginBottom: 1, color: '#475569' } }}>
            <li><Typography component="span" fontWeight={600} sx={{ color: '#16a34a' }}>Request URL:</Typography> Check if the endpoint is correct</li>
            <li><Typography component="span" fontWeight={600} sx={{ color: '#16a34a' }}>Request Method:</Typography> Verify GET, POST, PUT, DELETE is appropriate</li>
            <li><Typography component="span" fontWeight={600} sx={{ color: '#16a34a' }}>Request Headers:</Typography> Ensure Content-Type and authentication are set</li>
            <li><Typography component="span" fontWeight={600} sx={{ color: '#16a34a' }}>Response Status:</Typography> Check for 2xx success or error codes</li>
            <li><Typography component="span" fontWeight={600} sx={{ color: '#16a34a' }}>Response Data:</Typography> Verify the data format and content</li>
            <li><Typography component="span" fontWeight={600} sx={{ color: '#16a34a' }}>Timing:</Typography> Look for slow requests that need optimization</li>
          </Box>
        </Box>
      </ConceptInfoCard>
    </div>
  );
};

export default BrowserInspectionExample;