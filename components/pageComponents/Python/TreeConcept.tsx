'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import Box from '@mui/material/Box';
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
    setMessage(`insert(${v}) — starting at the root, the value goes left when smaller and right when larger until it finds an empty spot.`);
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
      description="A tree is a branching structure of connected nodes, similar to a family tree or a set of nested folders."
    >
      <TableOfContents numbered>
        {/* 1 ----------------------------------------------------------------- */}
        <Section title="The Big Idea">
          <Typography variant="body2" paragraph>
            A tree organizes data into a <strong>hierarchy</strong>. A single node at the top, called the <strong>root</strong>, branches into <strong>children</strong> below it, and each child can branch further. The shape mirrors a family tree drawn upside down, or the way folders nest inside folders on a computer.
          </Typography>

          <CalloutBox title="Tree vocabulary" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Root:</strong> the single node at the top, with no parent.</Typography>
              <Typography variant="body2"><strong>Child / Parent:</strong> a node directly below / above another.</Typography>
              <Typography variant="body2"><strong>Leaf:</strong> a node with no children (the tips of the branches).</Typography>
              <Typography variant="body2"><strong>Depth:</strong> the number of steps from the root to a node.</Typography>
            </Box>
          </CalloutBox>

          <CalloutBox title="This example is a Binary Search Tree" type="key-concepts">
            <Typography variant="body2">
              Each node has at most two children, and everything in the <em>left</em> branch is smaller while everything in the <em>right</em> branch is larger. This ordering is what makes searching a tree fast.
            </Typography>
          </CalloutBox>
        </Section>

        {/* 2 ----------------------------------------------------------------- */}
        <Section title="Build and Explore a Tree">
          <Typography variant="body2" paragraph>
            Insert numbers and observe where each one lands — smaller values branch left, larger values branch right. Then run a <strong>traversal</strong> to highlight the nodes in the order a program would visit them.
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
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--ink-soft)' }}>
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
                <Typography variant="body2" sx={{ color: 'var(--ink-faint)', fontStyle: 'italic', py: 4 }}>
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
                    <line key={`e-${i}`} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="var(--line-strong)" strokeWidth={2} />
                  ))}
                  {nodes.map((n) => {
                    const isActive = activeValue === n.value;
                    const wasVisited = visited.includes(n.value) && !isActive;
                    let fill = 'var(--info-bg)';
                    let stroke = 'var(--info)';
                    if (isActive) { fill = 'var(--warning-bg)'; stroke = 'var(--warning)'; }
                    else if (wasVisited) { fill = 'var(--success-bg)'; stroke = 'var(--success)'; }
                    return (
                      <g key={`n-${n.value}`}>
                        <circle cx={n.x} cy={n.y} r={R} fill={fill} stroke={stroke} strokeWidth={2} />
                        <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight={600} fill="var(--ink)">
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
                {step >= order.length ? ' (complete)' : ' …'}
              </p>
            )}
            {message && order.length === 0 && <p className="ds-output">{message}</p>}

            <div className="ds-legend">
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: 'var(--info-bg)', borderColor: 'var(--info)' }} /> Node</span>
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: 'var(--warning-bg)', borderColor: 'var(--warning)' }} /> Visiting now</span>
              <span className="ds-legend-item"><span className="ds-swatch" style={{ background: 'var(--success-bg)', borderColor: 'var(--success)' }} /> Already visited</span>
            </div>
          </div>
        </Section>

        {/* 3 ----------------------------------------------------------------- */}
        <Section title="Why In-order Produces Sorted Output">
          <Typography variant="body2" paragraph>
            Run the <strong>in-order</strong> traversal on the Binary Search Tree and the numbers emerge in sorted order. This is not a coincidence: in-order always visits everything smaller (the left branch) before a node, then the node, then everything larger (the right branch).
          </Typography>

          <CalloutBox title="The three traversal orders" type="key-concepts">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>In-order (Left, Node, Right):</strong> visits values in sorted order.</Typography>
              <Typography variant="body2"><strong>Pre-order (Node, Left, Right):</strong> useful for copying or saving a tree.</Typography>
              <Typography variant="body2"><strong>Post-order (Left, Right, Node):</strong> useful for deleting a tree safely from the bottom up.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        {/* 4 ----------------------------------------------------------------- */}
        <Section title="Where Trees Are Used">
          <CalloutBox title="Common applications" type="key-concepts">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>File systems:</strong> folders containing folders containing files.</Typography>
              <Typography variant="body2"><strong>The HTML DOM:</strong> a web page is a tree of nested elements.</Typography>
              <Typography variant="body2"><strong>Search and databases:</strong> balanced trees keep lookups fast even with millions of records.</Typography>
              <Typography variant="body2"><strong>Decision making:</strong> game AI and flowcharts branch like trees.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        {/* 5 ----------------------------------------------------------------- */}
        <Section title="Key Takeaways">
          <CalloutBox title="Summary" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>A tree is a hierarchy</strong> of nodes branching from a single root.</Typography>
              <Typography variant="body2"><strong>A Binary Search Tree</strong> keeps smaller values left and larger values right, making lookups fast.</Typography>
              <Typography variant="body2"><strong>Traversals</strong> visit nodes in a defined order; in-order yields sorted output.</Typography>
            </Box>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
