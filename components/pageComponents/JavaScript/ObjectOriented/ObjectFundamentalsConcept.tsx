import ConceptWrapper from '../../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faWrench, faBoxOpen, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Import sub-components
import ObjectBasics from './SubComponents/ObjectBasics';
import ClassCreationExample from './SubComponents/ClassCreationExample';
import PropertiesMethodsExample from './SubComponents/PropertiesMethodsExample';
import DestructuringExample from './SubComponents/DestructuringExample';

export default function ObjectFundamentalsConcept() {
  return (
    <ConceptWrapper
      title="Object Fundamentals: Classes, Properties, and Methods"
      description="Master the basics of JavaScript objects by learning to create classes, work with properties and methods, and use destructuring to extract object data."
    >
      <TableOfContents numbered>
        <Section title="Creating Classes and Objects">
          <ObjectBasics />
          <ClassCreationExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--info-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faWrench} style={{ fontSize: 20, color: 'var(--info)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--info)' }}>What&apos;s next:</strong> Now let's explore how to access and use the properties and methods of the objects you create.
            </Typography>
          </Box>
        </Section>

        <Section title="Using Object Properties and Methods">
          <PropertiesMethodsExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--info-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faBoxOpen} style={{ fontSize: 20, color: 'var(--info)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--info)' }}>What&apos;s next:</strong> Learn destructuring - a powerful way to extract values from objects into individual variables.
            </Typography>
          </Box>
        </Section>

        <Section title="Object Destructuring">
          <DestructuringExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--success-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 20, color: 'var(--success)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--success)' }}>Excellent work!</strong> You've mastered object fundamentals and can now create and manipulate JavaScript objects effectively.
            </Typography>
          </Box>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}