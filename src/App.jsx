import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import InquiryForm from "./pages/InquiryForm";
import OrderForm from "./pages/OrderForm";
import Layout from "./components/Layout";

function App() {

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <BrowserRouter>

      <Routes>

        {/* トップ */}
        <Route
          path="/"
          element={<Navigate to={user ? "/inquiry" : "/login"} />}
        />

        {/* ログイン */}
        <Route
          path="/login"
          element={<Login setUser={setUser} />}
        />

        {/* 問い合わせ */}
        <Route
          path="/inquiry"
          element={
            user ? (
              <Layout user={user} onLogout={logout}>
                <InquiryForm user={user} setUser={setUser} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 発注 */}
        <Route
          path="/order"
          element={
            user ? (
              <Layout user={user} onLogout={logout}>
                <OrderForm user={user} setUser={setUser} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 保険 */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;