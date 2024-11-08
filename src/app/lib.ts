import { PrismaClient } from '@prisma/client';

interface PrismaErrorMeta {
    modelName: string;
    target: string;
}

interface PrismaError extends Error {
    code?: string;
    meta?: PrismaErrorMeta;
}

function isPrismaError(error: unknown): error is PrismaError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        'meta' in error
    );
}

const prisma = new PrismaClient();

export { prisma, isPrismaError };
