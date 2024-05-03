import { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findAllUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await prisma.user.findMany();
        res.status(HTTPStatusCode.OK).json(allUsers);
    } catch (error) {
        console.log('Error finding users', error);
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.create({ data: req.body });
        res.status(HTTPStatusCode.CREATED).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ error });
    }
};
