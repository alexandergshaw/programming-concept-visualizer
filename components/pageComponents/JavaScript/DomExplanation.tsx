import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes } from '@fortawesome/free-solid-svg-icons';

const DomExplanation: React.FC = () => {
  return (
    <ConceptInfoCard style={{ marginBottom: 24 }}>
      
      <p style={{ fontSize: 16, lineHeight: 1.6, marginTop: 0, marginBottom: 16 }}>
        When you visit a website, your browser turns the HTML code into something called the <b>DOM</b> (Document Object Model). 
        Don&apos;t worry about the technical name - just think of it as a <b>live blueprint</b> of the page.
      </p>
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'center', mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography fontWeight={500} gutterBottom>Imagine a house blueprint that you can change:</Typography>
          <ul style={{ margin: 0, paddingLeft: 20, marginBottom: 16 }}>
            <li style={{ marginBottom: 8 }}>If you erase a window on the blueprint, the actual window disappears</li>
            <li style={{ marginBottom: 8 }}>If you add a door on the blueprint, a real door appears</li>
            <li style={{ marginBottom: 8 }}>If you change the color of a wall on the blueprint, the real wall changes color</li>
          </ul>
          
          <Box sx={{ mt: 3, mb: 2, pl: 2, borderLeft: '3px solid #2196f3' }}>
            <Typography fontWeight={500} gutterBottom>That&apos;s how JavaScript works with websites:</Typography>
            <p style={{ margin: '8px 0 0 0' }}>
              JavaScript can change the DOM (the blueprint), and the browser automatically updates what you see on screen.
            </p>
          </Box>
        </Box>
        
        <Box sx={{ 
          p: 2, 
          bgcolor: '#f5f7fa', 
          borderRadius: 2, 
          border: '1px dashed #ccc',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          maxWidth: 270,
          mb: { xs: 2, md: 0 }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <FontAwesomeIcon icon={faCubes} style={{ color: '#1976d2' }} />
            <Typography fontWeight={600}>The DOM is like a family tree</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.85rem', lineHeight: 1.5 }}>
{`webpage
  └── header
  │   └── logo
  └── main content
      ├── article
      │   └── paragraph
      └── button`}
            </pre>
          </Box>
        </Box>
      </Box>
      
      <Box sx={{ bgcolor: '#f0f4fa', p: 2, borderRadius: 2, mt: 2 }}>
        <Typography fontWeight={600} gutterBottom>
          So in simple terms:
        </Typography>
        <Typography sx={{ fontSize: 16 }}>
          The DOM is like a live version of your webpage that JavaScript can change. 
          When JavaScript modifies the DOM, the browser instantly updates what you see.
          It&apos;s like having a magical connection between code and the screen!
        </Typography>
      </Box>
    </ConceptInfoCard>
  );
};

export default DomExplanation;