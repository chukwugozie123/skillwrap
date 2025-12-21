"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserPage({ skills = [] }: { skills?: any[] }) {
  if (!Array.isArray(skills) || skills.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-400 text-lg font-semibold">No skills found ❌</p>
      </div>
    );
  }

  const router = useRouter()

  const getImageSrc = (skill: any) => {
    const raw = skill.skill_img || skill.image_url || "";

    if (!raw || raw === "null" || raw === "undefined") {
      return "/default-skill.png";
    }

    // If multer stored only filename → prepend backend URL
    if (!raw.startsWith("http")) {
      return `http://localhost:5000/uploads/${raw}`;
    }

    return raw;
  };

  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {skills.map((skill) => {
        const imgSrc = getImageSrc(skill);

        return (
          <div
            key={skill.id}
            className="group bg-white/5 border border-white/10 rounded-2xl shadow-lg 
            overflow-hidden hover:shadow-cyan-500/40 hover:-translate-y-2 
            transition-all duration-300"
          >
            <Link href={`/skills/${skill.id}`}>
              <div className="relative h-48 w-full overflow-hidden">
                
                <Image
                  src={imgSrc}
                  alt={skill.title || "Skill"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 to-transparent" />
              </div>
            </Link>

            {/* CONTENT */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-1">
                {skill.title}
              </h2>

              <p className="text-gray-400 text-sm mb-3 line-clamp-3">
                {skill.description}
              </p>

              <p className="text-sm text-gray-400 mb-2">
                Uploaded by:{" "}
                <span className="text-cyan-400">{skill.username}</span>
              </p>

              {skill.category && (
                <span className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 
                text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
                  {skill.category}
                </span>
              )}
            </div>

            {/* Exchange Button */}
            <button
  onClick={() => {
    sessionStorage.setItem("selectedSkill", JSON.stringify(skill));
    router.push("/exchange_skill");
  }}
  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg"
>
  Request Exchange
</button>

            {/* <Link
              href={`/exchange_skill?skill=${skill.id}`}
              className="block"
            >
              <button
                className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 
                font-semibold text-white shadow-lg hover:shadow-cyan-400/50 
                hover:scale-[1.03] active:scale-95 transition-all duration-200"
              >
                🤝 Request to Exchange
              </button>
            </Link> */}
          </div>
        );
      })}
    </section>
  );
}





























// "use client";


// import { img } from "framer-motion/client";
// import Image from "next/image";
// import Link from "next/link";

// export default function UserPage({ skills = [] }: { skills?: any[] }) {
//   if (!Array.isArray(skills) || skills.length === 0) {
//     return (
//       <div className="flex items-center justify-center h-40">
//         <p className="text-gray-400 text-lg font-semibold">No skills found ❌</p>
//       </div>
//     );
//   }

//   const getImageSrc = (skill: any) => {
//     console.log(skill.skill_img)
//     const raw = skill.skill_img || skill.image_url || "";
//     console.log(raw, 'kopodaskpdsdkaopopopoppo')
//     if (!raw || raw === "null" || raw === "undefined") {
//       return "/default-skill.png";
//     }
//     if (raw.startsWith("http")) return raw;
//     return `http://localhost:5000${raw.startsWith("/") ? raw : `/${raw}`}`;
//   };

//   return (
//     <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
//       {skills.map((skill) => {
//         const imgSrc = getImageSrc(skill);

//         console.log(`http://localhost:5000/uploads/profiles/${skill.skill_img}`, 'my skillimg')

//         return (
//           <div
//             key={skill.id}
//             className="group bg-white/5 border border-white/10 rounded-2xl shadow-lg overflow-hidden hover:shadow-cyan-500/40 hover:-translate-y-2 transition-all duration-300"
//           >
//             {/* 🖼 Image wrapped in Link */}
//             <img src={`http://localhost:3000/${skill.skill_img}`} alt="skill imagery" />
//             <Link href={`/skills/${skill.id}`}>
//               <div className="relative h-48 w-full overflow-hidden">
//                 <Image
//                   src={skill.skill_img}
//                   alt={skill.title || "Skill"}
//                   fill
//                   className="object-cover group-hover:scale-110 transition-transform duration-500"
//                   unoptimized
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 to-transparent" />
//               </div>
//             </Link>

//             {/* 🧾 Info Section */}
//             <div className="p-6">
//               <h2 className="text-xl font-bold text-white mb-1">
//                 {skill.title}
//               </h2>
//               <p className="text-gray-400 text-sm mb-3 line-clamp-3">
//                 {skill.description}
//               </p>
//               <p className="text-sm text-gray-400 mb-2">
//                 Uploaded by: <span className="text-cyan-400">{skill.username}</span>
//               </p>

