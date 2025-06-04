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

    const renderToc = (sections: SectionItem[], level = 0): ReactElement => (
        <ol
            style={{
                padding: 0,
                margin: 0,
                listStyleType: !numbered ? 'none' : level === 0 ? 'decimal' : 'lower-alpha',
                marginLeft: `${level * 20}px`,
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

    return (
        <Section title="Table of Contents" subtitle="Click on a section to jump to it:">
            {renderToc(sections)}
            <div style={{ marginTop: 20 }}>
                {sections.map(({ id, element }) => React.cloneElement(element, { id }))}
            </div>
        </Section>
    );
};

export default TableOfContents;