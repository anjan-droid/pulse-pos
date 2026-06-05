import React from 'react';

const FilterChips = ({ options, activeKey, onChange }) => {
  return (
    <div className="filter-chips">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`filter-chip ${activeKey === option ? 'active' : ''}`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default FilterChips;
