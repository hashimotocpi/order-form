import { callGAS } from "../../lib/gas";

export default async function handler(req, res) {
  try {
    const { inquiryId } = req.query;

    const data = await callGAS({
      type: "getInquiry",
      inquiryId,
    });

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
}