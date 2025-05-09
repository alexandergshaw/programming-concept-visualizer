import React, { ReactNode, ReactElement } from 'react';
import Section from './Section';

interface TableOfContentsProps {
    children: ReactNode; // The child components, expected to include Section components
    scrollOffset?: number; // Optional scroll offset in pixels
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ children, scrollOffset = 50 }) => {
    // Recursive function to extract sections, including nested ones
    const extractSections = (nodes: ReactNode): { title: string; id: string; element: ReactElement; children: any[] }[] => {
        return React.Children.toArray(nodes)
            .filter((child): child is ReactElement<{ title: string }> => {
                return React.isValidElement(child) && typeof child.props.title === 'string';
            })
            .map((child) => {
                const id = child.props.title.replace(/\s+/g, '-').toLowerCase(); // Generate an ID from the title
                const nestedSections = extractSections(child.props.children); // Recursively extract nested sections
                return { title: child.props.title, id, element: child, children: nestedSections };
            });
    };

    const sections = extractSections(children);

    // Scroll to the section with an offset
    const handleLinkClick = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault(); // Prevent default anchor behavior
        const targetElement = document.getElementById(id);
        if (targetElement) {
            const offsetPosition = targetElement.offsetTop - scrollOffset; // Adjust for the offset
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth', // Smooth scrolling
            });
        }
    };

    // Recursive function to render the table of contents
    const renderTableOfContents = (sections: any[], level: number = 0) => {
        const listStyleType = level === 0 ? 'decimal' : 'lower-alpha'; // Use numbers for top-level, letters for nested
        return (
            <ol style={{ ...styles.list, listStyleType, marginLeft: `${level * 20}px` }}>
                {sections.map(({ title, id, children }, index) => (
                    <li key={`${title}_${index}`} style={styles.listItem}>
                        <a href={`#${id}`} style={styles.link} onClick={handleLinkClick(id)}>
                            {title}
                        </a>
                        {children.length > 0 && renderTableOfContents(children, level + 1)}
                    </li>
                ))}
            </ol>
        );
    };

    return (
        <Section title="Table of Contents">
            <div style={styles.container}>
                {renderTableOfContents(sections)}
            </div>

            <div style={styles.content}>
                {sections.map(({ id, element }) =>
                    React.cloneElement(element, { id }) // Safely add the ID to the Section
                )}
            </div>
        </Section>
    );
};

const styles = {
    container: {
        padding: '20px',
        marginBottom: '20px',
    },
    list: {
        padding: 0,
        margin: 0,
    },
    listItem: {
        marginBottom: '8px',
    },
    link: {
        textDecoration: 'none',
        color: '#007bff',
        fontSize: '1rem',
        fontWeight: '500',
        transition: 'color 0.3s',
    },
    content: {
        marginTop: '20px',
    },
};

export default TableOfContents;