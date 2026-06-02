export const GAS_URL = "https://script.google.com/macros/s/XXXX/exec";

export async function api(payload) {
  const res = await fetch(GAS_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res.json();
}