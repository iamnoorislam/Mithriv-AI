import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      fallback: [
        {
          source: '/:path*',
          destination: 'http://127.0.0.1:5501/:path*',
        },
      ],
    }
  },
};

export default nextConfig;
