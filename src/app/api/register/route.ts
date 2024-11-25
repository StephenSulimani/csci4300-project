import { isPrismaError, prisma } from '@/app/lib';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createJWT } from '@/app/helper';
import { serialize } from 'cookie';

interface RegisterRequest {
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    profilePic?: string;
}

interface RegisterResponse {
    error: number; // 1 if an error occurs, 0 if the request is error free
    message: string; // Message provided with the response
    success: number; // 1 if the registration is successful, 0 if there are issues.
}

function isRegisterRequest(data: unknown): data is RegisterRequest {
    return (
        typeof data === 'object' &&
        data !== null &&
        typeof (data as RegisterRequest).email === 'string' &&
        typeof (data as RegisterRequest).username === 'string' &&
        typeof (data as RegisterRequest).password === 'string' &&
        typeof (data as RegisterRequest).firstName === 'string' &&
        typeof (data as RegisterRequest).lastName === 'string'
    );
}

export async function POST(req: NextRequest) {
    const data = await req.json();

    if (!isRegisterRequest(data)) {
        const resp: RegisterResponse = {
            error: 1,
            message:
                'email, username, password, firstName, & lastName fields are required!',
            success: 0,
        };
        return NextResponse.json(resp, {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        const hashedPw = await bcrypt.hash(data.password, 10);
        const user = await prisma.user.create({
            data: {
                email: data.email.toLowerCase(),
                userName: data.username.toLowerCase(),
                password: hashedPw,
                firstName: data.firstName,
                lastName: data.lastName,
                profilePic: data.profilePic,
                balance: 10000
            },
        });
        const resp: RegisterResponse = {
            error: 0,
            message: 'Registered successfully!',
            success: 1,
        };

        const payload = {
            username: user.userName,
            email: user.email,
        };

        const token = await createJWT(payload);

        const tokenCookie = serialize('token', token, {
            sameSite: true,
            httpOnly: true,
            path: '/',
            maxAge: 3600,
        });

        return NextResponse.json(resp, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': tokenCookie,
            },
        });
    } catch (error) {
        if (isPrismaError(error)) {
            if (error.code == 'P2002') {
                // Unique Constraint Failed
                const resp: RegisterResponse = {
                    error: 1,
                    message: '',
                    success: 0,
                };
                if (
                    error.meta?.target
                        .replace(`${error.meta.modelName}_`, '')
                        .replace('_key', '') == 'userName'
                ) {
                    resp.message = `Username ${data.username} is already in use.`;
                } else {
                    resp.message = `Email ${data.email} is already in use.`;
                }

                return NextResponse.json(resp, {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
        }
    }
}
