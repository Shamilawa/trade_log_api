// request body typeDefinitions for better type safety
export interface findAllTradesByUserIdPayloadType {
    user_id: number;
}

export interface createTradePayloadType {
    currency_pair: string;
    entry_price?: number | null;
    exit_price?: number | null;
    entry_time?: Date | null;
    exit_time?: Date | null;
    position_size: number;
    profit: number;
    status?: TRADE_LOG_STATUS;
    strategy?: string | null;
    risk_reward_ratio?: number | null;
    comment?: string | null;
    created_at?: Date | null;
    updated_at?: Date | null;
    user_id: number;
}

export interface saveScreenshotByTradeIdPayload {
    tradeId: string;
}

export interface saveTradeScreenshotByTradeIdType {
    tradeId: string;
    userId: string;
    screenshotType: TRADE_SCREENSHOT_TYPE;
}

//ENUMs
enum TRADE_LOG_STATUS {
    PROFIT = 'PROFIT',
    LOSS = 'LOSS',
}

export enum TRADE_SCREENSHOT_TYPE {
    ENTRY = 'ENTRY',
    EXIT = 'EXIT',
}
