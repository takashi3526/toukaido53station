import React from 'react';
import ShukubaInfo from './ShukubaInfo';
import stations from '../data/stations'; // stations.js のパスに応じて調整

function StationList({ filter = 'すべて' }) {
  const filteredStations = stations.filter((station) => {
    if (filter === '訪問済み') return station.visited;
    if (filter === '未訪問') return !station.visited;
    return true;
  });

  return (
    <div className="stations-grid">
      {filteredStations.map((station) => (
        <ShukubaInfo
          key={station.number}
          name={station.name}
          reading={station.reading}
          location={station.location}
          number={station.number}
        />
      ))}
    </div>
  );
}

export default StationList;
