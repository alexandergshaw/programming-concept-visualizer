import React, { ReactNode, ReactElement } from 'react';
import Section from './Section';

interface TableOfContentsProps {
    children: ReactNode; // The child components, expected to include Section components
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ children }) => {
    // Extract titles and generate IDs for Section children
    const sections = React.Children.toArray(children)
        .filter((child): child is ReactElement<{ title: string }> => {
            return React.isValidElement(child) && typeof child.props.title === 'string';
        })
        .map((child) => {
            const id = child.props.title.replace(/\s+/g, '-').toLowerCase(); // Generate an ID from the title
            return { title: child.props.title, id, element: child };
        });

    return (
        <Section title="Table of Contents">
            <div style={styles.container}>
                <ol style={styles.list} type="1">
                    {sections.map(({ title, id }, index) => (
                        <li key={`${title}_${index}`} style={styles.listItem}>
                            <a href={`#${id}`} style={styles.link}>
                                {index + 1}. {title}
                            </a>
                        </li>
                    ))}
                </ol>
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
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        marginBottom: '20px',
    },
    heading: {
        fontSize: '1.5rem',
        marginBottom: '10px',
        color: '#333',
        fontWeight: 'bold',
    },
    list: {
        listStyleType: 'none',
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