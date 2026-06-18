'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageWrapper from '../../common/PageWrapper';
import GenericIntroduction from '../../common/GenericIntroduction';
import ProjectLifecycleConcept from './ProjectLifecycleConcept';
import MethodologiesConcept from './MethodologiesConcept';
import ScrumConcept from './ScrumConcept';
import RouteIcon from '@mui/icons-material/Route';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';

const navItems = [
  {
    label: 'Getting Started',
    value: 'getting-started',
    children: [
      { label: 'Introduction', value: 'introduction' },
      { label: 'Project Lifecycle', value: 'project-lifecycle' },
    ],
  },
  {
    label: 'Ways of Working',
    value: 'ways-of-working',
    children: [
      { label: 'Agile vs Waterfall', value: 'methodologies' },
      { label: 'Scrum & the Board', value: 'scrum' },
    ],
  },
];

export default function ProjectManagementPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  useEffect(() => {
    const conceptFromUrl = searchParams.get('concept');
    if (conceptFromUrl) {
      setSelectedConcept(conceptFromUrl);
    }
  }, [searchParams]);

  const renderContent = (concept: string | null) => {
    if (!concept) return null;

    switch (concept.toLowerCase()) {
      case 'introduction':
        return (
          <GenericIntroduction
            title="Welcome to Project Management"
            paragraphs={[
              "Project management is the practice of planning, organising, and guiding a team's work so that a goal is delivered on time and within budget. In software, it's what keeps a group of developers, designers, and stakeholders moving in the same direction.",
              "In this section you'll learn how a project moves through its lifecycle, how teams choose between approaches like Agile and Waterfall, and how the Scrum framework uses a board to make work visible.",
            ]}
            steps={[
              { icon: <RouteIcon sx={{ fontSize: 48, color: 'var(--info)' }} />, label: 'Project Lifecycle' },
              { icon: <CompareArrowsIcon sx={{ fontSize: 48, color: 'var(--success)' }} />, label: 'Agile vs Waterfall' },
              { icon: <ViewKanbanIcon sx={{ fontSize: 48, color: 'var(--feature)' }} />, label: 'Scrum & the Board' },
            ]}
            closing="Understanding these ideas will help you see how real software gets built, one organised step at a time. Let's get started!"
          />
        );
      case 'project-lifecycle':
        return <ProjectLifecycleConcept />;
      case 'methodologies':
        return <MethodologiesConcept />;
      case 'scrum':
        return <ScrumConcept />;
      default:
        return null;
    }
  };

  const handleSelect = (value: string) => {
    router.push(`/skills/project-management?concept=${value}`);
    setSelectedConcept(value);
  };

  return (
    <PageWrapper
      pageTitle="Project Management"
      navItems={navItems}
      defaultOpen={['getting-started', 'ways-of-working']}
      handleSelect={handleSelect}
      activeValue={selectedConcept || undefined}
    >
      {selectedConcept ? (
        <>
          {renderContent(selectedConcept)}
        </>
      ) : (
        <div className="empty-page-prompt">
          Please select a topic from the sidebar to get started.
        </div>
      )}
    </PageWrapper>
  );
}
