'use client';

import { Box, Typography, Paper } from '@mui/material';
import '../../styles/array.css'; // Still use array.css for layout, border, spacing, etc.

interface ConceptWrapperProps {
    title: string;
    description: React.ReactNode;
    children: React.ReactNode;
}

export default function ConceptWrapper({
    title,
    description,
    children,
}: ConceptWrapperProps) {
    return (
        <Box className="array-container">
            <Typography variant="h5" className="array-title" gutterBottom>
                {title}
            </Typography>

            <Typography variant="body1" className="map-description" sx={{ mb: 2 }}>
                {description}
            </Typography>
            {children}
        </Box>
    );
}
