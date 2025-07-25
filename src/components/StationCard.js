import React from 'react';

const StationCard = ({ station, visitData, onToggleVisit, onEditDetails }) => {
  const isVisited = visitData && visitData.visited;
  
  return (
    <div className={`station-card ${isVisited ? 'station-card-visited' : ''}`}>
      <div className="station-card-content">
        <div className="station-header">
          <div className="station-info">
            <h3 className="station-name">{station.name}</h3>
            <p className="station-details">読み方: {station.reading}</p>
            <p className="station-details station-location">
              <span>📍</span>
              {station.location}
            </p>
            <p className="station-details">宿場番号: {station.number}</p>
          </div>
          <div className="station-checkbox-container">
            <button
              onClick={() => onToggleVisit(station.id)}
              className={`station-checkbox ${
                isVisited ? 'station-checkbox-checked' : ''
              }`}
            >
              {isVisited && '✓'}
            </button>
            <span className="station-status">
              {isVisited ? '訪問済み' : '未訪問'}
            </span>
          </div>
        </div>
        
        {isVisited && visitData?.visitDate && (
          <div className="visit-date-info">
            <div className="visit-date-text">
              <span>📅</span>
              <span>訪問日: {visitData.visitDate}</span>
            </div>
          </div>
        )}
        
        <div className="station-actions">
          <button
            onClick={() => onEditDetails(station)}
            className="edit-button"
          >
            <span>✏️</span>
            <span>詳細編集</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StationCard;
