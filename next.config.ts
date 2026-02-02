// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["res.cloudinary.com"],
//   },

// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com", // allow Unsplash images
      "randomuser.me",      // allow profile pics
    ],
  },
};

module.exports = nextConfig;


// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;






