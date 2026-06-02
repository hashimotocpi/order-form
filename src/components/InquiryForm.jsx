import { useState } from "react";

const GAS_URL =
  "https://script.google.com/macros/s/XXXXXXXXXXXX/exec"; // ←差し替え

export default function InquiryForm({ user }) {
  const [form, setForm] = useState({
    staffName: "",
    inquiryTypes: [],
    productName: "",
    vin: "",
    modelCode: "",
    classCode: "",
    contactMethod: "TEL",
    tel: "",
    email: "",
    fax: "",
  });

  const [loading, setLoading] = useState(false);

  const toggleCheckbox = (value) => {
    setForm((prev) => {
      const exists = prev.inquiryTypes.includes(value);
      return {
        ...prev,
        inquiryTypes: exists
          ? prev.inquiryTypes.filter((v) => v !== value)
          : [...prev.inquiryTypes, value],
      };
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (loading) return;
  
    setLoading(true);
  
    try {
      const payload = {
        companyCode: user?.companyCode || "",
        companyName: user?.companyName || "",
        staffName: form.staffName,
        inquiryTypes: form.inquiryTypes.join(","),
        productName: form.productName,
        vin: form.vin,
        modelCode: form.modelCode,
        classCode: form.classCode,
        contactMethod: form.contactMethod,
        tel: form.tel,
        email: form.email,
        fax: form.fax,
      };

      const res = await fetch(GAS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await res.json();

      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("送信に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <h2>問い合わせフォーム</h2>

      <input
  value={user?.companyCode || ""}
  disabled
  placeholder="会社コード"
/>

<input
  value={user?.companyName || ""}
  disabled
  placeholder="会社名"
/>

      <input
        name="staffName"
        placeholder="担当者名（必須）"
        onChange={handleChange}
      />

      <div>
        <p>問い合わせ内容</p>
        {["適合確認", "在庫確認", "納期確認", "見積依頼", "その他"].map(
          (item) => (
            <label key={item}>
              <input
                type="checkbox"
                checked={form.inquiryTypes.includes(item)}
                onChange={() => toggleCheckbox(item)}
              />
              {item}
            </label>
          )
        )}
      </div>

      <input
        name="productName"
        placeholder="商品名"
        onChange={handleChange}
      />
      <input name="vin" placeholder="車台番号（必須）" onChange={handleChange} />
      <input name="modelCode" placeholder="型式指定番号" onChange={handleChange} />
      <input name="classCode" placeholder="類別区分" onChange={handleChange} />

      <div>
        <p>希望の回答方法</p>
        <select name="contactMethod" onChange={handleChange}>
          <option value="TEL">TEL</option>
          <option value="メール">メール</option>
          <option value="FAX">FAX</option>
        </select>
      </div>

      <input name="tel" placeholder="電話番号" onChange={handleChange} />
      <input name="email" placeholder="メール" onChange={handleChange} />
      <input name="fax" placeholder="FAX" onChange={handleChange} />

      <button onClick={handleSubmit} disabled={loading}>
  {loading ? "送信中..." : "送信"}
</button>

      <p>
        お問い合わせいただきありがとうございます。<br />
        確認ご担当者よりご連絡差し上げます。<br />
        営業時間外は翌営業日対応となります。
      </p>
    </div>
  );
}