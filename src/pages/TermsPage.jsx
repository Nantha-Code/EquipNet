import React from 'react';
import './StaticPages.css';

export default function TermsPage() {
  return (
    <div className="static-page" id="terms-page">
      <div className="static-hero">
        <div className="container">
          <h1>Terms of Service</h1>
          <p>Last updated: April 2026</p>
        </div>
      </div>
      <div className="container static-content">
        <div className="static-card">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using the EquipNet India platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          <h2>2. User Accounts</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate and complete information during registration.</p>
          <h2>3. Equipment Access</h2>
          <ul className="static-list">
            <li>Equipment access is subject to approval by the hosting institution</li>
            <li>Users must follow all safety protocols and guidelines</li>
            <li>Equipment must be used only for the stated research purpose</li>
            <li>Any damage to equipment must be reported immediately</li>
          </ul>
          <h2>4. Prohibited Activities</h2>
          <p>Users may not misuse equipment, provide false information, or use the platform for commercial purposes without authorization.</p>
          <h2>5. Limitation of Liability</h2>
          <p>EquipNet India serves as a discovery and access platform. We are not liable for equipment performance, availability changes, or institutional decisions.</p>
          <h2>6. Governing Law</h2>
          <p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in New Delhi.</p>
        </div>
      </div>
    </div>
  );
}
