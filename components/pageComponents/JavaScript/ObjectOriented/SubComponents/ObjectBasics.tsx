import React from 'react';
import Typography from '@mui/material/Typography';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import FlexibleGrid from '@/components/common/FlexibleGrid';

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
              titleColor: 'var(--info)',
              backgroundColor: 'var(--info-bg)'
            },
            {
              title: '2. PROPERTIES', 
              description: 'Store data values',
              titleColor: 'var(--warning)',
              backgroundColor: 'var(--warning-bg)'
            },
            {
              title: '3. METHODS',
              description: 'Perform actions',
              titleColor: 'var(--success)',
              backgroundColor: 'var(--success-bg)'
            }
          ]}
        />

        <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic', textAlign: 'center' }}>
          Let&apos;s explore how to create and use classes with properties and methods step by step.
        </Typography>
      </ConceptInfoCard>
    </div>
  );
};

export default ObjectBasics;