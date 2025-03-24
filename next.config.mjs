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
  
  // Add these configurations to handle dynamic routes
  experimental: {
    // Enable Partial Prerendering for better handling of dynamic/static content
    ppr: true,
  },
  
  // Prevent Next.js from attempting to statically generate these routes
  // This is crucial for routes that use headers() or other dynamic features
  unstable_excludeFiles: [
    '**/api/socket/**',
    '**/api/chat/messages/**',
    '**/dashboard/**',
    '**/admin/**',
  ],
  
  // Set the entire application to use Server-Side Rendering by default
  // This prevents static generation errors for routes using dynamic features
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;