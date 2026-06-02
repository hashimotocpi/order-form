import { useState } from "react";
import { api } from "./api";

export default function InquiryForm({ user }) {
  const [form, setForm] = useState({
    productName: "",
    vin: "",
    modelCode: "",
    classCode: "",
    inquiryType: [],
    tel: "",
  });

  const toggle = (v) => {
    setForm((p) => ({
      ...p,
      inquiryType: p.inquiryType.includes(v)
        ? p.inquiryType.filter((x) => x !== v)
        : [...p.inquiryType, v],
    }));
  };

  const submit = async () => {
    const res = await api({
      action: "inquiry",
      ...form,
      companyCode: user.companyCode,
      companyName: user.companyName,
    });

    alert(res.inquiryId);
  };

  return (
    <div>
      <input placeholder="商品名" onChange={(e) => setForm({ ...form, productName: e.target.value })} />
      <input placeholder="車台番号" onChange={(e) => setForm({ ...form, vin: e.target.value })} />
      <input placeholder="型式" onChange={(e) => setForm({ ...form, modelCode: e.target.value })} />

      {["適合確認","在庫確認","納期確認","見積依頼","その他"].map(v => (
        <label key={v}>
          <input type="checkbox" onChange={() => toggle(v)} />
          {v}
        </label>
      ))}

      <input placeholder="TEL" onChange={(e) => setForm({ ...form, tel: e.target.value })} />

      <button onClick={submit}>送信</button>
    </div>
  );
}