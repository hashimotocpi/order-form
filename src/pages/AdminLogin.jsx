import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] =
    useState("");

  const login = () => {

    if (
      id === "admin" &&
      password === "1234"
    ) {

      localStorage.setItem(
        "adminLogin",
        "ok"
      );

      navigate("/company");

    } else {

      alert(
        "IDまたはパスワードが違います"
      );
    }
  };

  return (

    <div style={{ padding: 40 }}>

      <h1>ログイン</h1>

      <input
        placeholder="ID"
        value={id}
        onChange={(e) =>
          setId(e.target.value)
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

      <button onClick={login}>
        ログイン
      </button>

    </div>
  );
}