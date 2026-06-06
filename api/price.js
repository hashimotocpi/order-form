import { callGAS } from "../lib/gas";

export default async function handler(req, res) {
  try {
    const { partNumber } = req.query;

    const url =
      "https://script.google.com/macros/s/AKfycbw_H4qpReLYRlcVQFJADRcJEhlurUYNUnnc-Toi0gLaezAo38J1CDng7LeM1s7dqajY/exec" +
      `?type=getPrice&partNumber=${encodeURIComponent(partNumber)}`;

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: err.toString(),
    });
  }
}