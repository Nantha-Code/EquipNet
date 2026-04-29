import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import StatsCounter from '../components/StatsCounter';
import HorizontalScroll from '../components/HorizontalScroll';
import EquipmentCard from '../components/EquipmentCard';
import { getEquipment } from '../services/api';
import { FiArrowRight, FiShield, FiZap, FiGlobe } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEquipment({ availability: 'Available' }).then(data => {
      setFeatured(data.slice(0, 10));
    });
  }, []);

  return (
    <div className="home-page" id="home-page">
      <HeroSection />
      <StatsCounter />

      {/* Featured Equipment */}
      <HorizontalScroll
        title="Featured Equipment"
        subtitle="Explore the most popular research instruments available across India"
      >
        {featured.map(item => (
          <EquipmentCard key={item.id} item={item} />
        ))}
      </HorizontalScroll>

      {/* How It Works */}
      <section className="how-it-works section" id="how-it-works">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="section-title">How EquipNet Works</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Access cutting-edge research equipment in just 4 simple steps
            </p>
          </div>
          <div className="steps-grid">
            {[
              { step: '01', title: 'Register', desc: 'Create your account as a Student, Startup, or Institution', icon: '📝' },
              { step: '02', title: 'Discover', desc: 'Browse and search equipment across India\'s top institutions', icon: '🔍' },
              { step: '03', title: 'Request', desc: 'Submit an access request with your research details', icon: '📋' },
              { step: '04', title: 'Access', desc: 'Get approved and use the equipment for your research', icon: '🔬' }
            ].map((item, i) => (
              <div key={i} className="step-card">
                <div className="step-number-wrapper">{item.step}</div>
                <div className="step-icon">{item.icon}</div>
                <h3 className="step-title">{item.title}</h3>
                <p className="step-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section section" id="features">
        <div className="container">
          <div className="features-grid">
            <div className="features-text">
              <h2 className="section-title">Why Choose EquipNet India?</h2>
              <p className="section-subtitle">
                A government-backed platform designed to democratize access to research infrastructure
              </p>
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon-wrapper">
                    <FiGlobe size={20} />
                  </div>
                  <div>
                    <h4>Pan-India Network</h4>
                    <p>Access equipment from 450+ institutions across 85+ cities</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon-wrapper">
                    <FiShield size={20} />
                  </div>
                  <div>
                    <h4>Government Verified</h4>
                    <p>All listed equipment and institutions are verified by the Ministry of S&T</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon-wrapper">
                    <FiZap size={20} />
                  </div>
                  <div>
                    <h4>Quick Access</h4>
                    <p>Streamlined request process with average approval time of 48 hours</p>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary btn-lg mt-6" onClick={() => navigate('/equipment')}>
                Explore Equipment <FiArrowRight />
              </button>
            </div>
            <div className="features-visual">
              <div className="features-stat-card glass-card">
                <div className="features-stat-number">98%</div>
                <div className="features-stat-label">Satisfaction Rate</div>
              </div>
              <div className="features-stat-card glass-card" style={{ animationDelay: '-2s' }}>
                <div className="features-stat-number">48h</div>
                <div className="features-stat-label">Avg Approval Time</div>
              </div>
              <div className="features-stat-card glass-card" style={{ animationDelay: '-4s' }}>
                <div className="features-stat-number">24/7</div>
                <div className="features-stat-label">Platform Access</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="cta">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to accelerate your research?</h2>
            <p>Join thousands of researchers across India who trust EquipNet for their equipment needs.</p>
            <div className="cta-actions">
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/register')}>
                Create Free Account
              </button>
              <button className="btn btn-ghost btn-lg" style={{ color: 'white' }} onClick={() => navigate('/equipment')}>
                Browse Equipment
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
