import ConceptWrapper from '../../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import ParameterBasics from './SubComponents/ParameterBasics';
import DefaultParametersExample from './SubComponents/DefaultParametersExample';
import RestSpreadExample from './SubComponents/RestSpreadExample';
import AdvancedParametersExample from './SubComponents/AdvancedParametersExample';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faEllipsisH, faPuzzlePiece, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function FunctionParametersConcept() {
  return (
    <ConceptWrapper
      title="Function Parameters: Defaults, Rest & Spread"
      description="Master JavaScript's powerful parameter features including default values, rest parameters, and spread syntax to write more flexible and maintainable functions."
    >
      <TableOfContents numbered>
        <Section title="Understanding Function Parameters">
          <ParameterBasics />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faCog} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What's next:</strong> Let's explore default parameters - how to provide fallback values when arguments aren't provided.
            </Typography>
          </Box>
        </Section>

        <Section title="Default Parameters in Action">
          <DefaultParametersExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faEllipsisH} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What's next:</strong> Now discover rest and spread operators - powerful tools for handling variable numbers of arguments.
            </Typography>
          </Box>
        </Section>

        <Section title="Rest & Spread Operators">
          <RestSpreadExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faPuzzlePiece} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What's next:</strong> Time to combine all these techniques in advanced real-world function examples.
            </Typography>
          </Box>
        </Section>

        <Section title="Advanced Parameter Patterns">
          <AdvancedParametersExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e8f5e9', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 20, color: '#4caf50' }} />
            <Typography variant="body2">
              <strong style={{ color: '#4caf50' }}>Excellent work!</strong> You've mastered function parameters and can now write flexible, robust functions that handle any number of arguments gracefully.
            </Typography>
          </Box>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}