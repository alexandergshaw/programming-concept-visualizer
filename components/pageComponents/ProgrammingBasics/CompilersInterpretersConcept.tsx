'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import { Box, Typography, Paper, Stack, Divider } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MemoryIcon from '@mui/icons-material/Memory';
import CodeIcon from '@mui/icons-material/Code';
import BugReportIcon from '@mui/icons-material/BugReport';
import CycleDiagram from '@/components/common/CycleDiagram';
import DownloadIcon from '@mui/icons-material/Download';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TableOfContents from '@/components/common/TableOfContents';

function VisualStep({
  icon,
  label,
  highlight = false,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  highlight?: boolean;
  description?: string;
}) {
  return (
    <Paper
      elevation={highlight ? 6 : 2}
      sx={{
        p: 2,
        minWidth: 120,
        maxWidth: 180,
        bgcolor: highlight ? '#e3fcec' : '#fff',
        border: highlight ? '2px solid #219653' : '1px solid #ddd',
        textAlign: 'center',
        transition: 'all 0.2s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ mb: 1, fontSize: 36 }}>{icon}</Box>
      <Typography fontWeight={700} fontSize={16} sx={{ mb: description ? 0.5 : 0 }}>
        {label}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
          {description}
        </Typography>
      )}
    </Paper>
  );
}

function VisualArrow() {
  return (
    <Box sx={{ my: 0.5 }}>
      <ArrowForwardIcon
        sx={{
          fontSize: 36,
          color: '#219653',
          transform: 'rotate(90deg)', // Downward arrow
        }}
      />
    </Box>
  );
}

export default function CompilersInterpretersConcept() {
  return (
    <ConceptWrapper
      title="How Compilers and Interpreters Work"
      description="Your code must be translated into something the computer can run."
    >
      <TableOfContents>
        <Section title="Translation Approaches">
          <Typography sx={{ mb: 2 }}>
            Computers can't understand the code you write directly. They only understand very simple instructions called <b>machine code</b>.
            To bridge this gap, we use <b>compilers</b> and <b>interpreters</b> to translate your code into something the computer can actually run.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={6}
            alignItems="flex-start"
            justifyContent="center"
            sx={{ mb: 3, width: '100%' }}
          >
            {/* Compiler Visual */}
            <Box sx={{ flex: 1, minWidth: 280 }}>
              <Typography fontWeight={700} sx={{ mb: 1, textAlign: 'center' }}>
                Compiler
              </Typography>
              <Stack direction="column" alignItems="center" justifyContent="center">
                <VisualStep
                  icon={<CodeIcon color="primary" />}
                  label="Source Code"
                  description="The code you write (like C, C++, Rust)"
                />
                <VisualArrow />
                <VisualStep
                  icon={<BugReportIcon color="secondary" />}
                  label="Compiler"
                  description="A special program that translates your code into machine code all at once, before running"
                />
                <VisualArrow />
                <VisualStep
                  icon={<MemoryIcon color="success" />}
                  label="Machine Code"
                  description="The final instructions the CPU can understand and execute directly"
                />
              </Stack>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                display: { xs: 'none', sm: 'block' },
                mx: 2,
                borderColor: '#bbb',
                height: 220,
                alignSelf: 'center',
              }}
            />
            {/* Interpreter Visual */}
            <Box sx={{ flex: 1, minWidth: 280 }}>
              <Typography fontWeight={700} sx={{ mb: 1, textAlign: 'center' }}>
                Interpreter
              </Typography>
              <Stack direction="column" alignItems="center" justifyContent="center">
                <VisualStep
                  icon={<CodeIcon color="primary" />}
                  label="Source Code"
                  description="The code you write (like Python, JavaScript)"
                />
                <VisualArrow />
                <VisualStep
                  icon={<BugReportIcon color="secondary" />}
                  label="Interpreter"
                  description="A program that reads and runs your code line by line, as the program runs"
                />
                <VisualArrow />
                <VisualStep
                  icon={<MemoryIcon color="success" />}
                  label="CPU"
                  description="The CPU executes each instruction as it's read by the interpreter"
                />
              </Stack>
            </Box>
          </Stack>
        </Section>
        <Section title="The Fetch-Decode-Execute Cycle">
          <Typography sx={{ mb: 2 }}>
            The <b>fetch-decode-execute cycle</b> is the basic loop every CPU uses to run instructions.
            <br /><br />
            <b>How does this relate to compilers and interpreters?</b>
            <ul style={{ marginTop: 8, marginBottom: 8 }}>
              <li>
                <b>Compiled programs:</b> The CPU runs your program's instructions directly, one by one.
              </li>
              <li style={{ marginTop: 8 }}>
                <b>Interpreted programs:</b> The CPU runs the interpreter, which reads your code and tells the CPU what to do, step by step.
              </li>
            </ul>
            <b>In both cases, the CPU is always doing the same thing:</b> fetching, decoding, and executing instructions.
          </Typography>
          <CycleDiagram
            steps={[
              {
                label: 'Fetch',
                icon: <DownloadIcon fontSize="large" color="success" />,
                description: 'CPU grabs the next instruction from memory.',
              },
              {
                label: 'Decode',
                icon: <FindInPageIcon fontSize="large" color="primary" />,
                description: 'CPU figures out what the instruction means.',
              },
              {
                label: 'Execute',
                icon: <PlayArrowIcon fontSize="large" color="action" />,
                description: 'CPU does what the instruction says.',
              },
            ]}
          />
          <Typography sx={{ mt: 2 }}>
            <b>Summary:</b> No matter how your code gets to the CPU, it always runs instructions in this simple loop.
          </Typography>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}