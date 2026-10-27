/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        qualities: [75, 95],
        remotePatterns: [
            {protocol: 'https', hostname: 'cdn.sanity.io'},
        ],
    },
}

module.exports = nextConfig
