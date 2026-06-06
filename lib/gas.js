const GAS_URL =
  "https://script.google.com/macros/s/AKfycbw_H4qpReLYRlcVQFJADRcJEhlurUYNUnnc-Toi0gLaezAo38J1CDng7LeM1s7dqajY/exec";

  export async function callGAS(payload) {
    const res = await fetch(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  
    const text = await res.text();
  
    console.log("🔥 GAS RAW:", text);
  
    try {
      return JSON.parse(text);
    } catch (e) {
      throw new Error("GAS returned invalid JSON: " + text);
    }
  }