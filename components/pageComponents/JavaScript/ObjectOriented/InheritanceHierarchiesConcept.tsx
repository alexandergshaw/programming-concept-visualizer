import ConceptWrapper from '../../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import InheritanceBasics from './SubComponents/InheritanceBasics';
import ClassInheritanceExample from './SubComponents/ClassInheritanceExample';
import ObjectHierarchyExample from './SubComponents/ObjectHierarchyExample';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree, faLayerGroup, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function InheritanceHierarchiesConcept() {
  return (
    <ConceptWrapper
      title="Inheritance & Object Hierarchies in JavaScript"
      description="Understand JavaScript's inheritance system, learn to create class hierarchies, and explore the built-in object inheritance structure."
    >
      <TableOfContents numbered>
        <Section title="Creating Class Inheritance">
          <InheritanceBasics />
          <ClassInheritanceExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faLayerGroup} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What's next:</strong> Now let's explore JavaScript's built-in object hierarchy and how all objects inherit from base types.
            </Typography>
          </Box>
        </Section>

        <Section title="JavaScript's Built-in Object Hierarchy">
          <ObjectHierarchyExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e8f5e9', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 20, color: '#4caf50' }} />
            <Typography variant="body2">
              <strong style={{ color: '#4caf50' }}>Excellent work!</strong> You understand inheritance and JavaScript's object hierarchy - ready to explore advanced object patterns.
            </Typography>
          </Box>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}