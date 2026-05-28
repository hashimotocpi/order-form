import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {

  const [id, setId] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {

    e.preventDefault();

    if (id === "admin" && pass === "1234") {

      onLogin();

      // ← 追加
      navigate("/order");

    } else {

      alert("IDまたはパスワードが違います");
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
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          ログイン
        </button>

      </form>

    </div>
  );
}