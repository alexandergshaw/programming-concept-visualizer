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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--info-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faCog} style={{ fontSize: 20, color: 'var(--info)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--info)' }}>What&apos;s next:</strong> Let&apos;s explore default parameters - how to provide fallback values when arguments aren&apos;t provided.
            </Typography>
          </Box>
        </Section>

        <Section title="Default Parameters in Action">
          <DefaultParametersExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--info-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faEllipsisH} style={{ fontSize: 20, color: 'var(--info)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--info)' }}>What&apos;s next:</strong> Now discover rest and spread operators - powerful tools for handling variable numbers of arguments.
            </Typography>
          </Box>
        </Section>

        <Section title="Rest & Spread Operators">
          <RestSpreadExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--info-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faPuzzlePiece} style={{ fontSize: 20, color: 'var(--info)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--info)' }}>What&apos;s next:</strong> Time to combine all these techniques in advanced real-world function examples.
            </Typography>
          </Box>
        </Section>

        <Section title="Advanced Parameter Patterns">
          <AdvancedParametersExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--success-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 20, color: 'var(--success)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--success)' }}>Excellent work!</strong> You've mastered function parameters and can now write flexible, robust functions that handle any number of arguments gracefully.
            </Typography>
          </Box>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}