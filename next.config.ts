import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Prevent Next from picking a parent lockfile as workspace root
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
