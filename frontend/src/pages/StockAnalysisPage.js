import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, ReferenceLine } from 'recharts';
import { Brain, TrendingUp, TrendingDown, Activity, ChevronDown } from 'lucide-react';
import RiskBadge from '../components/RiskBadge';
import TrendIndicator from '../components/TrendIndicator';
import { useData } from '../context/DataContext';
import './StockAnalysisPage.css';

// RSI Gauge (circular arc SVG)
function RsiGauge({ value }) {
    const radius = 44;
    const circumference = Math.PI * radius; // half circle
    const clamp = Math.min(100, Math.max(0, value));
    const dash = (clamp / 100) * circumference;
    const color = value >= 70 ? 'var(--red-sell)' : value <= 30 ? 'var(--green-buy)' : 'var(--amber-hold)';
    const label = value >= 70 ? 'Overbought' : value <= 30 ? 'Oversold' : 'Neutral';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width={100} height={60} viewBox="0 0 100 60">
                {/* Track */}
                <path d="M 8 55 A 44 44 0 0 1 92 55" fill="none" stroke="var(--bg-primary)" strokeWidth="10" strokeLinecap="round" />
                {/* Value */}
                <path d="M 8 55 A 44 44 0 0 1 92 55" fill="none" stroke={color} strokeWidth="10"
                    strokeLinecap="round" strokeDasharray={`${dash} ${circumference}`}
                    style={{ transition: 'stroke-dasharray 1s ease' }} />
                {/* Labels */}
                <text x="6" y="60" fill="var(--text-muted)" fontSize="8" textAnchor="middle">0</text>
                <text x="94" y="60" fill="var(--text-muted)" fontSize="8" textAnchor="middle">100</text>
            </svg>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color, marginTop: 4 }}>{value}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{label}</div>
        </div>
    );
}

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '10px 14px', fontSize: '0.78rem', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: 6 }}>{label}</div>
            {payload.map((p, i) => (
                <div key={i} style={{ color: p.color, fontWeight: 600 }}>
                    {p.name}: ₹{p.value?.toFixed(2)}
                </div>
            ))}
        </div>
    );
};

