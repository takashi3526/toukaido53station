import React from 'react';

function ProgressBar({ visited = 0, total = 53 }) {
  const percent = Math.round((visited / total) * 100);

  return (
    <section className="stats">
      <div className="stat-item">
        <div className="stat-number">{visited}</div>
        <div className="stat-label">訪問済み</div>
      </div>
      <div className="stat-item">
        <div className="stat-number">{total - visited}</div>
        <div className="stat-label">未訪問</div>
      </div>
      <div className="stat-item">
        <div className="stat-number">{percent}%</div>
        <div className="stat-label">達成率</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percent}%` }}></div>
        </div>
      </div>
    </section>
  );
}

export default ProgressBar;
