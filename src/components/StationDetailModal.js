import React, { useState, useRef } from 'react';

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

export default StationDetailModal;
