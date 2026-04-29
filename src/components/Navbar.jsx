import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX, FiSearch, FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { MdScience } from 'react-icons/md';
import './Navbar.css';

export default function Navbar() {
  const { user, isAuthenticated, role, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMobile}>
          <div className="navbar-logo-icon">
            <MdScience size={24} />
          </div>
          <div className="navbar-logo-text">
            <span className="navbar-logo-title">EquipNet</span>
            <span className="navbar-logo-subtitle">India</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          <Link to="/" className="navbar-link" onClick={closeMobile}>Home</Link>
          <Link to="/equipment" className="navbar-link" onClick={closeMobile}>Equipment</Link>
          
          {isAuthenticated && (
            <Link to="/dashboard" className="navbar-link" onClick={closeMobile}>Dashboard</Link>
          )}
          
          {(role === 'Admin' || role === 'Institution') && (
            <Link to="/admin/add-equipment" className="navbar-link" onClick={closeMobile}>Add Equipment</Link>
          )}
          
          {role === 'Admin' && (
            <Link to="/admin" className="navbar-link" onClick={closeMobile}>Admin</Link>
          )}

          <Link to="/faq" className="navbar-link" onClick={closeMobile}>FAQ</Link>

          {/* Mobile-only auth buttons */}
          <div className="navbar-mobile-auth">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="btn btn-ghost" onClick={closeMobile}>Login</Link>
                <Link to="/register" className="btn btn-primary" onClick={closeMobile}>Register</Link>
              </>
            ) : (
              <button className="btn btn-ghost" onClick={handleLogout}>
                <FiLogOut /> Logout
              </button>
            )}
          </div>
        </div>

        {/* Desktop Auth */}
        <div className="navbar-actions">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </>
          ) : (
            <div className="navbar-user-menu">
              <button
                className="navbar-user-btn"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                id="user-menu-toggle"
              >
                <div className="avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="navbar-user-name">{user.name.split(' ')[0]}</span>
                <FiChevronDown size={14} />
              </button>
              
              {userMenuOpen && (
                <div className="navbar-dropdown" id="user-dropdown">
                  <div className="navbar-dropdown-header">
                    <strong>{user.name}</strong>
                    <span className="chip">{user.role}</span>
                  </div>
                  <div className="navbar-dropdown-divider" />
                  <Link to="/dashboard" className="navbar-dropdown-item" onClick={() => setUserMenuOpen(false)}>
                    <FiUser size={16} /> Dashboard
                  </Link>
                  <button className="navbar-dropdown-item" onClick={handleLogout}>
                    <FiLogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            className="navbar-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            id="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {mobileOpen && <div className="navbar-overlay" onClick={closeMobile} />}
    </nav>
  );
}
