'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageWrapper from '../../common/PageWrapper';
import GenericIntroduction from '../../common/GenericIntroduction';
import WebsiteBasicsConcept from './WebsiteBasicsConcept';
import CMSConcept from './CMSConcept';
import CMSComponentsConcept from './CMSComponentsConcept';
import LanguageIcon from '@mui/icons-material/Language';
import DashboardIcon from '@mui/icons-material/Dashboard';

const navItems = [
  {
    label: 'Getting Started',
    value: 'getting-started',
    children: [
      { label: 'Introduction', value: 'introduction' },
      { label: 'Website Basics', value: 'website-basics' },
    ],
  },
  {
    label: 'Content Management',
    value: 'content-management',
    children: [
      { label: 'What is a CMS?', value: 'cms-components' },
      { label: 'Advantages of a CMS', value: 'cms-intro' },
    ],
  },
];

export default function WebsiteManagementPage() {
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
            title="Welcome to Website Management"
            paragraphs={[
              "Understanding how websites work is fundamental to web development. A website is made up of web pages that are stored on a server and accessed through a browser.",
              "In this section, you'll learn the basic concepts of how web pages, servers, and browsers work together to deliver content on the internet.",
            ]}
            steps={[
              { icon: <LanguageIcon sx={{ fontSize: 48, color: 'var(--info)' }} />, label: 'Website Basics' },
            ]}
            closing="Understanding these basic concepts will give you a solid foundation for web development. Let's explore how websites work!"
          />
        );
      case 'website-basics':
        return <WebsiteBasicsConcept />;
      case 'cms-intro':
        return <CMSConcept />;
      case 'cms-components':
        return <CMSComponentsConcept />;
      default:
        return null;
    }
  };

  const handleSelect = (value: string) => {
    router.push(`/skills/website-management?concept=${value}`);
    setSelectedConcept(value);
  };

  return (
    <PageWrapper
      pageTitle="Website Management"
      navItems={navItems}
      defaultOpen={['getting-started', 'content-management']}
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
