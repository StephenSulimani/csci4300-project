import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { prisma } from '@/app/lib';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

interface LoginRequest {
    email?: string;
    password: string;
}

interface LoginResponse {
    error: number; // 1 if an error occurs, 0 if the request is error free
    message: string; // Message provided with the response
    success: number; // 1 if the login is successful, 0 if credentials are incorrect.
}

export async function POST(req: NextRequest) {
    // const body = await getRawBody(req);
    // res.setHeader('Content-Type', 'application/json');

    const data = (await req.json()) as LoginRequest;

    console.log(data);

    if (!data.email) {
        const resp: LoginResponse = {
            error: 1,
            message: 'Either email or username is required.',
            success: 0,
        };
        return NextResponse.json(resp, {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const user = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    userName: {
                        equals: data.email,
                        mode: 'insensitive',
                    },
                },
                {
                    email: {
                        equals: data.email,
                        mode: 'insensitive',
                    },
                },
            ],
        },
    });

    if (!user) {
        const resp: LoginResponse = {
            error: 1,
            message: 'This email or username does not exist.',
            success: 0,
        };

        return NextResponse.json(resp, {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const loginStatus = await bcrypt.compare(data.password, user.password);

    if (!loginStatus) {
        const resp: LoginResponse = {
            error: 1,
            message: 'The password is invalid.',
            success: 0,
        };

        return NextResponse.json(resp, {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const payload = {
        username: user.userName,
        email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: '2h',
        algorithm: 'HS256',
    });

    // Set the HTTP Only Cookie containing the JWT to be used for future authenticated requests.

    const resp: LoginResponse = {
        error: 0,
        message: `Login Successful. Logged in as: ${user.userName}.`,
        success: 1,
    };

    return NextResponse.json(resp, {
        status: 401,
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': `token=${token}; HttpOnly; Secure; Path=/; Max-Age=3600`,
        },
    });
}
