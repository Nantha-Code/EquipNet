import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import './SearchBar.css';

export default function SearchBar({ value, onChange, placeholder = 'Search equipment, institution, or location...' }) {
  const [localValue, setLocalValue] = useState(value || '');
  const debounceRef = useRef(null);

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    setLocalValue(val);
    
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange(val);
    }, 300);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="search-bar" id="search-bar">
      <FiSearch className="search-bar-icon" size={20} />
      <input
        type="text"
        className="search-bar-input"
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        id="search-input"
      />
      {localValue && (
        <button className="search-bar-clear" onClick={handleClear} aria-label="Clear search">
          <FiX size={18} />
        </button>
      )}
    </div>
  );
}
