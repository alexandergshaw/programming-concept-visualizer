'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import ConceptInfoCard from '../../common/ConceptInfoCard';
import TableOfContents from '@/components/common/TableOfContents';
import '../../../styles/dataStructures.css';

type TreeNode = { value: number; left: TreeNode | null; right: TreeNode | null };
type TraversalType = 'in' | 'pre' | 'post';

function insert(node: TreeNode | null, value: number): TreeNode {
  if (!node) return { value, left: null, right: null };
  if (value < node.value) return { ...node, left: insert(node.left, value) };
  if (value > node.value) return { ...node, right: insert(node.right, value) };
  return node; // ignore duplicates
}

function traverse(node: TreeNode | null, type: TraversalType, acc: number[] = []): number[] {
  if (!node) return acc;
  if (type === 'pre') acc.push(node.value);
  traverse(node.left, type, acc);
  if (type === 'in') acc.push(node.value);
  traverse(node.right, type, acc);
  if (type === 'post') acc.push(node.value);
  return acc;
}

const X_GAP = 58;
const Y_GAP = 74;
const R = 21;
const PAD = 28;

type Pos = { value: number; x: number; y: number };
type Edge = { x1: number; y1: number; x2: number; y2: number };

function computeLayout(root: TreeNode | null) {
  const nodes: Pos[] = [];
  const edges: Edge[] = [];
  let idx = 0;
  function walk(node: TreeNode | null, depth: number): Pos | null {
    if (!node) return null;
    const leftPos = walk(node.left, depth + 1);
    const x = PAD + R + idx * X_GAP;
    const y = PAD + R + depth * Y_GAP;
    idx += 1;
    const myPos: Pos = { value: node.value, x, y };
    nodes.push(myPos);
    const rightPos = walk(node.right, depth + 1);
    if (leftPos) edges.push({ x1: x, y1: y, x2: leftPos.x, y2: leftPos.y });
    if (rightPos) edges.push({ x1: x, y1: y, x2: rightPos.x, y2: rightPos.y });
    return myPos;
  }
  walk(root, 0);
  const width = nodes.reduce((m, n) => Math.max(m, n.x), 0) + R + PAD;
  const height = nodes.reduce((m, n) => Math.max(m, n.y), 0) + R + PAD;
  return { nodes, edges, width, height };
}

const initialTree = [50, 30, 70, 20, 40, 60, 80].reduce<TreeNode | null>(
  (t, v) => insert(t, v),
  null,
);

