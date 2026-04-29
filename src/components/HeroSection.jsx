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
                  <stop offset="0%" stopColor="#1a56db" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <circle cx="200" cy="200" r="180" fill="url(#heroGrad)" />
              <circle cx="200" cy="200" r="130" fill="none" stroke="rgba(26,86,219,0.15)" strokeWidth="1" strokeDasharray="8 6" className="hero-svg-rotate" />
              <circle cx="200" cy="200" r="80" fill="none" stroke="rgba(6,182,212,0.2)" strokeWidth="1" strokeDasharray="4 8" className="hero-svg-rotate-rev" />
              <text x="200" y="190" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="48" fontWeight="800">🇮🇳</text>
              <text x="200" y="230" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="14" fontWeight="500">EquipNet India</text>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
