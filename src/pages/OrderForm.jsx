import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Section from "../components/Section";
import FormTable from "../components/FormTable";
import FormRow from "../components/FormRow";

export default function OrderForm({ user }) {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    inquiryId: "",

    companyCode: "",
    companyName: "",
    productName: "",
    partNumber: "",

    unitPrice: 0,
    quantity: 1,
  
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

  // =========================
  // 共通入力処理
  // =========================
  const handleChange = (e) => {
    console.log(
      "change:",
      e.target.name,
      e.target.value
    );
  
    const { name, value, type, checked } = e.target;
  
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================
// 問い合わせ取得（手動）
// =========================
const fetchInquiry = async () => {
  try {
    console.log("問い合わせID:", form.inquiryId);

    const res = await fetch(
      `/api/inquiry?inquiryId=${encodeURIComponent(form.inquiryId)}`
    );

    console.log("status", res.status);

    const text = await res.text();

    console.log("response text:", text);

    let inquiry;

    try {
      inquiry = JSON.parse(text);
    } catch {
      console.error("JSONではありません");
      return;
    }

    console.log("問い合わせ結果:", inquiry);
    alert(JSON.stringify(inquiry));

    if (!inquiry.success) {
      alert("問い合わせが見つかりません");
      return;
    }
    
    setForm((prev) => ({
      ...prev,
      companyCode: inquiry.companyCode || "",
      companyName: inquiry.companyName || "",
      productName: inquiry.productName || "",
      partNumber: inquiry.partNumber || "",
      chassisNo: inquiry.chassisNo || "",
      modelCode: inquiry.modelCode || "",
      classCode: inquiry.classCode || "",
    }));
  } catch (err) {
    console.error("fetchInquiry error:", err);
    alert("問い合わせ取得失敗");
  }
};

  // =========================
  // 金額計算
  // =========================
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!form.partNumber) return;
  
      const fetchPrice = async () => {
        try {
          const res = await fetch(
            `/api/price?partNumber=${form.partNumber}`
          );

                  
          const data = await res.json();
    
          setForm((prev) => ({
            ...prev,
            unitPrice: Number(data.price || 0),
          }));
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchPrice();
    }, 200);
  
    return () => clearTimeout(timer);
  }, [form.partNumber]);
  
  const totalPrice =
  Number(form.quantity || 0) *
  Number(form.unitPrice || 0); 

  // =========================
  // 発注処理
  // =========================
  const submitOrder = async () => {
    if (!form.agree) {
      alert("利用規約に同意してください");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          totalPrice,
          email: user?.email,
        }),
      });
      
      const data = await res.json();

      if (data.success) {
        alert("発注完了しました");
        setConfirm(false);
      } else {
        alert("発注失敗");
      }
    } catch (err) {
      console.error(err);
      alert("通信エラー");
    }

    setLoading(false);
  };

  // =========================
  // 確認画面
  // =========================
  if (confirm) {
    return (
      <Layout user={user}>
        <Section title="発注内容確認">
          <FormTable>
            <FormRow label="問い合わせID">{form.inquiryId}</FormRow>
            <FormRow label="会社名">{form.companyName}</FormRow>
            <FormRow label="商品名">{form.productName}</FormRow>
            <FormRow label="品番">{form.partNumber}</FormRow>

            <FormRow label="数量">{form.quantity}</FormRow>

            <FormRow label="合計金額">
              {totalPrice.toLocaleString()} 円
            </FormRow>

            <FormRow label="配送先">
              {form.addressType === "company"
                ? "登録住所"
                : form.address}
            </FormRow>

            <FormRow label="備考">{form.memo}</FormRow>
          </FormTable>

          <div className="button-area">
            <button onClick={() => setConfirm(false)}>
              戻る
            </button>

            <button onClick={submitOrder} disabled={loading}>
              {loading ? "送信中..." : "発注確定"}
            </button>
          </div>
        </Section>
      </Layout>
    );
  }

  // =========================
  // 入力画面
  // =========================
  return (
    <Layout user={user}>
      <Section title="発注フォーム">
        <FormTable>

          {/* 問い合わせID */}
          <FormRow label="問い合わせID" >
  <div style={{ display: "flex", gap: "8px" }}>
    <input
      name="inquiryId"
      value={form.inquiryId}
      onChange={handleChange}
    />

    <button
      type="button"
      onClick={fetchInquiry}
    >
      取得
    </button>
  </div>
</FormRow>

          <FormRow label="会社コード">
            <input
              name="companyCode"
              value={form.companyCode}
              onChange={handleChange}
            />
          </FormRow>

          <FormRow label="会社名">
            <input
             name="companyCode"
             value={form.companyName} 
             onChange={handleChange} />
          </FormRow>

          <FormRow label="商品名">
            <input
              name="productName"
              value={form.productName}
              onChange={handleChange} />
          </FormRow>

          <FormRow label="純正品番"required>
            <input
             name="partNumber"
             value={form.partNumber}
              onChange={handleChange} />
          </FormRow>

          {/* 数量 */}
          <FormRow label="数量" required>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
            />
          </FormRow>

          <FormRow label="合計金額">
          {totalPrice.toLocaleString()} 円
          </FormRow>

          {/* 車両 */}
          <FormRow label="車台番号"required>
            <input
             name="chassisNo"
             value={form.chassisNo}
             onChange={handleChange}/>
          </FormRow>

          <FormRow label="型式指定番号">
            <input
             name="modelCode"
             value={form.modelCode}
              onChange={handleChange} />
          </FormRow>

          <FormRow label="類別区分番号">
            <input
             name="classCode"
             value={form.classCode}
              onChange={handleChange}/>
          </FormRow>

          {/* 電話 */}
          <FormRow label="電話番号"required>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </FormRow>

          {/* 配送先 */}
          <FormRow label="配送先"required>
            <select
              name="addressType"
              value={form.addressType}
              onChange={handleChange}
            >
              <option value="company">登録住所へ配送</option>
              <option value="custom">別住所へ配送</option>
            </select>

            {form.addressType === "custom" && (
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="配送先住所"
              />
            )}
          </FormRow>

          {/* 備考 */}
          <FormRow label="備考">
            <textarea
              name="memo"
              value={form.memo}
              onChange={handleChange}
            />
          </FormRow>

          {/* 同意 */}
          <FormRow label="同意"required>
            <label>
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
              />
              利用規約に同意する
            </label>
          </FormRow>

        </FormTable>

        <div className="button-area">
          <button
            disabled={!form.agree}
            onClick={() => setConfirm(true)}
          >
            確認へ進む
          </button>
        </div>
      </Section>
    </Layout>
  );
}