import React, { useState, useEffect } from 'react';

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
  // 続きの宿場も追加可能
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">東海道53次</h1>
          <p className="text-gray-600">宿場町巡りの記録</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ユーザー名
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">👤</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="ユーザー名を入力"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="パスワードを入力"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
            />
          </div>
          
          <button
            onClick={handleLogin}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
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
    <header className="bg-white shadow-sm border-b border-gray-200 p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">東海道53次</h1>
          <p className="text-gray-600 text-sm">江戸時代の東海道を辿る旅の記録</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">こんにちは、{user}さん</span>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition"
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
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{visited}</div>
          <div className="text-sm text-gray-600">訪問済み</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-400">{total - visited}</div>
          <div className="text-sm text-gray-600">未訪問</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{percentage}%</div>
          <div className="text-sm text-gray-600">達成率</div>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-300"
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
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onFilterChange(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === tab
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
    <div className={`bg-white rounded-lg shadow-sm border-2 transition-all ${
      isVisited ? 'border-green-200 bg-green-50' : 'border-gray-200'
    }`}>
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">{station.name}</h3>
            <p className="text-sm text-gray-600">読み方: {station.reading}</p>
            <p className="text-sm text-gray-600 flex items-center">
              <span className="mr-1">📍</span>
              {station.location}
            </p>
            <p className="text-sm text-gray-600">宿場番号: {station.number}</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={() => onToggleVisit(station.id)}
              className={`w-6 h-6 rounded border-2 flex items-center justify-center transition ${
                isVisited
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-green-400'
              }`}
            >
              {isVisited && '✓'}
            </button>
            <span className="text-xs text-gray-500">
              {isVisited ? '訪問済み' : '未訪問'}
            </span>
          </div>
        </div>
        
        {isVisited && visitData?.visitDate && (
          <div className="mb-3 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-blue-700">
              <span>📅</span>
              <span>訪問日: {visitData.visitDate}</span>
            </div>
          </div>
        )}
        
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onEditDetails(station)}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-orange-600 transition"
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
    // 実際の実装では、ファイル選択ダイアログを開く
    const newPhoto = `photo_${Date.now()}.jpg`;
    setPhotos([...photos, newPhoto]);
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">{station.name} - 詳細情報</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <span className="text-xl">×</span>
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* 基本情報 */}
          <div>
            <h3 className="text-lg font-medium mb-4">基本情報</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">読み方:</span> {station.reading}
              </div>
              <div>
                <span className="font-medium">所在地:</span> {station.location}
              </div>
              <div>
                <span className="font-medium">宿場番号:</span> {station.number}
              </div>
            </div>
          </div>

          {/* 訪問状況 */}
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={visited}
                onChange={(e) => setVisited(e.target.checked)}
                className="w-5 h-5 text-green-500 rounded focus:ring-green-500"
              />
              <span className="font-medium">訪問済み</span>
            </label>
          </div>

          {/* 訪問日 */}
          {visited && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                訪問日
              </label>
              <input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          )}

          {/* メモ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              メモ・感想
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="訪問時の感想や特記事項を入力してください"
            />
          </div>

          {/* 写真 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              写真
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {photos.length === 0 ? (
                <div>
                  <span className="block text-4xl text-gray-400 mb-4">📷</span>
                  <p className="text-gray-500 mb-2">写真を追加してください</p>
                  <p className="text-sm text-gray-400">クリックまたはドラッグ＆ドロップ</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <div className="w-full h-20 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                        {photo}
                      </div>
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={handlePhotoAdd}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                写真を選択
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
          >
            キャンセル
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
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

  // ログイン状態をローカルストレージから復元（実際の実装では使用しない）
  useEffect(() => {
    // メモリ内でのデータ管理
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
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />
      
      <main className="max-w-4xl mx-auto p-6">
        <ProgressBar visited={visitedCount} total={stationsData.length} />
        
        <FilterTabs filter={filter} onFilterChange={setFilter} />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
