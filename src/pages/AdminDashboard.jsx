import React, { useEffect, useState } from 'react';
import { getAllRequests, updateRequestStatus, getEquipment, deleteEquipment } from '../services/api';
import StatusBadge from '../components/StatusBadge';
import Loader from '../components/Loader';
import { FiClipboard, FiPackage, FiUsers, FiCheck, FiX, FiTrash2 } from 'react-icons/fi';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('requests');

  useEffect(() => {
    Promise.all([getAllRequests(), getEquipment()]).then(([reqs, equip]) => {
      setRequests(reqs);
      setEquipment(equip);
      setLoading(false);
    });
  }, []);

  const handleStatusChange = async (requestId, status) => {
    const updated = await updateRequestStatus(requestId, status);
    setRequests(prev => prev.map(r => r.id === requestId ? updated : r));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this equipment?')) return;
    await deleteEquipment(id);
    setEquipment(prev => prev.filter(e => e.id !== id));
  };

  if (loading) return <Loader text="Loading admin dashboard..." />;

  return (
    <div className="dashboard-page" id="admin-dashboard">
      <div className="container">
        <h1 className="dashboard-title">Admin Dashboard</h1>

        {/* Stats */}
        <div className="admin-stats-row">
          <div className="dashboard-stat-card">
            <FiPackage size={24} style={{ color: 'var(--color-blue-500)', marginBottom: 8 }} />
            <div className="dashboard-stat-value">{equipment.length}</div>
            <div className="dashboard-stat-label">Total Equipment</div>
          </div>
          <div className="dashboard-stat-card">
            <FiClipboard size={24} style={{ color: 'var(--color-purple-500)', marginBottom: 8 }} />
            <div className="dashboard-stat-value">{requests.length}</div>
            <div className="dashboard-stat-label">Total Requests</div>
          </div>
          <div className="dashboard-stat-card">
            <FiCheck size={24} style={{ color: 'var(--color-green-500)', marginBottom: 8 }} />
            <div className="dashboard-stat-value">{requests.filter(r => r.status === 'Pending').length}</div>
            <div className="dashboard-stat-label">Pending Approval</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button className={`tab ${activeTab === 'requests' ? 'active' : ''}`} onClick={() => setActiveTab('requests')}>
            <FiClipboard size={16} /> Requests ({requests.length})
          </button>
          <button className={`tab ${activeTab === 'equipment' ? 'active' : ''}`} onClick={() => setActiveTab('equipment')}>
            <FiPackage size={16} /> Equipment ({equipment.length})
          </button>
        </div>

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="dashboard-section">
            {requests.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📋</div>
                <div className="empty-state-title">No requests yet</div>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Equipment</th>
                      <th>Date</th>
                      <th>Purpose</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map(req => (
                      <tr key={req.id}>
                        <td>
                          <div><strong>{req.userName}</strong></div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-400)' }}>{req.userEmail}</div>
                        </td>
                        <td><strong>{req.equipmentName}</strong></td>
                        <td>{new Date(req.requestDate).toLocaleDateString('en-IN')}</td>
                        <td className="truncate-text">{req.purpose || '-'}</td>
                        <td><StatusBadge status={req.status} /></td>
                        <td>
                          {req.status === 'Pending' && (
                            <div className="admin-actions">
                              <button
                                className="btn btn-sm"
                                style={{ background: 'var(--color-green-500)', color: 'white' }}
                                onClick={() => handleStatusChange(req.id, 'Approved')}
                                title="Approve"
                              >
                                <FiCheck size={14} />
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleStatusChange(req.id, 'Rejected')}
                                title="Reject"
                              >
                                <FiX size={14} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Equipment Tab */}
        {activeTab === 'equipment' && (
          <div className="dashboard-section">
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Institution</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {equipment.map(eq => (
                    <tr key={eq.id}>
                      <td><strong>{eq.name}</strong></td>
                      <td>{eq.institution}</td>
                      <td>{eq.location}</td>
                      <td><span className="chip">{eq.usageType}</span></td>
                      <td><StatusBadge status={eq.availabilityStatus} /></td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(eq.id)}
                          title="Delete"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
