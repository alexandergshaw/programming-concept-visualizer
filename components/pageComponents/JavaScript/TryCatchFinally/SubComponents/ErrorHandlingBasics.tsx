import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBug, 
  faExclamationCircle,
  faTimesCircle,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';

const ErrorHandlingBasics: React.FC = () => {
  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        You now understand what errors are and how they break applications. JavaScript provides a structured solution: <strong>try-catch-finally blocks</strong>.
      </p>

      <ConceptInfoCard>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          The Three-Part Solution:
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
          <Box sx={{ p: 2, bgcolor: 'var(--info-bg)', borderRadius: 1, textAlign: 'center' }}>
            <Typography fontWeight={600} sx={{ color: 'var(--info)', mb: 1 }}>1. TRY</Typography>
            <Typography variant="body2">Execute risky code</Typography>
          </Box>
          <Box sx={{ p: 2, bgcolor: 'var(--danger-bg)', borderRadius: 1, textAlign: 'center' }}>
            <Typography fontWeight={600} sx={{ color: 'var(--danger)', mb: 1 }}>2. CATCH</Typography>
            <Typography variant="body2">Handle any errors</Typography>
          </Box>
          <Box sx={{ p: 2, bgcolor: 'var(--feature-bg)', borderRadius: 1, textAlign: 'center' }}>
            <Typography fontWeight={600} sx={{ color: 'var(--feature)', mb: 1 }}>3. FINALLY</Typography>
            <Typography variant="body2">Always cleanup</Typography>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic', textAlign: 'center' }}>
          Let&apos;s explore each block step by step, starting with the <strong>try block</strong> where it all begins.
        </Typography>
      </ConceptInfoCard>
    </div>
  );
};

export default ErrorHandlingBasics;