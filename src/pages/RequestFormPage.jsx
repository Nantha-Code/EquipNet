import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEquipment } from '../context/EquipmentContext';
import { submitRequest } from '../services/api';
import { FiArrowLeft, FiSend } from 'react-icons/fi';
import './RequestFormPage.css';

export default function RequestFormPage() {
  const { equipmentId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { fetchSingleEquipment } = useEquipment();
  const [equipment, setEquipment] = useState(null);
  const [form, setForm] = useState({ purpose: '', startDate: '', endDate: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchSingleEquipment(equipmentId).then(setEquipment).catch(() => navigate('/equipment'));
  }, [equipmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitRequest({
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        equipmentId: Number(equipmentId),
        equipmentName: equipment.name,
        ...form
      });
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      alert('Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  if (!equipment) return null;

  if (success) {
    return (
      <div className="request-success" id="request-success">
        <div className="request-success-card glass-card">
          <div className="request-success-icon">✅</div>
          <h2>Request Submitted!</h2>
          <p>Your access request for <strong>{equipment.name}</strong> has been submitted successfully. You'll be redirected to your dashboard shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="request-form-page" id="request-form-page">
      <div className="container">
        <button className="btn btn-ghost mb-6" onClick={() => navigate(-1)}>
          <FiArrowLeft size={18} /> Back
        </button>

        <div className="request-layout">
          <div className="request-form-section">
            <h1 className="request-title">Request Equipment Access</h1>
            <p className="request-subtitle">Fill in the details below to request access to this equipment</p>

            <form onSubmit={handleSubmit} className="request-form">
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input className="form-input" value={user.name} disabled />
              </div>
              <div className="form-group">
                <label className="form-label">Your Email</label>
                <input className="form-input" value={user.email} disabled />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="request-purpose">Purpose of Use *</label>
                <textarea
                  id="request-purpose"
                  className="form-textarea"
                  placeholder="Describe your research purpose and how you plan to use this equipment..."
                  value={form.purpose}
                  onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                  required
                />
              </div>
              <div className="request-dates">
                <div className="form-group">
                  <label className="form-label" htmlFor="request-start">Preferred Start Date *</label>
                  <input
                    type="date"
                    id="request-start"
                    className="form-input"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="request-end">Preferred End Date *</label>
                  <input
                    type="date"
                    id="request-end"
                    className="form-input"
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-full" disabled={loading} id="submit-request-btn">
                {loading ? 'Submitting...' : <><FiSend size={18} /> Submit Request</>}
              </button>
            </form>
          </div>

          <div className="request-summary">
            <div className="request-summary-card card">
              <div className="request-summary-image">
                <img src={equipment.image} alt={equipment.name} onError={(e) => e.target.style.display = 'none'} />
              </div>
              <div className="request-summary-body">
                <div className="chip">{equipment.usageType}</div>
                <h3>{equipment.name}</h3>
                <p>{equipment.institution}</p>
                <p className="request-summary-location">📍 {equipment.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
