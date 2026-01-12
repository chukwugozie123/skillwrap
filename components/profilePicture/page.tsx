// "use client";

// import { useRef, useState } from "react";
// import Image from "next/image";

// interface Props {
//   imageUrl?: string;
//   username?: string;
//   onUploadSuccess?: (newUrl: string) => void;
// }

// const API_URL = "https://skillwrap-backend.onrender.com";

// export default function ProfileAvatarEditor({
//   imageUrl,
//   username,
//   onUploadSuccess,
// }: Props) {
//   const fileRef = useRef<HTMLInputElement | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleClick = () => {
//     fileRef.current?.click();
//   };

//   const handleChange = async (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // instant preview
//     const localPreview = URL.createObjectURL(file);
//     setPreview(localPreview);

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       setLoading(true);

//       const res = await fetch(`${API_URL}/upload-profile`, {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });

//       const data = await res.json();

//       if (res.ok && data.imageUrl) {
//         onUploadSuccess?.(data.imageUrl);
//       } else {
//         alert("Upload failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Upload error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const displayImage = preview || imageUrl;

//   return (
//     <div
//       onClick={handleClick}
//       className="relative w-32 h-32 rounded-full overflow-hidden 
//                  border-4 border-cyan-400/40 shadow-xl cursor-pointer
//                  group"
//     >
//       {displayImage ? (
//         <Image
//           src={displayImage}
//           alt="Profile"
//           fill
//           className="object-cover"
//         />
//       ) : (
//         <div className="w-full h-full flex items-center justify-center 
//                         bg-gradient-to-tr from-blue-600 to-indigo-700
//                         text-4xl font-bold text-white">
//           {username?.[0]?.toUpperCase()}
//         </div>
//       )}

//       {/* hover overlay */}
//       <div
//         className="absolute inset-0 bg-black/40 opacity-0 
//                    group-hover:opacity-100 flex items-center 
//                    justify-center transition"
//       >
//         <span className="text-white text-sm font-semibold">
//           {loading ? "Uploading..." : "Change Photo"}
//         </span>
//       </div>

//       <input
//         ref={fileRef}
//         type="file"
//         accept="image/*"
//         className="hidden"
//         onChange={handleChange}
//       />
//     </div>
//   );
// }















"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface Props {
  imageUrl?: string;
  username?: string;
  onUploadSuccess?: (newUrl: string) => void;
}

const API_URL = "https://skillwrap-backend.onrender.com";
// const API_URL='http://localhost:5000'

export default function ProfileAvatarEditor({
  imageUrl,
  username,
  onUploadSuccess,
}: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    fileRef.current?.click();
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    const formData = new FormData();
    formData.append("image", file);
    // formData.append("profile", file);

  
    try {
      setLoading(true);

      // ✅ FIXED ENDPOINT
      const res = await fetch(`${API_URL}/upload-profile`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const text = await res.text();
      console.log("RAW RESPONSE:", text);


      const data = await res.json();

      if (res.ok && data.imageUrl) {
        onUploadSuccess?.(data.imageUrl);
      } else {
        console.log(data)
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      console.log(err, ' see error')
      console.error(err);
      alert("Upload error");
    } finally {
      setLoading(false);
    }
  };

  const displayImage = preview || imageUrl;

  return (
    <div
      onClick={handleClick}
      className="relative w-32 h-32 rounded-full overflow-hidden 
                 border-4 border-cyan-400/40 shadow-xl cursor-pointer
                 group"
    >
      {displayImage ? (
        <Image
          src={displayImage}
          alt="Profile"
          fill
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center 
                        bg-gradient-to-tr from-blue-600 to-indigo-700
                        text-4xl font-bold text-white">
          {username?.[0]?.toUpperCase()}
        </div>
      )}

      <div
        className="absolute inset-0 bg-black/40 opacity-0 
                   group-hover:opacity-100 flex items-center 
                   justify-center transition"
      >
        <span className="text-white text-sm font-semibold">
          {loading ? "Uploading..." : "Change Photo"}
        </span>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
