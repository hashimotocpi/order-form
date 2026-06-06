import { callGAS } from "../lib/gas";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // bodyの安全化（ここ重要）
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body || {};

    console.log("📦 REQUEST BODY:", body);

    // GAS呼び出し（唯一の通信ポイント）
    const data = await callGAS({
      type: "order",
      ...body,
    });

    console.log("🔥 GAS RESPONSE:", data);

    // GASレスポンスチェック
    if (!data) {
      throw new Error("GAS returned empty response");
    }

    if (typeof data !== "object") {
      throw new Error("GAS response is not JSON: " + data);
    }

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (err) {
    console.error("❌ ORDER API ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}