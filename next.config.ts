import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Add output configuration for better deployment
  output: 'standalone',
  // Disable OpenTelemetry during build
  experimental: {
    serverComponentsExternalPackages: [
      '@opentelemetry/sdk-node',
      '@opentelemetry/exporter-trace-otlp-http',
      'handlebars'
    ],
    instrumentationHook: false // Disable instrumentation during build
  },
  // Disable webpack5 for problematic packages
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude problematic packages from server build
      config.externals = [...(config.externals || []), 
        '@opentelemetry/sdk-node',
        '@opentelemetry/exporter-trace-otlp-http',
        'handlebars'
      ];
    }
    
    return config;
  }
};

export default nextConfig;


