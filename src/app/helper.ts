import * as jose from 'jose';
import { cookies } from 'next/headers';

interface AuthPayload extends jose.JWTPayload {
    id: string;
    username: string;
    email: string;
}

function isAuthPayload(obj: unknown): obj is AuthPayload {
    // Check if the object is an object and not null
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    // Type assertion after ensuring it is an object
    const payload = obj as AuthPayload;

    // Check if the required properties are present and of the correct types
    return (
        typeof payload.id === 'string' &&
        typeof payload.username === 'string' &&
        typeof payload.email === 'string' &&
        // Optionally, check if the object is a valid JWT payload
        typeof payload.exp === 'number' && // Typical JWT property example
        typeof payload.iat === 'number' // Another typical JWT property
    );
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
        if (!isAuthPayload(payload)) {
            return false;
        }
        return payload;
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
