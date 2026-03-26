import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, TrendingUp, Shield, BarChart2, ArrowRight, Zap, CheckCircle } from 'lucide-react';
import './LandingPage.css';

const features = [
    { icon: <Brain size={28} />, title: 'AI Recommendations', desc: 'Machine learning algorithms analyze 200+ indicators to give you Buy, Hold, or Sell signals with confidence scores.' },
    { icon: <Shield size={28} />, title: 'Risk Analysis', desc: 'Smart risk profiling categorizes every trade into Low, Medium, or High risk with detailed explanations.' },
    { icon: <BarChart2 size={28} />, title: 'Portfolio Intelligence', desc: 'Track performance, sector allocation, and get AI-driven portfolio rebalancing suggestions.' },
    { icon: <TrendingUp size={28} />, title: 'Real-time Markets', desc: 'Live market data for NIFTY, SENSEX, and 5000+ stocks with technical indicators and moving averages.' },
];

const stats = [
    { label: 'Active Traders', value: '50K+' },
    { label: 'AI Predictions Daily', value: '2M+' },
    { label: 'Accuracy Rate', value: '87%' },
    { label: 'Assets Tracked', value: '₹500Cr+' },
];

export default function LandingPage() {
    return (
        <div className="landing">
            {/* Hero */}
            <section className="hero">
                <div className="hero-bg" />
                <div className="hero-content fade-in">
                    <div className="hero-badge">
                        <Zap size={13} /> Powered by Artificial Intelligence
                    </div>
                    <h1 className="hero-title">
                        Trade Smarter<br />
                        <span className="gradient-text">with AI</span>
                    </h1>
                    <p className="hero-subtitle">
                        TradeSense AI combines machine learning with real-time market data to give you smarter, faster, and more confident trading decisions.
                    </p>
                    <div className="hero-actions">
                        <Link to="/dashboard" className="btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
                            Go to Dashboard <ArrowRight size={18} />
                        </Link>
                        <Link to="/analysis" className="btn-secondary" style={{ fontSize: '1rem', padding: '14px 28px' }}>
                            See Analysis
                        </Link>
                    </div>
                    <div className="hero-checks">
                        {['Free to use', 'No credit card required', 'Real AI, not hype'].map(t => (
                            <span key={t} className="hero-check"><CheckCircle size={14} /> {t}</span>
                        ))}
                    </div>
                </div>

                {/* Floating cards */}
                <div className="hero-visual">
                    <div className="floating-card card1">
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 4 }}>AI Signal</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>RELIANCE</div>
                        <span className="badge-buy" style={{ marginTop: 6, display: 'inline-block' }}>Buy</span>
                        <div style={{ fontSize: '0.8rem', color: 'var(--accent-purple-light)', marginTop: 6, fontWeight: 700 }}>87% Confidence</div>
                    </div>
                    <div className="floating-card card2">
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 4 }}>Portfolio</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--green-buy)' }}>+₹24,380</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4 }}>Today's Gain</div>
                    </div>
                    <div className="floating-card card3">
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 4 }}>NIFTY 50</div>
                        <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>22,486</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--green-buy)', fontWeight: 600 }}>▲ 0.64%</div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="stats-bar">
                {stats.map(s => (
                    <div key={s.label} className="stat-item">
                        <div className="stat-value">{s.value}</div>
                        <div className="stat-label">{s.label}</div>
                    </div>
                ))}
            </section>

            {/* Features */}
            <section className="features-section">
                <div className="features-header">
                    <h2>Everything You Need to Trade Better</h2>
                    <p>Built for serious traders who want an analytical edge.</p>
                </div>
                <div className="features-grid">
                    {features.map(f => (
                        <div key={f.title} className="card feature-card">
                            <div className="feature-icon">{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <div className="cta-inner card">
                    <h2>Ready to trade with AI?</h2>
                    <p>Join thousands of traders who've upgraded their strategy with TradeSense AI.</p>
                    <Link to="/dashboard" className="btn-primary" style={{ fontSize: '1rem', padding: '14px 36px' }}>
                        Get Started Free <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="logo-text" style={{ fontSize: '0.95rem', fontWeight: 800 }}>
                    Trade<span className="logo-accent">Sense</span> AI
                </div>
                <p>© 2025 TradeSense AI. For educational purposes only. Not financial advice.</p>
            </footer>
        </div>
    );
}
