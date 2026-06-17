'use client';

import { Alert } from '@mui/material';
import Link from 'next/link';
import Sidebar, { SidebarItem } from './Sidebar';

export interface PageWrapperProps {
    pageTitle: string,
    children: React.ReactNode,
    navItems: SidebarItem[],
    defaultOpen: string[],
    handleSelect: (value: string) => void,
    activeValue?: string,
    headerImage?: string
}

export default function PageWrapper(props: PageWrapperProps) {
  return (
    <main className="js-layout">
      <Sidebar title={props.pageTitle} items={props.navItems} defaultOpen={props.defaultOpen} onSelect={props.handleSelect} activeValue={props.activeValue} headerImage={props.headerImage} />
      <div className="js-page-body">
        <Alert
          severity="info"
          className="feedback-banner"
          sx={{
            // On desktop: fixed, offset to clear the 250px sidebar.
            // On mobile: in normal flow, full width, with room for the menu button.
            position: { xs: 'static', md: 'fixed' },
            top: { md: 0 },
            left: { md: '250px' },
            width: { xs: '100%', md: 'calc(100% - 250px)' },
            pl: { xs: '56px', md: 2 },
            zIndex: 1100,
            mb: { xs: 2, md: 3 },
          }}
        >
          Have ideas to improve this page?{' '}
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSf73dDuwy0mZUuApiG2kEGlcCp93pN-l1eOtFOTBA2BTf0Bqw/viewform?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="slide-underline-link"
          >
            Submit feedback here.
          </Link>
        </Alert>
        <section className="js-content">
          <div className="js-content-inner">
            {props.children}
          </div>
        </section>
      </div>

    </main>
  );
}
