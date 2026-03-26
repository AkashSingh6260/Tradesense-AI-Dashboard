# Requirement Analysis and System Architecture Design

## 1. Requirements Specifications

### 1.1 Functional Requirements
1. **Market Data Analysis:** The system must actively fetch, process, and store live historical financial data for major indices (e.g., NIFTY 50, SENSEX) and individual stock components to identify current market landscapes.
2. **Trend Detection:** The platform shall utilize technical indicators (Simple Moving Averages, Relative Strength Index) computed over large historical datasets to detect bullish (Uptrend) or bearish (Downtrend) momentum.
3. **Risk Assessment:** The system shall actively compute the statistical volatility and standard deviation of daily returns across a 30-day rolling window to classify assets into Low, Medium, or High-risk profiles.
4. **Trading Recommendations (Buy/Sell/Hold):** An integrated machine learning engine (Random Forest Classifier) must synthesize data and technical indicators to programmatically predict the future price movement, appending a definitive "Buy", "Hold", or "Sell" signal along with mathematical confidence levels.

### 1.2 Non-Functional Requirements
1. **System Reliability:** The architecture must ensure high availability and gracefully handle fail-safes (such as utilizing cached data from the SQLite database if live external APIs become rate-limited).
2. **Scalability:** The internal API Gateway and database should handle increasing concurrent data requests modularly without causing the React frontend to lag.
3. **Security:** User portfolios and system endpoints must be served over secure protocols, and the database should prevent unauthorized SQL injections during AI payload updates.
4. **Response Time:** The backend database should fulfill UI parameter requests (like Top Gainers, Losers, and Portfolios) in under 1-2 seconds, ensuring high-frequency live dashboard rendering.

---

## 2. Overall System Architecture Design

The **TradeSense AI Platform** utilizes a modern, resilient Software-as-a-Service layer connecting data ingestion arrays, intelligent machine learning models, and dynamic interfaces.

### 2.1 High-Level System Architecture
* **Data Sources (Ingestion Layer):** Integrations with robust market providers (e.g., Yahoo Finance) via localized Python scripts fetching 5+ years of live stock sequences.
* **AI Models (Analytics Layer):** A Python-hosted Machine Learning execution engine compiling technical metrics arrays (`SMA_10`, `SMA_50`, `RSI`) to train a continuous `RandomForestClassifier`.
* **Backend Services (Logic Layer):** A centralized `Node.js / Express` API gateway fetching and serving normalized structural data from a scalable `.sqlite` local database array.
* **User Interface (Presentation Layer):** A responsive, single-page application built on `React.js` interpreting dynamic Node.js endpoints strictly for visualizing Dashboards, AI Signals, and Virtual Data via reactive components.

### 2.2 System Architecture Diagram

```mermaid
graph TD
    subgraph Presentation Layer
        UI[React.js Frontend: Dashboard & Analysis]
    end

    subgraph Service Layer
        API[Node.js / Express Backend Server]
    end

    subgraph Intelligence & Data Layer
        DB[(SQLite Relational Database)]
        AI_Engine[Python Random Forest ML Engine]
    end

    subgraph External Sources
        Yahoo_Finance[Yahoo Finance / Live API Feeds]
    end
    
    UI <-->|Fetches JSON Data Metrics| API
    API <-->|SQL Queries (Portfolios/Recommendations)| DB
    AI_Engine -->|Injects Predicted ML Outcomes| DB
    AI_Engine -->|Downloads Historic/Live OHLC Data| Yahoo_Finance
```

---

## 3. Preparation of Use-Case and Data Flow Diagrams

### 3.1 Use-Case Diagram
Illustrates the interaction between the primary roles (Traders and Autonomous Systems) and the features of the AI platform.

```mermaid
usecase Diagram
actor Trader as "Trader"
actor AIEngine as "AI ML Engine"

package "TradeSense AI System" {
    usecase UC1 as "View Live Market Dashboard"
    usecase UC2 as "Receive Automated Trading Recommendations"
    usecase UC3 as "Track Portfolio & P&L"
    usecase UC4 as "Analyze Risk and Trends"
}

Trader --> UC1
Trader --> UC3
Trader --> UC4

AIEngine --> UC2 : <<Calculates Probability & Signal>>
AIEngine --> UC4 : <<Updates System Trend Matrices>>
Trader --> UC2 : <<Consumes Recommended Signals>>
```

### 3.2 Data Flow Diagram (DFD Level 1)
Details how data payloads transform across boundaries, beginning from market sources down to the visual charts.

```mermaid
graph LR
    Source([Live Market Data API]) -->|1. Historical Ohlc Data| MLNode[Python Data Processing & ML Script]
    
    MLNode -->|2. Compute RSI/SMA & Train Model| Predict[Prediction Generation]
    Predict -->|3. Store Buy/Sell & Confidence| Database[(SQLite Data Store)]
    
    User([End User]) -->|4. Requests Dashboard View| ExpressNode[Node.js Express Server]
    ExpressNode -->|5. Query AI Results & Metrics| Database
    Database -->|6. Return Structured DB Rows| ExpressNode
    
    ExpressNode -->|7. Serve Payload (Over Port 5000)| ReactUI[React.js Engine]
    ReactUI -->|8. Render Dashboard Charts & Badges| User
```
