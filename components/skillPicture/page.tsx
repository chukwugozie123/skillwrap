


// "use client";

// import { useRef, useState } from "react";
// import Image from "next/image";

// interface Props {
//   imageUrl?: string;
//   username?: string;
//   onUploadSuccess?: (newUrl: string) => void;
// }

// const API_URL = "http://localhost:4000";
// // const API_URL = "https://skillwrap-backend.onrender.com";
// // const API_URL = "http://localhost:5000";

// export default function ProfileAvatarEditor({
//   imageUrl,
//   username,
//   onUploadSuccess,
// }: Props) {
//   const fileRef = useRef<HTMLInputElement | null>(null);

//   const [preview, setPreview] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleClick = () => {
//     if (!loading) fileRef.current?.click();
//   };

//   const handleChange = async (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     /* 🔎 CLIENT VALIDATION */
//     if (!file.type.startsWith("image/")) {
//       setError("Only image files are allowed");
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setError("Image must be less than 5MB");
//       return;
//     }

//     setError(null);

//     const localPreview = URL.createObjectURL(file);
//     setPreview(localPreview);

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       setLoading(true);

//       const res = await fetch(`${API_URL}/upload/skill/img`, {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });

//       /* ⚠️ SAFE RESPONSE PARSING */
//       const contentType = res.headers.get("content-type");
//       if (!contentType || !contentType.includes("application/json")) {
//         throw new Error("Server error. Please try again.");
//       }

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Upload failed");
//         return;
//       }

//       onUploadSuccess?.(data.img_url);
//       setError(null);

//     } catch (err: any) {
//       console.error("Upload error:", err);
//       setError(err.message || "Network error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const displayImage = preview || imageUrl;

//   return (
//     <div className="flex flex-col items-center gap-2">
//       {/* AVATAR */}
//       <div
//         onClick={handleClick}
//         className={`
//           relative w-32 h-32 rounded-full overflow-hidden
//           border-4 border-cyan-400/40 shadow-xl cursor-pointer
//           group transition
//           ${loading ? "opacity-60 cursor-not-allowed" : ""}
//         `}
//       >
//         {displayImage ? (
//           <Image
//             src={displayImage}
//             unoptimized
//             alt="Profile picture"
//             fill
//             className="object-cover"
//           />
//         ) : (
//           <div
//             className="w-full h-full flex items-center justify-center 
//                        bg-gradient-to-tr from-blue-600 to-indigo-700
//                        text-4xl font-bold text-white"
//           >
//             {username?.[0]?.toUpperCase()}
//           </div>
//         )}

//         {/* HOVER OVERLAY */}
//         <div
//           className="
//             absolute inset-0 bg-black/40 opacity-0
//             group-hover:opacity-100 flex items-center
//             justify-center transition
//           "
//         >
//           <span className="text-white text-sm font-semibold">
//             {loading ? "Uploading..." : "Change Photo"}
//           </span>
//         </div>

//         {/* FILE INPUT */}
//         <input
//           ref={fileRef}
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={handleChange}
//           disabled={loading}
//         />
//       </div>

//       {/* ERROR MESSAGE */}
//       {error && (
//         <p className="text-sm text-red-400 text-center max-w-[220px]">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }














"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface Props {
  imageUrl?: string;
  title?: string;
  skillId: string;
  onUploadSuccess?: (url: string) => void;
}

const API_URL = "https://skillwrap-backend.onrender.com";
// const API_URL = "http://localhost:4000";

export default function SkillImageEditor({
  imageUrl,
  title,
  skillId,
  onUploadSuccess,
}: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    if (!loading) fileRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only images allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Max 5MB");
      return;
    }

    setError(null);
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);
    formData.append("skillId", skillId);


    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/upload/skill/img`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Upload failed");
        return;
      }

      onUploadSuccess?.(data.skill_img);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const displayImage = preview || imageUrl;

  return (
    <div className="relative group cursor-pointer" onClick={handleClick}>
      <div
        className="
          relative w-full h-44 rounded-2xl overflow-hidden
          border border-white/20 shadow-lg
          bg-gradient-to-br from-[#0f172a] to-[#020617]
        "
      >
        {displayImage ? (
          <Image
            src={displayImage}
            alt="Skill image"
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white/60">
            {title?.[0]?.toUpperCase()}
          </div>
        )}

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
          <span className="text-sm font-semibold text-white">
            {loading ? "Uploading..." : "Change Image"}
          </span>
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        disabled={loading}
        onChange={handleChange}
      />

      {error && (
        <p className="text-xs text-red-400 mt-2 text-center">{error}</p>
      )}
    </div>
  );
}
