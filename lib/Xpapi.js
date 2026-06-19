// const API_URL = "https://skillwrap-backend.onrender.com";
const API_URL = "http://localhost:4000";


export const addXP = async (xp) => {

  const res = await fetch(`${API_URL}/update/xp`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ xp }),
  });

  return res.json();
};

export const XpTransactions = async (xp, action) => {
  const res = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      xp,
      action,
    }),
  });

  return await res.json();
};