import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
    const [data, setData] = useState({
        marketIndices: [],
        topGainers: [],
        topLosers: [],
        aiRecommendations: [],
        portfolioHoldings: [],
        sectorData: [],
        stocksForAnalysis: [],
        portfolioHistory: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
                const [mi, tg, tl, ai, ph, sa] = await Promise.all([
                    fetch(`${API_BASE}/api/market-indices`).then(res => res.json()),
                    fetch(`${API_BASE}/api/top-gainers`).then(res => res.json()),
                    fetch(`${API_BASE}/api/top-losers`).then(res => res.json()),
                    fetch(`${API_BASE}/api/ai-recommendations`).then(res => res.json()),
                    fetch(`${API_BASE}/api/portfolio-holdings`).then(res => res.json()),
                    fetch(`${API_BASE}/api/stocks-analysis`).then(res => res.json())
                ]);

                const sectorData = [
                    { name: 'IT', value: 38, fill: '#3b82f6' },
                    { name: 'Banking', value: 22, fill: '#7c3aed' },
                    { name: 'Energy', value: 15, fill: '#10b981' },
                    { name: 'Auto', value: 12, fill: '#f59e0b' },
                    { name: 'Pharma', value: 9, fill: '#ef4444' },
                    { name: 'Others', value: 4, fill: '#6b7fa3' },
                ];
                
                const portfolioHistory = (() => {
                    const hData = [];
                    const now = new Date();
                    let value = 280000;
                    for (let i = 89; i >= 0; i--) {
                        const date = new Date(now);
                        date.setDate(date.getDate() - i);
                        value += (Math.random() - 0.45) * 3000;
                        hData.push({
                            date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
                            value: Math.round(value),
                        });
                    }
                    return hData;
                })();

                sa.forEach(s => {
                    // Generate chart history for analysis
                    const sData = [];
                    let price = s.price * 0.9;
                    const now = new Date();
                    for (let i = 29; i >= 0; i--) {
                        const date = new Date(now);
                        date.setDate(date.getDate() - i);
                        const change = (Math.random() - 0.48) * 0.02 * price;
                        price = Math.max(price + change, s.price * 0.8 * 0.8);
                        sData.push({
                            date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
                            price: parseFloat(price.toFixed(2)),
                            ma20: parseFloat((price * (1 + (Math.random() - 0.5) * 0.005)).toFixed(2)),
                            ma50: parseFloat((price * (1 + (Math.random() - 0.5) * 0.008)).toFixed(2)),
                        });
                    }
                    s.history = sData;
                });

                setData({
                    marketIndices: mi,
                    topGainers: tg,
                    topLosers: tl,
                    aiRecommendations: ai,
                    portfolioHoldings: ph,
                    stocksForAnalysis: sa,
                    sectorData,
                    portfolioHistory
                });
            } catch (err) {
                console.error("Failed to fetch from backend", err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <DataContext.Provider value={{ ...data, loading }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}
