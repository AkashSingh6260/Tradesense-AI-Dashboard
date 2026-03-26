const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to SQLite database', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Helper to query all
function queryAll(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

// Routes
// Root route for status check
app.get('/', (req, res) => {
    res.send('<h1>TradeSense AI Backend is Running 🚀</h1><p>Available endpoints: <ul><li><a href="/api/market-indices">/api/market-indices</a></li><li><a href="/api/top-gainers">/api/top-gainers</a></li><li><a href="/api/portfolio-holdings">/api/portfolio-holdings</a></li><li><a href="/api/ai-recommendations">/api/ai-recommendations</a></li></ul></p>');
});

app.get('/api/market-indices', async (req, res) => {
    try {
        const data = await queryAll('SELECT * FROM market_indices');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/top-gainers', async (req, res) => {
    try {
        const data = await queryAll('SELECT * FROM top_gainers');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/top-losers', async (req, res) => {
    try {
        const data = await queryAll('SELECT * FROM top_losers');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/ai-recommendations', async (req, res) => {
    try {
        const data = await queryAll('SELECT * FROM ai_recommendations');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/portfolio-holdings', async (req, res) => {
    try {
        const data = await queryAll('SELECT * FROM portfolio_holdings');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/stocks-analysis', async (req, res) => {
    try {
        const data = await queryAll('SELECT * FROM stocks_analysis');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend API running on http://localhost:${PORT}`);
});
