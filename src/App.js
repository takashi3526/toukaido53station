import React, { useState, useEffect, useRef } from 'react';
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
  { id: 13, name: '沼津', reading: 'ぬまづ', location: '静岡県沼津市', number: 13 },
  { id: 14, name: '原', reading: 'はら', location: '静岡県沼津市', number: 14 },
  { id: 15, name: '吉原', reading: 'よしわら', location: '静岡県富士市', number: 15 },
  { id: 16, name: '蒲原', reading: 'かんばら', location: '静岡県静岡市', number: 16 },
  { id: 17, name: '由比', reading: 'ゆい', location: '静岡県静岡市', number: 17 },
  { id: 18, name: '興津', reading: 'おきつ', location: '静岡県静岡市', number: 18 },
  { id: 19, name: '江尻', reading: 'えじり', location: '静岡県静岡市', number: 19 },
  { id: 20, name: '府中', reading: 'ふちゅう', location: '静岡県静岡市', number: 20 },
  { id: 21, name: '鞠子', reading: 'まりこ', location: '静岡県静岡市', number: 21 },
  { id: 22, name: '岡部', reading: 'おかべ', location: '静岡県藤枝市', number: 22 },
  { id: 23, name: '藤枝', reading: 'ふじえだ', location: '静岡県藤枝市', number: 23 },
  { id: 24, name: '島田', reading: 'しまだ', location: '静岡県島田市', number: 24 },
  { id: 25, name: '金谷', reading: 'かなや', location: '静岡県島田市', number: 25 },
  { id: 26, name: '日坂', reading: 'にっさか', location: '静岡県掛川市', number: 26 },
  { id: 27, name: '掛川', reading: 'かけがわ', location: '静岡県掛川市', number: 27 },
  { id: 28, name: '袋井', reading: 'ふくろい', location: '静岡県袋井市', number: 28 },
  { id: 29, name: '見付', reading: 'みつけ', location: '静岡県磐田市', number: 29 },
  { id: 30, name: '浜松', reading: 'はままつ', location: '静岡県浜松市', number: 30 },
  { id: 31, name: '舞阪', reading: 'まいさか', location: '静岡県浜松市', number: 31 },
  { id: 32, name: '新居', reading: 'あらい', location: '静岡県湖西市', number: 32 },
  { id: 33, name: '白須賀', reading: 'しらすか', location: '静岡県湖西市', number: 33 },
  { id: 34, name: '二川', reading: 'ふたがわ', location: '愛知県豊橋市', number: 34 },
  { id: 35, name: '吉田', reading: 'よしだ', location: '愛知県豊橋市', number: 35 },
  { id: 36, name: '御油', reading: 'ごゆ', location: '愛知県豊川市', number: 36 },
  { id: 37, name: '赤坂', reading: 'あかさか', location: '愛知県豊川市', number: 37 },
  { id: 38, name: '藤川', reading: 'ふじかわ', location: '愛知県岡崎市', number: 38 },
  { id: 39, name: '岡崎', reading: 'おかざき', location: '愛知県岡崎市', number: 39 },
  { id: 40, name: '池鯉鮒', reading: 'ちりゅう', location: '愛知県知立市', number: 40 },
  { id: 41, name: '鳴海', reading: 'なるみ', location: '愛知県名古屋市', number: 41 },
  { id: 42, name: '宮', reading: 'みや', location: '愛知県名古屋市', number: 42 },
  { id: 43, name: '桑名', reading: 'くわな', location: '三重県桑名市', number: 43 },
  { id: 44, name: '四日市', reading: 'よっかいち', location: '三重県四日市市', number: 44 },
  { id: 45, name: '石薬師', reading: 'いしやくし', location: '三重県鈴鹿市', number: 45 },
  { id: 46, name: '庄野', reading: 'しょうの', location: '三重県鈴鹿市', number: 46 },
  { id: 47, name: '亀山', reading: 'かめやま', location: '三重県亀山市', number: 47 },
  { id: 48, name: '関', reading: 'せき', location: '三重県亀山市', number: 48 },
  { id: 49, name: '坂下', reading: 'さかした', location: '三重県亀山市', number: 49 },
  { id: 50, name: '土山', reading: 'つちやま', location: '滋賀県甲賀市', number: 50 },
  { id: 51, name: '水口', reading: 'みなくち', location: '滋賀県甲賀市', number: 51 },
  { id: 52, name: '石部', reading: 'いしべ', location: '滋賀県湖南市', number: 52 },
  { id: 53, name: '草津', reading: 'くさつ', location: '滋賀県草津市', number: 53 },
  { id: 54, name: '大津', reading: 'おおつ', location: '滋賀県大津市', number: 54 },
  { id: 55, name: '三条大橋', reading: 'さんじょうおおはし', location: '京都府京都市', number: 55 }
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
  const fileInputRef = useRef(null);

  const handleSave = () => {
    onSave(station.id, {
      visited,
      visitDate: visited ? visitDate : '',
      notes,
      photos
    });
    onClose();
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPhoto = {
            id: Date.now() + Math.random(),
            name: file.name,
            url: e.target.result,
            size: file.size
          };
          setPhotos(prev => [...prev, newPhoto]);
        };
        reader.readAsDataURL(file);
      }
    });
    
    // ファイル入力をリセット
    event.target.value = '';
  };

  const handlePhotoAdd = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPhoto = {
            id: Date.now() + Math.random(),
            name: file.name,
            url: e.target.result,
            size: file.size
          };
          setPhotos(prev => [...prev, newPhoto]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removePhoto = (photoId) => {
    setPhotos(photos.filter(photo => photo.id !== photoId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
            <div 
              className="photo-upload-area"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              
              {photos.length === 0 ? (
                <div onClick={handlePhotoAdd} style={{ cursor: 'pointer' }}>
                  <div className="photo-upload-icon">📷</div>
                  <p className="photo-upload-text">写真を追加してください</p>
                  <p className="photo-upload-hint">クリックまたはドラッグ＆ドロップ</p>
                </div>
              ) : (
                <div className="photo-grid">
                  {photos.map((photo) => (
                    <div key={photo.id} className="photo-item">
                      <div className="photo-container">
                        <img 
                          src={photo.url} 
                          alt={photo.name}
                          className="photo-preview"
                        />
                        <div className="photo-info">
                          <div className="photo-name">{photo.name}</div>
                          <div className="photo-size">{formatFileSize(photo.size)}</div>
                        </div>
                        <button
                          onClick={() => removePhoto(photo.id)}
                          className="photo-remove"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={handlePhotoAdd}
                className="photo-add-button"
              >
                📷 写真を選択
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
