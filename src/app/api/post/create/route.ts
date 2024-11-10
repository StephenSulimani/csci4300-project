import { verifyAuth } from '@/app/helper';
import { isPrismaError, prisma } from '@/app/lib';
import { NextRequest, NextResponse } from 'next/server';

interface CreatePostRequest {
    title: string;
    price: number;
    description: string;
    pic: string;
}

function isCreatePostRequest(obj: unknown): obj is CreatePostRequest {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'title' in obj &&
        'price' in obj &&
        typeof obj['price'] === 'number' &&
        'description' in obj &&
        'pic' in obj
    );
}

interface CreatePostResponse {
    success: number;
    message: string;
    error: number;
}

export async function POST(req: NextRequest) {
    const verified = await verifyAuth();

    const data = await req.json();

    if (typeof verified === 'boolean') {
        const resp: CreatePostResponse = {
            success: 0,
            message: 'Unauthorized Request.',
            error: 1,
        };
        return NextResponse.json(resp, {
            status: 401,
        });
    }

    if (!isCreatePostRequest(data)) {
        const resp: CreatePostResponse = {
            success: 0,
            message: 'title, price, pic, & description fields are required.',
            error: 1,
        };
        return NextResponse.json(resp, {
            status: 400,
        });
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                AND: [
                    {
                        email: {
                            equals: verified.email,
                            mode: 'insensitive',
                        },
                    },
                    {
                        userName: {
                            equals: verified.username,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
        });

        if (!user) {
            const resp: CreatePostResponse = {
                success: 0,
                message: 'The user does not exist.',
                error: 1,
            };
            return NextResponse.json(resp, {
                status: 400,
            });
        }

        await prisma.post.create({
            data: {
                title: data.title,
                price: data.price,
                description: data.description,
                pic: data.pic,
                userId: user.id,
            },
        });

        const resp: CreatePostResponse = {
            success: 1,
            message: 'Post created successfully!',
            error: 0,
        };
        return NextResponse.json(resp, {
            status: 201,
        });
    } catch (error) {
        if (isPrismaError(error)) {
            if (error.code == 'P2001') {
                const resp: CreatePostResponse = {
                    success: 0,
                    message: 'The user does not exist.',
                    error: 1,
                };
                return NextResponse.json(resp, {
                    status: 400,
                });
            }
        }
    }
}
