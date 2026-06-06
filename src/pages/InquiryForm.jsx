import { useState } from "react";
import Layout from "../components/Layout";
import Section from "../components/Section";
import FormTable from "../components/FormTable";

export default function InquiryForm({ user, setUser }) {
  const [form, setForm] = useState({
    staffName: "",
    productName: "",
    vin: "",
    modelCode: "",
    classCode: "",
    inquiryTypes: [],
    inquiryContent: "",
    contactMethod: "TEL",
    contact: "",
  });

  const [images, setImages] = useState([]);
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const convertImagesToBase64 = async (files) => {
    return Promise.all(
      [...files].map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
  
          reader.onload = () => {
            resolve({
              name: file.name,
              type: file.type,
              data: reader.result.split(",")[1], // base64だけ
            });
          };
  
          reader.readAsDataURL(file);
        });
      })
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleCheckbox = (item) => {
    setForm((prev) => ({
      ...prev,
      inquiryTypes: prev.inquiryTypes.includes(item)
        ? prev.inquiryTypes.filter((v) => v !== item)
        : [...prev.inquiryTypes, item],
    }));
  };

  const handleImages = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setIsLoading(true);
  
    try {
      const imageData = await convertImagesToBase64(images);
  
      const payload = {
        ...form,
        companyCode: user?.companyCode,
        companyName: user?.companyName,
        images: imageData,
      };
  
      const res = await fetch("/api/createInquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      
      console.log("問い合わせ結果:", data);
      
      if (data.success) {
        setIsSent(true);
      } else {
        alert("送信失敗");
      }
      
      
  
    } catch (err) {
      console.error(err);
      alert("通信エラー");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <Layout user={user} setUser={setUser} title="送信完了">
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <h2>お問い合わせいただきありがとうございます。</h2>
  
          <p>確認ご担当者よりご連絡差し上げます。</p>
  
          <p>
            なお、営業時間（平日9：00～17：00）外のお問い合わせは<br />
            翌営業日の回答となります。
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout user={user} setUser={setUser} title="商品問い合わせ">

      {/* ================= お客様情報 ================= */}
      <Section title="お客様情報">
        <FormTable>
          <tr>
            <th>会社コード</th>
            <td>{user?.companyCode || ""}</td>
          </tr>

          <tr>
            <th>会社名</th>
            <td>{user?.companyName || ""} 様</td>
          </tr>

          <tr>
            <th>担当者名 *</th>
            <td>
              <input
                name="staffName"
                value={form.staffName}
                onChange={handleChange}
              />
            </td>
          </tr>
        </FormTable>
      </Section>

      {/* ================= 問い合わせ内容 ================= */}
      <Section title="問い合わせ内容">
        <div className="checkbox-list">
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

        <div className="form-group">
          <label>お問い合わせ詳細</label>
          <textarea
            name="inquiryContent"
            value={form.inquiryContent}
            onChange={handleChange}
            rows={6}
            placeholder="お問い合わせ内容を入力してください"
          />
        </div>
      </Section>

      {/* ================= 商品情報 ================= */}
      <Section title="商品情報">
        <FormTable>
          <tr>
            <th>商品名</th>
            <td>
              <input
                name="productName"
                value={form.productName}
                onChange={handleChange}
              />
            </td>
          </tr>

          <tr>
            <th>車台番号 *</th>
            <td>
              <input name="vin" value={form.vin} onChange={handleChange} />
            </td>
          </tr>

          <tr>
            <th>型式指定番号</th>
            <td>
              <input
                name="modelCode"
                value={form.modelCode}
                onChange={handleChange}
              />
            </td>
          </tr>

          <tr>
            <th>類別区分番号</th>
            <td>
              <input
                name="classCode"
                value={form.classCode}
                onChange={handleChange}
              />
            </td>
          </tr>

          {/* 画像添付 ←ここに追加 */}
          <tr>
            <th>画像添付</th>
            <td>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImages}
              />
              <p>選択枚数：{images.length}枚</p>
            </td>
          </tr>
        </FormTable>
      </Section>

      {/* ================= 回答方法 ================= */}
      <Section title="回答方法">
        <div className="form-group">
          <label>回答方法</label>
          <select
            name="contactMethod"
            value={form.contactMethod}
            onChange={handleChange}
          >
            <option value="TEL">TEL</option>
            <option value="メール">メール</option>
            <option value="FAX">FAX</option>
          </select>
        </div>

        <div className="form-group" style={{ marginTop: "15px" }}>
          <label>
            連絡先 <span className="required">*</span>
          </label>
          <input
            name="contact"
            placeholder="電話番号・メールアドレス・FAX番号"
            value={form.contact}
            onChange={handleChange}
          />
        </div>
      </Section>

      {/* ================= 送信ボタン ================= */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
  <button
    className="submit-button"
    onClick={handleSubmit}
    type="button"
    disabled={isLoading}
  >
    {isLoading ? "送信中..." : "問い合わせ送信"}
  </button>
</div>

    </Layout>
  );
}