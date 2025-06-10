'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import { Box, Typography, Paper, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TableOfContents from '@/components/common/TableOfContents';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

export default function CompilersInterpretersConcept() {
  return (
    <ConceptWrapper
      title="Code Tells the Computer What to Do"
      description="The code you write must be translated into something the computer can understand."
    >
      <TableOfContents>
        <Section
          title="1. How Human Code Becomes Computer Code"
        >
          <Box sx={{ maxWidth: 700, mx: 'auto', my: 3 }}>
            <Typography sx={{ mb: 2 }}>
              When you write code in a programming language like Python, JavaScript, or C++, you’re using instructions that are easy for humans to read and understand. 
            </Typography>
            <Typography sx={{ mb: 2 }}>
              However, computers can only understand very simple instructions written in <b>machine code</b>—a series of 0s and 1s.
            </Typography>
            <Typography sx={{ mb: 2 }}>
              To bridge this gap, your code must be <b>translated</b> into machine code. This is done by special programs called <b>interpreters</b> or <b>compilers</b>.
            </Typography>
          </Box>
        </Section>
        <Section title="2. See Interpreters in Action" subtitle='Interpreters are programs used by languages like Python, JavaScript, Ruby, and PHP to convert the code into a form that the computer can understand and take action on, line by line, as the program is running.'>
          <InteractiveInterpreterDemo />
        </Section>
        <Section title="3. See Compilers in Action" subtitle="Compilers are programs that translate entire high-level code into machine code before execution, used by languages like C, C++, Rust, and Go.">
          <InteractiveCompilerDemo />
        </Section>
        <Section title="4. Interpreter vs Compiler: Quick Comparison">
          <Box sx={{ maxWidth: 700, mx: 'auto', my: 3 }}>
            <Typography sx={{ mb: 2 }}>
              Here's a side-by-side comparison of interpreters and compilers:
            </Typography>
            <Box
              component="table"
              sx={{
                width: '100%',
                borderCollapse: 'collapse',
                background: '#f8fafc',
                borderRadius: 2,
                overflow: 'hidden',
                mb: 2,
                boxShadow: 1,
              }}
            >
              <thead>
                <tr style={{ background: '#e3f2fd' }}>
                  <th style={{ padding: '12px', fontWeight: 700, fontSize: 16, borderRight: '1px solid #bbdefb' }}></th>
                  <th style={{ padding: '12px', fontWeight: 700, fontSize: 16, borderRight: '1px solid #bbdefb' }}>Interpreter</th>
                  <th style={{ padding: '12px', fontWeight: 700, fontSize: 16 }}>Compiler</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: '#f8fafc' }}>
                  <td style={{ padding: '10px', fontWeight: 600, borderRight: '1px solid #e3f2fd' }}>How it works</td>
                  <td style={{ padding: '10px', borderRight: '1px solid #e3f2fd' }}>
                    Translates and runs your code <b>line by line</b>, as the program runs.
                  </td>
                  <td style={{ padding: '10px' }}>
                    Translates the <b>entire program</b> into machine code <b>before</b> running it.
                  </td>
                </tr>
                <tr style={{ background: '#f8fafc' }}>
                  <td style={{ padding: '10px', fontWeight: 600, borderRight: '1px solid #e3f2fd' }}>Speed</td>
                  <td style={{ padding: '10px', borderRight: '1px solid #e3f2fd' }}>
                    Slower (runs each line as it goes)
                  </td>
                  <td style={{ padding: '10px' }}>
                    Faster (runs pre-translated machine code)
                  </td>
                </tr>
                <tr style={{ background: '#f8fafc' }}>
                  <td style={{ padding: '10px', fontWeight: 600, borderRight: '1px solid #e3f2fd' }}>Error reporting</td>
                  <td style={{ padding: '10px', borderRight: '1px solid #e3f2fd' }}>
                    Stops at the first error it finds while running.
                  </td>
                  <td style={{ padding: '10px' }}>
                    Finds many errors before running the program.
                  </td>
                </tr>
                <tr style={{ background: '#f8fafc' }}>
                  <td style={{ padding: '10px', fontWeight: 600, borderRight: '1px solid #e3f2fd' }}>Examples</td>
                  <td style={{ padding: '10px', borderRight: '1px solid #e3f2fd' }}>
                    Python, JavaScript, Ruby, PHP
                  </td>
                  <td style={{ padding: '10px' }}>
                    C, C++, Rust, Go, Swift
                  </td>
                </tr>
                <tr style={{ background: '#f8fafc' }}>
                  <td style={{ padding: '10px', fontWeight: 600, borderRight: '1px solid #e3f2fd' }}>When to use</td>
                  <td style={{ padding: '10px', borderRight: '1px solid #e3f2fd' }}>
                    Great for learning, scripting, and quick changes.
                  </td>
                  <td style={{ padding: '10px' }}>
                    Great for performance and large applications.
                  </td>
                </tr>
              </tbody>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Some languages (like Java) use both: they compile to an intermediate form, then interpret or run it on a virtual machine!
            </Typography>
          </Box>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}

