import fs from "fs";

console.log("LIB CHECK:", fs.existsSync("./lib/gas.js"));


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body || {};

        console.log("🔥 FRONT DATA:", body);

    // 🔥 ここを変更（絶対パス解決に寄せる）
    const { callGAS } = await import("../lib/gas.js");

    const data = await callGAS({
      type: "order",
      ...body,
    });

    console.log("🔥 GAS RESPONSE:", data);

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