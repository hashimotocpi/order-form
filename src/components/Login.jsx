import { useState } from "react";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbzCqMsJEEiIcBZA8I_2MnGNb39PiWGaic-eAcMTHDdRiytWru_gTew3XOR_XAbgyVMHDg/exec";

export default function Login({ setUser }) {
  const [companyCode, setCompanyCode] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await fetch(GAS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "login",
          companyCode,
          password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setUser(data);
      } else {
        alert("ログイン失敗");
      }
    } catch (err) {
      console.error(err);
      alert("通信エラー");
    }
  };

  return (
    <div>
      <h2>ログイン</h2>

      <input
        placeholder="会社コード"
        value={companyCode}
        onChange={(e) => setCompanyCode(e.target.value)}
      />

      <input
        placeholder="パスワード"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>
        ログイン
      </button>
    </div>
  );
}