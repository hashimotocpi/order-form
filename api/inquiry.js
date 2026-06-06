export default async function handler(req, res) {
  try {
    const { inquiryId } = req.query;

    const url =
      "https://script.google.com/macros/s/AKfycbw_H4qpReLYRlcVQFJADRcJEhlurUYNUnnc-Toi0gLaezAo38J1CDng7LeM1s7dqajY/exec" +
      `?type=getInquiry&inquiryId=${encodeURIComponent(inquiryId)}`;

    const response = await fetch(url);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: err.toString(),
    });
  }
}