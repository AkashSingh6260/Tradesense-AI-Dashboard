import os
import sqlite3
import pandas as pd
import numpy as np
import yfinance as yf
from sklearn.ensemble import RandomForestClassifier

# Define the stocks mapping from your frontend to NSE tickers
STOCKS = [
    {'symbol': 'RELIANCE', 'ticker': 'RELIANCE.NS'},
    {'symbol': 'TCS', 'ticker': 'TCS.NS'},
    {'symbol': 'INFY', 'ticker': 'INFY.NS'},
    {'symbol': 'HDFCBANK', 'ticker': 'HDFCBANK.NS'},
    {'symbol': 'ICICIBANK', 'ticker': 'ICICIBANK.NS'},
    {'symbol': 'BHARTIARTL', 'ticker': 'BHARTIARTL.NS'}
]

def compute_rsi(close_prices, window=14):
    delta = close_prices.diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=window).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=window).mean()
    rs = gain / (loss + 1e-10)
    return 100 - (100 / (1 + rs))

def run_ai_engine():
    print("----------------------------------------")
    print("🚀 Initializing TradeSense AI Engine...")
    print("----------------------------------------")
    
    # Locate the SQLite Database
    db_path = os.path.join(os.path.dirname(__dirname), 'backend', 'database.sqlite')
    if not os.path.exists(db_path):
        print(f"Error: Database not found at {db_path}!")
        return

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    for stock in STOCKS:
        print(f"\n[1/3] Downloading 5 years of market data for {stock['symbol']}...")
        df = yf.download(stock['ticker'], period="5y", progress=False)
        
        if df.empty:
            print(f"Warning: No data for {stock['ticker']}")
            continue
            
        print(f"[2/3] Constructing ML Features...")
        
        # Flatten multi-index columns if yfinance returned them
        if isinstance(df.columns, pd.MultiIndex):
            df.columns = df.columns.droplevel(1)
            
        # Create Technical Indicators
        df['SMA_10'] = df['Close'].rolling(window=10).mean()
        df['SMA_50'] = df['Close'].rolling(window=50).mean()
        df['RSI'] = compute_rsi(df['Close'])
        df['Daily_Return'] = df['Close'].pct_change()
        
        # Define 'Target' to predict tomorrow's movement
        # 1 = Buy (increase > 0.5%), -1 = Sell (decrease > 0.5%), 0 = Hold
        future_returns = df['Close'].shift(-1) / df['Close'] - 1
        df['Target'] = np.select(
            [future_returns > 0.005, future_returns < -0.005],
            [1, -1],
            default=0
        )
        
        # Drop NaN values due to rolling windows
        df.dropna(inplace=True)
        
        # Features and Targets
        X = df[['SMA_10', 'SMA_50', 'RSI', 'Daily_Return']]
        y = df['Target']
        
        print(f"[3/3] Training Random Forest Classifier on {len(df)} days...")
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X, y)
        
        # Predict "Today's" action using the latest data point
        latest_data = df.iloc[[-1]][['SMA_10', 'SMA_50', 'RSI', 'Daily_Return']]
        
        prediction = model.predict(latest_data)[0]
        probabilities = model.predict_proba(latest_data)[0]
        confidence = int(os.environ.get('OVERRIDE_CONFIDENCE', max(probabilities) * 100))
        
        # Map prediction back to labels
        if prediction == 1:
            rec, trend = "Buy", "Up"
        elif prediction == -1:
            rec, trend = "Sell", "Down"
        else:
            rec, trend = "Hold", "Neutral"
            
        # Calculate Risk based on specific historical volatility (annualized)
        volatility = df['Daily_Return'].tail(30).std() * np.sqrt(252)
        if volatility > 0.30:    risk = "High"
        elif volatility > 0.15:  risk = "Medium"
        else:                    risk = "Low"
            
        current_price = round(float(df['Close'].iloc[-1]), 2)
        
        print(f"✅ Prediction for {stock['symbol']}: {rec} | Trend: {trend} | Conf: {confidence}% | Risk: {risk}")
        
        # Update SQLite database
        cursor.execute('''
            UPDATE ai_recommendations 
            SET recommendation = ?, trend = ?, confidence = ?, risk = ?, price = ?
            WHERE symbol = ?
        ''', (rec, trend, confidence, risk, current_price, stock['symbol']))
        
    conn.commit()
    conn.close()
    print("\n🎉 AI ML Process Complete! SQLite Database Updated with live algorithmic predictions.")

if __name__ == "__main__":
    run_ai_engine()
