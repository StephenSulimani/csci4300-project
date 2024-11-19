/** @type {import('next').NextConfig} */
// import { PrismaClient } from '@prisma/client'

const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'placecats.com',
                port: '',
                pathname: '/*/*',
                search: '',
            },
            {
                protocol: 'http',
                hostname: 'place.dog',
                port: '',
                pathname: '/*',
                search: '',
            },
            {
                protocol: 'http',
                hostname: 'i.postimg.cc',
                port: '',
                pathname: '/*/*',
                search: '',
            },
            {
                protocol: 'https',
                hostname: 'i.postimg.cc',
                port: '',
                pathname: '/*/*',
                search: '',
            },
        ],
    },
};

export default nextConfig;
