import { useState } from "react";

export default function OrderForm() {
  const [form, setForm] = useState({
    companyCode: "",
    companyName: "",
    address: "",
    mainPhone: "",
  
    inquiryId: "",
  
    partName: "",
    productCode: "",
    quantity: 1,
  
    chassisNumber: "",
    modelCode: "",
    classificationCode: "",
  
    remarks: "",
    agreement: false,
  });

  const [loading, setLoading] = useState(false);

  const GAS_URL =
    "https://script.google.com/macros/s/AKfycbxUhBHW7XgO0u3LBRbFIGj7dRup9sHqk2K5oG2v9h0QGurOQ0yU0Gq92Va8OvxSt8rAOQ/exec";

  const INQUIRY_API =
    "https://script.google.com/macros/s/AKfycby7NAgrN_JLuI95WG9akbM1zXupCZfU9Mc8DQhuGgaUXqJ7FSTyDfsUENeV8mm00BWZ/exec";


  // ======================
  // 問い合わせ検索
  // ======================
  const handleInquirySearch = async (inquiryId) => {
    if (!inquiryId) return;
  
    try {
      const res = await fetch(
        `${INQUIRY_API}?inquiryId=${inquiryId}`
      );
  
      const data = await res.json();
  
      console.log("RESPONSE:", data);
  
      if (!data || data.error) {
        alert("問い合わせが見つかりません");
        return;
      }
  
      setForm((prev) => ({
        ...prev,
  
        // 問い合わせ情報
        partName: data.partName || "",
        productCode: data.productCode || "",
        chassisNumber: data.chassisNumber || "",
        modelCode: data.modelCode || "",
        classificationCode: data.classificationCode || "",
  
        // 会社情報
        companyCode: data.companyCode || "",
        companyName: data.companyName || "",
        address: data.address || "",
        mainPhone: data.mainPhone || "",
      }));
  
    } catch (err) {
      console.error("API error:", err);
      alert("取得失敗");
    }
  };

  // ======================
  // 入力変更
  // ======================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ======================
  // 受注ID
  // ======================
  const createOrderId = () => {
    const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
    return `${form.companyCode}-${date}`;
  };

  // ======================
  // 送信
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agreement) {
      alert("同意が必要です");
      return;
    }

    setLoading(true);

    const orderId = createOrderId();

    const payload = {
      ...form,
      orderId,
      subject: `【新規注文】${orderId}`,
    };

    try {
      const fd = new FormData();
      fd.append("data", JSON.stringify(payload));

      await fetch(GAS_URL, {
        method: "POST",
        body: fd,
        mode: "no-cors",
      });

      alert(`送信完了\n受注ID: ${orderId}`);
    } catch (err) {
      console.error(err);
      alert("送信失敗");
    }

    setLoading(false);
  };

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={{ fontSize: 28, marginBottom: 20 }}>発注フォーム</h1>

        <form onSubmit={handleSubmit}>

          {/* ================= 問い合わせ情報取得 ================= */}
          <div style={block}>
            <label>
              問い合わせID <span style={{ color: "red" }}>※必須</span>
            </label>

            <div style={{ display: "flex", gap: "10px" }}>
              <input
                name="inquiryId"
                value={form.inquiryId}
                onChange={handleChange}
                style={{ ...input, flex: 1 }}
               placeholder="例：INQ20260525123000"
              />

          <button
            type="button"
            onClick={() => {
              console.log("🔥 取得ボタン押された");
              console.log("inquiryId:", form.inquiryId);

              handleInquirySearch(form.inquiryId);
            }}
            style={miniButton}
          >
            自動入力
          </button>
            </div>
          </div>

          {/* ================= 会社コード ================= */}
          <div style={block}>
  <label>
    会社コード 
  </label>

  <div style={{ display: "flex", gap: "10px" }}>
    <input
    name="companyCode"
   value={form.companyCode}
    onChange={handleChange}
   style={input}
   />
  </div>
