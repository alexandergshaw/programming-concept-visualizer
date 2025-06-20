'use client';

import { ReactNode } from 'react';

export default function ConceptInfoCard({ children, style = {} }: { children: ReactNode, style?: React.CSSProperties }) {
    return (
        <div
            style={{
                background: '#f3f6fa',
                borderRadius: 10,
                padding: 20,
                marginBottom: 32,
                border: '1.5px solid #e0e0e0',
                maxWidth: 600,
                ...style,
            }}
        >
            {children}
        </div>
    );
}