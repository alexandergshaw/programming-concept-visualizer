import { conceptIndex, searchConcepts } from '@/components/landing/conceptIndex';
import { topicNodes } from '@/components/landing/topics';

describe('concept search index', () => {
  it('contains many concepts spanning every topic', () => {
    expect(conceptIndex.length).toBeGreaterThan(50);
    const covered = new Set(conceptIndex.map((c) => c.topicId));
    topicNodes.forEach((t) => {
      expect(covered.has(t.id)).toBe(true);
    });
  });

  it('builds navigable urls in the topic-route + ?concept= shape', () => {
    conceptIndex.forEach((c) => {
      expect(c.url).toMatch(/^\/(languages|skills)\/[a-z-]+\?concept=.+/);
      expect(c.label.length).toBeGreaterThan(0);
    });
  });

  it('finds a concept inside a topic and links straight to it', () => {
    const hits = searchConcepts('recursion');
    const python = hits.find((c) => c.topicId === 'python' && c.value === 'recursion');
    expect(python).toBeDefined();
    expect(python?.url).toBe('/languages/python?concept=recursion');
  });

  it('indexes the newly added turtle concepts', () => {
    const turtle = searchConcepts('turtle');
    expect(turtle.some((c) => c.topicId === 'python' && c.value === 'turtle-intro')).toBe(true);
  });

  it('indexes the new agile methodologies concepts for project management', () => {
    const hits = searchConcepts('agile');
    expect(
      hits.some(
        (c) => c.topicId === 'project-management' && c.value === 'history-of-agile-development',
      ),
    ).toBe(true);

    const scrumMaster = searchConcepts('scrum master responsibilities');
    expect(
      scrumMaster.some(
        (c) => c.topicId === 'project-management' && c.url === '/skills/project-management?concept=scrum-master-responsibilities',
      ),
    ).toBe(true);

    const kanban = searchConcepts('limiting work in progress');
    expect(
      kanban.some(
        (c) => c.topicId === 'project-management' && c.value === 'limiting-work-in-progress',
      ),
    ).toBe(true);
  });

  it('returns nothing for an empty query', () => {
    expect(searchConcepts('')).toEqual([]);
    expect(searchConcepts('   ')).toEqual([]);
  });
});
