import { Box, Typography, Paper } from '@mui/material';
import { ReactNode } from 'react';

interface Step {
  icon: ReactNode;
  label: string;
}

interface GenericIntroductionProps {
  title: string;
  paragraphs: string[];
  steps?: Step[];
  closing?: string;
}

export default function GenericIntroduction({
  title,
  paragraphs,
  steps,
  closing,
}: GenericIntroductionProps) {
  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', my: 4 }}>
      <Paper sx={{ p: 3, bgcolor: '#e3f2fd', border: '2px solid #90caf9' }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
          {title}
        </Typography>
        {paragraphs.map((text, i) => (
          <Typography sx={{ mb: 2 }} key={i}>
            {text}
          </Typography>
        ))}
        {steps && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              {steps.map((step, i) => (
                <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {step.icon}
                  <Typography fontWeight={600}>{step.label}</Typography>
                  {i < steps.length - 1 && (
                    <Typography sx={{ fontSize: 32, color: '#90caf9' }}>↓</Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        )}
        {closing && (
          <Typography>
            {closing}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}