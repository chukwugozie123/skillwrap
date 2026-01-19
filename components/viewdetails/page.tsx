// export default function ViewDeatils() {

//     const API_URL= 'https://skillwrap-backend.onrender.com';


//     async function handleDetails() {
//         const res = fetch(`${API_URL}/send-details`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//         //   exchange_id: req.exchange_id,
//           receiverId: req.from_user_id,
//         //   message: "Your skill exchange request was accepted 🎉",
//         //   metadata: req.exchange_id,
//         }),
//         })
//     }

//     return(
//         <div>
//             <p>please write out all the htings this user would learn after taking this skill</p>
//             <form onSubmit={handleDetails}>
//                 1. <input type="text" name="" id="" /> + 

//                 <button type="submit">Send</button>
//             </form>
//         </div>        
//     )    
// }



        // <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        //   <div className="bg-[#0b1228] p-8 rounded-2xl w-[90%] max-w-md relative">
        //     <button
        //       onClick={() => setDetailsPopup(false)}
        //       className="absolute top-4 right-4"
        //     >
        //       <X />
        //     </button>

        //     {loadingDetails ? (
        //       <p className="text-center">Loading...</p>
        //     ) : selectedNotif ? (
        //       <>

        //         {activeExchangeId && (
        //           <Link
        //             href={`/chat/${activeExchangeId}`}
        //             className="block text-center py-3 bg-blue-600 rounded-xl"
        //           >
        //             Continue Chating 🚀
        //           </Link>
        //         )}
        //       </>
        //     ) : (
        //       <p>No details found.</p>
        //     )}
        //   </div>
        // </div>