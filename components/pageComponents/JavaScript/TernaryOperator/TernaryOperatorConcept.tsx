import ConceptWrapper from '../../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import TernaryBasics from './SubComponents/TernaryBasics';
import BasicTernaryExample from './SubComponents/BasicTernaryExample';
import NestedTernaryExample from './SubComponents/NestedTernaryExample';
import CompleteTernaryExample from './SubComponents/CompleteTernaryExample';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faChain, faRocket, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function TernaryOperatorConcept() {
  return (
    <ConceptWrapper
      title="Ternary Operator: Concise Conditional Expressions"
      description="Master JavaScript's ternary operator for writing clean, concise conditional expressions that replace simple if-else statements."
    >
      <TableOfContents numbered>
        <Section title="Understanding the Ternary Operator">
          <TernaryBasics />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faLightbulb} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What&apos;s next:</strong> Now that you understand the basic syntax, let's see the ternary operator in action with an interactive example.
            </Typography>
          </Box>
        </Section>

        <Section title="Basic Ternary Examples">
          <BasicTernaryExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faChain} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What&apos;s next:</strong> Simple ternary operators are great, but what happens when you need to handle multiple conditions? Let&apos;s explore chaining ternary operators together.
            </Typography>
          </Box>
        </Section>

        <Section title="Nested Ternary Operators">
          <NestedTernaryExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faRocket} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What&apos;s next:</strong> You've mastered the basics and chaining. Now let's see how ternary operators are used in real-world development scenarios.
            </Typography>
          </Box>
        </Section>

        <Section title="Advanced Ternary Patterns">
          <CompleteTernaryExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e8f5e9', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 20, color: '#4caf50' }} />
            <Typography variant="body2">
              <strong style={{ color: '#4caf50' }}>Excellent work!</strong> You've mastered the ternary operator and can now write concise, readable conditional expressions in JavaScript.
            </Typography>
          </Box>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}