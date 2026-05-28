import { useState } from "react";

export default function CompanyForm() {

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

  const [loading, setLoading] =
  useState(false);

  const [agree, setAgree] = useState(false);

const [downloaded, setDownloaded] =
  useState(false);

  const GAS_URL =
    "https://script.google.com/macros/s/AKfycbyLyjqp23MKOLXY2zzl9KMaJtBtzc-xNeC0XCj_Tjt7oE7NJ3KQs05tFDZC2knYMw8Mew/exec";

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
  
    setLoading(true);
  
    try {
  
      const formData = new FormData();
  
      formData.append(
        "data",
        JSON.stringify(form)
      );
  
      await fetch(GAS_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });
  
      alert("登録完了");
  
    } catch (error) {
  
      console.error(error);
  
      alert("送信失敗");
  
    } finally {
  
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          margin: "0 auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "16px",
        }}
      >

      <h1
        style={{
          fontSize: "28px",
          marginBottom: "30px",
          color: "#000000",
        }}
      >
          会社登録フォーム
        </h1>

        <form onSubmit={handleSubmit}>

          {/* 会社名 */}
<div style={{ marginBottom: "20px" }}>
  <label>
    会社名
    <span style={{ color: "red" }}>
      {" "}※必須
    </span>
  </label>

  <input
    type="text"
    name="company"
    required
    value={form.company}
    onChange={handleChange}
    style={inputStyle}
  />
</div>

{/* 担当者名 */}
<div style={{ marginBottom: "20px" }}>
  <label>
    担当者名
    <span style={{ color: "red" }}>
      {" "}※必須
    </span>
  </label>

  <input
    type="text"
    name="person"
    required
    value={form.person}
    onChange={handleChange}
    style={inputStyle}
  />
</div>

{/* 代表メール */}
<div style={{ marginBottom: "20px" }}>
  <label>
    代表メールアドレス
    <span style={{ color: "red" }}>
      {" "}※必須
    </span>
  </label>

  <input
    type="email"
    name="companyEmail"
    required
    value={form.companyEmail}
    onChange={handleChange}
    style={inputStyle}
  />
</div>

{/* 担当者メール */}
<div style={{ marginBottom: "20px" }}>
  <label>担当者メールアドレス</label>

  <input
    type="email"
    name="personEmail"
    value={form.personEmail}
    onChange={handleChange}
    style={inputStyle}
  />
</div>

{/* 代表電話 */}
<div style={{ marginBottom: "20px" }}>
  <label>
    代表電話番号
    <span style={{ color: "red" }}>
      {" "}※必須
    </span>
  </label>

  <input
    type="text"
    name="mainPhone"
    required
    value={form.mainPhone}
    onChange={handleChange}
    style={inputStyle}
  />
</div>

{/* その他電話 */}
<div style={{ marginBottom: "20px" }}>
  <label>連絡用電話番号</label>

  <input
    type="text"
    name="subPhone"
    value={form.subPhone}
    onChange={handleChange}
    style={inputStyle}
  />
</div>

{/* 住所 */}
<div style={{ marginBottom: "20px" }}>
  <label>
    住所
    <span style={{ color: "red" }}>
      {" "}※必須
    </span>
  </label>

  <textarea
    name="address"
    rows="3"
    required
    value={form.address}
    onChange={handleChange}
    style={inputStyle}
  />
</div>

{/* WEB */}
<div style={{ marginBottom: "20px" }}>
  <label>WEBサイト</label>

  <input
    type="text"
    name="website"
    value={form.website}
    onChange={handleChange}
    style={inputStyle}
    placeholder="https://"
  />
</div>

{/* 規約PDF */}
<div
  style={{
    marginBottom: "20px",
    padding: "16px",
    background: "#f9fafb",
    borderRadius: "10px",
    border: "1px solid #ddd",
  }}
>
<p style={{ marginBottom: "10px" }}>
  ご登録前に利用規約をダウンロードし、ご確認ください。
</p>

<div
  style={{
    fontSize: "14px",
    lineHeight: "1.8",
    color: "#374151",
    marginBottom: "16px",
    maxHeight: "220px",
    overflowY: "auto",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    background: "#ffffff",
    textAlign: "left",
  }}
>
  <p>
    (1)-1. 初回~3回目までのご注文は、
    出荷前銀行振込(前払い)となります。
  </p>

  <p>
    (1)-2. ご注文金額が税込10万円以上の商品については、
    取引回数に関わらず出荷前銀行振込となります。
  </p>

  <p>
    (1)-a. ご入金確認後の出荷手配となります。
  </p>

  <p>
    (1)-b. 見積発行後7日以内にご入金が確認できない場合、
    ご注文をキャンセルさせていただきます。
  </p>

  <p>
    (2). 4回目以降のご注文より、
    弊社審査のうえ掛け払い等をご相談可能とします。
  </p>

  <p>
    (2)-a. 掛け払いの際に支払遅延が発生した場合、
    以後のお取引は前払いへ変更となる可能性があります。
  </p>

  <p
    style={{
      fontWeight: "bold",
      color: "#b91c1c",
    }}
  >
    ※ (1)(2)いずれのお支払い条件においても、
    振込手数料はお客様負担となります。
  </p>
</div>


  <div style={{ marginTop: "16px" }}>
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <input
        type="checkbox"
        checked={agree}
        onChange={(e) =>
          setAgree(e.target.checked)
        }
        required
      />

      利用規約に同意します
    </label>
  </div>
</div>

{!downloaded ? (

<button
  type="button"
  onClick={() => {

    const link =
      document.createElement("a");

    link.href =
      "/業販規約_260525_ver1.0.pdf";

    link.download =
      "業販規約_260525_ver1.0.pdf";

    link.click();

    setDownloaded(true);
  }}
  style={{
    width: "100%",
    padding: "14px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
ダウンロード
</button>

) : (

<button
  type="submit"
  disabled={!agree || loading}
  style={{
    width: "100%",
    padding: "14px",
    background:
      !agree || loading
        ? "#9ca3af"
        : "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor:
      !agree || loading
        ? "not-allowed"
        : "pointer",
    opacity:
      !agree || loading
        ? 0.7
        : 1,
  }}
>
  {loading
    ? "送信中..."
    : "登録する"}
</button>

)}
</form>

</div>
</div>
);
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
  fontSize: "16px",
  background: "#ffffff",
  color: "#000000",
};
