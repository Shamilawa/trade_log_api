import express from 'express';

import { upload } from '../config/multer';
import { createTrade, findAllTradesByUserId, saveEntryScreenshotByTradeId } from '../controllers';

export const tradeRouter = express.Router();

tradeRouter.get('/', findAllTradesByUserId);
tradeRouter.post('/create-trade', createTrade);
tradeRouter.put('/entry-image/:tradeId', upload.single('image'), saveEntryScreenshotByTradeId);
