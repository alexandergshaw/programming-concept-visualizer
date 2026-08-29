'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageWrapper from '../../common/PageWrapper';
import GenericIntroduction from '../../common/GenericIntroduction';
import CommittingConcept from './CommittingConcept';
import BranchingConcept from './BranchingConcept';
import PushingConcept from './PushingConcept';
import SaveIcon from '@mui/icons-material/Save';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { versionControlNavItems as navItems } from '../navItems';

export default function VersionControlPage() {
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
            title="Welcome to Version Control"
            paragraphs={[
              "Version control is a system that tracks changes to your code over time. It lets you save snapshots of your work, explore different ideas in parallel branches, and collaborate safely with teammates by managing who changes what.",
              "In this section you'll learn how to commit changes, create branches to work on features in isolation, and push your work to a remote repository like GitHub.",
            ]}
            steps={[
              { icon: <SaveIcon sx={{ fontSize: 48, color: 'var(--info)' }} />, label: 'Committing Changes' },
              { icon: <CallSplitIcon sx={{ fontSize: 48, color: 'var(--success)' }} />, label: 'Branching' },
              { icon: <CloudUploadIcon sx={{ fontSize: 48, color: 'var(--feature)' }} />, label: 'Pushing to Remote' },
            ]}
            closing="Understanding these core Git concepts will help you work confidently on any software project. Let's get started!"
          />
        );
      case 'committing':
        return <CommittingConcept />;
      case 'branching':
        return <BranchingConcept />;
      case 'pushing':
        return <PushingConcept />;
      default:
        return null;
    }
  };

  const handleSelect = (value: string) => {
    router.push(`/skills/version-control?concept=${value}`);
    setSelectedConcept(value);
  };

  return (
    <PageWrapper
      pageTitle="Version Control"
      navItems={navItems}
      defaultOpen={['getting-started', 'core-git-workflow']}
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
