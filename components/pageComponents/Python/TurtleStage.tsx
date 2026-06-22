'use client';

import React from 'react';
import { Segment, TurtleState } from './turtleEngine';

interface TurtleStageProps {
  segments: Segment[];
  turtle: TurtleState;
  /** SVG coordinate size — also the turtle's drawable area in "steps". */
  width?: number;
  height?: number;
  showTurtle?: boolean;
  showGrid?: boolean;
  showAxes?: boolean;
  /** Smoothly tween the turtle marker between renders (nice for playgrounds). */
  animate?: boolean;
  /** Optional dashed arrow from the turtle showing where forward() would go. */
  ghost?: { length: number } | null;
}

/**
 * Presentational SVG canvas. Given the drawn segments and the turtle's state it
 * paints the lines and a little turtle marker. Pure tokens / CSS color names so
 * it themes correctly in Light, Dark, Academic and Terminal.
 */
export default function TurtleStage({
  segments,
  turtle,
  width = 440,
  height = 340,
  showTurtle = true,
  showGrid = true,
  showAxes = false,
  animate = true,
  ghost = null,
}: TurtleStageProps) {
  const cx = width / 2;
  const cy = height / 2;
  // Turtle coords -> screen coords (flip y so +y points up).
  const sx = (x: number) => cx + x;
  const sy = (y: number) => cy - y;
  const grid = 20;

  const gridLines: React.ReactNode[] = [];
  if (showGrid) {
    for (let x = grid; x <= cx; x += grid) {
      gridLines.push(
        <line key={`gx${x}`} x1={sx(x)} y1={0} x2={sx(x)} y2={height} stroke="var(--line)" strokeWidth={1} />,
        <line key={`gx-${x}`} x1={sx(-x)} y1={0} x2={sx(-x)} y2={height} stroke="var(--line)" strokeWidth={1} />,
      );
    }
    for (let y = grid; y <= cy; y += grid) {
      gridLines.push(
        <line key={`gy${y}`} x1={0} y1={sy(y)} x2={width} y2={sy(y)} stroke="var(--line)" strokeWidth={1} />,
        <line key={`gy-${y}`} x1={0} y1={sy(-y)} x2={width} y2={sy(-y)} stroke="var(--line)" strokeWidth={1} />,
      );
    }
  }

  const ghostLen = ghost?.length ?? 0;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{
        width: '100%',
        height: 'auto',
        display: 'block',
        borderRadius: 8,
        border: '1px solid var(--line-strong)',
        background: 'var(--paper-raised)',
      }}
      role="img"
      aria-label="Turtle drawing canvas"
    >
      {gridLines}

      {showAxes && (
        <>
          <line x1={0} y1={cy} x2={width} y2={cy} stroke="var(--line-strong)" strokeWidth={1.5} strokeDasharray="4 5" />
          <line x1={cx} y1={0} x2={cx} y2={height} stroke="var(--line-strong)" strokeWidth={1.5} strokeDasharray="4 5" />
          <text x={width - 8} y={cy - 6} fontSize={11} fill="var(--ink-faint)" fontFamily="monospace" textAnchor="end">
            +x
          </text>
          <text x={cx + 6} y={12} fontSize={11} fill="var(--ink-faint)" fontFamily="monospace">
            +y
          </text>
          <text x={cx + 8} y={cy + 16} fontSize={12} fill="var(--ink-soft)" fontFamily="monospace">
            (0, 0)
          </text>
        </>
      )}

      {/* Lines the turtle has drawn */}
      {segments.map((s, i) => (
        <line
          key={i}
          x1={sx(s.x1)}
          y1={sy(s.y1)}
          x2={sx(s.x2)}
          y2={sy(s.y2)}
          stroke={s.color}
          strokeWidth={s.width}
          strokeLinecap="round"
        />
      ))}

      {showTurtle && (
        <g
          transform={`translate(${sx(turtle.x)}, ${sy(turtle.y)}) rotate(${-turtle.heading})`}
          style={animate ? { transition: 'transform 0.45s ease' } : undefined}
        >
          {/* Direction hint: where forward() would travel from here */}
          {ghostLen > 0 && (
            <g>
              <line x1={0} y1={0} x2={ghostLen} y2={0} stroke="var(--accent)" strokeWidth={2} strokeDasharray="5 5" />
              <polygon
                points={`${ghostLen},0 ${ghostLen - 9},-5 ${ghostLen - 9},5`}
                fill="var(--accent)"
              />
            </g>
          )}

          {/* Turtle marker (head points toward +x before rotation) */}
          {[[-8, -9], [8, -9], [-8, 9], [8, 9]].map(([lx, ly], i) => (
            <ellipse key={i} cx={lx} cy={ly} rx={4} ry={3.2} fill="var(--success)" stroke="var(--ink)" strokeWidth={0.5} />
          ))}
          <polygon points="-13,0 -18,-3 -18,3" fill="var(--success)" stroke="var(--ink)" strokeWidth={0.5} />
          <circle cx={15} cy={0} r={5} fill="var(--success)" stroke="var(--ink)" strokeWidth={0.6} />
          <circle cx={17} cy={-2} r={1} fill="var(--ink)" />
          <circle cx={17} cy={2} r={1} fill="var(--ink)" />
          <ellipse cx={0} cy={0} rx={13} ry={11} fill="var(--success)" stroke="var(--ink)" strokeWidth={0.9} />
          <ellipse cx={0} cy={0} rx={8} ry={6.5} fill="none" stroke="var(--paper-raised)" strokeWidth={1} opacity={0.55} />
          <line x1={-13} y1={0} x2={13} y2={0} stroke="var(--paper-raised)" strokeWidth={1} opacity={0.45} />
          <line x1={0} y1={-11} x2={0} y2={11} stroke="var(--paper-raised)" strokeWidth={1} opacity={0.45} />
        </g>
      )}
    </svg>
  );
}
