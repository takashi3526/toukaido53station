import React from 'react';

function PhotoUploader() {
  return (
    <div className="photo-section">
      <h3>写真</h3>
      <div className="photo-preview photo-placeholder">
        写真を追加してください<br />
        クリックまたはドラッグ＆ドロップ
      </div>
      <div>
        <button className="photo-upload-btn styled-btn">写真を選択</button>
        <button className="photo-remove-btn styled-btn">写真を削除</button>
      </div>
      <div className="edit-form">
        <div className="form-group">
          <label>訪問日</label>
          <input type="date" />
        </div>
        <div className="form-actions">
          <button className="cancel-btn styled-btn">キャンセル</button>
          <button className="save-btn styled-btn">保存</button>
        </div>
      </div>
    </div>
  );
}

export default PhotoUploader;
