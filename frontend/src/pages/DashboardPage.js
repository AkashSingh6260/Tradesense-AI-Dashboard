import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, Brain } from 'lucide-react';
import StockCard from '../components/StockCard';
import AIRecommendationCard from '../components/AIRecommendationCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { useData } from '../context/DataContext';
import './DashboardPage.css';

function HealthGauge({ score }) {
    const color = score >= 70 ? 'var(--green-buy)' : score >= 40 ? 'var(--amber-hold)' : 'var(--red-sell)';
    const circumference = 2 * Math.PI * 40;
    const strokeDash = (score / 100) * circumference;
    return (
        <div style={{ position: 'relative', width: 90, height: 90 }}>
            <svg width={90} height={90} viewBox="0 0 90 90" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="45" cy="45" r="40" fill="none" stroke="var(--bg-primary)" strokeWidth="8" />
                <circle cx="45" cy="45" r="40" fill="none" stroke={color} strokeWidth="8"
                    strokeDasharray={`${strokeDash} ${circumference}`} strokeLinecap="round"
                    style={{ transition: 'stroke-dasharray 1s ease' }} />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color }}>{score}</span>
                <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginTop: -2 }}>HEALTH</span>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    const { marketIndices, topGainers, topLosers, aiRecommendations, portfolioHoldings, loading } = useData();

    // Compute portfolio stats safely
    const totalInvested = portfolioHoldings.reduce((s, h) => s + h.buyPrice * h.qty, 0);
    const totalCurrent = portfolioHoldings.reduce((s, h) => s + h.currentPrice * h.qty, 0);
    const totalPL = totalCurrent - totalInvested;
    const todayPL = 24380.50;
    const healthScore = 74;

    return (
        <div className="page-layout">
            <main className="page-content">
                <div className="dashboard-header">
                    <h1 className="page-title">Trading Dashboard</h1>
                    <span className="greeting" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Welcome back, Trader 👋</span>
                </div>

                {/* Portfolio Summary */}
                <div className="dashboard-summary">
                    {/* Total Value */}
                    <div className="card summary-card">
                        <div className="summary-icon" style={{ background: 'rgba(59,130,246,0.12)', color: 'var(--accent-blue-light)' }}>
                            <DollarSign size={20} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>Portfolio Value</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                                ₹{totalCurrent.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: totalPL >= 0 ? 'var(--green-buy)' : 'var(--red-sell)', marginTop: 4, fontWeight: 600 }}>
                                {totalPL >= 0 ? '+' : ''}₹{Math.abs(totalPL).toLocaleString('en-IN', { maximumFractionDigits: 0 })} overall
                            </div>
                        </div>
                    </div>

                    {/* Today's P&L */}
                    <div className="card summary-card">
                        <div className="summary-icon" style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--green-buy)' }}>
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>Today's P&L</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--green-buy)', fontVariantNumeric: 'tabular-nums' }}>
                                +₹{todayPL.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--green-buy)', marginTop: 4, fontWeight: 600 }}>+2.84% today</div>
                        </div>
                    </div>

                    {/* Health Score */}
                    <div className="card summary-card" style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                        <HealthGauge score={healthScore} />
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 6 }}>Portfolio Health</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>Good</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>Well diversified</div>
                        </div>
                    </div>

                    {/* AI Status */}
                    <div className="card summary-card">
                        <div className="summary-icon" style={{ background: 'rgba(124,58,237,0.12)', color: 'var(--accent-purple-light)' }}>
                            <Brain size={20} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>AI Signals Today</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>6</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--accent-purple-light)', marginTop: 4, fontWeight: 600 }}>4 Buy · 1 Hold · 1 Sell</div>
                        </div>
                    </div>
                </div>

                {/* Market Indices */}
                <div className="section-title" style={{ marginTop: 28 }}>
                    <Activity size={16} color="var(--accent-purple-light)" /> Market Overview
                </div>
                <div className="grid-4">
                    {marketIndices.map(idx => (
                        <div key={idx.name} className="card index-card">
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{idx.name}</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '6px 0', fontVariantNumeric: 'tabular-nums' }}>
                                {idx.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </div>
                            <div style={{ display: 'flex', gap: 8, fontSize: '0.78rem', fontWeight: 600 }}>
                                <span style={{ color: idx.change >= 0 ? 'var(--green-buy)' : 'var(--red-sell)' }}>
                                    {idx.change >= 0 ? '▲' : '▼'} {Math.abs(idx.change).toFixed(2)}
                                </span>
                                <span style={{ color: idx.changePct >= 0 ? 'var(--green-buy)' : 'var(--red-sell)' }}>
                                    ({idx.changePct >= 0 ? '+' : ''}{idx.changePct.toFixed(2)}%)
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Gainers & Losers */}
                <div className="gainers-losers" style={{ marginTop: 28 }}>
                    <div>
                        <div className="section-title"><TrendingUp size={16} color="var(--green-buy)" /> Top Gainers</div>
                        {loading ? <LoadingSkeleton rows={5} type="row" /> : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {topGainers.map(s => <StockCard key={s.symbol} stock={s} compact />)}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="section-title"><TrendingDown size={16} color="var(--red-sell)" /> Top Losers</div>
                        {loading ? <LoadingSkeleton rows={5} type="row" /> : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {topLosers.map(s => <StockCard key={s.symbol} stock={s} compact />)}
                            </div>
                        )}
                    </div>
                </div>

                {/* AI Recommendations */}
                <div className="section-title" style={{ marginTop: 32 }}>
                    <Brain size={16} color="var(--accent-purple-light)" /> AI Recommended Stocks
                </div>
                {loading ? <LoadingSkeleton rows={6} /> : (
                    <div className="grid-3">
                        {aiRecommendations.map(s => <AIRecommendationCard key={s.symbol} stock={s} />)}
                    </div>
                )}
            </main>
        </div>
    );
}
