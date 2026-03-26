import React from 'react';

export default function StockCard({ stock, compact = false }) {
    const isPositive = stock.change >= 0;
    const changePct = typeof stock.changePct !== 'undefined'
        ? stock.changePct
        : ((stock.change / (stock.price - stock.change)) * 100);

    return (
        <div className="card" style={{ padding: compact ? '12px 16px' : '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stock.symbol}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2, maxWidth: 120, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{stock.name}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                        ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>
                    <div style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: isPositive ? 'var(--green-buy)' : 'var(--red-sell)',
                        marginTop: 2,
                    }}>
                        {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{changePct.toFixed(2)}%)
                    </div>
                </div>
            </div>
        </div>
    );
}
