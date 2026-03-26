import React from 'react';

export default function PortfolioCard({ holding }) {
    const pl = (holding.currentPrice - holding.buyPrice) * holding.qty;
    const plPct = ((holding.currentPrice - holding.buyPrice) / holding.buyPrice) * 100;
    const isPositive = pl >= 0;

    return (
        <div className="card portfolio-row" style={{
            padding: '14px 20px',
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
            alignItems: 'center',
            gap: 12,
        }}>
            <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{holding.symbol}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>{holding.sector}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Qty</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{holding.qty}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Buy Avg</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>₹{holding.buyPrice.toFixed(2)}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>LTP</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>₹{holding.currentPrice.toFixed(2)}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>P&L</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: isPositive ? 'var(--green-buy)' : 'var(--red-sell)', fontVariantNumeric: 'tabular-nums' }}>
                    {isPositive ? '+' : ''}₹{Math.abs(pl).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
                <div style={{ fontSize: '0.7rem', color: isPositive ? 'var(--green-buy)' : 'var(--red-sell)' }}>
                    ({isPositive ? '+' : ''}{plPct.toFixed(2)}%)
                </div>
            </div>
        </div>
    );
}
