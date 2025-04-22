'use client';

import { useState } from 'react';
import workflowsData from './UserAcceptanceWorkflows.json';
import {
  Box,
  Typography,
  Checkbox,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Workflow {
  id: number;
  title: string;
  goal: string;
  steps: string[];
  expectedResult: string;
  category: string;
}

export default function UserAcceptanceTestingCheckList() {
  const workflows: Workflow[] = workflowsData.uatWorkflows;
  const [checked, setChecked] = useState<boolean[]>(Array(workflows.length).fill(false));
  const [notes, setNotes] = useState<string[]>(Array(workflows.length).fill(''));

  const handleToggle = (index: number) => {
    setChecked(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const handleNoteChange = (index: number, value: string) => {
    setNotes(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleExport = () => {
    const headers = ['ID', 'Title', 'Category', 'Completed', 'Note'];
    const rows = workflows.map((wf, index) => [
      wf.id,
      `"${wf.title.replace(/"/g, '""')}"`,
      wf.category,
      checked[index] ? 'Yes' : 'No',
      `"${notes[index].replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'uat_results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Stack spacing={2} style={{ marginTop: "20px", width: "40%" }}>
      <Button variant="outlined" onClick={handleExport}>Export Results</Button>

      {workflows.map((wf, index) => (
        <Accordion key={wf.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Checkbox
                checked={checked[index]}
                onChange={() => handleToggle(index)}
              />
              <Typography fontWeight={600}>{wf.title}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle2" gutterBottom color="text.primary">
              Goal:
            </Typography>
            <Typography gutterBottom>{wf.goal}</Typography>

            <Typography variant="subtitle2" gutterBottom color="text.primary" style={{ marginTop: "20px" }}>
              Steps:
            </Typography>
            <ol>
              {wf.steps.map((step, i) => (
                <li key={i}>
                  <Typography>{`${i + 1}. ${step}`}</Typography>
                </li>
              ))}
            </ol>

            <Typography variant="subtitle2" gutterBottom color="text.primary" style={{ marginTop: "20px" }}>
              Expected Result:
            </Typography>
            <Typography gutterBottom>{wf.expectedResult}</Typography>

            <Typography variant="subtitle2" gutterBottom color="text.primary" style={{ marginTop: "20px" }}>
              Notes:
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={3}
              value={notes[index]}
              onChange={(e) => handleNoteChange(index, e.target.value)}
              placeholder="Enter observations or feedback here..."
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
}