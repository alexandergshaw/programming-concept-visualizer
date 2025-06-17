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
    activeValue?: string
}

export default function PageWrapper(props: PageWrapperProps) {
  return (
    <main className="js-layout">
      <Sidebar title={props.pageTitle} items={props.navItems} defaultOpen={props.defaultOpen} onSelect={props.handleSelect} activeValue={props.activeValue} />
      <div className="js-page-body">
        <Alert
          severity="info"
          className="feedback-banner"
          sx={{
            position: 'fixed', // Make it fixed
            top: 0, // Stick to the top of the viewport
            left: '250px', // Offset to account for the sidebar
            width: 'calc(100% - 250px)', // Adjust width to fit the remaining space
            zIndex: 1100, // Ensure it stays above other content
            mb: 3,
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
          <div style={{ marginTop: '100px' }}>
            {props.children}
          </div>
        </section>
      </div>

    </main>
  );
}
