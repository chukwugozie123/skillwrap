// import EditProfile from "@/components/edit_profile/page";

// export default async function EditPage() {
//   const API_URL = "https://skillwrap-backend.onrender.com";

//   const res = await fetch(`${API_URL}/auth/profile`, {
//      credentials: "include",
//     cache: "no-store",
//   });


//   if (!res.ok) {
//     return <p>Failed to load page</p>;
//   }


//   const data = await res.json();
//   console.log(data.user, 'info')

//   return (
//     <div>
//       <EditProfile initialProfile={data.user} />
//     </div>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import EditProfile from "@/components/edit_profile/page";

export default function EditPage() {
  const API_URL = "https://skillwrap-backend.onrender.com";
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setError("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return <EditProfile initialProfile={user} />;
}
