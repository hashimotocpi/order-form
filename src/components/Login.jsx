import { useState } from "react";
import { api } from "./api";

export default function Login({ setUser }) {
  const [companyCode, setCompanyCode] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await api({
      action: "login",
      companyCode,
      password,
    });

    if (res.success) setUser(res);
    else alert("ログイン失敗");
  };

  return (
    <div>
      <h2>ログイン</h2>

      <input placeholder="会社コード" onChange={(e) => setCompanyCode(e.target.value)} />
      <input placeholder="パスワード" type="password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={login}>ログイン</button>
    </div>
  );
}