export default function TreeConcept() {
  const [tree, setTree] = useState<TreeNode | null>(initialTree);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  // Traversal animation state
  const [order, setOrder] = useState<number[]>([]);
  const [step, setStep] = useState(-1);
  const [traversalName, setTraversalName] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { nodes, edges, width, height } = useMemo(() => computeLayout(tree), [tree]);

  const stopAnimation = () => {
    if (timer.current) clearTimeout(timer.current);
    setOrder([]);
    setStep(-1);
    setTraversalName('');
  };

  const addValue = (raw: string) => {
    const v = parseInt(raw, 10);
    if (isNaN(v)) {
      setMessage('Please enter a whole number to insert.');
      return;
    }
    stopAnimation();
    setTree((t) => insert(t, v));
    setMessage(`insert(${v}) — walked down from the root, going left for smaller and right for larger, until an empty spot was found.`);
    setInput('');
  };

  const addRandom = () => {
    const v = Math.floor(Math.random() * 99) + 1;
    addValue(String(v));
  };

  const reset = () => {
    stopAnimation();
    setTree(initialTree);
    setMessage(null);
  };

  const startTraversal = (type: TraversalType, name: string) => {
    if (timer.current) clearTimeout(timer.current);
    const seq = traverse(tree, type);
    setTraversalName(name);
    setOrder(seq);
    setStep(0);
  };

  // Step the traversal highlight forward
  useEffect(() => {
    if (step < 0 || order.length === 0 || step >= order.length) return;
    timer.current = setTimeout(() => setStep((s) => s + 1), 750);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [step, order]);

  // Clean up on unmount
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const activeValue = step >= 0 && step < order.length ? order[step] : null;
  const visited = order.slice(0, Math.min(step + 1, order.length));

  return (
    <ConceptWrapper
      title="Trees"
      description="A tree is a branching structure of connected nodes — like a family tree or a set of nested folders."
    >
      <TableOfContents numbered>
        <Section title="Picture a Family Tree">
          <Typography variant="body2" paragraph>
            A tree organizes data into a <strong>hierarchy</strong>. There&apos;s one node at the very top called the <strong>root</strong>, and every node can branch into <strong>children</strong> below it. It looks just like a <em>family tree</em> drawn upside down, or the way <em>folders</em> nest inside folders on your computer.
          </Typography>

          <ConceptInfoCard>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              Tree Vocabulary
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2">
                <strong>🌳 Root:</strong> the single node at the top with no parent
              </Typography>
              <Typography variant="body2">
                <strong>👶 Child / Parent:</strong> a node directly below / above another
              </Typography>
              <Typography variant="body2">
                <strong>🍃 Leaf:</strong> a node with no children (the tips of the branches)
              </Typography>
              <Typography variant="body2">
                <strong>📏 Depth:</strong> how many steps a node is from the root
              </Typography>
            </Box>
          </ConceptInfoCard>

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              The example below is a <strong>Binary Search Tree</strong>: each node has at most two children, and everything on the <em>left</em> is smaller while everything on the <em>right</em> is larger. That ordering makes searching very fast.
            </Typography>
          </Alert>
        </Section>

        <Section title="Build & Explore a Tree">
          <Typography variant="body2" paragraph>
            Insert numbers and watch where they land — smaller values branch left, larger values branch right. Then run a <strong>traversal</strong> to light up the nodes in the order a program would visit them.
          </Typography>

          <div className="ds-viz">
            <div className="ds-controls">
              <TextField
                label="Number to insert"
                size="small"
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') addValue(input); }}
                sx={{ width: 150 }}
              />
              <Button variant="contained" onClick={() => addValue(input)}>Insert</Button>
              <Button variant="outlined" onClick={addRandom}>Insert random</Button>
              <Button variant="outlined" color="secondary" onClick={reset}>Reset</Button>
            </div>

            <div className="ds-controls" style={{ marginBottom: 8 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>
                Animate traversal:
              </Typography>
              <Button size="small" variant="outlined" onClick={() => startTraversal('in', 'In-order')}>In-order</Button>
              <Button size="small" variant="outlined" onClick={() => startTraversal('pre', 'Pre-order')}>Pre-order</Button>
              <Button size="small" variant="outlined" onClick={() => startTraversal('post', 'Post-order')}>Post-order</Button>
              {order.length > 0 && (
                <Button size="small" variant="text" color="secondary" onClick={stopAnimation}>Clear</Button>
              )}
            </div>

            <div style={{ overflowX: 'auto' }}>
              {nodes.length === 0 ? (
                <Typography variant="body2" sx={{ color: '#94a3b8', fontStyle: 'italic', py: 4 }}>
                  The tree is empty — insert a number to create the root.
                </Typography>
              ) : (
                <svg
                  width={Math.max(width, 320)}
                  height={height}
                  style={{ display: 'block', maxWidth: '100%' }}
                  viewBox={`0 0 ${Math.max(width, 320)} ${height}`}
                >
                  {edges.map((e, i) => (
                    <line
                      key={`e-${i}`}
                      x1={e.x1}
                      y1={e.y1}
                      x2={e.x2}
                      y2={e.y2}
                      stroke="#cbd5e1"
                      strokeWidth={2}
                    />
                  ))}
                  {nodes.map((n) => {
                    const isActive = activeValue === n.value;
                    const wasVisited = visited.includes(n.value) && !isActive;
                    let fill = '#dbeafe';
                    let stroke = '#2563eb';
                    if (isActive) { fill = '#fde68a'; stroke = '#f59e0b'; }
                    else if (wasVisited) { fill = '#bbf7d0'; stroke = '#22c55e'; }
                    return (
                      <g key={`n-${n.value}`}>
                        <circle cx={n.x} cy={n.y} r={R} fill={fill} stroke={stroke} strokeWidth={2} />
                        <text
                          x={n.x}
                          y={n.y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize={14}
                          fontWeight={600}
                          fill="#1e293b"
                        >
                          {n.value}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              )}
            </div>

            {order.length > 0 && (
              <p className="ds-output">
                <strong>{traversalName}:</strong> {visited.join(' → ')}
                {step >= order.length ? ' ✓' : ' …'}
              </p>
            )}
            {message && order.length === 0 && <p className="ds-output">{message}</p>}

            <div className="ds-legend">
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#dbeafe', borderColor: '#2563eb' }} /> Node</span>
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#fde68a', borderColor: '#f59e0b' }} /> Visiting now</span>
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: '#bbf7d0', borderColor: '#22c55e' }} /> Already visited</span>
            </div>
          </div>
        </Section>

        <Section title="Why In-order Gives Sorted Output">
          <Typography variant="body2" paragraph>
            Try the <strong>In-order</strong> traversal on a Binary Search Tree and watch the numbers come out in sorted order. That&apos;s no coincidence: in-order always visits <em>everything smaller</em> (the left side) before a node, then the node, then <em>everything larger</em> (the right side).
          </Typography>

          <ConceptInfoCard>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2">
                <strong>In-order (Left → Node → Right):</strong> visits values in sorted order
              </Typography>
              <Typography variant="body2">
                <strong>Pre-order (Node → Left → Right):</strong> handy for copying or saving a tree
              </Typography>
              <Typography variant="body2">
                <strong>Post-order (Left → Right → Node):</strong> handy for deleting a tree safely from the bottom up
              </Typography>
            </Box>
          </ConceptInfoCard>
        </Section>

        <Section title="Where Trees Show Up">
          <ConceptInfoCard>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2">
                <strong>File systems:</strong> folders containing folders containing files
              </Typography>
              <Typography variant="body2">
                <strong>The HTML DOM:</strong> a web page is a tree of nested elements
              </Typography>
              <Typography variant="body2">
                <strong>Search & databases:</strong> balanced trees keep lookups fast even with millions of records
              </Typography>
              <Typography variant="body2">
                <strong>Decision making:</strong> game AI and flowcharts branch like trees
              </Typography>
            </Box>
          </ConceptInfoCard>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
