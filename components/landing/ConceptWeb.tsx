'use client';

import { useEffect, useRef, useState } from 'react';
import { topicNodes, topicLinks, tokenForCategory, buildAdjacency } from './topics';
import type { TopicNode } from './topics';
import { useThemeColors } from './useThemeColors';
import type { ThemeColors } from './useThemeColors';

interface ConceptWebProps {
  /** Currently highlighted topic id (shared with the tile grid). */
  hoveredId: string | null;
  /** Called when the pointer enters/leaves a node (null = left). */
  onHover: (id: string | null) => void;
  /** Called when a node is clicked, with its route. */
  onSelect: (route: string) => void;
  /** CSS height of the graph stage. */
  height?: string;
}

// --- colour helpers (operate on hex strings from the theme tokens) ----------

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const h = hex.replace('#', '').trim();
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  if (full.length !== 6) return null;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return null;
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

/** Blend `hex` toward `toward` by `t` (0..1). Used to fade dimmed elements. */
function mix(hex: string, toward: string, t: number): string {
  const a = hexToRgb(hex);
  const b = hexToRgb(toward);
  if (!a || !b) return hex;
  const ch = (x: number, y: number) => Math.round(x + (y - x) * t);
  const to2 = (v: number) => v.toString(16).padStart(2, '0');
  return `#${to2(ch(a.r, b.r))}${to2(ch(a.g, b.g))}${to2(ch(a.b, b.b))}`;
}

interface GraphNode extends TopicNode {
  x?: number;
  y?: number;
  z?: number;
}
type LinkEnd = string | GraphNode;
interface GraphLink {
  source: LinkEnd;
  target: LinkEnd;
}

const endId = (end: LinkEnd): string => (typeof end === 'object' ? end.id : end);

function nodeColor(node: GraphNode, colors: ThemeColors, hoverId: string | null, adj: Record<string, Set<string>>): string {
  const base = colors[tokenForCategory[node.category]] ?? colors['--info'];
  if (hoverId && node.id !== hoverId && !adj[hoverId]?.has(node.id)) {
    return mix(base, colors['--paper'], 0.8);
  }
  return base;
}

function nodeVal(node: GraphNode, hoverId: string | null, adj: Record<string, Set<string>>): number {
  if (!hoverId) return 3.5;
  if (node.id === hoverId) return 11;
  if (adj[hoverId]?.has(node.id)) return 6.5;
  return 3;
}

function linkActive(link: GraphLink, hoverId: string | null): boolean {
  return !!hoverId && (endId(link.source) === hoverId || endId(link.target) === hoverId);
}

function linkColor(link: GraphLink, colors: ThemeColors, hoverId: string | null): string {
  if (linkActive(link, hoverId)) return colors['--ink'];
  const base = colors['--ink-soft'];
  if (hoverId) return mix(base, colors['--paper'], 0.6);
  return base;
}

export default function ConceptWeb({ hoveredId, onHover, onSelect, height = 'min(58vh, 520px)' }: ConceptWebProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // The 3d-force-graph instance is loosely typed (matches the repo's pattern).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fgRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  const colors = useThemeColors();

  // Latest values the (one-time) graph accessors read from.
  const colorsRef = useRef<ThemeColors>(colors);
  const hoverRef = useRef<string | null>(hoveredId);
  const onHoverRef = useRef(onHover);
  const onSelectRef = useRef(onSelect);
  const interactingRef = useRef(false);
  const adjRef = useRef<Record<string, Set<string>>>(buildAdjacency());
  onHoverRef.current = onHover;
  onSelectRef.current = onSelect;

  // Initialise the graph once, on the client only.
  useEffect(() => {
    let disposed = false;
    let raf = 0;
    let ro: ResizeObserver | undefined;
    const el = containerRef.current;
    const onDown = () => { interactingRef.current = true; };
    const onUp = () => { interactingRef.current = false; };

    import('3d-force-graph').then(({ default: ForceGraph3D }) => {
      if (disposed || !el) return;
      // Loosely typed instance (matches the repo's pattern) so the chained
      // config accessors don't fight the library's generic node/link types.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fg: any = new ForceGraph3D(el);
      fgRef.current = fg;

      fg
        .graphData({
          nodes: topicNodes.map((n) => ({ ...n })),
          links: topicLinks.map((l) => ({ ...l })),
        })
        .nodeId('id')
        .nodeLabel((n: GraphNode) => n.label)
        .nodeRelSize(5)
        .nodeOpacity(0.92)
        .nodeVal((n: GraphNode) => nodeVal(n, hoverRef.current, adjRef.current))
        .nodeColor((n: GraphNode) => nodeColor(n, colorsRef.current, hoverRef.current, adjRef.current))
        .linkColor((l: GraphLink) => linkColor(l, colorsRef.current, hoverRef.current))
        .linkOpacity(0.45)
        .linkWidth((l: GraphLink) => (linkActive(l, hoverRef.current) ? 2.2 : 0.7))
        .linkDirectionalParticles((l: GraphLink) => (linkActive(l, hoverRef.current) ? 3 : 0))
        .linkDirectionalParticleWidth(2)
        .backgroundColor(colorsRef.current['--paper'])
        .enableNodeDrag(false)
        .showNavInfo(false)
        .onNodeHover((n: GraphNode | null) => {
          if (el) el.style.cursor = n ? 'pointer' : 'grab';
          onHoverRef.current(n ? n.id : null);
        })
        .onNodeClick((n: GraphNode) => {
          if (n) onSelectRef.current(n.route);
        })
        .onBackgroundClick(() => onHoverRef.current(null))
        .onEngineStop(() => fg.zoomToFit(500, 60));

      // Drag rotates only — no zoom/pan, so page scroll keeps working.
      const controls = fg.controls?.();
      if (controls) {
        controls.noZoom = true;
        controls.noPan = true;
      }

      const setSize = () => {
        fg.width(el.clientWidth);
        fg.height(el.clientHeight);
      };
      setSize();
      ro = new ResizeObserver(setSize);
      ro.observe(el);

      el.addEventListener('pointerdown', onDown);
      window.addEventListener('pointerup', onUp);

      // Gentle auto-rotation that pauses while interacting or inspecting a node.
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduceMotion) {
        const scene = fg.scene();
        const tick = () => {
          if (disposed) return;
          if (scene && !interactingRef.current && !hoverRef.current) {
            scene.rotation.y += 0.0016;
          }
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }

      setReady(true);
    });

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      ro?.disconnect();
      if (el) {
        el.removeEventListener('pointerdown', onDown);
        el.innerHTML = '';
      }
      window.removeEventListener('pointerup', onUp);
      const fg = fgRef.current;
      if (fg && typeof fg._destructor === 'function') fg._destructor();
      fgRef.current = null;
    };
  }, []);

  // Re-style on theme change.
  useEffect(() => {
    colorsRef.current = colors;
    const fg = fgRef.current;
    if (fg) {
      fg.backgroundColor(colors['--paper']);
      fg.refresh();
    }
  }, [colors]);

  // Re-style on highlight change (driven by the graph itself or the tile grid).
  useEffect(() => {
    hoverRef.current = hoveredId;
    fgRef.current?.refresh();
  }, [hoveredId]);

  return (
    <div style={{ position: 'relative', width: '100%', height, borderRadius: 12, overflow: 'hidden' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      {!ready && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ink-soft)',
            fontSize: 14,
            pointerEvents: 'none',
          }}
        >
          Loading concept web…
        </div>
      )}
    </div>
  );
}
