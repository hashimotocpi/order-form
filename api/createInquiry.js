export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body;

    console.log("🔥 CREATE INQUIRY INPUT:", body);

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxtkmbZ8W_4xbsBkkdpjk4JT4JfHWfdXXGvHu7GwDowpBOSRJ5JX-qmLvEuI82kXH2n/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "createInquiry",
          ...body,
        }),
      }
    );

    const data = await response.json();

    console.log("🔥 GAS RESPONSE:", data);

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (err) {
    console.error("❌ CREATE INQUIRY ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}