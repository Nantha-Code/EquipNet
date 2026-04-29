import React, { useEffect } from 'react';
import { useEquipment } from '../context/EquipmentContext';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import EquipmentCard from '../components/EquipmentCard';
import Loader from '../components/Loader';
import { FiPackage } from 'react-icons/fi';
import './EquipmentListPage.css';

export default function EquipmentListPage() {
  const {
    equipment, filters, filterOptions, loading,
    fetchEquipment, updateFilters, clearFilters
  } = useEquipment();

  useEffect(() => {
    fetchEquipment(filters);
  }, [filters]);

  return (
    <div className="equipment-list-page" id="equipment-list-page">
      <div className="container">
        {/* Header */}
        <div className="eql-header">
          <div>
            <h1 className="eql-title">Research Equipment</h1>
            <p className="eql-subtitle">
              Discover {equipment.length} instruments across India's top institutions
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="eql-search">
          <SearchBar
            value={filters.search}
            onChange={(value) => updateFilters({ search: value })}
          />
        </div>

        {/* Content */}
        <div className="eql-content">
          <FilterSidebar
            filters={filters}
            filterOptions={filterOptions}
            onFilterChange={updateFilters}
            onClear={clearFilters}
          />

          <div className="eql-main">
            {loading ? (
              <Loader text="Loading equipment..." />
            ) : equipment.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon"><FiPackage /></div>
                <div className="empty-state-title">No equipment found</div>
                <div className="empty-state-desc">
                  Try adjusting your search or filters to find what you're looking for.
                </div>
                <button className="btn btn-secondary mt-4" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="eql-grid">
                {equipment.map(item => (
                  <EquipmentCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
