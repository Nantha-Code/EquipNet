import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEquipment } from '../context/EquipmentContext';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import Loader from '../components/Loader';
import { FiMapPin, FiCalendar, FiArrowLeft, FiSend } from 'react-icons/fi';
import { MdScience } from 'react-icons/md';
import './EquipmentDetailsPage.css';

export default function EquipmentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchSingleEquipment } = useEquipment();
  const { isAuthenticated } = useAuth();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchSingleEquipment(id)
      .then(data => setItem(data))
      .catch(() => navigate('/equipment'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader text="Loading equipment details..." />;
  if (!item) return null;

  return (
    <div className="equipment-details-page" id="equipment-details-page">
      <div className="container">
        <button className="btn btn-ghost mb-6" onClick={() => navigate(-1)}>
          <FiArrowLeft size={18} /> Back to Equipment
        </button>

        <div className="eqd-layout">
          {/* Image */}
          <div className="eqd-image-section">
            <div className="eqd-image-wrapper">
              {!imgError ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="eqd-image"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="eqd-image-placeholder">
                  <MdScience size={80} />
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="eqd-info">
            <div className="eqd-top">
              <div className="chip">{item.usageType}</div>
              <StatusBadge status={item.availabilityStatus} />
            </div>

            <h1 className="eqd-title">{item.name}</h1>

            <div className="eqd-meta">
              <div className="eqd-meta-item">
                <MdScience size={18} />
                <span>{item.institution}</span>
              </div>
              <div className="eqd-meta-item">
                <FiMapPin size={18} />
                <span>{item.location}</span>
              </div>
            </div>

            <div className="divider" />

            <h3 className="eqd-section-title">Description</h3>
            <p className="eqd-description">{item.description}</p>

            <div className="divider" />

            <h3 className="eqd-section-title">Equipment Specifications</h3>
            <div className="eqd-specs">
              <div className="eqd-spec-row">
                <span className="eqd-spec-label">Type</span>
                <span className="eqd-spec-value">{item.usageType}</span>
              </div>
              <div className="eqd-spec-row">
                <span className="eqd-spec-label">Location</span>
                <span className="eqd-spec-value">{item.location}</span>
              </div>
              <div className="eqd-spec-row">
                <span className="eqd-spec-label">Institution</span>
                <span className="eqd-spec-value">{item.institution}</span>
              </div>
              <div className="eqd-spec-row">
                <span className="eqd-spec-label">Availability</span>
                <span className="eqd-spec-value"><StatusBadge status={item.availabilityStatus} /></span>
              </div>
            </div>

            <div className="eqd-actions">
              {item.availabilityStatus === 'Available' ? (
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => {
                    if (isAuthenticated) {
                      navigate(`/request/${item.id}`);
                    } else {
                      navigate('/login');
                    }
                  }}
                  id="request-access-btn"
                >
                  <FiSend size={18} /> Request Access
                </button>
              ) : (
                <button className="btn btn-primary btn-lg" disabled style={{ opacity: 0.5 }}>
                  {item.availabilityStatus === 'Booked' ? 'Currently Booked' : 'Under Maintenance'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
