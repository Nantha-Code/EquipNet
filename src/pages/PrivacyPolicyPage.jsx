import React from 'react';
import './StaticPages.css';

export default function PrivacyPolicyPage() {
  return (
    <div className="static-page" id="privacy-page">
      <div className="static-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Last updated: April 2026</p>
        </div>
      </div>
      <div className="container static-content">
        <div className="static-card">
          <h2>1. Information We Collect</h2>
          <p>We collect personal information that you voluntarily provide when registering on the platform, including your name, email address, institutional affiliation, and role type.</p>
          <h2>2. How We Use Your Information</h2>
          <ul className="static-list">
            <li>To provide and maintain the EquipNet India platform</li>
            <li>To process equipment access requests</li>
            <li>To communicate with you about your requests and account</li>
            <li>To improve our platform and user experience</li>
            <li>To comply with legal obligations</li>
          </ul>
          <h2>3. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information. Data is encrypted in transit and at rest using industry-standard encryption protocols.</p>
          <h2>4. Data Sharing</h2>
          <p>Your personal information may be shared with equipment-hosting institutions solely for the purpose of processing your access requests. We do not sell personal data to third parties.</p>
          <h2>5. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. Contact us at privacy@equipnet.gov.in to exercise these rights.</p>
          <h2>6. Contact</h2>
          <p>For privacy-related concerns, contact the Data Protection Officer at dpo@equipnet.gov.in.</p>
        </div>
      </div>
    </div>
  );
}
