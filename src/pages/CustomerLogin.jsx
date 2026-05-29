import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerLogin() {

  const navigate = useNavigate();

  const [companyCode, setCompanyCode] =
    useState("");

  const [password, setPassword] =
    useState("");

  const GAS_URL =
    "https://script.google.com/macros/s/AKfycbz6E4xOMFrq7pkyR5lowGkbMNn2-JIY2d_O52TLAsVUG3SnM-S1f80SkgGXS7zV6gFQXg/exec";

  const login = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(GAS_URL, {
        method: "POST",
        body: JSON.stringify({
          mode: "customerLogin",
          companyCode,
          password,
        }),
      });

      const data = await res.json();

      if (data.success) {

        localStorage.setItem(
          "customerToken",
          data.token
        );

        localStorage.setItem(
          "companyCode",
          data.companyCode
        );

        localStorage.setItem(
          "companyName",
          data.companyName
        );

        navigate("/customer-home");

      } else {

        alert("ログイン失敗");
      }

    } catch (error) {

      console.error(error);

      alert("通信エラー");
    }
  };

  return (

    <div style={{ padding: 40 }}>

      <h1>顧客ログイン</h1>

      <form onSubmit={login}>

        <input
          placeholder="会社コード"
          value={companyCode}
          onChange={(e) =>
            setCompanyCode(e.target.value)
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br /><br />

        <button type="submit">
          ログイン
        </button>

      </form>

    </div>
  );
}