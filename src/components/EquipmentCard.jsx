import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiArrowRight } from 'react-icons/fi';
import { MdScience } from 'react-icons/md';
import StatusBadge from './StatusBadge';
import './EquipmentCard.css';

export default function EquipmentCard({ item }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link to={`/equipment/${item.id}`} className="equipment-card glass-card" id={`equipment-card-${item.id}`}>
      <div className="equipment-card-image">
        {!imgError ? (
          <img
            src={item.image}
            alt={item.name}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="equipment-card-placeholder">
            <MdScience size={48} />
          </div>
        )}
        <div className="equipment-card-badge">
          <StatusBadge status={item.availabilityStatus} />
        </div>
      </div>
      <div className="equipment-card-body">
        <div className="equipment-card-type chip">{item.usageType}</div>
        <h3 className="equipment-card-title">{item.name}</h3>
        <p className="equipment-card-institution">{item.institution}</p>
        <div className="equipment-card-footer">
          <span className="equipment-card-location">
            <FiMapPin size={14} /> {item.location}
          </span>
          <span className="equipment-card-arrow">
            View Details <FiArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
