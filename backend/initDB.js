const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('Initializing database...');

const marketIndices = [
    { name: 'NIFTY 50', value: 22486.35, change: 143.20, changePct: 0.64, high: 22541.00, low: 22310.00 },
    { name: 'SENSEX', value: 74119.45, change: 489.32, changePct: 0.66, high: 74289.00, low: 73601.00 },
    { name: 'NIFTY Bank', value: 47832.60, change: -215.40, changePct: -0.45, high: 48150.00, low: 47680.00 },
    { name: 'NIFTY IT', value: 36214.80, change: 521.70, changePct: 1.46, high: 36380.00, low: 35920.00 },
];

const topGainers = [
    { symbol: 'ADANIENT', name: 'Adani Enterprises', price: 2456.75, change: 5.80 },
    { symbol: 'TATAMOTORS', name: 'Tata Motors', price: 867.40, change: 4.23 },
    { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', price: 1643.20, change: 3.91 },
    { symbol: 'WIPRO', name: 'Wipro Ltd', price: 524.85, change: 3.45 },
    { symbol: 'AXISBANK', name: 'Axis Bank', price: 1098.30, change: 2.87 },
];

const topLosers = [
    { symbol: 'ONGC', name: 'ONGC Ltd', price: 246.30, change: -3.45 },
    { symbol: 'NTPC', name: 'NTPC Ltd', price: 364.15, change: -2.87 },
    { symbol: 'COALINDIA', name: 'Coal India Ltd', price: 456.80, change: -2.31 },
    { symbol: 'POWERGRID', name: 'Power Grid Corp', price: 312.40, change: -1.98 },
    { symbol: 'BAJAJFIN', name: 'Bajaj Finance', price: 6843.50, change: -1.52 },
];

const aiRecommendations = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2847.30, trend: 'Up', recommendation: 'Buy', confidence: 87, risk: 'Low' },
    { symbol: 'TCS', name: 'Tata Consultancy Svc', price: 3921.55, trend: 'Up', recommendation: 'Hold', confidence: 72, risk: 'Low' },
    { symbol: 'INFY', name: 'Infosys Ltd', price: 1654.80, trend: 'Up', recommendation: 'Buy', confidence: 81, risk: 'Medium' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1723.40, trend: 'Down', recommendation: 'Hold', confidence: 65, risk: 'Medium' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 1089.60, trend: 'Up', recommendation: 'Buy', confidence: 78, risk: 'Low' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', price: 1432.25, trend: 'Down', recommendation: 'Sell', confidence: 70, risk: 'High' },
];

const portfolioHoldings = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', qty: 10, buyPrice: 2600.00, currentPrice: 2847.30, sector: 'Energy' },
    { symbol: 'TCS', name: 'Tata Consultancy Svc', qty: 5, buyPrice: 3800.00, currentPrice: 3921.55, sector: 'IT' },
    { symbol: 'INFY', name: 'Infosys Ltd', qty: 15, buyPrice: 1720.00, currentPrice: 1654.80, sector: 'IT' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', qty: 8, buyPrice: 1600.00, currentPrice: 1723.40, sector: 'Banking' },
    { symbol: 'TATAMOTORS', name: 'Tata Motors', qty: 20, buyPrice: 820.00, currentPrice: 867.40, sector: 'Auto' },
    { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', qty: 12, buyPrice: 1580.00, currentPrice: 1643.20, sector: 'Pharma' },
    { symbol: 'WIPRO', name: 'Wipro Ltd', qty: 25, buyPrice: 490.00, currentPrice: 524.85, sector: 'IT' },
    { symbol: 'AXISBANK', name: 'Axis Bank', qty: 10, buyPrice: 1050.00, currentPrice: 1098.30, sector: 'Banking' },
];

const stocksForAnalysis = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2847.30, rsi: 58, trend: 'Uptrend', recommendation: 'Buy', confidence: 87, risk: 'Low', insight: 'Strong breakout above 200-day MA. RSI in healthy range. Volume surge confirms bullish momentum.' },
    { symbol: 'TCS', name: 'Tata Consultancy Svc', price: 3921.55, rsi: 64, trend: 'Uptrend', recommendation: 'Hold', confidence: 72, risk: 'Low', insight: 'Near resistance zone. RSI approaching overbought. Hold and wait for pullback before adding.' },
    { symbol: 'INFY', name: 'Infosys Ltd', price: 1654.80, rsi: 44, trend: 'Uptrend', recommendation: 'Buy', confidence: 81, risk: 'Medium', insight: 'RSI indicates mild oversold. Possible upward movement. Strong support at ₹1620 level.' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1723.40, rsi: 38, trend: 'Downtrend', recommendation: 'Hold', confidence: 65, risk: 'Medium', insight: 'Consolidation phase. RSI near oversold territory. Wait for RSI recovery above 40 before entry.' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 1089.60, rsi: 55, trend: 'Uptrend', recommendation: 'Buy', confidence: 78, risk: 'Low', insight: 'Consistent higher highs and higher lows. Banking sector momentum supports bullish outlook.' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 1432.25, rsi: 72, trend: 'Downtrend', recommendation: 'Sell', confidence: 70, risk: 'High', insight: 'RSI overbought at 72. Distribution pattern forming. High risk with current valuation metrics.' },
];

