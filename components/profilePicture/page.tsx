"use client";

import { useState, useRef, useEffect } from "react";

type User = {
  id: number;
  fullname: string;
  username: string;
  email: string;
  img_url: string;
  bio?: string;
  avatar?: string;
  projects?: number;
  followers?: number;
  following?: number;
};

export default function ProfilePicture() {
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) return;
        const data = await res.json();
        setUser(data.user || data.req?.user || null);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, []);

  const handleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}upload-profile`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Profile picture updated!");
        setTimeout(() => setIsEditing(false), 1500);
      } else {
        setMessage("❌ Upload failed: " + data.error);
      }
    } catch (err) {
      setMessage("❌ Error uploading image.");
    } finally {
      setLoading(false);
    }
  };

  const displayImage = preview || (user?.img_url ? `${API_URL}uploads/${user.img_url}` : null);

  return (
    <div className="relative group">
      {/* Profile Picture Circle */}
      <div
        onClick={handleClick}
        className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500/40 cursor-pointer flex items-center justify-center bg-gradient-to-tr from-blue-600 to-indigo-700 shadow-xl transition-transform hover:scale-105"
      >
        {displayImage ? (
          <img src={displayImage} alt={user?.username} className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl font-bold text-white">{user?.username?.[0]?.toUpperCase()}</span>
        )}

        {/* Hover overlay */}
        {!isEditing && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
            <span className="text-sm text-white font-semibold">Click to Edit</span>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Status Message */}
      {message && (
        <p className="absolute mt-2 text-sm text-center w-full text-white/80">
          {loading ? "Uploading..." : message}
        </p>
      )}
    </div>
  );
}
