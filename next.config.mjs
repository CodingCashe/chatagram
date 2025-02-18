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
      ],
  },
};

export default nextConfig;