</div>

          <div style={block}>
            <label>会社名</label>
            <input value={form.companyName} readOnly style={readonly} />
          </div>

          <div style={block}>
            <label>住所</label>
            <textarea value={form.address} readOnly rows={2} style={readonly} />
          </div>

          <div style={block}>
            <label>電話番号</label>
            <input value={form.mainPhone} readOnly style={readonly} />
          </div>

          

{/* ================= 商品 ================= */}
<div style={block}>
  <label>商品名</label>

  <input
    name="partName"
    value={form.partName}
    onChange={handleChange}
    style={input}
    
  />
</div>

          <div style={block}>
            <label>
              純正品番 
            </label>

            <input
              name="productCode"
              value={form.productCode}
              onChange={handleChange}
              required
              style={input}
            />
          </div>
       

          <div style={block}>
            <label>車台番号</label>
            <input
              name="chassisNumber"
              value={form.chassisNumber}
              onChange={handleChange}
              style={input}
            />
          </div>

          <div style={block}>
            <label>型式指定番号</label>
            <input
              name="modelCode"
              value={form.modelCode}
              onChange={handleChange}
              style={input}
            />
          </div>

          <div style={block}>
            <label>類別区分番号</label>
            <input
              name="classificationCode"
              value={form.classificationCode}
              onChange={handleChange}
              style={input}
            />
          </div>

          <div style={block}>
            <label>
              数量 <span style={{ color: "red" }}>※必須</span>
            </label>

            <input
              type="number"
              name="quantity"
              min={1}
              value={form.quantity}
              onChange={handleChange}
              required
              style={input}
            />
          </div>

          {/* ================= 備考 ================= */}
          <div style={block}>
            <label>備考</label>

            <textarea
              name="remarks"
              rows={4}
              value={form.remarks}
              onChange={handleChange}
              style={input}
            />
          </div>

          {/* ================= 注意事項 ================= */}
          <div style={notice}>
            <h3>注意事項</h3>

            <div>・事前に適合と在庫確認をお済ませの上ご購入ください</div>
            <div>・ご注文のタイミングにより即日発送できない場合がございます</div>
            <div>・【コア返却必須】同梱の送り状にて必ずご返却ください</div>
            <div>・互換品を発送する場合もございます</div>
            <div>・保証内容は規約のとおりでございます</div>
            <div>・発送後のお客様都合の返品はキャンセル料として購入価格の50％と一部送料を請求させていただきます</div>

            <label style={{ display: "flex", gap: 10, marginTop: 15 }}>
              <input
                type="checkbox"
                name="agreement"
                checked={form.agreement}
                onChange={handleChange}
              />
              注意事項に同意し購入する
            </label>
          </div>

          {/* ================= 送信 ================= */}
          <button
            type="submit"
            disabled={!form.agreement || loading}
            style={button}
          >
            {loading ? "送信中..." : "発注送信"}
          </button>
        </form>
      </div>
    </div>
  );
}

 

/* ================= styles ================= */

const page = {
  minHeight: "100vh",
  background: "#f3f4f6",
  padding: 30,
};

const card = {
  maxWidth: 700,
  margin: "0 auto",
  background: "#fff",
  padding: 30,
  borderRadius: 16,
};

const block = {
  marginBottom: 16,
};

const input = {
  width: "100%",
  padding: 12,
  borderRadius: 8,
  border: "1px solid #ccc",
  marginTop: 6,
  boxSizing: "border-box",
};

const readonly = {
  ...input,
  background: "#f3f4f6",
};

const notice = {
  marginTop: 20,
  padding: 20,
  background: "#f9fafb",
  borderRadius: 10,
  textAlign: "left", // ←これ追加
};

const button = {
  width: "100%",
  padding: 14,
  marginTop: 20,
  border: "none",
  borderRadius: 10,
  background: "#2563eb",
  color: "#fff",
};

const miniButton = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  cursor: "pointer",
  whiteSpace: "nowrap",
};