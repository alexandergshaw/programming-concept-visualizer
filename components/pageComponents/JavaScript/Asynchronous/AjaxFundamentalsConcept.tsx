import ConceptWrapper from '../../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import CalloutBox from '@/components/common/CalloutBox';
import AjaxBasics from './SubComponents/AjaxBasics';
import FetchAPIExample from './SubComponents/FetchAPIExample';
import BrowserInspectionExample from './SubComponents/BrowserInspectionExample';
import AjaxPracticalExample from './SubComponents/AjaxPracticalExample';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faCodeBranch, faEye, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function AjaxFundamentalsConcept() {
  return (
    <ConceptWrapper
      title="Ajax Fundamentals: Asynchronous Web Requests"
      description="Master Ajax (Asynchronous JavaScript and XML) to create dynamic web pages that update content without full page reloads using the Fetch API and browser developer tools."
    >
      <TableOfContents numbered>
        <Section title="Understanding Ajax">
          <AjaxBasics />
          <CalloutBox title="💡 What's Next" type="info">
            <Typography variant="body2">
              Let's explore the Fetch API - the modern way to make Ajax requests in JavaScript.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Using the Fetch API">
          <FetchAPIExample />
          <CalloutBox title="💡 What's Next" type="info">
            <Typography variant="body2">
              Learn to inspect network requests in your browser to debug and understand API responses.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Browser Request Inspection">
          <BrowserInspectionExample />
          <CalloutBox title="💡 What's Next" type="info">
            <Typography variant="body2">
              Time to build a complete Ajax application that updates content dynamically without page reloads.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Building Dynamic Web Pages">
          <AjaxPracticalExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e8f5e9', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 20, color: '#4caf50' }} />
            <Typography variant="body2">
              <strong style={{ color: '#4caf50' }}>Excellent work!</strong> You've mastered Ajax fundamentals and can now create dynamic, responsive web applications that provide seamless user experiences.
            </Typography>
          </Box>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}