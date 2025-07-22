import React from 'react';

function ShukubaInfo({ name, reading, location, number }) {
  return (
    <div className="station-card">
      <div className="station-header">
        <span className="station-number">宿場番号: {number}</span>
        <span className="station-name">{name}</span>
      </div>
      <div className="station-reading">読み方: {reading}</div>
      <div className="station-location">所在地: {location}</div>
    </div>
  );
}

export default ShukubaInfo;
