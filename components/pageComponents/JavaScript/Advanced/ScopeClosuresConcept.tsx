import ConceptWrapper from '../../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import ScopeBasics from './SubComponents/ScopeBasics';
import ScopeChainExample from './SubComponents/ScopeChainExample';
import ClosuresExample from './SubComponents/ClosuresExample';
import IIFEExample from './SubComponents/IIFEExample';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faLock, faRocket, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ScopeClosuresConcept() {
  return (
    <ConceptWrapper
      title="Scope & Closures: Understanding Variable Access"
      description="Master JavaScript's scope chain and closures to understand how variables are accessed, create private data, and build powerful functional programming patterns."
    >
      <TableOfContents numbered>
        <Section title="Understanding JavaScript Scope">
          <ScopeBasics />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--info-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faLayerGroup} style={{ fontSize: 20, color: 'var(--info)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--info)' }}>What&apos;s next:</strong> Let&apos;s explore the scope chain - how JavaScript searches for variables through nested scopes.
            </Typography>
          </Box>
        </Section>

        <Section title="The Scope Chain in Action">
          <ScopeChainExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--info-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faLock} style={{ fontSize: 20, color: 'var(--info)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--info)' }}>What&apos;s next:</strong> Now discover closures - how functions can access variables from their outer scope even after that scope has finished.
            </Typography>
          </Box>
        </Section>

        <Section title="Closures: Functions with Memory">
          <ClosuresExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--info-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faRocket} style={{ fontSize: 20, color: 'var(--info)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--info)' }}>What&apos;s next:</strong> Learn about IIFE - Immediately Invoked Function Expressions that create instant, isolated scopes.
            </Typography>
          </Box>
        </Section>

        <Section title="IIFE: Immediate Function Execution">
          <IIFEExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--success-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 20, color: 'var(--success)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--success)' }}>Excellent work!</strong> You understand scope, closures, and IIFE - the foundation for advanced JavaScript patterns and clean code organization.
            </Typography>
          </Box>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}