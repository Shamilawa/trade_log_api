import express from 'express';

import { upload } from '../config/multer';
import { createTrade, findAllTradesByUserId, saveTradeScreenshotByTradeId } from '../controllers';

export const tradeRouter = express.Router();

tradeRouter.get('/', findAllTradesByUserId);
tradeRouter.post('/create-trade', createTrade);
tradeRouter.put('/trade-images', upload.single('tradeImage'), saveTradeScreenshotByTradeId);
