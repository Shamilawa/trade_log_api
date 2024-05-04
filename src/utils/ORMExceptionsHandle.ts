import HTTPStatusCode from 'http-status-codes';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

export const ORMExceptionsHandle: any = (error: Error, res: Response) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log('Prisma Known Request Error:', { errorType: error.name, error: error.message });
        return res.status(HTTPStatusCode.BAD_REQUEST).json({ errorType: error.name, error: error.message });
    }

    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.log('Prisma Unknown Request Error:', { errorType: error.name, error: error.message });
        return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ errorType: error.name, error: error.message });
    }

    if (error instanceof Prisma.PrismaClientRustPanicError) {
        console.log('Prisma Rust Panic Error:', { errorType: error.name, error: error.message });
        return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ errorType: error.name, error: error.message });
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
        console.log('Prisma Initialization Error:', { errorType: error.name, error: error.message });
        return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ errorType: error.name, error: error.message });
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
        console.log('Prisma Validation Error:', { errorType: error.name, error: error.message });
        return res.status(HTTPStatusCode.BAD_REQUEST).json({ errorType: error.name, error: error.message });
    }

    console.error('Unhandled Prisma Error:', { error: error });
    return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
};
