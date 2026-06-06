const GAS_URL =
  "https://script.google.com/macros/s/AKfycbw_H4qpReLYRlcVQFJADRcJEhlurUYNUnnc-Toi0gLaezAo38J1CDng7LeM1s7dqajY/exec";

export async function callGAS(payload) {
  const res = await fetch(GAS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: JSON.stringify(payload),
  });

  return await res.json();
}