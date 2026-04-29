import React from 'react';
import './StaticPages.css';

export default function GrievancesPage() {
  return (
    <div className="static-page" id="grievances-page">
      <div className="static-hero">
        <div className="container">
          <h1>Grievance Redressal</h1>
          <p>We are committed to resolving your concerns promptly and transparently</p>
        </div>
      </div>
      <div className="container static-content">
        <div className="static-card">
          <h2>How to File a Grievance</h2>
          <p>If you have any issues with equipment access, booking, or platform services, you can raise a grievance through the following channels:</p>
          <ol className="static-list">
            <li><strong>Email:</strong> grievance@equipnet.gov.in</li>
            <li><strong>Toll-Free Number:</strong> 1800-XXX-XXXX (Mon-Fri, 9 AM - 6 PM)</li>
            <li><strong>Online Form:</strong> Submit via your dashboard under "Support"</li>
            <li><strong>Post:</strong> Grievance Cell, EquipNet India, Technology Bhawan, New Delhi - 110016</li>
          </ol>
          <h2>Resolution Timeline</h2>
          <div className="static-table">
            <table className="table">
              <thead><tr><th>Category</th><th>Resolution Time</th></tr></thead>
              <tbody>
                <tr><td>Account Issues</td><td>24 hours</td></tr>
                <tr><td>Booking Disputes</td><td>3-5 working days</td></tr>
                <tr><td>Equipment Access</td><td>5-7 working days</td></tr>
                <tr><td>Technical Issues</td><td>48 hours</td></tr>
              </tbody>
            </table>
          </div>
          <h2>Grievance Officer</h2>
          <p><strong>Dr. Meera Patel</strong><br/>Grievance Redressal Officer<br/>Email: meera.patel@equipnet.gov.in<br/>Phone: +91-11-XXXX-XXXX</p>
        </div>
      </div>
    </div>
  );
}
