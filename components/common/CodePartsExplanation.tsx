'use client';

import ConceptInfoCard from '@/components/common/ConceptInfoCard';

export type CodePart = {
    label: string;
    part: string;
    color: string;
    desc: string;
};

export default function CodePartsExplanation({
    code,
    parts,
    style = {},
}: {
    code: string;
    parts: CodePart[];
    style?: React.CSSProperties;
}) {
    // Highlight each part in the code sample
    let highlightedCode = code;
    parts.forEach(part => {
        // Use RegExp to avoid double-highlighting if part appears multiple times
        highlightedCode = highlightedCode.replace(
            new RegExp(part.part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
            `<span style="background:${part.color}33;border-radius:4px;padding:1px 2px;">${part.part}</span>`
        );
    });

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
            />
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 15 }}>
                {parts.map(part => (
                    <li key={part.label} style={{ marginBottom: 4 }}>
                        <span style={{
                            display: 'inline-block',
                            width: 14,
                            height: 14,
                            background: part.color + '33',
                            borderRadius: 3,
                            marginRight: 8,
                            verticalAlign: 'middle'
                        }} />
                        <b>{part.label}:</b> <span dangerouslySetInnerHTML={{ __html: part.desc }} />
                    </li>
                ))}
            </ul>
        </ConceptInfoCard>
    );
}