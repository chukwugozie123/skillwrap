// "use client"

// import { useState } from "react";

// export default function uploadPic() {
//     const [file, setFile] = useState<File | null>(null)
//     const [message, setMessage] = useState("")

//     async function handleSubmit(e: React.FormEvent) {
//         e.preventDefault();
//         if(!file) return 

//         const formData = new FormData()
//         formData.append("image", file)

//         const res = await fetch ("http://localhost:5000/upload-profile", {
//             method: "POST",
//             body: formData,
                // credentials: "include",
//         })
//         const data = await res.json();

//         // checking details
//         console.log(file, "testing mic")
//         console.log(formData , "check info")

//         if(res.ok) {
//           setMessage(`uploaded succesdully: ${data.filename}`) 
//          } else{ 
//            setMessage(`upload failed ${data.error}`)
//          }
//     }
//     return(
//         <div>
//             <form onSubmit={handleSubmit}>
//                 {message && <p>{message}</p>}
//                 <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
//                 <button type="submit">uplaod </button>
//             </form>
//         </div>
//     )
// }










"use client";

import { useState } from "react";

export default function UploadPic() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

   const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // const API_URL = 'http://localhost:5000';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return setMessage("⚠️ Please select a file first");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/upload-profile`, {
        method: "POST",
        body: formData,
        credentials: "include", // ensure cookies/auth are included
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ Uploaded successfully: ${data.filename}`);
      } else {
        setMessage(`❌ Upload failed: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white/10 rounded-lg">
        {message && <p>{message}</p>}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="p-2 bg-white/10 rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
