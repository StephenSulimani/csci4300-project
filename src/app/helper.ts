import { NextRequest } from 'next/server';
import * as jose from 'jose';

export async function verifyAuth(req: NextRequest): Promise<boolean> {
    const token = req.cookies.get('token');
    const authHeader = req.headers.get('Authorization');

    if (!authHeader) {
        return false;
    }

    const rawToken = authHeader.replace('Bearer ', '');

    try {
        const encodedSecret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jose.jwtVerify(rawToken, encodedSecret);
        return true;
    } catch {
        return false;
    }
}

export async function createJWT(payload: jose.JWTPayload): Promise<string> {
    const encodedSecret = new TextEncoder().encode(process.env.JWT_SECRET!);

    const token = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(encodedSecret);
    return token;
}
