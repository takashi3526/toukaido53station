import React, { useState, useEffect } from 'react';
import './styles/tokaido_53_stations.css';

// 宿場データ
const stationsData = [
  { id: 1, name: '日本橋', reading: 'にほんばし', location: '東京都中央区', number: 1 },
  { id: 2, name: '品川', reading: 'しながわ', location: '東京都品川区', number: 2 },
  { id: 3, name: '川崎', reading: 'かわさき', location: '神奈川県川崎市', number: 3 },
  { id: 4, name: '神奈川', reading: 'かながわ', location: '神奈川県横浜市', number: 4 },
  { id: 5, name: '保土ケ谷', reading: 'ほどがや', location: '神奈川県横浜市', number: 5 },
  { id: 6, name: '戸塚', reading: 'とつか', location: '神奈川県横浜市', number: 6 },
  { id: 7, name: '藤沢', reading: 'ふじさわ', location: '神奈川県藤沢市', number: 7 },
  { id: 8, name: '平塚', reading: 'ひらつか', location: '神奈川県平塚市', number: 8 },
  { id: 9, name: '大磯', reading: 'おおいそ', location: '神奈川県大磯町', number: 9 },
  { id: 10, name: '小田原', reading: 'おだわら', location: '神奈川県小田原市', number: 10 },
  { id: 11, name: '箱根', reading: 'はこね', location: '神奈川県箱根町', number: 11 },
  { id: 12, name: '三島', reading: 'みしま', location: '静岡県三島市', number: 12 },
];

// ログインコンポーネント
const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="login-title">
          <h1>東海道53次</h1>
          <p>宿場町巡りの記録</p>
        </div>
        
        <div>
          <div className="form-group">
            <label className="form-label">
              ユーザー名
            </label>
            <div className="input-with-icon">
              <span className="input-icon">👤</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input form-input-with-icon"
                placeholder="ユーザー名を入力"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="パスワードを入力"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
            />
          </div>
          
          <button
            onClick={handleLogin}
            className="login-button"
          >
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
};

// ヘッダーコンポーネント
const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>東海道53次</h1>
          <p>江戸時代の東海道を辿る旅の記録</p>
        </div>
        <div className="header-user">
          <span className="user-name">こんにちは、{user}さん</span>
          <button
            onClick={onLogout}
            className="logout-button"
          >
            <span>🚪</span>
            <span>ログアウト</span>
          </button>
        </div>
      </div>
    </header>
  );
};

// 進捗バーコンポーネント
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

// フィルタータブコンポーネント
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

// 宿場カードコンポーネント
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

// 詳細編集モーダルコンポーネント
const StationDetailModal = ({ station, visitData, onSave, onClose }) => {
  const [visited, setVisited] = useState(visitData?.visited || false);
  const [visitDate, setVisitDate] = useState(visitData?.visitDate || '');
  const [notes, setNotes] = useState(visitData?.notes || '');
  const [photos, setPhotos] = useState(visitData?.photos || []);

  const handleSave = () => {
    onSave(station.id, {
      visited,
      visitDate: visited ? visitDate : '',
      notes,
      photos
    });
    onClose();
  };

  const handlePhotoAdd = () => {
    const newPhoto = `photo_${Date.now()}.jpg`;
    setPhotos([...photos, newPhoto]);
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{station.name} - 詳細情報</h2>
          <button
            onClick={onClose}
            className="modal-close"
          >
            <span>×</span>
          </button>
        </div>
        
        <div className="modal-body">
          <div className="modal-section">
            <h3 className="section-title">基本情報</h3>
            <div className="basic-info-grid">
              <div className="info-item">
                <span className="info-label">読み方:</span> {station.reading}
              </div>
              <div className="info-item">
                <span className="info-label">所在地:</span> {station.location}
              </div>
              <div className="info-item">
                <span className="info-label">宿場番号:</span> {station.number}
              </div>
            </div>
          </div>

          <div className="modal-section">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={visited}
                onChange={(e) => setVisited(e.target.checked)}
                className="checkbox-input"
              />
              <span className="checkbox-text">訪問済み</span>
            </label>
          </div>

          {visited && (
            <div className="modal-section">
              <label className="form-label">訪問日</label>
              <input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="date-input"
              />
            </div>
          )}

          <div className="modal-section">
            <label className="form-label">メモ・感想</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="textarea-input"
              placeholder="訪問時の感想や特記事項を入力してください"
            />
          </div>

          <div className="modal-section">
            <label className="form-label">写真</label>
            <div className="photo-upload-area">
              {photos.length === 0 ? (
                <div>
                  <div className="photo-upload-icon">📷</div>
                  <p className="photo-upload-text">写真を追加してください</p>
                  <p className="photo-upload-hint">クリックまたはドラッグ＆ドロップ</p>
                </div>
              ) : (
                <div className="photo-grid">
                  {photos.map((photo, index) => (
                    <div key={index} className="photo-item">
                      <div className="photo-placeholder">{photo}</div>
                      <button
                        onClick={() => removePhoto(index)}
                        className="photo-remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={handlePhotoAdd}
                className="photo-add-button"
              >
                写真を選択
              </button>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button
            onClick={onClose}
            className="cancel-button"
          >
            キャンセル
          </button>
          <button
            onClick={handleSave}
            className="save-button"
          >
            <span>💾</span>
            <span>保存</span>
          </button>
        </div>
      </div>
    </div>
  );
};

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
