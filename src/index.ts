import express from 'express';
import cors from 'cors';
require('dotenv').config();

// importing routers
import { tradeRouter, userRouter } from './routes';

const app = express();
const PORT = process.env.PORT;

// setting cors
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// routes
app.use('/api/trades', tradeRouter);
app.use('/api/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
