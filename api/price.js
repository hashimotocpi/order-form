export default async function handler(req, res) {
  try {
    const { partNumber } = req.query;

    const url =
      "https://script.google.com/macros/s/AKfycbxGehN-tepbqpyik5E55WS0u9LzG0B4Y1SkmJQWWTGpmgAWiMjQsQ3tt0hLJyEQFpFy/exec" +
      `?type=getPrice&partNumber=${encodeURIComponent(partNumber)}`;

    const response = await fetch(url);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: err.toString(),
    });
  }
}