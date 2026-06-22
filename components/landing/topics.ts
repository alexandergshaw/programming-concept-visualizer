// Single source of truth for the landing-page concept web.
//
// Both the tile grid and the 3D force-graph read from these arrays, so a topic
// only has to be described once: its label, where it routes, and which other
// topics it relates to. Keep this file pure data (no JSX) so it stays easy to
// import from components and tests alike.

export type TopicCategory =
  | 'foundation'
  | 'language'
  | 'data'
  | 'web'
  | 'security'
  | 'process';

export interface TopicNode {
  /** Stable id, also used as the graph node id and the React key. */
  id: string;
  /** Display name shown on the tile and as the node label. */
  label: string;
  /** Short descriptor shown under the label on the tile. */
  type: string;
  /** Where clicking the tile or node navigates. */
  route: string;
  /** Drives the node/tile colour so related topics read as a cluster. */
  category: TopicCategory;
}

export interface TopicLink {
  source: string;
  target: string;
}

export const topicNodes: TopicNode[] = [
  { id: 'programming-basics', label: 'Programming Basics', type: 'Fundamentals', route: '/skills/programming-basics', category: 'foundation' },
  { id: 'python', label: 'Python', type: 'Programming Language', route: '/languages/python', category: 'language' },
  { id: 'javascript', label: 'JavaScript', type: 'Programming Language', route: '/languages/javascript', category: 'language' },
  { id: 'react', label: 'React', type: 'Library', route: '/languages/react', category: 'web' },
  { id: 'sql', label: 'SQL', type: 'Query Language', route: '/languages/sql', category: 'data' },
  { id: 'databases', label: 'Databases', type: 'Topic', route: '/skills/databases', category: 'data' },
  { id: 'cybersecurity', label: 'Cybersecurity', type: 'Topic', route: '/skills/cybersecurity', category: 'security' },
  { id: 'software-testing', label: 'Software Testing', type: 'Topic', route: '/skills/software-testing', category: 'process' },
  { id: 'website-management', label: 'Website Management', type: 'Topic', route: '/skills/website-management', category: 'web' },
  { id: 'project-management', label: 'Project Management', type: 'Topic', route: '/skills/project-management', category: 'process' },
];

export const topicLinks: TopicLink[] = [
  { source: 'programming-basics', target: 'python' },
  { source: 'programming-basics', target: 'javascript' },
  { source: 'programming-basics', target: 'software-testing' },
  { source: 'python', target: 'javascript' },
  { source: 'python', target: 'databases' },
  { source: 'javascript', target: 'react' },
  { source: 'javascript', target: 'databases' },
  { source: 'javascript', target: 'software-testing' },
  { source: 'react', target: 'website-management' },
  { source: 'website-management', target: 'cybersecurity' },
  { source: 'databases', target: 'sql' },
  { source: 'databases', target: 'cybersecurity' },
  { source: 'project-management', target: 'website-management' },
  { source: 'project-management', target: 'software-testing' },
  { source: 'project-management', target: 'python' },
];

/**
 * Each category maps to a theme token (without the `var(--…)` wrapper) so the
 * web follows the active theme. Used both as `var(--<token>)` in CSS for tiles
 * and resolved to a hex value for the WebGL graph.
 */
export const tokenForCategory: Record<TopicCategory, string> = {
  foundation: '--success',
  language: '--info',
  data: '--feature',
  web: '--accent-strong',
  security: '--danger',
  process: '--warning',
};

/** Order the categorised tile sections appear in on the landing page. */
export const categoryOrder: TopicCategory[] = [
  'foundation',
  'language',
  'data',
  'web',
  'security',
  'process',
];

/** Human-readable heading shown for each category section and filter chip. */
export const categoryLabel: Record<TopicCategory, string> = {
  foundation: 'Foundations',
  language: 'Languages',
  data: 'Data',
  web: 'Web',
  security: 'Security',
  process: 'Process',
};

/** Adjacency map (id → set of directly-connected ids), built from topicLinks. */
export function buildAdjacency(): Record<string, Set<string>> {
  const adj: Record<string, Set<string>> = {};
  topicNodes.forEach((n) => {
    adj[n.id] = new Set<string>();
  });
  topicLinks.forEach((l) => {
    adj[l.source]?.add(l.target);
    adj[l.target]?.add(l.source);
  });
  return adj;
}
