import express, { Request, Response } from 'express';
import { createUser } from '../controllers';

export const userRouter = express.Router();

userRouter.post('/create-user', createUser);
