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
  "https://script.google.com/macros/s/AKfycbxQJyMt5HyLINwzUI4FFrrbd-fGU3ixtMGm_oMH4ghdPvJdcgq48lOvXec74A7WmV02YQ/exec";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
  
    alert("submit開始");
  
    try {
  
      const res = await fetch(GAS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "companyRegister",
          form,
        }),
      });
  
      alert("fetch成功");
  
      const text = await res.text();
  
      alert(text);
  
      navigate("/complete");
  
    } catch (error) {
  
      console.error(error);
  
      alert("fetch失敗");
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