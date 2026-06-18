'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import CodeIcon from '@mui/icons-material/Code';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShieldIcon from '@mui/icons-material/Shield';
import CalloutBox from '../../common/CalloutBox';

type CodeKind = 'bad' | 'good';

function CodeBlock({ kind, label, code }: { kind: CodeKind; label: string; code: string }) {
  const token = kind === 'bad' ? 'danger' : 'success';
  const Icon = kind === 'bad' ? ReportProblemIcon : CheckCircleIcon;
  return (
    <Box sx={{ flex: '1 1 360px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.8 }}>
        <Icon sx={{ fontSize: 18, color: `var(--${token})` }} />
        <Typography variant="caption" sx={{ fontWeight: 700, color: `var(--${token})` }}>
          {label}
        </Typography>
      </Box>
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 1.5,
          borderRadius: 1.5,
          background: 'var(--code-bg)',
          color: 'var(--code-fg)',
          border: `1px solid var(--${token})`,
          fontFamily: 'monospace',
          fontSize: '0.8rem',
          lineHeight: 1.6,
          overflowX: 'auto',
          whiteSpace: 'pre',
        }}
      >
        {code}
      </Box>
    </Box>
  );
}

const sqlBad = `query = "SELECT * FROM users
  WHERE name = '" + input + "'";
# input: ' OR '1'='1
# -> returns every row!`;

const sqlGood = `# Parameterised query
query = "SELECT * FROM users
  WHERE name = ?"
db.execute(query, [input])`;

const xssBad = `// Injects raw user text into the page
el.innerHTML = userComment;
// comment: <script>steal()</script>`;

const xssGood = `// Treat it as text, not HTML
el.textContent = userComment;
// or escape + sanitise before render`;

const defenses = [
  'Never build queries or HTML by gluing strings together with user input',
  'Use parameterised queries / prepared statements for every database call',
  'Escape or sanitise all user input before it is shown on a page',
  'Validate input against an allow-list of what is actually expected',
  'Apply least privilege so a compromised query cannot read everything',
];

export default function WebAttacksConcept() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'var(--ink)', textAlign: 'center' }}>
        Web Application Attacks
      </Typography>

      <Typography variant="body1" sx={{ mb: 5, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 760, mx: 'auto' }}>
        Most web vulnerabilities come from the same mistake: <strong>trusting user input</strong>. When
        input is mixed straight into a database query or a web page, an attacker can smuggle in their own
        commands. Two classics are SQL injection and cross-site scripting.
      </Typography>

      {/* SQL Injection */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, borderTop: '4px solid var(--danger)', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <StorageIcon sx={{ fontSize: 30, color: 'var(--danger)' }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
            SQL Injection (SQLi)
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6, mb: 2 }}>
          The attacker types SQL into a normal input field. Because the input is concatenated into the
          query, their text becomes part of the command — letting them read, change, or delete data.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <CodeBlock kind="bad" label="Vulnerable" code={sqlBad} />
          <CodeBlock kind="good" label="Safe" code={sqlGood} />
        </Box>
      </Paper>

      {/* XSS */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, borderTop: '4px solid var(--warning)', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <CodeIcon sx={{ fontSize: 30, color: 'var(--warning)' }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--ink)' }}>
            Cross-Site Scripting (XSS)
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'var(--ink-soft)', lineHeight: 1.6, mb: 2 }}>
          The attacker stores a script inside content other users will view (a comment, a profile). When
          the page renders it as HTML, that script runs in the victim&apos;s browser and can steal their
          session.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <CodeBlock kind="bad" label="Vulnerable" code={xssBad} />
          <CodeBlock kind="good" label="Safe" code={xssGood} />
        </Box>
      </Paper>

      <CalloutBox type="success" title="The golden rule: never trust input" icon={<ShieldIcon sx={{ color: 'var(--success)' }} />}>
        <Box component="ul" sx={{ m: 0, pl: 3, color: 'var(--ink-soft)' }}>
          {defenses.map((d) => (
            <Box component="li" key={d} sx={{ mb: 0.5, lineHeight: 1.6 }}>
              {d}
            </Box>
          ))}
        </Box>
      </CalloutBox>
    </Box>
  );
}
