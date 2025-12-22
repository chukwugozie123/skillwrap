"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function EditBio() {
  const [username, setUsername] = useState("John Doe");
  const [bio, setBio] = useState("Hey! I'm using this app.");
  const [image, setImage] = useState("/default-avatar.png");

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setImage(imgURL);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 flex flex-col items-center">
      {/* Back Button */}
      <Link href="/settings" className="self-start mb-4 flex items-center gap-2">
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </Link>

      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

      {/* Form Card */}
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow">
        {/* Image Upload */}
        <div className="flex flex-col items-center">
          <Image
            src={image}
            alt="avatar"
            width={96}
            height={96}
            className="rounded-full object-cover mb-3"
          />

          <label className="text-blue-600 cursor-pointer">
            Change Picture
            <input type="file" className="hidden" onChange={handleImg} />
          </label>
        </div>

        {/* Username */}
        <div className="mt-5">
          <label className="block font-medium mb-1">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Bio */}
        <div className="mt-4">
          <label className="block font-medium mb-1">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="border w-full p-2 rounded h-28 resize-none"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <Link
            href="/settings"
            className="px-4 py-2 bg-gray-200 rounded text-gray-700"
          >
            Cancel
          </Link>

          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
