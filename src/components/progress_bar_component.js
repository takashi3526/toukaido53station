import React from 'react';

const ProgressBar = ({ visited, total }) => {
  const percentage = Math.round((visited / total) * 100);
  
  return (
    <div className="progress-container">
      <div className="progress-stats">
        <div className="progress-stat">
          <div className="progress-stat-number progress-stat-visited">{visited}</div>
          <div className="progress-stat-label">訪問済み</div>
        </div>
        <div className="progress-stat">
          <div className="progress-stat-number progress-stat-unvisited">{total - visited}</div>
          <div className="progress-stat-label">未訪問</div>
        </div>
        <div className="progress-stat">
          <div className="progress-stat-number progress-stat-percentage">{percentage}%</div>
          <div className="progress-stat-label">達成率</div>
        </div>
      </div>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;