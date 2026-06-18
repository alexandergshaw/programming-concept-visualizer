import ConceptWrapper from '../../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import PatternsBasics from './SubComponents/PatternsBasics';
import InheritancePatternExample from './SubComponents/InheritancePatternExample';
import CompositionPatternExample from './SubComponents/CompositionPatternExample';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree, faPuzzlePiece, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ObjectPatternsConcept() {
  return (
    <ConceptWrapper
      title="Advanced Object Patterns: Inheritance vs Composition"
      description="Master the key design patterns for object-oriented programming by understanding when to use inheritance versus composition in your JavaScript applications."
    >
      <TableOfContents numbered>
        <Section title="Understanding Design Patterns">
          <PatternsBasics />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--info-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faTree} style={{ fontSize: 20, color: 'var(--info)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--info)' }}>What&apos;s next:</strong> Let&apos;s see inheritance in action with a complete example showing IS-A relationships in practice.
            </Typography>
          </Box>
        </Section>

        <Section title="Inheritance Pattern in Action">
          <InheritancePatternExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--info-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faPuzzlePiece} style={{ fontSize: 20, color: 'var(--info)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--info)' }}>What&apos;s next:</strong> Now explore composition - a more flexible approach using HAS-A relationships to build complex objects.
            </Typography>
          </Box>
        </Section>

        <Section title="Composition Pattern in Action">
          <CompositionPatternExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--success-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 20, color: 'var(--success)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--success)' }}>Excellent work!</strong> You've mastered both inheritance and composition patterns and can now make informed design decisions in your JavaScript applications.
            </Typography>
          </Box>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}