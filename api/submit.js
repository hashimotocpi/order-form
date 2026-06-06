export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    try {
      const GAS_URL =
        "https://script.google.com/macros/s/AKfycbxtkmbZ8W_4xbsBkkdpjk4JT4JfHWfdXXGvHu7GwDowpBOSRJ5JX-qmLvEuI82kXH2n/exec";
  
        const response = await fetch(GAS_URL, {
          method: "POST",
          body: JSON.stringify(req.body || {}),
        });
  
      const result = await response.text();
  
      return res.status(200).json({
        success: true,
        gasResponse: result,
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.toString(),
      });
    }
  }