import React, { useState, useEffect, useRef } from 'react';
import './StatsCounter.css';

const stats = [
  { label: 'Equipment Listed', value: 2500, suffix: '+', icon: '🔬' },
  { label: 'Institutions', value: 450, suffix: '+', icon: '🏛️' },
  { label: 'Researchers Served', value: 12000, suffix: '+', icon: '👩‍🔬' },
  { label: 'Cities Covered', value: 85, suffix: '+', icon: '📍' }
];

function AnimatedNumber({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="stats-section" id="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item">
              <span className="stat-icon">{stat.icon}</span>
              <div className="stat-value">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
