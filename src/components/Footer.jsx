import React from 'react';
import { Link } from 'react-router-dom';
import { MdScience } from 'react-icons/md';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="main-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="navbar-logo-icon">
                <MdScience size={20} />
              </div>
              <div>
                <div className="navbar-logo-title" style={{ color: 'white', fontSize: '1.1rem' }}>EquipNet</div>
                <div className="navbar-logo-subtitle" style={{ color: 'var(--color-cyan-400)' }}>India</div>
              </div>
            </div>
            <p className="footer-desc">
              A national-level platform enabling researchers, students, and startups 
              to discover and access research equipment across India's premier institutions.
            </p>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <FiMail size={14} /> support@equipnet.gov.in
              </div>
              <div className="footer-contact-item">
                <FiPhone size={14} /> 1800-XXX-XXXX (Toll Free)
              </div>
              <div className="footer-contact-item">
                <FiMapPin size={14} /> New Delhi, India
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/equipment" className="footer-link">Browse Equipment</Link>
            <Link to="/register" className="footer-link">Register</Link>
            <Link to="/login" className="footer-link">Login</Link>
            <Link to="/faq" className="footer-link">FAQ</Link>
          </div>

          {/* Resources */}
          <div className="footer-section">
            <h4 className="footer-heading">Resources</h4>
            <Link to="/grievances" className="footer-link">Grievances</Link>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
            <a href="https://dst.gov.in" target="_blank" rel="noopener noreferrer" className="footer-link">
              Dept. of Science & Tech
            </a>
          </div>

          {/* For Institutions */}
          <div className="footer-section">
            <h4 className="footer-heading">For Institutions</h4>
            <Link to="/register" className="footer-link">Register Institution</Link>
            <Link to="/admin/add-equipment" className="footer-link">List Equipment</Link>
            <Link to="/dashboard" className="footer-link">Manage Requests</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <p>© {new Date().getFullYear()} EquipNet India. An initiative under the Ministry of Science & Technology, Government of India.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/grievances">Grievances</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
