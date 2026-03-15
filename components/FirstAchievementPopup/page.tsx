// "use client";

// import { useState } from "react";
// import Confetti from "react-confetti";
// import { useRouter } from "next/navigation";

// interface FirstAchievementPopupProps {
//   trigger: boolean;           // show popup
//   message: string;            // main message
//   points: number;             // points to claim
//   onClose: () => void;        // callback after closing
// }

// export default function FirstAchievementPopup({
//   trigger,
//   message,
//   points,
//   onClose,
// }: FirstAchievementPopupProps) {
//   const [claimed, setClaimed] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const API_URL = "https://skillwrap-backend.onrender.com";

//   if (!trigger) return null;

//   const handleClaimPoints = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`${API_URL}/auth/points/add`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ points }),
//       });
//       const data = await res.json();

//       if (res.ok && data.success) {
//         setClaimed(true);
//         // wait 2s then redirect back to normal page
//         setTimeout(() => {
//           onClose();
//           router.push("/skills"); // redirect to /skills or wherever
//         }, 2000);
//       } else {
//         alert(`Failed to claim points: ${data.error || "Unknown error"}`);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Network error. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
//       {/* multiple confetti layers for more effect */}
//       <Confetti width={window.innerWidth} height={window.innerHeight} recycle={true} numberOfPieces={250} />
//       <Confetti width={window.innerWidth} height={window.innerHeight} recycle={true} numberOfPieces={200} />

//       <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 w-11/12 max-w-md text-center shadow-2xl">
//         <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
//           🎉 {message} 🎉
//         </h1>

//         <p className="text-white/90 text-lg mb-4">
//           Congratulations! You just unlocked your first achievement. <br />
//           You have earned <span className="font-bold text-yellow-300">{points}</span> points for this milestone.
//         </p>

//         {!claimed ? (
//           <button
//             onClick={handleClaimPoints}
//             disabled={loading}
//             className="relative w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:scale-105 transform transition-all"
//           >
//             {loading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <svg
//                   className="animate-spin h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   />
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
//                   />
//                 </svg>
//                 Claiming...
//               </span>
//             ) : (
//               "Claim Points"
//             )}
//           </button>
//         ) : (
//           <p className="text-green-400 font-bold mt-4 text-lg">Points claimed! ✅ Redirecting...</p>
//         )}

//         <p className="mt-4 text-white/50 text-sm">
//           Tip: You can use these points to exchange rewards or unlock premium content.
//         </p>
//       </div>
//     </div>
//   );
// }


















"use client";

import { useState } from "react";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";

interface FirstAchievementPopupProps {
  trigger: boolean;
  message: string;
  points: number;
  onClose: () => void;
}

export default function FirstAchievementPopup({
  trigger,
  message,
  points,
  onClose,
}: FirstAchievementPopupProps) {
  const [claimed, setClaimed] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const API_URL = "https://skillwrap-backend.onrender.com";

  if (!trigger) return null;

  const handleClaimPoints = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/auth/points/add`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ points }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setClaimed(true);
        // redirect **only after claim** and small delay for UX
        // setTimeout(() => {
        //   onClose();
        //   router.push("/skills"); // redirect to /skills
        // }, 2000);
      } else {
        alert(`Failed to claim points: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <Confetti width={window.innerWidth} height={window.innerHeight} recycle={true} numberOfPieces={20} />
      {/* <Confetti width={window.innerWidth} height={window.innerHeight} recycle={true} numberOfPieces={200} /> */}

      <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 w-11/12 max-w-md text-center shadow-2xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          🎉 {message} 🎉
        </h1>

        <p className="text-white/90 text-lg mb-4">
          Congratulations! You just unlocked your first achievement. <br />
          You have earned <span className="font-bold text-yellow-300">{points}</span> points for this milestone.
        </p>

        {!claimed ? (
          <button
            onClick={handleClaimPoints}
            disabled={loading}
            className="relative w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:scale-105 transform transition-all"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                  />
                </svg>
                Claiming...
              </span>
            ) : (
              "Claim Points"
            )}
          </button>
        ) : (
          <p className="text-green-400 font-bold mt-4 text-lg">Points claimed! ✅ Redirecting...</p>
        )}

        <p className="mt-4 text-white/50 text-sm">
          Tip: You can use these points to exchange rewards or unlock premium content.
        </p>
      </div>
    </div>
  );
}