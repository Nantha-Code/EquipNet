import React, { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './HorizontalScroll.css';

export default function HorizontalScroll({ title, subtitle, children }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="hscroll-section" id="featured-equipment">
      <div className="container">
        <div className="hscroll-header">
          <div>
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
          <div className="hscroll-controls">
            <button className="hscroll-btn" onClick={() => scroll('left')} aria-label="Scroll left">
              <FiChevronLeft size={20} />
            </button>
            <button className="hscroll-btn" onClick={() => scroll('right')} aria-label="Scroll right">
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="hscroll-track" ref={scrollRef}>
        <div className="hscroll-inner">
          {children}
        </div>
      </div>
    </section>
  );
}
