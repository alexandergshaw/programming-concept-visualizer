import { Box, Typography, Paper } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import MemoryIcon from '@mui/icons-material/Memory';
import ComputerIcon from '@mui/icons-material/Computer';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function IntroductionConcept() {
  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', my: 4 }}>
      <Paper sx={{ p: 3, bgcolor: '#e3f2fd', border: '2px solid #90caf9' }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
          Welcome!
        </Typography>
        <Typography sx={{ mb: 2 }}>
          We&apos;ll be covering concepts that apply to almost all programming languages! We&apos;ll start with the part of programming you&apos;ll interact with the most: <b>writing code</b>.
        </Typography>
        <Typography sx={{ mb: 2 }}>
          As you progress, we&apos;ll peel back the layers and take you further and further &quot;behind the scenes&quot; to show you how a computer actually runs your code.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <CodeIcon sx={{ fontSize: 48, color: '#1976d2' }} />
            <Typography fontWeight={600}>Your Code</Typography>
            <ArrowDownwardIcon sx={{ fontSize: 32, color: '#90caf9' }} />
            <ComputerIcon sx={{ fontSize: 48, color: '#388e3c' }} />
            <Typography fontWeight={600}>Hardware</Typography>
            <ArrowDownwardIcon sx={{ fontSize: 32, color: '#90caf9' }} />
            <MemoryIcon sx={{ fontSize: 48, color: '#fbc02d' }} />
            <Typography fontWeight={600}>Memory</Typography>
          </Box>
        </Box>
        <Typography sx={{ mb: 2 }}>
          You&apos;ll see how your code is translated, how the computer&apos;s hardware and memory work together, and how everything comes together to make your programs run.
        </Typography>
        <Typography>
          Let&apos;s begin our journey from the code you write, all the way down to the circuits inside your computer!
        </Typography>
      </Paper>
    </Box>
  );
}