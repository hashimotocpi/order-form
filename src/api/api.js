const GAS_URL =
  "あなたのGASデプロイURL";

export const api = {
  inquiry: async (form, user) => {
    const res = await fetch(GAS_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "inquiry",
        form,
        user,
      }),
    });

    return await res.json();
  },
};