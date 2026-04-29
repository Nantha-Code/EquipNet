import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { MdScience } from 'react-icons/md';
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      navigate(user.role === 'Admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" id="login-page">
      <div className="auth-container">
        <div className="auth-card glass-card">
          <div className="auth-header">
            <div className="auth-logo">
              <div className="navbar-logo-icon">
                <MdScience size={24} />
              </div>
            </div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to access EquipNet India</p>
          </div>

          {error && (
            <div className="auth-error" id="login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">Email</label>
              <div className="auth-input-wrapper">
                <FiMail className="auth-input-icon" size={18} />
                <input
                  type="email"
                  id="login-email"
                  className="form-input auth-input"
                  placeholder="you@institution.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="login-password">Password</label>
              <div className="auth-input-wrapper">
                <FiLock className="auth-input-icon" size={18} />
                <input
                  type="password"
                  id="login-password"
                  className="form-input auth-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg w-full"
              disabled={loading}
              id="login-submit"
            >
              {loading ? 'Signing in...' : <><FiLogIn size={18} /> Sign In</>}
            </button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Create one</Link></p>
          </div>

          {/* Demo credentials */}
          <div className="auth-demo">
            <p className="auth-demo-title">Demo Credentials</p>
            <div className="auth-demo-grid">
              <button className="auth-demo-item" onClick={() => { setEmail('admin@equipnet.in'); setPassword('admin123'); }}>
                <strong>Admin</strong>
                <span>admin@equipnet.in</span>
              </button>
              <button className="auth-demo-item" onClick={() => { setEmail('priya@iitb.ac.in'); setPassword('student123'); }}>
                <strong>Student</strong>
                <span>priya@iitb.ac.in</span>
              </button>
              <button className="auth-demo-item" onClick={() => { setEmail('ramesh@iisc.ac.in'); setPassword('inst123'); }}>
                <strong>Institution</strong>
                <span>ramesh@iisc.ac.in</span>
              </button>
              <button className="auth-demo-item" onClick={() => { setEmail('contact@nanotechsol.in'); setPassword('startup123'); }}>
                <strong>Startup</strong>
                <span>contact@nanotechsol.in</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
