'use client';

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
        <section className="js-content">
          <div className="js-content-inner">
            {props.children}
          </div>
        </section>
      </div>
    </main>
  );
}
