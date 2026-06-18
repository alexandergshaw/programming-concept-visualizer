'use client';

import React from 'react';
import Section from '../../common/Section';
import InteractiveDiagram from '../../common/InteractiveDiagram';
import ComponentReuseVisualizer from '../../common/ComponentReuseVisualizer';
import ComponentLibraryUpdater from '../../common/ComponentLibraryUpdater';
import DataFlowVisualizer from '../../common/DataFlowVisualizer';
import SaveUpdateCycleVisualizer from '../../common/SaveUpdateCycleVisualizer';
import { Box, Typography } from '@mui/material';

export default function ReactArchitectureConcept() {
  const componentTreeNodes = [
    {
      id: 'app',
      label: 'App',
      x: 400,
      y: 100,
      color: 'var(--info)',
      description: 'Root component that orchestrates the entire application',
      children: ['header', 'main', 'footer'],
    },
    {
      id: 'header',
      label: 'Header',
      x: 200,
      y: 250,
      color: 'var(--info)',
      description: 'Header component with logo and navigation',
      children: ['logo', 'nav'],
    },
    {
      id: 'main',
      label: 'Main',
      x: 400,
      y: 250,
      color: 'var(--info)',
      description: 'Main content area of the application',
      children: ['sidebar', 'content'],
    },
    {
      id: 'footer',
      label: 'Footer',
      x: 600,
      y: 250,
      color: 'var(--info)',
      description: 'Footer component with links and copyright',
    },
    {
      id: 'logo',
      label: 'Logo',
      x: 100,
      y: 400,
      color: 'var(--success)',
      description: 'Logo image component',
    },
    {
      id: 'nav',
      label: 'Navigation',
      x: 300,
      y: 400,
      color: 'var(--success)',
      description: 'Navigation menu with links',
    },
    {
      id: 'sidebar',
      label: 'Sidebar',
      x: 300,
      y: 400,
      color: 'var(--success)',
      description: 'Sidebar with widgets and filters',
    },
    {
      id: 'content',
      label: 'Content',
      x: 500,
      y: 400,
      color: 'var(--success)',
      description: 'Main content display area',
    },
  ];

  const componentInstances = [
    // Buttons
    { id: 'btn1', type: 'Button', label: 'Login' },
    { id: 'btn2', type: 'Button', label: 'Home' },
    { id: 'btn3', type: 'Button', label: 'Dashboard' },
    { id: 'btn4', type: 'Button', label: 'Settings' },
    { id: 'btn5', type: 'Button', label: 'Submit' },
    { id: 'btn6', type: 'Button', label: 'Cancel' },

    // Cards
    { id: 'card1', type: 'Card', label: 'Stats Card' },
    { id: 'card2', type: 'Card', label: 'User Card' },
    { id: 'card3', type: 'Card', label: 'Activity Card' },

    // Inputs
    { id: 'input1', type: 'Input', label: 'Name' },
    { id: 'input2', type: 'Input', label: 'Email' },
    { id: 'input3', type: 'Input', label: 'Password' },
  ];

  return (
    <div>
      <Section title="React Application Architecture">
        <p>
          React applications are built around two fundamental concerns: <strong>aesthetics</strong> (how your app looks and behaves) 
          and <strong>data flow</strong> (how information moves through your app). Understanding both is crucial for building 
          maintainable and scalable applications.
        </p>
      </Section>

      {/* AESTHETICS SECTION */}
      <Box sx={{ 
        my: 6, 
        p: 4, 
        borderRadius: 3, 
        background: 'linear-gradient(135deg, var(--paper-sunken) 0%, var(--paper-sunken) 100%)',
        border: '2px solid var(--line-strong)'
      }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--ink)', mb: 2 }}>
          Part 1: Aesthetics & UI Structure
        </Typography>
        <Typography variant="body1" sx={{ color: 'var(--ink-soft)', mb: 4 }}>
          How React components are organized, reused, and styled to create consistent, maintainable user interfaces.
        </Typography>

        <Section title="Component Reusability">
          <p>
            One of React's core strengths is the ability to create reusable components that can be used throughout your application,
            ensuring consistency and reducing code duplication. The same Button, Card, or Input component can appear in multiple places.
          </p>
          <ComponentReuseVisualizer
            instances={componentInstances}
          />
        </Section>

        <Section title="Component Library Consistency">
          <p>
            Using a centralized component library ensures that updates to shared components automatically propagate throughout your application,
            maintaining visual and functional consistency. Change one component definition, update the entire app.
          </p>
          <ComponentLibraryUpdater />
        </Section>
      </Box>

      {/* DATA FLOW SECTION */}
      <Box sx={{ 
        my: 6, 
        p: 4, 
        borderRadius: 3, 
        background: 'linear-gradient(135deg, var(--paper-raised) 0%, var(--paper-raised) 100%)',
        border: '2px solid var(--paper-sunken)'
      }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--ink)', mb: 2 }}>
          Part 2: Data Flow & State Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'var(--ink-soft)', mb: 4 }}>
          How information moves through your React application: from backend APIs to state management to UI rendering, 
          and how user interactions trigger updates that flow back through the system.
        </Typography>

        <Section title="Data Flow: API → Redux → UI">
          <p>
            Modern React applications typically follow a unidirectional data flow pattern. Data is fetched from an API,
            stored in a state management solution like Redux, and then consumed by React components to render the UI.
            This one-way flow makes applications predictable and easier to debug.
          </p>
          <DataFlowVisualizer />
        </Section>

        <Section title="Save & Update Cycle">
          <p>
            When users interact with your application, changes need to be persisted to the backend and reflected in the UI.
            This cycle involves sending updates to the server, fetching the latest state, updating Redux, and re-rendering components.
            Understanding this flow is essential for building interactive applications.
          </p>
          <SaveUpdateCycleVisualizer />
        </Section>
      </Box>
    </div>
  );
}