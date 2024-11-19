import { prisma } from '@/app/lib';
import { NextResponse } from 'next/server';

interface GetPostsResponse {
    success: number;
    message: object | string;
    error: number;
}

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            where: {
                purchased: false,
            },
        });

        const resp: GetPostsResponse = {
            success: 1,
            message: posts,
            error: 0,
        };

        return NextResponse.json(resp, {
            status: 200,
        });
    } catch {
        const resp: GetPostsResponse = {
            success: 0,
            message: 'There was an error processing this request.',
            error: 0,
        };
        return NextResponse.json(resp, {
            status: 400,
        });
    }
}
