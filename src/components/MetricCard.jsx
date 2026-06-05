import React from 'react';
import './MetricCard.css';

const MetricCard = ({ label, value, change, subtext }) => {
  const isPositive = change >= 0;
  const displayValue = typeof value === 'number' && value % 1 !== 0 ? `$${value.toFixed(2)}` : value;

  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">{displayValue}</div>
      <div className={`metric-change ${isPositive ? 'positive' : 'negative'}`}>
        <span className="change-icon">{isPositive ? '↑' : '↓'}</span>
        <span className="change-text">
          {isPositive ? '+' : ''}{change}%
          {subtext && <span className="change-subtext">{subtext}</span>}
        </span>
      </div>
    </div>
  );
};

export default MetricCard;
