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

      {!user ? (
        <Routes>

          <Route
            path="/login"
            element={
              <Login
                setUser={setUser}
              />
            }
          />

          <Route
            path="*"
            element={<Navigate to="/login" />}
          />

        </Routes>
      ) : (
        <Routes>

          <Route
            path="/inquiry"
            element={
              <InquiryForm
                user={user}
                onLogout={logout}
              />
            }
          />

          <Route
            path="/order"
            element={
              <OrderForm
                user={user}
                onLogout={logout}
              />
            }
          />

          <Route
            path="*"
            element={<Navigate to="/inquiry" />}
          />

        </Routes>
      )}

    </BrowserRouter>
  );
}

export default App;