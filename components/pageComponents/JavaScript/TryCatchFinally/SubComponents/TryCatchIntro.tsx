import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import Section from '@/components/common/Section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExclamationTriangle, 
  faShield,
  faBroom,
} from '@fortawesome/free-solid-svg-icons';

const TryCatchIntro: React.FC = () => {
  return (
    <div style={{ marginBottom: 40 }}>
      {/* Main concept explanation */}
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        When code runs, things can go wrong—network requests fail, users enter invalid data, or files can't be found. 
        Without proper handling, these errors crash your program and create a poor user experience.
      </p>

      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        <b>Try-catch-finally</b> blocks let you anticipate problems and respond gracefully instead of letting your 
        application crash.
      </p>

      {/* Visual explanation of the flow */}
      <ConceptInfoCard style={{ marginTop: 24 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          How Try-Catch-Finally Error Handling Works
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 2, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, mb: { xs: 2, sm: 0 } }}>
              <FontAwesomeIcon 
                icon={faExclamationTriangle} 
                style={{ fontSize: 40, color: '#3f51b5' }}
              />
              <Typography fontWeight={600} sx={{ mt: 1 }}>Try Block</Typography>
              <Typography variant="body2" sx={{ textAlign: 'center', px: 2 }}>
                Attempt risky code
              </Typography>
            </Box>
            
            <Box sx={{ fontSize: '1.5rem', mx: 2, display: { xs: 'none', sm: 'block' } }}>→</Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, mb: { xs: 2, sm: 0 } }}>
              <FontAwesomeIcon 
                icon={faShield} 
                style={{ fontSize: 40, color: '#4caf50' }}
              />
              <Typography fontWeight={600} sx={{ mt: 1 }}>Catch Block</Typography>
              <Typography variant="body2" sx={{ textAlign: 'center', px: 2 }}>
                Handle any errors
              </Typography>
            </Box>
            
            <Box sx={{ fontSize: '1.5rem', mx: 2, display: { xs: 'none', sm: 'block' } }}>→</Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <FontAwesomeIcon 
                icon={faBroom} 
                style={{ fontSize: 40, color: '#ff9800' }}
              />
              <Typography fontWeight={600} sx={{ mt: 1 }}>Finally Block</Typography>
              <Typography variant="body2" sx={{ textAlign: 'center', px: 2 }}>
                Always cleanup
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1, border: '1px dashed #ccc' }}>
          <Typography sx={{ fontFamily: 'monospace', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
            <span style={{ color: '#777' }}>{/* The pattern is always: */}</span><br/>
            <span style={{ color: '#0066cc' }}>try</span> {'{'}<br/>
            &nbsp;&nbsp;<span style={{ color: '#777' }}>{/* Risky code that might fail */}</span><br/>
            {'}'} <span style={{ color: '#0066cc' }}>catch</span> (error) {'{'}<br/>
            &nbsp;&nbsp;<span style={{ color: '#777' }}>{/* Handle the error gracefully */}</span><br/>
            {'}'} <span style={{ color: '#0066cc' }}>finally</span> {'{'}<br/>
            &nbsp;&nbsp;<span style={{ color: '#777' }}>{/* Cleanup code (always runs) */}</span><br/>
            {'}'}
          </Typography>
        </Box>
      </ConceptInfoCard>

      {/* Key concepts explanation */}
      <Section title="The Three Key Blocks">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
          <Paper sx={{ p: 2, bgcolor: '#f3f6ff', borderLeft: '4px solid #3f51b5', borderRadius: '4px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <FontAwesomeIcon icon={faExclamationTriangle} style={{ fontSize: 20, color: '#3f51b5' }} />
              <Typography fontWeight={600} sx={{ fontSize: '1.1rem' }}>1. Try Block</Typography>
            </Box>
            <Typography>
              Contains code that might throw an error. JavaScript attempts to execute this code first:
            </Typography>
            <ul style={{ marginTop: 8, marginBottom: 0 }}>
              <li><b>API calls</b> - network requests that might fail</li>
              <li><b>file operations</b> - reading files that might not exist</li>
              <li><b>user input</b> - parsing data that might be invalid</li>
              <li><b>calculations</b> - operations that might produce errors</li>
            </ul>
          </Paper>
          
          <Paper sx={{ p: 2, bgcolor: '#f0f9f0', borderLeft: '4px solid #4caf50', borderRadius: '4px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <FontAwesomeIcon icon={faShield} style={{ fontSize: 20, color: '#4caf50' }} />
              <Typography fontWeight={600} sx={{ fontSize: '1.1rem' }}>2. Catch Block</Typography>
            </Box>
            <Typography>
              Runs only if an error occurs in the try block. Receives the error object with details about what went wrong.
            </Typography>
            <Box sx={{ mt: 1, p: 1, bgcolor: '#e8f5e9', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
              catch (error) {'{ console.log(error.message); }'}
            </Box>
          </Paper>
          
          <Paper sx={{ p: 2, bgcolor: '#fff8e6', borderLeft: '4px solid #ff9800', borderRadius: '4px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <FontAwesomeIcon icon={faBroom} style={{ fontSize: 20, color: '#ff9800' }} />
              <Typography fontWeight={600} sx={{ fontSize: '1.1rem' }}>3. Finally Block (Optional)</Typography>
            </Box>
            <Typography>
              Always runs, whether the try block succeeds or fails. Perfect for cleanup operations:
            </Typography>
            <ul style={{ marginTop: 8, marginBottom: 0 }}>
              <li>Closing database connections</li>
              <li>Hiding loading spinners</li>
              <li>Releasing resources</li>
              <li>Logging completion status</li>
            </ul>
          </Paper>
        </Box>
      </Section>

      <ConceptInfoCard style={{ marginTop: 24 }}>
        <Typography fontWeight={600} gutterBottom>Real-world example: Making a Phone Call</Typography>
        <ul style={{ margin: '8px 0' }}>
          <li><b>Try:</b> Attempt to dial the number</li>
          <li><b>Catch:</b> If busy or no answer, leave voicemail or try later</li>
          <li><b>Finally:</b> Always hang up the phone when done</li>
        </ul>
      </ConceptInfoCard>
    </div>
  );
};

export default TryCatchIntro;