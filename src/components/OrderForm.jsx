import { useState, useEffect } from "react";

const GAS_URL =
  "https://script.google.com/macros/s/XXXX/exec"; // ←あなたのGAS URLに差し替え

export default function OrderForm({ user }) {
  const [form, setForm] = useState({
    inquiryId: "",
    companyCode: "",
    companyName: "",
    productName: "",
    partNumber: "",
    quantity: 1,
    totalPrice: 0,
    chassisNo: "",
    modelCode: "",
    classCode: "",
    phone: "",
    addressType: "company",
    address: "",
    deliveryDateType: "fast",
    deliveryDate: "",
    memo: "",
    agree: false,
  });

  const [confirm, setConfirm] = useState(false);

  // =========================
  // inquiryId → 自動取得API想定
  // =========================
  useEffect(() => {
    if (!form.inquiryId) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`${GAS_URL}?type=getInquiry&inquiryId=${form.inquiryId}`);
        const data = await res.json();

        setForm((p) => ({
          ...p,
          companyCode: data.companyCode || "",
          companyName: data.companyName || "",
          productName: data.productName || "",
          partNumber: data.partNumber || "",
          chassisNo: data.chassisNo || "",
          modelCode: data.modelCode || "",
          classCode: data.classCode || "",
        }));
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [form.inquiryId]);

  // =========================
  // 金額計算（仮単価あり想定）
  // =========================
  const unitPriceMap = {
    default: 10000, // 後でスプレッドシート連携可能
  };

  useEffect(() => {
    const unit = unitPriceMap[form.partNumber] || unitPriceMap.default;
    const total = unit * Number(form.quantity || 0);

    setForm((p) => ({ ...p, totalPrice: total }));
  }, [form.partNumber, form.quantity]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitOrder = async () => {
    await fetch(GAS_URL, {
      method: "POST",
      body: JSON.stringify({
        ...form,
        userEmail: user?.email,
      }),
    });

    alert("発注完了しました");
  };

  // =========================
  // 確認画面
  // =========================
  if (confirm) {
    return (
      <div style={{ padding: 20 }}>
        <h2>発注内容確認</h2>

        <pre>{JSON.stringify(form, null, 2)}</pre>

        <button onClick={() => setConfirm(false)}>戻る</button>
        <button onClick={submitOrder}>発注する</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, maxWidth: 700 }}>
      <h2>発注フォーム</h2>

      <input placeholder="問い合わせID" name="inquiryId" onChange={handleChange} />

      <input placeholder="会社コード" name="companyCode" value={form.companyCode} readOnly />
      <input placeholder="会社名" name="companyName" value={form.companyName} readOnly />

      <input placeholder="商品名" name="productName" value={form.productName} readOnly />
      <input placeholder="純正品番" name="partNumber" value={form.partNumber} readOnly />

      <input
        placeholder="数量（必須）"
        name="quantity"
        type="number"
        onChange={handleChange}
      />

      <div>合計金額：{form.totalPrice.toLocaleString()}円</div>

      <input placeholder="車台番号" name="chassisNo" value={form.chassisNo} readOnly />
      <input placeholder="型式指定番号" name="modelCode" value={form.modelCode} readOnly />
      <input placeholder="類別区分番号" name="classCode" value={form.classCode} readOnly />

      <input placeholder="電話番号" name="phone" onChange={handleChange} />

      {/* 住所選択 */}
      <select name="addressType" onChange={handleChange}>
        <option value="company">御社直送（自動）</option>
        <option value="custom">指定直送先</option>
      </select>

      {form.addressType === "custom" && (
        <input
          placeholder="お届け先住所"
          name="address"
          onChange={handleChange}
        />
      )}

      <select name="deliveryDateType" onChange={handleChange}>
        <option value="fast">最短</option>
        <option value="指定">日時指定</option>
      </select>

      {form.deliveryDateType === "指定" && (
        <input type="date" name="deliveryDate" onChange={handleChange} />
      )}

      <textarea placeholder="備考" name="memo" onChange={handleChange} />

      <h4>注意事項</h4>
      <p style={{ fontSize: 12 }}>
        ・返品はキャンセル料50%  
        ・互換品の場合あり  
        ・保証は規約通り  
      </p>

      <label>
        <input type="checkbox" name="agree" onChange={handleChange} />
        同意する
      </label>

      <button disabled={!form.agree} onClick={() => setConfirm(true)}>
        発注内容確認へ
      </button>
    </div>
  );
}