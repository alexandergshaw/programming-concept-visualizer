import ConceptWrapper from '../../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import ErrorHandlingBasics from './SubComponents/ErrorHandlingBasics';
import TryBlockExample from './SubComponents/TryBlockExample';
import CatchBlockExample from './SubComponents/CatchBlockExample';
import FinallyBlockExample from './SubComponents/FinallyBlockExample';
import CompleteErrorHandlingExample from './SubComponents/CompleteErrorHandlingExample';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faShield, faBroom, faPuzzlePiece, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function TryCatchFinallyConcept() {
  return (
    <ConceptWrapper
      title="Try-Catch-Finally: Handling Errors Gracefully"
      description="Master JavaScript's structured approach to error handling with try-catch-finally blocks that keep your applications running smoothly."
    >
      <TableOfContents numbered>
        <Section title="Why Error Handling Matters">
          <ErrorHandlingBasics />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faExclamationTriangle} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What's next:</strong> Let's start with the try block - where you put code that might fail and see how JavaScript handles it step by step.
            </Typography>
          </Box>
        </Section>

        <Section title="The Try Block: Executing Risky Code">
          <TryBlockExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faShield} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What's next:</strong> When the try block fails, the catch block saves the day - let's see how it transforms errors into helpful responses.
            </Typography>
          </Box>
        </Section>

        <Section title="The Catch Block: When Things Go Wrong">
          <CatchBlockExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faBroom} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What's next:</strong> The finally block is your cleanup crew - it always runs, whether your code succeeds or fails. Perfect for essential cleanup tasks.
            </Typography>
          </Box>
        </Section>

        <Section title="The Finally Block: Always Execute Cleanup">
          <FinallyBlockExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faPuzzlePiece} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What's next:</strong> Time to see try, catch, and finally working together in a complete, real-world error handling example.
            </Typography>
          </Box>
        </Section>

        <Section title="Putting It All Together">
          <CompleteErrorHandlingExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e8f5e9', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 20, color: '#4caf50' }} />
            <Typography variant="body2">
              <strong style={{ color: '#4caf50' }}>Excellent work!</strong> You've mastered error handling and can now write robust JavaScript applications that gracefully handle unexpected situations.
            </Typography>
          </Box>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
