import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './HeroSection.css';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero" id="hero-section">
      {/* Animated background elements */}
      <div className="hero-bg">
        <div className="hero-bg-orb hero-bg-orb-1" />
        <div className="hero-bg-orb hero-bg-orb-2" />
        <div className="hero-bg-orb hero-bg-orb-3" />
        <div className="hero-bg-orb hero-bg-orb-4" />
        <div className="hero-grid-pattern" />
      </div>

      <div className="container hero-content">
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Government of India Initiative
          </div>
          
          <h1 className="hero-title">
            Discover Research
            <br />
            Equipment Across
            <br />
            <span className="hero-title-accent">India</span>
          </h1>

          <p className="hero-description">
            A unified national platform connecting researchers, students, and startups 
            with cutting-edge scientific instruments across India's premier institutions 
            and laboratories.
          </p>

          <div className="hero-actions">
            <button 
              className="btn btn-primary btn-lg hero-btn-primary"
              onClick={() => navigate('/equipment')}
              id="hero-browse-btn"
            >
              <FiSearch size={18} />
              Browse Equipment
            </button>
            <button 
              className="btn btn-secondary btn-lg hero-btn-secondary"
              onClick={() => navigate('/register')}
              id="hero-register-btn"
            >
              Get Started
              <FiArrowRight size={18} />
            </button>
          </div>

          <div className="hero-trust">
            <span className="hero-trust-text">Trusted by</span>
            <div className="hero-trust-logos">
              <span className="hero-trust-item">IITs</span>
              <span className="hero-trust-item">IISc</span>
              <span className="hero-trust-item">CSIR</span>
              <span className="hero-trust-item">AIIMS</span>
              <span className="hero-trust-item">DRDO</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="hero-card hero-card-1 glass-card-dark">
            <div className="hero-card-icon">🔬</div>
            <div>
              <div className="hero-card-label">SEM Available</div>
              <div className="hero-card-sub">IIT Bombay</div>
            </div>
          </div>
          <div className="hero-card hero-card-2 glass-card-dark">
            <div className="hero-card-icon">🧬</div>
            <div>
              <div className="hero-card-label">Gene Sequencer</div>
              <div className="hero-card-sub">IGIB Delhi</div>
            </div>
          </div>
          <div className="hero-card hero-card-3 glass-card-dark">
            <div className="hero-card-icon">⚗️</div>
            <div>
              <div className="hero-card-label">NMR 500 MHz</div>
              <div className="hero-card-sub">IISc Bangalore</div>
            </div>
          </div>
          <div className="hero-illustration">
            <svg viewBox="0 0 400 400" className="hero-svg">
              <defs>
                <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.08" />
                </linearGradient>
                <radialGradient id="heroCenter" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="200" cy="200" r="185" fill="url(#heroGrad)" />
              <circle cx="200" cy="200" r="140" fill="url(#heroCenter)" />
              <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="1" strokeDasharray="8 6" className="hero-svg-rotate" />
              <circle cx="200" cy="200" r="95" fill="none" stroke="rgba(139,92,246,0.25)" strokeWidth="1" strokeDasharray="4 8" className="hero-svg-rotate-rev" />
              <circle cx="200" cy="200" r="50" fill="none" stroke="rgba(6,182,212,0.2)" strokeWidth="1" strokeDasharray="3 5" className="hero-svg-rotate" />
              <text x="200" y="192" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="52" fontWeight="800">🇮🇳</text>
              <text x="200" y="228" textAnchor="middle" fill="rgba(165,180,252,0.7)" fontSize="13" fontWeight="600" letterSpacing="1">EquipNet India</text>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
