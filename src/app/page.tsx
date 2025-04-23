'use client';

import { Box, Button, Container, Typography, Grid, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function InstructorLandingPage() {
  const router = useRouter();

  return (
    <Box sx={{ bgcolor: '#f7f9fb', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        {/* Hero Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 6, bgcolor: '#e8f5e9', borderLeft: '8px solid #2e7d32' }}>
          <Typography variant="h3" gutterBottom fontWeight="bold">
            Hi, I'm Alex Shaw
          </Typography>
          <Typography variant="h6" gutterBottom>
            Instructor • Developer • Mentor
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Welcome to my teaching portal. Here you can find everything related to your course,
            including lecture notes, assignments, portfolio inspiration, and how to reach me.
          </Typography>
          <Button variant="contained" color="success" onClick={() => router.push('/courses')}>
            View My Courses
          </Button>
        </Paper>

        {/* Navigation Cards */}
        <Grid container spacing={4}>
          {[
            { title: 'Courses', desc: 'Lecture notes, assignments, and resources.', path: '/courses' },
            { title: 'Portfolio', desc: 'Sample projects, student work, and demos.', path: '/portfolio' },
            { title: 'Office Hours', desc: 'Schedule or drop in for help and feedback.', path: '/office-hours' },
            { title: 'Contact', desc: 'Get in touch via email or messaging.', path: '/contact' },
          ].map(({ title, desc, path }) => (
            <Grid item xs={12} sm={6} key={title}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  borderLeft: '6px solid #81c784',
                  '&:hover': { bgcolor: '#f1f8e9' },
                }}
                onClick={() => router.push(path)}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="body2">{desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
