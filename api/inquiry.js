export default async function handler(req, res) {
  try {
    const { inquiryId } = req.query;

    const url =
      "https://script.google.com/macros/s/AKfycbw_H4qpReLYRlcVQFJADRcJEhlurUYNUnnc-Toi0gLaezAo38J1CDng7LeM1s7dqajY/exec" +
      `?type=getInquiry&inquiryId=${encodeURIComponent(inquiryId)}`;

    const response = await fetch(url);

    const text = await response.text();

    console.log("🔥 GAS RAW:", text);

    const data = JSON.parse(text);

    return res.status(200).json(data);

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
}