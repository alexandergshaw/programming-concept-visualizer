import React from 'react';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AjaxBasics: React.FC = () => {
  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        <strong>Ajax (Asynchronous JavaScript and XML)</strong> allows web pages to update content dynamically without reloading the entire page. This creates a smoother, more responsive user experience by exchanging small amounts of data with the server behind the scenes.
      </p>

      <ConceptInfoCard>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          
          <Box sx={{ p: 2, border: '1px solid #e3f2fd', borderRadius: 2, bgcolor: '#fafbff' }}>
            <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#1976d2', display: 'flex', alignItems: 'center', gap: 1 }}>
              🔄 Traditional Web Requests
            </Typography>
            <Typography variant="body2" fontWeight={600} gutterBottom sx={{ color: '#374151' }}>
              Full page reload approach
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ color: '#6b7280', fontSize: 14 }}>
                How it works:
              </Typography>
              <Box component="ul" sx={{ margin: 0, paddingLeft: 2, fontSize: 14, color: '#475569', '& li': { marginBottom: 0.5 } }}>
                <li>User clicks a link or submits a form</li>
                <li>Browser sends request to server</li>
                <li>Server processes and returns full HTML page</li>
                <li>Browser replaces entire page content</li>
              </Box>
            </Box>

            <Box sx={{ 
              bgcolor: '#fef2f2', 
              p: 1.5, 
              borderRadius: 1, 
              border: '1px solid #fecaca' 
            }}>
              <Typography variant="body2" fontWeight={700} sx={{ color: '#dc2626', mb: 0.5 }}>
                ⚠️ Drawbacks:
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 13, color: '#b91c1c' }}>
                Page flicker, slower navigation, lost scroll position
              </Typography>
            </Box>
          </Box>

          <Box sx={{ p: 2, border: '1px solid #dcfce7', borderRadius: 2, bgcolor: '#f0fdf4' }}>
            <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#1976d2', display: 'flex', alignItems: 'center', gap: 1 }}>
              ⚡ Ajax Requests
            </Typography>
            <Typography variant="body2" fontWeight={600} gutterBottom sx={{ color: '#374151' }}>
              Dynamic content updates
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ color: '#6b7280', fontSize: 14 }}>
                How it works:
              </Typography>
              <Box component="ul" sx={{ margin: 0, paddingLeft: 2, fontSize: 14, color: '#475569', '& li': { marginBottom: 0.5 } }}>
                <li>JavaScript makes request in background</li>
                <li>Server returns just the needed data</li>
                <li>JavaScript updates specific page elements</li>
                <li>No full page reload required</li>
              </Box>
            </Box>

            <Box sx={{ 
              bgcolor: '#f0f9ff', 
              p: 1.5, 
              borderRadius: 1, 
              border: '1px solid #0ea5e9' 
            }}>
              <Typography variant="body2" fontWeight={700} sx={{ color: '#0369a1', mb: 0.5 }}>
                ✅ Benefits:
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 13, color: '#0284c7' }}>
                Faster, smoother, more responsive user experience
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
            🎯 Common Ajax Use Cases
          </Typography>
          <Box sx={{ fontSize: 14, lineHeight: 1.8, color: '#475569' }}>
            <Typography component="div" sx={{ mb: 1 }}>
              <Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Form Submissions:</Typography> Submit forms without page reload and show validation messages
            </Typography>
            <Typography component="div" sx={{ mb: 1 }}>
              <Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Live Search:</Typography> Search and display results as user types
            </Typography>
            <Typography component="div" sx={{ mb: 1 }}>
              <Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Content Loading:</Typography> Load more content when scrolling (infinite scroll)
            </Typography>
            <Typography component="div">
              <Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Real-time Updates:</Typography> Chat messages, notifications, live data feeds
            </Typography>
          </Box>
        </Box>
      </ConceptInfoCard>
    </div>
  );
};

export default AjaxBasics;