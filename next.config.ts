import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // ✅ enables static HTML export
  images: {
    unoptimized: true, // ✅ allows images to load correctly on GitHub Pages
  },
  basePath: "/Library_Management_System", // ✅ change this to your repo name
  assetPrefix: "/Library_Management_System/",
};

export default nextConfig;
