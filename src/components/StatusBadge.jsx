import React from 'react';

export default function StatusBadge({ status }) {
  const statusMap = {
    'Available': 'badge-available',
    'Booked': 'badge-booked',
    'Maintenance': 'badge-maintenance',
    'Pending': 'badge-pending',
    'Approved': 'badge-approved',
    'Rejected': 'badge-rejected'
  };

  const className = statusMap[status] || 'badge-pending';

  return (
    <span className={`badge ${className}`}>
      <span className="badge-dot" />
      {status}
    </span>
  );
}
