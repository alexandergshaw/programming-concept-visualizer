'use client';

import React, { useState } from 'react';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';

export type CodePart = {
    label: string;
    part: string;
    color: string;
    desc: string;
};

function escapeHtml(str: string) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

export default function CodePartsExplanation({
    code,
    parts,
    style = {},
}: {
    code: string;
    parts: CodePart[];
    style?: React.CSSProperties;
}) {
    const [hovered, setHovered] = useState<string | null>(null);

    // Highlight each part in the code sample, adding a data-label for hover sync
    let highlightedCode = code;
    parts.forEach(part => {
        // Escape for regex, but NOT for the replacement HTML
        const escapedPartForRegex = part.part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        highlightedCode = highlightedCode.replace(
            new RegExp(escapedPartForRegex, 'g'),
            `<span style="background:${part.color}33;border-radius:4px;padding:1px 2px;transition:outline 0.18s cubic-bezier(.4,2,.6,1),background 0.18s cubic-bezier(.4,2,.6,1);${hovered === part.label ? `outline:2px solid ${part.color};background:${part.color}44;` : ''}" data-label="${part.label}">${escapeHtml(part.part)}</span>`
        );
    });
    // Escape the rest of the code (outside of spans)
    highlightedCode = escapeHtml(highlightedCode)
        .replace(/&lt;span /g, '<span ')
        .replace(/&lt;\/span&gt;/g, '</span>')
        .replace(/&gt;/g, '>');

    // Handler for mouse events on code (event delegation)
    const handleCodeMouseOver = (e: React.MouseEvent<HTMLPreElement>) => {
        const target = e.target as HTMLElement;
        if (target && target.dataset && target.dataset.label) {
            setHovered(target.dataset.label);
        }
    };
    const handleCodeMouseOut = () => {
        setHovered(null);
    };

    return (
        <ConceptInfoCard style={style}>
            <pre
                style={{
                    fontFamily: 'monospace',
                    fontSize: 15,
                    marginBottom: 10,
                    background: '#fff',
                    borderRadius: 6,
                    padding: '8px 10px',
                    lineHeight: 1.7,
                    overflowX: 'auto',
                    border: '1px solid #e0e0e0',
                    display: 'block'
                }}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
                onMouseOver={handleCodeMouseOver}
                onMouseOut={handleCodeMouseOut}
            />
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 15 }}>
                {parts.map(part => (
                    <li
                        key={part.label}
                        style={{
                            marginBottom: 4,
                            background: hovered === part.label ? part.color + '22' : undefined,
                            borderRadius: 4,
                            cursor: 'pointer',
                            transition: 'background 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s cubic-bezier(.4,2,.6,1)',
                            boxShadow: hovered === part.label
                                ? `0 2px 8px 0 ${part.color}22`
                                : undefined,
                        }}
                        onMouseOver={() => setHovered(part.label)}
                        onMouseOut={() => setHovered(null)}
                    >
                        <span style={{
                            display: 'inline-block',
                            width: 14,
                            height: 14,
                            background: part.color + '33',
                            borderRadius: 3,
                            marginRight: 8,
                            verticalAlign: 'middle',
                            transition: 'background 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s cubic-bezier(.4,2,.6,1)',
                            boxShadow: hovered === part.label
                                ? `0 1px 4px 0 ${part.color}44`
                                : undefined,
                        }} />
                        <b>{part.label}:</b> <span dangerouslySetInnerHTML={{ __html: part.desc }} />
                    </li>
                ))}
            </ul>
        </ConceptInfoCard>
    );
}