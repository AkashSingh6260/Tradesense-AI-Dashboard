// =====================================================
//  TradeSense AI – Mock Data Utility
// =====================================================

export const marketIndices = [
    { name: 'NIFTY 50', value: 22486.35, change: 143.20, changePct: 0.64, high: 22541.00, low: 22310.00 },
    { name: 'SENSEX', value: 74119.45, change: 489.32, changePct: 0.66, high: 74289.00, low: 73601.00 },
    { name: 'NIFTY Bank', value: 47832.60, change: -215.40, changePct: -0.45, high: 48150.00, low: 47680.00 },
    { name: 'NIFTY IT', value: 36214.80, change: 521.70, changePct: 1.46, high: 36380.00, low: 35920.00 },
];

export const topGainers = [
    { symbol: 'ADANIENT', name: 'Adani Enterprises', price: 2456.75, change: 5.80 },
    { symbol: 'TATAMOTORS', name: 'Tata Motors', price: 867.40, change: 4.23 },
    { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', price: 1643.20, change: 3.91 },
    { symbol: 'WIPRO', name: 'Wipro Ltd', price: 524.85, change: 3.45 },
    { symbol: 'AXISBANK', name: 'Axis Bank', price: 1098.30, change: 2.87 },
];

export const topLosers = [
    { symbol: 'ONGC', name: 'ONGC Ltd', price: 246.30, change: -3.45 },
    { symbol: 'NTPC', name: 'NTPC Ltd', price: 364.15, change: -2.87 },
    { symbol: 'COALINDIA', name: 'Coal India Ltd', price: 456.80, change: -2.31 },
    { symbol: 'POWERGRID', name: 'Power Grid Corp', price: 312.40, change: -1.98 },
    { symbol: 'BAJAJFIN', name: 'Bajaj Finance', price: 6843.50, change: -1.52 },
];

export const aiRecommendations = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2847.30, trend: 'Up', recommendation: 'Buy', confidence: 87, risk: 'Low' },
    { symbol: 'TCS', name: 'Tata Consultancy Svc', price: 3921.55, trend: 'Up', recommendation: 'Hold', confidence: 72, risk: 'Low' },
    { symbol: 'INFY', name: 'Infosys Ltd', price: 1654.80, trend: 'Up', recommendation: 'Buy', confidence: 81, risk: 'Medium' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1723.40, trend: 'Down', recommendation: 'Hold', confidence: 65, risk: 'Medium' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 1089.60, trend: 'Up', recommendation: 'Buy', confidence: 78, risk: 'Low' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', price: 1432.25, trend: 'Down', recommendation: 'Sell', confidence: 70, risk: 'High' },
];

export const portfolioHoldings = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', qty: 10, buyPrice: 2600.00, currentPrice: 2847.30, sector: 'Energy' },
    { symbol: 'TCS', name: 'Tata Consultancy Svc', qty: 5, buyPrice: 3800.00, currentPrice: 3921.55, sector: 'IT' },
    { symbol: 'INFY', name: 'Infosys Ltd', qty: 15, buyPrice: 1720.00, currentPrice: 1654.80, sector: 'IT' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', qty: 8, buyPrice: 1600.00, currentPrice: 1723.40, sector: 'Banking' },
    { symbol: 'TATAMOTORS', name: 'Tata Motors', qty: 20, buyPrice: 820.00, currentPrice: 867.40, sector: 'Auto' },
    { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', qty: 12, buyPrice: 1580.00, currentPrice: 1643.20, sector: 'Pharma' },
    { symbol: 'WIPRO', name: 'Wipro Ltd', qty: 25, buyPrice: 490.00, currentPrice: 524.85, sector: 'IT' },
    { symbol: 'AXISBANK', name: 'Axis Bank', qty: 10, buyPrice: 1050.00, currentPrice: 1098.30, sector: 'Banking' },
];

export const sectorData = [
    { name: 'IT', value: 38, fill: '#3b82f6' },
    { name: 'Banking', value: 22, fill: '#7c3aed' },
    { name: 'Energy', value: 15, fill: '#10b981' },
    { name: 'Auto', value: 12, fill: '#f59e0b' },
    { name: 'Pharma', value: 9, fill: '#ef4444' },
    { name: 'Others', value: 4, fill: '#6b7fa3' },
];

// 30-day stock price history generator
function generateHistory(base, volatility = 0.02) {
    const data = [];
    let price = base;
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const change = (Math.random() - 0.48) * volatility * price;
        price = Math.max(price + change, base * 0.8);
        const ma20 = price * (1 + (Math.random() - 0.5) * 0.005);
        const ma50 = price * (1 + (Math.random() - 0.5) * 0.008);
        data.push({
            date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
            price: parseFloat(price.toFixed(2)),
            ma20: parseFloat(ma20.toFixed(2)),
            ma50: parseFloat(ma50.toFixed(2)),
        });
    }
    return data;
}

export const stocksForAnalysis = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2847.30, rsi: 58, trend: 'Uptrend', recommendation: 'Buy', confidence: 87, risk: 'Low', insight: 'Strong breakout above 200-day MA. RSI in healthy range. Volume surge confirms bullish momentum.' },
    { symbol: 'TCS', name: 'Tata Consultancy Svc', price: 3921.55, rsi: 64, trend: 'Uptrend', recommendation: 'Hold', confidence: 72, risk: 'Low', insight: 'Near resistance zone. RSI approaching overbought. Hold and wait for pullback before adding.' },
    { symbol: 'INFY', name: 'Infosys Ltd', price: 1654.80, rsi: 44, trend: 'Uptrend', recommendation: 'Buy', confidence: 81, risk: 'Medium', insight: 'RSI indicates mild oversold. Possible upward movement. Strong support at ₹1620 level.' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1723.40, rsi: 38, trend: 'Downtrend', recommendation: 'Hold', confidence: 65, risk: 'Medium', insight: 'Consolidation phase. RSI near oversold territory. Wait for RSI recovery above 40 before entry.' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 1089.60, rsi: 55, trend: 'Uptrend', recommendation: 'Buy', confidence: 78, risk: 'Low', insight: 'Consistent higher highs and higher lows. Banking sector momentum supports bullish outlook.' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 1432.25, rsi: 72, trend: 'Downtrend', recommendation: 'Sell', confidence: 70, risk: 'High', insight: 'RSI overbought at 72. Distribution pattern forming. High risk with current valuation metrics.' },
];

stocksForAnalysis.forEach(s => { s.history = generateHistory(s.price * 0.9); });

// Portfolio performance (3 months)
export const portfolioHistory = (() => {
    const data = [];
    const now = new Date();
    let value = 280000;
    for (let i = 89; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        value += (Math.random() - 0.45) * 3000;
        data.push({
            date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
            value: Math.round(value),
        });
    }
    return data;
})();
