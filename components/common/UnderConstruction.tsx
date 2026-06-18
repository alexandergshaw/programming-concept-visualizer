'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';

export default function UnderConstruction() {
  return (
    <Box
      sx={{
        maxWidth: 700,
        margin: '80px auto',
        textAlign: 'center',
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Page Under Construction
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        This section is still being developed. I (Alex) maintain this visualizer on my own
        to support student learning across multiple programming courses.
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        This is not a commercial product — it is a teaching tool that I am expanding gradually, focusing
        on 1 to 2 classes at a time.
      </Typography>
    </Box>
  );
}
