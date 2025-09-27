import ConceptWrapper from '../../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import ModulesBasics from './SubComponents/ModulesBasics';
import ModulePatternExample from './SubComponents/ModulePatternExample';
import NamespacesExample from './SubComponents/NamespacesExample';
import ES6ModulesExample from './SubComponents/ES6ModulesExample';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes, faCube, faFolder, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ModulesPatternsConcept() {
  return (
    <ConceptWrapper
      title="Modules & Organization Patterns"
      description="Learn to organize JavaScript code using module patterns, namespaces, and ECMAScript modules for maintainable, scalable applications."
    >
      <TableOfContents numbered>
        <Section title="Code Organization Fundamentals">
          <ModulesBasics />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faBoxes} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What's next:</strong> Let's explore the classic module pattern - using closures to create private and public interfaces.
            </Typography>
          </Box>
        </Section>

        <Section title="The Module Pattern">
          <ModulePatternExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faCube} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What's next:</strong> Now learn about namespaces - organizing related functions and variables under a common name.
            </Typography>
          </Box>
        </Section>

        <Section title="Namespaces for Organization">
          <NamespacesExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faFolder} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What's next:</strong> Finally, discover modern ES6 modules - the standard way to organize JavaScript code today.
            </Typography>
          </Box>
        </Section>

        <Section title="ES6 Modules: The Modern Standard">
          <ES6ModulesExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e8f5e9', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 20, color: '#4caf50' }} />
            <Typography variant="body2">
              <strong style={{ color: '#4caf50' }}>Excellent work!</strong> You've mastered all JavaScript organization patterns and can now build well-structured, maintainable applications.
            </Typography>
          </Box>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}