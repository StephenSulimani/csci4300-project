import { verifyAuth } from '@/app/helper';
import { NextResponse } from 'next/server';

export interface MeResponse {
    id: string;
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
        id: verified.id,
        email: verified.email,
        username: verified.username,
    };

    return NextResponse.json(resp, {
        status: 200,
    });
}
