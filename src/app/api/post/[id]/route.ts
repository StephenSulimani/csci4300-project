import { isPrismaError, prisma } from '@/app/lib';
import { NextRequest, NextResponse } from 'next/server';

interface GetPostResponse {
    success: number;
    message: object | string;
    error: number;
}

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const paramData = await params;

    try {
        const post = await prisma.post.findFirst({
            where: {
                postid: paramData.id,
            },
        });

        if (!post) {
            const resp: GetPostResponse = {
                success: 0,
                message: 'The post could not be located.',
                error: 1,
            };

            return NextResponse.json(resp, {
                status: 400,
            });
        }

        const resp: GetPostResponse = {
            success: 1,
            message: post,
            error: 0,
        };

        return NextResponse.json(resp, {
            status: 200,
        });
    } catch (error) {
        if (isPrismaError(error)) {
            if (['P2015', 'P2023'].includes(error.code!)) {
                const resp: GetPostResponse = {
                    success: 0,
                    message: 'The post could not be located.',
                    error: 1,
                };

                return NextResponse.json(resp, {
                    status: 400,
                });
            }
        }
        console.log(error);
        const resp: GetPostResponse = {
            success: 0,
            message: 'An unknown error has occurred.',
            error: 1,
        };

        return NextResponse.json(resp, {
            status: 500,
        });
    }
}
