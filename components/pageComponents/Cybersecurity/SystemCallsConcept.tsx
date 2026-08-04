'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import ApiIcon from '@mui/icons-material/Api';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import LanIcon from '@mui/icons-material/Lan';
import MemoryIcon from '@mui/icons-material/Memory';
import SecurityIcon from '@mui/icons-material/Security';
import CalloutBox from '../../common/CalloutBox';

const callFlow = [
  {
    step: '1',
    title: 'Application calls a wrapper function',
    desc: 'The programmer calls a standard library function such as read() or write(). This is still running in user space.',
    token: 'info',
  },
  {
    step: '2',
    title: 'Arguments are placed in registers',
    desc: 'The system call number and its parameters are loaded into CPU registers according to the OS calling convention.',
    token: 'feature',
  },
  {
    step: '3',
    title: 'Trap / SYSCALL instruction',
    desc: 'A special CPU instruction (INT 0x80 on legacy x86; SYSCALL on x86-64) causes a controlled switch to kernel mode.',
    token: 'warning',
  },
  {
    step: '4',
    title: 'Kernel validates and dispatches',
    desc: 'The kernel checks the call number, validates arguments, checks permissions, then runs the appropriate kernel function.',
    token: 'danger',
  },
  {
    step: '5',
    title: 'Result returned to user space',
    desc: 'The kernel places the return value in a register, the CPU drops back to user mode, and execution continues.',
    token: 'success',
  },
];

const categories = [
  {
    token: 'info',
    icon: <FolderOpenIcon sx={{ fontSize: 26, color: 'var(--info)' }} />,
    title: 'File I/O',
    examples: 'open, read, write, close, stat, unlink',
    desc: 'Create, read, write, and delete files on disk or other file-system objects.',
  },
  {
    token: 'feature',
    icon: <MemoryIcon sx={{ fontSize: 26, color: 'var(--feature)' }} />,
    title: 'Process Control',
    examples: 'fork, exec, exit, wait, getpid',
    desc: 'Create new processes, replace the current process image, and manage process lifecycle.',
  },
  {
    token: 'warning',
    icon: <LanIcon sx={{ fontSize: 26, color: 'var(--warning)' }} />,
    title: 'Network & IPC',
    examples: 'socket, connect, send, recv, pipe',
    desc: 'Open network connections and communicate between processes.',
  },
  {
    token: 'danger',
    icon: <MemoryIcon sx={{ fontSize: 26, color: 'var(--danger)' }} />,
    title: 'Memory Management',
    examples: 'mmap, munmap, brk, mprotect',
    desc: 'Request and configure virtual memory mappings for the process.',
  },
  {
    token: 'success',
    icon: <SecurityIcon sx={{ fontSize: 26, color: 'var(--success)' }} />,
    title: 'Security & Permissions',
    examples: 'setuid, setgid, chmod, chown, capget',
    desc: 'Change process credentials, file permissions, and capability sets.',
  },
];

export default function SystemCallsConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        System Call Interface Mechanisms
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        A <strong>system call</strong> (syscall) is the gateway between user-space programs and the operating
        system kernel. Every time an application reads a file, opens a socket, or spawns a process, it
        crosses this controlled interface.
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, justifyContent: 'center' }}>
        <ApiIcon sx={{ color: 'var(--info)' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
          How a System Call Works
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 5 }}>
        {callFlow.map((step) => (
          <Paper
            key={step.step}
            elevation={1}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              p: 2,
              borderRadius: 2,
              background: 'var(--paper-raised)',
              borderLeft: `4px solid var(--${step.token})`,
            }}
          >
            <Box
              sx={{
                flex: '0 0 auto',
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: `var(--${step.token})`,
                color: 'var(--paper)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
              }}
            >
              {step.step}
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {step.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>
                {step.desc}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)', textAlign: 'center', mb: 3 }}>
        Common System Call Categories
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 2.5,
          mb: 4,
        }}
      >
        {categories.map((cat) => (
          <Paper
            key={cat.title}
            elevation={2}
            sx={{ p: 2.5, borderRadius: 2, borderLeft: `4px solid var(--${cat.token})` }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              {cat.icon}
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {cat.title}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6, mb: 1 }}>
              {cat.desc}
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--ink-soft)' }}>
              <strong style={{ color: 'var(--ink)' }}>Examples: </strong>{cat.examples}
            </Typography>
          </Paper>
        ))}
      </Box>

      <CalloutBox type="warning" title="Security relevance: syscall monitoring">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          Monitoring system calls is a powerful detection technique. Tools like <strong>strace</strong> (Linux)
          and <strong>Sysmon</strong> (Windows) record every kernel request made by a process. Security
          products (EDR) flag unusual patterns — such as a document editor spawning a shell or calling
          network syscalls — as indicators of compromise.
        </Typography>
      </CalloutBox>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)', mb: 1 }}>
          Syscall Interception & Attack Techniques
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          Attackers who reach kernel mode can hook the syscall table — replacing a legitimate kernel
          function pointer with their own code. This is how rootkits intercept file listing calls to hide
          their presence. Modern kernels protect the syscall table with read-only memory mappings to
          prevent this.
        </Typography>
      </Box>
    </Box>
  );
}
