import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({ onLogin }) {

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const GAS_URL =
    "https://script.google.com/macros/s/XXXXXXXX/exec";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(GAS_URL, {
        method: "POST",
        body: JSON.stringify({
          mode: "adminLogin",
          id,
          password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("adminToken", data.token);

        if (onLogin) onLogin();

        navigate("/admin");
      } else {
        alert("ログイン失敗");
      }

    } catch (err) {
      console.error(err);
      alert("エラーが発生しました");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>ログイン</h1>

      <form onSubmit={handleLogin}>
        <input
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          ログイン
        </button>
      </form>
    </div>
  );
}