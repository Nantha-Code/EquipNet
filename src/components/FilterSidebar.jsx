import React from 'react';
import { FiFilter, FiX } from 'react-icons/fi';
import './FilterSidebar.css';

export default function FilterSidebar({ filters, filterOptions, onFilterChange, onClear }) {
  return (
    <aside className="filter-sidebar" id="filter-sidebar">
      <div className="filter-header">
        <h3 className="filter-title">
          <FiFilter size={18} /> Filters
        </h3>
        {(filters.location || filters.type || filters.availability) && (
          <button className="filter-clear-btn" onClick={onClear}>
            <FiX size={14} /> Clear All
          </button>
        )}
      </div>

      {/* Location */}
      <div className="filter-group">
        <label className="filter-label">Location</label>
        <select
          className="form-select"
          value={filters.location || ''}
          onChange={(e) => onFilterChange({ location: e.target.value })}
          id="filter-location"
        >
          <option value="">All Locations</option>
          {filterOptions.locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Type */}
      <div className="filter-group">
        <label className="filter-label">Equipment Type</label>
        <select
          className="form-select"
          value={filters.type || ''}
          onChange={(e) => onFilterChange({ type: e.target.value })}
          id="filter-type"
        >
          <option value="">All Types</option>
          {filterOptions.types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Availability */}
      <div className="filter-group">
        <label className="filter-label">Availability</label>
        <div className="filter-radio-group">
          <label className={`filter-radio ${!filters.availability ? 'active' : ''}`}>
            <input
              type="radio"
              name="availability"
              value=""
              checked={!filters.availability}
              onChange={(e) => onFilterChange({ availability: '' })}
            />
            <span className="filter-radio-dot" />
            All
          </label>
          {filterOptions.statuses.map(status => (
            <label key={status} className={`filter-radio ${filters.availability === status ? 'active' : ''}`}>
              <input
                type="radio"
                name="availability"
                value={status}
                checked={filters.availability === status}
                onChange={(e) => onFilterChange({ availability: e.target.value })}
              />
              <span className={`badge-dot badge-dot-${status.toLowerCase()}`} />
              {status}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
