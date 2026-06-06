import { callGAS } from "../lib/gas";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = await callGAS({
      type: "order",
      ...req.body,
    });

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: err.toString(),
    });
  }
}