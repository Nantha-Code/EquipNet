import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEquipment } from '../context/EquipmentContext';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import './AddEquipmentPage.css';

export default function AddEquipmentPage() {
  const navigate = useNavigate();
  const { addEquipment } = useEquipment();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', description: '', institution: '', location: '',
    usageType: '', image: '', availabilityStatus: 'Available'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addEquipment(form);
      navigate('/admin');
    } catch (err) {
      alert('Failed to add equipment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-equipment-page" id="add-equipment-page">
      <div className="container">
        <button className="btn btn-ghost mb-6" onClick={() => navigate(-1)}>
          <FiArrowLeft size={18} /> Back
        </button>
        <div className="add-eq-card glass-card">
          <h1 className="add-eq-title">Add New Equipment</h1>
          <p className="add-eq-subtitle">List research equipment on the EquipNet platform</p>
          <form onSubmit={handleSubmit} className="add-eq-form">
            <div className="form-group">
              <label className="form-label">Equipment Name *</label>
              <input name="name" className="form-input" placeholder="e.g. Scanning Electron Microscope" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea name="description" className="form-textarea" placeholder="Detailed description..." value={form.description} onChange={handleChange} required />
            </div>
            <div className="add-eq-row">
              <div className="form-group">
                <label className="form-label">Institution *</label>
                <input name="institution" className="form-input" placeholder="e.g. IIT Bombay" value={form.institution} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Location *</label>
                <input name="location" className="form-input" placeholder="e.g. Mumbai" value={form.location} onChange={handleChange} required />
              </div>
            </div>
            <div className="add-eq-row">
              <div className="form-group">
                <label className="form-label">Usage Type *</label>
                <input name="usageType" className="form-input" placeholder="e.g. Microscopy" value={form.usageType} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Availability</label>
                <select name="availabilityStatus" className="form-select" value={form.availabilityStatus} onChange={handleChange}>
                  <option value="Available">Available</option>
                  <option value="Booked">Booked</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Image URL</label>
              <input name="image" className="form-input" placeholder="https://..." value={form.image} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary btn-lg w-full" disabled={loading} id="add-equipment-submit">
              {loading ? 'Adding...' : <><FiPlus size={18} /> Add Equipment</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
