// Flat, searchable index of every concept across every topic.
//
// Built from the shared navItems data (one entry per leaf concept) joined with
// the topic metadata in topics.ts, so the landing-page search can match both a
// topic ("Python") and a concept inside it ("recursion") and link straight to
// the right page. This module is pure data — it imports only the component-free
// navItems and the topic list, so pulling it into the landing bundle costs
// nothing in page-component code.

import type { SidebarItem } from '@/components/common/Sidebar';
import type { TopicCategory } from './topics';
import { topicNodes } from './topics';
import {
  programmingBasicsNavItems,
  pythonNavItems,
  javascriptNavItems,
  reactNavItems,
  sqlNavItems,
  databasesNavItems,
  cybersecurityNavItems,
  softwareTestingNavItems,
  websiteManagementNavItems,
  projectManagementNavItems,
} from '@/components/pageComponents/navItems';

export interface ConceptEntry {
  /** Owning topic id (matches a TopicNode id). */
  topicId: string;
  /** Owning topic display name, e.g. "Python". */
  topicLabel: string;
  /** Owning topic category, for colour + chip filtering. */
  category: TopicCategory;
  /** Concept display name, e.g. "Recursion". */
  label: string;
  /** The `?concept=` value the topic page switches on. */
  value: string;
  /** Ready-to-navigate URL, e.g. "/languages/python?concept=recursion". */
  url: string;
}

const navByTopic: Record<string, SidebarItem[]> = {
  'programming-basics': programmingBasicsNavItems,
  python: pythonNavItems,
  javascript: javascriptNavItems,
  react: reactNavItems,
  sql: sqlNavItems,
  databases: databasesNavItems,
  cybersecurity: cybersecurityNavItems,
  'software-testing': softwareTestingNavItems,
  'website-management': websiteManagementNavItems,
  'project-management': projectManagementNavItems,
};

/** Collect the leaf nodes (actual concept pages) from a nav tree. */
function leaves(nodes: SidebarItem[]): SidebarItem[] {
  return nodes.flatMap((node) =>
    node.children && node.children.length ? leaves(node.children) : node.value ? [node] : [],
  );
}

/** Every concept across every topic, as a flat searchable list. */
export const conceptIndex: ConceptEntry[] = topicNodes.flatMap((topic) =>
  leaves(navByTopic[topic.id] ?? []).map((leaf) => ({
    topicId: topic.id,
    topicLabel: topic.label,
    category: topic.category,
    label: leaf.label,
    value: leaf.value,
    url: `${topic.route}?concept=${encodeURIComponent(leaf.value)}`,
  })),
);

/**
 * Case-insensitive substring search over concept labels (and their topic name,
 * so "python loops" still finds the Python loop concepts). Returns at most
 * `limit` entries, concept-label matches first.
 */
export function searchConcepts(query: string, limit = 8): ConceptEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const labelMatch: ConceptEntry[] = [];
  const topicMatch: ConceptEntry[] = [];
  for (const entry of conceptIndex) {
    if (entry.label.toLowerCase().includes(q)) labelMatch.push(entry);
    else if (`${entry.topicLabel} ${entry.label}`.toLowerCase().includes(q)) topicMatch.push(entry);
  }
  return [...labelMatch, ...topicMatch].slice(0, limit);
}
