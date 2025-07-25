import React, { useState, useEffect } from 'react';
import './styles/tokaido_53_stations.css';

// コンポーネントのインポート
import LoginScreen from './components/LoginScreen';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import FilterTabs from './components/FilterTabs';
import StationCard from './components/StationCard';
import StationDetailModal from './components/StationDetailModal';

// データのインポート
import { stationsData } from './data/stations';

// メインアプリコンポーネント
const App = () => {
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState('すべて');
  const [visitData, setVisitData] = useState({});
  const [selectedStation, setSelectedStation] = useState(null);

  useEffect(() => {
    const savedVisitData = {};
    setVisitData(savedVisitData);
  }, []);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
    setVisitData({});
  };

  const handleToggleVisit = (stationId) => {
    const currentData = visitData[stationId] || {};
    const newVisited = !currentData.visited;
    
    setVisitData(prev => ({
      ...prev,
      [stationId]: {
        ...currentData,
        visited: newVisited,
        visitDate: newVisited ? new Date().toISOString().split('T')[0] : ''
      }
    }));
  };

  const handleSaveDetails = (stationId, data) => {
    setVisitData(prev => ({
      ...prev,
      [stationId]: data
    }));
  };

  const filteredStations = stationsData.filter(station => {
    const isVisited = visitData[station.id]?.visited;
    if (filter === '訪問済み') return isVisited;
    if (filter === '未訪問') return !isVisited;
    return true;
  });

  const visitedCount = Object.values(visitData).filter(data => data.visited).length;

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div>
      <Header user={user} onLogout={handleLogout} />
      
      <main className="main-content">
        <ProgressBar visited={visitedCount} total={stationsData.length} />
        
        <FilterTabs filter={filter} onFilterChange={setFilter} />
        
        <div className="stations-grid">
          {filteredStations.map(station => (
            <StationCard
              key={station.id}
              station={station}
              visitData={visitData[station.id]}
              onToggleVisit={handleToggleVisit}
              onEditDetails={setSelectedStation}
            />
          ))}
        </div>
      </main>

      {selectedStation && (
        <StationDetailModal
          station={selectedStation}
          visitData={visitData[selectedStation.id]}
          onSave={handleSaveDetails}
          onClose={() => setSelectedStation(null)}
        />
      )}
    </div>
  );
};

export default App;
