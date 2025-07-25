import React from 'react';

const FilterTabs = ({ filter, onFilterChange }) => {
  const tabs = ['すべて', '訪問済み', '未訪問'];
  
  return (
    <div className="filter-container">
      <div className="filter-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onFilterChange(tab)}
            className={`filter-tab ${
              filter === tab ? 'filter-tab-active' : 'filter-tab-inactive'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterTabs;
