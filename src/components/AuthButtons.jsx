import React from 'react';

function AuthButtons() {
  return (
    <section className="login-section">
      <div className="login-form">
        <input type="text" placeholder="ユーザー名" />
        <input type="password" placeholder="パスワード" />
        <button>ログイン</button>
        <button className="logout-btn">ログアウト</button>
      </div>
    </section>
  );
}

export default AuthButtons;

