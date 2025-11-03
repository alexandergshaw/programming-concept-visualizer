'use client';

import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface DiagramNode {
  id: string;
  label: string;
  description?: string;
  x: number;
  y: number;
  color?: string;
  children?: string[];
}

interface InteractiveDiagramProps {
  title?: string;
  nodes: DiagramNode[];
  width?: number;
  height?: number;
  showConnections?: boolean;
}

export default function InteractiveDiagram({
  title,
  nodes,
  width = 800,
  height = 600,
  showConnections = true,
}: InteractiveDiagramProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getNodeById = (id: string) => nodes.find(node => node.id === id);

  const renderConnection = (from: DiagramNode, toId: string) => {
    const to = getNodeById(toId);
    if (!to) return null;

    const isActive = selectedNode === from.id || selectedNode === toId || 
                     hoveredNode === from.id || hoveredNode === toId;

    return (
      <line
        key={`${from.id}-${toId}`}
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={isActive ? '#00319b' : '#cbd5e1'}
        strokeWidth={isActive ? 2 : 1}
        strokeDasharray={isActive ? '0' : '4,4'}
        style={{ transition: 'all 0.3s ease' }}
      />
    );
  };

  const renderNode = (node: DiagramNode) => {
    const isSelected = selectedNode === node.id;
    const isHovered = hoveredNode === node.id;
    const isActive = isSelected || isHovered;

    return (
      <g key={node.id}>
        <circle
          cx={node.x}
          cy={node.y}
          r={isActive ? 50 : 45}
          fill={node.color || '#61DAFB'}
          stroke={isActive ? '#00319b' : '#1e293b'}
          strokeWidth={isActive ? 3 : 2}
          style={{
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            filter: isActive ? 'drop-shadow(0 4px 8px rgba(0, 49, 155, 0.3))' : 'none',
          }}
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={() => setSelectedNode(isSelected ? null : node.id)}
        />
        <text
          x={node.x}
          y={node.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize={isActive ? 14 : 12}
          fontWeight={isActive ? 'bold' : 'normal'}
          style={{
            pointerEvents: 'none',
            transition: 'all 0.3s ease',
            userSelect: 'none',
          }}
        >
          {node.label}
        </text>
      </g>
    );
  };

  const selectedNodeData = selectedNode ? getNodeById(selectedNode) : null;

  return (
    <Box sx={{ my: 4 }}>
      {title && (
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {title}
        </Typography>
      )}
      
      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 2,
          background: '#fafafa',
        }}
      >
        <svg width={width} height={height} style={{ display: 'block', margin: '0 auto' }}>
          {/* Render connections first (behind nodes) */}
          {showConnections &&
            nodes.map(node =>
              node.children?.map(childId => renderConnection(node, childId))
            )}

          {/* Render nodes */}
          {nodes.map(renderNode)}
        </svg>

        {/* Description box */}
        {selectedNodeData?.description && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              background: 'white',
              borderRadius: 2,
              border: '2px solid #00319b',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#00319b', mb: 1 }}>
              {selectedNodeData.label}
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              {selectedNodeData.description}
            </Typography>
          </Box>
        )}

        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            mt: 2,
            color: '#64748b',
          }}
        >
          Click on nodes to see details • Hover to highlight connections
        </Typography>
      </Paper>
    </Box>
  );
}