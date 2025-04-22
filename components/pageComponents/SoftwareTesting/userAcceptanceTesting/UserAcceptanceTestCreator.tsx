'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  MenuItem,
  Tooltip
} from '@mui/material';

export interface UATTest {
  id: string;
  title: string;
  goal: string;
  steps: string[];
  expectedResult: string;
  category: string;
}

interface Props {
  onTestsChange?: (tests: UATTest[]) => void;
}

const categoryDescriptions: Record<string, string> = {
  Core: 'Tests standard expected behaviors from user stories.',
  Edge: 'Covers unusual or boundary conditions.',
  Negative: 'Ensures invalid input or flows are handled gracefully.',
  Exploratory: 'Open-ended testing based on intuition and curiosity.'
};

const categories = Object.keys(categoryDescriptions);

export default function UserAcceptanceTestCreator({ onTestsChange }: Props) {
  const [tests, setTests] = useState<UATTest[]>([]);
  const [form, setForm] = useState<UATTest>({
    id: crypto.randomUUID(),
    title: '',
    goal: '',
    steps: [],
    expectedResult: '',
    category: 'Core'
  });

  const handleChange = (field: keyof UATTest, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: field === 'steps' ? value.split(',').map(s => s.trim()) : value
    }));
  };

  const handleAddTest = () => {
    if (!form.title || !form.goal || !form.steps.length || !form.expectedResult) return;

    setTests((prev) => [...prev, form]);
    setForm({
      id: crypto.randomUUID(),
      title: '',
      goal: '',
      steps: [],
      expectedResult: '',
      category: 'Core'
    });
  };

  const handleExport = () => {
    const allTests = [...tests];
    if (form.title && form.goal && form.steps.length && form.expectedResult) {
      allTests.push(form);
    }

    const header = ['ID', 'Title', 'Goal', 'Steps', 'Expected Result', 'Category'];
    const lines = allTests.map(t =>
      `"${t.id}","${t.title}","${t.goal}","${t.steps.join(' | ')}","${t.expectedResult}","${t.category}"`
    );
    const csvContent = [header.join(','), ...lines].join('\n');

    const blob = new Blob([csvContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'uat_tests.txt';
    link.click();
  };

  const displayedTests = form.title || form.goal || form.steps.length || form.expectedResult
    ? [...tests, form]
    : tests;

  useEffect(() => {
    onTestsChange?.(displayedTests);
  }, [tests, form, onTestsChange]);

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>Create UAT Tests</Typography>

      <Stack spacing={2}>
        <TextField
          label="Title"
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          fullWidth
        />
        <TextField
          label="Goal"
          value={form.goal}
          onChange={(e) => handleChange('goal', e.target.value)}
          fullWidth
        />
        <TextField
          label="Steps (comma-separated)"
          value={form.steps.join(', ')}
          onChange={(e) => handleChange('steps', e.target.value)}
          fullWidth
        />
        <TextField
          label="Expected Result"
          value={form.expectedResult}
          onChange={(e) => handleChange('expectedResult', e.target.value)}
          fullWidth
        />
        <TextField
          select
          label="Category"
          value={form.category}
          onChange={(e) => handleChange('category', e.target.value)}
          fullWidth
        >
          {categories.map((cat) => (
            <Tooltip key={cat} title={categoryDescriptions[cat]} placement="right-start" arrow>
              <MenuItem value={cat}>{cat}</MenuItem>
            </Tooltip>
          ))}
        </TextField>
        <Button variant="contained" onClick={handleAddTest}>New Test</Button>
      </Stack>

      {displayedTests.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>Test Cases</Typography>
          <Stack spacing={2}>
            {displayedTests.map((test) => (
              <Paper key={test.id} sx={{ p: 2, borderRadius: 2 }}>
                <Typography fontWeight="bold">{test.title}</Typography>
                <Typography variant="body2" color="text.secondary">Goal: {test.goal}</Typography>
                <Typography variant="body2">Steps:</Typography>
                <ul>
                  {test.steps.map((step, i) => (
                    <li key={i}><Typography variant="body2">{step}</Typography></li>
                  ))}
                </ul>
                <Typography variant="body2">Expected Result: {test.expectedResult}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Category: {test.category}
                </Typography>
              </Paper>
            ))}
          </Stack>

          <Button variant="outlined" sx={{ mt: 3 }} onClick={handleExport}>
            Export All Tests as .txt
          </Button>
        </Box>
      )}
    </Box>
  );
}
