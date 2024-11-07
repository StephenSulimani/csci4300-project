import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

export default async function middleware(req: NextRequest) {
    console.log('Middleware');
    const cookies = req.cookies;

    const token = cookies.get('token');

    if (!token) {
        console.log('No Token Available');
        return NextResponse.redirect(new URL('/', req.url));
    }

    try {
        const encodedSecret = new TextEncoder().encode(process.env.JWT_SECRET!);
        const { payload } = await jose.jwtVerify(token.value, encodedSecret);
        console.log('JWT Verified');

        const refreshedToken = await new jose.SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('2h')
            .sign(encodedSecret);

        // Refresh JWT Token

        return NextResponse.next({
            headers: {
                'Set-Cookie': `token=${refreshedToken}; HttpOnly; Secure; Path=/; Max-Age=3600`,
            },
        });
    } catch {
        console.log('JWT Not Verified');
        return NextResponse.redirect(new URL('/', req.url));
    }
}

export const config = {
    matcher: ['/auth/'],
};
