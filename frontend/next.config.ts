import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*', // Все пути, начинающиеся с /api
        destination: 'http://localhost:3001/:path*', // Перенаправляем на бэкенд
      },
    ];
  },
};

export default nextConfig;
