/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname:"scontent-iad3-2.cdninstagram.com"
          },
        ],
      },
};

export default nextConfig;
