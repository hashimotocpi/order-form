import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Section from "../components/Section";
import FormTable from "../components/FormTable";
import FormRow from "../components/FormRow";

export default function OrderForm({ user }) {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
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
    deliveryTime: "",

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
  const getMinDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };
  
  const getMaxDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  };
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
        setIsOrdered(true);
      }
       else {
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
          <FormRow label="会社名">{form.companyName}</FormRow>
          <FormRow label="商品名">{form.productName}</FormRow>
          <FormRow label="品番">{form.partNumber}</FormRow>
          <FormRow label="数量">{form.quantity}</FormRow>

          <FormRow label="担当者名">{form.customerName}</FormRow>
          <FormRow label="郵便番号">{form.zipCode}</FormRow>
          <FormRow label="住所">{form.address}</FormRow>
          <FormRow label="電話番号">{form.tel}</FormRow>
          <FormRow label="メールアドレス">{form.email}</FormRow>

          <FormRow label="合計金額">
            {totalPrice.toLocaleString()} 円
                    </FormRow>

          <FormRow label="配送先">
            {form.addressType === "company"
              ? "登録住所"
              : form.address}
          </FormRow>

          <FormRow label="お届け希望">
            {form.deliveryDateType === "fast"
              ? "最短"
              : `${form.deliveryDate} ${form.deliveryTime}`}
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
// 発注完了画面
// =========================
if (isOrdered) {
  return (
    <Layout user={user} title="注文完了">
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <h2>ご注文ありがとうございました。</h2>

        <p>ご注文を受け付けました。</p>

        <p>
          内容を確認後、
          <br />
          出荷手続きを進めさせていただきます。
        </p>

        <p>
          営業時間（平日9:00～17:00）外のご注文は
          <br />
          翌営業日の対応となります。
        </p>
      </div>
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

          <FormRow label="会社コード"required>
            <input
              name="companyCode"
              value={form.companyCode}
              onChange={handleChange}
            />
          </FormRow>

          <FormRow label="会社名">
            <input
             name="companyName"
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

          <FormRow label="お届け希望">
          <div className="delivery-type">
  <label className="radio-card">
    <input
      type="radio"
      name="deliveryDateType"
      value="fast"
      checked={form.deliveryDateType === "fast"}
      onChange={handleChange}
    />
    最短
  </label>

  <label className="radio-card">
    <input
      type="radio"
      name="deliveryDateType"
      value="date"
      checked={form.deliveryDateType === "date"}
      onChange={handleChange}
    />
    日付指定
  </label>
</div>

  {form.deliveryDateType === "date" && (
    <>
      <div style={{ marginTop: "10px" }}>
        <input
          type="date"
          name="deliveryDate"
          value={form.deliveryDate}
          min={getMinDate()}
          max={getMaxDate()}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <select
          name="deliveryTime"
          value={form.deliveryTime}
          onChange={handleChange}
        >
          <option value="">
            時間帯を選択
          </option>

          <option value="午前中">
            午前中
          </option>

          <option value="14-16">
            14～16時
          </option>

          <option value="16-18">
            16～18時
          </option>

          <option value="18-20">
            18～20時
          </option>

          <option value="19-21">
            19～21時
          </option>
        </select>
      </div>
    </>
  )}

  <div
    style={{
      marginTop: "10px",
      color: "#666",
      fontSize: "12px",
    }}
  >
    ※ご希望に添えない場合がございます。
  </div>
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
<FormRow label="同意" required>

<div className="notice-box">
  <strong>注意事項</strong>

  <p>・事前に適合および在庫の確認をお済ませの上、ご購入ください。</p>

  <p>・ご注文のタイミングにより、即日発送できない場合がございます。</p>

  <p>・【コア返却必須】同梱の送り状にて必ずご返却ください。</p>

  <p>・互換品を発送する場合がございます。</p>

  <p>・保証内容は規約のとおりとなります。</p>

  <p>・発送後のお客様都合による返品は、キャンセル料として購入価格の50％および一部送料をご請求いたします。</p>

  <p>・お問い合わせなしでのご注文については、保証対象外となる場合がございます。</p>
</div>

<label className="agree-box">
  <input
    type="checkbox"
    name="agree"
    checked={form.agree}
    onChange={handleChange}
  />
  <span>注意事項に同意し購入する</span>
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