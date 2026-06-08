import fs from "fs";

console.log("LIB CHECK:", fs.existsSync("./lib/gas.js"));

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { inquiryId } = req.query;

    console.log("🔥 INQUIRY ID:", inquiryId);

    const { callGAS } = await import("../lib/gas.js");

    const data = await callGAS({
      type: "getInquiry",
      inquiryId,
    });

    console.log("🔥 GAS RESPONSE:", data);

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (err) {
    console.error("❌ INQUIRY API ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}