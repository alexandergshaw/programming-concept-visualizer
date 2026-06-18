import ConceptWrapper from '../../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import CompleteEqualityExample from './SubComponents/CompleteEqualityExample';
import EqualityBasics from './SubComponents/EqualityBasics';
import LooseEqualityExample from './SubComponents/LooseEqualityExample';
import LooseInequalityExample from './SubComponents/LooseInequalityExample';
import TypeCoercionExample from './SubComponents/TypeCoercionExample';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faEquals, faMagnifyingGlass, faLightbulb, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function EqualityOperatorConcept() {
  return (
    <ConceptWrapper
      title="Equality Operators: Understanding Type Coercion in JavaScript"
      description="Learn JavaScript's loose equality operators (== and !=) and understand when type coercion happens - plus why strict operators are usually better."
    >
      <TableOfContents numbered>
        <Section title="Understanding Loose Equality">
          <EqualityBasics />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--info-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faExclamationTriangle} style={{ fontSize: 20, color: 'var(--info)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--info)' }}>What&apos;s next:</strong> Now we'll see the == operator in action and discover why it can cause unexpected results through automatic type conversion.
            </Typography>
          </Box>
        </Section>

        <Section title="Loose Equality (==)">
          <LooseEqualityExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--info-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faEquals} style={{ fontSize: 20, color: 'var(--info)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--info)' }}>What&apos;s next:</strong> The != operator works similarly to ==, but there's one useful pattern you should know about.
            </Typography>
          </Box>
        </Section>

        <Section title="Loose Inequality (!=)">
          <LooseInequalityExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--info-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: 20, color: 'var(--info)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--info)' }}>What&apos;s next:</strong> Let&apos;s examine exactly how JavaScript converts types during loose equality comparisons.
            </Typography>
          </Box>
        </Section>

        <Section title="Type Coercion Deep Dive">
          <TypeCoercionExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--info-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faLightbulb} style={{ fontSize: 20, color: 'var(--info)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--info)' }}>What&apos;s next:</strong> Now you understand how type coercion works. Let&apos;s see the few cases where loose operators are actually useful.
            </Typography>
          </Box>
        </Section>

        <Section title="When to Use Loose Equality">
          <CompleteEqualityExample />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'var(--success-bg)', p: 2, borderRadius: 1, mt: 2 }}>
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 20, color: 'var(--success)' }} />
            <Typography variant="body2">
              <strong style={{ color: 'var(--success)' }}>Great work!</strong> You now understand both loose and strict equality operators, and when each should be used in JavaScript.
            </Typography>
          </Box>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
