import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CompanyForm() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    company: "",
    person: "",
    companyEmail: "",
    personEmail: "",
    mainPhone: "",
    subPhone: "",
    address: "",
    website: "",
  });

  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const GAS_URL =
  "https://script.google.com/macros/s/AKfycbyJtZsABuzOZGN0mOqZQ-uhuT2NGwAKGJkVlxvM-_jPIKX60TgH0nqa1gEv3edWA9Or_A/exec";

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("/api/gas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "companyRegister",
          form,
        }),
      });
  
      const data = await res.json();
      console.log(data);
  
      alert("送信成功");
      navigate("/complete");
  
    } catch (error) {
      console.error(error);
      alert("送信失敗");
    }
  };

  return (
    <div style={{ padding: "16px", background: "#f3f4f6", minHeight: "100vh" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", background: "#fff", padding: "30px", borderRadius: "16px" }}>

        <h1>会社登録フォーム</h1>

        <form onSubmit={handleSubmit}>

          {/* 会社名 */}
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="会社名"
            required
          />

          {/* 担当者 */}
          <input
            name="person"
            value={form.person}
            onChange={handleChange}
            placeholder="担当者"
            required
          />

          {/* メール */}
          <input
            name="companyEmail"
            value={form.companyEmail}
            onChange={handleChange}
            placeholder="メール"
            required
          />

          {/* 電話 */}
          <input
            name="mainPhone"
            value={form.mainPhone}
            onChange={handleChange}
            placeholder="電話"
            required
          />

          {/* 利用規約 */}
          <label>
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            利用規約に同意
          </label>

          {/* ダウンロード or 送信 */}
{!downloaded ? (
  <button
    type="button"
    onClick={() => {
      console.log("ダウンロードOK");

      const link = document.createElement("a");
      link.href = "/業販規約_260525_ver1.0.pdf";
      link.download = "業販規約_260525_ver1.0.pdf";
      link.click();

      setDownloaded(true); // ←これ重要
    }}
  >
    規約ダウンロード
  </button>
) : (
  <button
    type="submit"
    disabled={!agree || loading}
  >
    {loading ? "送信中..." : "登録する"}
  </button>
)}
        </form>

      </div>
    </div>
  );
}