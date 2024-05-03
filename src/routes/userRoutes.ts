import express, { Request, Response } from 'express';
import { createUser, findAllUsers } from '../controllers';

export const userRouter = express.Router();

userRouter.get('/', findAllUsers);
userRouter.post('/create-user', createUser);
