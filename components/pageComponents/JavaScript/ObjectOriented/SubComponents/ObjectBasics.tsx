import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import FlexibleGrid, { GridItem } from '@/components/common/FlexibleGrid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCube,
  faWrench,
  faBoxOpen,
} from '@fortawesome/free-solid-svg-icons';

const ObjectBasics: React.FC = () => {
  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        Objects are the foundation of modern JavaScript programming. They let you group related data and functionality together, making your code more organized and easier to understand.
      </p>

      <ConceptInfoCard>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          The Three Core Concepts:
        </Typography>
        
        <FlexibleGrid 
          items={[
            {
              title: '1. CLASSES',
              description: 'Blueprints for objects',
              titleColor: '#1976d2',
              backgroundColor: '#e3f2fd'
            },
            {
              title: '2. PROPERTIES', 
              description: 'Store data values',
              titleColor: '#f57c00',
              backgroundColor: '#fff3e0'
            },
            {
              title: '3. METHODS',
              description: 'Perform actions',
              titleColor: '#4caf50',
              backgroundColor: '#e8f5e9'
            }
          ]}
        />

        <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic', textAlign: 'center' }}>
          Let's explore how to create and use classes with properties and methods step by step.
        </Typography>
      </ConceptInfoCard>
    </div>
  );
};

export default ObjectBasics;