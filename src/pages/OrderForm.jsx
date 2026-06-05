import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Section from "../components/Section";
import FormTable from "../components/FormTable";
import FormRow from "../components/FormRow";
import { api } from "../api/api";

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

  // =========================
  // 共通入力処理
  // =========================
  const handleChange = (e) => {
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
        `${api.baseUrl}?type=getInquiry&inquiryId=${form.inquiryId}`
      );
  
      const inquiry = await res.json();
  
      console.log("問い合わせ結果:", inquiry);
      console.log(JSON.stringify(inquiry, null, 2));

      alert(JSON.stringify(inquiry));
  

      console.log("問い合わせ結果", inquiry);
      
      console.log("partNumber", inquiry.partNumber);
      if (!inquiry.success) {
        alert("問い合わせが見つかりません");
        return;
      }
     
      
      console.log("setForm実行前");
      console.log(inquiry);
      
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
    const fetchPrice = async () => {
      if (!form.partNumber) return;
  
      try {
        const res = await fetch(
          `${api.baseUrl}?type=getPrice&partNumber=${form.partNumber}`
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
  }, [form.partNumber]);
  
  useEffect(() => {
    const total =
      Number(form.quantity || 0) *
      Number(form.unitPrice || 0);
  
    setForm((prev) => ({
      ...prev,
      totalPrice: total,
    }));
  }, [form.quantity, form.unitPrice]);

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
      const res = await fetch(api.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "order",
          ...form,
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
              {form.totalPrice.toLocaleString()} 円
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
          <FormRow label="問い合わせID" required>
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
    readOnly
  />
</FormRow>

          <FormRow label="会社名">
            <input value={form.companyName} readOnly />
          </FormRow>

          <FormRow label="商品名">
            <input value={form.productName} readOnly />
          </FormRow>

          <FormRow label="純正品番">
            <input value={form.partNumber} readOnly />
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
            {form.totalPrice.toLocaleString()} 円
          </FormRow>

          {/* 車両 */}
          <FormRow label="車台番号">
            <input value={form.chassisNo} readOnly />
          </FormRow>

          <FormRow label="型式指定番号">
            <input value={form.modelCode} readOnly />
          </FormRow>

          <FormRow label="類別区分番号">
            <input value={form.classCode} readOnly />
          </FormRow>

          {/* 電話 */}
          <FormRow label="電話番号">
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </FormRow>

          {/* 配送先 */}
          <FormRow label="配送先">
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
          <FormRow label="同意">
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