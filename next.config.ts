import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Disable TypeScript checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    // Enable unoptimized images for static export
    unoptimized: true,
  },

  // Base path if your app is not served from the root
  // basePath: '/your-base-path',
  
  // Asset prefix for CDN support
  // assetPrefix: '/your-cdn-url',

  // Experimental features
  experimental: {
    // serverComponentsExternalPackages is deprecated in favor of serverExternalPackages
    serverExternalPackages: ['@opentelemetry/sdk-node', 'handlebars'],
    // Enable server actions if needed
    // serverActions: true,
  },


  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
      };
    }

    // Handle problematic packages
    config.externals = [
      ...(config.externals || []), 
      '@opentelemetry/sdk-node',
      '@opentelemetry/exporter-trace-otlp-http',
      'handlebars'
    ];

    // Enable top-level await
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    return config;
  },

  // Enable React strict mode
  reactStrictMode: true,
  
  // Enable trailing slashes for better compatibility
  trailingSlash: true,
  
  // Optional: Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;





