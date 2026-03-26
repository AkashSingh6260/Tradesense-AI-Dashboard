import React from 'react';
import { ResponsiveContainer } from 'recharts';

export default function ChartContainer({ title, subtitle, height = 280, children, style = {} }) {
    return (
        <div className="card" style={{ padding: '20px', ...style }}>
            {title && (
                <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</div>
                    {subtitle && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 3 }}>{subtitle}</div>}
                </div>
            )}
            <ResponsiveContainer width="100%" height={height}>
                {children}
            </ResponsiveContainer>
        </div>
    );
}
