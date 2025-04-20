/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scontent-iad3-2.cdninstagram.com'
      },
      {
        protocol: 'https',
        hostname: 'scontent-iad3-1.cdninstagram.com'
      },
      {
        protocol: 'https',
        hostname: 'scontent-iad3-3.cdninstagram.com'
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com'
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'player.vimeo.com'
      },
      {
        protocol: 'https',
        hostname: 'i.vimeocdn.com'
      },
      {
        protocol: 'https',
        hostname: 'v.pinimg.com'
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
  
  // Server-side rendering configuration
  output: 'standalone',
  staticPageGenerationTimeout: 120,
  
  // React and optimization settings
  reactStrictMode: true,
  swcMinify: true,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_URL: process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000',
  },
  
  // Webpack configuration for both Socket.io and Puppeteer
  webpack: (config, { isServer }) => {
    // Handle source map files from chrome-aws-lambda
    config.module.rules.push({
      test: /\.map$/,
      type: 'asset/resource',
    });

    // Exclude chrome-aws-lambda from bundling
    config.externals = [
      ...(config.externals || []),
      {
        bufferutil: 'bufferutil',
        'utf-8-validate': 'utf-8-validate',
        '@sparticuz/chrome-aws-lambda': '@sparticuz/chrome-aws-lambda'
      }
    ];

    // Only apply the following for server-side bundles
    if (isServer) {
      // Mark chrome-aws-lambda as external
      config.externals.push('@sparticuz/chrome-aws-lambda');
      
      // Fix for "Module not found: Can't resolve 'fs'"
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        child_process: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
  
  // Enable experimental features if needed
  experimental: {
    serverComponentsExternalPackages: [
      '@sparticuz/chrome-aws-lambda',
      'puppeteer-core'
    ],
  },
};

export default nextConfig;