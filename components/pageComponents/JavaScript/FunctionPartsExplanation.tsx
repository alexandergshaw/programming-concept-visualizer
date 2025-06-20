'use client';

import ConceptInfoCard from '@/components/common/ConceptInfoCard';

const functionParts = [
    {
        label: 'Function Keyword',
        part: 'function',
        color: '#1976d2',
        desc: 'Tells JavaScript you are making a function.',
    },
    {
        label: 'Function Name',
        part: 'square',
        color: '#43a047',
        desc: 'What you call the function when you want to use it.',
    },
    {
        label: 'Parameters',
        part: '(x)',
        color: '#fbc02d',
        desc: 'A placeholder for the value you give the function.',
    },
    {
        label: 'Body',
        part: '{ return x * x; }',
        color: '#e53935',
        desc: 'The instructions the function runs.',
    },
    {
        label: 'Return Statement',
        part: 'return x * x;',
        color: '#8e24aa',
        desc: 'Sends the answer back to wherever the function was called.',
    },
    {
        label: 'Argument',
        part: '(5)',
        color: '#00bcd4',
        desc: 'The actual value you give to the function when you use it.',
    },
];

export default function FunctionPartsExplanation({ input = 5 }: { input?: number }) {
    // Highlight each part in the code sample
    let functionSignature = 'function square(x) { return x * x; }';
    functionParts.forEach(part => {
        functionSignature = functionSignature.replace(
            part.part,
            `<span style="background:${part.color}33;border-radius:4px;padding:1px 2px;">${part.part}</span>`
        );
    });
    // Only highlight (5) in the call line, not square(5)
    const callLine = `console.log(square(${input}));`.replace(
        `(${input})`,
        `<span style="background:#00bcd433;border-radius:4px;padding:1px 2px;">(${input})</span>`
    );

    return (
        <ConceptInfoCard>
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
                dangerouslySetInnerHTML={{ __html: functionSignature + '\n' + callLine }}
            />
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 15 }}>
                {functionParts.map(part => (
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