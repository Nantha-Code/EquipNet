import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserRequests } from '../services/api';
import StatusBadge from '../components/StatusBadge';
import Loader from '../components/Loader';
import { QRCodeSVG } from 'qrcode.react';
import { FiUser, FiMail, FiBriefcase, FiClipboard, FiCalendar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './UserDashboard.css';

export default function UserDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserRequests(user.id).then(data => {
      setRequests(data);
      setLoading(false);
    });
  }, [user.id]);

  return (
    <div className="dashboard-page" id="user-dashboard">
      <div className="container">
        <h1 className="dashboard-title">My Dashboard</h1>

        <div className="dashboard-layout">
          {/* Profile Card */}
          <div className="dashboard-sidebar">
            <div className="profile-card glass-card">
              <div className="avatar avatar-lg" style={{ margin: '0 auto var(--space-4)' }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="profile-name">{user.name}</h3>
              <span className="chip" style={{ margin: '0 auto' }}>{user.role}</span>
              
              <div className="profile-info">
                <div className="profile-info-item">
                  <FiMail size={16} /> {user.email}
                </div>
                {user.institution && (
                  <div className="profile-info-item">
                    <FiBriefcase size={16} /> {user.institution}
                  </div>
                )}
              </div>

              <div className="divider" />

              {/* QR Code */}
              <div className="profile-qr">
                <p className="profile-qr-label">Your EquipNet QR Code</p>
                <div className="profile-qr-wrapper">
                  <QRCodeSVG
                    value={JSON.stringify({ userId: user.id, name: user.name, email: user.email, role: user.role })}
                    size={140}
                    bgColor="transparent"
                    fgColor="#1a56db"
                    level="M"
                  />
                </div>
                <p className="profile-qr-hint">Show this QR at the equipment facility</p>
              </div>
            </div>
          </div>

          {/* Requests */}
          <div className="dashboard-main">
            <div className="dashboard-stats-row">
              <div className="dashboard-stat-card">
                <div className="dashboard-stat-value">{requests.length}</div>
                <div className="dashboard-stat-label">Total Requests</div>
              </div>
              <div className="dashboard-stat-card">
                <div className="dashboard-stat-value">{requests.filter(r => r.status === 'Pending').length}</div>
                <div className="dashboard-stat-label">Pending</div>
              </div>
              <div className="dashboard-stat-card">
                <div className="dashboard-stat-value">{requests.filter(r => r.status === 'Approved').length}</div>
                <div className="dashboard-stat-label">Approved</div>
              </div>
            </div>

            <div className="dashboard-section">
              <h2 className="dashboard-section-title">
                <FiClipboard size={20} /> My Requests
              </h2>

              {loading ? (
                <Loader size="sm" text="Loading requests..." />
              ) : requests.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">📋</div>
                  <div className="empty-state-title">No requests yet</div>
                  <div className="empty-state-desc">
                    Browse equipment and submit your first access request.
                  </div>
                  <Link to="/equipment" className="btn btn-primary mt-4">Browse Equipment</Link>
                </div>
              ) : (
                <div className="table-wrapper">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Equipment</th>
                        <th>Date</th>
                        <th>Purpose</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map(req => (
                        <tr key={req.id}>
                          <td><strong>{req.equipmentName}</strong></td>
                          <td>{new Date(req.requestDate).toLocaleDateString('en-IN')}</td>
                          <td className="truncate-text">{req.purpose || '-'}</td>
                          <td><StatusBadge status={req.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
