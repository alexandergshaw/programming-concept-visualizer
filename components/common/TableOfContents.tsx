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

    // Helper for roman numerals
    const toRoman = (num: number): string => {
        const romans = [
            ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400],
            ['C', 100], ['XC', 90], ['L', 50], ['XL', 40],
            ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]
        ];
        let result = '';
        for (const [letter, n] of romans) {
            while (num >= n) {
                result += letter;
                num -= n;
            }
        }
        return result.toLowerCase();
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
        level: number,
        prefix: string[] = []
    ): React.ReactNode => {

        return (
            <div key={section.id} id={section.id}>
                <div>
                    {React.cloneElement(
                        section.element,
                        {},
                        section.element.props.children
                    )}
                </div>
                {section.children.length > 0 &&
                    section.children.map((child, childIdx) =>
                        renderSectionWithNumber(
                            child,
                            level + 1,
                            [
                                ...prefix,
                                (level === 0)
                                    ? (childIdx + 1).toString()
                                    : (level === 1)
                                    ? childIdx.toString()
                                    : (childIdx + 1).toString(),
                            ]
                        )
                    )}
            </div>
        );
    };

    return (
        <Section title="Table of Contents" subtitle="Click on a section to jump to it:">
            {renderToc(sections)}
            <div style={{ marginTop: 20 }}>
                {sections.map((section, idx) =>
                    renderSectionWithNumber(section, 0, [(idx + 1).toString()])
                )}
            </div>
        </Section>
    );
};

export default TableOfContents;