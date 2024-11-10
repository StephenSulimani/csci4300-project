import * as jose from 'jose';
import { cookies } from 'next/headers';

interface AuthPayload extends jose.JWTPayload {
    username: string;
    email: string;
}

export async function verifyAuth(): Promise<boolean | AuthPayload> {
    const authCookie = cookies().get('token');

    if (!authCookie) {
        return false;
    }

    try {
        const encodedSecret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jose.jwtVerify(
            authCookie.value,
            encodedSecret
        );
        return payload as AuthPayload;
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
