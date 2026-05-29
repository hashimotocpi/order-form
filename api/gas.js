export default async function handler(req, res) {
    try {
      const response = await fetch(process.env.GAS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });
  
      const data = await response.json();
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }