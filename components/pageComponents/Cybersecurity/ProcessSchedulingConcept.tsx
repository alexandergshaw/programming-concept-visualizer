'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import TimerIcon from '@mui/icons-material/Timer';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CalloutBox from '../../common/CalloutBox';

const states = [
  { label: 'New', token: 'info', desc: 'Process has just been created and is being initialised.' },
  { label: 'Ready', token: 'feature', desc: 'Loaded into memory and waiting for CPU time from the scheduler.' },
  { label: 'Running', token: 'success', desc: 'Currently executing on the CPU.' },
  { label: 'Waiting / Blocked', token: 'warning', desc: 'Suspended while waiting for I/O, a lock, or a timer.' },
  { label: 'Terminated', token: 'danger', desc: 'Finished executing; the OS is reclaiming its resources.' },
];

const algorithms = [
  {
    name: 'First-Come, First-Served (FCFS)',
    token: 'info',
    pros: 'Simple, fair arrival ordering',
    cons: 'Long jobs block short ones (convoy effect)',
    preemptive: false,
  },
  {
    name: 'Round Robin (RR)',
    token: 'feature',
    pros: 'Fair CPU sharing; good for interactive use',
    cons: 'Context-switch overhead if time slice is too small',
    preemptive: true,
  },
  {
    name: 'Shortest Job Next (SJN)',
    token: 'success',
    pros: 'Optimal average waiting time',
    cons: 'Requires knowing burst time in advance; starvation for long jobs',
    preemptive: false,
  },
  {
    name: 'Priority Scheduling',
    token: 'warning',
    pros: 'Critical tasks get CPU first',
    cons: 'Low-priority tasks may starve without ageing',
    preemptive: true,
  },
  {
    name: 'Completely Fair Scheduler (CFS)',
    token: 'danger',
    pros: 'Used by Linux; balances CPU time using virtual runtime',
    cons: 'Complex implementation',
    preemptive: true,
  },
];

const securityIssues = [
  {
    label: 'Timing side-channels',
    desc: 'Differences in scheduling cause measurable timing variations. Spectre-class attacks exploit this to read memory across process boundaries.',
  },
  {
    label: 'Priority inversion',
    desc: 'A high-priority process blocked by a low-priority one can be exploited to starve critical security services.',
  },
  {
    label: 'CPU pinning / affinity attacks',
    desc: 'Forcing a target process onto the same CPU core as an attacker process enables cache timing attacks.',
  },
  {
    label: 'DoS via process exhaustion',
    desc: 'Fork bombs create exponential process trees that exhaust scheduling slots and freeze the system.',
  },
];

export default function ProcessSchedulingConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Process Scheduling and Management
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        The OS scheduler decides which process runs on the CPU at any given moment. This seemingly
        mundane job has deep implications for both system performance and security.
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, justifyContent: 'center' }}>
        <SwapHorizIcon sx={{ color: 'var(--info)' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
          Process Life Cycle States
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 5 }}>
        {states.map((s) => (
          <Paper
            key={s.label}
            elevation={2}
            sx={{
              flex: '1 1 160px',
              maxWidth: 200,
              p: 2,
              borderRadius: 2,
              borderTop: `4px solid var(--${s.token})`,
              textAlign: 'center',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: `var(--${s.token})`, mb: 0.5 }}>
              {s.label}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.5 }}>
              {s.desc}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, justifyContent: 'center' }}>
        <TimerIcon sx={{ color: 'var(--feature)' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
          Scheduling Algorithms
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5 }}>
        {algorithms.map((alg) => (
          <Paper
            key={alg.name}
            elevation={2}
            sx={{
              p: 2.5,
              borderRadius: 2,
              borderLeft: `4px solid var(--${alg.token})`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
                {alg.name}
              </Typography>
              <Box
                sx={{
                  px: 1.2,
                  py: 0.4,
                  borderRadius: 1,
                  background: alg.preemptive ? 'var(--warning-bg)' : 'var(--info-bg)',
                  color: alg.preemptive ? 'var(--warning)' : 'var(--info)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}
              >
                {alg.preemptive ? 'Preemptive' : 'Non-preemptive'}
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6, mb: 0.5 }}>
              <strong style={{ color: 'var(--success)' }}>✓ </strong>{alg.pros}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--danger)' }}>✗ </strong>{alg.cons}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, justifyContent: 'center' }}>
        <PriorityHighIcon sx={{ color: 'var(--danger)' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
          Security Implications
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2,
          mb: 4,
        }}
      >
        {securityIssues.map((s) => (
          <Paper
            key={s.label}
            elevation={1}
            sx={{ p: 2, borderRadius: 2, borderLeft: '4px solid var(--danger)', background: 'var(--paper-raised)' }}
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

      <CalloutBox type="info" title="Context switching">
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
          When the scheduler switches from one process to another, it saves the outgoing process&apos;s
          CPU state (registers, program counter, stack pointer) and loads the incoming one. This saved
          state is the <strong>Process Control Block (PCB)</strong>. Modern CPU mitigations such as IBRS
          and STIBP were added after Spectre to prevent one process from reading another&apos;s state
          across a context switch.
        </Typography>
      </CalloutBox>
    </Box>
  );
}
