import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import CompanyForm from "./pages/CompanyForm";
import AdminLogin from "./pages/AdminLogin";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* TOP */}
        <Route
          path="/"
          element={
            <Navigate to="/admin-login" />
          }
        />

        {/* ログイン */}
        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        {/* 会社登録フォーム */}
        <Route
          path="/company"
          element={
            localStorage.getItem(
              "adminLogin"
            )
              ? <CompanyForm />
              : (
                  <Navigate
                    to="/admin-login"
                  />
                )
          }
        />

      </Routes>

    </BrowserRouter>
  );
}