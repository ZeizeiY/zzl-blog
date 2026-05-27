import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
output: "export",  // 启用静态导出
  trailingSlash: true,  // 可选，确保路由正确
  images: {
    unoptimized: true,  // 禁用 Next.js 图片优化（静态导出必需）
  },
};

export default nextConfig;
