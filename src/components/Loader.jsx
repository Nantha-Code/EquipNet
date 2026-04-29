import React from 'react';
import './Loader.css';

export default function Loader({ size = 'md', text = 'Loading...' }) {
  return (
    <div className={`loader loader-${size}`} id="loader">
      <div className="loader-spinner">
        <div className="loader-ring" />
        <div className="loader-ring" />
        <div className="loader-ring" />
      </div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
}
