'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Divider,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';

type Workflow = {
  id: string;
  label: string;
  result: 'success' | 'fail' | null;
  notes: string;
};

const defaultWorkflows: Workflow[] = [
  { id: 'add-task', label: 'Add a task', result: null, notes: '' },
  { id: 'edit-task', label: 'Edit a task', result: null, notes: '' },
  { id: 'delete-task', label: 'Delete a task', result: null, notes: '' },
  { id: 'complete-task', label: 'Mark a task complete', result: null, notes: '' },
  { id: 'user-flow', label: 'Understand how to use the app without help', result: null, notes: '' },
];

const STORAGE_KEY = 'uat-workflows';

export default function UATPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>(defaultWorkflows);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setWorkflows(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workflows));
  }, [workflows]);

  const updateWorkflow = (id: string, changes: Partial<Workflow>) => {
    setWorkflows((prev) =>
      prev.map((wf) => (wf.id === id ? { ...wf, ...changes } : wf))
    );
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Paper elevation={3} sx={{ width: 360, p: 3, overflowY: 'auto', borderRight: '1px solid #ddd' }}>
        <Typography variant="h5" gutterBottom>
          UAT Checklist
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Go through each workflow below. Mark if it was successful and leave any notes.
        </Typography>

        {workflows.map((wf, i) => (
          <Box key={wf.id} sx={{ mb: 3 }}>
            <Divider sx={{ mb: 1 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {i + 1}. {wf.label}
            </Typography>

            <ToggleButtonGroup
              value={wf.result}
              exclusive
              size="small"
              onChange={(e, newVal) =>
                updateWorkflow(wf.id, { result: newVal ?? null })
              }
              sx={{ mt: 1 }}
            >
              <ToggleButton value="success" color="success">
                ✅ Success
              </ToggleButton>
              <ToggleButton value="fail" color="error">
                ❌ Fail
              </ToggleButton>
            </ToggleButtonGroup>

            <TextField
              label="Notes"
              multiline
              minRows={2}
              fullWidth
              margin="normal"
              value={wf.notes}
              onChange={(e) => updateWorkflow(wf.id, { notes: e.target.value })}
            />
          </Box>
        ))}
      </Paper>

      {/* Main test area */}
      <Box sx={{ flex: 1, p: 4, overflowY: 'auto' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Task App Demo (Placeholder)
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          This area will contain the feature or app students are testing. You can embed a real app,
          a fake broken demo, or even just screenshots if needed.
        </Typography>

        {/* Optional: Embed an iframe or demo app below */}
        <Box
          sx={{
            mt: 4,
            height: 400,
            border: '2px dashed #ccc',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#888',
            fontSize: '1.2rem',
            textAlign: 'center',
          }}
        >
          Feature-in-testing goes here (e.g., embedded app or form)
        </Box>
      </Box>
    </Box>
  );
}
