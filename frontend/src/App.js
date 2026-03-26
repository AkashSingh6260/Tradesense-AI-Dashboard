import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import MarketsPage from './pages/MarketsPage';
import PortfolioPage from './pages/PortfolioPage';
import WatchlistPage from './pages/WatchlistPage';
import StockAnalysisPage from './pages/StockAnalysisPage';

export default function App() {
    const location = useLocation();
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/markets" element={<MarketsPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/watchlist" element={<WatchlistPage />} />
                <Route path="/analysis" element={<StockAnalysisPage />} />
                {/* Catch-all */}
                <Route path="*" element={<LandingPage />} />
            </Routes>
        </>
    );
}
