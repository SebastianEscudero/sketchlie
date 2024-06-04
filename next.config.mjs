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
    },
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [{ type: 'query', key: 'trailingSlash', value: '(?!/)' }],
                destination: '/:path*/',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
