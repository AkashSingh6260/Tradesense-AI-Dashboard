import React from 'react';
import { Shield } from 'lucide-react';

const config = {
    Low: { color: 'var(--green-buy)', bg: 'var(--green-buy-bg)' },
    Medium: { color: 'var(--amber-hold)', bg: 'var(--amber-hold-bg)' },
    High: { color: 'var(--red-sell)', bg: 'var(--red-sell-bg)' },
};

export default function RiskBadge({ risk }) {
    const c = config[risk] || config.Medium;
    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '3px 10px',
            borderRadius: 99,
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            background: c.bg,
            color: c.color,
            textTransform: 'uppercase',
        }}>
            <Shield size={11} />
            {risk}
        </span>
    );
}
