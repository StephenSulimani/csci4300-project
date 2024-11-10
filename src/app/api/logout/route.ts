import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function GET() {
    const tokenCookie = serialize('token', '', {
        httpOnly: true,
        path: '/',
        sameSite: true,
        maxAge: -1,
    });

    return NextResponse.json('/', {
        status: 200,
        headers: {
            'Set-Cookie': tokenCookie,
        },
    });
}
