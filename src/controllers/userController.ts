import { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';

import { User } from '../models/user';

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.status(HTTPStatusCode.CREATED).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};
