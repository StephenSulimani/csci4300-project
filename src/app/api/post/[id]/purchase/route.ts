import { verifyAuth } from '@/app/helper';
import { isPrismaError, prisma } from '@/app/lib';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const verified = await verifyAuth();

    const dataParams = await params;

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

    try {
        const user = await prisma.user.findFirst({
            where: {
                id: verified.id,
            },
        });

        if (!user) {
            return NextResponse.json(
                {
                    status: 0,
                    message: 'User cannot be found.',
                    error: 1,
                },
                {
                    status: 401,
                }
            );
        }

        const post = await prisma.post.findFirst({
            where: {
                postid: dataParams.id,
            },
        });

        if (!post) {
            return NextResponse.json(
                {
                    status: 0,
                    message: 'Post cannot be found.',
                    error: 1,
                },
                {
                    status: 400,
                }
            );
        }

        if (post.userId == user.id) {
            return NextResponse.json(
                {
                    status: 0,
                    message: 'You cannot purchase your own post!',
                    error: 1,
                },
                {
                    status: 400,
                }
            );
        }

        if (post.price > user.balance) {
            return NextResponse.json(
                {
                    status: 0,
                    message: 'You cannot afford this item.',
                    error: 1,
                },
                {
                    status: 400,
                }
            );
        }

        const updatedPost = await prisma.post.update({
            where: {
                postid: dataParams.id,
                price: {
                    lte: user.balance,
                },
                userId: {
                    not: user.id,
                },
            },
            data: {
                purchased: true,
                purchasedById: user.id,
            },
        });

        if (!updatedPost) {
            return NextResponse.json(
                {
                    status: 0,
                    message: 'Post cannot be updated.',
                    error: 1,
                },
                {
                    status: 400,
                }
            );
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                balance: {
                    decrement: updatedPost.price,
                },
            },
        });

        return NextResponse.json({
            status: 1,
            message: `Purchase successful! Remaining balance: ${updatedUser.balance}`,
            error: 0,
        });
    } catch (error) {
        if (isPrismaError(error)) {
            console.log(error);
            console.log(`Prisma Code: ${error.code}`);
            if (error.code == 'P2025' && error.meta?.modelName == 'Post') {
                return NextResponse.json(
                    {
                        status: 0,
                        message: 'Post could not be found.',
                        error: 1,
                    },
                    {
                        status: 400,
                    }
                );
            }
        }

        console.log(error);
        return NextResponse.json(
            {
                status: 0,
                message: 'Unknown error occurred.',
                error: 1,
            },
            {
                status: 500,
            }
        );
    }
}
