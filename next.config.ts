import type { NextConfig } from "next";

// STATIC_EXPORT=1 — сборка чистой статики в out/ (для бесплатного хостинга),
// обычный dev/standalone-режим остаётся без изменений.
const isStaticExport = process.env.STATIC_EXPORT === "1";

const common = {
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: false,
};

const nextConfig: NextConfig = isStaticExport
  ? {
      ...common,
      output: "export",
      distDir: ".next-export",
      images: { unoptimized: true },
    }
  : {
      ...common,
      output: "standalone",
      /* config options here */
    };

export default nextConfig;
