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
          
          <Box sx={{ p: 2, border: '1px solid var(--info-bg)', borderRadius: 2, bgcolor: 'var(--paper-raised)' }}>
            <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: 'var(--info)', display: 'flex', alignItems: 'center', gap: 1 }}>
              🔍 Network Tab
            </Typography>
            <Typography variant="body2" fontWeight={600} gutterBottom sx={{ color: 'var(--ink)' }}>
              Monitor HTTP requests
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ color: 'var(--ink-soft)', fontSize: 14 }}>
                How to access:
              </Typography>
              <Box component="ol" sx={{ margin: 0, paddingLeft: 2, fontSize: 14, color: 'var(--ink-soft)', '& li': { marginBottom: 0.5 } }}>
                <li>Press F12 or right-click → "Inspect"</li>
                <li>Click on the "Network" tab</li>
                <li>Refresh page or trigger Ajax request</li>
                <li>Click on any request to see details</li>
              </Box>
            </Box>

            <Box sx={{ 
              bgcolor: 'var(--info-bg)', 
              p: 1.5, 
              borderRadius: 1, 
              border: '1px solid var(--info)' 
            }}>
              <Typography variant="body2" fontWeight={700} sx={{ color: 'var(--info)', mb: 0.5 }}>
                📊 What you can see:
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 13, color: 'var(--info)' }}>
                Request headers, response data, status codes, timing
              </Typography>
            </Box>
          </Box>

          <Box sx={{ p: 2, border: '1px solid var(--warning-bg)', borderRadius: 2, bgcolor: 'var(--warning-bg)' }}>
            <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: 'var(--info)', display: 'flex', alignItems: 'center', gap: 1 }}>
              🎯 Console Tab
            </Typography>
            <Typography variant="body2" fontWeight={600} gutterBottom sx={{ color: 'var(--ink)' }}>
              Debug with console.log
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ color: 'var(--ink-soft)', fontSize: 14 }}>
                Useful commands:
              </Typography>
              <Box sx={{ 
                bgcolor: 'var(--paper-sunken)', 
                p: 1.5, 
                borderRadius: 1, 
                fontSize: 12, 
                fontFamily: 'monospace',
                color: 'var(--ink)',
                border: '1px solid var(--line)'
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
              bgcolor: 'var(--warning-bg)', 
              p: 1.5, 
              borderRadius: 1, 
              border: '1px solid var(--warning)' 
            }}>
              <Typography variant="body2" fontWeight={700} sx={{ color: 'var(--warning)', mb: 0.5 }}>
                ⚡ Pro tip:
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 13, color: 'var(--danger)' }}>
                Use console.table(data) for better data visualization
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ 
          mt: 3, 
          p: 2.5, 
          bgcolor: 'var(--paper-sunken)', 
          borderRadius: 2, 
          border: '1px solid var(--line)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 1 }}>
            🔧 Common HTTP Status Codes
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2, fontSize: 14 }}>
            <Box>
              <Typography variant="body2" fontWeight={600} sx={{ color: 'var(--success)', mb: 1 }}>Success Codes:</Typography>
              <Box sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                <div><strong>200 OK</strong> - Request successful</div>
                <div><strong>201 Created</strong> - Resource created</div>
                <div><strong>204 No Content</strong> - Success, no data</div>
              </Box>
            </Box>
            <Box>
              <Typography variant="body2" fontWeight={600} sx={{ color: 'var(--danger)', mb: 1 }}>Error Codes:</Typography>
              <Box sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>
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
          bgcolor: 'var(--success-bg)', 
          borderRadius: 2, 
          border: '1px solid var(--success-bg)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 1 }}>
            📋 Inspection Checklist
          </Typography>
          <Box component="ul" sx={{ margin: 0, paddingLeft: 3, '& li': { marginBottom: 1, color: 'var(--ink-soft)' } }}>
            <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--success)' }}>Request URL:</Typography> Check if the endpoint is correct</li>
            <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--success)' }}>Request Method:</Typography> Verify GET, POST, PUT, DELETE is appropriate</li>
            <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--success)' }}>Request Headers:</Typography> Ensure Content-Type and authentication are set</li>
            <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--success)' }}>Response Status:</Typography> Check for 2xx success or error codes</li>
            <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--success)' }}>Response Data:</Typography> Verify the data format and content</li>
            <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--success)' }}>Timing:</Typography> Look for slow requests that need optimization</li>
          </Box>
        </Box>
      </ConceptInfoCard>
    </div>
  );
};

export default BrowserInspectionExample;