//               {skill.category && (
//                 <span className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
//                   {skill.category}
//                 </span>
//               )}

              
//             </div>
//                            <Link href={'exchange_skill'}>
//                   <button
//                     className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 font-semibold text-white shadow-lg 
//                     hover:shadow-cyan-400/50 hover:scale-[1.03] 
//                     active:scale-95 active:shadow-cyan-700/50 
//                     cursor-pointer transition-all duration-200"
//                   >
//                     🤝 Request to Exchange
//                   </button>
//                   </Link>
//           </div>
//         );
//       })}
//     </section>
//   );
// }


// // i have some questions and i need you to help me fix my code 
//   // Q1. how would i render my image for ppl to see when i load up my skill cause i have only the img and i already suse multer to send image url to my db and it also saved it in a folder i think skills/or uploads one of them
//   //q2. olease help me create a 404 page for skillwrapp since am using  next.js dark blue dark morphism and cool look
//   // now please help me render my image from the folder  skills or uploads and that folder is inside the backend folder and using next.js soo plaes work on that

//   // //see my create-skill page here maybe u cna check where the error is from
//   // "use client";
  
//   // import { useState, useEffect } from "react";
//   // import { useRouter  } from "next/navigation";
  
//   // export default function UploadPic() {
//   //   // 🧠 Manage all form inputs
//   //   const [skillname, setSkillname] = useState("");
//   //   const [description, setDescription] = useState("");
//   //   const [level, setLevel] = useState("");
//   //   const [category, setCategory] = useState("");
//   //   const [file, setFile] = useState<File | null>(null);
//   //   const [message, setMessage] = useState("");
//   //   const [loading, setLoading] = useState(false);
  
//   //   // 🚀 Handle Submit
//   //   async function handleSubmit(e: React.FormEvent) {
//   //     e.preventDefault();
//   //     if (!file) return setMessage("⚠️ Please select an image first");
  
//   //     const formData = new FormData();
//   //     formData.append("skillname", skillname);
//   // formData.append("skilldesc", description);
//   // formData.append("skilllevel", level);
//   // formData.append("category", category);
//   //     formData.append("image", file);
  
//   //     // formData.append("skillname", skillname);
//   //     // formData.append("description", description);
//   //     // formData.append("level", level);
//   //     // formData.append("category", category);
  
//   //     try {
//   //       setLoading(true);
//   //       setMessage("Uploading skill... ⏳");
  
//   //       const res = await fetch("http://localhost:5000/create-skill", {
//   //         method: "POST",
//   //         body: formData,
//   //         credentials: "include",
//   //       });
  
  
//   //       const data = await res.json();
  
//   //       const router = useRouter()
  
//   //         useEffect(()=>{
//   //           if (data?.success) {
//   //            router.push("/skills") 
//   //           }
//   //         }, [data, router])
  
  
//   //       if (res.ok) {
//   //         setMessage(`✅ Skill uploaded successfully!`);
//   //         // Clear form
//   //         setSkillname("");
//   //         setDescription("");
//   //         setLevel("");
//   //         setCategory("");
//   //         setFile(null);
//   //       } else {
//   //         setMessage(`❌ Failed: ${data.error || "Unknown error"}`);
//   //       }
//   //     } catch (error) {
//   //       console.error(error);
//   //       setMessage("🚨 Network error — please try again.");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   }
  
//   //      const router = useRouter()
  
//   //         useEffect(()=>{
//   //           if (message === '✅ Skill uploaded successfully!') {
//   //            router.push("/skills") 
//   //           }
//   //         }, [message, router])
  
//   //   return (
//   //     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#05070c] via-[#0b1220] to-[#05070c] text-white relative overflow-hidden p-6">
//   //       {/* 💫 Background Glow */}
//   //       <div className="absolute inset-0">
//   //         <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full animate-pulse"></div>
//   //         <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full animate-pulse delay-300"></div>
//   //       </div>
  
//   //       <form
//   //         onSubmit={handleSubmit}
//   //         className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-8 space-y-5 transition-all hover:border-cyan-400/30"
//   //       >
//   //         <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//   //           Share Your Skill ✨
//   //         </h1>
//   //         <p className="text-center text-gray-400 mb-6 text-sm">
//   //           Upload your skill with an image, level, and short description.
//   //         </p>
  
//   //         {/* ✅ Skill Name */}
//   //         <div>
//   //           <label htmlFor="skillname" className="block mb-2 font-semibold text-sm text-gray-300">
//   //             Skill Name
//   //           </label>
//   //           <input
//   //             type="text"
//   //             id="skillname"
//   //             placeholder="e.g. Web Development"
//   //             value={skillname}
//   //             onChange={(e) => setSkillname(e.target.value)}
//   //             required
//   //             className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30 text-white 
//   //               placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 
//   //               transition"
//   //           />
//   //         </div>
  
