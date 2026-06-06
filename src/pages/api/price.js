import { callGAS } from "../../lib/gas";

export default async function handler(req, res) {
  try {
    const { partNumber } = req.query;

    const data = await callGAS({
      type: "getPrice",
      partNumber,
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}