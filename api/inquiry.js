export default async function handler(req, res) {
  try {
    const { inquiryId } = req.query;

    if (!inquiryId) {
      return res.status(400).json({
        success: false,
        error: "inquiryId is required",
      });
    }

    const url =
      "https://script.google.com/macros/s/AKfycbw_H4qpReLYRlcVQFJADRcJEhlurUYNUnnc-Toi0gLaezAo38J1CDng7LeM1s7dqajY/exec" +
      `?type=getInquiry&inquiryId=${encodeURIComponent(inquiryId)}`;

    const response = await fetch(url);

    console.log("STATUS:", response.status);
    console.log("URL:", response.url);

    const text = await response.text();

    console.log("RAW GAS RESPONSE:");
    console.log(text);

    const data = JSON.parse(text);

    return res.status(200).json(data);

  } catch (err) {
    console.error("INQUIRY ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
}