//   //         {/* ✅ Description */}
//   //         <div>
//   //           <label htmlFor="description" className="block mb-2 font-semibold text-sm text-gray-300">
//   //             Description
//   //           </label>
//   //           <textarea
//   //             id="description"
//   //             placeholder="Write a short description (max 150 chars)"
//   //             maxLength={150}
//   //             value={description}
//   //             onChange={(e) => setDescription(e.target.value)}
//   //             required
//   //             className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30 text-white 
//   //               placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 
//   //               resize-none h-28 transition"
//   //           />
//   //         </div>
  
//   //         {/* ✅ Skill Level */}
//   //         <div>
//   //           <label htmlFor="level" className="block mb-2 font-semibold text-sm text-gray-300">
//   //             Skill Level
//   //           </label>
//   //           <select
//   //             id="level"
//   //             value={level}
//   //             onChange={(e) => setLevel(e.target.value)}
//   //             required
//   //             className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30 text-white 
//   //               focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent 
//   //               appearance-none cursor-pointer transition"
//   //           >
//   //             <option value="" disabled className="text-gray-400 bg-[#1e293b]">
//   //               Select level
//   //             </option>
//   //             <option value="Beginner" className="text-black">
//   //               Beginner
//   //             </option>
//   //             <option value="Intermediate" className="text-black">
//   //               Intermediate
//   //             </option>
//   //             <option value="Professional" className="text-black">
//   //               Professional
//   //             </option>
//   //           </select>
//   //         </div>
  
//   //         {/* ✅ Category */}
//   //         <div>
//   //           <label htmlFor="category" className="block mb-2 font-semibold text-sm text-gray-300">
//   //             Category
//   //           </label>
//   //           <select
//   //             id="category"
//   //             value={category}
//   //             onChange={(e) => setCategory(e.target.value)}
//   //             required
//   //             className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30 text-white 
//   //               focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent 
//   //               appearance-none cursor-pointer transition"
//   //           >
//   //             <option value="" disabled className="text-gray-400 bg-[#1e293b]">
//   //               Select category
//   //             </option>
//   //             <option value="Web Development" className="text-black">Web Development</option>
//   //             <option value="UI/UX Design" className="text-black">UI/UX Design</option>
//   //             <option value="Graphic Design" className="text-black">Graphic Design</option>
//   //             <option value="Data Science" className="text-black">Data Science</option>
//   //             <option value="Cybersecurity" className="text-black">Cybersecurity</option>
//   //             <option value="Mobile Development" className="text-black">Mobile Development</option>
//   //             <option value="Digital Marketing" className="text-black">Digital Marketing</option>
//   //             <option value="Content Writing" className="text-black">Content Writing</option>
//   //             <option value="Video Editing" className="text-black">Video Editing</option>
//   //             <option value="Other" className="text-black">Other</option>
//   //           </select>
//   //         </div>
  
//   //         {/* ✅ Image Upload */}
//   //         <div>
//   //           <label htmlFor="image" className="block mb-2 font-semibold text-sm text-gray-300">
//   //             Upload Image
//   //           </label>
//   //           <input
//   //             type="file"
//   //             id="image"
//   //             accept="image/*"
//   //             onChange={(e) => setFile(e.target.files?.[0] || null)}
//   //             required
//   //             className="block w-full text-sm text-gray-300
//   //               file:mr-4 file:py-2 file:px-4
//   //               file:rounded-xl file:border-0
//   //               file:text-sm file:font-semibold
//   //               file:bg-gradient-to-r file:from-cyan-500 file:to-blue-500 file:text-white
//   //               hover:file:from-blue-500 hover:file:to-cyan-500 cursor-pointer transition"
//   //           />
//   //         </div>
  
//   //         {/* ✅ Submit Button */}
//   //         <button
//   //           type="submit"
//   //           disabled={loading}
//   //           className={`w-full py-3 mt-2 rounded-xl font-semibold text-white text-lg 
//   //             transition-all duration-300 ${
//   //               loading
//   //                 ? "bg-gradient-to-r from-gray-500 to-gray-700 cursor-not-allowed"
//   //                 : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 shadow-lg"
//   //             }`}
//   //         >
//   //           {loading ? "Uploading..." : "Submit Skill"}
//   //         </button>
  
//   //         {/* ✅ Message */}
//   //         {message && (
//   //           <p
//   //             className={`text-center mt-4 font-medium ${
//   //               message.startsWith("✅")
//   //                 ? "text-green-400"
//   //                 : message.startsWith("❌") || message.startsWith("🚨")
//   //                 ? "text-red-400"
//   //                 : "text-yellow-400"
//   //             }`}
//   //           >
//   //             {message}
//   //           </p>
//   //         )}
//   //       </form>