import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

async function main() {
    const user = await prisma.user.create({
        data: {
            email: "blakevoyles2002@gmail.com",
            name: "blake Voyles"
        }
    })

    console.log(user)
}

main();