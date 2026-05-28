import { useState } from "react";

export default function InquiryForm() {

  const [form, setForm] = useState({
    companyCode: "",
    partName: "",
    chassisNumber: "",
    modelCode: "",
    classificationCode: "",
    inquiryText: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const GAS_URL =
    "https://script.google.com/macros/s/AKfycbxhhILh12K2fStCHSWfgh1kbSwtbwUaZ04hhIVEX1R_HuIy1It4Xsqi4rUQ1sDH3xSb/exec";

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        setLoading(true);
      
        try {
          const res = await fetch(GAS_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          });
      
          const data = await res.json();
          console.log("GAS RESPONSE:", data);
      
          alert("問い合わせ送信完了");
      
        } catch (err) {
          console.error("送信エラー:", err);
          alert("送信失敗");
      
        } finally {
          setLoading(false);
        }
      };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>

        <h1 style={titleStyle}>
          問い合わせフォーム
        </h1>

        <form onSubmit={handleSubmit}>

           {/* 会社コード */}
          <div style={field}>
            <label>
              会社コード
              <span style={{ color: "red" }}>
                {" "}
                ※お持ちの方は入力必須
              </span>
            </label>

            <input
              name="companyCode"
              value={form.companyCode}
          onChange={handleChange}
              style={inputStyle}
              placeholder="例：FAP00000000000"
            />
          </div>

          {/* 商品名 */}
          <div style={field}>
            <label>商品名（例：オルタネーター）</label>
            <input
              name="partName"
              value={form.partName}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* 車台番号 */}
          <div style={field}>
            <label>車台番号</label>
            <input
              name="chassisNumber"
              value={form.chassisNumber}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* 型式 */}
          <div style={field}>
            <label>型式指定番号</label>
            <input
              name="modelCode"
              value={form.modelCode}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* 類別 */}
          <div style={field}>
            <label>類別区分番号</label>
            <input
              name="classificationCode"
              value={form.classificationCode}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* 問い合わせ内容 */}
          <div style={field}>
            <label>
              問い合わせ内容
              <span style={{ color: "red" }}> ※必須</span>
            </label>

            <textarea
              name="inquiryText"
              value={form.inquiryText}
              onChange={handleChange}
              rows="5"
              required
              style={inputStyle}
              placeholder="例：在庫確認・適合確認など"
            />
          </div>

          <button
  type="submit"
  style={buttonStyle}
  disabled={loading}
>
  {loading ? "送信中..." : "問い合わせ送信"}
</button>

        </form>

      </div>
    </div>
  );
}

/* ===== UI STYLE（旧寄せ） ===== */

const pageStyle = {
  minHeight: "100vh",
  background: "#f3f4f6",
  padding: "40px",
};

const cardStyle = {
  maxWidth: "700px",
  margin: "0 auto",
  background: "#fff",
  padding: "30px",
};

const titleStyle = {
  fontSize: "28px",
  marginBottom: "25px",
};

const field = {
  marginBottom: "18px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  marginTop: "6px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "bold",
};