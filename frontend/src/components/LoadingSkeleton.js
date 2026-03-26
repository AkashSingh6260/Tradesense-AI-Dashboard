import React from 'react';

export default function LoadingSkeleton({ rows = 4, type = 'card' }) {
    if (type === 'row') {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="skeleton" style={{ height: 56, borderRadius: 'var(--radius-md)' }} />
                ))}
            </div>
        );
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="skeleton" style={{ height: 140, borderRadius: 'var(--radius-md)' }} />
            ))}
        </div>
    );
}
