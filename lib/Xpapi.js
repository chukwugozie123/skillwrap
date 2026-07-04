const API_URL = "https://skillwrap-backend.onrender.com";
// const API_URL = "http://localhost:4000";


export const addXP = async (xp, action_type) => {

  console.log(xp, action_type)

  const res = await fetch(`${API_URL}/update/xp`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ xp, action_type}),
  });

    return res.json();
  const result = await res.json();


if(result.badge){

toast.success(
`🏆 New Badge Unlocked: ${result.badge}`
);

}


if(result.level){

toast.success(
`🚀 Level Up! You are now Level ${result.level}`
);

}
  
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