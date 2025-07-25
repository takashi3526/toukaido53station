import React, { useState } from 'react';
import Header from './components/Header';
import AuthButtons from './components/AuthButtons';
import ProgressBar from './components/ProgressBar';
import FilterTabs from './components/FilterTabs';
import StationList from './components/StationList';
import './styles/tokaido_53_stations.css';
function App() {
  const [filter, setFilter] = useState('すべて');
  return (
    <div className="container">
      <Header />
      <AuthButtons />
      <ProgressBar visited={0} total={53} />
      <FilterTabs onFilterChange={setFilter} />
      <StationList filter={filter} />
    </div>
  );
}
export default App;
