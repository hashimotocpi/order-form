const GAS_URL =
  "https://script.google.com/macros/s/AKfycbw_H4qpReLYRlcVQFJADRcJEhlurUYNUnnc-Toi0gLaezAo38J1CDng7LeM1s7dqajY/exec";

// =========================
// ① 問い合わせ取得（GET）
// =========================
export const getInquiry = async (inquiryId) => {
  try {
    const url = new URL(GAS_URL);
    url.searchParams.set("type", "getInquiry");
    url.searchParams.set("inquiryId", inquiryId);

    const res = await fetch(url.toString());
    const data = await res.json();

    return data;
  } catch (err) {
    console.error("getInquiry error:", err);
    throw err;
  }
};

// =========================
// ② 発注処理（POST）
// =========================
export const createOrder = async (form, user) => {
  try {
    const res = await fetch(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "order",
        form,
        user,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("createOrder error:", err);
    throw err;
  }
};

// =========================
// ③ まとめてexport（任意）
// =========================
export const api = {
  getInquiry,
  createOrder,
};