import React from 'react';

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

export default Header;
