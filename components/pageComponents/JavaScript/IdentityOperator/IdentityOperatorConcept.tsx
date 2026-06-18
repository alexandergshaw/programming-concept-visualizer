import ConceptWrapper from '../../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import IdentityBasics from './SubComponents/IdentityBasics';
import StrictEqualityExample from './SubComponents/StrictEqualityExample';
import StrictInequalityExample from './SubComponents/StrictInequalityExample';
import TypeComparisonExample from './SubComponents/TypeComparisonExample';
import CompleteIdentityExample from './SubComponents/CompleteIdentityExample';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faEquals, faNotEqual, faBalanceScale, faShieldHalved, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function IdentityOperatorConcept() {
  return (
    <ConceptWrapper
      title="Identity Operators: Strict Comparison in JavaScript"
      description="Master JavaScript's identity operators (=== and !==) for precise type-safe comparisons that avoid common pitfalls of loose equality."
    >
      <TableOfContents numbered>
        <Section title="Why Identity Operators Matter">
          <IdentityBasics />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--info-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faBullseye} style={{ fontSize: 20, color: 'var(--info)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--info)' }}>What&apos;s next:</strong> Now let's see the strict equality operator (===) in action and learn how it prevents type coercion surprises.
            </Typography>
          </Box>
        </Section>

        <Section title="Strict Equality (===)">
          <StrictEqualityExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--info-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faEquals} style={{ fontSize: 20, color: 'var(--info)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--info)' }}>What&apos;s next:</strong> The !== operator works similarly but returns true when values or types differ. Let&apos;s see it in validation scenarios.
            </Typography>
          </Box>
        </Section>

        <Section title="Strict Inequality (!==)">
          <StrictInequalityExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--info-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faNotEqual} style={{ fontSize: 20, color: 'var(--info)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--info)' }}>What&apos;s next:</strong> Let&apos;s compare strict operators with loose operators to see why strict comparison prevents bugs.
            </Typography>
          </Box>
        </Section>

        <Section title="Strict vs Loose Comparison">
          <TypeComparisonExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--info-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faShieldHalved} style={{ fontSize: 20, color: 'var(--info)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--info)' }}>What&apos;s next:</strong> Time to see how identity operators prevent security vulnerabilities and data corruption in real applications.
            </Typography>
          </Box>
        </Section>

        <Section title="Real-World Examples">
          <CompleteIdentityExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--success-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 20, color: 'var(--success)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--success)' }}>Excellent work!</strong> You've mastered identity operators and can now write type-safe JavaScript that prevents common bugs and security issues.
            </Typography>
          </Box>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