function InteractiveInterpreterDemo() {
  const [step, setStep] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [userCode, setUserCode] = useState('print("Hello")\nprint("World")');

  // Split code into lines for the interpreter
  const codeLines = userCode.split('\n').filter(line => line.trim().length > 0);

  // Each line gets "Read", "Interpret", "Execute"
  const interpreterSteps = codeLines.flatMap((line, i) => [
    { type: 'Read', line, idx: i },
    { type: 'Interpret', line, idx: i },
    { type: 'Execute', line, idx: i },
  ]);

  useEffect(() => {
    setHighlightedIndex(-1);
    let interval: NodeJS.Timeout | null = null;
    if (step === 1) {
      interval = setInterval(() => {
        setHighlightedIndex(idx => {
          if (idx < interpreterSteps.length - 1) {
            return idx + 1;
          } else {
            clearInterval(interval!);
            return idx;
          }
        });
      }, 600);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, userCode]);

  const steps = [
    {
      label: 'Your Code',
      code: (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <TextField
            label="Type your code"
            variant="outlined"
            size="small"
            multiline
            minRows={2}
            value={userCode}
            onChange={e => setUserCode(e.target.value)}
            sx={{
              mb: 1,
              width: '100%',
              maxWidth: 340,
              fontFamily: 'monospace',
              bgcolor: '#f4f4f4',
              borderRadius: 1,
            }}
            inputProps={{
              style: {
                fontFamily: 'monospace',
                fontSize: 16,
                background: '#f4f4f4',
                borderRadius: 4,
                padding: '8px 12px',
              }
            }}
          />
        </Box>
      ),
      description: 'This is what you write in a high-level language.',
    },
    {
      label: 'Interpreter Runs',
      code: (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          {codeLines.length === 0 && (
            <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
              (No code to interpret)
            </Typography>
          )}
          {codeLines.map((line, i) => {
            const readIdx = i * 3;
            const executeIdx = readIdx + 2;
            const isActive = highlightedIndex >= readIdx && highlightedIndex <= executeIdx;
            return (
              <Paper
                key={i}
                elevation={isActive ? 6 : 1}
                sx={{
                  p: 1.2,
                  mb: 0.5,
                  minWidth: 220,
                  bgcolor: isActive ? '#e3fcec' : '#f4f4f4',
                  border: isActive ? '2px solid #219653' : '1px solid #ddd',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  boxShadow: isActive ? 2 : 0,
                }}
              >
                <Typography fontWeight={700} sx={{ mb: 0.5, fontSize: 15 }}>
                  Line: <span style={{ fontFamily: 'monospace' }}>{line}</span>
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {['Fetch', 'Decode', 'Execute'].map((phase, phaseIdx) => {
                    const stepIdx = i * 3 + phaseIdx;
                    const isStepActive = highlightedIndex === stepIdx;
                    return (
                      <Box
                        key={phase}
                        sx={{
                          px: 1.2,
                          py: 0.5,
                          borderRadius: 1,
                          bgcolor: isStepActive ? '#219653' : '#e0e0e0',
                          color: isStepActive ? '#fff' : '#333',
                          fontWeight: 700,
                          fontFamily: 'monospace',
                          fontSize: 15,
                          minWidth: 80,
                          textAlign: 'center',
                          boxShadow: isStepActive ? 2 : 0,
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                        }}
                      >
                        {phase}
                      </Box>
                    );
                  })}
                </Box>
              </Paper>
            );
          })}
        </Box>
      ),
      description: 'The interpreter reads, interprets, and executes each line of your code, one at a time.',
    },
    {
      label: 'The CPU Did What You Told It',
      code: (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 2 }}>
          <Paper
            sx={{
              mt: 2,
              p: 1.5,
              bgcolor: '#f4f4f4',
              borderRadius: 1,
              fontFamily: 'monospace',
              fontSize: 16,
              color: '#333',
              minWidth: 220,
              maxWidth: 340,
              overflow: 'auto',
            }}
          >
            {userCode}
          </Paper>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: '#f8fafc',
        borderRadius: 3,
        p: 3,
        my: 3,
        boxShadow: 1,
        maxWidth: 500,
        mx: 'auto',
        textAlign: 'center',
      }}
    >
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
        {steps.map((s, i) => (
          <Box
            key={i}
            sx={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              bgcolor: step === i ? '#219653' : '#e0e0e0',
              cursor: 'pointer',
              border: step === i ? '2px solid #219653' : '1px solid #bbb',
              transition: 'all 0.2s',
            }}
            onClick={() => setStep(i)}
            aria-label={typeof s.label === 'string' ? s.label : undefined}
          />
        ))}
      </Stack>
      <Paper
        elevation={4}
        sx={{
          p: 2,
          mb: 2,
          bgcolor: step === 1 ? '#e3fcec' : step === 2 ? '#e3fcec' : '#fff',
          border: step === 1 || step === 2 ? '2px solid #219653' : '1px solid #ddd',
          transition: 'all 0.2s',
        }}
      >
        <Typography fontWeight={600} sx={{ mb: 1 }}>
          {steps[step].label}
        </Typography>
        <Box sx={{ minHeight: 32 }}>
          {steps[step].code}
        </Box>
        <Typography variant="body2" color="text.secondary">
          {steps[step].description}
        </Typography>
      </Paper>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Box>
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            style={{
              padding: '6px 16px',
              borderRadius: 4,
              border: 'none',
              background: step === 0 ? '#eee' : '#219653',
              color: step === 0 ? '#888' : '#fff',
              cursor: step === 0 ? 'not-allowed' : 'pointer',
              marginRight: 8,
              fontWeight: 600,
            }}
          >
            Back
          </button>
          <button
            onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            disabled={step === steps.length - 1}
            style={{
              padding: '6px 16px',
              borderRadius: 4,
              border: 'none',
              background: step === steps.length - 1 ? '#eee' : '#219653',
              color: step === steps.length - 1 ? '#888' : '#fff',
              cursor: step === steps.length - 1 ? 'not-allowed' : 'pointer',
              fontWeight: 600,
            }}
          >
            Next
          </button>
        </Box>
      </Stack>
    </Box>
  );
}

