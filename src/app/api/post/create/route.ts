import { verifyAuth } from '@/app/helper';
import { isPrismaError, prisma } from '@/app/lib';
import UploadImg from '@/PostImg/request';
import { NextRequest, NextResponse } from 'next/server';

interface CreatePostRequest {
    title: string;
    price: number;
    description: string;
    pic: File;
}

function isCreatePostRequest(obj: unknown): CreatePostRequest | null {
    if (!(obj instanceof FormData)) {
        return null;
    }

    // Retrieve values from FormData
    const title = obj.get('title');
    const price = obj.get('price');
    const description = obj.get('description');
    const pic = obj.get('pic');

    // Check if the values exist and are of the correct type
    if (
        typeof title !== 'string' ||
        typeof price !== 'string' ||
        isNaN(Number(price)) ||
        typeof description !== 'string' ||
        !(pic instanceof File)
    ) {
        return null;
    }

    // Now that we've validated, construct the CreatePostRequest object
    const createPostRequest: CreatePostRequest = {
        title,
        price: Number(price), // Convert the price from string to number
        description,
        pic, // Already a File type
    };

    // Return the validated and transformed CreatePostRequest
    return createPostRequest;
}

interface CreatePostResponse {
    success: number;
    message: string;
    error: number;
}

export async function POST(req: NextRequest) {
    const verified = await verifyAuth();

    const data = await req.formData();

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

    const validatedData = isCreatePostRequest(data);

    if (!validatedData) {
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

        const fileBytes = await validatedData.pic.arrayBuffer();

        const b64img = btoa(
            new Uint8Array(fileBytes).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
            )
        );

        const imgURL = await UploadImg(b64img);

        await prisma.post.create({
            data: {
                title: validatedData.title,
                price: validatedData.price,
                description: validatedData.description,
                pic: imgURL,
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
        } else {
            console.log(error);
            const resp: CreatePostResponse = {
                success: 0,
                message: 'Unknown error',
                error: 1,
            };
            return NextResponse.json(resp, { status: 500 });
        }
    }
}
