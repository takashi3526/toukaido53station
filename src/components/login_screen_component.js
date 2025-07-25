import React, { useState } from 'react';

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

export default LoginScreen;