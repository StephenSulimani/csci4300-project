/** @type {import('next').NextConfig} */
// import { PrismaClient } from '@prisma/client'

const nextConfig = {
    images: {
        domains: ['placecats.com'],
    },
};

export default nextConfig;

// const prisma = new PrismaClient()
// // use `prisma` in your application to read and write data in your DB

// async function main() {
//     const user = await prisma.user.create({
//         data: {
//             email: "blakevoyles2002@gmail.com",
//             firstName: "Blake",
//             lastName: "Voyles",
//             profilePic : " ",
//             userName: "blakeV"

//         }
//     });
//     console.log(user)
// }

// main()
