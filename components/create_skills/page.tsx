// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function UploadPic() {
//   const router = useRouter();

//   const [skillname, setSkillname] = useState("");
//   const [description, setDescription] = useState("");
//   const [level, setLevel] = useState("");
//   const [category, setCategory] = useState("");
//   const [file, setFile] = useState<File | null>(null);

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const API_URL = "https://skillwrap-backend.onrender.com";
//   // const API_URL='http://localhost:5000'
//   // const API_URL = "http://localhost:4000";

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     if (!file) return setMessage("⚠️ Please select an image");

//     const formData = new FormData();
//     formData.append("skillname", skillname);
//     formData.append("skilldesc", description);
//     formData.append("skilllevel", level);
//     formData.append("category", category);
//     formData.append("image", file);
//     // formData.append("profile", file);


//     try {
//       setLoading(true);
//       setMessage("Uploading skill... ⏳");

//       const res = await fetch(`${API_URL}/create-skills`, {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         setMessage("✅ Skill uploaded successfully!");

//         setSkillname("");
//         setDescription("");
//         setLevel("");
//         setCategory("");
//         setFile(null);

//         setTimeout(() => {
//           router.push("/skills");
//         }, 1000);
//       } else {
//         setMessage(`❌ Failed: ${data.error || "Unknown error"}`);
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("🚨 Network error — try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#05070c] via-[#0b1220] to-[#05070c] text-white p-6">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 space-y-5"
//       >
//         <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//           Share Your Skill ✨
//         </h1>

//         <input
//           type="text"
//           placeholder="Skill name"
//           value={skillname}
//           onChange={(e) => setSkillname(e.target.value)}
//           required
//           className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30"
//         />

//         <textarea
//           placeholder="Short description"
//           value={description}
//           maxLength={150}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//           className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30 h-28"
//         />

//         <select
//           value={level}
//           onChange={(e) => setLevel(e.target.value)}
//           required
//           className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30"
//         >
//           <option value="">Select level</option>
//           <option value="Beginner" className="text-black">Beginner</option>
//           <option value="Intermediate" className="text-black">Intermediate</option>
//           <option value="Professional" className="text-black">Professional</option>
//         </select>

//         {/* ✅ FIXED CATEGORY VALUES */}
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           required
//           className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30"
//         >
//           <option value="">Select category</option>

//           <option value="Web Development" className="text-black">Web Development</option>
//           <option value="Mobile Development" className="text-black">Mobile App Development</option>
//           <option value="Backend Development" className="text-black">Backend Development</option>
//           <option value="UI UX Design" className="text-black">UI UX Design</option>
//           <option value="Graphic Design" className="text-black">Graphic Design</option>
//           <option value="Game Development" className="text-black">Game Development</option>
//           <option value="Data Science" className="text-black">Data Science</option>
//           <option value="Machine Learning" className="text-black">Machine Learning</option>
//           <option value="Cybersecurity" className="text-black">Cybersecurity</option>

//           <option value="Content Creation" className="text-black">Content Creation</option>
//           <option value="Photography" className="text-black">Photography</option>
//           <option value="Video Editing" className="text-black">Video Editing</option>
//           <option value="Motion Design" className="text-black">Animation & Motion Design</option>
//           <option value="Music Production" className="text-black">Music Production</option>
//           <option value="Copywriting" className="text-black">Writing & Copywriting</option>

//           <option value="Digital Marketing" className="text-black">Digital Marketing</option>
//           <option value="SEO" className="text-black">SEO</option>
//           <option value="Product Management" className="text-black">Product Management</option>
//           <option value="Entrepreneurship" className="text-black">Entrepreneurship</option>
//           <option value="Finance" className="text-black">Finance & Investing</option>

//           <option value="Fitness Health" className="text-black">Fitness & Health</option>
//           <option value="Cooking" className="text-black">Cooking & Baking</option>
//           <option value="Public Speaking" className="text-black">Public Speaking</option>
//           <option value="Personal Development" className="text-black">Personal Development</option>

//           <option value="Other" className="text-black">Other</option>
//         </select>

//         <input
//           type="file"
//           accept="image/*"
//           required
//           onChange={(e) => setFile(e.target.files?.[0] || null)}
//           className="block w-full text-sm text-gray-300"
//         />

//         <button
//           disabled={loading}
//           className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold"
//         >
//           {loading ? "Uploading..." : "Submit Skill"}
//         </button>

//         {message && <p className="text-center">{message}</p>}
//       </form>
//     </div>
//   );
// }






















"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadSkill() {
  const router = useRouter();

  const [skillname, setSkillname] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [youtubeLink, setYoutubeLink] = useState(""); // optional YouTube
  const [portfolioLink, setPortfolioLink] = useState(""); // optional Portfolio
  const [learningPoints, setLearningPoints] = useState<string[]>([""]); // dynamic gains

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // const API_URL = "http://localhost:4000";
  const API_URL = "https://skillwrap-backend.onrender.com";

  const handleAddPoint = () => setLearningPoints([...learningPoints, ""]);
  const handlePointChange = (index: number, value: string) => {
    const updated = [...learningPoints];
    updated[index] = value;
    setLearningPoints(updated);
  };
  const handleRemovePoint = (index: number) => {
    const updated = [...learningPoints];
    updated.splice(index, 1);
    setLearningPoints(updated);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (!file) return setMessage("⚠️ Please select an image");

    // Optional validation for YouTube and Portfolio
    if (youtubeLink && !/^https?:\/\/(www\.)?youtube\.com\/watch\?v=/.test(youtubeLink)) {
      return setMessage("⚠️ Please enter a valid YouTube video link");
    }
    if (portfolioLink && !/^https?:\/\//.test(portfolioLink)) {
      return setMessage("⚠️ Please enter a valid Portfolio link (starting with http/https)");
    }

    const formData = new FormData();
    formData.append("skillname", skillname);
    formData.append("skilldesc", description);
    formData.append("skilllevel", level);
    formData.append("category", category);
    formData.append("image", file);
    if (youtubeLink) formData.append("youtube_link", youtubeLink);
    if (portfolioLink) formData.append("portfolio_link", portfolioLink);
    learningPoints.forEach((point, i) => formData.append(`learningPoints[${i}]`, point));

    try {
      setLoading(true);
      setMessage("Uploading skill... ⏳");

      const res = await fetch(`${API_URL}/create-skills`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage("✅ Skill uploaded successfully!");
        // Reset form
        setSkillname("");
        setDescription("");
        setLevel("");
        setCategory("");
        setFile(null);
        setYoutubeLink("");
        setPortfolioLink("");
        setLearningPoints([""]);

        setTimeout(() => router.push("/skills"), 1000);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#05070c] via-[#0b1220] to-[#05070c] text-white p-6">
     
                 {/* 🔙 GO BACK BUTTON */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl 
          bg-white/10 border border-white/20 backdrop-blur-md
          text-sm font-medium hover:bg-white/20 hover:scale-105 
          transition-all duration-300"
        >
          ← Go Back
        </button>
      </div>
     
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 space-y-5">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Share Your Skill ✨
        </h1>

        {/* Skill Name */}
        <input
          type="text"
          placeholder="Skill name"
          value={skillname}
          onChange={(e) => setSkillname(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30"
        />

        {/* Description */}
        <textarea
          placeholder="Short description"
          value={description}
          maxLength={150}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30 h-28"
        />

        {/* Level */}
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30"
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
          className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30"
        >
          <option value="">Select category</option>

          <option value="Web Development" className="text-black">Web Development</option>
          <option value="Mobile Development" className="text-black">Mobile App Development</option>
          <option value="Backend Development" className="text-black">Backend Development</option>
          <option value="UI UX Design" className="text-black">UI UX Design</option>
          <option value="Graphic Design" className="text-black">Graphic Design</option>
          <option value="Game Development" className="text-black">Game Development</option>
          <option value="Data Science" className="text-black">Data Science</option>
          <option value="Machine Learning" className="text-black">Machine Learning</option>
          <option value="Cybersecurity" className="text-black">Cybersecurity</option>

          <option value="Content Creation" className="text-black">Content Creation</option>
          <option value="Photography" className="text-black">Photography</option>
          <option value="Video Editing" className="text-black">Video Editing</option>
          <option value="Motion Design" className="text-black">Animation & Motion Design</option>
          <option value="Music Production" className="text-black">Music Production</option>
          <option value="Copywriting" className="text-black">Writing & Copywriting</option>

          <option value="Digital Marketing" className="text-black">Digital Marketing</option>
          <option value="SEO" className="text-black">SEO</option>
          <option value="Product Management" className="text-black">Product Management</option>
          <option value="Entrepreneurship" className="text-black">Entrepreneurship</option>
          <option value="Finance" className="text-black">Finance & Investing</option>

          <option value="Fitness Health" className="text-black">Fitness & Health</option>
          <option value="Cooking" className="text-black">Cooking & Baking</option>
          <option value="Public Speaking" className="text-black">Public Speaking</option>
          <option value="Personal Development" className="text-black">Personal Development</option>

          <option value="Other" className="text-black">Other</option>
        </select>
        {/* Skill Image */}
        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-300"
        />

        {/* Optional YouTube Link */}
        <input
          type="text"
          placeholder="Optional YouTube video link"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30"
        />

        {/* Optional Portfolio Link */}
        <input
          type="text"
          placeholder="Optional Portfolio link"
          value={portfolioLink}
          onChange={(e) => setPortfolioLink(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30"
        />

        {/* Dynamic Learning Points */}
        <div className="space-y-2">
          <label className="font-semibold">What learners will gain:</label>
          {learningPoints.map((point, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder={`Gain #${index + 1}`}
                value={point}
                onChange={(e) => handlePointChange(index, e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl bg-white/15 border border-white/30"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemovePoint(index)}
                  className="px-3 py-2 bg-red-500 rounded-xl text-white"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddPoint}
            className="mt-2 px-4 py-2 bg-green-500 rounded-xl text-white"
          >
            + Add another
          </button>
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold"
        >
          {loading ? "Uploading..." : "Submit Skill"}
        </button>

        {message && <p className="text-center">{message}</p>}
      </form>
    </div>
  );
}
