import React, { useState } from 'react';

function FilterTabs({ onFilterChange }) {
  const [active, setActive] = useState('すべて');

  const handleClick = (filter) => {
    setActive(filter);
    onFilterChange(filter);
  };

  return (
    <section className="filter-section">
      <div className="filter-buttons">
        {['すべて', '訪問済み', '未訪問'].map((label) => (
          <button
            key={label}
            className={`filter-btn ${active === label ? 'active' : ''}`}
            onClick={() => handleClick(label)}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}

export default FilterTabs;
