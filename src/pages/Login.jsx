import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {

  const [id, setId] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const GAS_URL =
  "https://script.google.com/macros/s/AKfycbyMlCpAhOU7QnbmHpHg7oC9NeubpxYF8X15NCVCVqnUcXmCrjkGGaB4p9wUCvnk-1RL0Q/exec";

const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const res = await fetch(GAS_URL, {
      method: "POST",
      body: JSON.stringify({
        mode: "login",
        id,
        password: pass,
      }),
    });

    const data = await res.json();

    if (data.success) {

      localStorage.setItem(
        "token",
        data.token
      );

      onLogin();

      navigate("/company");

    } else {

      alert("IDまたはパスワードが違います");
    }

  } catch (error) {

    console.error(error);

    alert("ログイン失敗");
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