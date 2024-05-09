import { PrismaClient } from '@prisma/client';
import HTTPStatusCode from 'http-status-codes';
import { Request, Response } from 'express';

import {
    TRADE_SCREENSHOT_TYPE,
    createTradePayloadType,
    findAllTradesByUserIdPayloadType,
    saveScreenshotByTradeIdPayload,
    saveTradeScreenshotByTradeIdType,
} from '../types';
import { cloudinaryFileUploadService } from '../config/cloudinary';
import { ORMExceptionsHandle } from '../utils';

const prisma = new PrismaClient();

/**
 * get all the trades based on the userId
 */
export const findAllTradesByUserId = async (req: Request<findAllTradesByUserIdPayloadType, {}, {}>, res: Response) => {
    try {
        const user_id = req.params.userId;

        if (!user_id) {
            return res.status(HTTPStatusCode.BAD_REQUEST).json({ error: 'user_id is required' });
        }

        const trades = await prisma.trade.findMany({
            where: {
                user_id: user_id,
            },
        });

        res.status(HTTPStatusCode.OK).json(trades);
    } catch (error) {
        ORMExceptionsHandle(error, res);
    }
};

/**
 * create a trade
 */
export const createTrade = async (req: Request<{}, {}, createTradePayloadType>, res: Response) => {
    try {
        const trade = await prisma.trade.create({ data: req.body });
        res.status(HTTPStatusCode.CREATED).json({ message: 'Trade created successfully', trade });
    } catch (error) {
        ORMExceptionsHandle(error, res);
    }
};

/**
 * This function will handle trade entry and exit screenshot based on the
 * screenshot provided by the req.body
 */
export const saveTradeScreenshotByTradeId = async (
    req: Request<{}, {}, saveTradeScreenshotByTradeIdType>,
    res: Response
) => {
    try {
        if (!req.file) {
            return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({ message: 'Please make sure to upload the image file' });
        }

        if (
            req.file.mimetype !== 'image/jpeg' &&
            req.file.mimetype !== 'image/jpg' &&
            req.file.mimetype !== 'image/png'
        ) {
            return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({ message: 'Please make sure to upload only supported formats.' });
        }

        if (!req.body.tradeId) {
            return res.status(HTTPStatusCode.BAD_REQUEST).json({ message: 'tradeId is required' });
        }

        if (!req.body.userId) {
            return res.status(HTTPStatusCode.BAD_REQUEST).json({ message: 'userId is required' });
        }

        if (!req.body.screenshotType) {
            return res.status(HTTPStatusCode.BAD_REQUEST).json({ message: 'screenshotType is required' });
        }

        const trade = await prisma.trade.findUnique({
            where: {
                id: req.body.tradeId,
                user_id: req.body.userId,
            },
        });

        if (!trade) {
            return res
                .status(HTTPStatusCode.NOT_FOUND)
                .json({ message: 'Trade not found. try again later or try with different trade id' });
        }

        const uniqueFileName = `${trade.id + '_' + trade.user_id + '_' + '_' + req.body.screenshotType.toLowerCase()}`;

        const fileUploadResult = await cloudinaryFileUploadService(
            req.file.path,
            uniqueFileName,
            req.body.screenshotType === TRADE_SCREENSHOT_TYPE.ENTRY
                ? process.env.CLOUDINARY_TRADE_ENTRIES_FOLDER_NAME
                : process.env.CLOUDINARY_TRADE_EXITS_FOLDER_NAME
        );

        if (!fileUploadResult.secure_url) {
            return res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({
                message: 'Error uploading file to server. Please retry withing few minutes',
            });
        }

        const updateTrade = await prisma.trade.update({
            where: {
                id: req.body.tradeId,
                user_id: req.body.userId,
            },
            data: {
                entry_screenshot_url:
                    req.body.screenshotType === TRADE_SCREENSHOT_TYPE.ENTRY
                        ? fileUploadResult.secure_url
                        : trade.entry_screenshot_url,
                exit_screenshot_url:
                    req.body.screenshotType === TRADE_SCREENSHOT_TYPE.EXIT
                        ? fileUploadResult.secure_url
                        : trade.exit_screenshot_url,
            },
        });

        return res
            .status(HTTPStatusCode.CREATED)
            .json({ message: 'Trade updated successfully with trade screenshots', updateTrade });
    } catch (error) {
        ORMExceptionsHandle(error, res);
    }
};
