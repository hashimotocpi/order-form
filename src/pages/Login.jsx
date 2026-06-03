import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbzCqMsJEEiIcBZA8I_2MnGNb39PiWGaic-eAcMTHDdRiytWru_gTew3XOR_XAbgyVMHDg/exec";

export default function Login({ setUser }) {
  const [companyCode, setCompanyCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
  
      const formData = new FormData();
  
      formData.append("action", "login");
      formData.append("companyCode", companyCode);
      formData.append("password", password);
  
      const res = await fetch(GAS_URL, {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
  
      console.log("LOGIN RESULT", data);
  
      if (data.success) {
  
        localStorage.setItem(
          "user",
          JSON.stringify({
            companyCode: data.companyCode,
            companyName: data.companyName,
          })
        );
  
        setUser({
          companyCode: data.companyCode,
          companyName: data.companyName,
        });

        navigate("/home"); 
  
      } else {
  
        alert(data.message || "ログインに失敗しました");
  
      }
  
    } catch (err) {
  
      console.error(err);
      alert("通信エラー");
  
    } finally {
  
      setLoading(false);
  
    }
  };

  return (
    <div className="page-container">

      <div className="form-card">

        <h2 className="section-title">
          会員ログイン
        </h2>

        <table className="form-table">
          <tbody>

            <tr>
              <th>会社コード<span className="required">*</span></th>
              <td>
                <input
                  value={companyCode}
                  onChange={(e) =>
                    setCompanyCode(e.target.value)
                  }
                  placeholder="FAP-000001"
                />
              </td>
            </tr>

            <tr>
              <th>パスワード<span className="required">*</span></th>
              <td>
                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />
              </td>
            </tr>

          </tbody>
        </table>

        <div
          style={{
            marginTop: "20px",
            color: "#fff",
            lineHeight: "1.8",
          }}
        >
          会員登録済みのお客様は、
          会社コードとパスワードを入力して
          ログインしてください。
        </div>

        <div className="button-area">
          <button
            className="submit-button"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? "ログイン中..." : "ログイン"}
          </button>
        </div>

      </div>

    </div>
  );
}