import { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';

import { cloudinaryFileUploadService } from '../config/cloudinary';
import { Trade } from '../models/trade';

/**
 * get all the trades based on the userId
 */
export const findAllTradesByUserId = async (req: Request, res: Response) => {
    try {
        const trades = await Trade.findAll({
            where: {
                user_id: req.body.user_id,
            },
        });
        res.status(HTTPStatusCode.OK).json(trades);
    } catch (error) {
        console.error('Error fetching trades:', error);
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

/**
 * create a trade
 */
export const createTrade = async (req: Request, res: Response) => {
    try {
        const trade = await Trade.create(req.body);
        res.status(HTTPStatusCode.CREATED).json({ message: 'Trade created successfully', trade: trade.toJSON() });
    } catch (error) {
        console.error('Error creating trade:', error);
        res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

/**
 * Save entry screenshot for particular trade
 */
export const saveEntryScreenshotByTradeId = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // tradeId
        const tradeId = req.params.tradeId;

        // generate a unique file name
        const uniqueFileName = `${'trade_entry_' + req.params.tradeId}`;

        // Upload file to Cloudinary
        const result = await cloudinaryFileUploadService(
            req.file.path,
            uniqueFileName,
            process.env.CLOUDINARY_TRADE_ENTRIES_FOLDER_NAME
        );

        // Return the Cloudinary URL of the uploaded image
        res.status(200).json({ message: 'File uploaded successfully', url: result?.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
