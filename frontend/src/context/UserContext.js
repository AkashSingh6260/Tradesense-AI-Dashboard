import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const defaultWatchlist = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2847.30, change: 1.23, signal: 'Buy' },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3921.55, change: -0.45, signal: 'Hold' },
    { symbol: 'INFY', name: 'Infosys Ltd', price: 1654.80, change: 2.10, signal: 'Buy' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1723.40, change: -1.05, signal: 'Hold' },
    { symbol: 'ITC', name: 'ITC Ltd', price: 456.90, change: 0.80, signal: 'Sell' },
];

export function UserProvider({ children }) {
    const [watchlist, setWatchlist] = useState(defaultWatchlist);

    const addToWatchlist = (stock) => {
        if (!watchlist.find(s => s.symbol === stock.symbol)) {
            setWatchlist(prev => [...prev, stock]);
        }
    };

    const removeFromWatchlist = (symbol) => {
        setWatchlist(prev => prev.filter(s => s.symbol !== symbol));
    };

    return (
        <UserContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
