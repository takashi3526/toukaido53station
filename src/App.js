import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Container, Box, Grid } from '@mui/material';

// テーマとコンポーネントのインポート
import theme from './theme/theme';
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {!user ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <Box
          sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #FBF9F7 0%, #F5F5F5 100%)',
            backgroundAttachment: 'fixed'
          }}
        >
          <Header user={user} onLogout={handleLogout} />
          
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <ProgressBar visited={visitedCount} total={stationsData.length} />
            
            <FilterTabs filter={filter} onFilterChange={setFilter} />
            
            <Grid container spacing={3}>
              {filteredStations.map(station => (
                <Grid item xs={12} sm={6} lg={4} key={station.id}>
                  <StationCard
                    station={station}
                    visitData={visitData[station.id]}
                    onToggleVisit={handleToggleVisit}
                    onEditDetails={setSelectedStation}
                  />
                </Grid>
              ))}
            </Grid>

            {filteredStations.length === 0 && (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                  color: 'text.secondary'
                }}
              >
                <Typography variant="h6">
                  該当する宿場がありません
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  フィルターを変更してください
                </Typography>
              </Box>
            )}
          </Container>

          {selectedStation && (
            <StationDetailModal
              station={selectedStation}
              visitData={visitData[selectedStation.id]}
              onSave={handleSaveDetails}
              onClose={() => setSelectedStation(null)}
            />
          )}
        </Box>
      )}
    </ThemeProvider>
  );
};

export default App;
