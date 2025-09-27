import ConceptWrapper from '../../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import PromiseBasics from './SubComponents/PromiseBasics';
import PromiseStatesExample from './SubComponents/PromiseStatesExample';
import AsyncAwaitExample from './SubComponents/AsyncAwaitExample';
import AsynchronousPatternsExample from './SubComponents/AsynchronousPatternsExample';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faExchangeAlt, faRocket, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function PromisesAsyncAwaitConcept() {
  return (
    <ConceptWrapper
      title="Promises & Async/Await: Managing Asynchronous Code"
      description="Master JavaScript Promises and async/await syntax to write clean, readable asynchronous code that handles multiple operations efficiently."
    >
      <TableOfContents numbered>
        <Section title="Understanding Promises">
          <PromiseBasics />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faClock} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What&apos;s next:</strong> Let&apos;s explore the three Promise states - pending, fulfilled, and rejected - and how they work.
            </Typography>
          </Box>
        </Section>

        <Section title="Promise States in Action">
          <PromiseStatesExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faRocket} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What&apos;s next:</strong> Discover async/await - the modern, cleaner way to work with asynchronous functions.
            </Typography>
          </Box>
        </Section>

        <Section title="Async/Await Syntax">
          <AsyncAwaitExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faExchangeAlt} style={{ fontSize: 20, color: '#1976d2' }} />
            <Typography variant="body2">
              <strong style={{ color: '#1976d2' }}>What&apos;s next:</strong> Learn advanced asynchronous patterns for handling multiple operations concurrently.
            </Typography>
          </Box>
        </Section>

        <Section title="Advanced Asynchronous Patterns">
          <AsynchronousPatternsExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#e8f5e9', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 20, color: '#4caf50' }} />
            <Typography variant="body2">
              <strong style={{ color: '#4caf50' }}>Excellent work!</strong> You've mastered asynchronous JavaScript and can now write efficient, readable code that handles complex async operations.
            </Typography>
          </Box>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}