export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("HANDLER HIT");

    const GAS_URL =
      "https://script.google.com/macros/s/AKfycbxGehN-tepbqpyik5E55WS0u9LzG0B4Y1SkmJQWWTGpmgAWiMjQsQ3tt0hLJyEQFpFy/exec";

      const response = await fetch(GAS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "order",
          ...(req.body || {}),
        }),
      });

    const result = await response.text();

    console.log("GAS RESPONSE:", result);

    return res.status(200).json({
      success: true,
      gasResponse: result,
    });

  } catch (error) {
    console.error("HANDLER ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.toString(),
    });
  }
}