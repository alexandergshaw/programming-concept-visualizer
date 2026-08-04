'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageWrapper from '../../common/PageWrapper';
import GenericIntroduction from '../../common/GenericIntroduction';
import ProjectLifecycleConcept from './ProjectLifecycleConcept';
import MethodologiesConcept from './MethodologiesConcept';
import ScrumConcept from './ScrumConcept';
import KanbanConcept from './KanbanConcept';
import EstimationConcept from './EstimationConcept';
import RiskManagementConcept from './RiskManagementConcept';
import StakeholdersConcept from './StakeholdersConcept';
import ProjectsVsOperationsConcept from './ProjectsVsOperationsConcept';
import ProjectManagerRoleConcept from './ProjectManagerRoleConcept';
import OrgStructuresConcept from './OrgStructuresConcept';
import KeyStakeholdersConcept from './KeyStakeholdersConcept';
import ProjectConstraintsConcept from './ProjectConstraintsConcept';
import StrategicPlanningConcept from './StrategicPlanningConcept';
import AligningProjectsConcept from './AligningProjectsConcept';
import ScreeningModelsConcept from './ScreeningModelsConcept';
import QualitativeCriteriaConcept from './QualitativeCriteriaConcept';
import FinancialModelsConcept from './FinancialModelsConcept';
import FunctionalOrgConcept from './FunctionalOrgConcept';
import ProjectizedOrgConcept from './ProjectizedOrgConcept';
import MatrixOrgConcept from './MatrixOrgConcept';
import OrgStructureImpactsConcept from './OrgStructureImpactsConcept';
import PMAuthorityLevelsConcept from './PMAuthorityLevelsConcept';
import DefiningProjectScopeConcept from './DefiningProjectScopeConcept';
import IdentifyingStakeholdersConcept from './IdentifyingStakeholdersConcept';
import SettingObjectivesConcept from './SettingObjectivesConcept';
import SMARTGoalsConcept from './SMARTGoalsConcept';
import ProjectDeliverablesConcept from './ProjectDeliverablesConcept';
import RouteIcon from '@mui/icons-material/Route';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import { projectManagementNavItems as navItems } from '../navItems';

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
      case 'kanban':
        return <KanbanConcept />;
      case 'estimation':
        return <EstimationConcept />;
      case 'risk-management':
        return <RiskManagementConcept />;
      case 'stakeholders':
        return <StakeholdersConcept />;
      // Week 1
      case 'projects-vs-operations':
        return <ProjectsVsOperationsConcept />;
      case 'project-manager-role':
        return <ProjectManagerRoleConcept />;
      case 'org-structures':
        return <OrgStructuresConcept />;
      case 'key-stakeholders':
        return <KeyStakeholdersConcept />;
      case 'project-constraints':
        return <ProjectConstraintsConcept />;
      // Week 2
      case 'strategic-planning':
        return <StrategicPlanningConcept />;
      case 'aligning-projects':
        return <AligningProjectsConcept />;
      case 'screening-models':
        return <ScreeningModelsConcept />;
      case 'qualitative-criteria':
        return <QualitativeCriteriaConcept />;
      case 'financial-models':
        return <FinancialModelsConcept />;
      // Week 3
      case 'functional-org':
        return <FunctionalOrgConcept />;
      case 'projectized-org':
        return <ProjectizedOrgConcept />;
      case 'matrix-org':
        return <MatrixOrgConcept />;
      case 'org-structure-impacts':
        return <OrgStructureImpactsConcept />;
      case 'pm-authority-levels':
        return <PMAuthorityLevelsConcept />;
      // Week 4
      case 'defining-scope':
        return <DefiningProjectScopeConcept />;
      case 'identifying-stakeholders':
        return <IdentifyingStakeholdersConcept />;
      case 'setting-objectives':
        return <SettingObjectivesConcept />;
      case 'smart-goals':
        return <SMARTGoalsConcept />;
      case 'project-deliverables':
        return <ProjectDeliverablesConcept />;
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
      defaultOpen={['getting-started', 'week1-intro', 'week2-strategy', 'week3-org-structures', 'week4-scope', 'ways-of-working', 'delivering-the-work']}
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

