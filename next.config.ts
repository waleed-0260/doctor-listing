import type { NextConfig } from "next";

// /** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["via.placeholder.com"], // ✅ Allow external images
  },
};

module.exports = nextConfig;
