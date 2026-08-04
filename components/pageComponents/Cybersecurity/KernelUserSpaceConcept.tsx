'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import MemoryIcon from '@mui/icons-material/Memory';
import TerminalIcon from '@mui/icons-material/Terminal';
import LockIcon from '@mui/icons-material/Lock';
import ShieldIcon from '@mui/icons-material/Shield';
import CalloutBox from '../../common/CalloutBox';

const modes = [
  {
    label: 'Kernel Mode',
    token: 'danger',
    icon: <MemoryIcon sx={{ fontSize: 36, color: 'var(--danger)' }} />,
    subtitle: 'Full hardware access',
    points: [
      'The processor\'s most privileged execution level (Ring 0)',
      'Can read and write any memory address, including other processes\' memory',
      'Has direct access to hardware: CPU registers, I/O ports, and peripherals',
      'Runs the OS kernel: schedulers, memory managers, device drivers',
      'A bug here can crash the entire system (kernel panic / blue screen)',
    ],
    color: 'var(--danger)',
  },
  {
    label: 'User Space',
    token: 'info',
    icon: <TerminalIcon sx={{ fontSize: 36, color: 'var(--info)' }} />,
    subtitle: 'Restricted execution',
    points: [
      'The processor\'s unprivileged level (Ring 3) where applications run',
      'Each process gets its own virtual address space — it cannot directly see others\' memory',
      'Hardware access is forbidden; the process must request services via the kernel',
      'A crash here only kills that process; the OS and other programs continue',
      'Runs all normal programs: browsers, text editors, games, user scripts',
    ],
    color: 'var(--info)',
  },
];

const boundary = [
  {
    step: '1',
    title: 'Application makes a system call',
    desc: 'User-space code calls a kernel function (e.g. open a file, send a network packet).',
    token: 'info',
  },
  {
    step: '2',
    title: 'CPU switches to kernel mode',
    desc: 'The processor raises its privilege level and saves the user-space context (registers, stack pointer).',
    token: 'warning',
  },
  {
    step: '3',
    title: 'Kernel handles the request',
    desc: 'The OS validates the call, performs the privileged operation, and prepares a result.',
    token: 'danger',
  },
  {
    step: '4',
    title: 'CPU returns to user mode',
    desc: 'The privilege level drops back to Ring 3. The user-space context is restored and execution continues.',
    token: 'success',
  },
];

const securityImplications = [
  { label: 'Privilege escalation', desc: 'Attackers exploit kernel bugs to jump from user space to kernel mode and gain full control.' },
  { label: 'Rootkits', desc: 'Malware that installs itself in kernel mode to hide processes, files, and network connections from user-space tools.' },
  { label: 'Sandboxing', desc: 'Security tools isolate untrusted code in user space so a compromise cannot reach the kernel.' },
  { label: 'Driver vulnerabilities', desc: 'Drivers run in kernel mode; a flaw in a signed driver can be exploited to bypass all OS protections.' },
];

export default function KernelUserSpaceConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Kernel Mode and User Space
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        Modern operating systems split execution into two privilege levels. This separation is the
        fundamental security boundary that prevents applications from accidentally — or maliciously —
        crashing or controlling the entire system.
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center', mb: 5 }}>
        {modes.map((m) => (
          <Paper
            key={m.label}
            elevation={3}
            sx={{
              flex: '1 1 340px',
              maxWidth: 460,
              p: 3,
              borderRadius: 2,
              borderTop: `4px solid ${m.color}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              {m.icon}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)', lineHeight: 1.1 }}>
                  {m.label}
                </Typography>
                <Typography variant="caption" sx={{ color: 'var(--ink-soft)' }}>
                  {m.subtitle}
                </Typography>
              </Box>
            </Box>
            <Box component="ul" sx={{ m: 0, pl: 3, color: 'var(--ink-soft)' }}>
              {m.points.map((pt) => (
                <Box component="li" key={pt} sx={{ mb: 0.5, lineHeight: 1.6 }}>
                  <Typography variant="body2">{pt}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        ))}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, justifyContent: 'center' }}>
        <LockIcon sx={{ color: 'var(--warning)' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
          Crossing the Boundary: System Call Flow
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 5 }}>
        {boundary.map((b) => (
          <Paper
            key={b.step}
            elevation={1}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              p: 2,
              borderRadius: 2,
              background: 'var(--paper-raised)',
              borderLeft: `4px solid var(--${b.token})`,
            }}
          >
            <Box
              sx={{
                flex: '0 0 auto',
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: `var(--${b.token})`,
                color: 'var(--paper)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
              }}
            >
              {b.step}
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {b.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>
                {b.desc}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 2 }}>
        Security Implications
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2,
          mb: 4,
        }}
      >
        {securityImplications.map((s) => (
          <Paper
            key={s.label}
            elevation={1}
            sx={{ p: 2, borderRadius: 2, background: 'var(--paper-raised)', borderLeft: '4px solid var(--danger)' }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--ink)', mb: 0.5 }}>
              {s.label}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              {s.desc}
            </Typography>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="info" title="Why this matters for attackers and defenders">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          Gaining kernel-mode execution is the ultimate goal of many advanced attacks — it provides
          complete control over the machine. Defenders therefore monitor for any anomalous privilege
          transitions and ensure that kernel code (OS, drivers) is cryptographically signed and patched.
        </Typography>
      </CalloutBox>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 3, mb: 1 }}>
        <ShieldIcon sx={{ color: 'var(--success)' }} />
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
          Protection Rings (x86)
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
        x86 CPUs define four privilege rings (0–3). In practice, most OSes use only Ring 0 (kernel) and
        Ring 3 (user). Hypervisors may run at Ring -1 (VMX root) to host guest kernels safely. Each
        ring restricts which instructions the CPU will execute, hardware protection that software alone
        cannot override.
      </Typography>
    </Box>
  );
}
