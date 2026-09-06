import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/', altPath: '/index.html' },
  { label: 'Colleges', path: '/colleges', altPath: '/colleges.html' },
  { label: 'NIRF Rankings', path: '/rankings', altPath: '/rankings.html' },
  { label: 'Find My College', path: '/find', altPath: '/find.html' },
  { label: 'Compare', path: '/compare', altPath: '/compare.html' },
  { label: 'Shortlist', path: '/shortlist', altPath: '/shortlist.html' },
  { label: 'Roadmap', path: '/roadmap', altPath: '/roadmap.html' },
  { label: 'Scholarships', path: '/scholarships', altPath: '/scholarships.html' },
];

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path, altPath) => {
    if (path === '/' && (currentPath === '/' || currentPath === '/index.html' || currentPath === '')) {
      return true;
    }
    return currentPath === path || currentPath === altPath;
  };

  return (
    <header className="navbar">
      <Link className="logo" to="/" aria-label="NIPATH home">
        <img src="/nipath-logo.png" alt="NIPATH - Find Your Right Path" />
      </Link>
      <nav className="nav-links">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={isActive(item.path, item.altPath) ? 'active' : ''}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="nav-actions">
        <Link className="btn login-btn" to="/dashboard">
          Login / Sign Up
        </Link>
        <Link className="btn premium-nav-btn" to="/payment">
          Get Premium
        </Link>
      </div>
    </header>
  );
}
