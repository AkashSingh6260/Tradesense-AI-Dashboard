import React from 'react';
import { Brain, ChevronRight } from 'lucide-react';
import RiskBadge from './RiskBadge';
import TrendIndicator from './TrendIndicator';
import { Link } from 'react-router-dom';

export default function AIRecommendationCard({ stock }) {
    const recClass = stock.recommendation === 'Buy' ? 'badge-buy'
        : stock.recommendation === 'Sell' ? 'badge-sell' : 'badge-hold';

    return (
        <div className="card ai-card" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stock.symbol}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{stock.name}</div>
                </div>
                <span className={recClass}>{stock.recommendation}</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                    ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <TrendIndicator trend={stock.trend} />
            </div>

            {/* Risk + confidence */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <RiskBadge risk={stock.risk} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
                    <Brain size={13} color="var(--accent-purple-light)" />
                    <div style={{ flex: 1, height: 4, borderRadius: 99, background: 'var(--bg-primary)', overflow: 'hidden' }}>
                        <div style={{
                            width: `${stock.confidence}%`,
                            height: '100%',
                            borderRadius: 99,
                            background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))',
                        }} />
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-purple-light)', minWidth: 32 }}>
                        {stock.confidence}%
                    </span>
                </div>
            </div>

            {/* Link to analysis */}
            <Link
                to={`/analysis?stock=${stock.symbol}`}
                style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4,
                    fontSize: '0.75rem', color: 'var(--accent-purple-light)', fontWeight: 600,
                }}
            >
                View Analysis <ChevronRight size={13} />
            </Link>
        </div>
    );
}
