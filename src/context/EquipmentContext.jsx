import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  getEquipment,
  getEquipmentById,
  addEquipment as apiAddEquipment,
  updateEquipment as apiUpdateEquipment,
  deleteEquipment as apiDeleteEquipment,
  getFilterOptions
} from '../services/api';

const EquipmentContext = createContext(null);

export function EquipmentProvider({ children }) {
  const [equipment, setEquipment] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    availability: ''
  });
  const [loading, setLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    locations: [],
    types: [],
    statuses: []
  });

  const fetchEquipment = useCallback(async (customFilters) => {
    setLoading(true);
    try {
      const data = await getEquipment(customFilters || filters);
      setEquipment(data);
      const options = getFilterOptions();
      setFilterOptions(options);
    } catch (err) {
      console.error('Failed to fetch equipment:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchSingleEquipment = useCallback(async (id) => {
    setLoading(true);
    try {
      const data = await getEquipmentById(id);
      return data;
    } catch (err) {
      console.error('Failed to fetch equipment:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addEquipment = useCallback(async (item) => {
    const newItem = await apiAddEquipment(item);
    setEquipment(prev => [...prev, newItem]);
    return newItem;
  }, []);

  const editEquipment = useCallback(async (id, updates) => {
    const updated = await apiUpdateEquipment(id, updates);
    setEquipment(prev => prev.map(e => e.id === Number(id) ? updated : e));
    return updated;
  }, []);

  const removeEquipment = useCallback(async (id) => {
    await apiDeleteEquipment(id);
    setEquipment(prev => prev.filter(e => e.id !== Number(id)));
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ search: '', location: '', type: '', availability: '' });
  }, []);

  const value = {
    equipment,
    filters,
    filterOptions,
    loading,
    fetchEquipment,
    fetchSingleEquipment,
    addEquipment,
    editEquipment,
    removeEquipment,
    updateFilters,
    clearFilters
  };

  return (
    <EquipmentContext.Provider value={value}>
      {children}
    </EquipmentContext.Provider>
  );
}

export function useEquipment() {
  const context = useContext(EquipmentContext);
  if (!context) {
    throw new Error('useEquipment must be used within an EquipmentProvider');
  }
  return context;
}

export default EquipmentContext;
