'use client';

import { useRouter } from 'next/navigation';
import { Box, Typography, Container, InputBase, IconButton, Chip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJs, faPython, faReact } from '@fortawesome/free-brands-svg-icons';
import {
  faGraduationCap,
  faBug,
  faDatabase,
  faShieldHalved,
  faSitemap,
  faClipboardList,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import CodeIcon from '@mui/icons-material/Code';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useEffect, useRef } from 'react';
import Loader from '@/components/common/Loader';
import SettingsMenu from '@/components/common/SettingsMenu';
import {
  topicNodes,
  tokenForCategory,
  categoryOrder,
  categoryLabel,
} from '@/components/landing/topics';
import type { TopicCategory, TopicNode } from '@/components/landing/topics';
import { searchConcepts } from '@/components/landing/conceptIndex';

// Each topic's icon, keyed by the topic id from the shared data module.
const iconById: Record<string, IconDefinition> = {
  'programming-basics': faGraduationCap,
  python: faPython,
  javascript: faJs,
  react: faReact,
  sql: faDatabase,
  databases: faDatabase,
  cybersecurity: faShieldHalved,
  'software-testing': faBug,
  'website-management': faSitemap,
  'project-management': faClipboardList,
};

type Filter = TopicCategory | 'all';

// Wrap the first case-insensitive match of `q` in `text` so search hits stand out.
function highlight(text: string, q: string): React.ReactNode {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <Box component="mark" sx={{ bgcolor: 'var(--accent-bg)', color: 'inherit', px: '2px', borderRadius: '3px' }}>
        {text.slice(i, i + q.length)}
      </Box>
      {text.slice(i + q.length)}
    </>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // ⌘K / Ctrl-K focuses search; Esc clears it while focused.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === 'Escape' && document.activeElement === searchRef.current) {
        setQuery('');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (route: string) => router.push(route);

  if (loading) {
    return <Loader />;
  }

  const q = query.trim().toLowerCase();
  const inFilter = (cat: TopicCategory) => filter === 'all' || cat === filter;

  const visibleTopics = topicNodes.filter(
    (t) =>
      inFilter(t.category) &&
      (!q || t.label.toLowerCase().includes(q) || t.type.toLowerCase().includes(q)),
  );
  const conceptResults = q ? searchConcepts(query).filter((c) => inFilter(c.category)) : [];

  const renderTile = (node: TopicNode) => {
    const tileColor = `var(${tokenForCategory[node.category]})`;
    return (
      <Box
        key={node.id}
        role="button"
        tabIndex={0}
        onClick={() => go(node.route)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            go(node.route);
          }
        }}
        sx={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 1.2,
          p: 1.2,
          borderRadius: 2,
          border: '1px solid var(--line)',
          background: 'var(--paper-raised)',
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease',
          outline: 'none',
          '&:hover, &:focus-visible': {
            borderColor: tileColor,
            boxShadow: `0 0 0 1px ${tileColor}, 0 6px 16px -6px ${tileColor}`,
            transform: 'translateY(-1px)',
          },
        }}
      >
        <Box sx={{ color: tileColor, fontSize: 20, width: 24, flexShrink: 0, textAlign: 'center' }}>
          <FontAwesomeIcon icon={iconById[node.id]} />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontWeight: 600,
              color: 'var(--ink)',
              fontSize: '0.9rem',
              lineHeight: 1.15,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {q ? highlight(node.label, q) : node.label}
          </Typography>
          <Typography sx={{ color: 'var(--ink-soft)', fontSize: '0.72rem', lineHeight: 1.2 }}>
            {node.type}
          </Typography>
        </Box>
      </Box>
    );
  };

  const tileGridSx = {
    display: 'grid',
    gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
    gap: 1.5,
  } as const;

  const SectionHeader = ({ label, count, dot }: { label: string; count: number; dot?: string }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 3, mb: 1 }}>
      {dot && <Box sx={{ width: 9, height: 9, borderRadius: '50%', background: dot, flexShrink: 0 }} />}
      <Typography sx={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: '0.72rem', color: 'var(--ink-faint)' }}>{count}</Typography>
      <Box sx={{ flex: 1, height: '1px', background: 'var(--line)' }} />
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', background: 'var(--paper)' }}>
      {/* Floating settings gear (no header bar on the landing page). */}
      <Box sx={{ position: 'fixed', top: 12, right: 12, zIndex: 1200 }}>
        <SettingsMenu color="var(--ink)" />
      </Box>

      <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
        {/* Hero */}
        <Box sx={{ mb: 3 }}>
          <CodeIcon sx={{ fontSize: 34, color: 'var(--accent-strong)', mb: 1 }} />
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              color: 'var(--ink)',
              mb: 1,
              fontSize: { xs: '2rem', md: '2.6rem' },
              lineHeight: 1.1,
            }}
          >
            Concept{' '}
            <Box component="span" sx={{ color: 'var(--accent-strong)' }}>
              Visuals
            </Box>
          </Typography>
          <Typography variant="h6" sx={{ color: 'var(--ink-soft)', fontWeight: 400, fontSize: '1.05rem' }}>
            Learn programming concepts with visual examples and interactive tutorials
          </Typography>
        </Box>

        {/* Search */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1.5,
            height: 46,
            borderRadius: 2,
            border: '1px solid var(--line-strong)',
            background: 'var(--paper-raised)',
            transition: 'border-color 0.15s ease',
            '&:focus-within': { borderColor: 'var(--accent)' },
          }}
        >
          <SearchIcon sx={{ color: 'var(--ink-faint)', fontSize: 20 }} />
          <InputBase
            inputRef={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics and concepts…"
            inputProps={{ 'aria-label': 'Search topics and concepts' }}
            sx={{ flex: 1, color: 'var(--ink)', fontSize: '0.95rem' }}
          />
          {query ? (
            <IconButton size="small" aria-label="Clear search" onClick={() => setQuery('')}>
              <CloseIcon sx={{ fontSize: 18, color: 'var(--ink-soft)' }} />
            </IconButton>
          ) : (
            <Box
              component="kbd"
              sx={{
                fontSize: '0.72rem',
                color: 'var(--ink-faint)',
                border: '1px solid var(--line)',
                borderRadius: '5px',
                px: 0.6,
                py: 0.1,
                fontFamily: 'inherit',
              }}
            >
              ⌘K
            </Box>
          )}
        </Box>

        {/* Category filter chips */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.5 }}>
          <Chip
            label="All topics"
            size="small"
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'filled' : 'outlined'}
            color={filter === 'all' ? 'primary' : 'default'}
          />
          {categoryOrder.map((cat) => (
            <Chip
              key={cat}
              label={categoryLabel[cat]}
              size="small"
              onClick={() => setFilter(cat)}
              variant={filter === cat ? 'filled' : 'outlined'}
              color={filter === cat ? 'primary' : 'default'}
              icon={
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: `var(${tokenForCategory[cat]})`,
                    ml: 1,
                  }}
                />
              }
            />
          ))}
        </Box>

        {/* Results */}
        {q ? (
          <>
            {visibleTopics.length > 0 && (
              <Box>
                <SectionHeader label="Topics" count={visibleTopics.length} />
                <Box sx={tileGridSx}>{visibleTopics.map(renderTile)}</Box>
              </Box>
            )}
            {conceptResults.length > 0 && (
              <Box>
                <SectionHeader label="Concepts" count={conceptResults.length} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {conceptResults.map((c) => (
                    <Box
                      key={`${c.topicId}-${c.value}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => go(c.url)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          go(c.url);
                        }
                      }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.2,
                        p: 1.2,
                        borderRadius: 1.5,
                        border: '1px solid var(--line)',
                        background: 'var(--paper-raised)',
                        cursor: 'pointer',
                        outline: 'none',
                        '&:hover, &:focus-visible': {
                          borderColor: 'var(--line-strong)',
                          background: 'var(--paper-sunken)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: `var(${tokenForCategory[c.category]})`,
                          flexShrink: 0,
                        }}
                      />
                      <Typography sx={{ color: 'var(--ink)', fontSize: '0.9rem', fontWeight: 500 }}>
                        {highlight(c.label, q)}
                      </Typography>
                      <Typography sx={{ ml: 'auto', color: 'var(--ink-soft)', fontSize: '0.78rem' }}>
                        in {c.topicLabel}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
            {visibleTopics.length === 0 && conceptResults.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 6, color: 'var(--ink-soft)' }}>
                <Typography sx={{ fontSize: '0.95rem' }}>
                  No topics or concepts match “{query}”.
                </Typography>
              </Box>
            )}
          </>
        ) : (
          categoryOrder.map((cat) => {
            const items = visibleTopics.filter((t) => t.category === cat);
            if (!items.length) return null;
            return (
              <Box key={cat}>
                <SectionHeader
                  label={categoryLabel[cat]}
                  count={items.length}
                  dot={`var(${tokenForCategory[cat]})`}
                />
                <Box sx={tileGridSx}>{items.map(renderTile)}</Box>
              </Box>
            );
          })
        )}

        {/* Footer */}
        <Box sx={{ mt: 5, pt: 3, borderTop: '1px solid var(--line)' }}>
          <Typography variant="body2" sx={{ color: 'var(--ink-soft)', textAlign: 'center', fontSize: '0.9rem' }}>
            Maintained by Alex Shaw
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
