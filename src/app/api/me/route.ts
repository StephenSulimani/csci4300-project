import { verifyAuth } from '@/app/helper';
import { NextResponse } from 'next/server';

export interface MeResponse {
    email: string;
    username: string;
}

export async function GET() {
    const verified = await verifyAuth();

    if (typeof verified === 'boolean') {
        return NextResponse.json(
            {},
            {
                status: 401,
            }
        );
    }

    const resp: MeResponse = {
        email: verified.email,
        username: verified.username,
    };

    return NextResponse.json(resp, {
        status: 200,
    });
}
