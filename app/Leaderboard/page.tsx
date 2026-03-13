// // pages/leaderboard.tsx
// import { Trophy, Star } from "lucide-react";


// // const API_URL = "https://skillwrap-backend.onrender.com";
// const API_URL = "http://localhost:4000";

// async function getUsers() {
//   try {
//     const res = await fetch(`${API_URL}/auth/Leaderboard`);

//     if (!res.ok) {
//       throw new Error("Failed to fetch leaderboard");
//     }

//     const data = await res.json();
//     return Array.isArray(data.LeaderBoard) ? data.LeaderBoard : [];
//   } catch (error) {
//     console.error("Leaderboard error:", error);
//     return [];
//   }
// }

// export default async function Page() {
//   const users = await getUsers();

//   if (!users.length) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-black to-blue-900 text-white text-xl">
//         ⚠️ Unable to load leaderboard or no users available
//       </div>
//     );
//   }

//   // Sort users by points descending
//   const sortedUsers = [...users].sort((a, b) => (b.points || 0) - (a.points || 0));

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-indigo-950 text-white p-10 flex flex-col items-center">
      
//       <h1 className="text-5xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">
//         🏆 SkillWrap Leaderboard
//       </h1>

//       <div className="w-full max-w-4xl">
//         {sortedUsers.map((user, index) => {
//           // Top 3 special badges
//           let badgeColor = "";
//           if (index === 0) badgeColor = "from-yellow-400 to-orange-500";
//           else if (index === 1) badgeColor = "from-gray-400 to-gray-200";
//           else if (index === 2) badgeColor = "from-amber-600 to-yellow-400";

//           return (
//             <div
//               key={user.username || index}
//               className={`flex items-center justify-between p-4 mb-4 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 transition hover:scale-[1.02] hover:bg-white/10`}
//             >
//               <div className="flex items-center gap-4">
//                 {/* Rank + trophy */}
//                 <div className="flex flex-col items-center w-10">
//                   <span className="font-bold text-lg">{index + 1}</span>
//                   {index < 3 && (
//                     <Trophy
//                       size={20}
//                       className={`text-gradient bg-clip-text text-transparent bg-gradient-to-r ${badgeColor}`}
//                     />
//                   )}
//                 </div>

//                 {/* User Info */}
//                 <div className="flex flex-col">
//                   <span className="font-semibold text-lg">{user.username || "Anonymous"}</span>
//                   <span className="text-sm text-gray-300">Joined: {new Date(user.created_at || Date.now()).toLocaleDateString()}</span>
//                 </div>
//               </div>

//               {/* Points */}
//               <div className="flex items-center gap-2 text-yellow-400 font-bold">
//                 <Star size={18} />
//                 <span className="text-xl">{user.points || 0}</span>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Optional extra info / CTA */}
//       <div className="mt-10 text-center text-gray-300 text-sm max-w-md">
//         🎉 Keep learning, teaching, and exchanging skills to climb higher on the leaderboard! <br />
//         🔗 Invite friends with your referral code to earn bonus points.
//       </div>
//     </div>
//   );
// }












// pages/leaderboard.tsx
import { Trophy, Star, Layers, CheckCircle } from "lucide-react";
import Link from "next/link";

const API_URL = "https://skillwrap-backend.onrender.com";
// const API_URL = "http://localhost:4000";

async function getUsers() {
  try {
    const res = await fetch(`${API_URL}/auth/Leaderboard`);

    if (!res.ok) {
      throw new Error("Failed to fetch leaderboard");
    }

    const data = await res.json();
    return Array.isArray(data.LeaderBoard) ? data.LeaderBoard : [];
  } catch (error) {
    console.error("Leaderboard error:", error);
    return [];
  }
}

export default async function Page() {
  const users = await getUsers();

  if (!users.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-black to-blue-900 text-white text-xl">
        ⚠️ Unable to load leaderboard or no users available
      </div>
    );
  }

  // Sort users by points descending
  const sortedUsers = [...users].sort((a, b) => (b.points || 0) - (a.points || 0));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-indigo-950 text-white p-10 flex flex-col items-center">
      
      <h1 className="text-5xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">
        🏆 SkillWrap Leaderboard
      </h1>

      <div className="w-full max-w-4xl">
        {sortedUsers.map((user, index) => {
          // Top 3 special badges
          let badgeColor = "";
          if (index === 0) badgeColor = "from-yellow-400 to-orange-500";
          else if (index === 1) badgeColor = "from-gray-400 to-gray-200";
          else if (index === 2) badgeColor = "from-amber-600 to-yellow-400";

          return (
            <Link
              key={user.id || index}
              href={`/profiles/${user.id}`}
              className={`flex items-center justify-between p-4 mb-4 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 transition 
              hover:scale-[1.02] hover:bg-white/10 cursor-pointer`}
            >
              <div className="flex items-center gap-4">
                {/* Rank + trophy */}
                <div className="flex flex-col items-center w-10">
                  <span className="font-bold text-lg">{index + 1}</span>
                  {index < 3 && (
                    <Trophy
                      size={20}
                      className={`text-gradient bg-clip-text text-transparent bg-gradient-to-r ${badgeColor}`}
                    />
                  )}
                </div>

                {/* User Info */}
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">{user.username || "Anonymous"}</span>
                  <span className="text-sm text-gray-300">Joined: {new Date(user.created_at || Date.now()).toLocaleDateString()}</span>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                    {/* <span className="flex items-center gap-1"><Layers size={14} /> {user.createdSkills || 0} Skills</span> */}
                    {/* <span className="flex items-center gap-1"><CheckCircle size={14} /> {user.succesfullExchnage || 0} Exchanges</span> */}
                  </div>
                </div>
              </div>

              {/* Points */}
              <div className="flex items-center gap-2 text-yellow-400 font-bold">
                <Star size={18} />
                <span className="text-xl">{user.points || 0}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Optional extra info / CTA */}
      <div className="mt-10 text-center text-gray-300 text-sm max-w-md">
        🎉 Keep learning, teaching, and exchanging skills to climb higher on the leaderboard! <br />
        🔗 Invite friends with your referral code to earn bonus points.
      </div>
    </div>
  );
}