export default function StockAnalysisPage() {
    const { stocksForAnalysis, loading } = useData();
    const [selectedSymbol, setSelectedSymbol] = useState('RELIANCE');
    
    if (loading || !stocksForAnalysis?.length) return <div className="page-layout"><main className="page-content">Loading analysis...</main></div>;
    
    const stock = stocksForAnalysis.find(s => s.symbol === selectedSymbol) || stocksForAnalysis[0];

    const recClass = stock.recommendation === 'Buy' ? 'badge-buy'
        : stock.recommendation === 'Sell' ? 'badge-sell' : 'badge-hold';

    return (
        <div className="page-layout">
            <main className="page-content">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 14 }}>
                    <h1 className="page-title" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        Stock Analysis
                    </h1>
                    {/* Stock Selector */}
                    <div style={{ position: 'relative' }}>
                        <select
                            value={selectedSymbol}
                            onChange={e => setSelectedSymbol(e.target.value)}
                            className="stock-selector"
                        >
                            {stocksForAnalysis.map(s => (
                                <option key={s.symbol} value={s.symbol}>{s.symbol} – {s.name}</option>
                            ))}
                        </select>
                        <ChevronDown size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                    </div>
                </div>

                <div className="analysis-grid">
                    {/* Left column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {/* Price Header Card */}
                        <div className="card" style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                                <div>
                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 6 }}>{stock.name}</div>
                                    <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                                        ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                    </div>
                                    <div style={{ marginTop: 8, display: 'flex', gap: 10, alignItems: 'center' }}>
                                        <TrendIndicator trend={stock.trend} showLabel />
                                        <RiskBadge risk={stock.risk} />
                                    </div>
                                </div>
                                <span className={recClass} style={{ fontSize: '0.9rem', padding: '6px 18px' }}>
                                    {stock.recommendation}
                                </span>
                            </div>
                        </div>

                        {/* Price Chart with MA */}
                        <div className="card" style={{ padding: '20px' }}>
                            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Price Chart</div>
                            <div style={{ display: 'flex', gap: 16, marginBottom: 12, fontSize: '0.72rem' }}>
                                <span style={{ color: 'var(--accent-blue-light)', fontWeight: 600 }}>— Price</span>
                                <span style={{ color: '#f59e0b', fontWeight: 600 }}>— MA 20</span>
                                <span style={{ color: '#ec4899', fontWeight: 600 }}>— MA 50</span>
                            </div>
                            <ResponsiveContainer width="100%" height={240}>
                                <LineChart data={stock.history} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                                    <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false}
                                        interval={Math.floor(stock.history.length / 5)} />
                                    <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickLine={false} axisLine={false}
                                        domain={['auto', 'auto']} tickFormatter={v => `₹${v.toLocaleString('en-IN')}`} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line type="monotone" dataKey="price" stroke="var(--accent-blue-light)" strokeWidth={2} dot={false} name="Price" />
                                    <Line type="monotone" dataKey="ma20" stroke="#f59e0b" strokeWidth={1.5} dot={false} strokeDasharray="4 2" name="MA 20" />
                                    <Line type="monotone" dataKey="ma50" stroke="#ec4899" strokeWidth={1.5} dot={false} strokeDasharray="6 3" name="MA 50" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Right column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {/* RSI Gauge */}
                        <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', alignSelf: 'flex-start' }}>RSI Indicator</div>
                            <RsiGauge value={stock.rsi} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, width: '100%', marginTop: 8, fontSize: '0.72rem', textAlign: 'center' }}>
                                {[['≤ 30', 'Oversold', 'var(--green-buy)'], ['30–70', 'Neutral', 'var(--amber-hold)'], ['≥ 70', 'Overbought', 'var(--red-sell)']].map(([r, l, c]) => (
                                    <div key={l} style={{ padding: '8px 4px', borderRadius: 8, background: 'var(--bg-primary)' }}>
                                        <div style={{ fontWeight: 700, color: c }}>{r}</div>
                                        <div style={{ color: 'var(--text-muted)', marginTop: 2 }}>{l}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* AI Recommendation Panel */}
                        <div className="card" style={{ padding: '20px', background: 'linear-gradient(135deg, var(--bg-card), rgba(124,58,237,0.08))' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                                <Brain size={18} color="var(--accent-purple-light)" />
                                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>AI Recommendation</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                <span className={recClass} style={{ fontSize: '1rem', padding: '8px 20px' }}>{stock.recommendation}</span>
                                <RiskBadge risk={stock.risk} />
                            </div>

                            {/* Confidence */}
                            <div style={{ marginBottom: 16 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.78rem' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Confidence</span>
                                    <span style={{ color: 'var(--accent-purple-light)', fontWeight: 700 }}>{stock.confidence}%</span>
                                </div>
                                <div style={{ height: 6, borderRadius: 99, background: 'var(--bg-primary)', overflow: 'hidden' }}>
                                    <div style={{ width: `${stock.confidence}%`, height: '100%', borderRadius: 99, background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))' }} />
                                </div>
                            </div>

                            {/* Trend */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: 8, background: 'var(--bg-primary)', marginBottom: 12 }}>
                                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Trend</span>
                                <TrendIndicator trend={stock.trend} showLabel />
                            </div>

                            {/* AI Insight Box */}
                            <div style={{
                                borderLeft: '3px solid var(--accent-purple-light)',
                                paddingLeft: 14,
                                paddingTop: 10, paddingBottom: 10, paddingRight: 10,
                                background: 'rgba(139,92,246,0.06)',
                                borderRadius: '0 8px 8px 0',
                            }}>
                                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-purple-light)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                    AI Insight
                                </div>
                                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                                    {stock.insight}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
