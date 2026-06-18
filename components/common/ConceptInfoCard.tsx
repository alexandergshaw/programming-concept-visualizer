'use client';

import { ReactNode } from 'react';

export default function ConceptInfoCard({ children, style = {} }: { children: ReactNode, style?: React.CSSProperties }) {
    return (
        <div
            style={{
                background: 'var(--paper-sunken)',
                borderRadius: 10,
                padding: 20,
                marginBottom: 32,
                border: '1px solid var(--line)',
                ...style,
            }}
        >
            {children}
        </div>
    );
}