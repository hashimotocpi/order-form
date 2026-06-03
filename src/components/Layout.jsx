import { Link, useLocation } from "react-router-dom";

export default function Layout({ user, children, onLogout }) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "menu-btn active" : "menu-btn";
  };

  if (!user) {
    return (
      <div className="form-card">
        ログイン情報がありません
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* ヘッダー */}
      <div className="page-header">
        <div className="logo-area">
          <h1>富士オートパーツ 業販システム</h1>
        </div>

        <div className="company-info">
          <div>{user?.companyCode}</div>
          <div>{user?.companyName}様</div>
        </div>
      </div>

      {/* メニュー */}
      <div className="top-menu">
        <Link to="/order">
          <button className={isActive("/order")}>
            発注フォーム
          </button>
        </Link>

        <Link to="/inquiry">
          <button className={isActive("/inquiry")}>
            問い合わせフォーム
          </button>
        </Link>

        <Link to="/orders">
          <button className={isActive("/orders")}>
            発注履歴
          </button>
        </Link>

        <Link to="/inquiries">
          <button className={isActive("/inquiries")}>
            問い合わせ履歴
          </button>
        </Link>

        <button
          className="menu-btn"
          onClick={onLogout}
        >
          ログアウト
        </button>
      </div>

      {/* メイン */}
      <div className="form-card">
        {children}
      </div>
    </div>
  );
}