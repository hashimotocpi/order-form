import { callGAS } from "../lib/gas";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body || {};

    const data = await callGAS({
      type: "order",
      ...body,
    });

    return res.status(200).json(data);
  } catch (err) {
    console.error("ORDER API ERROR:", err);

    return res.status(500).json({
      error: err.message || err.toString(),
    });
  }
}