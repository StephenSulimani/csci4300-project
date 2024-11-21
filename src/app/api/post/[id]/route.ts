import { verifyAuth } from '@/app/helper';
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

interface UpdatePost {
    title?: string;
    price?: number;
    description?: string;
    pic?: string;
}

function isUpdatePost(obj: unknown): obj is UpdatePost {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    const updatePostObj = obj as UpdatePost;

    return (
        (updatePostObj.title === undefined ||
            typeof updatePostObj.title === 'string') &&
        (updatePostObj.price === undefined ||
            typeof updatePostObj.price === 'number') &&
        (updatePostObj.description === undefined ||
            typeof updatePostObj.description === 'string') &&
        (updatePostObj.pic === undefined ||
            typeof updatePostObj.pic === 'string')
    );
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const verified = await verifyAuth();

    console.log(verified);

    if (typeof verified === 'boolean') {
        return NextResponse.json(
            {
                success: 0,
                message: 'Unauthorized Request.',
                error: 1,
            },
            {
                status: 401,
            }
        );
    }

    const paramData = await params;
    const patchData = await req.json();

    if (!isUpdatePost(patchData)) {
        return NextResponse.json(
            {
                success: 0,
                message: 'Invalid input.',
                error: 1,
            },
            {
                status: 400,
            }
        );
    }

    try {
        const updateData = Object.entries(patchData).reduce(
            (acc, [key, value]) => {
                if (value !== undefined) {
                    acc[key as keyof UpdatePost] = value;
                }
                return acc;
            },
            {} as Partial<UpdatePost>
        );

        const post = await prisma.post.update({
            where: {
                postid: paramData.id,
                userId: verified.id,
            },
            data: updateData,
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
            if (['P2015', 'P2023', 'P2025'].includes(error.code!)) {
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