db.serialize(() => {
    // Drop existing tables
    db.run('DROP TABLE IF EXISTS market_indices');
    db.run('DROP TABLE IF EXISTS top_gainers');
    db.run('DROP TABLE IF EXISTS top_losers');
    db.run('DROP TABLE IF EXISTS ai_recommendations');
    db.run('DROP TABLE IF EXISTS portfolio_holdings');
    db.run('DROP TABLE IF EXISTS stocks_analysis');

    // Create tables
    db.run('CREATE TABLE market_indices (id INTEGER PRIMARY KEY, name TEXT, value REAL, change REAL, changePct REAL, high REAL, low REAL)');
    db.run('CREATE TABLE top_gainers (id INTEGER PRIMARY KEY, symbol TEXT, name TEXT, price REAL, change REAL)');
    db.run('CREATE TABLE top_losers (id INTEGER PRIMARY KEY, symbol TEXT, name TEXT, price REAL, change REAL)');
    db.run('CREATE TABLE ai_recommendations (id INTEGER PRIMARY KEY, symbol TEXT, name TEXT, price REAL, trend TEXT, recommendation TEXT, confidence INTEGER, risk TEXT)');
    db.run('CREATE TABLE portfolio_holdings (id INTEGER PRIMARY KEY, symbol TEXT, name TEXT, qty INTEGER, buyPrice REAL, currentPrice REAL, sector TEXT)');
    db.run('CREATE TABLE stocks_analysis (id INTEGER PRIMARY KEY, symbol TEXT, name TEXT, price REAL, rsi INTEGER, trend TEXT, recommendation TEXT, confidence INTEGER, risk TEXT, insight TEXT)');

    // Insert data using prepared statements
    const stmt1 = db.prepare('INSERT INTO market_indices (name, value, change, changePct, high, low) VALUES (?, ?, ?, ?, ?, ?)');
    marketIndices.forEach(item => stmt1.run(item.name, item.value, item.change, item.changePct, item.high, item.low));
    stmt1.finalize();

    const stmt2 = db.prepare('INSERT INTO top_gainers (symbol, name, price, change) VALUES (?, ?, ?, ?)');
    topGainers.forEach(item => stmt2.run(item.symbol, item.name, item.price, item.change));
    stmt2.finalize();

    const stmt3 = db.prepare('INSERT INTO top_losers (symbol, name, price, change) VALUES (?, ?, ?, ?)');
    topLosers.forEach(item => stmt3.run(item.symbol, item.name, item.price, item.change));
    stmt3.finalize();

    const stmt4 = db.prepare('INSERT INTO ai_recommendations (symbol, name, price, trend, recommendation, confidence, risk) VALUES (?, ?, ?, ?, ?, ?, ?)');
    aiRecommendations.forEach(item => stmt4.run(item.symbol, item.name, item.price, item.trend, item.recommendation, item.confidence, item.risk));
    stmt4.finalize();

    const stmt5 = db.prepare('INSERT INTO portfolio_holdings (symbol, name, qty, buyPrice, currentPrice, sector) VALUES (?, ?, ?, ?, ?, ?)');
    portfolioHoldings.forEach(item => stmt5.run(item.symbol, item.name, item.qty, item.buyPrice, item.currentPrice, item.sector));
    stmt5.finalize();

    const stmt6 = db.prepare('INSERT INTO stocks_analysis (symbol, name, price, rsi, trend, recommendation, confidence, risk, insight) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    stocksForAnalysis.forEach(item => stmt6.run(item.symbol, item.name, item.price, item.rsi, item.trend, item.recommendation, item.confidence, item.risk, item.insight));
    stmt6.finalize();

    console.log('Database seeded successfully.');
});

db.close();
