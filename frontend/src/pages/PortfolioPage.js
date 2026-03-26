import React from 'react';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import PortfolioCard from '../components/PortfolioCard';
import { useData } from '../context/DataContext';
import { TrendingUp, DollarSign, BarChart2 } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '10px 14px', fontSize: '0.78rem' }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
            <div style={{ color: 'var(--accent-blue-light)', fontWeight: 700 }}>₹{payload[0]?.value?.toLocaleString('en-IN')}</div>
        </div>
    );
};

const PieTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '8px 14px', fontSize: '0.78rem' }}>
            <span style={{ color: payload[0].payload.fill, fontWeight: 700 }}>{payload[0].name}: {payload[0].value}%</span>
        </div>
    );
};

export default function PortfolioPage() {
    const { portfolioHoldings, sectorData, portfolioHistory, loading } = useData();

    // Compute portfolio stats safely
    const totalInvested = portfolioHoldings?.reduce((s, h) => s + h.buyPrice * h.qty, 0) || 0;
    const totalCurrent = portfolioHoldings?.reduce((s, h) => s + h.currentPrice * h.qty, 0) || 0;
    const totalPL = totalCurrent - totalInvested;
    const totalPLPct = totalInvested ? (totalPL / totalInvested) * 100 : 0;

    return (
        <div className="page-layout">
            <main className="page-content">
                <h1 className="page-title" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24 }}>
                    Portfolio
                </h1>

                {/* Summary Cards */}
                <div className="grid-3" style={{ marginBottom: 24 }}>
                    {[
                        { label: 'Total Invested', value: `₹${totalInvested.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, icon: <DollarSign size={20} />, color: 'var(--accent-blue-light)', bg: 'rgba(59,130,246,0.12)' },
                        { label: 'Current Value', value: `₹${totalCurrent.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, icon: <TrendingUp size={20} />, color: 'var(--green-buy)', bg: 'rgba(16,185,129,0.12)' },
                        { label: 'Total P&L', value: `${totalPL >= 0 ? '+' : ''}₹${Math.abs(totalPL).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, sub: `${totalPLPct >= 0 ? '+' : ''}${totalPLPct.toFixed(2)}%`, icon: <BarChart2 size={20} />, color: totalPL >= 0 ? 'var(--green-buy)' : 'var(--red-sell)', bg: totalPL >= 0 ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)' },
                    ].map(c => (
                        <div key={c.label} className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color, flexShrink: 0 }}>{c.icon}</div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>{c.label}</div>
                                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: c.color, fontVariantNumeric: 'tabular-nums' }}>{c.value}</div>
                                {c.sub && <div style={{ fontSize: '0.75rem', color: c.color, marginTop: 2 }}>{c.sub}</div>}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 24 }}>
                    {/* Performance Area Chart */}
                    <div className="card" style={{ padding: '20px' }}>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Portfolio Performance (3 Months)</div>
                        <ResponsiveContainer width="100%" height={220}>
                            <AreaChart data={portfolioHistory} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="pgradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--accent-blue-light)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--accent-blue-light)" stopOpacity={0.01} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false}
                                    interval={Math.floor(portfolioHistory.length / 5)} />
                                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false}
                                    tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} domain={['auto', 'auto']} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="value" stroke="var(--accent-blue-light)" strokeWidth={2.5} fill="url(#pgradient)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Sector Pie */}
                    <div className="card" style={{ padding: '20px' }}>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Sector Allocation</div>
                        <ResponsiveContainer width="100%" height={220}>
                            <PieChart>
                                <Pie data={sectorData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                                    {sectorData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                                </Pie>
                                <Tooltip content={<PieTooltip />} />
                                <Legend iconType="circle" iconSize={8} formatter={v => <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{v}</span>} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Holdings Table */}
                <div className="section-title">Holdings</div>
                {/* Header */}
                <div style={{
                    display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                    padding: '10px 20px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)',
                    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6
                }}>
                    <span>Stock</span>
                    <span style={{ textAlign: 'right' }}>Qty</span>
                    <span style={{ textAlign: 'right' }}>Buy Avg</span>
                    <span style={{ textAlign: 'right' }}>LTP</span>
                    <span style={{ textAlign: 'right' }}>P&L</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {portfolioHoldings.map(h => <PortfolioCard key={h.symbol} holding={h} />)}
                </div>
            </main>
        </div>
    );
}
