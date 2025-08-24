/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.pexels.com']
  },
  optimizeFonts: false,
  swcMinify: false,
  experimental: {
    forceSwcTransforms: false,
  },
  webpack: (config, { isServer }) => {
    config.cache = false;
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  trailingSlash: true,
  generateBuildId: () => 'build',
};

module.exports = nextConfig;