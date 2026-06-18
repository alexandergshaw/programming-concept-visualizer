'use client';

import React, { useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';

interface ComponentInstance {
  id: string;
  type: string;
  label: string;
}

interface ComponentReuseVisualizerProps {
  instances: ComponentInstance[];
}

export default function ComponentReuseVisualizer({
  instances,
}: ComponentReuseVisualizerProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const componentTypes = Array.from(new Set(instances.map(i => i.type)));

  const handleTypeClick = (type: string) => {
    setSelectedType(selectedType === type ? null : type);
  };

  const isHighlighted = (instance: ComponentInstance) => {
    return selectedType === null || selectedType === instance.type;
  };

  return (
    <Box sx={{ my: 3 }}>
      <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Typography variant="body2" sx={{ mr: 1, alignSelf: 'center', color: 'var(--ink-soft)' }}>
          Click to highlight:
        </Typography>
        {componentTypes.map(type => {
          const count = instances.filter(i => i.type === type).length;
          return (
            <Chip
              key={type}
              label={`${type} (${count})`}
              onClick={() => handleTypeClick(type)}
              color={selectedType === type ? 'primary' : 'default'}
              sx={{ cursor: 'pointer' }}
            />
          );
        })}
      </Box>

      {/* Simple App Layout */}
      <Box sx={{ border: '2px solid var(--line)', borderRadius: 2, overflow: 'hidden', background: 'white' }}>
        {/* Header */}
        <Box sx={{ p: 2, background: 'var(--paper-raised)', borderBottom: '1px solid var(--line)', display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', flex: 1 }}>My App</Typography>
          {instances.filter(i => i.type === 'Button' && i.label && i.label.includes('Login')).map(instance => (
            <Box
              key={instance.id}
              sx={{
                px: 2,
                py: 0.5,
                border: '2px solid',
                borderColor: selectedType === instance.type ? 'var(--warning)' : 'var(--info)',
                borderRadius: 1,
                background: selectedType === instance.type ? 'var(--warning)' : 'var(--info)',
                color: selectedType === instance.type ? 'var(--code-bg)' : 'white',
                opacity: isHighlighted(instance) ? 1 : 0.3,
                fontWeight: selectedType === instance.type ? 'bold' : 'normal',
              }}
            >
              <Typography variant="body2">{instance.label}</Typography>
              {selectedType === instance.type && (
                <Typography variant="caption" sx={{ display: 'block', fontSize: '0.65rem', opacity: 0.8 }}>
                  &lt;{instance.type} /&gt;
                </Typography>
              )}
            </Box>
          ))}
        </Box>

        {/* Main Content */}
        <Box sx={{ p: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>Dashboard</Typography>
          
          {/* Cards Row */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            {instances.filter(i => i.type === 'Card').map(instance => (
              <Box
                key={instance.id}
                sx={{
                  flex: 1,
                  p: 2,
                  border: '2px solid',
                  borderColor: selectedType === instance.type ? 'var(--warning)' : 'var(--line)',
                  borderRadius: 2,
                  background: selectedType === instance.type ? 'var(--warning)' : 'white',
                  opacity: isHighlighted(instance) ? 1 : 0.3,
                  fontWeight: selectedType === instance.type ? 'bold' : 'normal',
                  minHeight: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="body2" sx={{ mb: 1 }}>{instance.label}</Typography>
                {selectedType === instance.type && (
                  <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'var(--ink-soft)', fontFamily: 'monospace' }}>
                    &lt;{instance.type} /&gt;
                  </Typography>
                )}
              </Box>
            ))}
          </Box>

          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>User Form</Typography>
          
          {/* Form Inputs */}
          <Box sx={{ mb: 3 }}>
            {instances.filter(i => i.type === 'Input').map(instance => (
              <Box
                key={instance.id}
                sx={{
                  mb: 2,
                  p: 1.5,
                  border: '2px solid',
                  borderColor: selectedType === instance.type ? 'var(--warning)' : 'var(--line)',
                  borderRadius: 1,
                  background: selectedType === instance.type ? 'var(--warning)' : 'var(--paper-raised)',
                  opacity: isHighlighted(instance) ? 1 : 0.3,
                  fontWeight: selectedType === instance.type ? 'bold' : 'normal',
                }}
              >
                <Typography variant="body2" sx={{ color: 'var(--ink-soft)' }}>{instance.label}</Typography>
                {selectedType === instance.type && (
                  <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'var(--ink-faint)', fontFamily: 'monospace', mt: 0.5, display: 'block' }}>
                    &lt;{instance.type} placeholder=&quot;{instance.label}&quot; /&gt;
                  </Typography>
                )}
              </Box>
            ))}
          </Box>

          {/* Submit Button */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {instances.filter(i => i.type === 'Button' && i.label && !i.label.includes('Login')).map(instance => (
              <Box
                key={instance.id}
                sx={{
                  px: 3,
                  py: 1,
                  border: '2px solid',
                  borderColor: selectedType === instance.type ? 'var(--warning)' : 'var(--success)',
                  borderRadius: 1,
                  background: selectedType === instance.type ? 'var(--warning)' : 'var(--success)',
                  color: selectedType === instance.type ? 'var(--code-bg)' : 'white',
                  opacity: isHighlighted(instance) ? 1 : 0.3,
                  fontWeight: selectedType === instance.type ? 'bold' : 'normal',
                }}
              >
                <Typography variant="body2">{instance.label}</Typography>
                {selectedType === instance.type && (
                  <Typography variant="caption" sx={{ display: 'block', fontSize: '0.65rem', opacity: 0.8 }}>
                    &lt;{instance.type} /&gt;
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {selectedType && (
        <Box sx={{ mt: 2, p: 2, background: 'var(--warning-bg)', borderRadius: 1, border: '1px solid var(--warning)' }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>{selectedType}</strong> component is reused {instances.filter(i => i.type === selectedType).length} times in this app
          </Typography>
          <Typography variant="caption" sx={{ color: 'var(--ink-soft)', display: 'block', fontFamily: 'monospace', mt: 1 }}>
            Example: &lt;{selectedType} ... /&gt;
          </Typography>
        </Box>
      )}
    </Box>
  );
}