import ConceptWrapper from '../../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import ErrorTypesOverview from './SubComponents/ErrorTypesOverview';
import UnhandledErrorsImpact from './SubComponents/UnhandledErrorsImpact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ErrorsConcept() {
  return (
    <ConceptWrapper
      title="JavaScript Errors: Understanding and Prevention"
      description="Learn about different types of JavaScript errors and their impact on applications."
    >
      <TableOfContents numbered>
        <Section title="Types of JavaScript Errors">
          <ErrorTypesOverview />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faExclamationTriangle} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What's next:</strong> Now that you understand the different error types, let's see what happens when these errors go unhandled in your application.
            </Typography>
          </Box>
        </Section>

        <Section title="Impact of Unhandled Errors">
          <UnhandledErrorsImpact />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e8f5e9', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 20, color: '#4caf50' }} />
            <Typography variant="body2">
              <strong style={{ color: '#4caf50' }}>Great foundation!</strong> You now understand JavaScript errors and their impact. Next, learn how to handle them gracefully with try-catch-finally blocks.
            </Typography>
          </Box>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}