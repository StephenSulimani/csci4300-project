import { prisma } from '@/app/lib';
import bcrypt from 'bcryptjs';

export async function GET() {
    // const user = await prisma.user.findFirst({
    //     where: {
    //         firstName: 'Stephen',
    //     },
    // });

    // const post = await prisma.post.create({
    //     data: {
    //         price: 55,
    //         description: 'random listing',
    //         pic: 'n/a',
    //         userId: user!.id,
    //     },
    // });
    // console.log(user);
    // console.log(post);
    return Response.json({ status: 1, message: 'Pong!' });
}