// --- Compiler Demo ---
function InteractiveCompilerDemo() {
  const [step, setStep] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [userCode, setUserCode] = useState('print("Hello, world!")');

  // Simulate "assembly" by mapping each char to a fake instruction (no letters shown)
  const assemblyInstructions = userCode
    .replace(/\s/g, '')
    .split('')
    .map((char, i) => `MOV R${i % 4}, #${char.charCodeAt(0)}`)
    .slice(0, 8);

  // Simulate machine code as 8-bit binary per char (no letters shown)
  const machineInstructions = userCode
    .replace(/\s/g, '')
    .split('')
    .map(char =>
      char.charCodeAt(0).toString(2).padStart(8, '0')
    )
    .slice(0, 8);

  // Simulated CPU fetch/decode/execute for each instruction (no letters shown)
  const cpuInstructions = machineInstructions.map((code) => ({
    code,
    label: '', // No letter
  }));

  const cpuSteps = cpuInstructions.flatMap((instr, i) => [
    { type: 'Fetch', code: instr.code, step: i },
    { type: 'Decode', code: instr.code, step: i },
    { type: 'Execute', code: instr.code, step: i },
  ]);

  useEffect(() => {
    setHighlightedIndex(-1);
    let interval: NodeJS.Timeout | null = null;

    if (step === 2) {
      interval = setInterval(() => {
        setHighlightedIndex(idx => {
          if (idx < assemblyInstructions.length - 1) {
            return idx + 1;
          } else {
            clearInterval(interval!);
            return idx;
          }
        });
      }, 600);
    } else if (step === 3) {
      interval = setInterval(() => {
        setHighlightedIndex(idx => {
          if (idx < machineInstructions.length - 1) {
            return idx + 1;
          } else {
            clearInterval(interval!);
            return idx;
          }
        });
      }, 600);
    } else if (step === 4) {
      interval = setInterval(() => {
        setHighlightedIndex(idx => {
          if (idx < cpuSteps.length - 1) {
            return idx + 1;
          } else {
            clearInterval(interval!);
            return idx;
          }
        });
      }, 350);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, userCode]);

  const codeSteps = [
    {
      label: 'Your Code',
      code: (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <TextField
            label="Type your code"
            variant="outlined"
            size="small"
            value={userCode}
            onChange={e => setUserCode(e.target.value)}
            sx={{
              mb: 1,
              width: '100%',
              maxWidth: 340,
              fontFamily: 'monospace',
              bgcolor: '#f4f4f4',
              borderRadius: 1,
            }}
            inputProps={{
              style: {
                fontFamily: 'monospace',
                fontSize: 16,
                background: '#f4f4f4',
                borderRadius: 4,
                padding: '8px 12px',
              }
            }}
          />
        </Box>
      ),
      description: 'This is what you write in a high-level language.',
    },
    {
      label: 'Compiler (Front End)',
      code: (
        <Box sx={{ fontFamily: 'monospace', bgcolor: '#f4f4f4', borderRadius: 1, p: 1.5, fontSize: 16, color: '#333', minWidth: 220, maxWidth: 340, overflow: 'auto' }}>
          {userCode}
        </Box>
      ),
      description: 'The compiler reads your code.',
    },
    {
      label: 'Assembly Code',
      code: (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }}>
          {assemblyInstructions.map((instr, i) => (
            <span
              key={i}
              style={{
                background: i <= highlightedIndex ? '#219653' : '#e0e0e0',
                color: i <= highlightedIndex ? '#fff' : '#333',
                borderRadius: 4,
                padding: '2px 8px',
                fontWeight: 700,
                fontFamily: 'monospace',
                marginBottom: 2,
                boxShadow: i === highlightedIndex ? '0 2px 8px #21965333' : undefined,
                transition: 'all 0.2s',
                display: 'inline-block',
              }}
            >
              {instr}
            </span>
          ))}
        </Box>
      ),
      description: 'Your code is translated to assembly-like instructions.',
    },
    {
      label: 'Assembly Code → Machine Code',
      code: (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          {assemblyInstructions.map((asm, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <span
                style={{
                  background: i <= highlightedIndex ? '#219653' : '#e0e0e0',
                  color: i <= highlightedIndex ? '#fff' : '#333',
                  borderRadius: 4,
                  padding: '2px 8px',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  marginRight: 12,
                  boxShadow: i === highlightedIndex ? '0 2px 8px #21965333' : undefined,
                  transition: 'all 0.2s',
                  display: 'inline-block',
                  minWidth: 120,
                }}
              >
                {asm}
              </span>
              <ArrowForwardIcon sx={{ color: '#219653', mx: 1, fontSize: 22 }} />
              <span
                style={{
                  background: i <= highlightedIndex ? '#219653' : '#e0e0e0',
                  color: i <= highlightedIndex ? '#fff' : '#333',
                  borderRadius: 4,
                  padding: '2px 8px',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  boxShadow: i === highlightedIndex ? '0 2px 8px #21965333' : undefined,
                  transition: 'all 0.2s',
                  display: 'inline-block',
                  minWidth: 90,
                }}
              >
                {machineInstructions[i]}
              </span>
            </Box>
          ))}
        </Box>
      ),
      description: 'Each assembly instruction is converted to a machine code instruction.',
    },
    {
      label: 'CPU Runs',
      code: (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          {cpuInstructions.map((instr, instrIdx) => {
            const fetchIdx = instrIdx * 3;
            const executeIdx = fetchIdx + 2;
            const isActive = highlightedIndex >= fetchIdx && highlightedIndex <= executeIdx;
            return (
              <Paper
                key={instrIdx}
                elevation={isActive ? 6 : 1}
                sx={{
                  p: 1.2,
                  mb: 0.5,
                  minWidth: 220,
                  bgcolor: isActive ? '#e3fcec' : '#f4f4f4',
                  border: isActive ? '2px solid #219653' : '1px solid #ddd',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  boxShadow: isActive ? 2 : 0,
                }}
              >
                <Typography fontWeight={700} sx={{ mb: 0.5, fontSize: 15 }}>
                  Instruction: <span style={{ fontFamily: 'monospace' }}>{instr.code}</span>
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {['Fetch', 'Decode', 'Execute'].map((phase, phaseIdx) => {
                    const stepIdx = instrIdx * 3 + phaseIdx;
                    const isStepActive = highlightedIndex === stepIdx;
                    return (
                      <Box
                        key={phase}
                        sx={{
                          px: 1.2,
                          py: 0.5,
                          borderRadius: 1,
                          bgcolor: isStepActive ? '#219653' : '#e0e0e0',
                          color: isStepActive ? '#fff' : '#333',
                          fontWeight: 700,
                          fontFamily: 'monospace',
                          fontSize: 15,
                          minWidth: 80,
                          textAlign: 'center',
                          boxShadow: isStepActive ? 2 : 0,
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                        }}
                      >
                        {phase}
                      </Box>
                    );
                  })}
                </Box>
              </Paper>
            );
          })}
        </Box>
      ),
      description: 'The CPU fetches, decodes, and executes each instruction, one at a time.',
    },
    {
      label: 'The CPU Did What You Told It',
      code: (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 2 }}>
          <Paper
            sx={{
              mt: 2,
              p: 1.5,
              bgcolor: '#f4f4f4',
              borderRadius: 1,
              fontFamily: 'monospace',
              fontSize: 16,
              color: '#333',
              minWidth: 220,
              maxWidth: 340,
              overflow: 'auto',
            }}
          >
            {userCode}
          </Paper>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: '#f8fafc',
        borderRadius: 3,
        p: 3,
        my: 3,
        boxShadow: 1,
        maxWidth: 500,
        mx: 'auto',
        textAlign: 'center',
      }}
    >
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
        {codeSteps.map((s, i) => (
          <Box
            key={i}
            sx={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              bgcolor: step === i ? '#219653' : '#e0e0e0',
              cursor: 'pointer',
              border: step === i ? '2px solid #219653' : '1px solid #bbb',
              transition: 'all 0.2s',
            }}
            onClick={() => setStep(i)}
            aria-label={typeof s.label === 'string' ? s.label : undefined}
          />
        ))}
      </Stack>
      <Paper
        elevation={4}
        sx={{
          p: 2,
          mb: 2,
          bgcolor: step === 2 ? '#e3fcec' : step === 3 ? '#e3fcec' : step === 4 ? '#e3f7fc' : step === 5 ? '#e3fcec' : '#fff',
          border: step === 2 || step === 3 || step === 4 || step === 5 ? '2px solid #219653' : '1px solid #ddd',
          transition: 'all 0.2s',
        }}
      >
        <Typography fontWeight={600} sx={{ mb: 1 }}>
          {codeSteps[step].label}
        </Typography>
        <Box
          sx={{
            minHeight: 32,
          }}
        >
          {codeSteps[step].code}
        </Box>
        <Typography variant="body2" color="text.secondary">
          {codeSteps[step].description}
        </Typography>
      </Paper>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Box>
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            style={{
              padding: '6px 16px',
              borderRadius: 4,
              border: 'none',
              background: step === 0 ? '#eee' : '#219653',
              color: step === 0 ? '#888' : '#fff',
              cursor: step === 0 ? 'not-allowed' : 'pointer',
              marginRight: 8,
              fontWeight: 600,
            }}
          >
            Back
          </button>
          <button
            onClick={() => setStep((s) => Math.min(codeSteps.length - 1, s + 1))}
            disabled={step === codeSteps.length - 1}
            style={{
              padding: '6px 16px',
              borderRadius: 4,
              border: 'none',
              background: step === codeSteps.length - 1 ? '#eee' : '#219653',
              color: step === codeSteps.length - 1 ? '#888' : '#fff',
              cursor: step === codeSteps.length - 1 ? 'not-allowed' : 'pointer',
              fontWeight: 600,
            }}
          >
            Next
          </button>
        </Box>
      </Stack>
    </Box>
  );
}