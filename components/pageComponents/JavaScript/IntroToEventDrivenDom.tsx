import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import Section from '@/components/common/Section';
import { useTheme } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHandPointer, 
  faEarListen,
  faCode,
  faTree,
  faCubes
} from '@fortawesome/free-solid-svg-icons';

const EventDrivenIntro: React.FC = () => {
  const theme = useTheme();

  return (
    <div style={{ marginBottom: 40 }}>
      {/* Main concept explanation */}
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        When you interact with a website—clicking buttons, typing in forms, hovering over images—the page responds 
        to your actions. This interactive behavior is powered by <b>event-driven programming</b>.
      </p>

      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        Think of it as setting up a series of "If this happens, then do that" instructions for your webpage.
      </p>

      {/* Visual explanation of the flow */}
      <ConceptInfoCard style={{ marginTop: 24 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          How Event-Driven DOM Manipulation Works
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 2, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, mb: { xs: 2, sm: 0 } }}>
              <FontAwesomeIcon 
                icon={faHandPointer} 
                style={{ fontSize: 40, color: '#3f51b5' }}
              />
              <Typography fontWeight={600} sx={{ mt: 1 }}>User Action</Typography>
              <Typography variant="body2" sx={{ textAlign: 'center', px: 2 }}>
                Click, type, scroll, etc.
              </Typography>
            </Box>
            
            <Box sx={{ fontSize: '1.5rem', mx: 2, display: { xs: 'none', sm: 'block' } }}>→</Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, mb: { xs: 2, sm: 0 } }}>
              <FontAwesomeIcon 
                icon={faEarListen} 
                style={{ fontSize: 40, color: '#4caf50' }}
              />
              <Typography fontWeight={600} sx={{ mt: 1 }}>Event Listener</Typography>
              <Typography variant="body2" sx={{ textAlign: 'center', px: 2 }}>
                Code waits for specific event
              </Typography>
            </Box>
            
            <Box sx={{ fontSize: '1.5rem', mx: 2, display: { xs: 'none', sm: 'block' } }}>→</Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <FontAwesomeIcon 
                icon={faCode} 
                style={{ fontSize: 40, color: '#ff9800' }}
              />
              <Typography fontWeight={600} sx={{ mt: 1 }}>DOM Changes</Typography>
              <Typography variant="body2" sx={{ textAlign: 'center', px: 2 }}>
                Elements update on page
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1, border: '1px dashed #ccc' }}>
          <Typography sx={{ fontFamily: 'monospace', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
            <span style={{ color: '#777' }}>// The pattern is always:</span><br/>
            element.<span style={{ color: '#0066cc' }}>addEventListener</span>(<span style={{ color: '#cc0000' }}>"event"</span>, function() {'{'}<br/>
            &nbsp;&nbsp;<span style={{ color: '#777' }}>// Do something with the DOM</span><br/>
            {'}'});
          </Typography>
        </Box>
      </ConceptInfoCard>

      {/* Key concepts explanation */}
      <Section title="The Three Key Pieces" style={{ marginTop: 24 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
          <Paper sx={{ p: 2, bgcolor: '#f3f6ff', borderLeft: '4px solid #3f51b5', borderRadius: '4px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <FontAwesomeIcon icon={faHandPointer} style={{ fontSize: 20, color: '#3f51b5' }} />
              <Typography fontWeight={600} sx={{ fontSize: '1.1rem' }}>1. Events</Typography>
            </Box>
            <Typography>
              Actions that happen on your webpage that you can respond to:
            </Typography>
            <ul style={{ marginTop: 8, marginBottom: 0 }}>
              <li><b>click</b> - when someone clicks an element</li>
              <li><b>keydown</b> - when someone presses a key</li>
              <li><b>submit</b> - when a form is submitted</li>
              <li><b>mouseover</b> - when a cursor moves over an element</li>
            </ul>
          </Paper>
          
          <Paper sx={{ p: 2, bgcolor: '#f0f9f0', borderLeft: '4px solid #4caf50', borderRadius: '4px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <FontAwesomeIcon icon={faEarListen} style={{ fontSize: 20, color: '#4caf50' }} />
              <Typography fontWeight={600} sx={{ fontSize: '1.1rem' }}>2. Listeners</Typography>
            </Box>
            <Typography>
              JavaScript functions that wait for specific events and run when they occur. Like a security guard 
              watching for specific activities.
            </Typography>
            <Box sx={{ mt: 1, p: 1, bgcolor: '#e8f5e9', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
              button.addEventListener("click", handleClick);
            </Box>
          </Paper>
          
          <Paper sx={{ p: 2, bgcolor: '#fff8e6', borderLeft: '4px solid #ff9800', borderRadius: '4px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <FontAwesomeIcon icon={faCode} style={{ fontSize: 20, color: '#ff9800' }} />
              <Typography fontWeight={600} sx={{ fontSize: '1.1rem' }}>3. DOM Manipulation</Typography>
            </Box>
            <Typography>
              Changing parts of your webpage in response to events, such as:
            </Typography>
            <ul style={{ marginTop: 8, marginBottom: 0 }}>
              <li>Changing text content</li>
              <li>Updating styles or classes</li>
              <li>Adding new elements</li>
              <li>Reading values from forms</li>
            </ul>
          </Paper>
        </Box>
      </Section>

      <ConceptInfoCard style={{ marginTop: 24 }}>
        <Typography fontWeight={600} gutterBottom>Real-world example: A Light Switch</Typography>
        <ul style={{ margin: '8px 0' }}>
          <li><b>Event:</b> Flipping the switch</li>
          <li><b>Listener:</b> The wiring that detects when the switch is flipped</li>
          <li><b>DOM Manipulation:</b> The light turning on or off</li>
        </ul>
      </ConceptInfoCard>
    </div>
  );
};

export default EventDrivenIntro;