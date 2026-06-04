import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import InquiryForm from "./pages/InquiryForm";
import OrderForm from "./pages/OrderForm";

function App() {

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const TIMEOUT = 3 * 60 * 60 * 1000;

  // ログアウト統一関数
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("lastActivity");
    setUser(null);
  };

  // ① 自動ログアウト監視
  useEffect(() => {
    const interval = setInterval(() => {
      const last = localStorage.getItem("lastActivity");

      if (!last) return;

      const diff = Date.now() - Number(last);

      if (diff > TIMEOUT) {
        logout();
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // ② 操作監視
  useEffect(() => {
    const events = ["click", "keydown", "mousemove"];

    const update = () => {
      localStorage.setItem("lastActivity", Date.now());
    };

    events.forEach((e) =>
      window.addEventListener(e, update)
    );

    return () => {
      events.forEach((e) =>
        window.removeEventListener(e, update)
      );
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to={user ? "/inquiry" : "/login"} />}
        />

        <Route
          path="/login"
          element={<Login setUser={setUser} />}
        />

        <Route
          path="/inquiry"
          element={
            user ? (
              <InquiryForm user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/order"
          element={
            user ? (
              <OrderForm user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;