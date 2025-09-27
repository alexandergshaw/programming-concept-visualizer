import ConceptWrapper from '../../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import SwitchBasics from './SubComponents/SwitchBasics';
import BasicSwitchExample from './SubComponents/BasicSwitchExample';
import SwitchCaseBreakExample from './SubComponents/SwitchCaseBreakExample';
import DefaultCaseExample from './SubComponents/DefaultCaseExample';
import FallthroughExample from './SubComponents/FallthroughExample';
import CompleteSwitchExample from './SubComponents/CompleteSwitchExample';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch, faCog, faExclamationTriangle, faShield, faLink, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function SwitchStatementConcept() {
  return (
    <ConceptWrapper
      title="Switch Statement: Multi-Way Decision Making"
      description="Learn how to use JavaScript's switch statement to handle multiple conditions elegantly and efficiently, making your code cleaner and more readable."
    >
      <TableOfContents numbered>
        <Section title="Understanding Switch Statements">
          <SwitchBasics />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faCodeBranch} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What&apos;s next:</strong> Now let's see how to build a basic switch statement with cases and learn the essential structure.
            </Typography>
          </Box>
        </Section>

        <Section title="Basic Switch Structure">
          <BasicSwitchExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faExclamationTriangle} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What&apos;s next:</strong> Understanding break statements is crucial - without them, your code will "fall through" to the next case unexpectedly.
            </Typography>
          </Box>
        </Section>

        <Section title="Cases and Break Statements">
          <SwitchCaseBreakExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faShield} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What&apos;s next:</strong> The default case acts as your safety net, handling any values that don&apos;t match your specific cases.
            </Typography>
          </Box>
        </Section>

        <Section title="Default Case: The Fallback Option">
          <DefaultCaseExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faLink} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What&apos;s next:</strong> Sometimes you want cases to fall through intentionally - let's see when and how to use this powerful technique.
            </Typography>
          </Box>
        </Section>

        <Section title="Intentional Fall-Through">
          <FallthroughExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faCog} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What&apos;s next:</strong> Time to see all the concepts working together in a complete, real-world switch statement example.
            </Typography>
          </Box>
        </Section>

        <Section title="Complete Switch Pattern">
          <CompleteSwitchExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e8f5e9', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 20, color: '#4caf50' }} />
            <Typography variant="body2">
              <strong style={{ color: '#4caf50' }}>Excellent work!</strong> You've mastered switch statements and can now write clean, efficient multi-way decision logic in JavaScript.
            </Typography>
          </Box>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}