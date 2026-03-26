# Milestone 4: Portfolio Monitoring and Alert Generation Module

## 1. Overview
The final cornerstone of the TradeSense AI Pipeline shifts focus from background data aggregation and machine learning calculations to the user-facing presentation layer. Milestone 4 details the React.js implementation of live portfolio tracking grids, interactive risk-assessment gauges, and data-driven alert mechanisms designed to cultivate objective, quantitative trading strategies.

---

## 2. Portfolio Tracking Functionality
To accurately monitor investments over time, the system renders active ledgers directly pulling from the `portfolio_holdings` backend endpoints:
1. **Dynamic Valuations:** The platform programmatically calculates the `Total Invested`, `Current Value`, and aggregate `P&L` metrics instantaneously upon loading the `/portfolio` route.
2. **Time-Series Charting:** Incorporating `Recharts.js`, the Tracking Module visualizes a 3-Month Trailing Performance Area Chart natively integrated with gradient fills, reflecting historical equity curves for immediate visual confirmation of long term trajectories.
3. **Sector Allocation:** Investments are segmented into Pie Charts highlighting exposure across standard indices (`Energy`, `Banking`, `IT`, `Pharma`). This enforces a unified monitoring perspective of portfolio breadth.

---

## 3. Implementation of Risk Analysis
A core requirement of AI-powered modeling is clearly displaying mathematically bounded risk, mitigating unforeseen drawdowns:
* **Individual Asset Risk (Micro Level):** During the data ingestion phase (`Milestone 2`), the Python Engine calculates rolling annualized standard deviation. The UI maps this explicitly to color-coded `<RiskBadge />` components (`Low Risk - Green`, `Medium Risk - Yellow`, `High Risk - Red`) attached to every specific stock on the platform.
* **Overall Portfolio Risk (Macro Level):** Displayed natively on the principal web dashboard, the `Portfolio Health Gauge` is a circular SVG scoring mechanism mathematically derived from asset diversification and aggregate open-position volatility. 

---

## 4. Smart Alert Mechanisms and Data Insights
Without proactive signals, raw indicators offer little strategic value. The system is designed to generate intelligent, passive alerts:
1. **Trend Reversal Alerts (RSI Gauges):** The system integrates a dynamic `RsiGauge` arc visualization mapped seamlessly to backend inputs. It visually triggers warnings whenever a stock breaches `>= 70` (Overbought / Distribution Zone) or `<= 30` (Oversold / Accumulation Zone).
2. **AI Recommendation Matrix:** The primary alert system manifests as bold, high-contrast action triggers (`BUY`, `HOLD`, `SELL`) sourced directly from the SQLite Machine Learning matrix. 
3. **Automated Trading Insights:** Accompanying each signal is an interpreted, human-readable text box (e.g., *"Strong breakout above 200-day MA. RSI in healthy range."*). These dynamic rationales act as instant justification for why an alert was triggered.

---

## 5. Reduction of Emotional Trading
The ultimate achievement of the Platform is creating an objective firewall against impulsive decisions:
* By synthesizing hundreds of complex technical inputs (like Moving Average lags and Volume thresholds) into an explicit, percentage-based **Confidence Metric** (e.g., `81% Confident - Buy`), human intuition is replaced with statistical probabilities.
* The explicit color coordination (Red = Distribution/Danger, Green = Accumulation/Opportunity, Blue = Neutral) ensures that a trader's immediate physiological reaction aligns exactly with the quantitative data.
* Through these mechanisms, the platform functionally achieves complete reduction of emotional trading cycles (Fear of Missing Out, Panicked Selling) through transparent, data-driven interfaces.
