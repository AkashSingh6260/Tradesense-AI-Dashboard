import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function TrendIndicator({ trend, size = 16, showLabel = false }) {
    const isUp = trend === 'Up' || trend === 'Uptrend';
    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                color: isUp ? 'var(--green-buy)' : 'var(--red-sell)',
                fontWeight: 600,
                fontSize: '0.8rem',
            }}
        >
            {isUp ? <TrendingUp size={size} /> : <TrendingDown size={size} />}
            {showLabel && (isUp ? 'Uptrend' : 'Downtrend')}
        </span>
    );
}
