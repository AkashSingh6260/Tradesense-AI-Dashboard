import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Bell, Menu, X, TrendingUp, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/markets', label: 'Markets' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/watchlist', label: 'Watchlist' },
    { to: '/analysis', label: 'Analysis' },
];

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const isLanding = location.pathname === '/';

    return (
        <nav className={`navbar ${isLanding ? 'navbar-transparent' : ''}`}>
            <div className="navbar-inner">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <div className="logo-icon">
                        <Zap size={18} fill="currentColor" />
                    </div>
                    <span className="logo-text">
                        Trade<span className="logo-accent">Sense</span>
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                {!isLanding && (
                    <ul className="navbar-links">
                        {navLinks.map(link => (
                            <li key={link.to}>
                                <Link
                                    to={link.to}
                                    className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Right Controls */}
                <div className="navbar-controls">
                    {/* Notification Bell */}
                    <button className="icon-btn notif-btn" title="Notifications">
                        <Bell size={18} />
                        <span className="notif-dot" />
                    </button>

                    {/* Theme Toggle */}
                    <button className="icon-btn theme-btn" onClick={toggleTheme} title="Toggle theme">
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {/* Landing CTA */}
                    {isLanding && (
                        <Link to="/dashboard" className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                            Open App
                        </Link>
                    )}

                    {/* Hamburger */}
                    {!isLanding && (
                        <button className="icon-btn hamburger" onClick={() => setMenuOpen(o => !o)}>
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && !isLanding && (
                <div className="mobile-menu">
                    {navLinks.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`mobile-link ${location.pathname === link.to ? 'active' : ''}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
