import React, { ReactNode, ReactElement } from 'react';
import Section from './Section';

interface TableOfContentsProps {
    children: ReactNode;
    scrollOffset?: number;
    numbered?: boolean;
}

interface SectionItem {
    title: string;
    id: string;
    element: ReactElement;
    children: SectionItem[];
}

const extractSections = (nodes: ReactNode): SectionItem[] =>
    React.Children.toArray(nodes)
        .filter(
            (child): child is ReactElement<{ title: string; children?: ReactNode }> =>
                React.isValidElement(child) && typeof (child.props as SectionItem).title === 'string'
        )
        .map((child): SectionItem => ({
            title: child.props.title,
            id: child.props.title.replace(/\s+/g, '-').toLowerCase(),
            element: child,
            children: extractSections(child.props.children),
        }));

const TableOfContents: React.FC<TableOfContentsProps> = ({
    children,
    scrollOffset = 50,
    numbered,
}: TableOfContentsProps): ReactElement => {
    const sections = extractSections(children);

    const handleLinkClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({ top: el.offsetTop - scrollOffset, behavior: 'smooth' });
        }
    };

    const getListStyleType = (level: number): string => {
        if (!numbered) return 'none';
        if (level === 0) return 'decimal';
        if (level === 1) return 'lower-alpha';
        // For level 2 and deeper, use roman numerals
        return 'lower-roman';
    };

    const renderToc = (sections: SectionItem[], level = 0): ReactElement => (
        <ol
            style={{
                padding: 0,
                margin: 0,
                listStyleType: getListStyleType(level),
                // Increase left margin for all levels to move ToC further right
                marginLeft: `${40 + level * 24}px`,
            }}
        >
            {sections.map(({ title, id, children }) => (
                <li key={id} style={{ marginBottom: 8 }}>
                    <a
                        href={`#${id}`}
                        style={{ textDecoration: 'none', color: '#007bff' }}
                        onClick={handleLinkClick(id)}
                    >
                        {title}
                    </a>
                    {children.length > 0 && renderToc(children, level + 1)}
                </li>
            ))}
        </ol>
    );

    // --- Render section numbers for headings as well ---
    const renderSectionWithNumber = (
        section: SectionItem,
    ): React.ReactNode => {
        const elementProps = section.element.props as { children?: ReactNode };

        return (
            <div key={section.id} id={section.id}>
                <div>
                    {React.cloneElement(
                        section.element,
                        {},
                        elementProps.children
                    )}
                </div>
            </div>
        );
    };

    return (
        <Section title="Table of Contents" subtitle="Click on a section to jump to it:">
            {renderToc(sections)}
            <div style={{ marginTop: 20 }}>
                {sections.map(section => renderSectionWithNumber(section))}
            </div>
        </Section>
    );
};

export default TableOfContents;