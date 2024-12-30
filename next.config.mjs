/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname:"scontent.cdninstagram.net"
          },
        ],
      },
};

export default nextConfig;
