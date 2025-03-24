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
  
  // Set the entire application to use Server-Side Rendering by default
  // This prevents static generation errors for routes using dynamic features
  output: 'standalone',
  
  // Disable static optimization for routes that use dynamic features
  staticPageGenerationTimeout: 120,
  
  // Enable React strict mode and SWC minification
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;`1`