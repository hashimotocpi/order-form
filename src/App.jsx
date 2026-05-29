import { useState, useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import CompanyForm from "./pages/CompanyForm";
import AdminLogin from "./pages/AdminLogin";
import Complete from "./pages/Complete";

import CustomerLogin from "./pages/CustomerLogin";
import CustomerHome from "./pages/CustomerHome";

import OrderForm from "./pages/OrderForm";
import InquiryForm from "./pages/InquiryForm";

export default function App() {

  // =========================
  // 管理者ログイン
  // =========================
  const [isAdminLogin, setIsAdminLogin] =
    useState(false);

  // =========================
  // 顧客ログイン
  // =========================
  const [isCustomerLogin, setIsCustomerLogin] =
    useState(false);

  useEffect(() => {

    // 管理者
    setIsAdminLogin(
      localStorage.getItem("token")
        === "login_ok"
    );

    // 顧客
    setIsCustomerLogin(
      localStorage.getItem("customerToken")
        === "customer_ok"
    );

  }, []);

  return (

    <BrowserRouter>

      <Routes>

        {/* =========================
            TOP
        ========================= */}
        <Route
          path="/"
          element={
            <Navigate to="/customer-login" />
          }
        />

        {/* =========================
            管理者ログイン
        ========================= */}
        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        {/* =========================
            会社登録フォーム
        ========================= */}
        <Route
          path="/company"
          element={
            isAdminLogin
              ? <CompanyForm />
              : <Navigate to="/admin-login" />
          }
        />

        {/* =========================
            登録完了
        ========================= */}
        <Route
          path="/complete"
          element={<Complete />}
        />

        {/* =========================
            顧客ログイン
        ========================= */}
        <Route
          path="/customer-login"
          element={<CustomerLogin />}
        />

        {/* =========================
            顧客ホーム
        ========================= */}
        <Route
          path="/customer-home"
          element={
            isCustomerLogin
              ? <CustomerHome />
              : (
                  <Navigate
                    to="/customer-login"
                  />
                )
          }
        />

        {/* =========================
            発注フォーム
        ========================= */}
        <Route
          path="/order"
          element={
            isCustomerLogin
              ? <OrderForm />
              : (
                  <Navigate
                    to="/customer-login"
                  />
                )
          }
        />

        {/* =========================
            問い合わせフォーム
        ========================= */}
        <Route
          path="/inquiry"
          element={
            isCustomerLogin
              ? <InquiryForm />
              : (
                  <Navigate
                    to="/customer-login"
                  />
                )
          }
        />

      </Routes>

    </BrowserRouter>
  );
}