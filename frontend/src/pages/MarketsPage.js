import React from 'react';
import { BarChart2, TrendingUp, TrendingDown } from 'lucide-react';
import { useData } from '../context/DataContext';

const allStocks = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2847.30, change: 1.23, volume: '4.2M', sector: 'Energy' },
    { symbol: 'TCS', name: 'Tata Consultancy Svc', price: 3921.55, change: -0.45, volume: '2.8M', sector: 'IT' },
    { symbol: 'INFY', name: 'Infosys Ltd', price: 1654.80, change: 2.10, volume: '6.1M', sector: 'IT' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1723.40, change: -1.05, volume: '3.9M', sector: 'Banking' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 1089.60, change: 0.67, volume: '5.1M', sector: 'Banking' },
    { symbol: 'AXISBANK', name: 'Axis Bank', price: 1098.30, change: 2.87, volume: '3.3M', sector: 'Banking' },
    { symbol: 'TATAMOTORS', name: 'Tata Motors', price: 867.40, change: 4.23, volume: '7.4M', sector: 'Auto' },
    { symbol: 'WIPRO', name: 'Wipro Ltd', price: 524.85, change: 3.45, volume: '4.8M', sector: 'IT' },
    { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', price: 1643.20, change: 3.91, volume: '2.2M', sector: 'Pharma' },
    { symbol: 'ITC', name: 'ITC Ltd', price: 456.90, change: -0.35, volume: '9.1M', sector: 'FMCG' },
    { symbol: 'ONGC', name: 'ONGC Ltd', price: 246.30, change: -3.45, volume: '8.0M', sector: 'Energy' },
    { symbol: 'ADANIENT', name: 'Adani Enterprises', price: 2456.75, change: 5.80, volume: '3.6M', sector: 'Infra' },
];

const sectors = [
    { name: 'IT', change: 1.46, stocks: 4 },
    { name: 'Banking', change: -0.45, stocks: 6 },
    { name: 'Auto', change: 2.10, stocks: 3 },
    { name: 'Pharma', change: 1.85, stocks: 5 },
    { name: 'Energy', change: -0.90, stocks: 4 },
    { name: 'FMCG', change: 0.45, stocks: 7 },
];

export default function MarketsPage() {
    const { marketIndices, loading } = useData();

    return (
        <div className="page-layout">
            <main className="page-content">
                <h1 className="page-title" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24 }}>
                    Markets
                </h1>

                {/* Index Cards */}
                <div className="section-title"><BarChart2 size={16} color="var(--accent-purple-light)" /> Major Indices</div>
                <div className="grid-4" style={{ marginBottom: 32 }}>
                    {marketIndices.map(idx => (
                        <div key={idx.name} className="card" style={{ padding: '20px' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 8 }}>{idx.name}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                                {idx.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </div>
                            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: idx.change >= 0 ? 'var(--green-buy)' : 'var(--red-sell)' }}>
                                    {idx.change >= 0 ? '▲' : '▼'} {Math.abs(idx.change).toFixed(2)}
                                </span>
                                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: idx.changePct >= 0 ? 'var(--green-buy)' : 'var(--red-sell)' }}>
                                    ({idx.changePct >= 0 ? '+' : ''}{idx.changePct.toFixed(2)}%)
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                                <span>H: {idx.high.toLocaleString('en-IN')}</span>
                                <span>L: {idx.low.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sectors + Stocks */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
                    {/* Sector Performance */}
                    <div>
                        <div className="section-title">Sector Performance</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {sectors.map(s => (
                                <div key={s.name} className="card" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{s.name}</div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>{s.stocks} stocks</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        {s.change >= 0 ? <TrendingUp size={14} color="var(--green-buy)" /> : <TrendingDown size={14} color="var(--red-sell)" />}
                                        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: s.change >= 0 ? 'var(--green-buy)' : 'var(--red-sell)' }}>
                                            {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* All Stocks Table */}
                    <div>
                        <div className="section-title">Active Stocks</div>
                        <div className="card" style={{ overflow: 'hidden' }}>
                            {/* Table Header */}
                            <div style={{
                                display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr',
                                padding: '10px 20px', borderBottom: '1px solid var(--border-color)',
                                fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em'
                            }}>
                                <span>Symbol</span><span style={{ textAlign: 'right' }}>Price</span>
                                <span style={{ textAlign: 'right' }}>Change</span>
                                <span style={{ textAlign: 'right' }}>%</span>
                                <span style={{ textAlign: 'right' }}>Volume</span>
                            </div>
                            {allStocks.map((s, i) => (
                                <div key={s.symbol} style={{
                                    display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr',
                                    padding: '12px 20px', borderBottom: i < allStocks.length - 1 ? '1px solid var(--border-color)' : 'none',
                                    transition: 'background var(--transition)',
                                }} className="stock-row">
                                    <div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{s.symbol}</div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>{s.sector}</div>
                                    </div>
                                    <div style={{ textAlign: 'right', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                                        ₹{s.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                    </div>
                                    <div style={{ textAlign: 'right', fontSize: '0.8rem', fontWeight: 600, color: s.change >= 0 ? 'var(--green-buy)' : 'var(--red-sell)' }}>
                                        {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)}
                                    </div>
                                    <div style={{ textAlign: 'right', fontSize: '0.8rem', fontWeight: 700, color: s.change >= 0 ? 'var(--green-buy)' : 'var(--red-sell)' }}>
                                        {s.change >= 0 ? '+' : ''}{((s.change / (s.price - s.change)) * 100).toFixed(2)}%
                                    </div>
                                    <div style={{ textAlign: 'right', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.volume}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
