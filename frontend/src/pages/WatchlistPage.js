import React, { useState } from 'react';
import { Plus, Trash2, Brain, Search } from 'lucide-react';
import { useUser } from '../context/UserContext';

const availableStocks = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2847.30, change: 1.23, signal: 'Buy' },
    { symbol: 'TCS', name: 'Tata Consultancy Svc', price: 3921.55, change: -0.45, signal: 'Hold' },
    { symbol: 'INFY', name: 'Infosys Ltd', price: 1654.80, change: 2.10, signal: 'Buy' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1723.40, change: -1.05, signal: 'Hold' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 1089.60, change: 0.67, signal: 'Buy' },
    { symbol: 'WIPRO', name: 'Wipro Ltd', price: 524.85, change: 3.45, signal: 'Buy' },
    { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', price: 1643.20, change: 3.91, signal: 'Buy' },
    { symbol: 'TATAMOTORS', name: 'Tata Motors', price: 867.40, change: 4.23, signal: 'Buy' },
    { symbol: 'AXISBANK', name: 'Axis Bank', price: 1098.30, change: 2.87, signal: 'Hold' },
    { symbol: 'ITC', name: 'ITC Ltd', price: 456.90, change: -0.35, signal: 'Sell' },
    { symbol: 'ADANIENT', name: 'Adani Enterprises', price: 2456.75, change: 5.80, signal: 'Buy' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 1432.25, change: -0.60, signal: 'Sell' },
    { symbol: 'ONGC', name: 'ONGC Ltd', price: 246.30, change: -3.45, signal: 'Sell' },
];

export default function WatchlistPage() {
    const { watchlist, addToWatchlist, removeFromWatchlist } = useUser();
    const [query, setQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const suggestions = query.length >= 1
        ? availableStocks.filter(s =>
            !watchlist.find(w => w.symbol === s.symbol) &&
            (s.symbol.toLowerCase().includes(query.toLowerCase()) ||
                s.name.toLowerCase().includes(query.toLowerCase()))
        ).slice(0, 6)
        : [];

    const handleAdd = (stock) => {
        addToWatchlist(stock);
        setQuery('');
        setShowDropdown(false);
    };

    return (
        <div className="page-layout">
            <main className="page-content">
                <h1 className="page-title" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24 }}>Watchlist</h1>

                {/* Search Bar */}
                <div style={{ position: 'relative', maxWidth: 420, marginBottom: 28 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', transition: 'border-color var(--transition)' }}>
                        <Search size={16} color="var(--text-muted)" />
                        <input
                            type="text"
                            placeholder="Search and add stocks…"
                            value={query}
                            onChange={e => { setQuery(e.target.value); setShowDropdown(true); }}
                            onFocus={() => setShowDropdown(true)}
                            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '0.875rem' }}
                        />
                        {query && (
                            <button onClick={() => setQuery('')} style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1 }}>×</button>
                        )}
                    </div>
                    {/* Suggestions Dropdown */}
                    {showDropdown && suggestions.length > 0 && (
                        <div style={{
                            position: 'absolute', top: '110%', left: 0, right: 0, zIndex: 999,
                            background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden',
                        }}>
                            {suggestions.map(s => (
                                <div key={s.symbol}
                                    onMouseDown={() => handleAdd(s)}
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: '12px 16px', cursor: 'pointer', transition: 'background var(--transition)',
                                    }}
                                    className="suggestion-row"
                                >
                                    <div>
                                        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{s.symbol}</div>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{s.name}</div>
                                    </div>
                                    <Plus size={16} color="var(--accent-purple-light)" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Watchlist Table */}
                {watchlist.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                        <Brain size={40} style={{ marginBottom: 12, opacity: 0.4 }} />
                        <div style={{ fontSize: '0.9rem' }}>Your watchlist is empty. Search and add stocks above.</div>
                    </div>
                ) : (
                    <div className="card" style={{ overflow: 'hidden' }}>
                        {/* Header */}
                        <div style={{
                            display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 40px',
                            padding: '10px 20px', borderBottom: '1px solid var(--border-color)',
                            fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em'
                        }}>
                            <span>Stock</span>
                            <span style={{ textAlign: 'right' }}>Price</span>
                            <span style={{ textAlign: 'right' }}>Change</span>
                            <span style={{ textAlign: 'center' }}>AI Signal</span>
                            <span />
                        </div>
                        {watchlist.map((s, i) => {
                            const isPos = s.change >= 0;
                            const pct = ((s.change / (s.price - s.change)) * 100).toFixed(2);
                            const sigClass = s.signal === 'Buy' ? 'badge-buy' : s.signal === 'Sell' ? 'badge-sell' : 'badge-hold';
                            return (
                                <div key={s.symbol} style={{
                                    display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 40px',
                                    padding: '14px 20px', alignItems: 'center',
                                    borderBottom: i < watchlist.length - 1 ? '1px solid var(--border-color)' : 'none',
                                    transition: 'background var(--transition)',
                                }} className="stock-row">
                                    <div>
                                        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{s.symbol}</div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>{s.name}</div>
                                    </div>
                                    <div style={{ textAlign: 'right', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                                        ₹{s.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                    </div>
                                    <div style={{ textAlign: 'right', fontSize: '0.82rem', fontWeight: 700, color: isPos ? 'var(--green-buy)' : 'var(--red-sell)' }}>
                                        {isPos ? '+' : ''}{s.change.toFixed(2)} ({isPos ? '+' : ''}{pct}%)
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <span className={sigClass} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                            <Brain size={10} /> {s.signal}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => removeFromWatchlist(s.symbol)}
                                        style={{ padding: 6, borderRadius: 6, color: 'var(--text-muted)', transition: 'color var(--transition)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        title="Remove"
                                        className="remove-btn"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                <style>{`
          .suggestion-row:hover { background: var(--bg-card-hover); }
          .stock-row:hover { background: var(--bg-card-hover); }
          .remove-btn:hover { color: var(--red-sell) !important; }
        `}</style>
            </main>
        </div>
    );
}
