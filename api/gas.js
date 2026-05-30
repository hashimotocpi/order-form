export default async function handler(req, res) {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyJtZsABuzOZGN0mOqZQ-uhuT2NGwAKGJkVlxvM-_jPIKX60TgH0nqa1gEv3edWA9Or_A/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        }
      );
  
      const data = await response.json();
  
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }