/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "img.clerk.com"
            },
            {
                protocol: 'https',
                hostname: "utfs.io"
            },
            {
                protocol: 'https',
                hostname: "media.tenor.com"
            }
        ],
    }
    
};

export default nextConfig;
