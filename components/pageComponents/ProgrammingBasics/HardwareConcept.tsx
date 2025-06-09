import { useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery, Paper, Button, Fade } from '@mui/material';
import MemoryIcon from '@mui/icons-material/Memory';
import StorageIcon from '@mui/icons-material/Storage';
import DnsIcon from '@mui/icons-material/Dns';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';

const hardwareSteps = [
  {
    key: 'storage',
    label: 'Storage',
    icon: <StorageIcon color="warning" sx={{ fontSize: 54, mb: 1 }} />,
    desc: 'Programs and data are stored here long-term (SSD/HDD).',
    highlight: { bgcolor: '#fffde7', border: '2px solid #ffe082' },
  },
  {
    key: 'ram',
    label: 'RAM',
    icon: <MemoryIcon color="primary" sx={{ fontSize: 54, mb: 1 }} />,
    desc: 'Data and instructions are loaded into RAM for fast, temporary access.',
    highlight: { bgcolor: '#e3f2fd', border: '2px solid #90caf9' },
  },
  {
    key: 'cpu',
    label: 'CPU',
    icon: <DeveloperBoardIcon color="success" sx={{ fontSize: 54, mb: 1 }} />,
    desc: 'The CPU fetches instructions from RAM and executes them.',
    highlight: { bgcolor: '#e8f5e9', border: '2px solid #81c784' },
  },
];

export default function HardwareConcept() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const [step, setStep] = useState(0);

  // For arrows: only show up to the current step
  const showArrowTo = (idx: number) => step > idx;

  return (
    <ConceptWrapper
      title="Hardware Involved in Program Execution"
      description="These are the hardware components that make running programs possible."
    >
      <>
        <Box
          sx={{
            width: '100%',
            maxWidth: 800,
            mx: 'auto',
            my: 4,
            p: { xs: 1, sm: 2 },
            display: 'flex',
            flexDirection: isMd ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 4, sm: 6 },
            position: 'relative',
            minHeight: 220,
          }}
        >
          {hardwareSteps.map((item, idx) => (
            <Box key={item.key} sx={{ display: 'flex', alignItems: 'center' }}>
              <Fade in={step >= idx}>
                <Paper
                  elevation={step === idx ? 8 : 4}
                  sx={{
                    p: 2,
                    minWidth: 120,
                    maxWidth: 180,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'all 0.3s',
                    ...(step === idx ? item.highlight : {}),
                    opacity: step >= idx ? 1 : 0.5,
                    boxShadow: step === idx ? 6 : 2,
                  }}
                >
                  {item.icon}
                  <Typography fontWeight={700} sx={{ mb: 0.5 }}>{item.label}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.desc}
                  </Typography>
                </Paper>
              </Fade>
              {/* Arrow to next */}
              {idx < hardwareSteps.length - 1 && (
                <Fade in={showArrowTo(idx)}>
                  <ArrowForwardIcon
                    sx={{
                      fontSize: 40,
                      color: '#bdbdbd',
                      mx: isMd ? 0 : 2,
                      my: isMd ? 2 : 0,
                      transform: isMd ? 'rotate(90deg)' : 'none',
                      transition: 'all 0.3s',
                    }}
                  />
                </Fade>
              )}
            </Box>
          ))}
        </Box>
        {/* Buses & Connections */}
        <Fade in={step === hardwareSteps.length}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 2,
              mb: 1,
            }}
          >
            <DnsIcon color="secondary" sx={{ fontSize: 28, mr: 1, verticalAlign: 'middle' }} />
            <Typography
              variant="subtitle2"
              fontWeight={600}
              color="text.secondary"
              sx={{ verticalAlign: 'middle' }}
              component="span"
            >
              Buses & Connections: Move data between all components
            </Typography>
          </Box>
        </Fade>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            sx={{ mr: 2, minWidth: 90 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => setStep(s => Math.min(hardwareSteps.length, s + 1))}
            disabled={step === hardwareSteps.length}
            sx={{ minWidth: 90 }}
          >
            {step === hardwareSteps.length - 1 ? 'Show Buses' : step === hardwareSteps.length ? 'Done' : 'Next'}
          </Button>
        </Box>
      </>
    </ConceptWrapper>
  );
}