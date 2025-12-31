"use client";

import { useState} from "react";
import { useRouter } from "next/navigation";

export default function UploadPic() {
  const router = useRouter();

  // Form state
  const [skillname, setSkillname] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const API_URL = process.env.NEXT_PUBLIC_API_URL 

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!file) return setMessage("⚠️ Please select an image");

    const formData = new FormData();
    formData.append("skillname", skillname);
    formData.append("skilldesc", description);
    formData.append("skilllevel", level);
    formData.append("category", category);
    formData.append("image", file);

    try {
      setLoading(true);
      setMessage("Uploading skill... ⏳");

      const res = await fetch(`${API_URL}/create-skill`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage("✅ Skill uploaded successfully!");

        // Clear form
        setSkillname("");
        setDescription("");
        setLevel("");
        setCategory("");
        setFile(null);

        // Redirect after 1s
        setTimeout(() => {
          router.push("/skills"); // or "/dashboard"
        }, 1000);
      } else {
        setMessage(`❌ Failed: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("🚨 Network error — try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#05070c] via-[#0b1220] to-[#05070c] text-white p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/10 backdrop-blur-2xl 
        border border-white/20 rounded-2xl shadow-2xl p-8 space-y-5"
      >
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Share Your Skill ✨
        </h1>

        {/* Skill Name */}
        <input
          type="text"
          placeholder="Skill name"
          value={skillname}
          onChange={(e) => setSkillname(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30 text-white"
        />

        {/* Description */}
        <textarea
          placeholder="Short description"
          value={description}
          maxLength={150}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30 text-white h-28 resize-none"
        />

        {/* Level */}
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30 text-white"
        >
          <option value="">Select level</option>
          <option value="Beginner" className="text-black">Beginner</option>
          <option value="Intermediate" className="text-black">Intermediate</option>
          <option value="Professional" className="text-black">Professional</option>
        </select>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30 text-white"
        >
          <option value="">Select category</option>
          <option value="Web Development" className="text-black">Web Development</option>
          <option value="UI/UX Design" className="text-black">UI/UX Design</option>
          <option value="Graphic Design" className="text-black">Graphic Design</option>
          <option value="Other" className="text-black">Other</option>
        </select>

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-300 file:bg-cyan-500 file:text-white file:rounded-xl file:px-4 file:py-2 cursor-pointer"
        />

        {/* Submit */}
        <button
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold text-white"
        >
          {loading ? "Uploading..." : "Submit Skill"}
        </button>

        {/* Message */}
        {message && (
          <p
            className={`text-center ${
              message.includes("✅")
                ? "text-green-400"
                : message.includes("❌") || message.includes("🚨")
                ? "text-red-400"
                : "text-yellow-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}








// skill-wrap0-zju5.vercel.app 











// "use client";

// import { useState, useEffect } from "react";
// import { useRouter  } from "next/navigation";

// export default function UploadPic() {
//   // 🧠 Manage all form inputs
//   const [skillname, setSkillname] = useState("");
//   const [description, setDescription] = useState("");
//   const [level, setLevel] = useState("");
//   const [category, setCategory] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   // 🚀 Handle Submit
//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!file) return setMessage("⚠️ Please select an image first");

//     const formData = new FormData();
//     formData.append("skillname", skillname);
// formData.append("skilldesc", description);
// formData.append("skilllevel", level);
// formData.append("category", category);
//     formData.append("image", file);

//     // formData.append("skillname", skillname);
//     // formData.append("description", description);
//     // formData.append("level", level);
//     // formData.append("category", category);

//     try {
//       setLoading(true);
//       setMessage("Uploading skill... ⏳");

//       const res = await fetch("http://localhost:5000/create-skill", {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });


//       const data = await res.json();

//       const router = useRouter()

//         useEffect(()=>{
//           if (data?.success) {
//            router.push("/skills") 
//           }
//         }, [data, router])


//       if (res.ok) {
//         setMessage(`✅ Skill uploaded successfully!`);
//         // Clear form
//         setSkillname("");
//         setDescription("");
//         setLevel("");
//         setCategory("");
//         setFile(null);
//       } else {
//         setMessage(`❌ Failed: ${data.error || "Unknown error"}`);
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage("🚨 Network error — please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//      const router = useRouter()

//         useEffect(()=>{
//           if (message === '✅ Skill uploaded successfully!') {
//            router.push("/skills") 
//           }
//         }, [message, router])

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#05070c] via-[#0b1220] to-[#05070c] text-white relative overflow-hidden p-6">
//       {/* 💫 Background Glow */}
//       <div className="absolute inset-0">
//         <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full animate-pulse"></div>
//         <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full animate-pulse delay-300"></div>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-8 space-y-5 transition-all hover:border-cyan-400/30"
//       >
//         <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//           Share Your Skill ✨
//         </h1>
//         <p className="text-center text-gray-400 mb-6 text-sm">
//           Upload your skill with an image, level, and short description.
//         </p>

//         {/* ✅ Skill Name */}
//         <div>
//           <label htmlFor="skillname" className="block mb-2 font-semibold text-sm text-gray-300">
//             Skill Name
//           </label>
//           <input
//             type="text"
//             id="skillname"
//             placeholder="e.g. Web Development"
//             value={skillname}
//             onChange={(e) => setSkillname(e.target.value)}
//             required
//             className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30 text-white 
//               placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 
//               transition"
//           />
//         </div>

//         {/* ✅ Description */}
//         <div>
//           <label htmlFor="description" className="block mb-2 font-semibold text-sm text-gray-300">
//             Description
//           </label>
//           <textarea
//             id="description"
//             placeholder="Write a short description (max 150 chars)"
//             maxLength={150}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//             className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30 text-white 
//               placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 
//               resize-none h-28 transition"
//           />
//         </div>

//         {/* ✅ Skill Level */}
//         <div>
//           <label htmlFor="level" className="block mb-2 font-semibold text-sm text-gray-300">
//             Skill Level
//           </label>
//           <select
//             id="level"
//             value={level}
//             onChange={(e) => setLevel(e.target.value)}
//             required
//             className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30 text-white 
//               focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent 
//               appearance-none cursor-pointer transition"
//           >
//             <option value="" disabled className="text-gray-400 bg-[#1e293b]">
//               Select level
//             </option>
//             <option value="Beginner" className="text-black">
//               Beginner
//             </option>
//             <option value="Intermediate" className="text-black">
//               Intermediate
//             </option>
//             <option value="Professional" className="text-black">
//               Professional
//             </option>
//           </select>
//         </div>

//         {/* ✅ Category */}
//         <div>
//           <label htmlFor="category" className="block mb-2 font-semibold text-sm text-gray-300">
//             Category
//           </label>
//           <select
//             id="category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//             className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30 text-white 
//               focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent 
//               appearance-none cursor-pointer transition"
//           >
//             <option value="" disabled className="text-gray-400 bg-[#1e293b]">
//               Select category
//             </option>
//             <option value="Web Development" className="text-black">Web Development</option>
//             <option value="UI/UX Design" className="text-black">UI/UX Design</option>
//             <option value="Graphic Design" className="text-black">Graphic Design</option>
//             <option value="Data Science" className="text-black">Data Science</option>
//             <option value="Cybersecurity" className="text-black">Cybersecurity</option>
//             <option value="Mobile Development" className="text-black">Mobile Development</option>
//             <option value="Digital Marketing" className="text-black">Digital Marketing</option>
//             <option value="Content Writing" className="text-black">Content Writing</option>
//             <option value="Video Editing" className="text-black">Video Editing</option>
//             <option value="Other" className="text-black">Other</option>
//           </select>
//         </div>

//         {/* ✅ Image Upload */}
//         <div>
//           <label htmlFor="image" className="block mb-2 font-semibold text-sm text-gray-300">
//             Upload Image
//           </label>
//           <input
//             type="file"
//             id="image"
//             accept="image/*"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             required
//             className="block w-full text-sm text-gray-300
//               file:mr-4 file:py-2 file:px-4
//               file:rounded-xl file:border-0
//               file:text-sm file:font-semibold
//               file:bg-gradient-to-r file:from-cyan-500 file:to-blue-500 file:text-white
//               hover:file:from-blue-500 hover:file:to-cyan-500 cursor-pointer transition"
//           />
//         </div>

//         {/* ✅ Submit Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-3 mt-2 rounded-xl font-semibold text-white text-lg 
//             transition-all duration-300 ${
//               loading
//                 ? "bg-gradient-to-r from-gray-500 to-gray-700 cursor-not-allowed"
//                 : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 shadow-lg"
//             }`}
//         >
//           {loading ? "Uploading..." : "Submit Skill"}
//         </button>

//         {/* ✅ Message */}
//         {message && (
//           <p
//             className={`text-center mt-4 font-medium ${
//               message.startsWith("✅")
//                 ? "text-green-400"
//                 : message.startsWith("❌") || message.startsWith("🚨")
//                 ? "text-red-400"
//                 : "text-yellow-400"
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }


// // // C:\Users\Admin\Desktop\Next.js crash course\my-app\components\create_skills\page.tsx:67 Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
// // 1. You might have mismatching versions of React and the renderer (such as React DOM)
// // 2. You might be breaking the Rules of Hooks
// // 3. You might have more than one copy of React in the same app
// // See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.

// // y am i haveing this error please after a succesfully creation of skill please redorict back to the skill page or dashbaord which one u prefer























































// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useFormState } from "react-dom";

// // async function FormSubmit(prevState: any, formData: FormData) {
// //   try {
// //     const res = await fetch("http://localhost:5000/create-skill", {
// //       method: "POST",
// //       credentials: "include",
// //       body: formData,
// //     });
// //     const result = await res.json();
// //     return result;
// //   } catch (error: any) {
// //     return { success: false, error: error.message };
// //   }
// // }
//     // if (!file) return setMessage("⚠️ Please select a file first");

// async export default function CreateSkill() {
//   const [state, formAction] = useFormState(FormSubmit, { message: "" });
//   const [pending, setPending] = useState(false);
//   const [file, setFile] = useState<File | null>(null);
//   const router = useRouter();


//     try {
//     const res = await fetch("http://localhost:5000/create-skill", {
//       method: "POST",
//       credentials: "include",
//       body: formData,
//     });
//     const result = await res.json();
//   } catch (error: any) {
//     return { success: false, error: error.message };
//   }
//      const formData = new FormData();
//     formData.append("image", file);


//   useEffect(() => {
//     if (state?.success) {
//       router.push("/skills");
//     }
//   }, [state, router]);


//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] font-josefin">
//       <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-900/30 via-blue-800/20 to-cyan-700/20 backdrop-blur-3xl"></div>

//       <form
//         action={async (formData) => {
//           setPending(true);
//           // if (file) formData.append("image", file); // ✅ field name matches multer
//           await formAction(formData);
//           setPending(false);
//         }}
//         className="w-full max-w-lg p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white animate-fadeIn"
//       >
//         <h1 className="text-3xl font-extrabold mb-6 text-center tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
//           Share Your Skill on Skillwrap
//         </h1>

//         {(state?.message || state?.error) && (
//           <div
//             className={`mb-4 text-center text-sm ${
//               state.error ? "text-red-400" : "text-green-400"
//             }`}
//           >
//             {state.error || state.message}
//           </div>
//         )}

//         <div className="mb-5">
//           <label htmlFor="skillname" className="block mb-2 font-semibold text-sm">
//             Skill Name
//           </label>
//           <input
//             type="text"
//             id="skillname"
//             name="skillname"
//             placeholder="e.g. Web Development"
//             required
//             className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white 
//             placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 
//             focus:border-transparent transition"
//           />
//         </div>

//         <div className="mb-5">
//           <label htmlFor="skilldesc" className="block mb-2 font-semibold text-sm">
//             Describe Your Skill
//           </label>
//           <textarea
//             id="skilldesc"
//             name="skilldesc"
//             placeholder="Write a short description (max 150 chars)"
//             maxLength={150}
//             required
//             className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white 
//             placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 
//             focus:border-transparent transition resize-none h-28"
//           />
//         </div>

//         <div className="mb-5">
//           <label htmlFor="skilllevel" className="block mb-2 font-semibold text-sm">
//             Skill Level
//           </label>
//           <select
//             id="skilllevel"
//             name="skilllevel"
//             required
//             defaultValue="" // ✅ use defaultValue instead of selected
//             className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white 
//             focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent 
//             appearance-none cursor-pointer transition"
//           >
//             <option value="" disabled className="text-gray-400 bg-[#1e293b]">
//               Select your level
//             </option>
//             <option value="Beginner" className="text-black">
//               Beginner
//             </option>
//             <option value="Intermediate" className="text-black">
//               Intermediate
//             </option>
//             <option value="Professional" className="text-black">
//               Professional
//             </option>
//           </select>
//         </div>

//         <div className="mb-5">
//           <label htmlFor="category" className="block mb-2 font-semibold text-sm">
//             Category
//           </label>
//           <select
//             id="category"
//             name="category"
//             required
//             defaultValue=""
//             className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white 
//             focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent 
//             appearance-none cursor-pointer transition"
//           >
//             <option value="" disabled className="text-gray-400 bg-[#1e293b]">
//               Select a category
//             </option>
//             <option value="Web Development" className="text-black">
//               Web Development
//             </option>
//             <option value="UI/UX Design" className="text-black">
//               UI/UX Design
//             </option>
//             <option value="Graphic Design" className="text-black">
//               Graphic Design
//             </option>
//             <option value="Data Science" className="text-black">
//               Data Science
//             </option>
//             <option value="Cybersecurity" className="text-black">
//               Cybersecurity
//             </option>
//             <option value="Mobile Development" className="text-black">
//               Mobile Development
//             </option>
//             <option value="Digital Marketing" className="text-black">
//               Digital Marketing
//             </option>
//             <option value="Content Writing" className="text-black">
//               Content Writing
//             </option>
//             <option value="Video Editing" className="text-black">
//               Video Editing
//             </option>
//             <option value="Other" className="text-black">
//               Other
//             </option>
//           </select>
//         </div>

//         <div className="mb-6">
//           <label htmlFor="image" className="block mb-2 font-semibold text-sm">
//             Upload Image
//           </label>
//           <input
//             type="file"
//             id="image"
//             name="image" // ✅ matches multer field
//             accept="image/*"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             required
//             className="block w-full text-sm text-gray-300
//               file:mr-4 file:py-2 file:px-4
//               file:rounded-xl file:border-0
//               file:text-sm file:font-semibold
//               file:bg-gradient-to-r file:from-blue-500 file:to-cyan-500 file:text-white
//               hover:file:from-cyan-500 hover:file:to-blue-500
//               cursor-pointer"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={pending}
//           className={`w-full py-3 rounded-xl font-semibold shadow-lg 
//             bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 
//             hover:scale-[1.02] hover:shadow-xl transition-transform
//             ${pending && "opacity-50 cursor-not-allowed"}`}
//         >
//           {pending ? "Submitting..." : "🚀 Submit Skill"}
//         </button>
//       </form>
//     </div>
//   );
// }




















// "use client";

// import { useState } from "react";

// export default function UploadPic() {
//   const [level, setLevel] = useState("")
//   const [category, setcategory] = useState("")
//   const [description, setDescription] = useState("")
//   const [file, setFile] = useState<File | null>(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!file) return setMessage("⚠️ Please select a file first");

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       setLoading(true);
//       const res = await fetch("http://localhost:5000/create-skill", {
//         method: "POST",
//         body: formData,
//         credentials: "include", // ensure cookies/auth are included
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setMessage(`✅ Uploaded successfully: ${data.filename}`);
//       } else {
//         setMessage(`❌ Upload failed: ${data.error}`);
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage("Network error — please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white/10 rounded-lg">
//         {message && <p>{message}</p>}
//         <h1 className="text-3xl font-extrabold mb-6 text-center tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
//           Share Your Skill on Skillwrap
//         </h1>

//         <div className="mb-5">
//           <label htmlFor="skillname" className="block mb-2 font-semibold text-sm">
//             Skill Name
//           </label>
//           <input
//             type="text"
//             id="skillname"
//             name="skillname"
//             placeholder="e.g. Web Development"
//             required
//             className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white 
//             placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 
//             focus:border-transparent transition"
//           />
//         </div>

//         <div className="mb-5">
//           <label htmlFor="skilldesc" className="block mb-2 font-semibold text-sm">
//             Describe Your Skill
//           </label>
//           <textarea
//             id="skilldesc"
//             name="skilldesc"
//             placeholder="Write a short description (max 150 chars)"
//             maxLength={150}
//             required
//             className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white 
//             placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 
//             focus:border-transparent transition resize-none h-28"
//           />
//         </div>

//         <div className="mb-5">
//           <label htmlFor="skilllevel" className="block mb-2 font-semibold text-sm">
//             Skill Level
//           </label>
//           <select
//             id="skilllevel"
//             name="skilllevel"
//             required
//             defaultValue="" // ✅ use defaultValue instead of selected
//             className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white 
//             focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent 
//             appearance-none cursor-pointer transition"
//           >
//             <option value="" disabled className="text-gray-400 bg-[#1e293b]">
//               Select your level
//             </option>
//             <option value="Beginner" className="text-black">
//               Beginner
//             </option>
//             <option value="Intermediate" className="text-black">
//               Intermediate
//             </option>
//             <option value="Professional" className="text-black">
//               Professional
//             </option>
//           </select>
//         </div>

//         <div className="mb-5">
//           <label htmlFor="category" className="block mb-2 font-semibold text-sm">
//             Category
//           </label>
//           <select
//             id="category"
//             name="category"
//             required
//             defaultValue=""
//             className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white 
//             focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent 
//             appearance-none cursor-pointer transition"
//           >
//             <option value="" disabled className="text-gray-400 bg-[#1e293b]">
//               Select a category
//             </option>
//             <option value="Web Development" className="text-black">
//               Web Development
//             </option>
//             <option value="UI/UX Design" className="text-black">
//               UI/UX Design
//             </option>
//             <option value="Graphic Design" className="text-black">
//               Graphic Design
//             </option>
//             <option value="Data Science" className="text-black">
//               Data Science
//             </option>
//             <option value="Cybersecurity" className="text-black">
//               Cybersecurity
//             </option>
//             <option value="Mobile Development" className="text-black">
//               Mobile Development
//             </option>
//             <option value="Digital Marketing" className="text-black">
//               Digital Marketing
//             </option>
//             <option value="Content Writing" className="text-black">
//               Content Writing
//             </option>
//             <option value="Video Editing" className="text-black">
//               Video Editing
//             </option>
//             <option value="Other" className="text-black">
//               Other
//             </option>
//           </select>
//         </div>

//         <div className="mb-6">
//           <label htmlFor="image" className="block mb-2 font-semibold text-sm">
//             Upload Image
//           </label>
//           <input
//             type="file"
//             id="image"
//             name="image" // ✅ matches multer field
//             accept="image/*"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             required
//             className="block w-full text-sm text-gray-300
//               file:mr-4 file:py-2 file:px-4
//               file:rounded-xl file:border-0
//               file:text-sm file:font-semibold
//               file:bg-gradient-to-r file:from-blue-500 file:to-cyan-500 file:text-white
//               hover:file:from-cyan-500 hover:file:to-blue-500
//               cursor-pointer"
//           />
//         </div>

//         <button
//           type="submit">
//             submit
//         </button>
//       </form>
//     </div>
//   );
// }


