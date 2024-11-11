import { verifyAuth } from '@/app/helper';
import { isPrismaError, prisma } from '@/app/lib';
import UploadImg from '@/PostImg/request';
import { NextRequest, NextResponse } from 'next/server';

export interface SetProfilePicResponse {
    success: number;
    message: string;
    error: number;
}

export async function PATCH(req: NextRequest) {
    try {
        const verified = await verifyAuth();

        if (typeof verified === 'boolean') {
            const resp: SetProfilePicResponse = {
                success: 0,
                message: 'Unauthorized Request',
                error: 1,
            };

            return NextResponse.json(resp, {
                status: 401,
            });
        }

        const formData = await req.formData();

        const file = formData.get('file') as File;

        if (!file) {
            const resp: SetProfilePicResponse = {
                success: 0,
                message: 'The file parameter is required.',
                error: 1,
            };

            return NextResponse.json(resp, {
                status: 400,
            });
        }

        const bytes = await file.arrayBuffer();

        const b64img = btoa(
            new Uint8Array(bytes).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
            )
        );

        const img_url = await UploadImg(b64img);

        await prisma.user.update({
            where: {
                email: verified.email,
            },
            data: {
                profilePic: img_url,
            },
        });

        const resp: SetProfilePicResponse = {
            success: 1,
            message: 'Successfully updated profile picture!',
            error: 0,
        };

        return NextResponse.json(resp, {
            status: 200,
        });
    } catch (error) {
        if (isPrismaError(error)) {
            const resp: SetProfilePicResponse = {
                success: 0,
                message: 'User cannot be found.',
                error: 1,
            };

            return NextResponse.json(resp, {
                status: 500,
            });
        }
        const resp: SetProfilePicResponse = {
            success: 0,
            message: 'There was an error processing the form data.',
            error: 1,
        };

        return NextResponse.json(resp, {
            status: 400,
        });
    }
}
