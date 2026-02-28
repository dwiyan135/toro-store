/** @type {import('next').NextConfig} */
const nextConfig = {
    serverActions: {
        bodySizeLimit: '10mb',
    },
    images: {
        unoptimized: true,
        remotePatterns: [],
    },
};

module.exports = nextConfig;
